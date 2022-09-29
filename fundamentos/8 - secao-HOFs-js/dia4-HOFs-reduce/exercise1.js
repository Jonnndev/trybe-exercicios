// EXERCICIO I
// Utilize o reduce para transformar uma matriz em um array.

const arrays = [
  ['1', '2', '3'],
  [true],
  [4, 5, 6],
];

const concatArrays = (acc, cur) => acc.concat(cur);
const flatten = (array) => array.reduce(concatArrays, []);
console.log(flatten(arrays));