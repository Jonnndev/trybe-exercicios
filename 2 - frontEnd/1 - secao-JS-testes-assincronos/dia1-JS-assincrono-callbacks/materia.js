// JS ASSÍNCRONO
// FAREMOS OPERAÇÕES ASSINCRONAS QUANDO ESSAS FOREM MUITO CUSTOSAS, OU SEJA, LEVAM MUITO PODER DE PROCESSAMENTO
// pushNumberAsync.js

const pushNumber = (list, number) => list.push(number);

const numbers = [];

const THREE_SECONDS = 3000;

setTimeout(() => pushNumber(numbers, 1), THREE_SECONDS);
pushNumber(numbers, 2);
pushNumber(numbers, 3);

setTimeout(() => console.log(numbers), THREE_SECONDS);

// Saída:
// [ 2, 3, 1 ]

// CALLBACKS

// despesas.js

// Declaramos nossa variável de despesas
const minhasDespesas = [
  {
    academia: 99,
  },
  {
    ifood: 200,
  },
  {
    celular: 60,
  },
  {
    internet: 100,
  },
];

// Declaramos nossa renda
const minhaRenda = 1000;

const despesaMensal = (renda, despesas, callback) => {
  // Definimos que a despesa total é igual ao valor retornado pela função callback (que é o parâmetro da nossa função)
  // que vai receber nosso parâmetro/variável "despesas"
  const despesaTotal = callback(despesas);

  // Definimos nosso saldo final, que é nossa renda - nossa despesa total
  const saldoFinal = renda - despesaTotal;

  console.log(`Balanço do mês:
    Recebido: R$${renda},00
    Gasto: R$${despesaTotal},00
    Saldo: R$${saldoFinal},00 `);
};

// Definimos nossa função que será passada como parâmetro
// essa função recebe o parâmetro despesas a partir da função principal despesaMensal
const somaDespesas = (despesas) => {
  // Separamos cada item do nosso array de despesas
  // e fazemos um reduce para somar os valores
  const custoItem = despesas.map((item) => Object.values(item));
  const despesaTotal = custoItem.reduce((acc, curr) => {
    const soma = acc + curr[0];
    // acc é a sigla para accumulator (acumulador)
    // curr é a sigla para current_value (valor atual)
    return soma;
  }, 0);
  return despesaTotal;
};

// Executamos a função principal com as variáveis renda, despesas
// e a nossa função somaDespesas
// callback = somaDespesas
despesaMensal(minhaRenda, minhasDespesas, somaDespesas);

// Saída:
//  Balanço do mês:
//  Recebido: R$1000,00
//  Gasto:    R$459,00
//  Saldo:    R$541,00

// OUTRO EXEMPLO

// callback.js

// Definição da função userFullName
const userFullName = ({ firstName, lastName }) => `Olá! Meu nome é ${firstName} ${lastName}`;

// Definição da função getUser
const getUser = (callback) => {
  const user = {
    firstName: 'Ivan',
    lastName: 'Ivanovich',
    nationality: 'Russo',
  };
  // Retornamos nosso parâmetro, que será uma função (callback)
  return callback(user);
};

// Chamada/execução da função getUser, que vai receber como parâmetro nossa função userFullName.
console.log(getUser(userFullName));

// Saída:
// Olá! Meu nome é Ivan Ivanovich

// Vamos ao passo a passo:

// Definimos a função userFullName;
// Definimos a função getUser
// Definimos que o parâmetro que a nossa getUser vai receber se chama “callback”.
// Ao executar a função getUser, passamos a função userFullName como parâmetro

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SETUP E TEARDOWN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Até esse momento, você viu como realizar os testes utilizando o Jest, que é apenas um dos ciclos possíveis. Vamos entender, a seguir, quais são os outros dois.

// Setup - é o primeiro ciclo. Ele ocorre antes de os testes serem executados. É uma fase inicial em que você pode definir algumas configurações.

// Testes - é considerado o segundo ciclo, ou seja, o momento em que ocorrem os testes. O ciclo que foi trabalhado nos blocos anteriores.

// Teardown - é o terceiro ciclo. Uma fase que ocorre após os testes serem executados.

// O Jest possui a função >>>> beforeEach <<<<<, que é utilizada para executar um código antes de cada teste. 
// Tambem possui a função >>>> afterEach <<<<, que é executada após cada teste.

// cicles.test.js

// let cities = [];

// const addCity = (city) => {
// cities.push(city);
// };

// const removeCity = (city) => {
// cities = cities.filter((eachCity) => eachCity !== city);
// };

// beforeEach(() => {
//  cities = [...cities, 'Pindamonhangaba'];
// });

// afterEach(() => {
//   cities = [];
// });

// test('Testa a função addCity utilizando o beforeEach', () => {
//   expect.assertions(5);
//   addCity('Campinas');
//   addCity('Goiania');
//   addCity('Recife');
//   expect(cities).toHaveLength(4);
//   expect(cities).toContain('Campinas');
//   expect(cities).toContain('Goiania');
//   expect(cities).toContain('Recife');
//   expect(cities).toContain('Pindamonhangaba');
// });

// test('Testa a função removeCity utilizando o beforeEach', () => {
//   expect.assertions(2);
//   removeCity('Pindamonhangaba');
//   expect(cities).toHaveLength(0);
//   expect(cities).not.toContain('Pindamonhangaba');
// });

// Utilizando beforeEach e afterEach junto com describe <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Agora, se você tem um bloco de describe agrupando os testes e o beforeEach ou afterEach estiverem dentro desse describe, ele rodará apenas dentro dos testes que estão nesse describe, ou seja, se criarmos um segundo describe, aquele beforeEach e afterEach que estão no primeiro describe não serão rodados antes e/ou depois dos testes do segundo.

// cicles.test.js

// let cities = [];

// const addCity = (city) => {
// cities.push(city);
// };

// const removeCity = (city) => {
// cities = cities.filter((eachCity) => eachCity !== city);
// };

// describe('Agrupa o primeiro bloco de testes', () => {
//   beforeEach(() => {
//     cities = [...cities, 'Pindamonhangaba'];
//   });

//   afterEach(() => {
//     cities = [];
//   });

//   test('Testa a função addCity dentro do primeiro bloco de testes', () => {
//     expect.assertions(5);
//     addCity('Campinas');
//     addCity('Goiania');
//     addCity('Recife');
//     expect(cities).toHaveLength(4);
//     expect(cities).toContain('Campinas');
//     expect(cities).toContain('Goiania');
//     expect(cities).toContain('Recife');
//     expect(cities).toContain('Pindamonhangaba');
//   });

//   test('Testa a função removeCity dentro do primeiro bloco de testes', () => {
//     expect.assertions(2);
//     removeCity('Pindamonhangaba');
//     expect(cities).toHaveLength(0);
//     expect(cities).not.toContain('Pindamonhangaba');
//   });
// });

// describe('Agrupa o segundo bloco de testes', () => {
//   beforeEach(() => {
//     cities = [...cities, 'Tangamandapio'];
//   });

//   afterEach(() => {
//     cities = [];
//   });

//   test('Testa a função addCity dentro do segundo bloco de testes', () => {
//     expect.assertions(5);
//     addCity('Campinas');
//     addCity('Goiania');
//     addCity('Recife');
//     expect(cities).toHaveLength(4);
//     expect(cities).toContain('Campinas');
//     expect(cities).toContain('Goiania');
//     expect(cities).toContain('Recife');
//     expect(cities).toContain('Tangamandapio');
//   });

//   test('Testa a função removeCity dentro do segundo bloco de testes', () => {
//     expect.assertions(3);
//     removeCity('Tangamandapio');
//     expect(cities).toHaveLength(0);
//     expect(cities).not.toContain('Tangamandapio');
//     expect(cities).not.toContain('Pindamonhangaba');
//   });
// });