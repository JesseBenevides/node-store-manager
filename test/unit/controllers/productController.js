const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');


describe('Product Controller', () => {
  const request = {};
  const response = {};
  let next = () => {};
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });
  describe('GetAll - Busca todos os produtos', () => {
    describe('Quando não há produtos cadastrados', () => {
      const serviceResponse = { status: 200, data: [] };
      before(() => {
        sinon.stub(productService, 'getAll').resolves(serviceResponse);
      });
      after(() => {
        productService.getAll.restore();
      });

      it('A resposta da requisição possui o status 200', async () => {
        await productController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });
      it('A requisição responde com um array vazio no json', async () => {
        await productController.getAll(request, response);
        expect(response.json.calledWith([])).to.be.true;
      });
    });
    describe('Quando há produtos cadastrados', () => {
      const serviceResponse = { status: 200, data: [{
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }]};
      before(() => {
        sinon.stub(productService, 'getAll').resolves(serviceResponse);
      });
      after(() => {
        productService.getAll.restore();
      });
      it('A resposta da requisição possui o status 200', async () => {
        await productController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });
      it('A requisição responde com um array no json', async () => {
        await productController.getAll(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.true;
      });
      it('A requisição responde com o array recebido pelo services', async () => {
        await productController.getAll(request, response);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      });
    });
  });

  describe('FindById - Busca um produto pelo id', () => {
    request.params = 1;
    describe('Quando o produto não é encontrado', () => {
      const serviceResponse = { status: 404, message: 'Product not found' };
      before(() => {
        sinon.stub(productService, 'findById').resolves(serviceResponse);
      });
      after(() => {
        productService.findById.restore();
      });

      it('A requisição chama a função next enviando o objeto de erro', async () => {
        await productController.findById(request, response, next);
        expect(next.calledWith(serviceResponse)).to.be.true;
      });
    });

    describe('Quando encontra o produto', () => {
      const serviceResponse = { status: 200, data: {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }};
      before(() => {
        sinon.stub(productService, 'findById').resolves(serviceResponse);
      });
      after(() => {
        productService.findById.restore();
      });
      it('A resposta da requisição possui o status esperado', async () => {
        await productController.findById(request, response, next);
        expect(response.status.calledWith(serviceResponse.status)).to.be.true;
      });
      it('A requisição responde com um array no json', async () => {
        await productController.findById(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.true;
      });
      it('A requisição responde com o array recebido pelo services', async () => {
        await productController.findById(request, response);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      });
    });
  });
});