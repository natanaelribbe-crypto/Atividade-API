const request = require('supertest');
const app = require('./server');

describe('Validando Rotas da API', () => {
  
  test('Deve listar os produtos (GET /books)', async () => {
    const response = await request(app).get('/books');
    // Como a rota é protegida, esperamos 401 se não enviarmos token
    expect(response.status).toBe(401);
  });

  test('Deve tentar fazer login e falhar com dados errados', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'errado', password: '000' });
    
    expect(response.status).toBe(401);
  });
});