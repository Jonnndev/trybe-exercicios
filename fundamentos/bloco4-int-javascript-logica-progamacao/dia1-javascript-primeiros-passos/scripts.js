// ATIVIDADE PRÁTICA DO DIA
// 1 - Faça cinco programas, um para cada operação aritmética básica. Seu programa deve ter duas constantes, a e b, definidas no começo com os valores que serão operados. Faça programas para:
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

// 2- Faça um programa que retorne o maior de dois números. Defina no começo do programa duas constantes com os valores que serão comparados.
// const x = 20;
// const y = 86;

// if (x > y) {
//   console.log('A variável X vale ' + x + ' e é maior que Y');
// }
// else {
//   console.log('A variável Y vale ' + y + ' e é maior que X');
// }

// 3- Faça um programa que retorne o maior de três números. Defina no começo do programa três constantes com os valores que serão comparados.
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

// 4- Faça um programa que, dado um valor recebido como parâmetro, retorne "positive" se esse valor for positivo, "negative" se for negativo, e caso não seja nem positivo e nem negativo retorne "zero".
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

// 5- Faça um programa que defina três variáveis com os valores dos três ângulos internos de um triângulo. Retorne true se os ângulos representarem os ângulos de um triângulo e false, caso contrário. Se algum ângulo for inválido o programa deve retornar uma mensagem de erro. 
// -Para os ângulos serem de um triângulo válido, a soma dos três devem ser 180 graus.
// -Um ângulo será considerado inválido se não tiver um valor positivo.
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

// 6 - Escreva um programa que receba o nome de uma peça de xadrez e retorne os movimentos que ela faz.
// Como desafio, faça o programa funcionar tanto se receber o nome de uma peça com letras maiúsculas quanto com letras minúsculas, sem aumentar a quantidade de condicionais.
// Como dica, você pode pesquisar uma função que faz uma string ficar com todas as letras minúsculas (lower case).
// Se a peça passada for inválida, o programa deve retornar uma mensagem de erro.
// Exemplo: bishop (bispo) -> diagonals (diagonais)
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

// 7 - Escreva um programa que converte uma nota dada em porcentagem (de 0 a 100) em conceitos de A a F. Siga essas regras:
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

// 8 - Escreva um programa que defina três números em constantes e retorne true se pelo menos uma das três for par. Caso contrário, ele retorna false.
// Bonus: use somente um if.
// const a = 72;
// const b = 36;
// const c = 48;

// if (a % 2 === 0 || b % 2 === 0 || c % 2 === 0){
//   console.log('True, há pelos menos um número par.')
// }
// else {
//   console.log('False, nenhum deles é par.')
// }

// 9 - Escreva um programa que defina três números em constantes e retorne true se pelo menos uma das três for ímpar. Caso contrário, ele retorna false.
// Bonus: use somente um if.
// const a = 2;
// const b = 6;
// const c = 3;

// if (a % 2 !== 0 || b % 2 !== 0 || c % 2 !== 0){
//   console.log('True, há pelo menos um número ímpar.')
// }
// else {
//   console.log('False, todoas os números são par.')
// }

// 10 - Escreva um programa que se inicie com dois valores em duas constantes diferentes: o custo de um produto e seu valor de venda. A partir dos valores, calcule quanto de lucro (valor de venda descontado o custo do produto) a empresa terá ao vender mil desses produtos.
// Atente que, sobre o custo do produto, incide um imposto de 20%.
// Seu programa também deve emitir uma mensagem de erro e encerrar caso algum dos seus valores de entrada seja menor que zero.
// O lucro de um produto é o resultado da subtração do valor de venda pelo custo do mesmo, sendo que o imposto de 20% também faz parte do valor de custo.
// valorCustoTotal = valorCusto + impostoSobreOCusto
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

// 11 - Uma pessoa que trabalha de carteira assinada no Brasil tem descontados de seu salário bruto o INSS e o IR. Faça um programa que, dado um salário bruto, calcule o líquido a ser recebido.
// A notação para um salário de R$1500,10, por exemplo, deve ser 1500.10. Para as faixas de impostos, use as seguintes referências:
// INSS (Instituto Nacional do Seguro Social)
// Salário bruto até R$ 1.556,94: alíquota de 8%
// Salário bruto de R$ 1.556,95 a R$ 2.594,92: alíquota de 9%
// Salário bruto de R$ 2.594,93 a R$ 5.189,82: alíquota de 11%
// Salário bruto acima de R$ 5.189,82: alíquota máxima de R$ 570,88
// IR (Imposto de Renda)
// Até R$ 1.903,98: isento de imposto de renda
// De R$ 1.903,99 a 2.826,65: alíquota de 7,5% e parcela de R$ 142,80 a deduzir do imposto
// De R$ 2.826,66 a R$ 3.751,05: alíquota de 15% e parcela de R$ 354,80 a deduzir do imposto
// De R$ 3.751,06 a R$ 4.664,68: alíquota de 22,5% e parcela de R$ 636,13 a deduzir do imposto
// Acima de R$ 4.664,68: alíquota de 27,5% e parcela de R$ 869,36 a deduzir do imposto.

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

