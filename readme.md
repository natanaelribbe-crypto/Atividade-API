# API de Gerenciamento de Produtos

Esta é uma API REST desenvolvida em Node.js para o trabalho acadêmico de Backend.

## 🚀 Tecnologias Utilizadas
* Node.js & Express
* SQLite3 & Knex (Banco de dados)
* JSON Web Token (Autenticação)

## 🛠️ Como rodar o projeto
1. Instale as dependências: `npm install`
2. Inicie o servidor: `node server.js`
3. O banco de dados será criado automaticamente com 20 registros iniciais.

## 🔑 Autenticação
* **POST /login**: Gera o token de acesso.
* Todas as outras rotas exigem o Header: `Authorization: Bearer <seu_token>`

## 📌 Rotas Principais
* `GET /books`: Lista produtos com paginação e JOIN.
* `POST /books`: Cadastra um novo produto.