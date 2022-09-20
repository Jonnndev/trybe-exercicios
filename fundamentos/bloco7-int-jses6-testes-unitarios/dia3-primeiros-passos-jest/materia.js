// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NA FUNÇÕES TESTES: TESTE = IT;
// RECEBE 3 ARGUMENTOS: NOME DO TESTE + FUNÇÃO EXPECTATIONS + TIMEOUT (OPCIONAL);

// sum.js >>> ESSA PARTE FICA NO ARQUIVO PRINCIPAL:

// const sum = (a, b) => a + b; 

// >>> JA ESSA FICA NO ARQUIVO TESTES:

// test('soma dois valores', () => {
//   expect(sum(2, 3)).toEqual(5);
// });

// module.exports >>> EXPORTA AS FUNÇÕES ESCOLHIDAS NO ARQUIVO PRINCIPAL;

// require() >>> IMPORTA AS FUNÇÕES SELECIONADAS ANTERIORMENTE;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNÇÃO EXPECT
// é utilizada para dar acesso a um conjunto de métodos chamados matchers

// > toBe
// > toEqual (usado para elementos que possuam referência como array e objeto)

// >>> BOOLEANO
// > toBeNull: matches only null
// > toBeUndefined: matches only undefined
// > toBeDefined: is the opposite of toBeUndefined
// > toBeTruthy: matches anything that an if statement treats as true
// > toBeFalsy 

// >>> NUMÉROS
// > toBeGreaterThan
// > toBeGreaterThanOrEqual
// > toBeLessThan
// > toBeLessThanOrEqual

// >>> STRING
// > toMatch

// >>> ARRAY 
// > toContain: contem um item em particular
// > toContainEqual: estrutura mais complexa
// > toHaveLength: verifica tamanho de array ou string

// >>> OBJETO
// > toHaveProperty: verifica uma propriedade específica

// >>>EXCEÇÕES
// > toThrow: teste se uma função é capaz de lançar um erro quando executada
// > toThrowError

// const multiplyByTwo = (number) => {
//   if (!number) {
//     throw new Error('number é indefinido')
//   }
//   return number * 2;
// };
// multiplyByTwo(4);

// test('testa se multiplyByTwo retorna o resultado da multiplicação', () => {
//   expect(multiplyByTwo(4)).toBe(8);
// });
// test('testa se é lançado um erro quando number é indefinido', () => {
//   expect(() => { multiplyByTwo() }).toThrow();
// });
// test('testa se a mensagem de erro é "number é indefinido"', () => {
//   expect(() => { multiplyByTwo() }).toThrowError(new Error('number é indefinido'));
// });

// > not: permite testar o oposto de algo

// const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
// const weekDays = ['Sunday', ...workDays, 'Saturday'];

// test('Sunday is a week day', () => {
//   expect(weekDays).toContain('Sunday');
// });

// test('Sunday is not a workday', () => {
//   expect(workDays).not.toContain('Sunday');
// });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> BLOCO DESCRIBE
// cria um bloco para agrupar vários testes.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COVERAGE
// npm test -- --coverage
