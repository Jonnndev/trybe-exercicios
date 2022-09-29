// EXERCÍCIO 1 - NOVA PESSOA CONTRATADA
// Crie uma função que retorne um objeto no formato { nomeCompleto, email } representando uma nova pessoa contratada. Passe sua função como parâmetro da HOF newEmployees para criar cada pessoa contratada em seu respectivo id. A sua função deve receber como parâmetro o nome completo da pessoa funcionária e, a partir dele, gerar automaticamente um email no formato nome_da_pessoa@trybe.com.

// const staffNameEmail = (name) => {
//   return `${name.split(' ').join('_').toLowerCase()}@trybe.com`;
// }

// console.log(staffNameEmail('Jonathas Assis de Oliveira'));

// const newEmployees = (callback) => {
//   const employees = {
//     id1: callback,
//   }
//   return employees;
// }

// console.log(newEmployees(staffNameEmail('Jonathas Assis de Oliveira')));

// EXERCÍCIO 2 - SORTEADOR DE LOTERIA
// Desenvolva uma HOF que retorna o resultado de um sorteio. Esta HOF irá gerar um número aleatório entre 1 e 5 recebendo como parâmetros o número apostado e uma função que checa se o número apostado é igual ao número sorteado. O retorno da sua HOF deve ser uma string (Ex: “Tente novamente” ou “Parabéns você ganhou”).

// const checkNumber = (number, numberRandom) => {
//   return number !== numberRandom ? 'Tente novamente!' : 'Parabéns você ganhou!'
// }

// const lottery = (number, callback) => {
// const numberRandom = Math.round(Math.random() * 5);
// return callback(number, numberRandom);

// }

// console.log(lottery(2, checkNumber));

// EXERCÍCIO 3 - CORRETOR AUTOMÁTICO DE EXAME
// Crie uma HOF que receberá três parâmetros:
// O primeiro será um array de respostas corretas (soluções);
// O segundo será um array contendo as respostas fornecidas por uma pessoa estudante;
// O terceiro é uma função que compara os dois arrays e então dá uma pontuação baseada nos acertos. Para isso, essa função usará os seguintes critérios:
// Uma resposta correta adiciona 1 ponto à pontuação final;
// A ausência de uma resposta não altera a pontuação (quando for “N.A”);
// Uma resposta incorreta reduz a pontuação final em 0.5 ponto.
// Ao final, a HOF deve retornar o total de pontos obtidos através das respostas fornecidas pela pessoa estudante. Utilize os seguintes arrays:

// const RIGHT_ANSWERS = ['A', 'C', 'B', 'D', 'A', 'A', 'D', 'A', 'D', 'C'];
// const STUDENT_ANSWERS = ['A', 'N.A', 'B', 'D', 'A', 'C', 'N.A', 'A', 'D', 'B'];

// const checkAnswers = (arr1, arr2) => {
//   let sum = 0;
//   for (let index in arr1) {
//     if (arr2[index] === arr1[index]) {
//       sum += 1;
//     } else if (arr2[index] === 'N.A') {
//       sum += 0;
//     } else {
//       sum -= 0.5;
//     }
//   }
//   return sum;
// }

// const autocorrect = (arr1, arr2, callback) => {
//   return `Sua nota final foi de ${callback(arr1, arr2)} pontos!`
// }

// console.log(autocorrect(RIGHT_ANSWERS, STUDENT_ANSWERS, checkAnswers));

// >>>>>>>>>>>>>>>> EXERCÍCIO BÔNUS PT 1 - GAME ACTIONS SIMULATOR
const mage = {
  healthPoints: 130,
  intelligence: 45,
  mana: 125,
  damage: undefined,
};

const warrior = {
  healthPoints: 200,
  strength: 30,
  weaponDmg: 2,
  damage: undefined,
};

const dragon = {
  healthPoints: 350,
  strength: 50,
  damage: undefined,
};

const battleMembers = { mage, warrior, dragon };

//DRAGON DAMAGE
const dragonDamage = () => {
  const damageDrag = Math.floor(Math.random() * ((dragon.strength) - 15) + 15);
  return damageDrag;
}

//WARRIOR DAMAGE
const warriorDamage = () => {
  const damageWar =  Math.floor(Math.random() * ((warrior.strength * warrior.weaponDmg) - warrior.strength) + warrior.strength);
  return damageWar;
}

//MAGE DAMAGE
const mageDamage = () => {
  const damageMag = Math.floor(Math.random() * ((mage.intelligence * 2) - mage.intelligence) + mage.intelligence);
  return damageMag;
}

const manaCalc = () => {
  mage.mana -= 15;
  if (mage.mana < 15) {
    mage.damage = `Não possui mana suficiente`;
    mage.mana = 0;
  }
  return mage.mana;
}

const mageDamageManaDrain = (mageDamage, manaCalc) => {
  const mageAttackStats = {
    damage: mageDamage(),
    mana: manaCalc(),
  }
  return mageAttackStats;
}

// >>>>>>>>>>>>>>>> EXERCÍCIO BÔNUS PT 2 - GAME ACTIONS SIMULATOR

const gameActions = {
  // TURNO DO WARRIOR
  warriorTurn: (warriorDamage) => {
    warrior.damage = warriorDamage();
    dragon.healthPoints -= warrior.damage, warrior.damage;
  },

  mageTurn: (mageDamageManaDrain) => {
    mage.damage = mageDamageManaDrain(mageDamage, manaCalc).damage;
    mage.mana = mageDamageManaDrain(mageDamage, manaCalc).mana;
    dragon.healthPoints -= mage.damage;
  },

  dragonTurn: (dragonDamage) => {
    dragon.damage = dragonDamage();
    warrior.healthPoints -= dragon.damage;
    mage.healthPoints -= dragon.damage;
    warrior.healthPoints, mage.healthPoints, dragon.damage;
  },

  result: () => battleMembers,
};

gameActions.warriorTurn(warriorDamage);
gameActions.mageTurn(mageDamageManaDrain);
gameActions.dragonTurn(dragonDamage);

console.log(gameActions.result());