============================================ INTRODUÇÃO A TESTES DE INTEGRAÇÃO ============================================

TIPOS DE TESTES:

--> Testes unitários: consideram um escopo limitado a um pequeno fragmento do seu código com interação mínima
    entre recursos externos.

--> Testes de integração: presumem a junção de múltiplos escopos (que tecnicamente devem possuir, cada um, seus
    próprios testes) com interações entre eles.

--> Testes de ponta-a-ponta: também chamados de Fim-a-fim (End-to-End; E2E), pressupõem um fluxo de interação
    completo com a aplicação, de uma ponta a outra.

============================================ TESTES AUTOMATIZADOS ============================================

FERRAMENTAS: 

--> Jest: foi originalmente projetado para o React, mas funciona em outros projetos Javascript. Outra
característica do Jest é que ele é focado principalmente em testes de unidade e na simplicidade e não requer
nenhuma configuração, ou seja, após sua instalação, ele está preparado para ser utilizado. Os testes são
paralelos e executados em seus próprios processos para maximizar o desempenho. Possui suporte integrado para
execução automática de testes a cada alteração no código. Mas não oferece suporte a testes assíncronos.

--> Mocha: originalmente projetado para o Node.js. É focado em vários tipos de testes, como unidade,
integração e ponta a ponta (E2E). Diferente do Jest, requer outras bibliotecas para funcionar, como o chai e
o sinon. E, apesar de demandar mais trabalho para configurar e adicionar funcionalidades, esta enorme
flexibilidade e uma variedade de recursos adicionais prontos para uso, fornecem ferramentas para um
desenvolvedor experiente, principalmente em grandes projetos Node.js. Além disso o Mocha suporta testes
assíncronos e é um framework mais antigo e mais maduro do que o Jest, presente em diversos projetos.

(!) Os testes do Mocha são executados em série, permitindo relatórios flexíveis e precisos, enquanto mapeia
exceções não capturadas para os casos de teste corretos. E para complementar os testes do Mocha temos o chai,
que é uma biblioteca de asserção, e o sinon, que implementa dubles de teste, como: spies, stubs e mocks.


Install Mocha: npm install mocha@8.4.0 chai@4.3.4 --save-dev --save-exact

============================================ ESTRUTURANDO TESTES COM MOCHA  ============================================

Precisamos definir o que estamos testando em um caso específico. Para isso, o mocha nos fornece duas palavras
reservadas: o describe e o it.

--> describe: como o próprio nome já diz, nos permite adicionar uma descrição para um teste específico ou um
grupo de testes.

--> it: nos permite sinalizar exatamente o cenário que estamos testando naquele ponto.

(!) DIFERENTE DO RTL: Usamos a sintaxe function ao invés de arrow functions. Essa sintaxe é uma recomendação
da própria documentação do mocha. O uso da arrow function pode restringir o acesso ao contexto de como o mocha
trabalha por baixo dos panos.

~~~~~~~~
describe('Quando a média for menor que 7', function () {
  it('retorna "reprovação"', function () {
    //
  });
});
~~~~~~~~

============================================ AFERINDO TESTES COM O CHAI  ============================================

chai: nos ajuda com as asserções, ou seja, ele nos fornece maneiras de dizermos o que queremos testar validando
se o resultado condiz com o esperado.

~~~~~~~~
const { expect } = require('chai');
const resposta = calculaSituacao(4);

expect(resposta).equals('reprovação');
~~~~~~~~

O chai nos fornece outros getters encadeáveis que possuem um papel puramente estético:

~~~~~~~~
const { expect } = require('chai');

const calculaSituacao = require('../examples/calculaSituacao');

describe('Quando a média for menor que 7', function () {
  it('retorna "reprovação"', function () {
    const resposta = calculaSituacao(4);

    expect(resposta).to.be.equals('reprovação'); <<<<<<<
  });
});
~~~~~~~~

============================================ TESTES DE INTEGRAÇÃO ============================================


(!) Em uma API, o conceito definido por essas regras é chamado de contrato. O contrato define aquilo que foi
    previamente acordado, ou seja, como a API deverá se comportar em um determinado cenário.

CONTRATO: ao chamar um endpoint GET /users/:userId, passamos um ID de pessoa usuária e esperamos receber os
          dados referentes àquele pessoa com um código http 200 - OK. Caso a pessoa usuária não seja encontrada,
          esperamos receber um status http 404 - Not Found


-> Esse conceito trabalha muito bem junto com os testes de integração, pois podemos testar se cada contrato
   está sendo cumprido após o processamento de todas as funções internas de um endpoint.


Install Mocha: npm install mocha@8.4.0 chai@4.3.4 --save-dev --save-exact
Install Chai HTTP: npm install chai-http@4.3.0 --save-dev --save-exact
Install Sinon: npm install sinon@11.1.1 --save-dev --save-exact






