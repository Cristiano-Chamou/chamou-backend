const pool = require('../models/db'); // Caminho corrigido

// Listar todos os agendamentos
async function listar(req, res) {
  try {
    const result = await pool.query('SELECT * FROM agendamentos ORDER BY data');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar agendamentos:', err);
    res.status(500).json({ erro: 'Erro ao listar agendamentos' });
  }
}

// Criar novo agendamento
async function criar(req, res) {
  const { cliente, prestador, servico, data, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO agendamentos (cliente, prestador, servico, data, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cliente, prestador, servico, data, status || 'pendente']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar agendamento:', err);
    res.status(500).json({ erro: 'Erro ao criar agendamento' });
  }
}

// Obter um agendamento específico
async function obter(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM agendamentos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao obter agendamento:', err);
    res.status(500).json({ erro: 'Erro ao obter agendamento' });
  }
}

// Atualizar um agendamento
async function atualizar(req, res) {
  const { cliente, prestador, servico, data, status } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE agendamentos SET cliente = $1, prestador = $2, servico = $3, data = $4, status = $5 WHERE id = $6 RETURNING *',
      [cliente, prestador, servico, data, status, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar agendamento:', err);
    res.status(500).json({ erro: 'Erro ao atualizar agendamento' });
  }
}

// Deletar um agendamento
async function deletar(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM agendamentos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    res.json({ mensagem: 'Agendamento deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar agendamento:', err);
    res.status(500).json({ erro: 'Erro ao deletar agendamento' });
  }
}

module.exports = {
  listar,
  criar,
  obter,
  atualizar,
  deletar,

};

