const express = require('express');
const app = express();

app.use(express.json());

// Nosso "Banco de Dados" na memória
let produtos = [
    { id: 1, nome: "Notebook", preco: 4500 },
    { id: 2, nome: "Mouse", preco: 150 }
];

// GET: Ver todos os produtos
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

// POST: Adicionar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body; // Pega o que você digitou no Postman

    const novoProduto = {
        id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1, // Gera ID 3, 4...
        nome,
        preco
    };

    produtos.push(novoProduto); // O comando PUSH adiciona ao array na memória
    res.status(201).json(novoProduto); // Responde confirmando o sucesso
});

// DELETE: Remover por ID
app.delete('/produtos/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === idParam);

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado!" });
    }

    const removido = produtos.splice(index, 1);
    res.status(200).json({ mensagem: "Removido com sucesso", item: removido[0] });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor ON em http://localhost:${PORT}`);
    console.log(`--- Rotas disponíveis: ---`);
    console.log(`GET    http://localhost:${PORT}/produtos`);
    console.log(`POST   http://localhost:${PORT}/produtos`);
    console.log(`DELETE http://localhost:${PORT}/produtos/1`);
});