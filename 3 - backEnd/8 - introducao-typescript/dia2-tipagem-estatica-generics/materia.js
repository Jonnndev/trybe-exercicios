==================================== TIPAGEM ESTÁTICA E GENERICS ====================================

TIPOS DE COLEÇÃO:

  a - Arrays: são conjuntos de valores de mesmo tipo. Para declará-los, você pode adicionar o tipo
      esperado do array com a sintaxe -> let arrayName: type[] = [...];

      ~~~~~~~~~~~~~~~
      let names: string[] = ["Mary Joe", "Alan Joe"];
      ~~~~~~~~~~~~~~~

  b - Tuplas: permitem declarar um conjunto de valores cuja ordem e tipo dos valores são fixas.
      Em JavaScript, elas são representadas como arrays, mas são estruturas diferentes. Por exemplo,
      você pode querer representar um valor como um par de uma string e um número.

      Para declarar uma tupla, use a sintaxe let variableName: [type, type, ...]:

      ~~~~~~~~~~~~~~~
      let fullName: [string, string] = ["Jane", "Doe"];
      let person: [string, number] = ["Jane Doe", 35];
      let car: [string, string, number] = ["Ford", "F400", 10];
      ~~~~~~~~~~~~~~~

==================================== TYPE ALIASES E TYPE UNIOS ====================================

TYPE ALIASES:

Type Aliases (apelidos de tipos) são utilizados para declarar a forma de um objeto nomeando o tipo,
o que nos permite usar o mesmo tipo mais de uma vez e nos referir a ele através de um único nome.
Um Type alias é exatamente isso: um nome para qualquer tipo.

~~~~~~~~~~~~~~~
type Point = { // --> Alias 'Point'
  x: number;
  y: number;
};

function printCoord(pt: Point) { 
  console.log("O valor da coordenada x é: " + pt.x);
  console.log("O valor da coordenada y é: " + pt.y);
}

printCoord({ x: 100, y: 100 });
//saída:
//O valor da coordenada x é: 100
//O valor da coordenada y é: 100
~~~~~~~~~~~~~~~

TYPE UNIONS:

Type Unions (união de tipos) é uma forma de declarar que um objeto é um tipo formado a partir de
dois ou mais outros tipos, representando valores que podem ser qualquer um desses tipos. Para
isso, é preciso declarar os tipos esperados separados por barra vertical (|) conhecido em inglês
como pipe.

~~~~~~~~~~~~~~~
// A função abaixo pode receber tanto um número
// quanto uma string.
function imprimirCPF(cpf: number | string){
  console.log("Seu CPF é: " + cpf);
}

imprimirCPF(11111111111);
// Saída:
// Seu CPF é: 11111111111
imprimirCPF('111.111.111-11');
// Saída:
// Seu CPF é: 111.111.111-11
~~~~~~~~~~~~~~~

==================================== CLASSES ====================================

No TypeScript, as classes são uma maneira de definir a forma de um objeto. Podemos
considerar uma classe como um projeto para a criação de objetos. Uma classe Person
descreve os atributos de uma pessoa, por exemplo: nome, data de nascimento e idade.
Ela também descreve ações que uma pessoa pode executar, como falar, comer ou andar.

(!) Você deve criar uma instância de pessoa da classe Person antes que ela se torne
    um objeto ao qual você possa atribuir valores de propriedade.

~~~~~~~~~~~~~~~
// usamos a palavra reservada class para definir uma classe
class Person {
  name: string;
  birthDate: Date; // o tipo Date está presente no TypeScript assim como no JavaScript
  age: number;
  // aprenderemos mais sobre o construtor na próxima seção
  // considere-o como uma função utilizada para construir um objeto a partir da classe,
  // nele recebemos todos os dados necessários para construir um objeto de pessoa
  constructor(name: string, birthDate: Date, age: number;) {
      // usamos o this para acessar as propriedades da instância da classe,
      // ele representa a própria instância que estamos criando
      // atribuímos o valor do parâmetro recebido a propriedade da instância da classe
      this.name  = name;
      this.birthDate  = birthDate;
      this.age  = age;
  }

  speak(): void {
      console.log(`${this.name} está falando.`);
  }

  eat(): void {
      console.log(`${this.name} está comendo.`)
  }

  walk(): void {
      console.log(`${this.name} está andando.`)
  }
}
~~~~~~~~~~~~~~~

A classe Person pode ser reutilizada para criar qualquer quantidade de novos objetos
Person, cada um com suas próprias características.

~~~~~~~~~~~~~~~
// usamos a palavra reservada new para criar uma instância de Person
// e passamos os parâmetros necessários para o construtor
const person1 = new Person("Jane Doe", new Date("1986-01-01"), 37);
const person2 = new Person("Jon Doe", new Date("1980-08-05"), 43);

console.log(person1);
person1.speak()

// saída:
// Person: {
//   "name": "Jane Doe",
//   "birthDate": "1986-01-01T00:00:00.000Z",
//   "age": 37
// }
// "Jane Doe está falando."

console.log(person2);
person2.walk();

// saída:
// Person: {
//   "name": "Jon Doe",
//   "birthDate": "1980-08-05T00:00:00.000Z",
//   "age": 43
// }
// "Jon Doe está andando."
~~~~~~~~~~~~~~~

Também é possível dizer que uma das propriedades da nossa classe Person não é
obrigatória para criarmos um objeto pessoa. Podemos usar o caractere ? para
marcar uma propriedade como opcional, o que faz com seu tipo seja um union
type entre o tipo original e undefined. Se quiséssemos dizer que a idade não
é obrigatória nossa classe ficaria assim:

~~~~~~~~~~~~~~~
class Person {
  name: string;
  birthDate: Date;
  age?: number; // OPCIONAL por causa do '?'

  constructor(name: string, birthDate: Date, age?: number) {
      this.name  = name;
      this.birthDate  = birthDate;
      this.age  = age;
  }

  speak(): void {
      console.log(`${this.name} está falando.`);
  }

  eat(): void {
      console.log(`${this.name} está comendo.`)
  }

  walk(): void {
      console.log(`${this.name} está andando.`)
  }
}
~~~~~~~~~~~~~~~

Com isso, a criação das nossas instâncias de Person poderiam ou não serem criadas com a idade.

~~~~~~~~~~~~~~~
const person1 = new Person("Jane Doe", new Date("1986-01-01"));
const person2 = new Person("Jon Doe", new Date("1980-08-05"), 43);

console.log(person1);
person1.speak()

// saída:
// Person: {
//   "name": "Jane Doe",
//   "birthDate": "1986-01-01T00:00:00.000Z"
// }
// "Jane Doe está falando."

console.log(person2);
person2.walk();

// saída:
// Person: {
//   "name": "Jon Doe",
//   "birthDate": "1980-08-05T00:00:00.000Z",
//   "age": 43
// }
// "Jon Doe está andando."
~~~~~~~~~~~~~~~

Poderíamos ainda adicionar essa informação depois da criação:

~~~~~~~~~~~~~~~
const person1 = new Person("Jane Doe", new Date("1986-01-01"));

console.log(person1);
person1.speak()

// saída:
// Person: {
//   "name": "Jane Doe",
//   "birthDate": "1986-01-01T00:00:00.000Z"
// }
// "Jane Doe está falando."

person1.age = 37;
console.log(person1);

// saída:
// Person: {
//   "name": "Jane Doe",
//   "birthDate": "1986-01-01T00:00:00.000Z",
//   "age": 37
// }
~~~~~~~~~~~~~~~

==================================== INTERFACES ====================================

É mais uma estrutura que não existe no JavaScript. A Interface é utilizada para
declarar a forma de um objeto, nomear e parametrizar os tipos do objeto e compor
tipos de objetos nomeados existentes em novos. São uma forma eficiente de definir
um “contrato de código”, ou seja, aquilo que você espera que seja implementado
dentro do seu código.

~~~~~~~~~~~~~~~
interface Employee {
  firstName: string;
  lastName: string;
  fullName(): string;
}
~~~~~~~~~~~~~~~

Uma Interface não inicializa nem implementa as propriedades declaradas dentro dela,
porque o único trabalho de uma Interface é descrever o objeto. Ela define o que o
contrato de código exige, enquanto quem implementa a Interface deve atender ao contrato
fornecendo os detalhes de implementação necessários.

~~~~~~~~~~~~~~~
let employee: Employee = {
  firstName : "John",
  lastName: "Doe",
  fullName(): string {
      return this.firstName + " " + this.lastName; // usamos o "this" para acessar as propriedades da interface
  }
}

employee.firstName = 10;  // Error: Type "number" is not assignable to type "string"
~~~~~~~~~~~~~~~

Uma Interface também pode estender de uma outra, o que permite que copiemos as propriedades
de uma Interface em outra, proporcionando mais flexibilidade na maneira de separa-las em
componentes reutilizáveis. Podemos estender uma interface, usando a palavra reservada extends:

~~~~~~~~~~~~~~~
interface Teacher extends Employee {
  subject: string;
  sayHello(): string;
}
~~~~~~~~~~~~~~~

E para criar um objeto do tipo Teacher seria assim:

~~~~~~~~~~~~~~~
let teacher: Teacher = {
  firstName: "John",
  lastName: "Doe",
  subject: "Matemática",
  fullName(): string {
      return this.firstName + " " + this.lastName;
  },
  sayHello(): string {
      return `Olá, eu sou ${this.fullName()} e leciono ${this.subject}`;
  }
}
~~~~~~~~~~~~~~~

(!) Observe que um objeto que atende à Interface Teacher precisa definir valores para todas
as propriedades exigidas por essa Interface, incluindo as propriedades da Interface base Employee.

(!) Classes também podem implementar interfaces, o que faz com que a classe possua todas as
propriedades e métodos daquela interface.

==================================== TYPE ASSERTION ====================================

TYPE ASSERTION:

Há momentos em que precisamos utilizar recursos nativos do JavaScript, ou até mesmo bibliotecas externas,
que podem não oferecer opções para realizarmos uma tipagem eficiente para obtermos o tipo correto para
uma variável ou objeto. Quando nos deparamos com cenários assim, a melhor alternativa é buscar entender
a estrutura que a variável ou objeto terá em momento de execução (runtime) para então forçar um tipo
específico utilizando o Type Assertions do TypeScript.

A seguir temos uma função que converte string para json. Por ser muito genérica, a tipagem que a função
retorna é desconhecida (unknown), mas observando o código dá para notar na string a ser convertida qual
estrutura será retornada depois que a função for executada. Sendo assim, podemos forçar um tipo específico
para aquele objeto e continuar aproveitando os recursos do TypeScript:

~~~~~~~~~~~~~~~
type Address = {
  street: string,
  number: number | null,
}

type User = {
  name: string,
  email: string,
  password: string,
}

// função que converte de string para json
function stringToJson(str: string): unknown {
  const result = JSON.parse(str);
  return result;
}

// utilizando o "as" para converter de unknown para User
const user = stringToJson('{"name":"André Soares","email":"andre@trybe.com","password":"senha_secreta"}') as User

// Outra forma de usar o Assertion. A sintaxe é diferente mas tem o mesmo objetivo
// const address = <Address> stringToJson('{"street":"Rua Tamarindo","number":1}')

user.name;
address.street;
~~~~~~~~~~~~~~~
const str: unknown = 'texto'; // simulando um valor supostamente desconhecido

str.split(''); // Dispara um erro por aplicar um split em um tipo desconhecido
(str as string).split('') // Corrigindo o erro acima usando o 'as'

const num: string = '2';

num as number // dispara um erro, pois não é possível usar Type Assertions com tipos incompatíveis
(num as unknown) as number // Corrigindo o erro acima convertendo primeiramente para unknown
~~~~~~~~~~~~~~~

(!) Type Assertion é uma forma de você falar para o compilador “confia em mim, eu sei o que estou fazendo”.
Portanto, é um recurso que você só deve utilizar se realmente souber a estrutura de tipo esperada para uma
variável ou objeto.

(!) O ideal, na verdade, é que Type Assertion seja a sua segunda alternativa para conseguir atribuir tipos
específicos em valores incertos ou desconhecidos. A primeira alternativa para tentar tipar comportamentos
genéricos que você pode optar é utilizar os Generics que o próprio TypeScript oferece.

==================================== GENERICS ====================================

Generics é uma forma de passarmos, por meio de parâmetros, tipos para funções que se comportam de forma genérica.

~~~~~~~~~~~~~~~
/ [...]
function stringToJson<T>(str: string): T {
  const result = JSON.parse(str);
  return result;
}

const user = stringToJson<User>('{"name":"André Soares","email":"andre@trybe.com","password":"senha_secreta"}');

const address = stringToJson<Address>('{"street":"Rua Tamarindo","number":1}')

user.name;
address.street;
~~~~~~~~~~~~~~~

(!) Note que agora estamos recebendo um parâmetro genérico T na função destino e esperamos que seja retornado
    esse mesmo tipo. Na hora de utilizar a função basta somente informar o tipo que gostaríamos de obter.

(!) Optar pelo uso de Generics para casos como o do exemplo de código acima, acaba sendo mais vantajoso, pois
    se nosso código precisar passar por alterações o Generics consegue oferecer possibilidades mais organizadas
    para escalar a tipagem.

~~~~~~~~~~~~~~~
// [...]
function stringToJson<T, U>(str: string, id: U ): T & { id: U } {
  // const result = JSON.parse(str);
  result.id = id;
  // return result;
}

const user = stringToJson<User, number>('{"name":"André Soares","email":"andre@trybe.com","password":"senha_secreta"}',
Date.now());

const address = stringToJson<Address, string>('{"street":"Rua Tamarindo","number":1}', '#01')

user.id;
address.id;
~~~~~~~~~~~~~~~

Veja os pontos que alteramos acima:

1 - O envio de múltiplos tipos por parâmetro (T e o U);
2 - A possibilidade de usar o parâmetro genérico de maneira distribuída na função destino (tanto no parâmetro id: U
    como no retorno T & { id: U });
3 - A manipulação dos genéricos para modificar o tipo de retorno esperado (na interseção T & { id: U })

~~~~~~~~~~~~~~~
function identity<T, U> (value: T, message: U) : T {
  console.log(message);
  return value
}

const returnNumber = identity<number, string>(100, "Olá");
const returnString = identity<string, string>("100", "Mundo");
const returnBoolean = identity<boolean, string>(true, "Olá, Mundo!");
~~~~~~~~~~~~~~~
function getArray<T>(items : T[]) : T[] {
  return new Array<T>().concat(items); // construindo um Array que só pode conter elementos do tipo T
}

const numberArray = getArray<number>([5, 10, 15, 20]);
numberArray.push(25);
numberArray.push("This is not a number"); // Isto vai gerar um erro de compilação

const stringArray = getArray<string>(["Cats", "Dogs", "Birds"]);
stringArray.push("Rabbits");
stringArray.push(30); // Isto vai gerar um erro de compilação
~~~~~~~~~~~~~~~

==================================== MODEL COM MYSQL ====================================

Veja como a função connection.execute que usamos para executar queries usa o recurso de Generics.
Ao olhar para a sua definição podemos encontrar a seguinte assinatura:

~~~~~~~~~~~~~~~
execute<
    T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader
  >(
    sql: string,
    values: any | any[] | { [param: string]: any }
  ): Promise<[T, FieldPacket[]]>;
~~~~~~~~~~~~~~~

Vamos nos concentrar no generic utilizado na definição da função. O método execute pode receber
qualquer tipo que estenda uma das seguintes interfaces:

a - RowDataPacket[][]
b - RowDataPacket[]
c - OkPacket
d - OkPacket[]
e - ResultSetHeader

Perceba que se quisermos atribuir um tipo genérico T a algum resultado de consulta, esse T precisará
ser (ou herdar) algum dos 3 tipos esperados na assinatura do execute: RowDataPacket, OkPacket ou
ResultSetHeader.

~~~~~~~~~~~~~~~
// ./main.ts

import connection from './models/connection';

const main = async () => {
  const result = await connection.execute('SELECT * FROM books');
  const [rows] = result;
  console.log(rows);
};

main();
~~~~~~~~~~~~~~~

Note que mesmo sem especificar nenhuma tipagem, o TypeScript não reclama do código. Isso acontece,
pois para todos os tipos possíveis de retorno para connection.execute, por padrão, pode-se extrair
um elemento do array.

Agora, vamos ver o que aconteceria se você tentasse fazer uma query do tipo INSERT e extrair o insertId:

~~~~~~~~~~~~~~~
// ./execute.insert.ts

import readline from 'readline-sync';
import connection from './models/connection';

const main = async () => {
  const title = readline.question('Digite o nome do livro: ');
  const price = readline.questionFloat('Digite o preço do livro: ');
  const author = readline.question('Digite o autor do livro: ');
  const isbn = readline.question('Digite o isbn do livro: ');

  const [{ insertId }] = await connection.execute(
    'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
    [title, price, author, isbn]
  );
  console.log(insertId);
};

main();
~~~~~~~~~~~~~~~

Você vai perceber que seu código não pode ser compilado, pois o TypeScript não consegue identificar
a origem do atributo insertId. O erro encontrado será:

--> Property ‘insertId’ does not exist on type ‘RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader’.

(!) Porém na própria lib mysql2 temos uma Interface que possui esse atributo, que é ResultSetHeader.
    Ao passar essa Interface como generic para connection.execute, você vai perceber que a linha que extrai
    o atributo insertId passa a ser compilável.

~~~~~~~~~~~~~~~
// ./execute.insert.ts

// import readline from  'readline-sync';
import { ResultSetHeader } from 'mysql2';
// import connection  from './models/connection';

// const main = async () => {
//   const title = readline.question('Digite o nome do livro: ');
//   const price = readline.questionFloat('Digite o preço do livro: ');
//   const author = readline.question('Digite o autor do livro: ');
//   const isbn = readline.question('Digite o isbn do livro: ');

const [{ insertId }] = await connection.execute<ResultSetHeader>(
  'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
  [title, price, author, isbn]
); // essa linha não acusa mais erro de compilação.
//  console.log(insertId);
// }
//
// main();
~~~~~~~~~~~~~~~

==================================== IMPLEMENTANDO MODEL COMO UMA CLASSE ====================================

~~~~~~~~~~~~~~~
// ./models/Book.ts

import { Pool } from 'mysql2/promise';
import connection from './connection';

export default class BookModel {
  connection: Pool;

  constructor() {
    this.connection = connection;
  }

  async getAll() {
    const result = await this.connection.execute('SELECT * FROM books');
    const [rows] = result;
    return rows;
  }
}
~~~~~~~~~~~~~~~

Dessa forma, podemos usar esse modelo para ser nossa fonte de acesso aos dados. Vamos instanciar um objeto
dessa classe e chamá-lo no nosso arquivo main.ts.

~~~~~~~~~~~~~~~
// ./main.ts

import BookModel from './models/Book';

const main = async () => {
  const bookModel = new BookModel();

  const books = await bookModel.getAll();
  console.log(books);
};

main();
~~~~~~~~~~~~~~~

Apesar do código acima retornar resultados, não temos uma previsibilidade sobre o tipo desses dados. Para resolver
isso podemos tentar aplicar duas formas de tipagens que já aprendemos: Type Assertions e Generics. Ambas as formas
devem atender nosso objetivo que é mapear as propriedades do resultado que a query trará. Mas antes, vamos começar
definindo uma Interface que represente a entidade Book e que poderá ser utilizado em ambas alternativas de tipagem.

~~~~~~~~~~~~~~~
// ./models/Book.ts

// import { Pool } from 'mysql2/promise';
// import connection from './connection';

export interface Book {
  id?: number;
  title: string;
  price: number;
  author: string;
  isbn: string;
}

// export default class BookModel {
//   connection: Pool;

//   constructor(){
//     this.connection = connection;
//   }

//   async getAll() {
//     const result = await this.connection.execute('SELECT * FROM books');
//     const [rows] = result;
//     return rows;
//   }
// }
~~~~~~~~~~~~~~~

Agora que já temos a interface, vamos precisar dizer ao Typescript que a nossa variável rows conterá um array de
Books e para isso vamos usar Type Assertions. 

~~~~~~~~~~~~~~~
// ./models/Book.ts

// import { Pool } from 'mysql2/promise';
// import connection from './connection';

// export interface Book {
//   id?: number,
//   title: string,
//   price: number,
//   author: string,
//   isbn: string,
// }

export default class BookModel {
  //   connection: Pool;
  
  //   constructor(){
  //     this.connection = connection;
  //   }
  
    async getAll(): Promise<Book[]> {
      const result = await this.connection.execute('SELECT * FROM books');
      const [rows] = result;
      return rows as Book[];
    }
  }
~~~~~~~~~~~~~~~

Note que com essa estratégia conseguimos informar a qualquer função que utilizar o getAll que o resultado que
será obtido no retorno será um array com a estrutura da Interface Books.

--> Agora, como uma alternativa a Type Assertions, vamos tentar tipar utilizando o recurso Generics, e como foi
    comentado acima na parte da assinatura do método execute, para conseguir informar o tipo de retorno pelo parâmetro
    genérico é necessário enviar um tipo que herde pelo menos uma das três interfaces esperadas.

~~~~~~~~~~~~~~~
// ./models/Book.ts

import { Pool, RowDataPacket } from 'mysql2/promise';
// import connection from './connection';

// export interface Book {
//   id?: number,
//   title: string,
//   price: number,
//   author: string,
//   isbn: string,
// }

export default class BookModel {
  // connection: Pool;

  // constructor(){
  //   this.connection = connection;
  // }

  async getAll(): Promise<Book[]> {
    const [rows] = await this.connection.execute<(Book & RowDataPacket)[]>(
      'SELECT * FROM books');

    return rows;
  }
}
~~~~~~~~~~~~~~~

(!) Note que utilizando Generics nós conseguimos realizar a tipagem de maneira antecipada. Na mesma linha onde
    chamamos o execute já é possível saber todas as propriedades da variável rows. Já no Type Assertion, tivemos que
    desestruturar o array para conseguir atribuir o tipo. Mas vale reforçar que, para esse caso, ambas as alternativas
    são válidas pois atendem nosso objetivo.

--> MÉTODO CREATE:

~~~~~~~~~~~~~~~
// ./models/Book.ts

import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
// import connection from './connection';

// export interface Book {
//   id?: number,
//   title: string,
//   price: number,
//   author: string,
//   isbn: string,
// }

// export default class BookModel {

// connection: Pool;

// constructor(){
//   this.connection = connection;
// }

//   async getAll(): Promise<Book[]> {
//     const [rows] = await this.connection.execute<(Book & RowDataPacket)[]>('SELECT * FROM books');

//     return rows;
//   }

  async create(book: Book): Promise<Book> {
    const { title, price, author, isbn } = book;

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
        'INSERT INTO books (title, price, author, isbn) VALUES (?, ?, ?, ?)',
        [title, price, author, isbn],
    );

    return { id: insertId, ...book };
  }

// }
~~~~~~~~~~~~~~~

Perceba que recebemos um objeto do tipo Book como parâmetro e usamos essa informação para salvar os valores no banco.

Podemos usar o código abaixo para ler valores e cadastrar um livro através do método create do nosso modelo.

~~~~~~~~~~~~~~~
// ./main.ts

import readline from 'readline-sync';

import BookModel, { Book } from './models/Book';

const main = async () => {
  const bookModel = new BookModel();

  const title = readline.question('Digite o título do livro: ');
  const price = readline.questionFloat('Digite o preço do livro: ');
  const author = readline.question('Digite o autor do livro: ');
  const isbn = readline.question('Digite o isbn do livro: ');

  const newBook: Book = { title, price, author, isbn };

  const createdBook = await bookModel.create(newBook);
  console.log(createdBook);
};

main();
~~~~~~~~~~~~~~~

==================================== MODEL COM SEQUELIZE ====================================

(!) No arquivo .sequelizerc os caminhos de config e models-path apontam para pasta raiz build
    ao invés de src.
    Isso é necessário já que, como dito anteriormente, o CLI não deve conseguir interpretar
    esses recursos caso sejam em *.ts, sendo portanto necessária a transpilação desses recursos
    para JS Vanilla.

Crie um novo arquivo em ./src/database/config/database.ts (considerando que o build dele deve
respeitar o caminho configurado em .sequelizerc), ele será nosso novo arquivo de configuração:

~~~~~~~~~~~~~~~
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'books_api',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
};

export = config;
~~~~~~~~~~~~~~~

(!) Caso o objeto process acuse erro, inclua em sua aplicação o pacote @types/node como dependência
    de desenvolvimento. A exportação do módulo deve ser feita utilizando somente export ao invés de
    export default ou export const, para que a transpilação o transforme em module.exports. O que é
    reconhecido pelo sequelize-cli.

O tipo Options, importando da lib sequelize, deve assegurar que os atributos de configuração respeitarão
os padrões utilizados no momento da inicialização do Sequelize na API.

Até aqui, já temos como inicializar o banco de dados. Contudo, só é possível inicializá-lo após a
transpilação do arquivo de configuração.

Para facilitar esse processo, vamos criar um script db:reset em curto-circuito que fará três trabalhos,
consecutivamente:

1 - Executar o tsc para gerar a build (gerar o arquivo que precisamos em build/database/config/database.js);
2 - Executar o comando npx sequelize-cli db:drop (para deletar o banco, caso ele já esteja criado);
3 - Executar o comando npx sequelize-cli db:create (para criar o banco novamente).

~~~~~~~~~~~~~~~
//package.json

{
  // ...
  "scripts": {
    "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create"
  }
  // ...
}
~~~~~~~~~~~~~~~

Rode o comando env $(cat .env) npm run db:reset

==================================== INICIALIZANDO SEQUELIZE NA API E CRIANDO MODELOS ====================================

Agora crie um novo arquivo em ./src/database/models/index.ts. Antes, esse arquivo era gerado automaticamente e já fazia o
reconhecimento dos models gerados pelo sequelize-cli.

No nosso caso, esse arquivo servirá única e exclusivamente para gerar e exportar uma nova instância do Sequelize, baseada
na configuração anterior (já assegurada pela tipagem):

~~~~~~~~~~~~~~~
//index.ts

import { Sequelize } from 'sequelize';
import * as config from '../config/database';

export default new Sequelize(config);
~~~~~~~~~~~~~~~

EXEMPLOS DE MODELO:

~~~~~~~~~~~~~~~
// ./src/database/migrations/20211114192739-create-books.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      isbn: {
        type: Sequelize.STRING(100),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};
~~~~~~~~~~~~~~~
// ./src/database/seeders/20211116145440-books.js

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'books',
      [
        {
          title: 'Código Limpo',
          price: 125.9,
          author: 'Robert C Martin',
          isbn: '8576082675',
        },
        {
          title: 'Refatoração',
          price: 129.9,
          author: 'Martin Fowler',
          isbn: '8575227246',
        },
        {
          title: 'Padrões de Projetos',
          price: 141.98,
          author: 'Erich Gamma',
          isbn: '8573076100',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('books', null, {});
  },
};
~~~~~~~~~~~~~~~

Atualize o db:reset:

~~~~~~~~~~~~~~~
//package.json

{
  // ...
  "scripts": {
    "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
  }
  // ...
}
~~~~~~~~~~~~~~~

A execução do comando env $(cat .env) npm run db:reset deve restaurar e popular o banco.

Os modelos no Sequelize podem ser representados como classes que são a extensão (ou seja, que herdam atributos e métodos)
da classe Model da mesma biblioteca.
Para construirmos um modelo Sequelize em TypeScript devemos criar sua classe estendida, inicializá-la e depois exportá-la.

~~~~~~~~~~~~~~~
// ./src/database/models/BookModel.ts

import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Book extends Model { 
  declare id: number; // <<<<< 1
  declare title: string; // <<<<< 1
  declare price: number; // <<<<< 1
  declare author: string; // <<<<< 1
  declare isbn: string; // <<<<< 1
}

Book.init({ // <<<<< 2
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
  price: {
    type: DECIMAL(10,2),
    allowNull: false,
  },
  author: {
    type: STRING(100),
    allowNull: false,
  },
  isbn: {
    type: STRING(100),
  },
}, {
  sequelize: db, // <<<<< 3
  modelName: 'books', // <<<<< 3
  timestamps: false,
});

export default Book;
~~~~~~~~~~~~~~~

Aqui é importante notar três coisas:

1 - Como a classe Book estende a classe Model do sequelize, as únicas propriedades que precisamos declarar nela são os
seus atributos específicos. Entretanto, como eles são inicializados posteriormente por meio do método .init() da classe
Book, devemos afirmar que isso ocorrerá utilizando o prefixo declare (conforme a v6 do Sequelize). Além disso, este uso,
ao invés da asserção de atributo com o pós fixo !, garante que o TypeScript não emita essas propriedades desta classe
pública. 
  - Todas as demais, como por exemplo, os métodos findAll, create, etc, já serão herdados no modelo após sua inicialização.

2 - Diferentemente do sequelize-cli, que gera um modelo que usa a função sequelize.define dentro de uma constante para
definir os campos, aqui você só precisa inicializar o modelo com .init.
  - Esse método vai receber basicamente as mesmas configurações do método sequelize.define;

3 - Ainda nesse contexto, você precisará adicionar dois campos especiais nos opcionais da definição do modelo (na segunda chave):
  - sequelize, que deve receber a instância anterior (db) construída no index.ts;
  - modelName, que deve fazer referência ao nome da tabela.
~~~~~~~~~~~~~~~

EXEMPLOS DE ASSOCIATIONS:

Um livro pode receber diversos comentários. Assim podemos criar um relacionamento em que um livro possui vários comentários
(1:N). Criaremos os seguintes arquivos de migration e seed para os comentários:

~~~~~~~~~~~~~~~
// ./src/database/migrations/20221017171422-create-comments.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id',
        },
        field: 'book_id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('comments');
  },
};
~~~~~~~~~~~~~~~
// ./src/database/seeders/20221017221122-comments.js

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          text: 'Este é um livro para aprofundar os conhecimentos',
          author: 'Sheila',
          book_id: 1,
        },
        {
          text: 'Este livro me ajudou a adquirir mais experiência em desenvolvimento do código',
          author: 'Presto',
          book_id: 1,
        },
        {
          text: 'Aprendi a fujir dos perigos de um código mal implementado',
          author: 'Eric',
          book_id: 2,
        },
        {
          text: 'Pra quem precisa organizar seus códigos o livro fornece diagramas e explicações sobre os padrões de projeto.',
          author: 'Diana',
          book_id: 3,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('books', null, {});
  },
};
~~~~~~~~~~~~~~~

(!) Quando estamos trabalhando com relações 1:N entre duas models, como, por exemplo, a relação entre as entidades Book e
    Comment, onde um livro pode ter vários comentários e um comentário pertence apenas a um livro, as declarações de associações
    devem ficar em UMA das entidades da relação.

(!) Para isso, podemos utilizar o método hasMany() para indicar que um livro possui muitos comentários e belongsTo() para indicar
    que um comentário pertence a um livro. É importante utilizar o alias as para dar nomes mais descritivos às associações,
    facilitando a leitura e a compreensão do código.

~~~~~~~~~~~~~~~
// ./src/database/models/CommentModel.ts

import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

import Book from './BookModel'; // Nossa outra entidade

class Comment extends Model {
  declare id: number;
  declare text: string;
  declare author: string;
}

Comment.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: STRING(255),
    allowNull: false,
  },
  author: {
    type: STRING(100),
    allowNull: false,
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'comments',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Book.hasMany(Comment, { foreignKey: 'bookId', as: 'comments' });
Comment.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

export default Comment;
~~~~~~~~~~~~~~~
// ./src/testModel.ts

// import Book from './database/models/BookModel'
import Comment from './database/models/CommentModel';

// (async () => {

//   const books = await Book.findAll({ raw: true });
//   console.table(books);

const comments = await Comment.findAll({ raw: true });
console.table(comments);

const booksWithComments = await Book.findAll({ raw: true, include: ['comments'] });
console.table(booksWithComments);
// process.exit(0);

// })();
~~~~~~~~~~~~~~~