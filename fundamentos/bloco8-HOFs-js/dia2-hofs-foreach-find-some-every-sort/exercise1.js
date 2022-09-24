// EXERCICIO 1 

const books = [
  {
    id: 1,
    name: 'As Crônicas de Gelo e Fogo',
    genre: 'Fantasia',
    author: {
      name: 'George R. R. Martin',
      birthYear: 1948,
    },
    releaseYear: 1991,
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: {
      name: 'J. R. R. Tolkien',
      birthYear: 1892,
    },
    releaseYear: 1954,
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: {
      name: 'Isaac Asimov',
      birthYear: 1920,
    },
    releaseYear: 1951,
  },
  {
    id: 4,
    name: 'Duna',
    genre: 'Ficção Científica',
    author: {
      name: 'Frank Herbert',
      birthYear: 1920,
    },
    releaseYear: 1965,
  },
  {
    id: 5,
    name: 'A Coisa',
    genre: 'Terror',
    author: {
      name: 'Stephen King',
      birthYear: 1947,
    },
    releaseYear: 1986,
  },
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror',
    author: {
      name: 'H. P. Lovecraft',
      birthYear: 1890,
    },
    releaseYear: 1928,
  },
];

// Encontre o nome da primeira pessoa autora do livro nascida no ano de 1947.

const authorBornIn1947 = (array) => {
  let object = array.find((element) => element.author.birthYear === 1947);
  return object.author.name;
}

// console.log(authorBornIn1947(books));

// EXERCICIO 2
// Retorne o nome do livro de menor nome.

const smallerName = (array) => {
  let nameBook = array[0].name;
  array.forEach((element) => element.name.length < nameBook.length ? nameBook = element.name : null);
  return nameBook;
}

// console.log(smallerName(books));

// EXERCICIO 3
// Encontre o primeiro livro cujo nome possui 26 caracteres.

// const expectedResult = {
//   id: 1,
//   name: 'As Crônicas de Gelo e Fogo',
//   genre: 'Fantasia',
//   author: {
//         name: 'George R. R. Martin',
//     birthYear: 1948,
//   },
//     releaseYear: 1991,
// };

const getNamedBook = (array) => array.find((element) => element.name.length === 26);
// console.log(getNamedBook(books));

// EXERCICIO 4
// Ordene os livros por data de lançamento em ordem decrescente.

// const expectedResult = [
//   {
//     id: 1,
//     name: 'As Crônicas de Gelo e Fogo',
//     genre: 'Fantasia',
//     author: { name: 'George R. R. Martin', birthYear: 1948 },
//     releaseYear: 1991,
//   },
//   {
//     id: 5,
//     name: 'A Coisa',
//     genre: 'Terror',
//     author: { name: 'Stephen King', birthYear: 1947 },
//     releaseYear: 1986,
//   },
//   {
//     id: 4,
//     name: 'Duna',
//     genre: 'Ficção Científica',
//     author: { name: 'Frank Herbert', birthYear: 1920 },
//     releaseYear: 1965,
//   },
//   {
//     id: 2,
//     name: 'O Senhor dos Anéis',
//     genre: 'Fantasia',
//     author: { name: 'J. R. R. Tolkien', birthYear: 1892 },
//     releaseYear: 1954,
//   },
//   {
//     id: 3,
//     name: 'Fundação',
//     genre: 'Ficção Científica',
//     author: { name: 'Isaac Asimov', birthYear: 1920 },
//     releaseYear: 1951,
//   },
//   {
//     id: 6,
//     name: 'O Chamado de Cthulhu',
//     genre: 'Terror',
//     author: { name: 'H. P. Lovecraft', birthYear: 1890 },
//     releaseYear: 1928,
//   },
// ];

const booksOrderedByReleaseYearDesc = (array) => {
  return array.sort((a, b) => b.releaseYear - a.releaseYear);
}

// console.log(booksOrderedByReleaseYearDesc(books));

// EXERCICIO 5
// Faça uma função que retorne true, se todas as pessoas autoras nasceram no século XX, ou false, caso contrário.

// const expectedResult = false;

const everyoneWasBornOnSecXX = (array) => array.every((object) => object.author.birthYear > 1900);

// console.log(everyoneWasBornOnSecXX(books));

// EXERCICIO 6
// Faça uma função que retorne true, se algum livro foi lançado na década de 80, e false, caso contrário.

// const expectedResult = true;

const someBookWasReleaseOnThe80s = (array) => array.some((object) => object.releaseYear > 1979 && object.releaseYear < 1990);

// console.log(someBookWasReleaseOnThe80s(books));

// EXERCICIO 7
// Faça uma função que retorne true, caso nenhum author tenha nascido no mesmo ano, e false, caso contrário.

// const expectedResult = false;

const authorUnique = (array) => {
  let birthYears = [];
  let count = 0;
  array.forEach((element) => birthYears.push(element.author.birthYear));
  birthYears.sort((a, b) => a - b === 0 ? count += 1 : null);
  return count !== 0 ? false : true;
}

console.log(authorUnique(books));
