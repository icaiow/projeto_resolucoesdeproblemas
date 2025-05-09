import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Rota para listar todos os alunos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
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
    
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
});

// Rota para buscar um aluno específico
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        responsaveis: {
          include: {
            responsavel: {
              include: {
                usuario: {
                  select: {
                    nome: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      }
    });
    
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    
    res.json(aluno);
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar aluno' });
  }
});

// Rota para criar um aluno
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { matricula, turma, serie, dataNascimento } = req.body;
    const usuarioId = req.usuario?.id;

    // Verificar se o ID do usuário está presente
    if (!usuarioId) {
      return res.status(401).json({ message: 'Usuário não autenticado ou ID não disponível' });
    }

    // Verificar se o usuário já tem um perfil de aluno
    const alunoExistente = await prisma.aluno.findUnique({
      where: { usuarioId },
    });

    if (alunoExistente) {
      return res.status(400).json({ message: 'Usuário já possui um perfil de aluno' });
    }

    // Criar o aluno
    const novoAluno = await prisma.aluno.create({
      data: {
        usuarioId: usuarioId, // Agora temos certeza que não é undefined
        matricula,
        turma,
        serie,
        dataNascimento: new Date(dataNascimento),
      },
    });

    res.status(201).json(novoAluno);
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).json({ message: 'Erro ao criar aluno' });
  }
});

export default router;