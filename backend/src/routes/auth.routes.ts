import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const { email, senha, nome, tipo, matricula, turma, serie, dataNascimento, cpf, telefone, cnpj, endereco, instituicaoId } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criar o usuário e, se for aluno, também criar o registro de aluno
    if (tipo === 'aluno' && matricula && turma && serie && dataNascimento) {
      // Criar o usuário e o aluno em uma transação
      const result = await prisma.$transaction(async (tx) => {
        // Criar o usuário
        const novoUsuario = await tx.usuario.create({
          data: {
            email,
            senha: senhaHash,
            nome,
            tipo,
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
            instituicaoId: instituicaoId || null,
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
        message: 'Usuário e perfil de aluno criados com sucesso',
        token,
        usuario: {
          id: result.usuario.id,
          email: result.usuario.email,
          nome: result.usuario.nome,
          tipo: result.usuario.tipo,
        },
        aluno: result.aluno,
      });
    } 
    // Criar o usuário e, se for responsável, também criar o registro de responsável
    else if (tipo === 'responsavel' && cpf && telefone) {
      // Criar o usuário e o responsável em uma transação
      const result = await prisma.$transaction(async (tx) => {
        // Criar o usuário
        const novoUsuario = await tx.usuario.create({
          data: {
            email,
            senha: senhaHash,
            nome,
            tipo,
          },
        });

        // Criar o responsável
        const novoResponsavel = await tx.responsavel.create({
          data: {
            usuarioId: novoUsuario.id,
            cpf,
            telefone,
          },
        });

        return { usuario: novoUsuario, responsavel: novoResponsavel };
      });

      // Gerar token JWT
      const token = jwt.sign(
        { id: result.usuario.id, tipo: result.usuario.tipo },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );

      res.status(201).json({
        message: 'Usuário e perfil de responsável criados com sucesso',
        token,
        usuario: {
          id: result.usuario.id,
          email: result.usuario.email,
          nome: result.usuario.nome,
          tipo: result.usuario.tipo,
        },
        responsavel: result.responsavel,
      });
    } 
    // Criar o usuário e, se for instituição, também criar o registro de instituição
    else if (tipo === 'instituicao' && cnpj && endereco) {
      // Criar o usuário e a instituição em uma transação
      const result = await prisma.$transaction(async (tx) => {
        // Criar o usuário
        const novoUsuario = await tx.usuario.create({
          data: {
            email,
            senha: senhaHash,
            nome,
            tipo,
          },
        });

        // Criar a instituição
        const novaInstituicao = await tx.instituicao.create({
          data: {
            usuarioId: novoUsuario.id,
            cnpj,
            endereco,
          },
        });

        return { usuario: novoUsuario, instituicao: novaInstituicao };
      });

      // Gerar token JWT
      const token = jwt.sign(
        { id: result.usuario.id, tipo: result.usuario.tipo },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );

      res.status(201).json({
        message: 'Usuário e perfil de instituição criados com sucesso',
        token,
        usuario: {
          id: result.usuario.id,
          email: result.usuario.email,
          nome: result.usuario.nome,
          tipo: result.usuario.tipo,
        },
        instituicao: result.instituicao,
      });
    } else {
      // Criar apenas o usuário (para outros tipos ou quando faltam dados específicos)
      const novoUsuario = await prisma.usuario.create({
        data: {
          email,
          senha: senhaHash,
          nome,
          tipo,
        },
      });

      // Gerar token JWT
      const token = jwt.sign(
        { id: novoUsuario.id, tipo: novoUsuario.tipo },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        token,
        usuario: {
          id: novoUsuario.id,
          email: novoUsuario.email,
          nome: novoUsuario.nome,
          tipo: novoUsuario.tipo,
        },
      });
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

export default router;