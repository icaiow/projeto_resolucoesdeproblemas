import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Rotas
import authRoutes from './routes/auth.routes';
import alunoRoutes from './routes/aluno.routes';
import responsavelRoutes from './routes/responsavel.routes';
import denunciaRoutes from './routes/denuncia.routes';
import documentoRoutes from './routes/documento.routes';
import instituicaoRoutes from './routes/instituicao.routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/responsaveis', responsavelRoutes);
app.use('/api/denuncias', denunciaRoutes);
app.use('/api/documentos', documentoRoutes);
app.use('/api/instituicoes', instituicaoRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('api esta funcionando');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Lidar com o encerramento do servidor
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Conexão com o banco de dados fechada');
  process.exit(0);
});