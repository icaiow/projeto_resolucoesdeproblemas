import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path'; // ⚠️ IMPORTANTE: adicione isso para usar path.join()

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
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Configuração do CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  maxAge: 86400 // 24 horas
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ✅ Middleware para servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/responsaveis', responsavelRoutes);
app.use('/api/denuncias', denunciaRoutes);
app.use('/api/documentos', documentoRoutes);
app.use('/api/instituicoes', instituicaoRoutes);

// Rota de teste
app.get('/', (req, res) => {
  console.log('Rota de teste acessada');
  res.send('API está funcionando!');
});

// Middleware de erro
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(500).send('Erro interno do servidor');
});

// Iniciar o servidor
const server = app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  console.log('Ambiente:', process.env.NODE_ENV);
  console.log('Porta:', PORT);
});

// Lidar com o encerramento do servidor
process.on('SIGINT', async () => {
  console.log('Encerrando servidor...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Conexão com o banco de dados fechada');
    process.exit(0);
  });
});
