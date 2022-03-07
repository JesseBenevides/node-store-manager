const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

describe.skip('Product Services', () => {
  describe('GetAll - Busca todos os produtos', () => {
    describe('Quando não há produtos cadastrados', () => {
      before(() => {
        const result = [];
        sinon.stub(productModel, 'getAll').resolves(result);
      });
      after(() => {
        productModel.getAll.restore();
      });
  
      it('Retorna um objeto', async () => {
        const result = await productService.getAll();
        expect(result).to.be.an('object');
      });
  
      it('O objeto possui as propriedades "status" e "data"', async () => {
        const result = await productService.getAll();
        expect(result).to.include.all.keys('status', 'data');
      });
      it('A propriedade "data" é um array', async () => {
        const { data } = await productService.getAll();
        expect(data).to.be.an('array');
      });
      it('A propriedade "data" é um array vazio', async () => {
        const { data } = await productService.getAll();
        expect(data).to.be.empty;
      });
      it('A propriedade "status" é um número', async () => {
        const { status } = await productService.getAll();
        expect(status).to.be.a('number');
      });
      it('A propriedade "status" possui o valor 200', async () => {
        const { status } = await productService.getAll();
        expect(status).to.be.equal(200);
      });
    });

    describe('Quando há produtos cadastrados', () => {
      before(() => {
        const result =[
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          }
        ];
        sinon.stub(productModel, 'getAll').resolves(result);
      });
      after(() => {
        productModel.getAll.restore();
      });

      it('Retorna um objeto', async () => {
        const result = await productService.getAll();
        expect(result).to.be.an('object');
      });
      it('O objeto possui as propriedades "status" e "data"', async () => {
        const result = await productService.getAll();
        expect(result).to.include.all.keys('status', 'data');
      });
      it('A propriedade "data" é um array', async () => {
        const { data } = await productService.getAll();
        expect(data).to.be.an('array');
      });
      it('A propriedade "data" não está vazia', async () => {
        const { data } = await productService.getAll();
        expect(data).to.be.not.empty;
      });
      it('"data" é um array de objetos', async () => {
        const { data: [item] } = await productService.getAll();
        expect(item).to.be.an('object');
      });
      it('Os items possuem as propriedades "id", "name" e "quantity" ', async () => {
        const {data: [item]} = await productService.getAll();
        expect(item).to.include.all.keys('id', 'name', 'quantity');
      });
      it('A propriedade "status" é um número', async () => {
        const { status } = await productService.getAll();
        expect(status).to.be.a('number');
      });
      it('A propriedade "status" possui o valor 200', async () => {
        const { status } = await productService.getAll();
        expect(status).to.be.equal(200);
      });
    });
  });
  
});