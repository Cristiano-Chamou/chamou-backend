const servicos = [];

function listarServicos() {
  return servicos;
}

function criarServico({ nome, preco }) {
  const novoServico = {
    id: `${Date.now()}`,
    nome,
    preco
  };
  servicos.push(novoServico);
  return novoServico; // <- ESSENCIAL retornar o novo objeto
}

function atualizarServico(id, dadosAtualizados) {
  const servico = servicos.find(s => s.id === id);
  if (!servico) return null;

  servico.nome = dadosAtualizados.nome || servico.nome;
  servico.preco = dadosAtualizados.preco || servico.preco;
  return servico;
}

function deletarServico(id) {
  const index = servicos.findIndex(s => s.id === id);
  if (index === -1) return null;

  servicos.splice(index, 1);
  return true;
}

module.exports = {
  listarServicos,
  criarServico,
  atualizarServico,
  deletarServico
};

