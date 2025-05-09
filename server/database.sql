CREATE TABLE responsaveis (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  cpf VARCHAR(14) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  matricula VARCHAR(20) UNIQUE NOT NULL,
  turma VARCHAR(50),
  status VARCHAR(20) DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vinculacoes (
  id SERIAL PRIMARY KEY,
  responsavel_id INTEGER REFERENCES responsaveis(id),
  matricula_aluno VARCHAR(20) NOT NULL,
  nome_aluno VARCHAR(255) NOT NULL,
  parentesco VARCHAR(50) NOT NULL,
  data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pendente',
  UNIQUE(responsavel_id, matricula_aluno)
);

CREATE TABLE instituicoes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE denuncias (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL, -- "bullying", "violencia", "outros"
  status VARCHAR(50) DEFAULT 'pendente', -- "pendente", "em_analise", "resolvida"
  anonima BOOLEAN DEFAULT FALSE,
  responsavel_id INTEGER REFERENCES responsaveis(id),
  aluno_id INTEGER REFERENCES alunos(id),
  instituicao_id INTEGER REFERENCES instituicoes(id),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP
);

CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  texto TEXT NOT NULL,
  denuncia_id INTEGER REFERENCES denuncias(id),
  responsavel_id INTEGER REFERENCES responsaveis(id),
  aluno_id INTEGER REFERENCES alunos(id),
  instituicao_id INTEGER REFERENCES instituicoes(id),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);