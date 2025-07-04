const express = require('express');
const {
  listarUsuarios,
  obterUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
} = require('../controllers/usuariosController');

const router = express.Router();

router.get('/', listarUsuarios);
router.get('/:id', obterUsuario);
router.post('/', criarUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

module.exports = router;
