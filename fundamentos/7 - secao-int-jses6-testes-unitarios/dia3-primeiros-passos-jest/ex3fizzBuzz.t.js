const myFizzBuzz = require('./ex3fizzBuzz');

describe('Exercício 3', () => {
  it('Teste 1: testa se 15 é divisivel por 3 e por 5 e retorna "fizzbuzz"', () => {
    expect(myFizzBuzz(15)).toMatch('fizzbuzz');
  });
  it('Teste 2: testa se 9 é divisivel apenas por 3 e retorna "fizz"', () => {
    expect(myFizzBuzz(9)).toMatch('fizz');
  });
  it('Teste 3: testa se 55 é divisivel apenas por 5 e retorna "buzz"', () => {
    expect(myFizzBuzz(55)).toMatch('buzz');
  });
  it('Teste 4: testa se 17 não é divisivel por 3 e nem por 5 e retorna 17', () => {
    expect(myFizzBuzz(17)).toBe(17);
  });
  it('Teste 5: testa se um parâmetro não númerico retorna false', () => {
    expect(myFizzBuzz('bojo')).toBeFalsy();
  });
})