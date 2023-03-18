======================================== CAMADA SERVICE ========================================

--> Essa camada se restringe às regras de negócio de uma aplicação, ou seja, todos os procedimentos e
regras que geram valor para um negócio, empresa ou pessoas. 

--> Quando isolamos as nossas regras de negócios na camada de Services, permitimos uma visualização
mais fácil de possíveis conflitos em nosso código. Além disso, não limitamos nossas regras de negócio
a fazer apenas aquilo que uma tecnologia X ou Y permite. É a regra de negócio que vai definir a
tecnologia a ser usada e não o contrário.

O QUE DEVE FAZER:

1 - Abstrair regras de negócio complexas do seu modelo;
Exemplo: definir recomendações de filmes de acordo com o perfil da pessoa usuária.

2 - Centralizar validações de regras de negócios:
Exemplo: Uma pessoa que ainda não efetuou o pagamento do mês não dever ter acesso a plataforma de filmes.

O QUE NÃO DEVE FAZER:

1 - Não deve ter nenhum tipo de informação sobre o acesso a camada de dados (Model).
Exemplo: não ter nenhuma query SQL.

2- Não deve receber nada relacionado ao HTTP, seja o request ou o response.

======================================== O QUE É REGRA DE NEGÓCIO ========================================

--> validações e definições de processos que uma aplicação deve seguir para ser realizada a tarefa
determinada ao sistema, isto é, a regra de negócio diz respeito a como o programa deve realizar sua
função principal.

    1 - Regras de negócio simples: são regras como “não é possível cadastrar um produto que o nome tenha
        menos de cinco letras” ou “não é possível cadastrar um produto que já exista” ou “só é permitido
        listar todos os usuários sendo administrador”.

    2 - Regras de negócio complexas: são regras como “só é possível vender produtos que tenham estoque”
        ou “não é permitido parcelar compras em mais de 5x para valores abaixo de R$ 100,00”.

======================================== IMPLEMENTANDO UM CRUD - CAMADA SERVICE ========================================

--> TRYBE CAR

>>>>>>>> Implementando a função findAll() do service:

~~~~~~~~~~~~~~~~
const { passengerModel } = require('../models');

const findAll = async () => {
  const passengers = await passengerModel.findAll();
  return { type: null, message: passengers };
};

module.exports = {
  findAll,
};
~~~~~~~~~~~~~~~~

 (!) Essa função retorna o objeto { type: null, message: passengers }. Quando o valor do atributo 'type' 
 for igual a null, isso significa que a operação foi bem sucedida e o atributo 'message' possuirá o retorno esperado.
 
 (!) Em caso de falha, a propriedade 'type' será definida com um tipo de erro e a propriedade 'message' 
 com a respectiva mensagem de erro. Essa padronização irá mediar a comunicação desse serviço sempre que o mesmo for solicitado.

 >>>>>>>> Atualizando index do service:

 ~~~~~~~~~~~~~~~~
const passengerService = require('./passenger.service');

module.exports = {
  passengerService,
};
 ~~~~~~~~~~~~~~~~

 >>>>>>>> Implementando Testes para a camada services:

 Os testes na camada Service são fundamentais para uma aplicação uma vez que avaliam a conformidade das 
 regras de negócios. É importante que tenhamos nitidez do que a aplicação deve ou não fazer para 
 estabelecer os cenários de testes adequados.
 
 ~~~~~~~~~~~~~~~~
 .
└── src/
    ├── models/
    ├── services/
    │   └── index.js    
    │   └── passenger.service.js
    ├── tests/
    │   ├── integration
    │   └── unit/
    │       └── models/
    │       └── services/
    │           ├── mocks/
    │           │   └── passenger.service.mock.js
    │           └── passenger.service.test.js  
    ├── app.js
    └── server.js
~~~~~~~~~~~~~~~~

--> No próximo arquivo será definido os mocks para implementação dos testes:

~~~~~~~~~~~~~~~~
// tests/unit/services/mocks/passenger.service.mock.js
const validName = 'Bruce Lane';
const validEmail = 'bruce.lane@acme.com';
const validPhone = '(77) 8179-0943';

const allPassengers = [
  {
    id: 1,
    name: validName,
    email: validEmail,
    phone: validPhone,
  },
];

module.exports = {
  allPassengers,
};
~~~~~~~~~~~~~~~~

--> Na implementação dos TESTES DO SERVICE:

(!) A partir da premissa que já escrevemos o teste da função findAll() na camada MODEL e o que agora só 
precisamos testar o comportamento da função findAll() do SERVICE. Dessa forma, vamos usar o sinon.stub 
para mockar a chamada da função da camada Model para retorna o array que definimos anteriormente (allPassengers).

~~~~~~~~~~~~~~~~
const { expect } = require('chai');
const sinon = require('sinon');
const { passengerService } = require('../../../src/services');
const { passengerModel } = require('../../../src/models');

const { allPassengers } = require('./mocks/passenger.service.mock');

describe('Verificando service pessoa passageira', function () {
  describe('listagem de pessoas passageiras', function () {
    it('retorna a lista completa de pessoas passageiras', async function () {
      // arrange
      sinon.stub(passengerModel, 'findAll').resolves(allPassengers);
      
      // act
      const result = await passengerService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allPassengers);
    });
  });
  
   afterEach(function () {
     sinon.restore();
   });
 });
 ~~~~~~~~~~~~~~~~

 (!) Buscas por ID:

 A função findById possui a responsabilidade de solicitar a camada Model a busca de uma pessoa passageira
pelo seu respectivo id, porém essa função terá outras responsabilidades, tais como, validar as regras de 
negócios. Quando se busca uma pessoa passageira pelo id, é importante validar duas regras:

1 - O id deve ser um número inteiro e o valor deve ser no mínimo 1.

2 - Deve existir uma pessoa passageira com o id informado.

(!) Como lidaremos com validações, iremos centralizá-las na camada Service em um único arquivo. Para isso, 
crie uma pasta chamada validations dentro de src/services/. Em seguida, crie um arquivo chamado schemas.js.

~~~~~~~~~~~~~~~~
.
└── src/
    ├── models/
    ├── services/
    │   ├── validations/
    │   │   ├── schemas.js    
    │   └── index.js
    │   └── passenger.service.js
    ├── tests/
    │   ├── integration
    │   └── unit/
    │       └── models/    
    │       └── services/
    │           ├── mocks/
    │           │   └── passenger.service.mock.js
    │           └── passenger.service.test.js
    ├── app.js
    └── server.js
~~~~~~~~~~~~~~~~

NPM INSTALL JOI: npm install -E joi@17.6.0

--> Construindo o molde de validação:
~~~~~~~~~~~~~~~~
// src/services/validations/schemas.js

const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

module.exports = {
  idSchema,
};
~~~~~~~~~~~~~~~~

Aqui usamos o Joi para criar um schema de validação para realizar uma validação qualitativa de uma variável. 
Em outras palavras, vamos verificar se o valor da variável obedece aos seguintes critérios:

- deve ser um número (number());
- inteiro (integer());
- deve ser no mínimo 1 (min(1));
- não pode ser nulo (required()).

--> Validando a partir do schema

~~~~~~~~~~~~~~~~
.
└── src/
    ├── models/
    ├── services/
    │   ├── validations/
    │   │   ├── schemas.js    
    │   │   └── validationsInputValues.js
    │   └── passenger.service.js
    ├── tests/
    │   ├── integration
    │   └── unit/
    │       └── services/
    │           ├── mocks/
    │           │   └── passenger.service.mock.js
    │           └── passenger.service.test.js
    ├── app.js
    └── server.js
~~~~~~~~~~~~~~~~
// src/services/validations/validationsInputValues.js

const { idSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};
~~~~~~~~~~~~~~~~

--> Implementando função findById:

~~~~~~~~~~~~~~~~
// const passengerModel = require('../models/passenger.model');
const schema = require('./validations/validationsInputValues');

// ...

const findById = async (passengerId) => {
  const error = schema.validateId(passengerId);
  if (error.type) return error;

  const passenger = await passengerModel.findById(passengerId);
  if (!passenger) return { type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' };

  return { type: null, message: passenger };
};

// module.exports = {
//   findAll,
     findById,
// };
~~~~~~~~~~~~~~~~

--> Implementação dos testes:

~~~~~~~~~~~~~~~~
// ...

// describe('Verificando service pessoa passageira', function () {
// ...
  
describe('busca de uma pessoa passageira', function () {
  it('retorna um erro caso receba um ID inválido', async function () {
    // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

    // act
    const result = await passengerService.findById('a');
    
    // assert
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('retorna um erro caso a pessoa passageira não existe', async function () {
    // arrange
    sinon.stub(passengerModel, 'findById').resolves(undefined);
   
    // act
    const result = await passengerService.findById(1);
    
    // assert
    expect(result.type).to.equal('PASSENGER_NOT_FOUND');
    expect(result.message).to.equal('Passenger not found');
  });
  
  it('retorna a pessoa passageira caso ID existente', async function () {
    // arrange
    sinon.stub(passengerModel, 'findById').resolves(allPassengers[0]);
    
    // act
    const result = await passengerService.findById(1);

    // assert
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allPassengers[0]);
  });
});

// ...
~~~~~~~~~~~~~~~~

--> Perceba que esse teste é mais robusto, pois contempla três possíveis fluxos:

1 - O id recebido é inválido. Nesse caso o serviço retorna um objeto com o atributo 'type' com o valor 
INVALID_VALUE e o atributo 'message' com valor "id" must be a number

2 - O id é válido mas a camada Model retorna um objeto nulo ao chamar a função (simulando a inexistência 
de uma linha na tabela passengers com esse id). Nesse caso o serviço retorna um objeto possuindo o
atributo 'type' com o valor PASSENGER_NOT_FOUND e o atributo 'message' com valor Passenger not found.

3 - Existe um passageiro com o id enviado e o serviço retorna um objeto com o atributo 'type' com o valor 
null e o atributo 'message' com o objeto passageiro encontrado.

========================================

--> Para inserir uma nova linha na tabela de pessoas passageiras, certificaremos que os dados são válidos 
de uma forma qualitativa. No nosso cenário, estabeleceremos as seguintes regras de negócio:

1 - O nome da pessoa passageira é obrigatório e deve ter no mínimo 3 caracteres.

2 - O e-mail da pessoa passageira é obrigatório e deve ter o formato de um e-mail.

3 - O telefone da pessoa passageira é obrigatório e deve possuir no mínimo 9 caracteres e no máximo 20 caracteres.

======================================== DEFININDO SCHEMAS ========================================

~~~~~~~~~~~~~~~~
// const Joi = require('joi');

// const idSchema = Joi.number().integer().min(1).required();

const addPassengerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).max(20).required(),
});

// module.exports = {
// ...
  addPassengerSchema,
// };
~~~~~~~~~~~~~~~~

--> Método que realiza a validação:

~~~~~~~~~~~~~~~~
const { addPassengerSchema, idSchema } = require('./schemas');

// ...
// src/services/validation/validationInputValues.js

const validateNewPassenger = (name, email, phone) => {
  const { error } = addPassengerSchema
    .validate({ name, email, phone });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  return { type: null, message: '' };
};

// module.exports = {
// ...
  validateNewPassenger,
// };
~~~~~~~~~~~~~~~~

Perceba que usamos um if para tratar o retorno do schema, se for identificado que o objeto informado não 
é válido vamos retornar o objeto com o atributo 'type' igual a INVALID_VALUE e a o valor do atributo 
message será a 'mensagem' de erro que o próprio JOI gera. Caso o objeto seja válido a função retorna 
um objeto com o atributo 'type' igual a null, o que indica que não aconteceu nenhum erro, e 
respectivamente o atributo 'message' sendo uma string vazia.

--> Implementando a função createPasenger:

~~~~~~~~~~~~~~~~
// ...
// src/services/passenger.service.js
const createPassenger = async (name, email, phone) => {
  const error = schema.validateNewPassenger(name, email, phone);
  if (error.type) return error;

  const newPassengerId = await passengerModel.insert({ name, email, phone });
  const newPassenger = await passengerModel.findById(newPassengerId);

  return { type: null, message: newPassenger };
};

// module.exports = {
// ...
     createPassenger,
// };
~~~~~~~~~~~~~~~~

- A função createPassenger recebe como parâmetro o nome, e-mail e telefone de uma pessoa passageira,
e passa esses valores para a função validateNewPassenger na primeira linha da função. Na linha seguinte,
existe um if para avaliar se o valor de error.type é diferente de null. 

- Caso os valores sejam válidos, é realizado a inserção dos dados, retornando o id da pessoa passageira 
que foi inserida. Esse valor é armazenado na variável newPassengerId, onde é usado para buscar a pessoa
passageira pelo seu respectivo id. O objeto retornado (newPassenger) é atribuído a chave message no 
objeto de retorno do serviço e o atributo type sendo igual a nulo. 

--> Testando a função:

Vamos enumerar quatro possíveis cenários:

1 - Enviar um nome inválido; (Cenário de erro)
2 - Enviar um e-mail inválido; (Cenário de erro)
3 - Enviar um telefone inválido; (Cenário de erro)
4 - Enviar todos os dados válidos (Caminho feliz);

~~~~~~~~~~~~~~~~
//  tests/unit/services/mocks/passenger.service.mock.js

const invalidValue = 'a';
// ...

// module.exports = {
  invalidValue,
  validName,
  validEmail,
  validPhone,
  // ...
// };
~~~~~~~~~~~~~~~~

// ...

const {
  allPassengers, 
  invalidValue,
  validName, 
  validEmail, 
  validPhone,
} = require('./mocks/passenger.service.mock');

// describe('Verificando service pessoa passageira', function () {
// ...  
  describe('cadastro de uma pessoa passageira com valores inválidos', function () {
    it('retorna um erro ao passar um nome inválido', async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model!

      // act
      const result = await passengerService.createPassenger(invalidValue, validEmail, validPhone);

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 3 characters long');
    });

    it('retorna um erro ao passar um email inválido', async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model! [2]

      // act
      const result = await passengerService.createPassenger(validName, invalidValue, validPhone);

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"email" must be a valid email');
    });

    it('retorna um erro ao passar um telefone inválido', async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model! [3]

      // act
      const result = await passengerService.createPassenger(validName, validEmail, invalidValue);

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"phone" length must be at least 9 characters long');
    });
  });

  describe('cadastro de uma pessoa passageira com valores válidos', function () {
    it('retorna o ID da pessoa passageira cadastrada', async function () {
      // arrange
      sinon.stub(passengerModel, 'insert').resolves(1);
      sinon.stub(passengerModel, 'findById').resolves(allPassengers[0]);
      
      // act
      const result = await passengerService.createPassenger(validName, validEmail, validPhone);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allPassengers[0]);
    });
  });
  
  // ...
//  });
~~~~~~~~~~~~~~~~

--> Podemos perceber que os its do describe ‘cadastro de uma pessoa passageira com valores inválidos’ 
executam a função passengerService.createPassenger() passando dentro de cada it respectivamente um 
valor inválido para os parâmetros name, email e phone.

--> Logo, a asserção é feita para verificar se a mensagem retornada é equivalente ao erro gerado 
pelo valor inválido de cada atributo. Por exemplo, ao enviar o name com o valor da variável 
invalidValue o objeto de erro é retornado com a mensagem '"name" length must be at least 3 characters long'
devido ao uso do min(3) no schema addPassengerSchema. Quando enviamos a mesma variável como valor do 
telefone, a mensagem já difere, pois o mínimo esperado de caracteres é 9.

======================================== REGRAS DE NEGÓCIO ========================================

--> Ao solicitar uma viagem, a pessoa passageira deve enviar as seguintes informações:

1 - ID da pessoa passageira;
2 - Endereço de partida (startingAddress);
3 - Endereço de destino (endingAddress);
4 - Endereços de paradas (waypoints) [opcional]
5 - Ordem de parada (stopOrder)
6 - Endereço de parada (address)

--> Ao buscar uma viagem em aberto, a pessoa motorista deve buscar travels com status:

1 - WAITING_DRIVER

--> Qual o problema de deixarmos nossas regras de negócios acopladas ao Express?

Atualmente o Express é considerado um dos melhores frameworks para Node.js, mas não podemos garantir 
que isso será uma verdade ao longo de todo o ciclo de vida da nossa aplicação. Nesse caso, a melhor 
opção é deixarmos tudo preparado para uma eventual aposentadoria do nosso amigo Express. Desse modo,
outro framework poderá substituí-lo sem que haja necessidade de refatorar as regras de negócio.

Existe um termo para isso: baixo acoplamento entre as camadas e nosso código. Essa é uma habilidade 
que dá ao nosso código um grande poder de reuso já que isolamos as regras de negócio em uma camada 
que não está atrelada a uma tecnologia específica.

