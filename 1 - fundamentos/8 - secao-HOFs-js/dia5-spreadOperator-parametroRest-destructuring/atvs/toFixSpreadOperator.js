// SPREAD OPERATOR
// SALADA DE FRUTAS

// Faça uma lista com as suas frutas favoritas
const specialFruit = ['BANANA', 'MAÇÃ', 'MAMÃO', 'PÊRA'];

// Faça uma lista de complementos que você gostaria de adicionar
const additionalItens = ['LEITE CONDENSADO', 'PAÇOCA', 'LEITE NINHO'];

const fruitSalad = (fruit, additional) => {
  return [...specialFruit, ...additionalItens];
};

console.log(fruitSalad(specialFruit, additionalItens));