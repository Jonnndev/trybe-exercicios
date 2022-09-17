// EX1 - pt1

// Modifique a estrutura da função para que ela seja uma arrow function;
// Modifique as variáveis para que respeitem o escopo onde estão declaradas;
// Modifique as concatenações para template literals.

// function testingScope(escopo) {
//   if (escopo === true) {
//     var ifScope = 'Não devo ser utilizada fora do meu escopo (if)';
//     ifScope = ifScope + ' ótimo, fui utilizada no escopo !';
//     console.log(ifScope);
//   } else {
//     var elseScope = 'Não devo ser utilizada fora do meu escopo (else)';
//     console.log(elseScope);
//   }
//   console.log(ifScope + ' o que estou fazendo aqui ? :O'); // Se necessário esta linha pode ser removida.
// }

// testingScope(true);

// const testingScope = (escopo) => {
//   if (escopo === true) {
//     let ifScope = 'Não devo ser utilizada fora do meu escopo (if)';
//     ifScope = `${ifScope} ótimo, fui utilizada no escopo !`;
//     console.log(ifScope);
//   } else {
//     const elseScope = `Não devo ser utilizada fora do meu escopo (else)`;
//     console.log(elseScope);
//   }
// }

// testingScope(false);

// Crie uma função que retorne um array em ordem crescente.

// const oddsAndEvens = [13, 3, 4, 10, 7, 2];

// const sortOddsAndEvens = oddsAndEvens.sort(function (a,b) {
//   if (a > b) return 1;
//   if (b > a) return -1;
//   return 0;
// });

// console.log(oddsAndEvens);

// const sortOddsAndEvens = oddsAndEvens.sort((a, b) => a - b);

// console.log(`Os números ${oddsAndEvens} se encontram ordenados de forma crescente!`);

// EX1 - pt2
// Crie uma função que receba um número e retorne seu fatorial.
// const factorial = (n) => {
//   let result = n;
//   let firstMultiplier = result - 1;
//   for (let index = firstMultiplier; index > 1; index -= 1) {
//      result *= index;
//   }
//   return result;
// }
// console.log(`Esse é o fatorial ${factorial(5)}`);

// const factorial = (n) => (n == 1 || n == 0) ? 1 : n * factorial(n - 1);
// console.log(`Esse é o fatorial ${factorial(3)}`);

// EX2 - pt2
// Crie uma função que receba uma frase como parâmetro e retorne a maior palavra contida nesta frase.
// const longestWord = 'Antônio foi ao banheiro e não sabemos o que aconteceu'; // retorna 'aconteceu'
// const longestWord = (str) => {
//   let longestWord2 = '';
//   let longestWordSplit = str.split(' '); // array com as palavras
//   let lengthFrase = str.split(' ').length; // tamanho do array
//   for (let index = 0; index < lengthFrase; index += 1) {
//     for (let index2 = 1; index2 < lengthFrase; index2 += 1) {
//       (longestWordSplit[index].length > longestWordSplit[index2].length)
//         ? longestWord2 = longestWordSplit[index]
//         : longestWord2 = longestWordSplit[index2];
//     }
//   }
//   return longestWord2;
// }
// console.log(longestWord('Antônio foi ao banheiro e não sabemos o que aconteceu'));

// método array.sort()

// EX3 - pt2

// const paragraph = document.getElementById('contador-click');
// const btnClick = document.getElementById('btn-click');
// let clickCount = 0;

// btnClick.addEventListener('click', fClick => {
//   clickCount += 1;
//   paragraph.innerText = clickCount;
// })

// Ex4 - pt2
//FUNÇÃO QUE SUBSTITUI 'X' NUMA FRASE 

const substituaX = (nome) => {
  const frase = 'Tryber x aqui!';
  let array = frase.split(' ');
  for (let index in array) {
    if (array[index] === 'x') {
      array[index] = nome;
    }
  }
  return `${array[0]}, ${array[1]}, ${array[2]}`;
}

// console.log(substituaX('Jonathas'));

//FUNÇÃO QUE RECEBE A FUNÇÃO ANTERIOR E RETORNA UMA STRING

const minhasSkills = (substituaX) => {
  const skills = ['HTML', 'CSS', 'JavaScript'];
  let retorno = `${substituaX}
  Minhas três principais habilidades são: 
  ${skills[0]}
  ${skills[1]}
  ${skills[2]}`
  return retorno;
}

console.log(minhasSkills(substituaX('Jonathas')));
