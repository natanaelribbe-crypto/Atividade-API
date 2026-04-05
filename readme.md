# 🚀 Documentação da API - Gerenciamento de Usuários

Este projeto é uma API RESTful desenvolvida em Node.js e Express para o gerenciamento simples de usuários, permitindo a criação e listagem de registros com validações de integridade de dados.

---

## 📌 Lista de Endpoints (GET e POST)

### 1. Listar Todos os Usuários
Recupera todos os registros armazenados na memória.

* **Método:** `GET`
* **URL:** `http://localhost:3000/usuarios`
* **Body:** N/A (Vazio)
* **Resposta (200 OK):**
    ```json
    [
      {
        "id": 1,
        "nome": "Natanael",
        "email": "natanael@exemplo.com"
      }
    ]
    ```

### 2. Cadastrar Novo Usuário
Adiciona um novo registro ao sistema após validar as informações enviadas.

* **Método:** `POST`
* **URL:** `http://localhost:3000/usuarios`
* **Body (JSON):**
    ```json
    {
      "nome": "Exemplo de Nome",
      "email": "exemplo@provedor.com"
    }
    ```
* **Resposta de Sucesso (201 Created):**
    ```json
    {
      "mensagem": "Cadastrado com sucesso!",
      "dados": { "id": 2, "nome": "Exemplo", "email": "exemplo@provedor.com" }
    }
    ```

---

## 🛡️ Explicação de Validações Implementadas

Para garantir a segurança e a organização do banco de dados, as seguintes validações foram aplicadas no método `POST`:

1.  **Campos Obrigatórios:** Verifica se `nome` e `email` estão presentes.
2.  **Validação de E-mail (Regex):** Garante que o e-mail siga o padrão `usuario@dominio.com`.
3.  **Unicidade:** Impede o cadastro de e-mails duplicados.
4.  **Tamanho do Nome:** O nome deve conter pelo menos 3 caracteres.

---

## 📮 Exemplos de Requisição no Postman

1.  **GET:** Selecione o método `GET`, insira a URL e clique em **Send**.
2.  **POST:** Selecione `POST`, vá na aba **Body** -> **raw** -> **JSON** e insira os dados.

---

## 📸 Capturas de Tela dos Testes (Screenshots)

Aqui estão as evidências dos testes realizados via Postman:

* **Listagem Geral:** ![Screenshot GET](PRINTS/Listar%20Produtos.png)
* **Cadastro 1:** ![Screenshot POST](PRINTS/Produto%201.png)
* **Cadastro 2:** ![Screenshot POST](PRINTS/Produto%202.png)
* **Cadastro 3:** ![Screenshot POST](PRINTS/Produto%203.png)
* **Cadastro 4:** ![Screenshot POST](PRINTS/Produto%204.png)
* **Cadastro 5:** ![Screenshot POST](PRINTS/Produto%205.png)
* **Busca por ID:** ![Screenshot GET](PRINTs/Por%20Id.png)
* **Busca por Categoria:** ![Screenshot GET](PRINTs/Por%20categoria.png)
* **Teste de Ordenação:** ![Screenshot GET](PRINTS/Por%20ordenação.png)
* **Teste de Paginação:** ![Screenshot GET](PRINTS/Por%20paginação.png)

---

