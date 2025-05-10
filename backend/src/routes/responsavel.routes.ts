import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';
import bcrypt from 'bcrypt';
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

// Rota para vincular um aluno a um responsável
router.post('/vincular-aluno', authMiddleware, async (req, res) => {
  try {
    const { alunoId, parentesco } = req.body;
    const usuarioId = req.usuario?.id;

    // Verificar se o usuário é um responsável
    const responsavel = await prisma.responsavel.findUnique({
      where: { usuarioId },
    });

    if (!responsavel) {
      return res.status(403).json({ message: 'Usuário não é um responsável' });
    }

    // Verificar se o aluno existe
    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
    });

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Verificar se já existe uma vinculação
    const vinculoExistente = await prisma.responsavelAluno.findUnique({
      where: {
        responsavelId_alunoId: {
          responsavelId: responsavel.id,
          alunoId,
        },
      },
    });

    if (vinculoExistente) {
      return res.status(400).json({ message: 'Aluno já vinculado a este responsável' });
    }

    // Criar a vinculação
    const vinculo = await prisma.responsavelAluno.create({
      data: {
        responsavelId: responsavel.id,
        alunoId,
        parentesco,
      },
    });

    res.status(201).json(vinculo);
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

export default router;