const { expect } = require('chai');
const sinon = require('sinon');
const { carModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { newCar, cars } = require('./mocks/car.model.mock');

describe('Testes de unidade do model de carro', function () { 
  it('Cadastrando um novo carro', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    // Act
    const result = await carModel.insert(newCar);
    // Assert
    expect(result).to.equal(1);
  });

  it('Encontrando carro por meio do Id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[cars[0]]]);
    // Act
    const result = await carModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(cars[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});