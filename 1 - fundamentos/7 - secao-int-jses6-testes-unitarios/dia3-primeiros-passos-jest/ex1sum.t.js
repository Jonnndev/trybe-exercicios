const sum = require('./ex1sum');

// EXERCICIO 1

describe('Exercício 1', () => {
  it('Teste 1: soma os valores 4 e 5, retornando 9.', () => {
    expect(sum(4, 5)).toBe(9);
  });
  it('Teste 2: soma os valores 0 e 0, retornando 0.', () => {
    expect(sum(0, 0)).toBe(0);
  });
  it('Teste 3: testa se a função lança um erro quando soma 5 e uma STRING qualquer.', () => {
    expect(() => (sum(5, '5')).toThrow(Error));
  });
  it('Teste 4: testa se a mensagem de Erro é “parameters must be numbers”', () => {
    expect(() => (sum(5, '5')).toThrowError('parameters must be numbers'));
  });
})
