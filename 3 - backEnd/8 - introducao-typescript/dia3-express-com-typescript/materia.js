====================================== CONFIGURANDO NODE + TS ======================================

1 - mkdir express-typescript && cd express-typescript

2 - npm init -y

O próximo passo é adicionar o suporte ao TypeScript ao nosso projeto, para isso vamos instalar o pacote
npm do TypeScript como dependência de desenvolvimento do nosso projeto.

3 - npm install -D -E typescript@4.4.4

~~~~~~~~~~~~~~~~~~~~~~~~~
// tsconfig.json

{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "rootDir": "./",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~

4 - npm install -D -E @types/node@16.18.23

ts-node-dev --> é um pacote de utilitários que vai nos ajudar a executar o servidor de desenvolvimento,
escrito em TypeScript, diretamente no terminal, sem necessidade de compilarmos o código em JavaScript,
além de reiniciar o servidor a cada alteração que fizermos, sem a necessidade de encerrarmos o processo
e o iniciarmos novamente.

5 - npm install -D -E ts-node-dev@1.1

OU RODAR TUDO ACIMA EM UM ÚNICO COMANDO:

--> npm install -D -E typescript@4.4.4 @types/node@16.18.23 ts-node-dev@1.1

====================================== INSTALANDO EXPRESS ======================================

1 - npm install express@4.17

2 - npm install -D @types/express@4.17

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./statusCodes.ts

const statusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NO_CONTENT: 204,
};

export default statusCodes;
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./index.ts

import express, { Request, Response } from 'express';
import statusCodes from './statusCodes';
import BooksRoutes from './routes/books.routes';

const app = express();

app.use(express.json());
app.use(BooksRoutes); // coloque essa linha antes do middleware de erro!

const PORT = 8000;

app.get('/', (_req: Request, res: Response) => {
    res.status(statusCodes.OK).send('Express + TypeScript')
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  console.log(`name: ${name}`);

  switch (name) {
    case 'BadRequestError':
      res.status(400).json({ message });
      break;
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
~~~~~~~~~~~~~~~~~~~~~~~~~
// package.json

...
"scripts": {
    "start": "npm run build && node ./dist/index.js",
    "dev": "tsnd index.ts",
    "build": "tsc"
 },
...
~~~~~~~~~~~~~~~~~~~~~~~~~

Instalar uma lib que faz o tratamento de erros disparar diretamente o middleware de erro sem a
necessidade de colocar try/catch ao longo do seu código. Essa lib é a express-async-errors.

3 - npm install express-async-errors@3.1

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./index.ts

import express, { NextFunction, Request, Response } from 'express';
import statusCodes from './statusCodes';
import 'express-async-errors'; // <<<<<<<<<<<<<<<<<<<<

// ..
~~~~~~~~~~~~~~~~~~~~~~~~~

Vamos instalar mais duas libs que usaremos um pouco mais a frente. Elas nos ajudarão a disparar
erros específicos para serem tratados no middleware de erro.

4 - npm install restify-errors@8.0 @types/restify-errors@4.3

====================================== CRUD DE LIVROS ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./interfaces/book.interface.ts
interface Book {
  id?: number;
  title: string;
  price: number;
  author: string;
  isbn: string;
}

export default Book;
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./routes/books.routes.ts

import { Router } from 'express';
import BooksController from '../controllers/books.controller';

const router = Router();

const booksController = new BooksController();

router.get('/books', booksController.getAll);

export default router;
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./models/connection.ts

import mysql from 'mysql2/promise'; // instalar mysql2

export default mysql.createPool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
~~~~~~~~~~~~~~~~~~~~~~~~~

A única diferença que teremos no arquivo de modelo é que agora vamos importar a Interface Book que criamos agora há
pouco em vez de criá-la no mesmo arquivo, como anteriormente. Ela continuará definindo o tipo de retorno esperado nas
nossas requisições.

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./models/book.model.ts

import { Pool, ResultSetHeader } from 'mysql2/promise';
import Book from '../interfaces/book.interface';

export default class BookModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<Book[]> {
    const result = await this.connection
      .execute('SELECT * FROM books');
    const [rows] = result;
    return rows as Book[];
  }

  async create(book: Book): Promise<Book> {
    const { title, price, author, isbn } = book;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
      [title, price, author, isbn],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...book };
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== FIND ALL ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./services/books.service.ts

import connection from '../models/connection';
import BookModel from '../models/book.model';
import Book from '../interfaces/book.interface';

class BookService {
  model: BookModel;

  constructor() {
    this.model = new BookModel(connection);
  }

  async getAll(): Promise<Book[]> {
    const books = await this.model.getAll();
    return books;
  }
}

export default BookService;
~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Agora podemos criar nosso controller para chamar o service. Também não podemos esquecer de dar bind no método no construtor,
caso contrário ocorrerá um erro de que o this é undefined quando formos rodar nossa aplicação. 

(!) Precisamos sempre dar bind nos métodos dos nossos controllers. 

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./controllers/books.controller.ts

import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import BookService from '../services/books.service';

class BooksController {
  bookService: BookService;
  
  constructor(bookService = new BookService()) {
  this.bookService = bookService;
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const books = await this.bookService.getAll();
    res.status(statusCodes.OK).json(books);
  };
}

export default BooksController;
~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== FIND BY ID ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./models/book.model.ts

// import { Pool, ResultSetHeader } from 'mysql2/promise';
// import Book from '../interfaces/book.interface';

// export default class BookModel {
//   connection: Pool;

//   constructor(connection: Pool) {
//     this.connection = connection;
//   }

//   async getAll(): Promise<Book[]> {
//     const result = await this.connection
//       .execute('SELECT * FROM books');
//     const [rows] = result;
//     return rows as Book[];
//   }

async getById(id: number): Promise<Book> {
  const result = await this.connection
    .execute('SELECT * FROM books WHERE id=?', [id]);
  const [rows] = result;
  const [book] = rows as Book[];
  return book;
}

//   async create(book: Book): Promise<Book> {
//     const { title, price, author, isbn } = book;
//     const result = await this.connection.execute<ResultSetHeader>(
//       'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
//       [title, price, author, isbn],
//     );
//     const [dataInserted] = result;
//     const { insertId } = dataInserted;
//     return { id: insertId, ...book };
//   }
// }
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./services/books.service.ts

// import connection from '../models/connection';
// import BookModel from '../models/book.model';
// import Book from '../interfaces/book.interface';

// class BookService {
//   model: BookModel;

//   constructor() {
//     this.model = new BookModel(connection);
//   }

//   async getAll(): Promise<Book[]> {
//     const books = await this.model.getAll();
//     return books;
//   }

async getById(id: number): Promise<Book> {
  const book = await this.model.getById(id);
  return book;
}
// }

// export default BookService;
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./controllers/books.controller.ts

// import { Request, Response } from 'express';
// import statusCodes from '../statusCodes';
// import BookService from '../services/books.service';

// class BooksController {
  // bookService: BookService;

  constructor(bookService = new BookService()) {
    // this.bookService = bookService;
      // this.getAll = this.getAll.bind(this);
      this.getById = this.getById.bind(this);
    }
  
    // async getAll(_req: Request, res: Response): Promise<void> {
    //   const books = await this.bookService.getAll();
    //   res.status(statusCodes.OK).json(books);
    // }
  
    async getById(req: Request, res: Response): Promise<void> {
      const id = parseInt(req.params.id, 10);
  
      const book = await this.bookService.getById(id);
  
      if (!book) {
        res.status(statusCodes.NOT_FOUND).json({ message: 'Book not found!' });
      } else {
        res.status(statusCodes.OK).json(book);
      }
    }
  // }
// export default BooksController;
~~~~~~~~~~~~~~~~~~~~~~~~~
// import { Router } from 'express';
// import booksController from '../controllers/books.controller';

// const router = Router();

// const booksController = new BooksController();

// router.get('/books', booksController.getAll);
router.get('/books/:id', booksController.getById);

// alternativa ao uso do bind
// router.get('/books', (req, res) => booksController.getAll(req, res));
// router.get('/books/:id', (req, res) => booksController.getById(req, res));

// export default router;
~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== INSERT ======================================


Para inserirmos um livro no banco de dados precisamos validar os dados recebidos através do nosso endpoint. Para isso
vamos adicionar a nossa camada de Service a regra de negócio que verifica se todas as propriedades obrigatórias estão
presentes e se elas não são vazias.

Para lançar o erro nós usaremos a biblioteca restify-errors.

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./services/books.service.ts

// import connection from '../models/connection';
// import BookModel from '../models/book.model';
// import Book from '../interfaces/book.interface';
import { BadRequestError } from 'restify-errors';

// class BookService {
//   model: BookModel;

//   constructor() {
//     this.model = new BookModel(connection);
//   }

// os próximos três métodos serão nossas validações
  validateProperties(book: Book): [boolean, string | null] {
    const properties = ['title', 'price', 'author', 'isbn'];

    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(book, properties[i])) {
        return [false, properties[i]];
      }
    }

    return [true, null];
  }

  validateValues(book: Book): [boolean, string | null] {
    const entries = Object.entries(book);

    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i];

      if (!value) {
        return [false, property];
      }
    }

    return [true, null];
  }

  validationBook(book: Book): void | string {
    let [valid, property] = this.validateProperties(book);

    if (!valid) {
      return `O campo ${property} é obrigatório.`;
    }

    [valid, property] = this.validateValues(book);

    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio.`;
    }
  }

  // async getAll(): Promise<Book[]> {
  //   const books = await this.model.getAll();
  //   return books;
  // }

  // async getById(id: number): Promise<Book> {
  //   const book = await this.model.getById(id);
  //   return book;
  // }

  create(book: Book): Promise<Book> {
    // chamamos o método validationBook
    const isValidBook = this.validationBook(book);

    if (typeof isValidBook === 'string') {
      // aqui estamos jogando o erro para o nosso middleware de erro fazer o tratamento e dar a resposta da requisição
      throw new BadRequestError(isValidBook);
    }

    // depois de todas as verificações chamamos a camada de model
    return this.model.create(book);
  }
// }

// export default BookService;
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./controllers/books.controller.ts

// import { Request, Response } from 'express';
// import BookService from '../services/books.service';
// import statusCodes from '../statusCodes';

// class BooksController {
 //  bookService: BookService;

 constructor(bookService = new BookService()) {
  // this.bookService = bookService;
   // this.getAll = this.getAll.bind(this);
   // this.getById = this.getById.bind(this);
   this.create = this.create.bind(this);
 }

 // async getAll(_req: Request, res: Response): Promise<void> {
 //   const books = await this.bookService.getAll();
 //   res.status(statusCodes.OK).json(books);
 // }

 // async getById(req: Request, res: Response): Promise<void> {
 //   const id = parseInt(req.params.id, 10);

 //   const book = await this.bookService.getById(id);

 //   if (!book) {
 //     res.status(statusCodes.NOT_FOUND).json({ message: 'Book not found!' });
 //   } else {
 //     res.status(statusCodes.OK).json(book);
 //   }
 // }

 async create(req: Request, res: Response): Promise<void> {
   const book = req.body;
   const bookCreated = await this.bookService.create(book);
   res.status(statusCodes.CREATED).json(bookCreated);
 }
// }

// export default BooksController;
~~~~~~~~~~~~~~~~~~~~~~~~~
// routes/books.routes.ts

// import { Router } from 'express';
// import BooksController from '../controllers/books.controller';

// const router = Router();

// const booksController = new BooksController();

// router.get('/books', booksController.getAll);
// router.get('/books/:id', booksController.getById);
router.post('/books', booksController.create);

// alternativa ao uso do bind
// router.get('/books', (req, res) => booksController.getAll(req, res));
// router.get('/books/:id', (req, res) => booksController.getById(req, res));
// router.post('/books', (req, res) => booksController.create(req, res));

// export default router;
~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== UPDATE ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./models/book.model.ts

// import { Pool, ResultSetHeader } from "mysql2/promise";

// import Book from "../interfaces/book.interface";

// export default class BookModel {
//   connection: Pool;

//   constructor(connection: Pool) {
//     this.connection = connection;
//   }

//   async getAll(): Promise<Book[]> {
//     const result = await this.connection.execute('SELECT * FROM books');
//     const [rows] = result;
//     return rows as Book[];
//   }

//   async getById(id: number): Promise<Book> {
//     const result = await this.connection.execute('SELECT * FROM books WHERE id=?', [id]);
//     const [rows] = result;
//     const [book] = rows as Book[];
//     return book;
//   }

//   async create(book: Book): Promise<Book> {
//     const { title, price, author, isbn } = book;
//     const result = await this.connection.execute<ResultSetHeader>(
//       'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
//       [title, price, author, isbn]
//     );
//     const [dataInserted] = result;
//     const { insertId } = dataInserted;
//     return { id: insertId, ...book };
//   }

async update(id: number, book: Book) {
  const { title, price, author, isbn } = book;
  await this.connection.execute(
    'UPDATE books SET title=?, price=?, author=?, isbn=? WHERE id=?',
    [title, price, author, isbn, id],
  );
}
// }
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./services/books.service.ts

// import connection from '../models/connection';
// import BookModel from '../models/book.model';
// import Book from '../interfaces/book.interface';
import { BadRequestError, NotFoundError } from 'restify-errors';

// class BookService {
// ...

  async update(id: number, book: Book): Promise<void> {
    // vamos utilizar a mesma validação do método create
    const isValidBook = this.validationBook(book);
    if (typeof isValidBook === 'string') {
      throw new BadRequestError(isValidBook);
    }

    const bookFound = await this.model.getById(id);

    if (!bookFound) {
      throw new NotFoundError('Book not found!');
    }

    return this.model.update(id, book);
  }
// }
//
// export default BookService;
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./controllers/books.controller.ts

// import { Request, Response } from 'express';
// import statusCodes from '../statusCodes';
// import BookService from '../services/books.service';

// class BooksController {
   // bookService: BookService;

   constructor(bookService = new BookService()) {
    // this.bookService = bookService;
      // this.getAll = this.getAll.bind(this);
      // this.getById = this.getById.bind(this);
      // this.create = this.create.bind(this);
      this.update = this.update.bind(this);
    }
  
  //   ...
  
    async update(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      const book = req.body;
      await this.bookService.update(id, book);
  
      res.status(statusCodes.NO_CONTENT).end();
    }
  // }
  //
  // export default BooksController;
~~~~~~~~~~~~~~~~~~~~~~~~~
// routes/books.routes.ts

// import { Router } from 'express';
// import BooksController from '../controllers/books.controller';

// const router = Router();

// const booksController = new BooksController();

// router.get('/books', booksController.getAll);
// router.get('/books/:id', booksController.getById);
// router.post('/books/', booksController.create);
router.put('/books/:id', booksController.update);

// alternativa ao uso do bind
// router.get('/books', (req, res) => booksController.getAll(req, res));
// router.get('/books/:id', (req, res) => booksController.getById(req, res));
// router.post('/books', (req, res) => booksController.create(req, res));
// router.put('/books/:id', (req, res) => booksController.update(req, res));

// export default router;
~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== REMOVE ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~
// ./models/book.model.ts

// import { Pool, ResultSetHeader } from 'mysql2/promise';
// import Book from '../interfaces/book.interface';

// export default class BookModel {
//   ...

async remove(id: number) {
  await this.connection.execute(
    'DELETE FROM books WHERE id=?',
    [id],
  );
}
// }
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./services/books.service.ts

// import connection from '../models/connection';
// import BookModel from '../models/book.model';
// import Book from '../interfaces/book.interface';
// import { BadRequestError, NotFoundError } from 'restify-errors';

// class BookService {
//   model: BookModel;
//
//     ...

async remove(id: number): Promise<void> {
  const bookFound = await this.model.getById(id);
  if (!bookFound) {
    throw new NotFoundError('Book not found!');
  }

  this.model.remove(id);
}
// }
//
// export default BookService;
~~~~~~~~~~~~~~~~~~~~~~~~~
// ./controllers/books.controller.ts

// import { Request, Response } from 'express';
// import statusCodes from '../statusCodes';
// import BookService from '../services/books.service';

// class BooksController {
   // bookService: BookService;

   constructor(bookService = new BookService()) {
    // this.bookService = bookService;
      // this.getAll = this.getAll.bind(this);
      // this.getById = this.getById.bind(this);
      // this.create = this.create.bind(this);
      // this.update = this.update.bind(this);
      this.remove = this.remove.bind(this);
    }
  
  //   ...
  
    async remove(req: Request, res: Response): Promise<void> {
      const id = Number(req.params.id);
      await this.bookService.remove(id);
  
      res.status(statusCodes.NO_CONTENT).end();
    }
  // }
  
  // export default BooksController;
~~~~~~~~~~~~~~~~~~~~~~~~~
  // routes/books.routes.ts

// import { Router } from 'express';
// import BooksController from '../controllers/books.controller';

// const router = Router();

// const booksController = new BooksController();

router
.route('/books')
.get(booksController.getAll)
.post(booksController.create);

router
.route('/books/:id')
.get(booksController.getById)
.put(booksController.update)
.delete(booksController.remove);

// Alternativa ao uso do bind
// router
//   .route('/books')
//   .get((req, res) => booksController.getAll(req, res))
//   .post((req, res) => booksController.create (req, res));

// router
//   .route('/books/:id')
//   .get((req, res) => booksController.getById(req, res))
//   .put((req, res) => booksController.update(req, res))
//   .delete((req, res) => booksController.remove(req, res));

// export default router;