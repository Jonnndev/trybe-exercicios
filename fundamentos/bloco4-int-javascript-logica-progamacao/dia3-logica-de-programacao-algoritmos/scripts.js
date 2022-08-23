// 1- O fatorial é a multiplicação de um número natural pelos seus antecessores, exceto o zero. Por exemplo:

// O fatorial é representado pelo sinal !
// // ! = 4 x 3 x 2 x 1 = 24
// Com base nessas informações, crie um algoritmo que retorne o fatorial de 10.
// let n = a * (a - 1) * (a - 2) * (a - 3) * (a - 4) * (a - 5) * (a - 6) * (a - 7) * (a - 8) * (a - 9);
console.log('EXERCÍCIO 1');

let a = 10;
let f = a;

for (let i = 1; i < a; i += 1) {
  f = f * i;
}
console.log(f);

// 2- Agora, desenvolva um algoritmo que é capaz de inverter uma palavra. Por exemplo, a palavra "banana" seria invertida para "ananab". Utilize a string abaixo como exemplo, depois troque por outras para verificar se seu algoritmo está funcionando corretamente.
console.log('EXERCÍCIO 2');

// >>>> lenght em uma string é reconhece a letra em particular, permitindo o manejo da mesma.
let word = 'tryber';
let invert = '';

for (let i = word.length - 1; i >= 0; i -= 1) {
  invert += word[i];
}
console.log(invert);

// 3- Considere o array de strings abaixo:

let array = ['java', 'javascript', 'python', 'html', 'css'];

// Escreva dois algoritmos: um que retorne a maior palavra deste array e outro que retorne a menor. Considere o número de caracteres de cada palavra.
console.log('EXERCÍCIO 3');

// MAIOR ITEM
let maior;

for (let i = 1; i < array.length; i += 1) {
  for (let i2 = 0; i2 < array.length; i2 += 1) {
    if (array[i].length > array[i2].length) {
      let position = array[i];
      array[i] = array[i2];
      array[i2] = position;
    }
  }
}
maior = array[0];
console.log('Nova formação = ', array[0], array[1], array[2], array[3], array[4]);

console.log('Maior = ', maior);

// MENOR ITEM
let menor;

for (let i = 1; i < array.length; i += 1) {
  for (let i2 = 0; i2 < array.length; i2 += 1) {
    if (array[i].length < array[i2].length) {
      let position = array[i];
      array[i] = array[i2];
      array[i2] = position;
    }
  }
}
menor = array[0];
console.log('Nova formação = ', array[0], array[1], array[2], array[3], array[4]);

console.log('Menor = ', menor);

// >>>> FORMA MAIS RESUMIDA DE RESOLVER <<<<

// let array = ['java', 'javascript', 'python', 'html', 'css'];

// let menor = array[0];

// let maior = array[0];

// for (let index = 0; index < array.length; index += 1) {
//     if (array[index].length < menor.length) {
//         menor = array[index];
//     }
//     if (array[index].length > maior.length) {
//         maior = array[index];
//     }
// }

// console.log(menor, maior);

// 4- Um número primo é um número inteiro maior do que 1 que possui somente dois divisores, ou seja, é divisível por 1 e por ele mesmo. Sabendo disso, escreva um algoritmo que retorne o maior número primo entre 2 e 50.
console.log('EXERCÍCIO 4');

let n = 2;
let maiorPrimo;
let sum = 0;

for (let i = 2; i <= 50; i += 1) {
  if (n === 2 || n === 3 || n === 5 || n === 7) {
    maiorPrimo = n;
    sum += 1;
  }

  else if (n % 2 !== 0 && n % 3 !== 0 && n % 5 !== 0 && n % 7 !== 0) {
    maiorPrimo = n;
    sum += 1;

  }
  n += 1;
}

console.log('Existem ', sum, ' números primos entre 2 e 50.');
console.log(maiorPrimo, ' é o maior primo!');

// >>>>>> BONUS <<<<<<

// // 1- Agora vamos trabalhar com algumas formas geométricas! Faça um programa que, dado um valor n qualquer, seja n > 1, imprima na tela um quadrado feito de asteriscos de lado de tamanho n. Por exemplo:
console.log('BONUS 1');

// Exemplo:
// n = 5

// *****
// *****
// *****
// *****
// *****

let q = 5;
let r = '';

for (let linha = 1; linha <= q; linha += 1) {
  for (let coluna = 1; coluna <= q; coluna += 1) {
    r += '*';
  }
  console.log(r);
  r = '';
}

// 2- Para o segundo exercício, faça o mesmo que antes, mas que imprima um triângulo retângulo com 5 asteriscos de base. Por exemplo:
console.log('BONUS 2');

// Exemplo:
// n = 5

// *
// **
// ***
// ****
// *****

let s = 5;
let t = '';

for (let linha = 1; linha <= s; linha += 1) {
  t += '*';
  console.log(t);
}

// 3- Agora inverta o lado do triângulo. Por exemplo:
console.log('BONUS 3');

// n = 5

//     *
//    **
//   ***
//  ****
// *****
// Atenção! Note que esse exercício é bem mais complexo que o anterior! Não basta, aqui, imprimir somente asteriscos. Você precisará de uma lógica para imprimir espaços também.

let u = 5;
let v = '';
let x = ' ';

