// 📁 backend/routes/documento.routes.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Pasta onde os arquivos ficarão salvos
const uploadFolder = path.join(__dirname, '..', '..', 'uploads');

// Criar pasta de uploads se não existir
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

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

// Rota para enviar novo documento com arquivo
router.post('/', authMiddleware, upload.single('arquivo'), async (req, res) => {
  try {
    const { titulo, descricao, tipo } = req.body;
    const tipoUsuario = req.usuario?.tipo?.toLowerCase();

    if (tipoUsuario !== 'admin' && tipoUsuario !== 'instituicao') {
      return res.status(403).json({ message: 'Apenas administradores ou instituições podem enviar documentos.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Arquivo não enviado' });
    }

    const documento = await prisma.documento.create({
      data: {
        titulo,
        descricao,
        tipo,
        url: `/uploads/${req.file.filename}`
      }
    });

    res.status(201).json(documento);
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({ message: 'Erro ao criar documento' });
  }
});

export default router;
