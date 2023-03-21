const { expect } = require('chai');
const sinon = require('sinon');
const { driverModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { drivers, newDriver } = require('./mocks/driver.model.mock');

describe('Testes de unidade do model de motoristas', function () {
  it('Recuperando a lista de pessoas motoristas', async function () {
    sinon.stub(connection, 'execute').resolves([drivers]);
    const result = await driverModel.findAll();
    expect(result).to.be.deep.equal(drivers);
  });

  it('Recuperando dados de um motorista pelo Id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[drivers[0]]]);
    // Act
    const result = await driverModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(drivers[0]);
  });

  it('Cadastra um novo motorista', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 27 }]);
    // Act
    const result = await driverModel.insert(newDriver);
    // Assert
    expect(result).to.be.equal(27);
  });

  afterEach(function () {
    sinon.restore();
  });
});