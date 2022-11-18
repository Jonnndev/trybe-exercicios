// MOCKS E INPUTS

// MOCKS <<<<<<<<<<<<<<<<<<<<<<<<<

// O objetivo de mockar uma função, módulo ou requisição é permitir a quem desenvolve ter controle sobre todo o funcionamento de seus testes. 
// No exemplo abaixo, podemos ver um caso em que simular o comportamento da função seria necessário para o teste:

const retornaNumeroAleatorio = () => Math.floor(Math.random() * 100);

const divisivelPorDois = () => (retornaNumeroAleatorio() % 2) === 0;

test('quando o número aleatório é par, a função retorna `true`', () => {
  expect(divisivelPorDois()).toBe(true); // Como garantimos que o número retornado será par?
});

// Mockar o comportamento da função retornaNumeroAleatorio() para garantir que ela está, nesse teste, retornando um número par seria a solução para esse impasse!

// Dentre as principais formas de se mockar algo somente utilizando Jest, destacam-se três:

// jest.fn();
// jest.mock();
// jest.spyOn().

//MOCKANDO COM JEST

// jest.fn(); É o jeito mais simples de mockar algo: transforma uma função em uma simulação.

// Ele é muito útil para casos como o do exemplo da seção anterior, em que precisamos ter controle dos números gerados aleatoriamente.

// const retornaNumeroAleatorio = () => Math.floor(Math.random() * 100);

// const divisivelPorDois = () => (retornaNumeroAleatorio() % 2) === 0;

test("#divisivelPorDois", () => {
  // testando se a função foi chamada
  divisivelPorDois();
  expect(divisivelPorDois).toHaveBeenCalled();
});

// Esse teste deveria passar, não? Afinal, a função foi chamada logo acima dele. Mas ele não passa.

// Esse erro acontece porque a propriedade toHaveBeenCalled, assim como outras que serão ensinadas a seguir, é exclusiva para funções simuladas. Ou seja: se você não simula uma função, a propriedade não funciona corretamente.

// ...
test("#divisivelPorDois", () => {
  // testando se a função foi chamada. Não simulamos nenhum comportamento aqui, pois, para esse teste, isso não importa! Apenas queremos saber se ela foi chamada.
  divisivelPorDois = jest.fn();

  divisivelPorDois();
  expect(divisivelPorDois).toHaveBeenCalled();
});

// Por ser uma simulação, podemos especificar qual vai ser o retorno da função.

// Duas propriedades nos permitem fazer essa declaração: mockReturnValue(value) e mockReturnValueOnce(value). O mockReturnValue define um valor padrão de retorno. Já o mockReturnValueOnce retorna o valor definido apenas uma vez, e é importante, pois pode ser encadeado para que chamadas sucessivas retornem valores diferentes.

//...
test("#divisivelPorDois", () => {
  // testando se a função foi chamada e qual seu retorno
  divisivelPorDois = jest.fn().mockReturnValue(true);

  divisivelPorDois();
  expect(divisivelPorDois).toHaveBeenCalled();
  expect(divisivelPorDois()).toBe(true);
});

// Além disso, podemos também testar quantas vezes a função foi chamada. Para isso, utilizamos a propriedade toHaveBeenCalledTimes(number):

// ...
test("#divisivelPorDois", () => {
  // testando quantas vezes a função foi chamada e qual seu retorno
  divisivelPorDois = jest
    .fn()
    .mockReturnValue('default value')//<<<<< EXECUTADO DEPOIS
    .mockReturnValueOnce('first call') //<<<<< SÃO EXECUTADOS PRIMEIRO
    .mockReturnValueOnce('second call'); //<<<<< SÃO EXECUTADOS PRIMEIRO

  expect(divisivelPorDois).toHaveBeenCalledTimes(0);

  expect(divisivelPorDois()).toBe("first call");
  expect(divisivelPorDois).toHaveBeenCalledTimes(1);

  expect(divisivelPorDois()).toBe("second call");
  expect(divisivelPorDois).toHaveBeenCalledTimes(2);

  expect(divisivelPorDois()).toBe("default value");
  expect(divisivelPorDois).toHaveBeenCalledTimes(3);
});

// MOCKANDO MÓDULOS <<<<<<<<<<<<<<<<<<<<<<<<<

// O jest.mock(), que tem como principal diferencial mockar todo um pacote de dependências ou módulo de uma vez.

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const somar = async (a, b) => { await sleep(10000); return a + b }; // Função de somar mais lenta do mundo
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

module.exports = { somar, subtrair, multiplicar, dividir };

// Com o jest.mock(), podemos mockar todas as funções com um só comando:

jest.mock('./math');

// Uma vez que mockarmos todo o arquivo math.js, passamos a simular o comportamento de todas as suas funções, porém sua implementação individual permanece indefinida. Caso passemos os parâmetros 1 e 2 para a função somar, por exemplo, o retorno será “undefined”. Isso se dá porque a simulação deixou de acessar o comportamento da função original do math.js.

// mockImplementation(func). Ele aceita uma função que deve ser usada como implementação.

const math = require('./math');
jest.mock("./math");

test("#somar", () => {
  // Aqui testamos se a função foi chamada, quantas vezes foi chamada, quais parâmetros foram usados e qual seu retorno

  math.somar.mockImplementation((a, b) => a + b);
  math.somar(1, 2);

  expect(math.somar).toHaveBeenCalled();
  expect(math.somar).toHaveBeenCalledTimes(1);
  expect(math.somar).toHaveBeenCalledWith(1, 2);
  expect(math.somar(1, 2)).toBe(3);
});

// Assim como o mockReturnValueOnce, podemos também implementar uma funcionalidade para apenas uma chamada com mockImplementationOnce.

// Trabalhando com mock e funções originais <<<<<<<<<<<<<<<<<<<<<<<<<

// O jest.spyOn() “espia” a chamada da função simulada, enquanto deixa a implementação original ativa.

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const somar = async (a, b) => { await sleep(10000); return a + b }; // Função de somar mais lenta do mundo
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

module.exports = { somar, subtrair, multiplicar, dividir };

// ~~~~~~~~~~~~~~~~

const math = require('./math');

test("#somar", () => {
  // testando se a função foi chamada, quantas vezes foi chamada, quais parâmetros foram usados e qual seu retorno
  const mockSomar = jest.spyOn(math, "somar");

  mockSomar(1, 2);
  expect(mockSomar).toHaveBeenCalled();
  expect(mockSomar).toHaveBeenCalledTimes(1);
  expect(mockSomar).toHaveBeenCalledWith(1, 2);
  expect(mockSomar(1, 2)).resolves.toBe(3); //<<<<<<<
});


// mock.mockClear()

// Útil quando você deseja limpar os dados de uso de uma simulação entre dois expects.

// mock.mockReset()

// Faz o que o mockClear() faz;
// Remove qualquer retorno estipulado ou implementação;
// Útil quando você deseja resetar uma simulação para seu estado inicial.

// mock.mockRestore()

// Faz tudo que mockReset() faz;
// Restaura a implementação original;
// Útil para quando você quer simular funções em certos casos de teste e restaurar a implementação original em outros.

const math = require('./math');

test("#somar", () => {
  // testando a implementação original, o mock e o mock resetado

  // implementação original
  expect(math.somar(1, 2)).resolves.toBe(3);

  // criando o mock e substituindo a implementação para uma subtração
  math.somar = jest.fn().mockImplementation((a, b) => a - b);

  math.somar(5, 1);
  expect(math.somar).toHaveBeenCalledTimes(1);
  expect(math.somar(5, 1)).toBe(4);
  expect(math.somar).toHaveBeenCalledTimes(2);
  expect(math.somar).toHaveBeenLastCalledWith(5, 1);

  // resetando o mock
  math.somar.mockReset();
  expect(math.somar(1, 2)).toBe(undefined);
  expect(math.somar).toHaveBeenCalledTimes(1);
  expect(math.somar).toHaveBeenLastCalledWith(1, 2);
});

// No exemplo acima, por termos usado o jest.fn(), não há como restaurar as implementações originais da função, pois suas funcionalidades não permitem. A única ferramenta que nos permite transitar entre simulação e comportamento original é o jest.spyOn().

const math = require('./math');

test("#somar", () => {
  // testando a implementação original, o mock e a restauração da função original

  // implementação original
  expect(math.somar(1, 2)).resolves.toBe(3);

  // criando o mock e substituindo a implementação para uma subtração
  const mockSomar = jest
    .spyOn(math, "somar")
    .mockImplementation((a, b) => a - b);

  math.somar(5, 1);
  expect(mockSomar).toHaveBeenCalledTimes(1);
  expect(mockSomar(5, 1)).toBe(4);
  expect(mockSomar).toHaveBeenCalledTimes(2);
  expect(mockSomar).toHaveBeenLastCalledWith(5, 1);

  // restaurando a implementação original
  math.somar.mockRestore();
  expect(math.somar(1, 2)).resolves.toBe(3);
});

// TESTANDO APIS E INPUTS <<<<<<<<<<<<<<<<<<<<<<<<<

// Testando uma chamada de API no React

// Imagine que a API saia do ar ou que perdemos acesso à internet enquanto o teste roda. O teste quebraria, apesar de o seu código estar funcionando. Mockar a chamada à API evita esse tipo de problema. Outro ponto é que seus testes vão rodar mais rápido se você não fizer uma chamada real à API todas as vezes que você for rodar seu teste.

// Conferir no App.test.js