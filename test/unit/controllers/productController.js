const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');


describe.skip('Product Controller', () => {
  const request = {};
  const response = {};
  let next = () => {};
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
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
});