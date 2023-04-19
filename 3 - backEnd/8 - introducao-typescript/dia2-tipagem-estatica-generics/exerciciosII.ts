// Exercício 1
// Crie uma migration chamada create-authors para criar uma tabela authors com as seguintes colunas:

// Nome da coluna |	Descrição
// id	| deve ser do tipo integer, não pode ser nula e deve ser a chave primária da tabela com auto
//     incremento
// name |	deve ser do tipo string e não pode ser nulo

// 1 - Criar uma migration create-authors com o seguinte comando:

npx sequelize migration: generate--name create - authors;

// 2 - Dentro do arquivo src/database/migrations/[timestamp]-create-authors.js, vamos colocar o
// nome da nossa tabela como primeiro parâmetro do método queryInterface.createTable.

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authors', {});
  },
};

// Vamos também colocar um objeto como segundo parâmetro do método queryInterface.createTable que conterá
// todas as colunas da nossa tabela authors com suas características.

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    });
  },
};

// Vamos criar o método assíncrono down, para podermos desfazer nossa migration caso necessário.

'use strict';

module.exports = {
  // async up(queryInterface, Sequelize) {
  //   await queryInterface.createTable('authors', {
  //     id: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true,
  //     },
  //     name: {
  //       type: Sequelize.STRING(30),
  //       allowNull: false,
  //     },
  //   });
  // },

  async down(queryInterface) {
    await queryInterface.dropTable('authors');
  },
};

// Exercício 2
// Crie uma migration chamada create-genres para criar uma tabela genres com as seguintes colunas:

// Nome da coluna	| Descrição
// id	| deve ser do tipo integer, não pode ser nula e deve ser a chave primária da tabela com auto incremento
// genre	| deve ser do tipo string e não pode ser nulo

// 1 - criar uma migration create-genres com o seguinte comando:

npx sequelize migration: generate--name create - genres

// 2 - Dentro do arquivo src/database/migrations/[timestamp]-create-genres.js, vamos colocar o nome da nossa
// tabela como primeiro parâmetro do método queryInterface.createTable.

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genres', {});
  },
};

// Ainda no arquivo src/database/migrations/[timestamp]-create-genres.js, vamos colocar um objeto como segundo parâmetro
// do método queryInterface.createTable que conterá todas as colunas da nossa tabela genres com suas características.

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genres', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      genre: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    });
  },
};

// Por último, vamos criar o método assíncrono down, para podermos desfazer nossa migration caso necessário.

'use strict';

module.exports = {
  // async up(queryInterface, Sequelize) {
  //   await queryInterface.createTable('genres', {
  //     id: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true,
  //     },
  //     genre: {
  //       type: Sequelize.STRING(30),
  //       allowNull: false,
  //     },
  //   });
  // },

  async down(queryInterface) {
    await queryInterface.dropTable('genres');
  },
};

// Exercicios 3 - Crie uma migration para criar uma tabela books com as seguintes colunas:

// Nome da coluna	| Descrição
// id	| deve ser do tipo integer, não pode ser nula e deve ser a chave primária da tabela com auto incremento
// title	| deve ser do tipo string e não pode ser nulo
// author_id	| deve ser do tipo integer, não pode ser nula e deve ser chave estrangeira da tabela (seu 
//              relacionamento é feito com o campo id da tabela authors)
// genre_id	| deve ser do tipo integer, não pode ser nula e deve ser chave estrangeira da tabela (seu 
//            relacionamento é feito com o campo id da tabela genres)

// 1 - Utilizando o terminal, vamos criar uma migration create-books com o seguinte comando:

npx sequelize migration: generate--name create - books

// 2 - Dentro do arquivo src/database/migrations/[timestamp]-create-books.js, vamos colocar o nome da nossa
// tabela como primeiro parâmetro do método queryInterface.createTable.

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {});
  },
};

// Ainda no arquivo src/database/migrations/[timestamp]-create-books.js, vamos colocar um objeto como segundo
// parâmetro do método queryInterface.createTable que conterá todas as colunas da nossa tabela books com suas
// características.

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        field: 'author_id',
        references: {
          model: 'authors', // aqui informamos que a relação será com nossa model 'authors'
          key: 'id', // aqui informamos qual vai ser a coluna que será relacionada (no caso, a coluna 'id')
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      genre_id: {
        type: Sequelize.INTEGER,
        field: 'genre_id',
        references: {
          model: 'genres', // aqui informamos que a relação será com nossa model 'genres'
          key: 'id', // aqui informamos qual vai ser a coluna que será relacionada (no caso, a coluna 'id')
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },
};

// Por último, vamos criar o método assíncrono down, para podermos remover nossa migration caso necessário.

'use strict';

module.exports = {
  // async up(queryInterface, Sequelize) {
  //   await queryInterface.createTable('books', {
  //     id: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true,
  //     },
  //     title: {
  //       type: Sequelize.STRING(40),
  //       allowNull: false,
  //     },
  //     author_id: {
  //       type: Sequelize.INTEGER,
  //       field: 'author_id',
  //       references: {
  //         model: 'authors', // aqui informamos que a relação será com nossa model 'authors'
  //         key: 'id', // aqui informamos qual vai ser a coluna que será relacionada (no caso, a coluna 'id')
  //       },
  //       onDelete: 'CASCADE',
  //       onUpdate: 'CASCADE',
  //     },
  //     genre_id: {
  //       type: Sequelize.INTEGER,
  //       field: 'genre_id',
  //       references: {
  //         model: 'genres', // aqui informamos que a relação será com nossa model 'genres'
  //         key: 'id', // aqui informamos qual vai ser a coluna que será relacionada (no caso, a coluna 'id')
  //       },
  //       onDelete: 'CASCADE',
  //       onUpdate: 'CASCADE',
  //     },
  //   });
  // },

  async down(queryInterface) {
    await queryInterface.dropTable('books');
  },
};

// Exercício 4
// Crie o model Author com as configurações necessárias da tabela authors.

// 1 - Vamos criar o arquivo src/database/models/AuthorModel.ts e criar a classe Author estendendo o Model do
// sequelize. Em seguida, adicionamos as propriedades da tabela authors que precisam ser declaradas usando o !.

import { Model, INTEGER, STRING } from 'sequelize';

class Author extends Model {
  declare id: number;
  declare name: string;
}

export default Author;

// 2 - Agora, vamos utilizar o método .init da nossa classe Author para iniciar a configuração para acesso ao
// banco de dados no primeiro parâmetro.

import { Model, INTEGER, STRING } from 'sequelize';

class Author extends Model {
  declare id: number;
  declare name: string;
}

Author.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING(30),
    allowNull: false,
  },
});

export default Author;

// Por fim, no segundo parâmetro vamos adicionar a configuração do sequelize que vamos importar de index.ts

// import { Model, INTEGER, STRING } from 'sequelize';
import db from './index';

class Author extends Model {
//   declare id: number;
//   declare name: string;
// }

Author.init({
  //   id: {
  //     type: INTEGER,
  //     allowNull: false,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   name: {
  //     type: STRING(30),
  //     allowNull: false,
  //   },
},
  {
    sequelize: db,
    modelName: 'authors',
    timestamps: false,
  });

export default Author;

// Exercício 5
// Crie o model Book com as configurações necessárias da tabela books.

// 1 - Vamos criar o arquivo src/database/models/BookModel.ts e criar a classe Book estendendo o Model do
// sequelize. Em seguida, adicionamos as propriedades da tabela books que precisam ser declaradas usando o !.

import { Model, INTEGER, STRING } from 'sequelize';

class Book extends Model {
  declare id: number;
  declare title: string;
  declare authorId: number;
  declare genreId: number;
}

export default Book;

// 2 - Agora, vamos utilizar o método.init da nossa classe Book para iniciar a configuração para acesso ao
// banco de dados no primeiro parâmetro.

import { Model, INTEGER, STRING } from 'sequelize';

class Book extends Model {
  declare id: number;
  declare title: string;
  declare authorId: number;
  declare genreId: number;
}

Book.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING(30),
    allowNull: false,
  },
  authorId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'authors',
      key: 'id',
    },
  },
  genreId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'genres',
      key: 'id',
    },
  },
});

export default Book;

// No segundo parâmetro vamos adicionar a configuração do sequelize que vamos importar de index.ts

// import { Model, INTEGER, STRING } from 'sequelize';
import db from './index';

// class Book extends Model {
//   declare id: number;
//   declare title: string;
//   declare authorId: number;
//   declare genreId: number;
// }

Book.init({
  // id: {
  //   type: INTEGER,
  //   allowNull: false,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  // title: {
  //   type: STRING(30),
  //   allowNull: false,
  // },
  // authorId: {
  //   type: INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: 'authors',
  //     key: 'id',
  //   }
  // },
  // genreId: {
  //   type: INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: 'genres',
  //     key: 'id',
  //   }
  // }
}, {
  sequelize: db,
  modelName: 'books',
  underscored: true,
  timestamps: false,
});

export default Book;

// Exercício 6
// Crie um arquivo src/index.ts que retorne um array de objetos com as seguintes chaves:

// author: deve possuir o valor correspondente ao nome do autor;
// totalBooks: deve possuir o valor correspondente ao total de livros daquele autor.
// A ordem dos objetos devem ser decrescente com base no valor de totalBooks; Os nomes dos autores não devem se
// repetir nos objetos.

// 1 - Para começar vamos criando uma função que busque todos os autores e adicionar nosso console.log para acompanhar.

import Author from './database/models/AuthorModel';

(async () => {
  const data = await Author.findAll({});

  console.log(data);
  process.exit(0);
})();

// 2 - vamos incluir nossa classe de Book para podemos acessar as informações dela e adicionar a propriedade raw
// como true para não aparecer todas as informações do MySQL.

import Author from './database/models/AuthorModel';
import Book from './database/models/BookModel';

(async () => {
  const data = await Author.findAll({
    include: {
      model: Book,
      attributes: [],
    },
    raw: true,
  });

  console.log(data);
  process.exit(0);
})();

// Para selecionar os atributos desejados, vamos usar a propriedade attributes e alterar a chave name
// para author como solicitado no enunciado.

// import Author from './database/models/AuthorModel';
// import Book from './database/models/BookModel';

(async () => {
  const data = await Author.findAll({
    // include: {
    //   model: Book,
    //   attributes: [],
    // },
    attributes: [ // <<<<<<<<<<<<<<
      ['name', 'author'],
    ],
    // raw: true,
  });

  // console.log(data);
  // process.exit(0);
})();

// 3 - Os nomes estão vindo repetidos. O que acha de agruparmos eles? Utilize a propriedade group e adicione
// para fazer isso com os nomes dos autores.

import Author from './database/models/AuthorModel';
import Book from './database/models/BookModel';

(async () => {
  const data = await Author.findAll({
    // include: {
    //   model: Book,
    //   attributes: [],
    // },
    // attributes: [
    //   ['name', 'author'],
    // ],
    group: 'authors.name', // <<<<<<<<<<<<<<
    // raw: true,
  });

  // console.log(data);
  // process.exit(0);
})();

// 4 - Vamos realizar a contagem desses livros utilizando a função fn() de agregação e col() do sequelize para
// selecionar qual a coluna desejamos contar. 

import sequelize from 'sequelize';
// import Author from './database/models/AuthorModel';
// import Book from './database/models/BookModel';

(async () => {
  const data = await Author.findAll({
    // include: {
    //   model: Book,
    //   attributes: [],
    // },
    attributes: [
      // ['name', 'author'],
      [sequelize.fn('COUNT', sequelize.col('books.id')), 'totalBooks'], // <<<<<<<<<<<<<<
    ],
    // group: 'authors.name',
    // raw: true,
  });

  // console.log(data);
  // process.exit(0);
})();

// Para finalizar, no código abaixo vamos realizar a ordenação decrescente com a propriedade order.

// import sequelize from 'sequelize';
// import Author from './database/models/AuthorModel';
// import Book from './database/models/BookModel';

(async () => {
  const data = await Author.findAll({
    // include: {
    //   model: Book,
    //   attributes: [],
    // },
    // attributes: [
    //   ['name', 'author'],
    //   [sequelize.fn('COUNT', sequelize.col('books.id')), 'totalBooks'],
    // ],
    // group: 'authors.name',
    order: [['totalBooks', 'DESC']], // <<<<<<<<<<<<<<
    // raw: true,
  });

  // console.log(data);
  // process.exit(0);
})();