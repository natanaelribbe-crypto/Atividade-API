const express = require('express');
const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './database.sqlite' },
  useNullAsDefault: true
});
const jwt = require('jsonwebtoken');
const app = express();
const SECRET = 'minha_chave_secreta';

app.use(express.json());

// --- CONFIGURAÇÃO DO BANCO (Executa ao iniciar) ---
async function initDB() {
  if (!await knex.schema.hasTable('categorias')) {
    await knex.schema.createTable('categorias', t => {
      t.increments('id');
      t.string('nome');
    });
    await knex.schema.createTable('produtos', t => {
      t.increments('id');
      t.string('nome');
      t.decimal('preco');
      t.integer('categoria_id').references('id').inTable('categorias');
    });
    // Inserindo Categoria e 20 Registros (Requisito da imagem)
    await knex('categorias').insert({ nome: 'Informática' });
    const itens = Array.from({ length: 20 }, (_, i) => ({
      nome: `Produto ${i + 1}`,
      preco: 10 + i,
      categoria_id: 1
    }));
    await knex('produtos').insert(itens);
  }
}
initDB();

// --- MIDDLEWARE DE AUTENTICAÇÃO (JWT) ---
const auth = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ erro: 'Sem token' });
  jwt.verify(token, SECRET, (err) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });
    next();
  });
};

// --- ROTAS ---

// 1. Login para pegar o Token
app.post('/login', (req, res) => {
  const token = jwt.sign({ user: 'admin' }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// 2. Listar com FILTROS, PAGINAÇÃO e JOIN (Requisito)
app.get('/books', auth, async (req, res) => {
  const { page = 1, limit = 5, nome } = req.query;
  let query = knex('produtos')
    .join('categorias', 'produtos.categoria_id', '=', 'categorias.id')
    .select('produtos.*', 'categorias.nome as categoria_nome');

  if (nome) query.where('produtos.nome', 'like', `%${nome}%`);

  const dados = await query.limit(limit).offset((page - 1) * limit);
  res.json(dados);
});

// 3. Criar Produto (O que você está fazendo no Postman)
app.post('/books', auth, async (req, res) => {
  const { nome, preco, categoria_id = 1 } = req.body;
  if (!nome || !preco) return res.status(400).json({ erro: 'Dados incompletos' });
  
  const [id] = await knex('produtos').insert({ nome, preco, categoria_id });
  res.status(201).json({ id, nome, preco });
});

app.listen(3000, () => console.log('✅ Servidor ON na porta 3000'));