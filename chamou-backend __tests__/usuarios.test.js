const request = require('supertest');
const app = require('../server'); // ou ajuste o caminho se necessário

describe('Rotas de Usuários', () => {
  let usuarioCriado;

  it('deve criar um usuário', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ nome: 'Maria', email: 'maria@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Maria');
    usuarioCriado = res.body;
  });

  it('deve listar todos os usuários', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve obter um usuário específico', async () => {
    const res = await request(app).get(`/usuarios/${usuarioCriado.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', usuarioCriado.id);
  });

  it('deve atualizar um usuário existente', async () => {
    const res = await request(app)
      .put(`/usuarios/${usuarioCriado.id}`)
      .send({ nome: 'Maria Atualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Maria Atualizada');
  });

  it('deve deletar um usuário existente', async () => {
    const res = await request(app).delete(`/usuarios/${usuarioCriado.id}`);
    expect(res.statusCode).toBe(204);
  });
});
