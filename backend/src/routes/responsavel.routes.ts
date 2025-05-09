import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

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

export default router;