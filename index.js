const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Dados em memória
let produtos = [
    { id: 1, nome: "Notebook", preco: 3500, categoria: "Informática" },
    { id: 2, nome: "Mouse", preco: 150, categoria: "Informática" }
];

let proximoId = 3;

// POST
app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;

    // VALIDAÇÕES
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    if (typeof preco !== 'number' || preco <= 0) {
    return res.status(400).json({ erro: "Preço deve ser um número maior que 0" });
    }

    if (!categoria || categoria.trim() === "") {
        return res.status(400).json({ erro: "Categoria é obrigatória" });
    }

    const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        categoria
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// GET (único e completo)
app.get('/api/produtos', (req, res) => {
    const { categoria, preco_max, preco_min, ordem, direcao, pagina = 1, limite = 10 } = req.query;

    let resultado = [...produtos];

    // Filtros
    if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
    if (preco_max) resultado = resultado.filter(p => p.preco <= parseFloat(preco_max));
    if (preco_min) resultado = resultado.filter(p => p.preco >= parseFloat(preco_min));

    // Ordenação
    if (ordem) {
        resultado.sort((a, b) => {
            if (ordem === 'preco') {
                return direcao === 'desc' ? b.preco - a.preco : a.preco - b.preco;
            }
            if (ordem === 'nome') {
                return direcao === 'desc'
                    ? b.nome.localeCompare(a.nome)
                    : a.nome.localeCompare(b.nome);
            }
        });
    }

    // Paginação
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;

    const paginado = resultado.slice(inicio, inicio + limiteNum);

    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});

// GET por ID
app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(produto);
});



app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
});
