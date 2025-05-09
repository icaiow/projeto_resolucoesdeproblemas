import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Rota para listar todos os documentos
router.get('/', async (req, res) => {
  try {
    const documentos = await prisma.documento.findMany();
    res.json(documentos);
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).json({ message: 'Erro ao buscar documentos' });
  }
});

// Rota para buscar um documento específico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const documento = await prisma.documento.findUnique({
      where: { id: Number(id) }
    });
    
    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }
    
    res.json(documento);
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    res.status(500).json({ message: 'Erro ao buscar documento' });
  }
});

// Rota para criar um novo documento (requer autenticação)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { titulo, descricao, url, tipo } = req.body;
    
    // Verificar se o usuário é admin
    if (req.usuario?.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    
    const documento = await prisma.documento.create({
      data: {
        titulo,
        descricao,
        url,
        tipo
      }
    });
    
    res.status(201).json(documento);
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({ message: 'Erro ao criar documento' });
  }
});

export default router;