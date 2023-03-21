const { expect } = require('chai');
const sinon = require('sinon');
const { driverCarModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { newDriverCar } = require('./mocks/driver_car.model.mock');

describe('Driver_Car Model', function () {
  describe('Cadastra o relacionamento das pessoas motoristas com os carros', function () {
    it('com sucesso', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 39 }]);
      // Act
      const result = await driverCarModel.insert(newDriverCar);
      // Assert
      expect(result).to.be.equal(39);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});