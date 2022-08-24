// // FIXAÇÃO I
// // >> 1
// console.log('FIXAÇÃO I - 1');

// let player = {
//   name: 'Marta',
//   lastName: 'Silva',
//   age: 34,
//   medals: {
//     golden: 2,
//     silver: 3,
//   }
// };

// // >> 2
// console.log('FIXAÇÃO I - 2');


// console.log(player.name);
// console.log(player.lastName);
// console.log(player.age);

// console.log('A jogadora', player.name, player.lastName, 'tem', player.age,'anos de idade');

// // >> 3
// console.log('FIXAÇÃO I - 3');

// player['bestInTheWorld'] = [2006, 2007, 2008, 2009, 2010, 2018];

// console.table(player);

// // >> 4
// console.log('FIXAÇÃO I - 4');

// console.log('A jogadora', player.name, player.lastName, 'foi eleita a melhor do mundo por 6 vezes nos anos de', player['bestInTheWorld']);

// // >> 5
// console.log('FIXAÇÃO I - 5');

// console.log('A jogadora', player.name, player.lastName, 'possui', player.medals.golden, 'medalhas de ouro e', player.medals.silver,'medalhas de prata');

// // FIXAÇÃO II
// // >> 1
// console.log('FIXAÇÃO II - 1');

// let names = {
//   person1: 'João',
//   person2: 'Maria',
//   person3: 'Jorge',
// };

// for (let index in names){
//   console.log('Olá', names[index]);
// }

// // >> 2
// console.log('FIXAÇÃO II - 2');

// let car = {
//   model: 'A3 Sedan',
//   manufacturer: 'Audi',
//   year: 2020
// };

// for (index in car){
//   console.log(index,':', car[index]);
// }

// // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EXERCICIOS 4.4
// // REFATORAÇÃO - FUNÇÕES

// // ATIVIDADE 1
// let a = 10;
// let b = 4;
// // função adicao;

// function adicao(num1, num2) {
//   return num1 + num2;
// }

// console.log('Adição:', adicao(a, b));

// // função subtração 

// function subtracao(num1, num2) {
//   return num1 - num2;
// }

// console.log('Subtração:', subtracao(a, b));

// // // função multiplicação 

// function multiplicacao(num1, num2) {
//   return num1 * num2;
// }

// console.log('Multiplicação:', multiplicacao(a, b));

// // // Função Divisão

// function divisao(num1, num2) {
//   return num1 / num2;
// }

// console.log('Divisão:', divisao(a, b));

// // // Função modulo

// function modulo(num1, num2) {
//   return num1 % num2;
// }

// console.log('Módulo:', modulo( a, b));

// // ATIVIDADE 2

// const x = 90;
// const y = 90;

// function maiorQ(num1, num2) {
//   if (num1 > num2) {
//     return ('A variável X vale ' +  x + ' e é maior que Y');
//   }
//   else if (num1 < num2) {
//     return ('A variável Y vale ' + y + ' e é maior que X');
//   } 
//   return ('A variável X e Y são iguais.');
// }

// console.log(maiorQ(x, y));

// // ATIVIDADE 3
// const j = 5;
// const k = 23;
// const l = 40

// function maiorQ3(num1, num2, num3) {
//   if (num1 > num2 && num1 > num3) {
//     return ('A variável j vale ' + j + ' e é maior que k e l');
//   }
//   else if (num2 > num1 && num2 > num3) {
//     return ('A variável k vale ' + k + ' e é maior que j e l');
//   }
//   else if (num3 > num1 && num3 > num2) {
//     return ('A variável l vale ' + l + ' e é maior que j e k');
//   }
//   return ('A variáveis j, k e l são iguais');
// }

// console.log(maiorQ3(j, k, l));

// // ATIVIDADE 4

// function parameter(num) {
//   if (num > 0) {
//     return ('positive');
//   }
//   else if (num < 0) {
//     return ('negative');
//   }
//   return ('zero');
// }

// console.log(parameter(-1));

// // ATIVIDADE 5

// let triangulo;

// function triangle(a, b, c) {

//   if (a + b + c === 180 && a > 0 && b > 0 && c > 0 && a < 180 && b < 180 && c < 180) {
//     triangulo = true;
//     return ('Sim, é ' + triangulo + '. É um triângulo!!');
//   }
//   else {
//     triangulo = false;
//     return ('Ops, é ' + triangulo + '. Não é um triângulo!!');
//   }
// }

// console.log(triangle(35, 90, 55));
// // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VAMOS PRATICAR 4.4 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// // // EXERCICIO PT1
// // // 1
// console.log('EX PT 1 - 1')

// let info = {
//   personagem: 'Margarida',
//   origem: 'Pato Donald',
//   nota: 'Namorada do personagem principal nos quadrinhos do Pato Donald',
// };

// console.log('Bem vinda', info.personagem);

// // // 2
// console.log('EX PT 1 - 2')

// info['recorrente'] = 'Sim';
// console.log(info);


// // // 3
// console.log('EX PT 1 - 3')

// for (index in info) {
//   console.log(index);
// }

// // // 4
// console.log('EX PT 1 - 4')

// for (index in info) {
//   console.log(info[index]);
// }

// // // 5
// console.log('EX PT 1 - 5')

// let infoDois = {
//   personagem: 'Tio Patinhas',
//   origem: "Christmas on Bear Mountain, Dell's Four Color Comics #178",
//   nota: 'O último MacPatinhas',
//   recorrente: 'Sim'
// };

// for (index in infoDois) {
//   if (recorrente === 'Sim') {
//     recorrente = 'Ambos recorrentes'; <<<<<<<<<<????
//   }
//   console.log(info[index], 'e', infoDois[index]);
// }

// // // 6
// console.log('EX PT 1 - 6')

// let leitor = {
//   nome: 'Julia',
//   sobrenome: 'Pessoa',
//   idade: 21,
//   livrosFavoritos: [
//     {
//       titulo: 'O Pior Dia de Todos',
//       autor: 'Daniela Kopsch',
//       editora: 'Tordesilhas',
//     },
//   ],
// };

// console.log('O livro favorito de', leitor.nome, leitor.sobrenome, 'se chama', leitor.livrosFavoritos[0].titulo);

// // // 7
// console.log('EX PT 1 - 7')

// leitor.livrosFavoritos.push({titulo: 'Harry Potter e o Prisioneiro de Azkaban',autor: 'JK Rowling', editora: 'Rocco',});

// console.log(leitor.livrosFavoritos);

// // // 8
// console.log('EX PT 1 - 8')

// console.log(leitor.nome, 'tem', leitor.livrosFavoritos.length, 'livros favoritos');

