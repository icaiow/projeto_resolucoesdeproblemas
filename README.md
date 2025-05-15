# NoHate

Sistema integrado para gestão institucional, focado na segurança e bem-estar dos alunos, com funcionalidades de denúncias, escutas, acompanhamento e comunicação entre escola, alunos e responsáveis.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API](#api)
- [Banco de Dados](#banco-de-dados)
- [Segurança](#segurança)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## 🎯 Visão Geral

O NoHate é uma plataforma completa para gestão escolar, com foco especial na segurança e bem-estar dos alunos. O sistema permite o gerenciamento de denúncias, escutas digitais, comunicação entre escola e responsáveis, acompanhamento de atividades, materiais educativos e geração de relatórios.

---

## ✨ Funcionalidades

### Área Institucional
- **Dashboard**: Estatísticas, gráficos, alertas e notificações.
- **Gestão de Alunos**: Cadastro, perfil, histórico e vinculação com responsáveis.
- **Gestão de Denúncias**: Registro, acompanhamento, histórico e relatórios.
- **Gestão de Escutas**: Registro, acompanhamento e histórico de atendimentos.
- **Materiais Educativos**: Upload, categorização e compartilhamento.
- **Relatórios**: Geração e exportação em PDF.

### Área do Aluno
- **Dashboard Personalizado**: Atividades recentes, notificações e acesso rápido.
- **Sistema de Escuta**: Solicitação de ajuda, acompanhamento e histórico.
- **Denúncias**: Registro, acompanhamento e histórico.
- **Materiais**: Acesso, download e favoritos.

### Área do Responsável
- **Dashboard**: Acompanhamento de alunos, notificações e alertas.
- **Comunicação**: Mensagens para escola, acompanhamento de denúncias e notificações.
- **Vinculação**: Código de vinculação, gerenciamento de vínculos e histórico.

---

## 🛠 Tecnologias Utilizadas

### Frontend
- React 18.3
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Router v6
- React Query
- Lucide Icons
- Vite

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma
- JWT
- TypeScript

---

## 💻 Requisitos do Sistema

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior) ou yarn
- PostgreSQL (versão 14 ou superior)
- Git

Para verificar as versões instaladas, execute:
```bash
node --version
npm --version
git --version
```

---

## 🚀 Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/icaiow/projeto_resolucoesdeproblemas.git
cd projeto_resolucoesdeproblemas
```

### 2. Configuração do Frontend
```bash
# Instale as dependências do frontend
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

### 3. Configuração do Backend
```bash
# Entre na pasta do backend
cd backend

# Instale as dependências do backend
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.example .env

# Execute as migrações do banco de dados
npm run prisma:migrate

# Gere os tipos do Prisma
npm run prisma:generate

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## ⚙️ Configuração

### Variáveis de Ambiente Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=NoHate
```

### Variáveis de Ambiente Backend (.env)
```env
# Configuração do Banco de Dados
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nohate"

# Configuração do JWT
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRES_IN=24h

# Configuração do Servidor
PORT=3000
NODE_ENV=development
```

### Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL:
```sql
CREATE DATABASE nohate;
```

2. Configure a URL do banco de dados no arquivo `.env` do backend

3. Execute as migrações:
```bash
cd backend
npm run prisma:migrate
```

---

## 🔧 Verificação da Instalação

Para verificar se tudo está funcionando corretamente:

1. Frontend deve estar rodando em: `http://localhost:8080`
2. Backend deve estar rodando em: `http://localhost:3000`
3. Prisma Studio (interface do banco de dados) pode ser acessado com:
```bash
cd backend
npm run prisma:studio
```

---

## 🚨 Solução de Problemas Comuns

### Erro de Conexão com o Banco de Dados
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Verifique se o banco de dados foi criado

### Erro de Porta em Uso
- Verifique se não há outros serviços rodando nas portas 3000 (backend) ou 5173 (frontend)
- Altere as portas no arquivo de configuração se necessário

### Erro de Dependências
- Limpe o cache do npm: `npm cache clean --force`
- Delete as pastas node_modules e reinstale as dependências

---

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

---

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

---

## 🔌 API

### Autenticação
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh-token
```

### Alunos
```http
GET /api/alunos
GET /api/alunos/:id
POST /api/alunos
PUT /api/alunos/:id
GET /api/alunos/:id/historico
POST /api/alunos/:id/gerar-codigo-vinculacao
```

### Responsáveis
```http
GET /api/responsaveis
GET /api/responsaveis/:id
POST /api/responsaveis
PUT /api/responsaveis/:id
POST /api/responsaveis/vincular-aluno
```

### Denúncias
```http
GET /api/denuncias
GET /api/denuncias/:id
POST /api/denuncias
PUT /api/denuncias/:id/status
```

### Escutas
```http
GET /api/escutas
GET /api/escutas/:id
POST /api/escutas
PUT /api/escutas/:id/status
```

---

## 🔒 Segurança

- Autenticação JWT
- Criptografia de senhas
- Validação de tokens
- Proteção contra CSRF
- Sanitização de inputs
- Rate limiting
- Logs de acesso

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Link do Projeto: [https://github.com/icaiow/projeto_resolucoesdeproblemas.git](https://github.com/icaiow/projeto_resolucoesdeproblemas.git)