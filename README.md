# NoHate

Sistema integrado para gestão institucional, focado na segurança e bem-estar dos alunos, com funcionalidades de denúncias, escutas, acompanhamento e comunicação entre escola, alunos e responsáveis.

---

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
- React
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Router
- React Query
- Lucide Icons

### Backend
- Node.js
- Express/NestJS
- PostgreSQL
- Prisma
- JWT
- Redis (opcional)

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

## 🚀 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/icaiow/projeto_resolucoesdeproblemas.git
   ```

2. Instale as dependências do frontend:
   ```bash
   cd projeto_resolucoesdeproblemas
   npm install
   ```

3. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Frontend
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=NoHate

# Backend
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
JWT_SECRET=your_jwt_secret
PORT=3000
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