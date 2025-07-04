let idAtual = 1;
const agendamentos = [];

function criarAgendamento(dados) {
  const novo = { id: idAtual++, ...dados };
  agendamentos.push(novo);
  return novo;
}

function listarAgendamentos() {
  return agendamentos;
}

function atualizarAgendamento(id, novosDados) {
  const index = agendamentos.findIndex(a => a.id === id);
  if (index === -1) return null;
  agendamentos[index] = { ...agendamentos[index], ...novosDados };
  return agendamentos[index];
}

function deletarAgendamento(id) {
  const index = agendamentos.findIndex(a => a.id === id);
  if (index === -1) return null;
  const removido = agendamentos.splice(index, 1);
  return removido[0];
}

module.exports = {
  criarAgendamento,
  listarAgendamentos,
  atualizarAgendamento,
  deletarAgendamento,
};
