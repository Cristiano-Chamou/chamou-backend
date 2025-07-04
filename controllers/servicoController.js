const db = require('../db/connection');

async function listarServicos(req, res) {
  try {
    const result = await db.select('*').from('servicos');
    res.json(result);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar serviços' });
  }
}

async function criarServico(req, res) {
  try {
    const { nome, preco } = req.body;
    const [novo] = await db('servicos').insert({ nome, preco }).returning('*');
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar serviço' });
  }
}

async function atualizarServico(req, res) {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const [atualizado] = await db('servicos')
      .where({ id })
      .update({ nome, preco, updated_at: db.fn.now() })
      .returning('*');

    if (!atualizado) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar serviço' });
  }
}

async function deletarServico(req, res) {
  try {
    const { id } = req.params;
    const deletado = await db('servicos').where({ id }).del();

    if (!deletado) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar serviço' });
  }
}

module.exports = {
  listarServicos,
  criarServico,
  atualizarServico,
  deletarServico
};
