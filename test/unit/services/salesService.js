const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const { object } = require('joi');

describe('Sales Service', () => {
  describe('GetAll - Busca todas as vendas cadastradas', () => {
    describe('Quando não há vendas cadastradas', () => {
      before(() => {
        const modelResponse = [];
        sinon.stub(salesModel, 'getAll').resolves(modelResponse);
      });
      after(() => {
        salesModel.getAll.restore();
      });

      it('Retorna um objeto', async () => {
        const result = await salesService.getAll();
        expect(result).to.be.an('object');
      })
      it('O objeto possui as propriedades "status e "data"', async () => {
        const result = await salesService.getAll();
        expect(result).to.include.all.keys('status', 'data');
      })
      it('A propriedade "status possui o valor 200', async () => {
        const { status } = await salesService.getAll();
        expect(status).to.be.equal(200);
      })
      it('A propriedade "data" é um array', async () => {
        const { data } = await salesService.getAll();
        expect(data).to.be.an('array');
      })
      it('A propriedade "data" é um array vazio', async () => {
        const { data } = await salesService.getAll();
        expect(data).to.be.empty;
      })
    });
    describe('Quando há vendas cadastradas', () => {
      before(() => {
        const modelResponse = [
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
        ];
        sinon.stub(salesModel, 'getAll').resolves(modelResponse);
      });
      after(() => {
        salesModel.getAll.restore();
      });

      it('Retorna um objeto', async () => {
        const result = await salesService.getAll();
        expect(result).to.be.an('object');
      })
      it('O objeto possui as propriedades "status e "data"', async () => {
        const result = await salesService.getAll();
        expect(result).to.include.all.keys('status', 'data');
      })
      it('A propriedade "status possui o valor 200', async () => {
        const { status } = await salesService.getAll();
        expect(status).to.be.equal(200);
      })
      it('A propriedade "data" é um array', async () => {
        const { data } = await salesService.getAll();
        expect(data).to.be.an('array');
      })
      it('A propriedade "data" é um array com items', async () => {
        const { data } = await salesService.getAll();
        expect(data).to.be.not.empty;
      })
      it('A propriedade "data" é um array de objetos', async () => {
        const { data: [item] } = await salesService.getAll();
        expect(item).to.be.an('object');
      })
    });
  });
});