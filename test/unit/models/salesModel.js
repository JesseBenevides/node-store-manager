const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Sales Model', () =>{
  describe('GetAll - Busca todas as vendas cadastradas', () => {
    describe('Quando não há vendas cadastradas', () => {
      before(() => {
        const result = [[]];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna um array', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.an('array');
      });
      it('Retorna um array vazio', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.empty;
      });
    });
    describe('Quando há vendas cadastradas', () => {
      before(() => {
        const result = [[
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
        ]];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna um array', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.an('array');
      });
      it('Retorna um array com elementos', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.not.empty;
      });
      it('Retorna um array de objetos', async () => {
        const [item] = await salesModel.getAll();
        expect(item).to.be.an('object');
      });
      it('Os objetos possuem as propriedades corretas ',
        async () => {
          const [item] = await salesModel.getAll();
          expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('FindById - Busca os dados de uma venda pelo id', () => {
    const id = 1;
    describe('Quando a venda não é encontrada', () => {
      before(() => {
        const result = [[]];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna um array', async () => {
        const result = await salesModel.findById(id);
        expect(result).to.be.an('array');
      });
      it('Retorna um array vazio', async () => {
        const result = await salesModel.findById(id);
        expect(result).to.be.empty;
      });
    });
    describe('Quando a venda é encontrada', () => {
      before(() => {
        const result = [[
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
        ]];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna um array', async () => {
        const result = await salesModel.findById(id);
        expect(result).to.be.an('array');
      });
      it('Retorna um array com elementos', async () => {
        const result = await salesModel.findById(id);
        expect(result).to.be.not.empty;
      });
      it('Retorna um array de objetos', async () => {
        const [item] = await salesModel.findById(id);
        expect(item).to.be.an('object');
      });
      it('Os objetos possuem as propriedades corretas ',
        async () => {
          const [item] = await salesModel.getAll();
          expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('CreateSale - Cadastra uma nova venda no banco', () => {
    describe('Quando a criação da venda falha', () => {
      before(() => {
        const result = [{ affectedRows: 0, insertId: undefined }];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna "undefined"', async () => {
        const result = await salesModel.createSale()
        expect(result).to.be.undefined;
      });
    });
    describe('Quando a venda é criada com sucesso', () => {
      const queryResponse = [{ affectedRows: 1, insertId: 4 }];
      before(() => {
        sinon.stub(connection, 'execute').resolves(queryResponse);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retona um número', async () => {
        const result = await salesModel.createSale()
        expect(result).to.be.a('number');
      });
      it('O valor retornado é o insertId que a execução da query retornou', async () => {
        const result = await salesModel.createSale()
        expect(result).to.be.equal(queryResponse[0].insertId);
      });
    });
  });

  describe('CreateItems - Cadastra uma lista de items relacionado a uma venda', () => {
    describe('Quando o id da venda é inválido', () => {
      const saleId = undefined;
      const itemsSold = [{ "productId": 1, "quantity": 3 }];
      it('Retorna "null"', async () => {
        const result = await salesModel.createItems(saleId, itemsSold);
        expect(result).to.be.null;
      });
    });

    describe('Quando o id é válido e apenas um item é cadastrado', () => {
      const saleId = 1;
      const itemsList = [{ "productId": 1, "quantity": 3 }];
      it('Retorna um objeto', async () => {
        const result = await salesModel.createItems(saleId, itemsList);
        expect(result).to.be.an('object');
      });
      it('O objeto retornado possui as propriedades certas', async () => {
        const result = await salesModel.createItems(saleId, itemsList);
        expect(result).to.include.all.keys('id', 'itemsSold');
      });
      it('Ao valor de id é igual ao saleId passado por parâmetro', async () => {
        const { id } = await salesModel.createItems(saleId, itemsList);
        expect(id).to.be.equal(saleId);
      });
      it('A propriedade itemSold é um array', async () => {
        const { itemsSold } = await salesModel.createItems(saleId, itemsList);
        expect(itemsSold).to.be.an('array');
      });
      it('itemSold é um array de objetos', async () => {
        const { itemsSold: [item] } = await salesModel.createItems(saleId, itemsList);
        expect(item).to.be.an('object');
      });
      it('Os items em itemsSold possui as propriedades certas', async () => {
        const { itemsSold: [item] } = await salesModel.createItems(saleId, itemsList);
        expect(item).to.include.all.keys('productId', 'quantity');
      });
      it('itemSold possui apenas um elemento', async () => {
        const { itemsSold } = await salesModel.createItems(saleId, itemsList);
        expect(itemsSold.length).to.be.equal(1);
      });
    });

    describe('Quando o id é válido e vários items são cadastrados', () => {
      const saleId = 1;
      const itemsList = [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];
      it('Retorna um objeto', async () => {
        const result = await salesModel.createItems(saleId, itemsList);
        expect(result).to.be.an('object');
      });
      it('O objeto retornado possui as propriedades certas', async () => {
        const result = await salesModel.createItems(saleId, itemsList);
        expect(result).to.include.all.keys('id', 'itemsSold');
      });
      it('Ao valor de id é igual ao saleId passado por parâmetro', async () => {
        const { id } = await salesModel.createItems(saleId, itemsList);
        expect(id).to.be.equal(saleId);
      });
      it('A propriedade itemSold é um array', async () => {
        const { itemsSold } = await salesModel.createItems(saleId, itemsList);
        expect(itemsSold).to.be.an('array');
      });
      it('itemSold é um array de objetos', async () => {
        const { itemsSold: [item] } = await salesModel.createItems(saleId, itemsList);
        expect(item).to.be.an('object');
      });
      it('Os items em itemsSold possui as propriedades certas', async () => {
        const { itemsSold: [item] } = await salesModel.createItems(saleId, itemsList);
        expect(item).to.include.all.keys('productId', 'quantity');
      });
      it('itemSold possui mais de um item', async () => {
        const { itemsSold } = await salesModel.createItems(saleId, itemsList);
        expect(itemsSold.length).to.be.greaterThan(1);
      });
    });
  });

  describe('ExcludeItems - Deleta todos os items relacionados a uma venda', () => {
    const saleId = 1;
    describe('Quando nenhum item é excluído', () => {
      before(() => {
        const result = [{ affectedRows: 0 }];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna false', async () => {
        const result = await salesModel.excludeItems(saleId);
        expect(result).to.be.false;
      });
    });

    describe('Um ou mais items são excluídos', () => {
      before(() => {
        const result = [{ affectedRows: 3 }];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna true', async () => {
        const result = await salesModel.excludeItems(saleId);
        expect(result).to.be.true;
      });
    });
  });

  describe('Exclude - Deleta uma venda do banco', () => {
    const saleId = 1;
    describe('Quando não é possível deletar a venda', () => {
      before(() => {
        const result = [{ affectedRows: 0 }];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna false', async () => {
        const result = await salesModel.exclude(saleId);
        expect(result).to.be.false;
      });
    });

    describe('Quando a venda é deletada com sucesso', () => {
      before(() => {
        const result = [{ affectedRows: 1 }];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });

      it('Retorna true', async () => {
        const result = await salesModel.exclude(saleId);
        expect(result).to.be.true;
      });
    });
  });
});