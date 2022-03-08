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
});