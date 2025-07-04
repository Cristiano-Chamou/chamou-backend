const usuarios = [];

function listarUsuarios(req, res) {
  res.json(usuarios);
}

function obterUsuario(req, res) {
  const usuario = usuarios.find(u => u.id === req.params.id);
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  res.json(usuario);
}

function criarUsuario(req, res) {
  const novoUsuario = {
    id: `${Date.now()}`, // ID simples (para teste)
    nome: req.body.nome,
    email: req.body.email
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
}

function atualizarUsuario(req, res) {
  const usuario = usuarios.find(u => u.id === req.params.id);
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  usuario.nome = req.body.nome || usuario.nome;
  usuario.email = req.body.email || usuario.email;
  res.json(usuario);
}

function deletarUsuario(req, res) {
  const index = usuarios.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  usuarios.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  listarUsuarios,
  obterUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};

