const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('Sales Controller', () => {
  const request = {};
  const response = {};
  let next = () => {};
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });
  describe('GetAll - Busca todos as vendas cadastradas', () => {
    describe('Quando não há vendas cadastradas', () => {
      const serviceResponse = { status: 200, data: [] };
      before(() => {
        sinon.stub(salesService, 'getAll').resolves(serviceResponse);
      });
      after(() => {
        salesService.getAll.restore();
      });

      it('A resposta da requisição possui o status 200', async () => {
        await salesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });
      it('A requisição responde com um array vazio no json', async () => {
        await salesController.getAll(request, response);
        expect(response.json.calledWith([])).to.be.true;
      });
    });
    describe('Quando há vendas cadastradas', () => {
      const serviceResponse = { status: 200, data: [
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
      ] };
      before(() => {
        sinon.stub(salesService, 'getAll').resolves(serviceResponse);
      });
      after(() => {
        salesService.getAll.restore();
      });

      it('A resposta da requisição possui o status 200', async () => {
        await salesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });
      it('A requisição responde com um array', async () => {
        await salesController.getAll(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.true;
      });
      it('A requisição responde com um array recebido pela salesService.getAll', async () => {
        await salesController.getAll(request, response);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      });
    });
  });
});
