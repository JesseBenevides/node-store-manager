const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

describe.skip('Product Models', () => {
  describe('GetAll - Busca todos os produtos do banco', () => {
    describe('Quando não há produtos cadastrados', () => {
      before(() => {
        const result = [[]];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });
  
      it('Retorna um array', async () => {
        const result = await productModel.getAll();
        expect(result).to.be.an('array');
      });
  
      it('Retorna um array vazio', async () => {
        const result = await productModel.getAll();
        expect(result).to.be.empty;
      });
    });
  
    describe('Quanto existem produtos cadastrados', () => {
      before(() => {
        const result = [[
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          }
        ]];
        sinon.stub(connection, 'execute').resolves(result);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Retorna um array', async () => {
        const result = await productModel.getAll();
        expect(result).to.be.an('array');
      });
      it('O array possui items', async () => {
        const result = await productModel.getAll();
        expect(result).to.be.not.empty;
      });
      it('Os items do array são do tipo objeto', async () => {
        const [item] = await productModel.getAll();
        expect(item).to.be.an('object');
      });
      it('Os items possuem as propriedades "id", "name" e "quantity" ', async () => {
        const [item] = await productModel.getAll();
        expect(item).to.include.all.keys('id', 'name', 'quantity');
      });
      it('A propriedade "id" é do tipo número', async () => {
        const [item] = await productModel.getAll();
        expect(item.id).to.be.a('number');
      });
      it('A propriedade "name" é do tipo string', async () => {
        const [item] = await productModel.getAll();
        expect(item.name).to.be.a('string');
      });
      it('A propriedade "quantity" é do tipo número', async () => {
        const [item] = await productModel.getAll();
        expect(item.quantity).to.be.a('number');
      });
  
    });
  });
});
