const myRemove = require('./ex2remove');

// EXERCICIO 2

describe('Exercício 2', () => {
  const arr = [1, 2, 3, 4];
  it('Teste 1: remove do array [1, 2, 3, 4] o item 3 passado como parâmetro.', () => {
    expect([1, 2, 4]).toEqual(myRemove(arr, 3));
  });
  it('Teste2: verifica se myRemove([1, 2, 3, 4], 3) não retorna o array [1, 2, 3, 4]', () => {
    expect ([1, 2, 3, 4]).not.toEqual(myRemove(arr, 3));
  })
  it('Teste3: verifique se myRemove([1, 2, 3, 4], 5) retorna o array esperado', () => {
    expect ([1, 2, 3, 4]).toEqual(myRemove(arr, 5));
  })
})
