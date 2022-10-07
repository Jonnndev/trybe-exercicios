const { exportAllDeclaration } = require('@babel/types');
const { getPokemonDetails } = require('./ex8');

describe('A função getPokemonDetails', () => {
  it('retorna erro quando procuramos um pokémon que não existe no banco de dados', () => {
    getPokemonDetails('Mingau', (handlePokemonSearch) => {
      expect((handlePokemonSearch)).toBe('Não temos esse pokémon para você :(');
    })
  });
  it('retorna um pokémon que existe no banco de dados', () => {
    getPokemonDetails('Bulbasaur', (handlePokemonSearch) => {
      expect((handlePokemonSearch)).toBe('Olá, seu pokémon é o Bulbasaur, o tipo dele é Grama e a habilidade principal dele é Raio Solar');
    })
  });
});

