import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Rota para listar todas as denúncias
router.get('/', authMiddleware, async (req, res) => {
  try {
    const denuncias = await prisma.denuncia.findMany({
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
      }
    });
    
    res.json(denuncias);
  } catch (error) {
    console.error('Erro ao buscar denúncias:', error);
    res.status(500).json({ message: 'Erro ao buscar denúncias' });
  }
});

// Rota para criar uma nova denúncia
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao, tipo, anonima } = req.body;
    const usuarioId = req.usuario?.id;
    
    const denuncia = await prisma.denuncia.create({
      data: {
        titulo,
        descricao,
        tipo,
        status: 'pendente',
        anonima: anonima || false,
        usuarioId: anonima ? null : usuarioId
      }
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