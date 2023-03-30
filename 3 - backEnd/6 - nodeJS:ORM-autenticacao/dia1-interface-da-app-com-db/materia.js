==================================== ORM - Object-Relational Mapping ====================================

--> É uma técnica que permite fazer um mapeamento estrutural entre as entidades do banco de dados e os
objetos que as representam no código JavaScript. O mapeamento objeto-relacional abstrai as diferenças 
entre os dois paradigmas, da aplicação e do banco de dados.

--> Com ORM não precisamos mais escrever uma query SQL “crua” para cada vez que formos inserir um
registro na tabela. A própria biblioteca fica responsável por isso. Você apenas passa o objeto JavaScript
para ela e ela insere os dados no banco de dados.

==================================== MAPEAMENTOS ====================================

--> No mercado de trabalho existem dois padrões de projeto que são mais utilizados para fazer o
mapeamento entre as entidades do banco de dados e os objetos que as representam no código.
Esses padrões são o Data Mapper e o Active Record.

1 - DATA MAPPER:

  - A classe que representa a tabela do banco de dados deve conhecer os recursos necessários para realizar
    as transações com o banco de dados, mas a classe que representa cada registro na tabela não deve saber
    nada do banco.

    CLASSE <---> MAPEADOR <---> DB

2 - ACTIVE RECORD:

  - A classe que representa os registros conhece os recursos necessários para realizar as transações no
    banco de dados.

    CLASSE/MAPEADOR <---> DB

==================================== SEQUELIZE ====================================

 (!) A maioria dos métodos fornecidos pelo Sequelize são assíncronos, portanto retornam promises. 

- Quando tentamos fazer a interação direta com o banco de dados, enfrentamos problemas como:

  a - O JavaScript sozinho não possui um suporte eficiente para o SQL, você precisaria de um script SQL
     separado para criar seu database e tabelas.

  b - As queries SQL precisam ser incorporadas (“embedadas”) no código do JavaScript para serem utilizadas.

  c - Por causa dessas limitações, acabamos apenas incluindo boilerplates de SQL em vez de utilizar a 
      Lógica de Negócio na nossa aplicação.

- Esses são alguns problemas que o Sequelize ajuda a resolver! Com ele, você pode evitar a criação de
  queries SQL para produzir as tabelas. Com o uso das models e migrations no Sequelize, o seu código
  se torna mais legível, extensível e de fácil manutenção.

- Além disso, por meio do mapeamento por objetos relacionais, é possível criar as relações e associações
  entre as tabelas com o próprio JavaScript. E ainda, é possível migrar seu database para outro banco de
  dados sem precisar reescrever todo o código.

--> Instalação: npm install -E sequelize@6.3.4

- criar arquivo .env:

~~~~~~~~~~~
MYSQL_USER=root
MYSQL_PASSWORD=senha_mysql
MYSQL_DATABASE=orm_example
MYSQL_HOST=localhost
~~~~~~~~~~~

- instalar CLI e nyslq2: npm install -D -E sequelize-cli@6.2.0 / npm install -E mysql2@2.1.0

(!) Iniciar um projeto com Sequelize dentro da pasta SRC:

~~~~~~~~~~~
// ./src
npx sequelize-cli init
~~~~~~~~~~~

Esse comando vai criar as seguintes pastas:

  - config: contém um arquivo de configuração, com orientações para o CLI se conectar com o nosso banco
    de dados;

  - models: contém todos os modelos da nossa aplicação;

  - migrations: contém todos os arquivos de migração da nossa aplicação;

  - seeders: contém todos os arquivos de “seeds” (sementes que são usadas para popular o banco).

(!) O arquivo .sequelizerc é um arquivo de configuração do Sequelize. Esse arquivo é responsável por
configurar o caminho das pastas migrations, models, seeders e config que o Sequelize irá procurar ao
executar um comando.

- crie o arquivo .sequelizerc n pasta RAIZ do projeto:

~~~~~~~~~~~
// app-with-sequelize/.sequelizerc

const path = require('path');

module.exports = {
  'config': path.resolve('src', 'config', 'config.js'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations'),
};
~~~~~~~~~~~

--> Conexão com o db:

  -  Configurar o arquivo config.json gerado pelo init do CLI. Ao alterar esse arquivo, estamos
     configurando o acesso da aplicação ao nosso banco de dados.

     (!) O arquivo config.json, localizado no diretório ./src/config, contém informações sensíveis, como
         credenciais de acesso ao banco de dados, expostas no nosso código. Uma boa prática é substituir
         os valores por variáveis de ambiente, não expondo assim, informações sensíveis relacionados à
         configuração geral da aplicação. 

- Alterar config.json para config.js:

~~~~~~~~~~~
// src/config/config.js

const config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
~~~~~~~~~~~

(!) Modifique o arquivo src/models/index.js para apontar para o arquivo config.js:

~~~~~~~~~~~
const config = require(__dirname + '/../config/config.json')[env]; // configuração antiga
~~~~~~~~~~~
const config = require(__dirname + '/../config/config.js')[env]; // configuração nova
~~~~~~~~~~~

- Após rodar um container com MySQL:

Agora que iniciamos uma aplicação do Sequelize e a nossa instância do MySQL está rodando, podemos
criar o banco de dados orm_example (que nomeamos no .env) na raiz do projeto:

~~~~~~~~~~~
env $(cat .env) npx sequelize db:create
~~~~~~~~~~~

(!) O .sequelizerc procura os arquivos de configuração do Sequelize no diretório src. Por isso,
é importante que você esteja na raiz do projeto quando for rodar os comandos do Sequelize.

==================================== MODEL ====================================

  - O arquivo index.js dentro da pasta models possui um papel muito importante: estabelecer uma
    instância de conexão entre os arquivos presentes na pasta model e o banco de dados relacional
    utilizado.

  - Os models são a essência do Sequelize. Um model é uma abstração que representa uma linha na
    tabela em seu banco de dados e passa várias informações ao Sequelize sobre essa entidade, como
    o nome e quais atributos (colunas) ela possui (e seus tipos de dados).

--> Definindo model:

a - Chamando pela função sequelize.define(modelName, attributes, options);
b - Estendendo Model como uma classe e chamando init(attributes, options);

EXEMPLO - Queremos criar uma tabela users, que contém dados de várias pessoas usuárias.

1 - Primeiro criamos um model que vai representar uma pessoa em nossa aplicação, ou uma linha na tabela
    users no nosso banco.

~~~~~~~~~~~
// src/models/user.model.js

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return User;
};

module.exports = UserModel;
~~~~~~~~~~~

Note também que o nome do arquivo model é user.model.js e que o nome da função definida nele também
está no singular (User). Isso é uma convenção. Geralmente os models são nomeados no singular, já que 
representam um registro (o equivalente a uma linha) da tabela, enquanto as tabelas são nomeadas no
plural.

--> Inicializando instâncias com build e create:

Além de possuir o método define e init, a Model do Sequelize contém outras funções que podem ser
utilizadas para inicializar uma instância de uma model.

  # Utilizando o build:

  - Antes de usarmos as funções, vamos adicionar uma nova linha no nosso arquivo user.model.js. Ela vai
    ser responsável por sincronizar a model com os métodos do Sequelize:

    ~~~~~~~~~~~
    // src/models/user.model.js
    const UserModel = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
       fullName: DataTypes.STRING,
       email: DataTypes.STRING,
     });
      (async () => { // << new
        await sequelize.sync({ force: true });
        // As funções vão aqui
    })();
     return User;
    };
    module.exports = UserModel;
    ~~~~~~~~~~~

    Vamos então criar a nossa Model com o método build. O método build é útil para criar uma instância de um
    model, mas sem salvá-la no banco de dados. Podemos usar essa função quando queremos criar um objeto que
    vai armazenar dados temporários:

    ~~~~~~~~~~~
    const sara = User.build({
      fullName: 'Sara Silva Santos',
      email: 'sara.ss@trybe.com',
    });

    console.log(sara instanceof User); // true
    console.log(sara.fullName); // "Sara Silva Santos"
    ~~~~~~~~~~~

    Note que o código acima não é assíncrono, o que significa que o método build não se comunica com o banco
    de dados. Isso acontece por que essa função cria uma instância de um model, que representa os dados que
    irão ser salvos no banco de dados, mas não os salva. Para salvar os dados no banco de dados, o método
    save deve ser utilizado:

    ~~~~~~~~~~~
    await sara.save();
    console.log('Pessoa salva no banco de dados!');
    ~~~~~~~~~~~

    # Utilizando o create:

    - Uma forma mais simples de criar uma instância de um model e salvá-la no banco de dados é usando o
      método create, que combina o build e o save em uma única função:

      ~~~~~~~~~~~
      const sara = await User.create({
        fullName: 'Sara Silva Santos',
        email: 'sara.ss@trybe.com',
      });
      
      console.log(sara instanceof User); // true
      console.log(sara.name); // "Sara Silva Santos"
      ~~~~~~~~~~~

--> Atualizando e excluindo dados:

- Se você precisa atualizar ou excluir dados de um model, pode usar os métodos update e destroy
respectivamente.

      # Modificando informações no db:

      - Quando trocamos informações de um model, precisamos salvar essas alterações no banco de dados.
        Para isso, podemos usar o método save:

        ~~~~~~~~~~~
        const sara = await User.create({
          fullName: 'Sara Silva Santos',
          email: 'sara.ss@trybe.com',
        });
        
        console.log(sara.fullName); // "Sara Silva Santos"
        
        sara.fullName = "Jane Doe";
        
        // O nome ainda está "Sara Silva Santos" no banco de dados!
        
        await sara.save();
        
        // Agora o nome foi atualizado para "Jane Doe" no banco de dados!
        ~~~~~~~~~~~

        (!) Também é possível atualizar diversos campos de uma vez usando o método set:

        ~~~~~~~~~~~
        const lucas = await User.create({
          fullName: 'Lucas Silva Santos',
          email: 'lucas.ss@trybe.com',
        });
        
        lucas.set({
          fullName: "Pedro Silva Santos",
          email: "pedro.ss@trybe.com"
        });
        
        // O nome ainda está "Lucas Silva Santos" no banco de dados!
        
        await lucas.save();
        
        // Agora o nome foi atualizado para "Pedro Silva Santos", e o email para pedro.ss@trybe.com no banco
        // de dados!
        ~~~~~~~~~~~

        (!) Note que chamar a função save no arquivo, vai atualizar todos os campos que foram alterados,
        não apenas os que foram modificados através do método set. Para atualizar apenas os campos
        específicos que foram modificados, podemos usar o método update:

        ~~~~~~~~~~~
        const jane = await User.create({
          fullName: "Jane Doe",
          email: "jane.doe@trybe.com",
        });
        
        jane.email = "ada.doe@trybe.com";
        await jane.update({ fullName: "Ada Joe" });
        
        // O banco de dados agora tem "Ada Joe" para o nome, mas o email ainda é "jane.doe@trybe.com".
        
        await jane.save();
        // O banco de dados agora tem "ada.doe@trybe.com" para o email.
        ~~~~~~~~~~~

        # Excluindo informações do db:

        - Quando precisamos excluir um model do banco de dados, podemos usar o método destroy:

        ~~~~~~~~~~~
        const mario = await User.create({ fullName: "Mario Bors" });

        console.log(mario.fullName); // "Mario Bors"

        await mario.destroy();

        // Agora essa entrada não existe mais no banco de dados!
        ~~~~~~~~~~~

==================================== MIGRATIONS ====================================

Uma migration é uma forma de versionar o schema do banco de dados. Ou seja, cada migration conterá um
pedaço de código que representa o histórico das alterações feitas no nosso banco de dados.

(!) Usando migrations, o mapeador objeto-relacional sabe exatamente quais alterações executar no banco
    de dados, tanto para criar algo novo quanto para restaurar o banco para uma versão mais antiga. Além
    disso, uma migration tem dois códigos conhecidos como Up e Down. Ou seja: toda migration, além de saber
    o que fazer para executar as mudanças no banco de dados (Up), também deve saber como reverter essas
    mudanças (Down). Isso significa que as migrations têm o poder de avançar ou reverter o seu banco de
    dados para qualquer um dos estados que ele já teve.

- Para gerar um arquivo migration base: npx sequelize migration:generate --name create-user

- Com isso, um novo arquivo [timestamp]-create-user.js será criado na pasta migrations contendo o
  seguinte código:

~~~~~~~~~~~
// src/migrations/[timestamp]-create-user.js

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
~~~~~~~~~~~

Agora vamos mexer apenas dentro das funções up e down. Repare que ambas as funções recebem dois
parâmetros: um é o queryInterface, e o outro é o Sequelize. Ambos os parâmetros são objetos que
armazenam dados e operações. O queryInterface é usado pela biblioteca para modificar o banco de
dados, seguindo o “dialeto” do banco que estamos utilizando. O objeto Sequelize armazena os tipos
de dados disponíveis no contexto do banco, por exemplo varchar, string, integer, date etc.

(!) O objetivo da nossa migration é criar a tabela users com os seguintes campos e condições:

id: Identificador do item.

  É uma chave primária;
  Valor não pode ser nulo;
  Possui incremento automático;
  É do tipo Integer.

fullName: Nome completo da pessoa usuária da aplicação.

  É do tipo String.

email: E-mail da pessoa usuária da aplicação.

  É do tipo String.

createdAt: Data da criação do item.

  Valor não pode ser nulo;
  É do tipo Date.

updatedAt: Data da atualização do item.

  Valor não pode ser nulo;
  É do tipo Date.

- Podemos criar a tabela Users através da função createTable do queryInterface. A função createTable
recebe dois parâmetros:

A - O primeiro recebe uma string com o nome da tabela;
B - O segundo recebe um objeto com os campos, e suas condições, da tabela.

1 - chamamos a função createTable passando o nome da tabela dentro do bloco de execução (up):

~~~~~~~~~~~
// src/migrations/[timestamp]-create-user.js

// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Users', {});
  //   },
  
  //   down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
  //   }
  // };
~~~~~~~~~~~

2 - Agora vamos adicionar todos os campos da nossa tabela e suas determinadas condições:

~~~~~~~~~~~
// src/migrations/[timestamp]-create-user.js

// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  fullName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
//   },

//   down: async (queryInterface, Sequelize) => {
/**
  * Add reverting commands here.
  *
  * Example:
  * await queryInterface.dropTable('users');
  */
//   }
// };
~~~~~~~~~~~

allowNull: Define se o campo pode ou não receber um valor null;
autoIncrement: Define se o campo vai ter incremento automático;
primaryKey: Define se o campo é uma chave primária;
type: Define o tipo do campo, por exemplo STRING, INTEGER, DATE, etc.

3 - Agora vamos implementar o bloco de reversão (down) com um código que vai apenas apagar a tabela
    caso seja necessário desfazer a operação de execução (up). Assim escreveremos uma migration
    perfeitamente reversível!

~~~~~~~~~~~
// src/migrations/[timestamp]-create-user.js

//  'use strict';

//  module.exports = {
//    up: async (queryInterface, Sequelize) => {
//      ...
//    },
//    down: async (queryInterface, Sequelize) => {
await queryInterface.dropTable('Users');
//    }
//  };
~~~~~~~~~~~

- Com a migration criada, basta executarmos o seguinte comando pelo CLI:

  env $(cat .env) npx sequelize db:migrate

- Caso queira reverter uma migration use o seguinte comando:

  env $(cat .env) npx sequelize db:migrate:undo

  (!!!!!) ao rodar o undo você perde todos os dados salvos anteriormente na tabela!

--> Criando nova migration para alterar tabela existente:

Para isso, o objeto queryInterface possui funções específicas, que permitem criar uma nova coluna,
remover uma coluna ou mesmo mudar o tipo de uma coluna que já existe. Nesse caso, o queryInterface
abstrai o que a função ALTER TABLE faz no SQL.

- Para criar uma outra migration para adicionar a coluna phoneNum na sua tabela Users,
  você deve criar um novo arquivo com o seguinte comando:

  npx sequelize migration:generate --name add-column-phone-table-users

- Agora podemos inserir a função queryInterface.addColumn() no escopo Up para adicionar uma nova
  coluna à nossa tabela Users, e adicionar a função queryInterface.removeColumn() no escopo Down
  para remover a nova coluna da tabela.

  ~~~~~~~~~~~
  // src/migrations/[timestamp]-add-column-phone-table-users.js

'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'phoneNum', {
      type: Sequelize.STRING,
    });
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Users', 'phoneNum');
    }
  };
  ~~~~~~~~~~~

- Em seguida rodamos o comando abaixo para executar a nossa nova migration:

  env $(cat .env) npx sequelize db:migrate

- Também devemos alterar o model user.model.js para incluir a nova coluna phoneNum da seguinte forma:

~~~~~~~~~~~
// src/models/user.model.js

// const User = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     fullName: DataTypes.STRING,
//     email: DataTypes.STRING,
       // aqui inserimos o datatype da coluna criada
       phoneNum: DataTypes.STRING,
//   });
// 
//   return User;
// };

// module.exports = User;
~~~~~~~~~~~

==================================== SEEDERS ====================================

As bibliotecas de mapeamento objeto-relacional permitem que controlemos informações que devem ser
criadas assim que nosso banco de dados/tabelas forem criados. Ou seja, podemos configurar nosso banco 
para ser automaticamente criado e povoado!

- Primeiramente vamos precisar executar a criação de uma nova seed pelo CLI:

npx sequelize seed:generate --name users

- Reparem que o arquivo foi criado dentro da pasta seeders com o mesmo formato do arquivo de uma migration.
  Agora, devemos adicionar ao arquivo criado quais informações aquele seed vai gerar.

~~~~~~~~~~~
// src/seeders/[timestamp]-users.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        fullName: 'Leonardo',
        email: 'leo@test.com',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        fullName: 'JEduardo',
        email: 'edu@test.com',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
~~~~~~~~~~~

Na função acima, estamos utilizando o parâmetro recebido pela função queryInterface para conversar com
o banco de dados. Dessa forma, conseguimos inserir os dados que queremos. Também estamos adicionando os
dados, que estão na estrutura de uma array de objetos, na tabela users. O queryInterface tem a função
bulkInsert, a qual estamos utilizando, que insere múltiplos dados na tabela.

(!) Note que a seed segue o mesmo princípio de up e down, ou seja, devemos colocar também o que a seed
    deve fazer caso precise reverter a operação.

- Para executar a seed, basta rodarmos o comando abaixo:

env $(cat .env) npx sequelize db:seed:all

- Para reverter o seed, use o seguinte comando:

env $(cat .env) npx sequelize db:seed:undo:all

==================================== OPERAÇÕES ====================================

- Implementando a listagem de pessoas usuária:

~~~~~~~~~~~
// src/services/user.service.js

const { User } = require('../models');

/* Esta função usa o método findAll do Sequelize para buscar todas as linhas da tabela Users
Equivale a fazer a query: SELECT * FROM Users */
const getAll = async () => {
  const users = await User.findAll();

  return users;
};

/* Esta função usa o método findByPk do Sequelize para buscar um usuário pelo id.
Equivale a fazer a query: SELECT * FROM Users WHERE id=? */
const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

/* Esta função usa o método findOne do Sequelize combinado 
com a chave where para buscar por id e email. 
Equivale a fazer a query: SELECT * FROM Users WHERE id=? AND email=? */
const getByIdAndEmail = async (id, email) => {
  const user = await User.findOne({ where: { id, email } });

  return user;
};

/* Esta função usa o método create do Sequelize para inserir um objeto na tabela Users
Equivale a fazer a query: INSERT INTO Users (full_name, email) VALUES (?, ?) */
const createUser = async (fullName, email) => {
  const newUser = await User.create({ fullName, email });

  return newUser;
};

/* Esta função usa o método update do Sequelize para atualizar um objeto na tabela Users
Equivale a fazer a query: UPDATE Users SET full_name=?, email=? WHERE id=?*/
const updateUser = async (id, fullName, email) => {
  const [updatedUser] = await User.update(
    { fullName, email },
    { where: { id } },
  );

  console.log(updatedUser); // confira o que é retornado quando o user com o id é ou não encontrado;
  return updatedUser;
};

/* Esta função usa o método destroy do Sequelize para remover um objeto na tabela Users
Equivale a fazer a query: DELETE FROM Users WHERE id=?*/
const deleteUser = async (id) => {
  const user = await User.destroy(
    { where: { id } },
  );

  console.log(user); // confira o que é retornado quando o user com o id é ou não encontrado;
  return user;
};

module.exports = {
  getAll,
  getById,
  getByIdAndEmail,
  createUser,
  updateUser,
  deleteUser,
};
~~~~~~~~~~~
// src/controllers/user.controller.js

const UserService = require('../services/user.service');

const error500Message = 'Algo deu errado';

const getAll = async (_req, res) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getById(id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: error500Message });
  }
};

const getByIdAndEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const user = await UserService.getByIdAndEmail(id, email);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: error500Message });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const newUser = await UserService.createUser(fullName, email);

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: error500Message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(id, fullName, email);

    if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: error500Message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: error500Message });
  }
};

module.exports = {
  getAll,
  getById,
  getByIdAndEmail,
  createUser,
  updateUser,
  deleteUser,
};
~~~~~~~~~~~
Note que não precisamos escrever uma query SQL para buscar os dados, pois o Sequelize abstrai isso
para nós. Ele oculta essa complexidade e nos provê uma forma menos trabalhosa de escrever esse código.

- Repare que estamos importando o modelo que criamos do arquivo index.js da pasta models, e não
  diretamente do arquivo user.models.js. Quando executamos o comando npx sequelize init, o arquivo
  index.js é gerado dentro da pasta models.

- O código desse arquivo index.js é responsável por:

1 - Realizar a conexão com o banco de dados, por meio do arquivo config.json ou config.js;
2 - Coletar todos os modelos definidos dentro da pasta models e;
3 - Caso necessário, associar um modelo a algum outro.

~~~~~~~~~~~
// src/app.js

const express = require('express');

const User = require('./controllers/user.controller');

const app = express();

app.use(express.json());

app.get('/user', User.getAll);

// Este endpoint usa o método findByPk do Sequelize para buscar um usuário pelo id.
app.get('/user/:id', User.getById);

// Este endpoint usa o método findOne do Sequelize para buscar um usuário pelo id e email.
// URL a ser utilizada para o exemplo "http://localhost:3001/user/search/1?email=leo@test.com"
app.get('/user/search/:id', User.getByIdAndEmail);

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
app.post('/user', User.createUser);

// Este endpoint usa o método update do Sequelize para alterar um usuário no banco.
app.put('/user/:id', User.updateUser);

// Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
app.delete('/user/:id', User.deleteUser);

module.exports = app;
~~~~~~~~~~~
// src/server.js

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
~~~~~~~~~~~

- Adicionar o express: npm install express@4.17

- Altere a chave no package.json a chave main para que aponte para o arquivo server.js: e adicione
  o script dev para rodar sua aplicação:

~~~~~~~~~~~
//  {
//  ...
"main": "src/server.js",
//  ...
"scripts": {
"dev": "env $(cat .env) nodemon src/server.js",
"test": "echo \"Error: no test specified\" && exit 1"
},
//  ...
//  }
~~~~~~~~~~~

==================================== Testes ====================================

npm i mocha@10.0.0 chai@4.3.4 sinon@14.0.0 chai-http@4.3.0 -D -E
npm i sequelize-test-helpers@1.4.3 -D -E

~~~~~~~~~~~
// package.json

"scripts": {
  ...
  "test": "mocha tests/**/*$NAME*.test.js --exit"
},

~~~~~~~~~~~
// tests/unit/models/user.test.js

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../../src/models/user.model');

describe('O model de User', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('possui o nome "User"', () => {
    checkModelName(User)('User');
  });

  describe('possui as propriedades "fullName" e "email"', () => {
    ['fullName', 'email'].forEach(checkPropertyExists(user));
  });
});
~~~~~~~~~~~

==================================== Cheat Sheet ====================================


1 - Instalação das dependências
1.1 - Instalação do sequelize
      $ npm install sequelize

1.2 - Instalação do pacote de comandos CLI
      $ npm install --save-dev sequelize-cli

1.3 - Instalação do mysql2
      $ npm install mysql2

2 - Inicialização de um projeto sequelize
2.1 - O comando criará as pastas models, migrations, seeders e config.
      $ npx sequelize-cli init

3 - Criação de um arquivo model
3.1 - O comando irá gerar o arquivo model e o arquivo migration correspondente.
      $ npx sequelize model:generate --name NomeDoModel --attributes nomeDoAtributo:string

4 - Arquivos migration
4.1 - Criação de um arquivo migration
      $ npx sequelize migration:generate --name migrationName

4.2 - Execução dos arquivos migration
      $ npx sequelize db:migrate

4.3 - Reverter a migration
      $ npx sequelize db:migrate:undo

4.4 - Reverter até uma migration específica
      $ npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

5 - Arquivos seeds
5.1 - Criação de um arquivo seed
      $ npx sequelize seed:generate --name seedName

5.2 - Execução dos arquivos seeds
      O comando executa todos os arquivos seeds
      $ npx sequelize db:seed:all

5.3 - Reversão dos arquivos seeds
      Reverter todos arquivos seeds
      $ npx sequelize db:seed:undo:all

5.4 - Reverter seed mais recente
      $ npx sequelize-cli db:seed:undo

5.5 - Reverter seed específica
      $ npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data