const request = require('supertest');
const app = require('../server');

describe('Rotas de Serviços', () => {
  let novoServico;

  it('deve criar um serviço', async () => {
    const res = await request(app)
      .post('/servicos')
      .send({ nome: 'Instalação de Ar-condicionado', preco: 150 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Instalação de Ar-condicionado');
    novoServico = res.body;
  });

  it('deve listar todos os serviços', async () => {
    const res = await request(app).get('/servicos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve atualizar um serviço existente', async () => {
    const res = await request(app)
      .put(`/servicos/${novoServico.id}`)
      .send({ nome: 'Manutenção de Ar-condicionado', preco: 200 });

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Manutenção de Ar-condicionado');
    expect(res.body.preco).toBe(200);
  });

  it('deve deletar um serviço existente', async () => {
    const res = await request(app).delete(`/servicos/${novoServico.id}`);
    expect(res.statusCode).toBe(204);
  });
});
