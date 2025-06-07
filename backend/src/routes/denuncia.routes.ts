import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// ✅ Rota para listar denúncias (todas para instituição, filtradas para outros)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { id, tipo } = req.usuario!;

    const denuncias = await prisma.denuncia.findMany({
      where: tipo === 'instituicao' ? {} : { usuarioId: id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            tipo: true
          }
        },
        comentarios: {
          include: {
            usuario: {
              select: {
                nome: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(denuncias);
  } catch (error) {
    console.error('Erro ao buscar denúncias:', error);
    res.status(500).json({ message: 'Erro ao buscar denúncias' });
  }
});

// ✅ Nova rota: buscar uma denúncia específica por ID
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const denuncia = await prisma.denuncia.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: {
          select: {
            nome: true,
            email: true,
            tipo: true
          }
        },
        comentarios: {
          include: {
            usuario: {
              select: { nome: true }
            }
          }
        }
      }
    });

    if (!denuncia) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }

    res.json(denuncia);
  } catch (error) {
    console.error('Erro ao buscar denúncia por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar denúncia por ID' });
  }
});

// Rota para criar uma nova denúncia
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao, tipo, anonima, nomeAgressor } = req.body;
    const usuarioId = req.usuario?.id;

    const denunciaData: Prisma.DenunciaUncheckedCreateInput = {
      titulo,
      descricao,
      tipo,
      status: 'pendente',
      anonima: anonima || false,
      usuarioId: anonima ? null : usuarioId,
      nomeAgressor: nomeAgressor || null
    };

    const denuncia = await prisma.denuncia.create({
      data: denunciaData
    });

    res.status(201).json(denuncia);
  } catch (error) {
    console.error('Erro ao criar denúncia:', error);
    res.status(500).json({ message: 'Erro ao criar denúncia' });
  }
});


// Rota para atualizar o status de uma denúncia
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const denuncia = await prisma.denuncia.update({
      where: { id: Number(id) },
      data: { status }
    });

    res.json(denuncia);
  } catch (error) {
    console.error('Erro ao atualizar status da denúncia:', error);
    res.status(500).json({ message: 'Erro ao atualizar status da denúncia' });
  }
});

export default router;
