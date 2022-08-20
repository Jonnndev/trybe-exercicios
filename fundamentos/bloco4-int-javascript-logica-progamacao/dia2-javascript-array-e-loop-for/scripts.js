let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
// 1 - Nesse primeiro exercício, percorra o array imprimindo todos os valores nele contidos com a função console.log();
let n = -1;
console.log('Exercicio 1');

for (let index = 0; index < numbers.length; index += 1) {
  n += 1;
  console.log('Posição ' + n + ' - ' + numbers[index]);
}

// 2 - Para o segundo exercício, some todos os valores contidos no array e imprima o resultado;
let soma = 0;
console.log('Exercicio 2');

for (let index = 0; index < numbers.length; index += 1) {
  soma += numbers[index];
}
console.log(soma);

// 3 - Para o terceiro exercício, calcule e imprima a média aritmética dos valores contidos no array;
// A média aritmética é o resultado da soma de todos os elementos divido pelo número total de elementos.
let sum = 0;
let mediaArit;

console.log('Exercicio 3');

for (let index = 0; index < numbers.length; index += 1) {
  sum += numbers[index];
}
mediaArit = sum / ((numbers.length) - 1);
console.log(Math.floor(mediaArit));

// 4 - Com o mesmo código do exercício anterior, caso o valor final seja maior que 20, imprima a mensagem: "valor maior que 20". Caso não seja, imprima a mensagem: "valor menor ou igual a 20";
console.log('Exercicio 4');

if (mediaArit > 20) {
  console.log('valor maior que 20');
}
else {
  console.log('valor menor ou igual a 20');
}

// 5 - Utilizando for, descubra qual o maior valor contido no array e imprima-o;
console.log('Exercicio 5');

let maior = 0;
for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] > maior) {
    maior = numbers[index];
  }
}
console.log(maior);

// 6 - Descubra quantos valores ímpares existem no array e imprima o resultado. Caso não exista nenhum, imprima a mensagem: "nenhum valor ímpar encontrado";
console.log('Exercicio 6');

let impar = 0;

for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] % 2 !== 0) {
    impar = impar + 1;
  }
}
console.log(impar);
if (impar === 0) {
  console.log('Nenhum valor ímpar encontrado!');
}

// 7 - Utilizando for, descubra qual o menor valor contido no array e imprima-o;
console.log('Exercicio 7');

let menor = numbers[0];

for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] < menor) {
    menor = numbers[index];
  }
}
console.log(menor);

// 8 - Utilizando for, crie um array que vá de 1 até 25 e imprima o resultado;
console.log('Exercicio 8');

let newArray = [];
let first = 0;
for (let index = 0; index < 25; index += 1){
  newArray.push(first += 1);
}
console.log(newArray);


// 9 - Utilizando o array criado no exercício anterior imprima o resultado da divisão de cada um dos elementos por 2.
console.log('Exercicio 9');

let results = 0;
let item = 0;
for (let index = 0; index < newArray.length; index += 1){
  console.log(newArray[index] + ' / por 2 = ' + newArray[index] / 2);
}