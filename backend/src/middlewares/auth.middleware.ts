import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TokenPayload {
  id: number;
  tipo: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        tipo: string;
        instituicaoId?: number;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('Token não fornecido');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    console.log('Token mal formatado:', authHeader);
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    console.log('Token mal formatado (scheme inválido):', scheme);
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as TokenPayload;
    console.log('Token decodificado:', decoded);

    // Buscar informações adicionais do usuário no banco
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: {
        instituicao: true
      }
    });

    if (!usuario) {
      console.log('Usuário não encontrado no banco:', decoded.id);
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    console.log('Usuário encontrado:', usuario);

    req.usuario = {
      id: usuario.id,
      tipo: usuario.tipo,
      instituicaoId: usuario.instituicao?.id
    };

    console.log('Usuário adicionado à requisição:', req.usuario);
    return next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};