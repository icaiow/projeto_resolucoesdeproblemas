import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Rota para buscar aluno por matrícula
router.get('/buscar/:matricula', async (req: Request, res: Response) => {
  try {
    const { matricula } = req.params;
    console.log('Buscando aluno com matrícula:', matricula);

    // Primeiro, buscar o aluno na tabela Aluno
    const aluno = await prisma.aluno.findFirst({
      where: { 
        matricula: matricula 
      },
      include: {
        // Incluir os dados do usuário relacionado
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            tipo: true,
            updatedAt: true,
            createdAt: true
          }
        },
        // Incluir os dados da instituição se existir
        instituicao: {
          select: {
            id: true,
            usuario: {
              select: {
                nome: true
              }
            }
          }
        }
      }
    });

    if (!aluno) {
      console.log('Aluno não encontrado');
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    console.log('Dados brutos do aluno encontrado:', aluno);

    // Formatar a resposta com os dados do aluno e do usuário
    const alunoFormatado = {
      id: aluno.id, // ID do aluno
      usuarioId: aluno.usuarioId, // ID do usuário relacionado
      nome: aluno.usuario.nome,
      email: aluno.usuario.email,
      matricula: aluno.matricula,
      turma: aluno.turmaId,
      dataNascimento: aluno.dataNascimento,
      status: aluno.instituicaoId ? 'ativo' : 'inativo',
      instituicaoId: aluno.instituicaoId,
      instituicaoNome: aluno.instituicao?.usuario.nome || null,
      ultimoAcesso: aluno.usuario.updatedAt,
      dataCadastro: aluno.usuario.createdAt
    };

    console.log('Aluno formatado para resposta:', alunoFormatado);
    res.json(alunoFormatado);
  } catch (error) {
    console.error('Erro detalhado ao buscar aluno:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar aluno',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router; 