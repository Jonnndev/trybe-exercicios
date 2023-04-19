// Exercício 1: Crie uma classe Car cujo objeto representará um carro.

// Propriedades:

// Deve conter uma propriedade do tipo string chamada brand que representa a marca.
// Deve conter uma propriedade do tipo string chamada color que representa a cor.
// Deve conter uma propriedade do tipo number chamada doors que representa a quantidade de portas.
// Comportamentos:

// Deve conter um método chamado honk que aciona a buzina do carro.
// Deve possuir um método chamado turnOn que liga o carro.
// Deve possuir um método chamado turnOff que desliga o carro.
// Deve possuir um método chamado speedUp que acelera o carro.
// Deve possuir um método chamado speedDown que reduz a velocidade do carro.
// Deve possuir um método chamado stop que para o carro.
// Deve possuir um método chamado turn que recebe uma direção do tipo string e vira o carro.

class Car {
  brand: string;
  color: string;
  doors: number;

  constructor(brand: string, color: string, doors: number) {
    this.brand = brand;
    this.color = color;
    this.doors = doors;
  }

  honk(): void {
    console.log('Buzinando')
  }

  turnOn(): void {
    console.log('Carro ligado')
  }

  turnOff(): void {
    console.log('Carro desligado')
  }

  speedUp(): void {
    console.log('Acelerando')
  }

  speedDown(): void {
    console.log('Desacelerando')
  }

  stop(): void {
    console.log('Freiando o carro')
  }

  turn(direction: string) {
    console.log(`Virando o carro para a ${direction}`)
  }

  openTheDoor(door: string) {
    console.log(`Porta do ${door} aberta`)
  }

  closeTheDoor(door: string) {
    console.log(`Porta do ${door} fechada`)
  }
}

// Exercício 2: Vamos agora utilizar a classe Car que criamos no exercício anterior. Uma pessoa motorista de aplicativo
// irá fazer uma viagem para pegar sua nova pessoa passageira. A pessoa motorista então entra em seu volkswagen gol prata de
// 4 portas, liga seu carro e começa o trajeto:

// Siga em frente;
// Em 600 metros vire a esquerda;
// Vire a esquerda;
// Em 200 metros na rotatória pegue a segunda saída a direita;
// Mantenha em frente pelos próximos 1,2 quilômetros;
// Em 300 metros vire a direita;
// Vire a direita;
// Em 400 metros você chegará ao seu destino;
// Você chegou ao seu destino.
// Pronto. A pessoa motorista para, a pessoa passageira entra pela porta de trás do lado do carona e a viagem continua.

// Siga em frente;
// Em 300 metros vire a direita;
// Vire a direita;
// Mantenha em frente pelos próximos 2 quilômetros;
// Em 200 metros vire a esquerda;
// Vire a esquerda;
// Em 400 metros vire a direita;
// Vire a direita;
// Em 100 metros você chegará ao destino.
// Você chegou ao destino.
// A pessoa passageira desce do veículo e a pessoa motorista segue para a próxima corrida.

// Agora você deve desenvolver um script capaz de automatizar todo o cenário descrito.

const carro = new Car('volkswagen', 'prata', 4);

carro.openTheDoor('Motorista');
carro.closeTheDoor('Motorista');
carro.turnOn();
carro.speedUp();
carro.speedDown();
carro.turn('esquerda');
carro.speedUp();
carro.speedDown();
carro.turn('direita');
carro.speedUp();
carro.speedDown();
carro.turn('direita');
carro.speedDown();
carro.stop();
carro.openTheDoor('Passageiro traseiro esquerda');
carro.closeTheDoor('Passageiro traseiro esquerda');

carro.speedUp();
carro.speedDown();
carro.turn('direita');
carro.speedUp();
carro.speedDown();
carro.turn('esquerda');
carro.speedUp();
carro.speedDown();
carro.turn('direita');
carro.speedDown();
carro.stop();
carro.openTheDoor('Passageiro traseiro esquerda');
carro.closeTheDoor('Passageiro traseiro esquerda');

carro.speedUp();

// Exercício 3
// Crie uma interface que represente uma pizza. Ela deve conter:

// Uma propriedade do tipo string chamada flavor que representa o sabor.
// Uma propriedade chamada slices cujo tipo é a união entre os possíveis números de fatias da pizza.
// O número de fatias pode ser 4, 6 ou 8;
// Utilize um type alias para armazenar o tipo dessa propriedade.

type fatias = 4 | 6 | 8;

interface Pizza {
  flavor: string;
  slices: fatias;
}

// a) Crie uma pizza sabor Calabresa de 8 fatias;

const calabresa: Pizza = {
  flavor: 'Calabresa',
  slices: 8
}

// b) Crie uma pizza sabor Marguerita de 6 fatias;

const Marguerita: Pizza = {
  flavor: 'Marguerita',
  slices: 6
}

// c) Crie uma pizza sabor Nutella de 4 fatias.

const Nutella: Pizza = {
  flavor: 'Nutella',
  slices: 4
}

// Exercício 4: Vamos agora estender nossa interface Pizza com novos tipos de pizza. São eles:

// Pizza Comum - seus sabores são “Calabresa”, “Frango” e “Pepperoni”, podem ter 4, 6 ou 8 pedaços.
// Pizza Vegetariana - seus sabores são “Marguerita”, “Palmito” e “Cogumelo”, podem ter 4, 6 ou 8 pedaços.
// Pizza Doce - seus sabores são “Nutella”, “Goiabada com Queijo” e “Marshmallow”, podem ter somente 4 pedaços.
// Você deve usar type alias e type unions para criar os possíveis sabores de cada tipo de pizza.

type Comum = 'Calabresa' | 'Frango' | 'Pepperoni';
type Vegetariana = 'Marguerita' | 'Palmito' | 'Cogumelo';
type Doce = 'Nutella' | 'Goiabada com Queijo' | 'Marshmallow';

interface PizzaCommum extends Pizza {
  flavor: Comum
}

interface PizzaVegetariana extends Pizza {
  flavor: Vegetariana
}

interface PizzaDoce extends Pizza {
  flavor: Doce,
  slices: 4
}

// Agora crie:

// 3 pizzas do tipo comum;

const Calabresa: PizzaCommum = {
  flavor: 'Calabresa',
  slices: 6
}

console.log(calabresa);

const frango: PizzaCommum = {
  flavor: 'Frango',
  slices: 8
}

console.log(frango);

const pepperoni: PizzaCommum = {
  flavor: 'Pepperoni',
  slices: 6
}

console.log(pepperoni);

// 2 pizzas do tipo vegetariana;

const marguerita: PizzaVegetariana = {
  flavor: 'Marguerita',
  slices: 8
}

console.log(marguerita);

const palmito: PizzaVegetariana = {
  flavor: 'Palmito',
  slices: 6
}

console.log(palmito);

// 1 pizza do tipo doce.

const nutella: PizzaDoce = {
  flavor: 'Nutella',
  slices: 4
}

console.log(nutella);

// Exercício 5
// Em JavaScript, temos a High Order Function filter. Ela funciona da seguinte forma:

// Recebe como primeiro parâmetro um array que pode ser de qualquer tipo;
// Recebe como segundo parâmetro uma função de callback;
// Retorna um novo array removendo os itens que não atendem a condição da função de callback;
// A função de callback recebe como primeiro parâmetro um item do tipo do array;
// A função de callback pode receber como segundo parâmetro um index do tipo inteiro;
// A função de callback pode receber como terceiro parâmetro o próprio array;
// A função de callback devolve um booleano.
// Usando generics e os demais conceitos aprendidos em TypeScript, recrie a função filter e nomeie-a como myFilter.

type callbackFilter<T> = (value: T, index?: number, array?: Array<T>) => boolean;

function myFilter<T>(array: Array<T>, callback: callbackFilter<T>): Array<T> {
  const newArray: Array<T> = [];

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

console.log(myFilter([1, 2, 3], (item, index, array) => item < 3));

console.log(myFilter(["a", "b", "c"], (item, index, array) => {
  return item !== "a"
}));