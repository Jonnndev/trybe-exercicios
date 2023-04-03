===================================== ORM ASSOCIATIONS 1:1 E 1:N =====================================

===================================== RELACIONAMENTOS 1:1 =====================================

Migrations ex:

~~~~~~~~~~~~~~
// src/migrations/[timestamp]-create-employee.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'last_name',
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('employees');
  },
};
~~~~~~~~~~~~~~
// src/migrations/[timestamp]-create-addresses.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // Configuram o que deve acontecer ao atualizar ou excluir um usuário
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'employee_id',
        // Informa que o campo é uma Foreign Key (Chave estrangeira)
        references: {
          // Informa a tabela da referência da associação
          model: 'employees',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('addresses');
  },
};
~~~~~~~~~~~~~~

É com as migrations criadas que montamos as associações no model:

~~~~~~~~~~~~~~
// src/models/employee.model.js

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'employees',
    underscored: true,
  });

  Employee.associate = (models) => {
    Employee.hasOne(models.Address,
      { foreignKey: 'employeeId', as: 'addresses' });
  };

  return Employee;
};
~~~~~~~~~~~~~~

(!) A função Employee.associate = (models) => {} que criamos é onde declararemos as associações daquele
model. No nosso caso, estamos dizendo que a tabela Employees possui um Address, referenciado pela
foreign key employee_id, o model Employee deve chamá-la de addresses (note a letra minúscula), como
definido na propriedade as.

--> Os métodos de criação de associações que o Sequelize disponibiliza são:

- hasOne
- belongsTo
- hasMany
- belongsToMany

(!) No model Address, por sua vez, temos que fazer o caminho inverso, declarando que o address pertence
a Employee. 

~~~~~~~~~~~~~~
// src/models/address.model.js

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    employeeId: { type: DataTypes.INTEGER, foreignKey: true },
    // A declaração da Foreign Key é opcional no model
  },
  {
    timestamps: false,
    tableName: 'addresses',
    underscored: true,
  });

  Address.associate = (models) => {
// define o tipo de relacionamento
    Address.belongsTo(models.Employee,
    // define qual a foreign key a ser criada
      { foreignKey: 'employeeId', as: 'employees' });
  };

  return Address;
};
~~~~~~~~~~~~~~

(!) A grande diferença quando vamos fazer uma requisição que necessite da utilização de uma association
com o Sequelize, é o campo include. Esse campo diz ao Sequelize quais serão as configurações da
requisição. A propriedade model se refere a qual tabela será utilizada. Já a propriedade as deve ser
igual à que declaramos no momento da criação da associação no respectivo model.

~~~~~~~~~~~~~~
// src/services/employee.service.js

const { Address, Employee } = require('../models/');

const getAll = async () => {
  const users = await Employee.findAll({
    include: { model: Address, as: 'addresses' },
  });

  return users;
};

module.exports = { getAll };
~~~~~~~~~~~~~~

===================================== RELACIONAMENTOS 1:N =====================================

No caso dos relacionamentos 1:N, não há grande diferença na maneira como criamos as associações.
Caso cada employee possuísse vários address, bastaria declarar seu model da seguinte forma:

~~~~~~~~~~~~~~
// src/models/employee.model.js

//  module.exports = (sequelize, DataTypes) => {
//  const Employee = sequelize.define('Employee', {
//  ...
//  });

//  Employee.associate = (models) => {
  Employee.hasMany(models.Address, <<<<<<<<<<<<<
    //      { foreignKey: 'employeeId', as: 'addresses' });
    //  };
    
    //  return Employee;
    //  };
~~~~~~~~~~~~~~

===================================== EAGER LOADING =====================================

Esse método carrega todos os dados na mesma request. Logo, ao utilizar eager loading, todas as
informações são trazidas, independente se vamos usá-las ou não. Este modo é útil para cenários
em que sabemos, já de antemão, que sempre vamos precisar de todos os dados das entidades envolvidas.

~~~~~~~~~~~~~~
// src/seeders/[timestamp]-employees.js

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('employees',
      [
        { first_name: 'Marcos', last_name: 'Zuck', age: 49 },
        { first_name: 'Fred', last_name: 'Mercurio', age: 19 },
        { first_name: 'Ayrton', last_name: 'Keno', age: 51 },
        { first_name: 'Robin', last_name: 'Mathias', age: 63 },
        { first_name: 'Antonio', last_name: 'Augusto', age: 18 },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('employees', null, {});
  },
};
~~~~~~~~~~~~~~

// src/seeders/[timestamp]-addresses.js

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('addresses',
      [
        {
          city: 'Belo Horizonte',
          street: 'Rua Florida',
          number: 1080,
          employee_id: 1,
        },
        {
          city: 'São Paulo',
          street: 'Avenida Paulista',
          number: 1980,
          employee_id: 2,
        },
        {
          city: 'Fortaleza',
          street: 'Rua das Enseadas',
          number: 95,
          employee_id: 3,
        },
        {
          city: 'Belo Horizonte',
          street: 'Rua Andaluzita',
          number: 131,
          employee_id: 4,
        },
        {
          city: 'Belo Horizonte',
          street: 'Rua Vicente Alvarenga',
          number: 80,
          employee_id: 1,
        },
        {
          city: 'Curitiba',
          street: 'Rua Fria',
          number: 101,
          employee_id: 5,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('addresses', null, {});
  },
};
~~~~~~~~~~~~~~

// src/app.js

// const express = require('express');
// const employee = require('./controllers/employee.controller');

// const app = express();

// app.use(express.json());

app.get('/employees/:id', employee.getById);
// app.get('/employees', employee.getAll);

// module.exports = app;
~~~~~~~~~~~~~~

// src/controllers/employee.controller.js

// const EmployeeService = require('../services/employee.service');

// const getAll = async (_req, res) => {
//   ...
// };

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeService.getById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Pessoa colaboradora não encontrada' });
    }

    return res.status(200).json(employee);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Ocorreu um erro' });
  };
}

// module.exports = {
//   getAll,
  getById
// };
~~~~~~~~~~~~~~

// src/services/employee.service.js

// const { Address, Employee } = require('../models/');

// const getAll = async () => {
//   ...
// };

const getById = async (id) => {
  const employee = await Employee.findOne({
      where: { id },
      include: [{ model: Address, as: 'addresses' }],
    });
  return employee;
}

// module.exports = {
//   getAll,
  getById
// };
~~~~~~~~~~~~~~

(!) Além das propriedades que já citamos, o campo include pode manipular os dados que serão retornados.
Por exemplo, se não quisermos o acesso ao número do endereço, bastaria alterar o código, adicionando a
propriedade attributes e dentro dela o que queremos fazer:

~~~~~~~~~~~~~~
// src/services/employee.service.js

// ...

// const getAll = async () => {
//   ...
// };

// const getById = async (id) => {
//   const employee = await Employee.findOne({
//       where: { id },
include: [{
  model: Address, as: 'addresses', attributes: { exclude: ['number'] },
}],
//   });
//   return employee;
// }

// ...
~~~~~~~~~~~~~~

===================================== LAZY LOADING =====================================

Agora vamos ver como funciona a outra forma de carregar dados de associações: o lazy loading.
Esse método consiste, basicamente, em não especificar uma propriedade includes no momento de
realizar a query no banco. Dessa forma, cria-se a possibilidade de termos dois usos para o mesmo
endpoint.

Para utilizarmos duas ações diferentes em um endpoint, usaremos a query string includeAddresses,
na qual, caso o parâmetro dela seja true, os endereços daquele funcionário também serão retornados.

~~~~~~~~~~~~~~
// src/services/employee.service.js

// ...

const getById = async (id) => {
  const employee = await Employee.findOne({
    where: { id },
  });
  return employee;
}

// ...
~~~~~~~~~~~~~~

// src/services/address.service.js

const { Address } = require('../models/');

const getAllByEmployeeId = async (employeeId) => {
  const addresses = await Address.findAll({ where: { employeeId } });

  return addresses;
};

module.exports = {
  getAllByEmployeeId,
}
~~~~~~~~~~~~~~

// src/controllers/employee.controller.js

const AddressService = require('../services/address.service');

//  ...

const getById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const employee = await EmployeeService.getById(id);

//     if (!employee) {
//       return res.status(404).json({ message: 'Pessoa colaboradora não encontrada' });
//     }

    if (req.query.includeAddresses === 'true') {
      const addresses = await AddressService.getAllByEmployeeId(id);
      return res.status(200).json({ employee, addresses });
    }

//     return res.status(200).json(employee);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: 'Ocorreu um erro' });
//   };
// }

// ...
~~~~~~~~~~~~~~

Como presenciamos, o lazy loading é muito útil em situações em que não sabemos se vamos, de fato,
precisar buscar todas as informações de uma só vez. Aqui, se tivéssemos utilizado o eager loading,
teríamos buscado os dados das pessoas colaboradoras mesmo quando includeAddresses não era informado,
e precisaríamos excluir a chave addresses do resultado do banco. Com o lazy loading, podemos carregar
apenas os dados do funcionário e dos endereços apenas quando necessário, economizando recursos do banco.