import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Rota para cadastro de aluno
router.post('/cadastro', async (req, res) => {
  try {
    const { 
      nome, 
      email, 
      senha, 
      matricula,
      turmaId,
      dataNascimento,
      instituicaoId
    } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Verificar se a matrícula já existe
    const alunoExistente = await prisma.aluno.findUnique({
      where: { matricula },
    });

    if (alunoExistente) {
      return res.status(400).json({ message: 'Matrícula já cadastrada' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criar o usuário e o aluno em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar o usuário
      const novoUsuario = await tx.usuario.create({
        data: {
          email,
          senha: senhaHash,
          nome,
          tipo: 'aluno',
        },
      });

      // Criar o aluno
      const novoAluno = await tx.aluno.create({
        data: {
          usuarioId: novoUsuario.id,
          matricula,
          turmaId,
          dataNascimento: new Date(dataNascimento),
          instituicaoId: instituicaoId || null
        },
      });

      return { usuario: novoUsuario, aluno: novoAluno };
    });

    // Gerar token JWT
    const token = jwt.sign(
      { id: result.usuario.id, tipo: result.usuario.tipo },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Aluno cadastrado com sucesso',
      token,
      usuario: {
        id: result.usuario.id,
        email: result.usuario.email,
        nome: result.usuario.nome,
        tipo: result.usuario.tipo,
      },
      aluno: result.aluno,
    });
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(500).json({ message: 'Erro ao cadastrar aluno' });
  }
});

// Rota para obter o perfil do aluno autenticado
router.get('/perfil', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.usuario?.id;
    
    const aluno = await prisma.aluno.findUnique({
      where: { usuarioId },
      include: { 
        usuario: true,
        instituicao: {
          include: {
            usuario: true
          }
        }
      }
    });

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    res.json({
      nome: aluno.usuario.nome,
      email: aluno.usuario.email,
      matricula: aluno.matricula,
      turmaId: aluno.turmaId,
      dataNascimento: aluno.dataNascimento,
      escola: aluno.instituicao ? aluno.instituicao.usuario.nome : null,
      ultimoAcesso: aluno.usuario.updatedAt
    });
  } catch (error) {
    console.error('Erro ao buscar perfil do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil do aluno' });
  }
});

// Rota para atualizar o perfil do aluno autenticado
router.put('/perfil', authMiddleware, async (req, res) => {
  try {
    const { nome, email, turmaId } = req.body;
    const usuarioId = req.usuario?.id;

    // Verificar se o aluno existe
    const aluno = await prisma.aluno.findUnique({
      where: { usuarioId },
      include: { usuario: true }
    });

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Verificar se o email já existe (caso esteja sendo alterado)
    if (email !== aluno.usuario.email) {
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

      // Atualizar dados do aluno
      const alunoAtualizado = await tx.aluno.update({
        where: { id: aluno.id },
        data: { 
          turmaId
        }
      });

      return { usuario: usuarioAtualizado, aluno: alunoAtualizado };
    });

    res.json({
      nome: result.usuario.nome,
      email: result.usuario.email,
      matricula: aluno.matricula,
      turmaId: result.aluno.turmaId,
      dataNascimento: aluno.dataNascimento,
      ultimoAcesso: result.usuario.updatedAt
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil do aluno:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil do aluno' });
  }
});

// Rota para buscar aluno por matrícula
router.get('/buscar/:matricula', async (req, res) => {
  try {
    const { matricula } = req.params;
    console.log('Buscando aluno com matrícula:', matricula);

    // Primeiro, buscar o aluno na tabela Aluno
    const aluno = await prisma.aluno.findFirst({
      where: { 
        matricula: matricula 
      },
      include: {
        // Incluir os dados do usuário relacionado
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            tipo: true,
            updatedAt: true,
            createdAt: true
          }
        },
        // Incluir os dados da instituição se existir
        instituicao: {
          select: {
            id: true,
            usuario: {
              select: {
                nome: true
              }
            }
          }
        }
      }
    });

    if (!aluno) {
      console.log('Aluno não encontrado');
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    console.log('Dados brutos do aluno encontrado:', aluno);

    // Formatar a resposta com os dados do aluno e do usuário
    const alunoFormatado = {
      id: aluno.id, // ID do aluno
      usuarioId: aluno.usuarioId, // ID do usuário relacionado
      nome: aluno.usuario.nome,
      email: aluno.usuario.email,
      matricula: aluno.matricula,
      turma: aluno.turmaId,
      dataNascimento: aluno.dataNascimento,
      status: aluno.instituicaoId ? 'ativo' : 'inativo',
      instituicaoId: aluno.instituicaoId,
      instituicaoNome: aluno.instituicao?.usuario.nome || null,
      ultimoAcesso: aluno.usuario.updatedAt,
      dataCadastro: aluno.usuario.createdAt
    };

    console.log('Aluno formatado:', alunoFormatado);
    res.json(alunoFormatado);
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar aluno' });
  }
});

// Rota para buscar responsáveis vinculados ao aluno
router.get('/responsaveis-vinculados', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.usuario?.id;
    console.log('Buscando responsáveis vinculados para aluno:', usuarioId);

    // Buscar o aluno pelo ID do usuário
    const aluno = await prisma.aluno.findFirst({
      where: { usuarioId },
      include: {
        responsaveis: {
          include: {
            responsavel: {
              include: {
                usuario: true
              }
            }
          }
        }
      }
    });

    if (!aluno) {
      console.log('Aluno não encontrado');
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Formatar os dados dos responsáveis
    const responsaveisFormatados = aluno.responsaveis.map(vinculo => ({
      id: vinculo.responsavel.id,
      nome: vinculo.responsavel.usuario.nome,
      email: vinculo.responsavel.usuario.email,
      telefone: vinculo.responsavel.telefone,
      parentesco: vinculo.parentesco,
      foto: null
    }));

    console.log('Responsáveis formatados:', responsaveisFormatados);
    res.json(responsaveisFormatados);
  } catch (error) {
    console.error('Erro ao buscar responsáveis vinculados:', error);
    res.status(500).json({ message: 'Erro ao buscar responsáveis vinculados' });
  }
});

export default router;