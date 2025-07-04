const express = require('express');
const router = express.Router();

const {
  getServicos,
  postServico,
  putServico,
  deleteServico
} = require('../controllers/servicoController');

router.get('/', getServicos);
router.post('/', postServico);
router.put('/:id', putServico);
router.delete('/:id', deleteServico);

module.exports = router;

