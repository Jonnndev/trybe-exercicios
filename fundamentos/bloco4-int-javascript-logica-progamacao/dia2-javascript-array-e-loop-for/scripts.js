let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
// ATIVIDADE 1
let n = -1;
console.log('Exercicio 1');

for (let index = 0; index < numbers.length; index += 1) {
  n += 1;
  console.log('Posição ' + n + ' - ' + numbers[index]);
}

// ATIVIDADE 2
let soma = 0;
console.log('Exercicio 2');

for (let index = 0; index < numbers.length; index += 1) {
  soma += numbers[index];
}
console.log(soma);

// ATIVIDADE 3
// A média aritmética é o resultado da soma de todos os elementos divido pelo número total de elementos.
let sum = 0;
let mediaArit;

console.log('Exercicio 3');

for (let index = 0; index < numbers.length; index += 1) {
  sum += numbers[index];
}
mediaArit = sum / ((numbers.length) - 1);
console.log(Math.floor(mediaArit));

// ATIVIDADE 4
console.log('Exercicio 4');

if (mediaArit > 20) {
  console.log('valor maior que 20');
}
else {
  console.log('valor menor ou igual a 20');
}

// ATIVIDADE 5
console.log('Exercicio 5');

let maior = 0;
for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] > maior) {
    maior = numbers[index];
  }
}
console.log(maior);

// ATIVIDADE 6
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

// ATIVIDADE 7
console.log('Exercicio 7');

let menor = numbers[0];

for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] < menor) {
    menor = numbers[index];
  }
}
console.log(menor);

// ATIVIDADE 8
console.log('Exercicio 8');

let newArray = [];
let first = 0;
for (let index = 0; index < 25; index += 1) {
  newArray.push(first += 1);
}
console.log(newArray);


// ATIVIDADE 9
console.log('Exercicio 9');

let results = 0;
let item = 0;
for (let index = 0; index < newArray.length; index += 1) {
  console.log(newArray[index] + ' / por 2 = ' + newArray[index] / 2);
}

// >>>>>>   BONUS <<<<<<
// BONUS 1

let numbers2 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
// 1 - Ordene o array numbers2 em ordem crescente e imprima seus valores;
console.log('Exercicio Bonus - 1');

for (let i = 1; i < numbers2.length; i += 1) {
  for (let j = 0; j < i; j += 1) {
    if (numbers2[i] < numbers2[j]) {
      let position = numbers2[i];
      numbers2[i] = numbers2[j];
      numbers2[j] = position;
    }
  }
}
console.log(numbers2);

// BONUS 2
let numbers3 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
console.log('Exercicio Bonus - 2');

for (let i = numbers3.length - 2; i >= 0; i -= 1) {
  for (let j = numbers3.length - 1; j >= i; j -= 1) {
    if (numbers3[i] < numbers3[j]) {
      let position = numbers3[i];
      numbers3[i] = numbers3[j];
      numbers3[j] = position;
    }
  }
}
console.log(numbers3);

// BONUS 3

// [45, 27, 57, 1330, 560, 800, 200, 70, 945, 54]

let numbers4 = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
console.log('Exercicio Bonus - 3');

let newArray2 = [];

for (let i = 0; i < numbers2.length; i += 1) {
  newArray2.push(numbers4[i] * numbers4[i + 1]);
  if (numbers4[i] === numbers4.length - 1) {
    newArray2.push(numbers4[numbers4.length - 1] * 2);
  }

}
console.log(newArray2);
