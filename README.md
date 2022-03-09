# Boas vindas ao repositório do projeto Store Manager!

API RESTful desenvolvida com Node Express e arquitetura MSC

A API  trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.


---

## Tecnologias utilizadas

- Node.JS;
- Express;
- MySQL;
- Postman;
- Joi;
- Express-rescue;
- Jest;
- Mocha;
- Sinon;
- Chai;
- Nodemon;
- ESLint;

---

## Habilidades trabalhadas no projeto

- Utilizar arquiterura MSC no desenvolvimento de APIs;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis;
- Desenvolver testes unitários para a aplicação
- Criar middlewares de validações
- Criar rotas com Express;
- Utilizar os principais métodos HTTP

---

# Endpoints da API


### Listando os produtos

- Através do caminho `GET /products`, todos os produtos devem ser retornados;

- Através do caminho `GET /products/:id`, apenas o produto com o `id` presente na URL será retornado;

- o resultado será **ordernado** de forma crescente pelo campo `id`;

<details close>
  <summary>O que será retornado nos endpoints para listar produtos</summary>
  <br>

  > :point_right: No endpoint `GET /products`, todos produtos serão retornados.
  - A API irá responder com o status http `200` e o seguinte `body`:
  ```json
    [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]
  ```

  > :point_right: No endpoint `GET /products/:id`, é possível listar um determinado produto refente ao id enviado.
  - A API irá responder com o status http `200` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ```

  > :point_right: Caso o produto refenrente ao id não seja encontrado.

  - A API irá responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>
<br>

---

### Listando as vendas

- Através do caminho `GET /sales`, todas as vendas serão retornadas;

- Através do caminho `GET /sales/:id`, apenas a venda com o `id` presente na URL será retornada;

- o resultado será **ordernado** de forma crescente pelo campo `saleId`, em caso de empate, será também **ordernado** de forma crescente pelo campo `productId`;

<details close>
  <summary>O que será retornado nos endpoints para listar vendas</summary>
  <br>

  > :point_right: No endpoint `GET /sales`, todas vendas serão retornados.
  - a API irá responder com status http `200` e o seguinte `body`:
  ```json
    [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]
  ```

  > :point_right: No endpoint `GET /sales/:id`, será listado uma determinada venda.
  - A API irá responder com status http `200` e o seguinte `body`:
    ```json
      [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
    ```

  > :point_right: No endpoint `GET /sales/:id`, caso a venda referente ao id não seja encontrada.
  - AAPI irá responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Sale not found" }
    ```
</details>

---

### Endpoint para o cadastro de produtos

- O endpoint está acessível através do caminho ` POST /products`;

<details close>
  <summary>O que deve estar no corpo da requisição</summary>
  <br>
  
  > :point_right: Para o produto ser cadastrado com sucesso:
  - o body da requisição deve estar no seguinte formato:
    ```json
      { "name": "produto", "quantity": 10 }
    ```
    - A API irá responder com status http `201` e o seguinte `body`:
    ```json
      { "id": 1, "name": "produto", "quantity": 10 }
    ```

  > :point_right: Validações:
  
  - O campo `name` deve ser uma _string_ com 5 ou mais caracteres e deve ser único.

  - O campo quantity deve ser um número inteiro maior que 0
    
</details>

---

### Endpoint para atualizar um produto

- O endpoint está acessível através do caminho `PUT /products/:id`;

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL será atualizado;


<details close>
  <summary>Detalhes da requisição</summary>
  <br>

  > :point_right: Para o produto ser atualizado com sucesso:
  - A requisição deve conter o `body` no seguinte formato:
    ```json
      { "name": "produto", "quantity": 15 }
    ```
    - A API deve responder com status http `200` e o seguinte `body`:
    ```json
      { "id": 1, "name": "produto", "quantity": 15 }
    ```

  > :point_right: Caso o produto referente ao id não seja encontrado.
  - A API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>

---

### Endpoint para deletar um produto

- O endpoint está acessível através do caminho `DELETE /products/:id`;

- Apenas o produto com o `id` presente na URL será deletado;


<details close>
  <summary>Detalhes da requisição</summary>
  <br>

  > :point_right: Se o produto for deletado com sucesso.
  - A API irá responder com status http `204` e sem nenhuma resposta no `body`.

  > :point_right: Caso o produto referente ao id não seja econtrodado.
  - A API irá responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>

---

### Endpoint para cadastrar vendas

- O endpoint está acessível através do caminho `POST /sales`;

- É possível cadastrar a venda de vários produtos através da uma mesma requisição;


<details close>
  <summary>O que deve estar no corpo da requisição</summary>
  <br>

  > :point_right: Para cadastrar a venda e os itens.
  - A requisição deve conter o seguinte formato no `body`:
    ```json
      [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    ```
    - A API irá responder com status http `201` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      }
    ```
</details>

---

### Endpoint para atualizar uma venda

- O endpoint está acessível através do caminho `PUT /sales/:id`;

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;


<details close>
  <summary>Como a requisição deve ser feita</summary>
  <br>

  > :point_right: Para a requisição ser feita corretamente e a venda ser alterada.
  - A requisição deve ter o seguinte formato no `body`:
    ```json
      [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    ```
    - A API deverá responder com status http `200` e o seguinte `body`:
    ```json
      {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      }
    ```
</details>

---

### Endpoint para deletar uma venda

- O endpoint está acesspivel através do caminho `DELETE /sales/:id`;

- Apenas a venda com o `id` presente na URL deve ser deletado;

- Todos os itens da tabela `sales_producs` referente ao id da venda serão deletados

<details close>
  <summary>Detalhes da requisição</summary>
  <br>

  > :point_right: Quando a venda for deletada com sucesso:
  - A API irá responder com status http `204` e sem nenhuma resposta no `body`.
  
  > :point_right: Quando o id referente a venda a ser deletada não for encontrada:
  - A API irá responder com status http `404` e o seguinte `body`:
  ```json
    { "message": "Sale not found" }
  ```

</details>


<!-- ## Instruções para testar a aplicação na sua máquina

1. Clone o repositório

- `git clone git@github.com:JesseBenevides/node-store-manager.git `.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd node-store-manager`

2. Instale as dependências

- `npm install`

3. Start a aplicação

- `npm start` -->

---

# Testes 
Estruturas dos testes unitários:
```tree
.
├─ ...
├─ test                              
│   └─ unit  
|       ├─ controllers
│            ├─ productController.js
│            └─ saleController.js 
|       ├─ services   
│            ├─ productService.js            
│            └─ salesService.js 
|       └─ models
│            ├─ productModel.js 
│            └─ salesModel.js 
└─ ...
```
---

### Banco de dados MySQL

O script do banco de dados utilizado está na raiz do projeto `StoreManager.sql`.

O banco terá três tabelas: `products`, `sales` e `sales_products`.

A tabela `products` tem o seguinte formato:

![Tabela Produtos](./public/tableproducts.png)

(O id será gerado automaticamente)

A tabela `sales` tem o seguinte formato:

![Tabela Vendas](./public/tablesales.png)

(O id e date são gerados automaticamente)

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato:

![Tabela Vendas-Produtos](./public/tablesalesproducts.png)


