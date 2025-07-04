const request = require('supertest');
const app = require('../server.js'); // sem import

describe('Rotas de Agendamentos', () => {
  let novoAgendamento;

  it('deve criar um agendamento', async () => {
    const res = await request(app)
      .post('/agendamentos')
      .send({ cliente: 'João', data: '2025-07-10T10:00:00Z', servico: 'Corte de cabelo' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    novoAgendamento = res.body;
  });

  it('deve listar os agendamentos', async () => {
    const res = await request(app).get('/agendamentos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve atualizar um agendamento existente', async () => {
    const res = await request(app)
      .put(`/agendamentos/${novoAgendamento.id}`)
      .send({ cliente: 'Maria' });

    expect(res.statusCode).toBe(200);
    expect(res.body.cliente).toBe('Maria');
  });

  it('deve deletar um agendamento existente', async () => {
    const res = await request(app).delete(`/agendamentos/${novoAgendamento.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.mensagem).toBe('Agendamento deletado com sucesso');
  });
});
