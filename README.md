# Ambiente Escolar Seguro

Sistema integrado para gestão escolar, focado na segurança e bem-estar dos alunos, com funcionalidades de denúncias, escutas e acompanhamento.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API](#api)
- [Banco de Dados](#banco-de-dados)
- [Segurança](#segurança)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

O Ambiente Escolar Seguro é uma plataforma completa para gestão escolar, com foco especial na segurança e bem-estar dos alunos. O sistema permite o gerenciamento de denúncias, escutas digitais, comunicação entre escola e responsáveis, e acompanhamento de atividades.

## ✨ Funcionalidades

### Área Institucional
- **Dashboard**
  - Estatísticas gerais
  - Gráficos de desempenho
  - Alertas e notificações

- **Gestão de Alunos**
  - Cadastro completo
  - Perfil detalhado
  - Histórico de atividades
  - Vinculação com responsáveis

- **Gestão de Denúncias**
  - Registro de denúncias
  - Acompanhamento de status
  - Histórico de casos
  - Relatórios

- **Gestão de Escutas**
  - Registro de escutas
  - Acompanhamento
  - Histórico de atendimentos

- **Materiais Educativos**
  - Upload de materiais
  - Categorização
  - Compartilhamento

- **Relatórios**
  - Geração de relatórios
  - Exportação em PDF
  - Gráficos e estatísticas

### Área do Aluno
- **Dashboard Personalizado**
  - Atividades recentes
  - Notificações
  - Acesso rápido

- **Sistema de Escuta**
  - Solicitação de ajuda
  - Acompanhamento
  - Histórico de atendimentos

- **Denúncias**
  - Registro de denúncias
  - Acompanhamento
  - Histórico

- **Materiais**
  - Acesso a materiais
  - Download
  - Favoritos

### Área do Responsável
- **Dashboard**
  - Acompanhamento de alunos
  - Notificações
  - Alertas

- **Comunicação**
  - Mensagens para escola
  - Acompanhamento de denúncias
  - Notificações

- **Vinculação**
  - Código de vinculação
  - Gerenciamento de vínculos
  - Histórico de atividades

## 🛠 Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Router
- React Query
- Lucide Icons

### Backend (Planejado)
- Node.js
- Express/NestJS
- PostgreSQL
- Prisma
- JWT
- Redis (opcional)

## 📁 Estrutura do Projeto

```
projeto/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── pages/
│   │   ├── institucional/
│   │   ├── aluno/
│   │   └── responsavel/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── types/
├── public/
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── services/
    │   ├── models/
    │   ├── middlewares/
    │   └── utils/
    └── prisma/
```

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ambiente-escolar-seguro.git
```

2. Instale as dependências do frontend:
```bash
cd ambiente-escolar-seguro
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## ⚙️ Configuração

### Variáveis de Ambiente
```env
# Frontend
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Ambiente Escolar Seguro

# Backend
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
JWT_SECRET=your_jwt_secret
PORT=3000
```

## 💻 Uso

### Área Institucional
1. Acesse `/login-institucional`
2. Faça login com suas credenciais
3. Acesse o dashboard institucional

### Área do Aluno
1. Acesse `/login-aluno`
2. Faça login com suas credenciais
3. Acesse o dashboard do aluno

### Área do Responsável
1. Acesse `/login-responsavel`
2. Faça login com suas credenciais
3. Acesse o dashboard do responsável

## 🔌 API

### Autenticação
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh-token
```

### Alunos
```typescript
GET /api/alunos
GET /api/alunos/:id
POST /api/alunos
PUT /api/alunos/:id
GET /api/alunos/:id/historico
POST /api/alunos/:id/gerar-codigo-vinculacao
```

### Responsáveis
```typescript
GET /api/responsaveis
GET /api/responsaveis/:id
POST /api/responsaveis
PUT /api/responsaveis/:id
POST /api/responsaveis/vincular-aluno
```

### Denúncias
```typescript
GET /api/denuncias
GET /api/denuncias/:id
POST /api/denuncias
PUT /api/denuncias/:id/status
```

### Escutas
```typescript
GET /api/escutas
GET /api/escutas/:id
POST /api/escutas
PUT /api/escutas/:id/status
```

## 💾 Banco de Dados

### Principais Tabelas
```sql
-- Usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255),
  tipo ENUM('aluno', 'responsavel', 'institucional'),
  created_at TIMESTAMP
);

-- Alunos
CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  matricula VARCHAR(50) UNIQUE,
  turma VARCHAR(50),
  data_nascimento DATE,
  codigo_vinculacao VARCHAR(10) UNIQUE,
  status ENUM('ativo', 'inativo', 'transferido')
);

-- Responsáveis
CREATE TABLE responsaveis (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  cpf VARCHAR(14) UNIQUE,
  telefone VARCHAR(20)
);

-- Vinculações
CREATE TABLE vinculacoes (
  id SERIAL PRIMARY KEY,
  aluno_id INTEGER REFERENCES alunos(id),
  responsavel_id INTEGER REFERENCES responsaveis(id),
  parentesco VARCHAR(50),
  status ENUM('pendente', 'ativo', 'inativo'),
  created_at TIMESTAMP
);
```

## 🔒 Segurança

### Implementações
- Autenticação JWT
- Criptografia de senhas
- Validação de tokens
- Proteção contra CSRF
- Sanitização de inputs
- Rate limiting
- Logs de acesso

### Boas Práticas
- Validação de dados
- Sanitização de inputs
- Proteção contra injeção SQL
- Criptografia de dados sensíveis
- Logs de auditoria
- Monitoramento de acesso

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Seu Nome - [@seutwitter](https://twitter.com/seutwitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/ambiente-escolar-seguro](https://github.com/seu-usuario/ambiente-escolar-seguro)
