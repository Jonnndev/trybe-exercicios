// EXERCICIO III

// Dado o array de nomes, utilize o reduce para retornar a quantidade de vezes em que aparece a letra a, maiúscula ou minúscula.

const names = [
  'Aanemarie', 'Adervandes', 'Akifusa',
  'Abegildo', 'Adicellia', 'Aladonata',
  'Abeladerco', 'Adieidy', 'Alarucha',
];

// const expectedResult = 20;

const containsA = (array) => {
  return array.reduce((acc, cur) => {
    let count = 0;
    for (let index in cur) {
      cur[index] === 'A' || cur[index] === 'a' ? count += 1 : count;
    }
    return acc + count;
  }, 0)
}

console.log(containsA(names));

// acc = 1;
// if (letra === 'a' || letra === 'A') {
//   acc += 1;
// }
// return acc;