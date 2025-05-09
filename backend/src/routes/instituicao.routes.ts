import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Rota para vincular um aluno a uma instituição
router.post('/vincular-aluno', authMiddleware, async (req, res) => {
  try {
    const { alunoId } = req.body;
    const usuarioId = req.usuario?.id;

    // Verificar se o usuário é uma instituição
    const instituicao = await prisma.instituicao.findUnique({
      where: { usuarioId },
    });

    if (!instituicao) {
      return res.status(403).json({ message: 'Usuário não é uma instituição' });
    }

    // Verificar se o aluno existe
    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
    });

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Atualizar o aluno com a instituição
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: alunoId },
      data: { instituicaoId: instituicao.id },
    });

    res.json(alunoAtualizado);
  } catch (error) {
    console.error('Erro ao vincular aluno à instituição:', error);
    res.status(500).json({ message: 'Erro ao vincular aluno à instituição' });
  }
});

// Rota para listar alunos da instituição
router.get('/alunos', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.usuario?.id;

    // Verificar se o usuário é uma instituição
    const instituicao = await prisma.instituicao.findUnique({
      where: { usuarioId },
    });

    if (!instituicao) {
      return res.status(403).json({ message: 'Usuário não é uma instituição' });
    }

    // Buscar alunos da instituição
    const alunos = await prisma.aluno.findMany({
      where: { instituicaoId: instituicao.id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    res.json(alunos);
  } catch (error) {
    console.error('Erro ao listar alunos da instituição:', error);
    res.status(500).json({ message: 'Erro ao listar alunos da instituição' });
  }
});

export default router;