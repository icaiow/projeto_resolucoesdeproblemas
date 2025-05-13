import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const { email, senha, nome, tipo, matricula, turmaId, dataNascimento, cpf, telefone, cnpj, endereco, instituicaoId } = req.body;

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
    if (tipo === 'aluno' && matricula && turmaId && dataNascimento) {
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
            turmaId,
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
    const { email, matricula, senha } = req.body;

    let usuario;

    if (matricula) {
      // Buscar o aluno pela matrícula
      const aluno = await prisma.aluno.findUnique({
        where: { matricula },
        include: { usuario: true },
      });

      if (!aluno) {
        return res.status(400).json({ message: 'Credenciais inválidas' });
      }

      usuario = aluno.usuario;
    } else {
      // Buscar o usuário pelo email
      usuario = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!usuario) {
        return res.status(400).json({ message: 'Credenciais inválidas' });
      }
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

// Rota para listar usuários por tipo
router.get('/usuarios', authMiddleware, async (req, res) => {
  try {
    const { tipo } = req.query;
    console.log('Buscando usuários do tipo:', tipo);
    console.log('Usuário autenticado:', req.usuario);
    
    if (!tipo) {
      console.log('Tipo não especificado na requisição');
      return res.status(400).json({ message: 'Tipo de usuário não especificado' });
    }

    // Buscar usuários do tipo especificado
    let usuarios;
    const tipoUpper = tipo.toString().toUpperCase();
    const tipoLower = tipo.toString().toLowerCase();
    console.log('Tipo convertido para minúsculas:', tipoLower);
    
    if (tipoUpper === 'ALUNO') {
      console.log('Buscando alunos...');
      usuarios = await prisma.usuario.findMany({
        where: { tipo: tipoLower },
        include: {
          aluno: true
        }
      });
      console.log('Alunos encontrados:', usuarios);
    } else if (tipoUpper === 'RESPONSAVEL') {
      console.log('Buscando responsáveis...');
      usuarios = await prisma.usuario.findMany({
        where: { tipo: tipoLower },
        include: {
          responsavel: true
        }
      });
      console.log('Responsáveis encontrados:', usuarios);
    } else {
      console.log('Buscando outros tipos de usuário...');
      usuarios = await prisma.usuario.findMany({
        where: { tipo: tipoLower }
      });
      console.log('Usuários encontrados:', usuarios);
    }

    // Formatar a resposta de acordo com o tipo
    console.log('Formatando resposta...');
    const usuariosFormatados = await Promise.all(usuarios.map(async (usuario: any) => {
      console.log('Formatando usuário:', usuario);
      const base = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        ultimoAcesso: usuario.updatedAt
      };

      if (tipoUpper === 'ALUNO' && usuario.aluno) {
        // Se o aluno tiver uma instituição, buscar o nome da instituição
        let nomeInstituicao = null;
        if (usuario.aluno.instituicaoId) {
          const instituicao = await prisma.instituicao.findUnique({
            where: { id: usuario.aluno.instituicaoId },
            include: { usuario: true }
          });
          nomeInstituicao = instituicao?.usuario.nome || null;
        }

        const alunoFormatado = {
          ...base,
          matricula: usuario.aluno.matricula,
          turmaId: usuario.aluno.turmaId,
          dataNascimento: usuario.aluno.dataNascimento,
          instituicaoNome: nomeInstituicao
        };
        console.log('Aluno formatado:', alunoFormatado);
        return alunoFormatado;
      }

      if (tipoUpper === 'RESPONSAVEL' && usuario.responsavel) {
        const responsavelFormatado = {
          ...base,
          cpf: usuario.responsavel.cpf,
          telefone: usuario.responsavel.telefone
        };
        console.log('Responsável formatado:', responsavelFormatado);
        return responsavelFormatado;
      }

      console.log('Usuário base formatado:', base);
      return base;
    }));

    console.log('Total de usuários formatados:', usuariosFormatados.length);
    console.log('Resposta final:', usuariosFormatados);
    res.json(usuariosFormatados);
  } catch (error) {
    console.error('Erro detalhado ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
});

// Rota de teste para criar usuários de exemplo
router.post('/criar-usuarios-teste', authMiddleware, async (req, res) => {
  try {
    // Verificar se o usuário está autenticado e é uma instituição
    if (!req.usuario || req.usuario.tipo !== 'instituicao') {
      return res.status(403).json({ message: 'Apenas instituições podem criar usuários de teste' });
    }

    // Criar alguns alunos de teste
    const alunos = [
      {
        email: 'aluno1@teste.com',
        senha: '123456',
        nome: 'João Silva',
        tipo: 'aluno',
        matricula: '2024001',
        turmaId: '1A',
        dataNascimento: '2010-01-15'
      },
      {
        email: 'aluno2@teste.com',
        senha: '123456',
        nome: 'Maria Santos',
        tipo: 'aluno',
        matricula: '2024002',
        turmaId: '1B',
        dataNascimento: '2009-05-20'
      }
    ];

    // Criar alguns responsáveis de teste
    const responsaveis = [
      {
        email: 'responsavel1@teste.com',
        senha: '123456',
        nome: 'Carlos Silva',
        tipo: 'responsavel',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-9999'
      },
      {
        email: 'responsavel2@teste.com',
        senha: '123456',
        nome: 'Ana Santos',
        tipo: 'responsavel',
        cpf: '987.654.321-00',
        telefone: '(11) 98888-8888'
      }
    ];

    const resultados = {
      alunos: [] as any[],
      responsaveis: [] as any[]
    };

    // Criar alunos
    for (const aluno of alunos) {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(aluno.senha, salt);

      const result = await prisma.$transaction(async (tx) => {
        const novoUsuario = await tx.usuario.create({
          data: {
            email: aluno.email,
            senha: senhaHash,
            nome: aluno.nome,
            tipo: aluno.tipo.toLowerCase() // Garantir que o tipo seja minúsculo
          }
        });

        const novoAluno = await tx.aluno.create({
          data: {
            usuarioId: novoUsuario.id,
            matricula: aluno.matricula,
            turmaId: aluno.turmaId,
            dataNascimento: new Date(aluno.dataNascimento),
            instituicaoId: req.usuario?.id ? undefined : undefined
          }
        });

        return { usuario: novoUsuario, aluno: novoAluno };
      });

      resultados.alunos.push(result);
    }

    // Criar responsáveis
    for (const responsavel of responsaveis) {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(responsavel.senha, salt);

      const result = await prisma.$transaction(async (tx) => {
        const novoUsuario = await tx.usuario.create({
          data: {
            email: responsavel.email,
            senha: senhaHash,
            nome: responsavel.nome,
            tipo: responsavel.tipo.toLowerCase() // Garantir que o tipo seja minúsculo
          }
        });

        const novoResponsavel = await tx.responsavel.create({
          data: {
            usuarioId: novoUsuario.id,
            cpf: responsavel.cpf,
            telefone: responsavel.telefone
          }
        });

        return { usuario: novoUsuario, responsavel: novoResponsavel };
      });

      resultados.responsaveis.push(result);
    }

    res.status(201).json({
      message: 'Usuários de teste criados com sucesso',
      total: {
        alunos: resultados.alunos.length,
        responsaveis: resultados.responsaveis.length
      }
    });
  } catch (error) {
    console.error('Erro ao criar usuários de teste:', error);
    res.status(500).json({ message: 'Erro ao criar usuários de teste' });
  }
});

export default router;