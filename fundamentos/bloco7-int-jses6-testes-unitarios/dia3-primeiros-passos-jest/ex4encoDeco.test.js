const { encode, decode } = require('./ex4encoDeco');

describe('Exercício 4', () => {
  it('Teste 1: testa se enconde e decode são funções', () => {
    expect(typeof encode && typeof decode).toBe('function');
  });
  it('Teste 2: testa se as vogais a, e, i, o, u são convertidas em 1, 2, 3, 4 e 5, respectivamente', () => {
    expect(encode('a, e, i, o, u')).toBe('1, 2, 3, 4, 5');
  });
  it('Teste 3: testa se os números 1, 2, 3, 4 e 5 são convertidos nas vogais a, e, i, o, u, respectivamente', () => {
    expect(decode('1, 2, 3, 4, 5')).toBe('a, e, i, o, u');
  });
  it('Teste 4: testa se as demais letras/números não são convertidos para cada caso', () => {
    expect(encode('6, 7, j, k, l')).not.toBe('a, e, 3, 4, 5');
  });
  it('Teste 5: testa se a string que é retornada pelas funções tem o mesmo número de caracteres que a string passada como parâmetro', () => {
    expect(encode('paralelelo').length).toBe(10);
  });
  it('Teste 5.1: testa se a string que é retornada pelas funções tem o mesmo número de caracteres que a string passada como parâmetro', () => {
    expect(encode('paralelepipedo').length).toBe(14);
  });
})