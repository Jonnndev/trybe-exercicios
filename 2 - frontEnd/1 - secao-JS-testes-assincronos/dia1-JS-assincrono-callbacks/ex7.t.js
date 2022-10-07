const { uppercase } = require('./ex7');

describe('testa a função "uppercase"', () => {
  it('testa se a função "uppercase" retorna "RECEBA" quando passado esse parâmetro', () => {
    uppercase('receba', (callback) => {
      expect((callback)).toBe('RECEBA');
    });
  });
})
