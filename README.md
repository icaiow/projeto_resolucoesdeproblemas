# Ambiente Escolar Seguro

## 📋 Sobre o Projeto

Plataforma integrada para acolhimento, prevenção e gestão do bem-estar escolar.
Desenvolvida para conectar instituições de ensino, responsáveis e alunos em prol de um ambiente mais humano, empático e seguro.


## 🚀 Funcionalidades

### 👨‍🏫 Área Institucional
- Login institucional
- Gestão de alunos e responsáveis
- Monitoramento de denúncias
- Gerenciamento de materiais educativos
- Relatórios e estatísticas
- Configurações institucionais

### 👨‍🎓 Área do Aluno
- Login do aluno
- Denúncias anônimas
- Acesso a materiais educativos
- Perfil personalizado
- Atividades recentes
- Informações sobre bullying
- Busca de ajuda psicológica

### 👨‍👩‍👧‍👦 Área do Responsável
- Login do responsável
- Envio de denúncias
- Histórico de denúncias
- Comunicação com a escola
- Acesso a materiais educativos
- Notificações
- Documentos importantes

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - React Router DOM
  - React Query
  - Lucide Icons

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITÓRIO>
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🎨 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── hooks/         # Hooks personalizados
├── lib/           # Configurações e utilitários
└── App.tsx        # Componente principal
```

## 🔐 Rotas Principais

### Rotas Públicas
- `/` - Página inicial
- `/login-institucional` - Login para instituições
- `/login-aluno` - Login para alunos
- `/login-responsavel` - Login para responsáveis
- `/cadastro-responsavel` - Cadastro de responsáveis

### Rotas Protegidas
- `/home-institucional` - Dashboard institucional
- `/home-alunos` - Dashboard do aluno
- `/home-responsaveis` - Dashboard do responsável
- `/denuncia` - Envio de denúncias
- `/historico-denuncias` - Histórico de denúncias
- `/comunicacao` - Comunicação com a escola
- `/materiais` - Materiais educativos
- `/notificacoes` - Notificações
- `/documentos` - Documentos importantes

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Para mais informações ou suporte, entre em contato através do email: [seu-email@exemplo.com]
