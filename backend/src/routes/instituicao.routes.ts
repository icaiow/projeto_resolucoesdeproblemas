import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// Rota para cadastro de instituição
router.post('/cadastro', async (req, res) => {
  try {
    const { 
      nome, 
      email, 
      senha, 
      cnpj, 
      endereco, 
      telefone, 
      cidade, 
      estado, 
      cep, 
      tipo, 
      responsavelNome,
      responsavelCpf,  // Adicione esta linha
      website 
    } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Verificar se o CNPJ já existe
    const instituicaoExistente = await prisma.instituicao.findFirst({
      where: { cnpj },
    });

    if (instituicaoExistente) {
      return res.status(400).json({ message: 'CNPJ já cadastrado' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criar o usuário e a instituição em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar o usuário
      const novoUsuario = await tx.usuario.create({
        data: {
          email,
          senha: senhaHash,
          nome,
          tipo: 'instituicao',
        },
      });

      // Criar a instituição
      const novaInstituicao = await tx.instituicao.create({
        data: {
          usuarioId: novoUsuario.id,
          cnpj,
          endereco,
          telefone,
          responsavelNome,
          responsavelCpf  // Use a variável diretamente
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
      message: 'Instituição cadastrada com sucesso',
      token,
      usuario: {
        id: result.usuario.id,
        email: result.usuario.email,
        nome: result.usuario.nome,
        tipo: result.usuario.tipo,
      },
      instituicao: result.instituicao,
    });
  } catch (error) {
    console.error('Erro ao cadastrar instituição:', error);
    res.status(500).json({ message: 'Erro ao cadastrar instituição' });
  }
});

// Rota para vincular um aluno a uma instituição
router.post('/vincular-aluno', authMiddleware, async (req, res) => {
  try {
    const { alunoId } = req.body;
    const usuarioId = req.usuario?.id;
    const usuarioTipo = req.usuario?.tipo;

    console.log('Iniciando vinculação de aluno:', {
      alunoId,
      usuarioId,
      usuarioTipo,
      body: req.body,
      headers: req.headers
    });

    // Verificar se o usuário está autenticado
    if (!usuarioId) {
      console.log('Usuário não autenticado');
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Verificar se o usuário é uma instituição
    const instituicao = await prisma.instituicao.findFirst({
      where: { 
        usuarioId: usuarioId 
      },
      include: {
        usuario: true
      }
    });

    console.log('Instituição encontrada:', {
      id: instituicao?.id,
      nome: instituicao?.usuario.nome,
      usuarioId: instituicao?.usuarioId
    });

    if (!instituicao) {
      console.log('Usuário não é uma instituição. Tipo:', usuarioTipo);
      return res.status(403).json({ 
        message: 'Usuário não é uma instituição',
        usuarioTipo: usuarioTipo
      });
    }

    // Verificar se o aluno existe
    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
      include: {
        usuario: true,
        instituicao: {
          include: {
            usuario: true
          }
        }
      }
    });

    console.log('Aluno encontrado:', {
      id: aluno?.id,
      nome: aluno?.usuario.nome,
      matricula: aluno?.matricula,
      instituicaoId: aluno?.instituicaoId,
      instituicaoNome: aluno?.instituicao?.usuario.nome
    });

    if (!aluno) {
      console.log('Aluno não encontrado');
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Verificar se o aluno já está vinculado a outra instituição
    if (aluno.instituicaoId && aluno.instituicaoId !== instituicao.id) {
      console.log('Aluno já vinculado a outra instituição:', {
        alunoInstituicaoId: aluno.instituicaoId,
        instituicaoAtual: instituicao.id,
        instituicaoNome: aluno.instituicao?.usuario.nome
      });
      return res.status(400).json({ 
        message: `Este aluno já está vinculado à instituição: ${aluno.instituicao?.usuario.nome}` 
      });
    }

    // Atualizar o aluno com a instituição
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: alunoId },
      data: { 
        instituicaoId: instituicao.id 
      },
      include: {
        usuario: true,
        instituicao: {
          include: {
            usuario: true
          }
        }
      }
    });

    console.log('Aluno atualizado com sucesso:', {
      id: alunoAtualizado.id,
      nome: alunoAtualizado.usuario.nome,
      matricula: alunoAtualizado.matricula,
      instituicaoId: alunoAtualizado.instituicaoId,
      instituicaoNome: alunoAtualizado.instituicao?.usuario.nome
    });

    res.json({
      message: 'Aluno vinculado com sucesso',
      aluno: {
        id: alunoAtualizado.id,
        nome: alunoAtualizado.usuario.nome,
        matricula: alunoAtualizado.matricula,
        instituicaoNome: alunoAtualizado.instituicao?.usuario.nome
      }
    });
  } catch (error) {
    console.error('Erro detalhado ao vincular aluno à instituição:', error);
    res.status(500).json({ 
      message: 'Erro ao vincular aluno à instituição',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
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

// Rota para obter o perfil da instituição autenticada
router.get('/perfil', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.usuario?.id;
    const instituicao = await prisma.instituicao.findUnique({
      where: { usuarioId },
      include: { usuario: true }
    });

    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    res.json({
      nome: instituicao.usuario.nome,
      cnpj: instituicao.cnpj,
      ultimoAcesso: instituicao.usuario.updatedAt
    });
  } catch (error) {
    console.error('Erro ao buscar perfil da instituição:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil da instituição' });
  }
});

// Rota para atualizar o perfil da instituição autenticada
router.put('/perfil', authMiddleware, async (req, res) => {
  try {
    const { nome, cnpj } = req.body;
    const usuarioId = req.usuario?.id;

    // Verificar se o usuário é uma instituição
    const instituicao = await prisma.instituicao.findUnique({
      where: { usuarioId },
      include: { usuario: true }
    });

    if (!instituicao) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    // Verificar se o CNPJ já existe (caso esteja sendo alterado)
    if (cnpj !== instituicao.cnpj) {
      const cnpjExistente = await prisma.instituicao.findFirst({
        where: { 
          cnpj,
          NOT: { id: instituicao.id }
        }
      });

      if (cnpjExistente) {
        return res.status(400).json({ message: 'CNPJ já cadastrado para outra instituição' });
      }
    }

    // Atualizar em uma transação para garantir consistência
    const result = await prisma.$transaction(async (tx) => {
      // Atualizar nome do usuário
      const usuarioAtualizado = await tx.usuario.update({
        where: { id: usuarioId },
        data: { nome }
      });

      // Atualizar CNPJ da instituição
      const instituicaoAtualizada = await tx.instituicao.update({
        where: { id: instituicao.id },
        data: { cnpj }
      });

      return { usuario: usuarioAtualizado, instituicao: instituicaoAtualizada };
    });

    res.json({
      nome: result.usuario.nome,
      cnpj: result.instituicao.cnpj,
      ultimoAcesso: result.usuario.updatedAt
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil da instituição:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil da instituição' });
  }
});

export default router;