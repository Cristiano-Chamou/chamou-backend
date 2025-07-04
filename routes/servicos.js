const express = require('express');
const router = express.Router();

const {
  listarServicos,
  criarServico,
  atualizarServico,
  deletarServico
} = require('../controllers/servicoController');

router.get('/', listarServicos);
router.post('/', criarServico);
router.put('/:id', atualizarServico);
router.delete('/:id', deletarServico);

module.exports = router;

