import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Rota para listar todos os responsáveis
router.get('/', authMiddleware, async (req, res) => {
  try {
    const responsaveis = await prisma.responsavel.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });
    
    res.json(responsaveis);
  } catch (error) {
    console.error('Erro ao buscar responsáveis:', error);
    res.status(500).json({ message: 'Erro ao buscar responsáveis' });
  }
});

// Rota para obter o perfil do responsável autenticado
router.get('/perfil', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.usuario?.id;
    console.log('Buscando perfil para usuarioId:', usuarioId);
    
    const responsavel = await prisma.responsavel.findUnique({
      where: { usuarioId },
      include: { 
        usuario: true,
        alunos: {
          include: {
            aluno: {
              include: {
                usuario: true,
                instituicao: {
                  include: {
                    usuario: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!responsavel) {
      console.log('Responsável não encontrado para usuarioId:', usuarioId);
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }

    console.log('Responsável encontrado:', responsavel);

    // Formatar os dados dos alunos vinculados
    const alunosVinculados = responsavel.alunos.map(vinculo => ({
      id: vinculo.aluno.id,
      nome: vinculo.aluno.usuario.nome,
      matricula: vinculo.aluno.matricula,
      turmaId: vinculo.aluno.turmaId,
      escola: vinculo.aluno.instituicao ? vinculo.aluno.instituicao.usuario.nome : null,
      parentesco: vinculo.parentesco
    }));

    const perfilResponse = {
      nome: responsavel.usuario.nome,
      email: responsavel.usuario.email,
      cpf: responsavel.cpf,
      telefone: responsavel.telefone,
      alunos: alunosVinculados,
      ultimoAcesso: responsavel.usuario.updatedAt
    };

    console.log('Resposta de perfil:', perfilResponse);
    res.json(perfilResponse);
  } catch (error) {
    console.error('Erro ao buscar perfil do responsável:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil do responsável' });
  }
});

// Rota para buscar um responsável específico
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const responsavel = await prisma.responsavel.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        alunos: {
          include: {
            aluno: {
              include: {
                usuario: {
                  select: {
                    nome: true
                  }
                }
              }
            }
          }
        }
      }
    });
    
    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }
    
    res.json(responsavel);
  } catch (error) {
    console.error('Erro ao buscar responsável:', error);
    res.status(500).json({ message: 'Erro ao buscar responsável' });
  }
});

// Rota para vincular aluno e responsável
router.post('/vincular-aluno', authMiddleware, async (req, res) => {
  try {
    const { alunoId, responsavelId, parentesco } = req.body;
    const usuarioId = req.usuario?.id;
    const usuarioTipo = req.usuario?.tipo?.toLowerCase();

    console.log('Dados recebidos na vinculação:', {
      alunoId,
      responsavelId,
      parentesco,
      usuarioId,
      usuarioTipo
    });

    // Verificar se o usuário é um responsável ou uma instituição
    if (usuarioTipo !== 'responsavel' && usuarioTipo !== 'instituicao') {
      return res.status(403).json({ 
        message: 'Apenas responsáveis ou instituições podem fazer vinculações',
        tipoRecebido: usuarioTipo
      });
    }

    // Buscar o responsável pelo ID do usuário
    const responsavel = await prisma.responsavel.findFirst({
      where: { 
        usuarioId: Number(responsavelId)
      },
      include: {
        usuario: true
      }
    });

    if (!responsavel) {
      console.log('Responsável não encontrado para usuarioId:', responsavelId);
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }

    console.log('Responsável encontrado:', responsavel);

    // Buscar o aluno pelo ID do usuário
    const aluno = await prisma.aluno.findFirst({
      where: { 
        usuarioId: Number(alunoId)
      },
      include: {
        usuario: true,
        instituicao: true
      }
    });

    if (!aluno) {
      console.log('Aluno não encontrado para usuarioId:', alunoId);
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    console.log('Aluno encontrado:', aluno);

    // Se o usuário for uma instituição, verificar se o aluno pertence a ela
    if (usuarioTipo === 'instituicao') {
      const instituicao = await prisma.instituicao.findUnique({
        where: { usuarioId }
      });

      if (!instituicao) {
        console.log('Instituição não encontrada para usuarioId:', usuarioId);
        return res.status(403).json({ message: 'Instituição não encontrada' });
      }

      if (aluno.instituicaoId !== instituicao.id) {
        console.log('Aluno não pertence à instituição:', {
          alunoInstituicaoId: aluno.instituicaoId,
          instituicaoId: instituicao.id
        });
        return res.status(403).json({ message: 'Aluno não pertence a esta instituição' });
      }
    }

    // Verificar se já existe uma vinculação
    const vinculoExistente = await prisma.responsavelAluno.findFirst({
      where: {
        alunoId: aluno.id,
        responsavelId: responsavel.id
      }
    });

    if (vinculoExistente) {
      console.log('Vinculação já existe:', vinculoExistente);
      return res.status(400).json({ message: 'Aluno já está vinculado a este responsável' });
    }

    // Criar a vinculação
    const vinculo = await prisma.responsavelAluno.create({
      data: {
        alunoId: aluno.id,
        responsavelId: responsavel.id,
        parentesco
      },
      include: {
        aluno: {
          include: {
            usuario: true
          }
        },
        responsavel: {
          include: {
            usuario: true
          }
        }
      }
    });

    console.log('Vinculação criada com sucesso:', vinculo);

    res.status(201).json({
      message: 'Aluno vinculado com sucesso',
      vinculo: {
        id: vinculo.id,
        aluno: {
          id: vinculo.aluno.id,
          nome: vinculo.aluno.usuario.nome,
          matricula: vinculo.aluno.matricula
        },
        responsavel: {
          id: vinculo.responsavel.id,
          nome: vinculo.responsavel.usuario.nome
        },
        parentesco: vinculo.parentesco
      }
    });
  } catch (error) {
    console.error('Erro ao vincular aluno:', error);
    res.status(500).json({ message: 'Erro ao vincular aluno' });
  }
});

// Rota para cadastrar um novo responsável
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, cpf, telefone } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Verificar se o CPF já existe
    const responsavelExistente = await prisma.responsavel.findUnique({
      where: { cpf },
    });

    if (responsavelExistente) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criar o usuário e o responsável em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar o usuário
      const novoUsuario = await tx.usuario.create({
        data: {
          email,
          senha: senhaHash,
          nome,
          tipo: 'responsavel',
        },
      });

      // Criar o responsável
      const novoResponsavel = await tx.responsavel.create({
        data: {
          usuarioId: novoUsuario.id,
          cpf,
          telefone,
        },
      });

      return { usuario: novoUsuario, responsavel: novoResponsavel };
    });

    // Gerar token JWT
    const token = jwt.sign(
      { id: result.usuario.id, tipo: result.usuario.tipo },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Responsável cadastrado com sucesso',
      token,
      usuario: {
        id: result.usuario.id,
        email: result.usuario.email,
        nome: result.usuario.nome,
        tipo: result.usuario.tipo,
      },
      responsavel: result.responsavel,
    });
  } catch (error) {
    console.error('Erro ao cadastrar responsável:', error);
    res.status(500).json({ message: 'Erro ao cadastrar responsável' });
  }
});

// Rota para atualizar o perfil do responsável autenticado
router.put('/perfil', authMiddleware, async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const usuarioId = req.usuario?.id;

    // Verificar se o responsável existe
    const responsavel = await prisma.responsavel.findUnique({
      where: { usuarioId },
      include: { usuario: true }
    });

    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }

    // Verificar se o email já existe (caso esteja sendo alterado)
    if (email !== responsavel.usuario.email) {
      const emailExistente = await prisma.usuario.findFirst({
        where: { 
          email,
          NOT: { id: usuarioId }
        }
      });

      if (emailExistente) {
        return res.status(400).json({ message: 'Email já cadastrado para outro usuário' });
      }
    }

    // Atualizar em uma transação para garantir consistência
    const result = await prisma.$transaction(async (tx) => {
      // Atualizar nome e email do usuário
      const usuarioAtualizado = await tx.usuario.update({
        where: { id: usuarioId },
        data: { 
          nome,
          email
        }
      });

      // Atualizar telefone do responsável
      const responsavelAtualizado = await tx.responsavel.update({
        where: { id: responsavel.id },
        data: { telefone }
      });

      return { usuario: usuarioAtualizado, responsavel: responsavelAtualizado };
    });

    // Buscar os alunos vinculados para incluir na resposta
    const responsavelComAlunos = await prisma.responsavel.findUnique({
      where: { id: responsavel.id },
      include: {
        alunos: {
          include: {
            aluno: {
              include: {
                usuario: true,
                instituicao: {
                  include: {
                    usuario: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Formatar os dados dos alunos vinculados
    const alunosVinculados = responsavelComAlunos?.alunos.map(vinculo => ({
      id: vinculo.aluno.id,
      nome: vinculo.aluno.usuario.nome,
      matricula: vinculo.aluno.matricula,
      turmaId: vinculo.aluno.turmaId,
      escola: vinculo.aluno.instituicao ? vinculo.aluno.instituicao.usuario.nome : null,
      parentesco: vinculo.parentesco
    })) || [];

    res.json({
      nome: result.usuario.nome,
      email: result.usuario.email,
      cpf: responsavel.cpf,
      telefone: result.responsavel.telefone,
      alunos: alunosVinculados,
      ultimoAcesso: result.usuario.updatedAt
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil do responsável:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil do responsável' });
  }
});

export default router;