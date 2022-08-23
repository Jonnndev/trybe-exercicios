// ATIVIDADE PRÁTICA DO DIA
// ATIVIDADE 1
// let a = 10;
// let b = 4;
// let adicao;
// // Adição (a + b)
// adicao = a + b;
// console.log(adicao);
// // Subtração (a - b)
// adicao = a - b;
// console.log(adicao);
// // Multiplicação (a * b)
// adicao = a * b;
// console.log(adicao);
// // Divisão (a / b)
// adicao = a / b;
// console.log(adicao);
// // Módulo (a % b)
// adicao = a % b;
// console.log(adicao);

// ATIVIDADE 2
// const x = 20;
// const y = 86;

// if (x > y) {
//   console.log('A variável X vale ' + x + ' e é maior que Y');
// }
// else {
//   console.log('A variável Y vale ' + y + ' e é maior que X');
// }

// ATIVIDADE 3
// const j = 54;
// const k = 230;
// const l = 40

// if (j > k && j > l ) {
//   console.log('A variável j vale ' + j + ' e é maior que k e l');
// }
// else if (k > j && k > l ) {
//   console.log('A variável k vale ' + k + ' e é maior que j e l');
// }
// else {
//   console.log('A variável l vale ' + l + ' e é maior que j e k');
// }

// ATIVIDADE 4
// let parameter;
// parameter = 0;

// if (parameter > 0){
//   console.log('positive');
// }
// else if (parameter < 0){
//   console.log('negative');
// }
// else{
//   console.log('zero');
// }

// ATIVIDADE 5
// let a = 30;
// let b = 95;
// let c = 55;
// let triangulo;

// if (a + b + c === 180 && a > 0 && b > 0 && c > 0 && a < 180 && b < 180 && c < 180){
//   triangulo = true;
//   console.log('Sim, é ' + triangulo + '. É um triângulo!!');
// }
// else {
//   triangulo = false;
//   console.log('Ops, é ' + triangulo + '. Não é um triângulo!!');
// }

/// ATIVIDADE 6
// let nomePeça;
// nomePeça =  'PEÃO'

// switch (nomePeça.toLowerCase()){
//   case 'rei':
//     console.log('Rei >> Anda 1 casa para todos os lados');
//     break;
//   case 'rainha':
//     console.log('Rainha >> Se move em qualquer direção sem limite de casas.');
//     break;
//   case 'bispo':
//     console.log('Bispo >> Se movimenta apenas na diagonal, sem limite de casas.');
//     break;
//   case 'torre':
//     console.log('Torre >> Se movimenta apenas verticalmente e horizontalmente, sem limites de casa.');
//     break;
//   case 'cavalo':
//     console.log('Cavalo >> Se movimenta em formato de L andando sempre 3 casas');
//     break;
//   case 'peão':
//     console.log('Peão >> Anda 1 casa para todos os lados');
//     break;
//   default:
//     console.log('error - peça não existente!')
// }

// ATIVIDADE 7
// Porcentagem >= 90 -> A
// Porcentagem >= 80 -> B
// Porcentagem >= 70 -> C
// Porcentagem >= 60 -> D
// Porcentagem >= 50 -> E
// Porcentagem < 50 -> F

// let nota;
// nota = -10;

// if (nota >= 90 && nota <= 100){
//   console.log('Você recebeu nota A.')
// }
// else if (nota >= 80 && nota < 90){
//   console.log('Você recebeu nota B.')
// }
// else if (nota >= 70 && nota < 80){
//   console.log('Você recebeu nota C.')
// }
// else if (nota >= 60 && nota < 70){
//   console.log('Você recebeu nota D.')
// }
// else if (nota >= 50 && nota < 60){
//   console.log('Você recebeu nota E.')
// }
// else if (nota >= 0 && nota < 50 ){
//   console.log('Você recebeu nota F.')
// }
// else{
//   console.log('Erro na nota.')
// }

// ATIVIDADE 8
// const a = 72;
// const b = 36;
// const c = 48;

// if (a % 2 === 0 || b % 2 === 0 || c % 2 === 0){
//   console.log('True, há pelos menos um número par.')
// }
// else {
//   console.log('False, nenhum deles é par.')
// }

// ATIVIDADE 9
// const a = 2;
// const b = 6;
// const c = 3;

// if (a % 2 !== 0 || b % 2 !== 0 || c % 2 !== 0){
//   console.log('True, há pelo menos um número ímpar.')
// }
// else {
//   console.log('False, todoas os números são par.')
// }

// ATIVIDADE 10
// lucro = valorVenda - valorCustoTotal (lucro de um produto)
// const custo = 55;
// let imposto = 0.20;
// const valorVenda = 70;
// const custoTotal = custo + (custo * imposto);

// let lucro = (valorVenda*1000) - (custoTotal*1000);

// if (lucro > 0){
//   console.log('O custo do seu produto é ' + custoTotal + '. ' + 'O valor de venda/unidade é ' + valorVenda + '. ' + 'Seu lucro total foi de ' + lucro);
// }
// else {
//   console.log('Você não esta tendo lucro');
// }

// ATIVIDADE 11

// let inss;
// let ir;
// let salario;
// let salarioBruto = 6060;


// if (salarioBruto <= 1556.94) {
//   inss = 8 / 100;
//   salarioBase = salarioBruto - (salarioBruto * inss);
//   console.log('A - Seu salário liquido é de R$' + salarioBase + ' reais. Não paga IR.');
// }
// else if (salarioBruto <= 2594.92) {
//   inss = 9 / 100;
//   salarioBase = salarioBruto - (salarioBruto * inss);
//   if (salarioBase >= 1903.99) {
//     ir = 7.5 / 100;
//     salario = salarioBase - ((salarioBase * ir) - 142.80);
//     console.log('B - Seu salário liquido é de R$' + salario + ' reais!');
//   }
//   else {
//     console.log('B - Seu salário liquido é de R$' + salarioBase + ' reais.');

//   }
// }
// else if (salarioBruto <= 5189.82) {
//   inss = 11 / 100;
//   salarioBase = salarioBruto - (salarioBruto * inss);
//   if (salarioBase > 2826.65 && salarioBase <= 3571.05) {
//     ir = 15 / 100;
//     salario = salarioBase - ((salarioBase * ir) - 354.80);
//     console.log('C - Seu salário liquido é de R$' + salario + ' reais.');
//   }
//   else if (salarioBase > 3571.05 && salarioBase <= 4664.68) {
//     ir = 22.5 / 100;
//     salario = salarioBase - ((salarioBase * ir) - 636.13)
//     console.log('C - Seu salário liquido é de R$' + salario + ' reais.');
//   }
//   else {
//     console.log('C - Seu salário liquido é de R$' + salario + ' reais.');
//   }
// }
// else {
//   inss = 570.88;
//   salarioBase = salarioBruto - inss;
//   if (salarioBase > 4664.68) {
//     ir = 27.5 / 100;
//     salario = salarioBase - ((salarioBase * ir) - 869, 36);
//     console.log('D - Seu salário liquido é de R$' + salario + ' reais.');
//   }
//   else {
//     console.log('D - Seu salário liquido é de R$' + salario + ' reais.');
//   }
// }

