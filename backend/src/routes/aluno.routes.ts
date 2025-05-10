import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Rota para cadastro de aluno
router.post('/cadastro', async (req, res) => {
  try {
    const { 
      nome, 
      email, 
      senha, 
      matricula,
      turma,
      serie,
      dataNascimento,
      instituicaoId
    } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Verificar se a matrícula já existe
    const alunoExistente = await prisma.aluno.findUnique({
      where: { matricula },
    });

    if (alunoExistente) {
      return res.status(400).json({ message: 'Matrícula já cadastrada' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criar o usuário e o aluno em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar o usuário
      const novoUsuario = await tx.usuario.create({
        data: {
          email,
          senha: senhaHash,
          nome,
          tipo: 'aluno',
        },
      });

      // Criar o aluno
      const novoAluno = await tx.aluno.create({
        data: {
          usuarioId: novoUsuario.id,
          matricula,
          turma,
          serie,
          dataNascimento: new Date(dataNascimento),
          instituicaoId: instituicaoId || null
        },
      });

      return { usuario: novoUsuario, aluno: novoAluno };
    });

    // Gerar token JWT
    const token = jwt.sign(
      { id: result.usuario.id, tipo: result.usuario.tipo },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Aluno cadastrado com sucesso',
      token,
      usuario: {
        id: result.usuario.id,
        email: result.usuario.email,
        nome: result.usuario.nome,
        tipo: result.usuario.tipo,
      },
      aluno: result.aluno,
    });
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(500).json({ message: 'Erro ao cadastrar aluno' });
  }
});

export default router;