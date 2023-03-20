======================================== CAMADA CONTROLLER ========================================

(!) As validações realizadas na camada Service são voltadas para as regras de negócio (que também
  podemos chamar de validações qualitativas), enquanto que as validações da camada Controller são
  voltadas a garantir que todos os dados fornecidos na requisição foram necessários para que a camada
  Service realize sua tarefa.

  Além das validações, a camada Controller também é responsável por direcionar os dados recebidos da 
  requisição para componentes pertinentes da camada Service.

  Outra atribuição dos componentes da camada Controller é responder as requisições.

    1 - Erros originados pelo cliente: Os erros dessa categoria ocorrem quando o cliente envia uma
        requisição com dados incompletos, ausentes ou inválidos. Com isso a requisição não pode ser
        processada e é retornado para o cliente o erro e seu motivo.

    2 - Erros originados pela API REST: Os erros dessa categoria ocorrem quando os erros no lado da
        API REST como, por exemplo, o banco de dados está indisponível. Os erros do lado da API REST
        são respondidos com o status 500 e uma mensagem de erro genérica.

======================================== IMPLEMENTANDO CRUD CAMADA CONTROLLER ========================================

--> Listagem de pessoas passageiras: <<<<<

~~~~~~~~~~~~~~~~~~~~~~
const { passengerService } = require('../services');

const listPassengers = async (_req, res) => {
  const { type, message } = await passengerService.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

module.exports = {
  listPassengers,
};
~~~~~~~~~~~~~~~~~~~~~~

- O arquivo começa com a importação do objeto passengerService;

- Na sequência, temos a definição da função listPassengers, que é um middleware do Express com os
  parâmetros req e res;

- Na primeira linha dessa função, note que chamamos passengerService.findAll() e que
  desestruturamos o retorno seguindo o contrato estabelecido na implementação;

- Vamos criar um if para avaliar se o valor de 'type' é diferente de null, e caso seja, vamos fazer
  com que a requisição responda com o status HTTP 500 e a 'mensagem' de erro retornada pelo service.
  Caso o service retorne o valor de 'type' sendo igual a null, a resposta da requisição vai ter o
  status HTTP 200 e o retorno vai ser a variável message que nesse cenário é o array de pessoa
  passageiras.

  --> Barrel da camada controller:

~~~~~~~~~~~~~~~~~~~~~~
const passengerController = require('./passenger.controller');

module.exports = {
  passengerController,
};
~~~~~~~~~~~~~~~~~~~~~~

--> Testes:

~~~~~~~~~~~~~~~~~~~~~~
// tests/unit/controllers/mocks/passenger.controller.mock

// Vamos utilizar esse objeto como mock da função createPassenger que ainda vamos implementar.
const passengerMock = {
  name: 'Bruce Lane',
  email: 'bruce.lane@acme.com',
  phone: '(77) 8179-0943',
};

// Vamos utilizar esse objeto como mock da função createPassenger que ainda vamos implementar.
const newPassengerMock = { id: 1, ...passengerMock };

// Esse é o array que utilizamos no teste da função findAll, reaproveitando o objeto newPassengerMock
const passengerListMock = [newPassengerMock];

module.exports = {
  passengerMock,
  newPassengerMock,
  passengerListMock,
};
~~~~~~~~~~~~~~~~~~~~~~
// tests/unit/controllers/passenger.controller.test.js

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { passengerService } = require('../../../src/services');
const { passengerController } = require('../../../src/controllers');
const {
  passengerListMock,
} = require('./mocks/passenger.controller.mock');

describe('Teste de unidade do passengerController', function () {
  describe('Listando as pessoas passageiras', function() {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(passengerService, 'findAll')
        .resolves({ type: null, message: passengerListMock });

      // act
      await passengerController.listPassengers(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(passengerListMock);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
~~~~~~~~~~~~~~~~~~~~~~

(!) INSTALAR SINON-CHAI: npm install -D -E sinon-chai@3.7.0


--> Busca de pessoas passageiras por id: <<<<<

~~~~~~~~~~~~~~~~~~~~~~
//src/controllers/passenger.controller.js

const getPassenger = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await passengerService.findById(id);

  if (type) return res.status(404).json(message);

  res.status(200).json(message);
};
~~~~~~~~~~~~~~~~~~~~~~

- Se o id for inválido, a função retorna o objeto com 'type' sendo igual a INVALID_VALUE e
message igual a "id" must be a number.

- Se não existir uma pessoa passageira com esse id no banco de dados, a função retorna o
objeto com 'type' sendo igual a PASSENGER_NOT_FOUND e message igual a Passenger not found.

(!) Temos um pequeno dilema aqui. Devido a nossa função lidar com duas regras de negócio, ela pode
    retornar dois tipos de erro diferentes (INVALID_VALUE e PASSENGER_NOT_FOUND). Nesse caso, seria
    interessante que quando a função do Service retornar INVALID_VALUE, o Controller retornar um
    status HTTP mais apropriado, no caso 422. Poderíamos fazer esse ajuste na própria função
    getPassenger do Controller colocando mais um if, no entanto, isso quebraria o padrão que 
    estabelecemos entre as funções do Controller, e também aumentaria a responsabilidade da 
    unção getPassenger. Portanto, podemos usar uma estratégia de criar um dicionário de erros,
    onde cada erro possui um status HTTP específico e usar esse dicionário para nos informar qual
    o status HTTP apropriado para cada erro.

~~~~~~~~~~~~~~~~~~~~~~
// src/utils/errorMap.js

const errorMap = {
  PASSENGER_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  TRAVEL_NOT_FOUND: 404,
  DRIVER_NOT_FOUND: 404,
  TRAVEL_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
~~~~~~~~~~~~~~~~~~~~~~

- Note que definimos um objeto chamado errorMap onde os nomes dos atributos são os erros definidos
na camada Service e que cada erro possui como valor um status HTTP específico. Na sequência temos a
função mapError que recebe como parâmetro um tipo e vai buscar no objeto errorMap o status HTTP
equivalente, e caso não exista o status padrão vai ser 500. 

--> Testando:

~~~~~~~~~~~~~~~~~~~~~~
// tests/unit/controllers/passenger.controller.test.js

// ...
const {
  passengerMock,
  newPassengerMock,
} = require('./mocks/passenger.controller.mock');

// describe('Teste de unidade do passengerController', function () {
  // ...

  describe('Buscando uma pessoa passageira', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(passengerService, 'findById')
        .resolves({ type: null, message: newPassengerMock });

      // Act
      await passengerController.getPassenger(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newPassengerMock);
    });

    it('ao passar um id inválido deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'abc' }, // passamos aqui um id inválido para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido.
      sinon
        .stub(passengerService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await passengerController.getPassenger(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 422
      expect(res.status).to.have.been.calledWith(422); 
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith('"id" must be a number');
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon
        .stub(passengerService, 'findById')
        .resolves({ type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' });

      // Act
      await passengerController.getPassenger(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404); 
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith('Passenger not found');
    });
  });
// ...
~~~~~~~~~~~~~~~~~~~~~~

--> Cadastro de pessoas passageiras: <<<<<

~~~~~~~~~~~~~~~~~~~~~~
// ...

const createPassenger = async (req, res) => {
  const { name, email, phone } = req.body;
  
  const { type, message } = await passengerService.createPassenger(name, email, phone);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(message);
};

// module.exports = {
// ...
  createPassenger,
// };
~~~~~~~~~~~~~~~~~~~~~~

--> Testando:

~~~~~~~~~~~~~~~~~~~~~~
describe('Cadastrando uma nova pessoa passageira', function () {
  it('ao enviar dados válidos deve salvar com sucesso!', async function () {
    // Arrange
    const res = {};
    // Aqui o mock do objeto req, atribui o objeto `passengerMock` ao atributo body
    const req = {
      body: passengerMock,
    };

    /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    /* Definimos um dublê para `passengerService.createPassenger` para retornar o objeto
    de uma pessoa passageira com o id. */
    sinon
      .stub(passengerService, 'createPassenger')
      .resolves({ type: null, message: newPassengerMock });

    // Act
    await passengerController.createPassenger(req, res);

    // Assert
    /* Fazemos a asserção para garantir que o status retornado vai ser 201
    e que o json é o objeto newPassengerMock. */
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newPassengerMock);
  });

  it('ao enviar um nome com menos de 3 caracteres deve retornar um erro!', async function () {
    // Arrange
    const res = {};
    /* Aqui mudamos o dublê de req.body com um valor inválido para o campo name */
    const req = {
      body: {
        name: 'Zé',
      },
    };

    /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    /* Definimos um dublê para `passengerService.createPassenger` para retornar o erro
    no contrato estabelecido na camada Service */
    sinon
      .stub(passengerService, 'createPassenger')
      .resolves({ type: 'INVALID_VALUE', message: '"name" length must be at least 3 characters long' });

    // Act
    await passengerController.createPassenger(req, res);

    // Assert
    /* O status HTTP retornado deve ser 422 */
    expect(res.status).to.have.been.calledWith(422);
    /* Ajustamos a mensagem de erro esperada para ser a mensagem gerada pelo service */
    expect(res.json).to.have.been.calledWith('"name" length must be at least 3 characters long');
  });
});
~~~~~~~~~~~~~~~~~~~~~~

--> Organizando rotas em caminho separado:

~~~~~~~~~~~~~~~~~~~~~~
// src/routers/passenger.router.js

const express = require('express');
const { passengerController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  passengerController.listPassengers,
);

router.get(
  '/:id',
  passengerController.getPassenger,
);

router.post(
  '/',
  passengerController.createPassenger,
);

module.exports = router;
~~~~~~~~~~~~~~~~~~~~~~

--> Barrel:

~~~~~~~~~~~~~~~~~~~~~~
// src/routers/index.js

const passengerRouter = require('./passenger.router');

module.exports = {
  passengerRouter,
};
~~~~~~~~~~~~~~~~~~~~~~

// ...
/* Adicionamos a importação do router de pessoas passageiras */
const { passengerRouter } = require('./routers');

// ...

// app.use(express.json());

/* Adicionamos o registro das rotas para o CRUD de pessoas passageiras 
para qualquer requisição que com `/passengers` */
app.use('/passengers', passengerRouter);

// ...

module.exports = app;
~~~~~~~~~~~~~~~~~~~~~~

--> Validação com middlewares:

~~~~~~~~~~~~~~~~~~~~~~
// src/middlewares/
module.exports = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'fields not passed' });
  }

  return next();
};
~~~~~~~~~~~~~~~~~~~~~~