// EXERCICIO 8

// Complete a função handlePokemonSearch de modo que:

// Ao chamar a função getPokemonDetails com um pokémon existente, imprime no console a mensagem com os detalhes deste pokémon.

// Ao chamar a função getPokemonDetails com um pokémon não existente, imprime no console o erro.

const pokemons = [
  {
    name: 'Bulbasaur',
    type: 'Grama',
    ability: 'Raio Solar',
  },
  {
    name: 'Charmander',
    type: 'Fogo',
    ability: 'Lança Chamas',
  },
  {
    name: 'Squirtle',
    type: 'Água',
    ability: 'Jato de Água',
  },
];

function getPokemonDetails(selectedPokemon, callback) {
  const foundPokemon = pokemons.find((pokemon) => pokemon.name === selectedPokemon);

  setTimeout(() => {
    if (foundPokemon === undefined) {
      return callback(new Error('Não temos esse pokémon para você :('), null);
    }

    const { name, type, ability } = foundPokemon;

    const messageFromProfOak = `Olá, seu pokémon é o ${name}, o tipo dele é ${type} e a habilidade principal dele é ${ability}`;

    callback(null, messageFromProfOak);
  }, 2000);
}

const handlePokemonSearch = (error, message) => {
  // Implemente a callback de tratamento de erro
if (message) {
  console.log(message);
} else {
  console.log(error);
}
};

getPokemonDetails('Bulbasaur', handlePokemonSearch);

// - A fim de evitar que futuros treinadores de Pokémon sejam prejudicados, o Professor Carvalho pediu que você o ajude a escrever testes para o sistema que distribui esses Pokémon. Para isso, você deve criar um novo arquivo .test.js ou .spec.js e copiar o código abaixo. Lembre-se de completar os testes para a função getPokemonDetails de acordo com as especificações.

module.exports = { getPokemonDetails };

