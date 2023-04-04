================================ ASSOCIATIONS N:N E TRANSACTIONS ================================

================================ TRANSAÇÕES ================================

Uma transação simboliza uma unidade de trabalho indivisível executada do banco de dados de forma
independente de outras transações. As operações, que são as ações dessa unidade de trabalho não
podem ser mescladas com ações de outras transações. O conceito de uma unidade de trabalho indivisível
(ou todo o trabalho é feito, ou nada é) é chamado de atomicidade. Dessa forma, uma unidade de trabalho
atômica é indivisível.

Em outras palavras, uma transação de banco de dados relacional pode conter um ou mais comandos SQL. 
Cada comando deverá ser executado por completo para ter sucesso, ou seja, caso algum comando dentro 
do bloco dê errado, a transação falhará.

Uma transação de banco de dados relacional, por definição, deve ser atômica, consistente, isolada e 
durável, mais conhecida pela sigla ACID:

1 - Atomicidade: todas as operações definidas na transação devem ser concluídas com sucesso. Se algo
    falhar, a transação inteira falha;

2 - Consistência: todas as regras do banco de dados devem ser respeitadas, ou seja, estrutura de 
    tabelas, chaves estrangeiras, campos restritos, etc.;

3 - Isolamento: uma transação não pode interferir em outra transação. Cada transação deve se comportar
    de forma totalmente isolada das demais transações do banco de dados;

4 - Durabilidade: uma vez que a transação foi finalizada, os dados ali modificados devem ser armazenados
    de forma permanente, ou seja, só será possível alterá-los caso uma nova transação seja executada 
    posteriormente.

================================ CASO DE USO ================================

Imagine a seguinte situação: temos um endpoint em que, em um mesmo formulário, precisamos preencher a 
tabela de pessoas empregadas e a tabela de endereço. Mas precisamos garantir a atomicidade, ou seja, 
precisamos cadastrar a pessoa e o endereço de uma vez e, caso alguma coisa falhe, precisamos reverter 
essa operação.

~~~~~~~~~~~~~~~~~
// src/services/employee.service.js

// const { Address, Employee } = require('../models');
// ...

// const getById = async (id) => {
// ...
// }
const insert = async ({ firstName, lastName, age, city, street, number }) => {
  const employee = await Employee.create({ firstName, lastName, age });

  await Address.create({ city, street, number, employeeId: employee.id });
  return employee;
};

// module.exports = {
// ...
  insert
// };
~~~~~~~~~~~~~~~~~
// src/controllers/employee.controller.js

const EmployeeService = require('../services/employee.service');
const AddressService = require('../services/address.service');

// ...
const insert = async (req, res) => {
  try {
    const { firstName, lastName, age, city, street, number } = req.body;

    const employee = await EmployeeService.insert(
      { firstName, lastName, age, city, street, number },
    );

    return res.status(201).json({ id: employee.id, message: 'Cadastrado com sucesso' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Ocorreu um erro' });
  };
};

// module.exports = {
// ...
  insert
// };
~~~~~~~~~~~~~~~~~
// src/app.js
// const express = require('express');

// const employee = require('./controllers/employee.controller');
// ...

app.post('/employees', employee.insert);

// module.exports = app;
~~~~~~~~~~~~~~~~~


(!) O problema da operação acima é que, caso ocorra qualquer tipo de erro na operação de salvar o 
endereço no banco, a pessoa vai ficar cadastrada de forma inconsistente, pois o registro na tabela 
users foi concluído com sucesso. Para garantir que vamos salvar os dois objetos ou não vamos salvar 
nada, usamos o recurso de gerenciamento de transação do Sequelize.

Existem dois tipos de transações dentro do Sequelize: 
  1 - Unmanaged transactions
  2 - Managed transactions.

================================ UNMANAGED TRANSACTIONS ================================

Transações aumentam a confiabilidade da sua aplicação, já que respeitam o princípio da atomicidade,
evitando popular o banco de dados de forma inconsistente. Sempre que for fazer algum tipo de operação 
que envolva duas ou mais tabelas, é bastante recomendado usar uma transação para envelopar as operações 
de escrita. Isso serve para operações UPDATE e DELETE também.

Para esse tipo de transaction como o próprio nome diz, a transação não é gerenciada, é preciso indicar 
manualmente a circunstância em que uma transação deve ser finalizada ou revertida, ou seja, executar o 
commit ou rollback:

~~~~~~~~~~~~~~~~~
// src/services/employee.service.js

// const { Address, Employee } = require('../models');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
// Ajustamos para usar a configuração correta para nosso ambiente
const sequelize = new Sequelize(config[env]);

// ...

// const insert = async ({ firstName, lastName, age, city, street, number }) => {
  const t = await sequelize.transaction();
  try {
    // Depois executamos as operações
    const employee = await Employee.create(
      { firstName, lastName, age },
      { transaction: t },
    );

    await Address.create(
      { city, street, number, employeeId: employee.id },
      { transaction: t },
    );

    // Se chegou até essa linha, quer dizer que nenhum erro ocorreu.
    // Com isso, podemos finalizar a transação usando a função `commit`.
    await t.commit();
    return employee;
  } catch (e) {
    // Se entrou nesse bloco é porque alguma operação falhou.
    // Nesse caso, o sequelize irá reverter as operações anteriores com a função rollback, não sendo necessário fazer manualmente
    await t.rollback();
    console.log(e);
    throw e; // Jogamos o erro para a controller tratar
  }
// };

// ...
~~~~~~~~~~~~~~~~~

================================ MANAGED TRANSACTIONS ================================

Um ponto importante a se destacar é que uma vez que se opte por transações não gerenciadas, todo esse
controle fica na mão da pessoa desenvolvedora. Em projetos mais complexos a tarefa de ter o controle 
de todas as transações pode ser árdua. Nesses casos, prefira sempre que o próprio Sequelize fique 
responsável por realizar o gerenciamento das transações.

Nesse caso, o próprio Sequelize gerencia as transações e determina em tempo de execução, quando deve 
finalizar ou reverter uma transação:

~~~~~~~~~~~~~~~~~
// src/services/employee.service.js

// ...

// const insert = async ({ firstName, lastName, age, city, street, number }) => {
  const result = await sequelize.transaction(async (t) => {
    const employee = await Employee.create({
      firstName, lastName, age,
    }, { transaction: t });

    await Address.create({
      city, street, number, employeeId: employee.id
    }, { transaction: t });
    return employee;
  });

  return result;
  // Se chegou até aqui é porque as operações foram concluídas com sucesso,
  // não sendo necessário finalizar a transação manualmente.
  // `result` terá o resultado da transação, no caso um empregado e o endereço cadastrado
// };

// ...
~~~~~~~~~~~~~~~~~

================================ RELACIONAMENTOS N:N ================================

Como criamos uma associação que passa por 3 tabelas?

~~~~~~~~~~~~~~~~~
// src/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    underscored: true,
  },
);

  return User;
};
~~~~~~~~~~~~~~~~~
// src/models/Book.js
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
      releaseYear: DataTypes.INTEGER,
      totalPages: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  return Book;
};
~~~~~~~~~~~~~~~~~
// src/models/UserBook.js

module.exports = (sequelize, _DataTypes) => {
  const UserBook = sequelize.define(
    'UserBook',
    {},
    {
      timestamps: false,
      underscored: true,
      tableName: 'users_books',
    },
  );

  return UserBook;
};
~~~~~~~~~~~~~~~~~

Primeiro de tudo, note que não temos nenhum atributo nesse model. Isso é possível porque quando 
estabelecemos os relacionamentos no banco de dados usando UserBook como tabela de associação, o 
Sequelize já entende que esse model precisa ter os IDs que formam a chave composta das duas tabelas 
sendo associadas.

Para entender melhor as decisões que tomamos para configurar as options do sequelize.define underscored:
para acessar a tabela referente a este model, UserBook (em PascalCase) vai ser transformado em snake_case
e terá seu final pluralizado, transformando em “user_books” seu valor de acesso;

~~~~~~~~~~~~~~~~~
// src/models/UserBook.js

// module.exports = (sequelize, _DataTypes) => {
//   const UserBook = sequelize.define(
//     'UserBook',
//     {},
//     {
//       timestamps: false,
//       underscored: true,
//       tableName: 'users_books',
//     },

UserBook.associate = (models) => {
  models.Book.belongsToMany(models.User, {
    as: 'users',
    through: UserBook,
    foreignKey: 'bookId', // se refere ao id de Book na tabela de `users_books`
    otherKey: 'userId', // se refere a outra chave de `users_books`
  });
  models.User.belongsToMany(models.Book, {
    as: 'books',
    through: UserBook,
    foreignKey: 'userId', // se refere ao id de User na tabela de `users_books`
    otherKey: 'bookId',
  });
};

// return UserBook;
// };
~~~~~~~~~~~~~~~~~

Depois, temos um novo tipo de relacionamento: o belongsToMany. Esse relacionamento cria um 
relacionamento do tipo N:N, utilizando o model especificado na opção through como tabela de associação.
Temos também o alias daquela associação, na chave as e, por último, temos os parâmetros foreignKey e
otherKey. Esses dois parâmetros dizem ao Sequelize qual campo utilizar na tabela de associação para
identificar cada uma das entidades.

Lembre-se: foreignKey sempre se refere ao model em que chamamos belongsToMany, enquanto otherKey se
refere ao model com o qual estamos criando a associação.

================================ TESTE ================================

~~~~~~~~~~~~~~~~~
// ./tests/integration/employeeCreation.test.js

const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../src/app');

// omitir os `console.log`s dos testes gerando um `stub` pra função
const consoleLogStub = stub(console, 'log');
before(() => consoleLogStub.returns(true));
after(() => consoleLogStub.restore());

describe('Rota POST /employees', () => {
  describe('quando os dados do `body` são válidos', () => {
    let postEmployee;
    let getEmployee;

    before(async () => {
      try {
        postEmployee = await chai.request(app)
          .post('/employees')
          .send({
            firstName: 'Rodrigo',
            lastName: 'Oliveira',
            age: 30,
            city: 'TrybeCity',
            street: 'Rua Teste',
            number: 42,
          });

        const { body : { id } } = postEmployee;

        getEmployee = await chai.request(app)
          .get(`/employees/${id}`);
      } catch (error) {
        console.error(error.message);
      }
    });

    it('retorna 201 - Created', async () => {
      const { status } = postEmployee;

      expect(status).to.be.equals(201);
    });

    it('retorna um atributo `id`, que é um número', async () => {
      const { body: { id } } = postEmployee;

      expect(typeof id).to.be.equals('number');
    });

    it('retorna uma mensagem `Cadastrado com sucesso`', async () => {
      const { body: { message } } = postEmployee;

      expect(message).to.be.equals('Cadastrado com sucesso');
    });

    it('é possível consultar a pessoa criada através do `id` retornado', async () => {
      const { body: { id: postId } } = postEmployee;
      const { body: { id: getId } } = getEmployee;

      expect(postId).to.be.equals(getId);
    });

    it('essa consulta também retornou um atributo `addresses`, com pelo menos um item', async () => {
      const { body: { addresses } } = getEmployee;

      expect(addresses.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe('quando os dados do `body` não são válidos', () => {
    let postEmployee;

    before(async () => {
      try {
        // removendo city
        postEmployee = await chai.request(app)
          .post('/employees')
          .send({
            firstName: 'Rodrigo',
            lastName: 'Oliveira',
            age: 30,
            street: 'Rua Teste',
            number: 42,
          });
      } catch (error) {
        console.error(error.message);
      }
    });

    it('retorna 500 - Internal Server Error', async () => {
      const { status } = postEmployee;

      expect(status).to.be.equals(500);
    });

    it('retorna uma mensagem `Ocorreu um erro`', async () => {
      const { body: { message } } = postEmployee;

      expect(message).to.be.equals('Ocorreu um erro');
    });
  });
});
~~~~~~~~~~~~~~~~~