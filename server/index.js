const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const JWT_SECRET = 'seu_segredo_jwt'; // Em produção, use variáveis de ambiente

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nohate_bd',
  password: 'postgres',
  port: 5432,
});

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Rotas de autenticação
app.post('/api/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    // Verificar se é um responsável
    const responsavel = await pool.query(
      'SELECT * FROM responsaveis WHERE email = $1',
      [email]
    );
    
    if (responsavel.rows.length > 0) {
      const senhaValida = await bcrypt.compare(senha, responsavel.rows[0].senha);
      
      if (senhaValida) {
        const token = jwt.sign(
          { id: responsavel.rows[0].id, tipo: 'responsavel' },
          JWT_SECRET,
          { expiresIn: '1d' }
        );
        
        return res.json({
          token,
          usuario: {
            id: responsavel.rows[0].id,
            nome: responsavel.rows[0].nome,
            email: responsavel.rows[0].email,
            tipo: 'responsavel'
          }
        });
      }
    }
    
    // Verificar outros tipos de usuário aqui...
    
    res.status(401).json({ message: 'Credenciais inválidas' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Rotas para vinculações
app.get('/api/vinculacoes', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.id, r.nome as responsavel, v.nome_aluno as aluno, 
             v.matricula_aluno as matricula, v.parentesco, 
             v.data_solicitacao as "dataSolicitacao", v.status
      FROM vinculacoes v
      JOIN responsaveis r ON v.responsavel_id = r.id
      ORDER BY v.data_solicitacao DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar vinculações:', error);
    res.status(500).json({ message: 'Erro ao buscar vinculações' });
  }
});

app.post('/api/vinculacoes', authMiddleware, async (req, res) => {
  const { responsavelId, matriculaAluno, nomeAluno, parentesco } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO vinculacoes 
       (responsavel_id, matricula_aluno, nome_aluno, parentesco, data_solicitacao, status)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 'pendente')
       RETURNING *`,
      [responsavelId, matriculaAluno, nomeAluno, parentesco]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar vinculação:', error);
    res.status(500).json({ message: 'Erro ao criar vinculação' });
  }
});

app.put('/api/vinculacoes/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE vinculacoes 
       SET status = $1, data_atualizacao = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vinculação não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar vinculação:', error);
    res.status(500).json({ message: 'Erro ao atualizar vinculação' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});