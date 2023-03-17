======================================== ARQUITETURA DE SOFTWARE ========================================

Quando escrevemos um software seguindo algum modelo arquitetural, temos um ganho de qualidade e de
facilidade de manutenção, pois o código é organizado agrupando as partes que possuem responsabilidades
similares em um mesmo lugar.

======================================== ARQUITETURA MSC ========================================

MSC --> Model Service Controller;

--> Model: Essa camada tem como responsabilidade acomodar todo código capaz de acessar dados sejam eles
em um banco de dados ou no sistema de arquivos. Dessa forma as demais camadas não necessitam saber de 
ual banco de dados, por exemplo, os dados estão sendo armazenados ou recuperados, ou seja, se
utilizarmos um MySQL, um PostgreSQL ou até mesmo um MongoDB, os códigos acomodados nas camadas Service
e Controller não necessitam conhecer esses detalhes;

--> Service: Essa camada tem como responsabilidade validar as regras de negócio de uma aplicação. Imagine
uma API REST que realize o gerenciamento de um almoxarifado e que existe uma regra que diz que deve
ser enviado um email para o setor de compras da empresa quando o estoque de um determinado produto
estiver abaixo de uma quantidade mínima. Códigos que contêm regras desse tipo serão acomodados na
camada Service;

--> Controller: Essa camada tem como responsabilidade validar os valores recebidos de um cliente da
aplicação. Esses valores podem ser, por exemplo, um JSON dentro do corpo da requisição HTTP, parâmetros
de requisição, entre outros.

======================================== CAMADA MODEL ========================================

(!) A camada Model tem como responsabilidade acomodar as entidades da nossa aplicação.

É a camada responsável pelo acesso e pela odelagem dos dados. O ACESSO é feito a partir das funções fornecidas
pelo sistema para realizar as operações necessárias e a MODELAGEM é feita para garantir uma padronização dos
dados do sistema.

======================================== IMPLEMENTANDO CRUD - CAMADA MODEL ========================================

>> UTILIZADO REPO TRYBECAR <<

--> É muito comum que APIs RESTful possuam endpoints para implementar um CRUD de uma tabela, ou seja, endpoints
que permitam cadastrar, listar, buscar algum objeto pelo id, alterar e remover. Portanto a nossa primeira
implementação de um código na camada Model conterá funções que se comuniquem com a tabela passengers. Em paralelo
a isso, abordaremos como implementar testes unitários para cada função desse model.

>>>>> SETUP CAMADA MODEL:

1 - Criar a pasta models (src/models);
2 - Criar o connection.js dentro da pasta models;
3 - Criar o arquivo que conterá o código da camada. Nesse caso foi src/models/passenger.model.js;

>>>>> IMPLEMETAR FUNÇÕES

4 - findAll()

~~~~~~~~~~~~
const camelize = require('camelize');
const connection = require('./connection');
const snakeize = require('snakeize');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM passengers',
  );
  return camelize(result); 
};
~~~~~~~~~~~~

5 - findById()

~~~~~~~~~~~~
const findById = async (passengerId) => {
  const [[passenger]] = await connection.execute(
    'SELECT * FROM passengers WHERE id = ?',
    [passengerId],
  );
  return camelize(passenger);
};
~~~~~~~~~~~~

(!) Note que estamos desestruturando o retorno da função connection.execute em dois níveis (const [[passenger]])
sendo que o primeiro nível retorna o array com as linhas encontradas. Porém, como fazemos uma busca por id, o
retorno dessa consulta sempre retornará uma das duas opções abaixo:

--> Um array com apenas um elemento (caso exista algum registro com o id informado).
--> Ou um array vazio. (caso não exista nenhum registro com o id informado);

6 - insert()

~~~~~~~~~~~~
const insert = async (passenger) => {
  const columns = Object.keys(snakeize(passenger)).join(', ');

  const placeholders = Object.keys(passenger)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO passengers (${columns}) VALUE (${placeholders})`,
    [...Object.values(passenger)],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};
~~~~~~~~~~~~

--> snakeize: Transforma o nome dos atributos para o padrão snake_case.
--> Object.keys: Cria o array com o nome dos atributos.
--> join: Transforma o array criado pelo Object.keys em uma string.

(!) Dessa vez estamos desestruturando o retorno usando [{ insertId }]. Fizemos isso, pois operações do tipo
INSERT, UPDATE e DELETE retornam uma resposta em um formato diferente das operações do tipo SELECT. Dito isso,
a função retorna um array onde o primeiro elemento é objeto que possui alguns atributos, dentre eles o insertId
que é o valor da chave primária gerada pelo banco de dados.

>>>>> ARQUIVO DE EXPORTAÇÃO (BARREL)


--> A ideia do barrel é criar um arquivo index.js na raiz de uma pasta e qualquer recurso de arquivos dessa mesma
pasta vai ser importado através da raiz da pasta.

~~~~~~~~~~~~
// src/models/index.js
const passengerModel = require('./passenger.model');

module.exports = {
  passengerModel,
};
~~~~~~~~~~~~

(!) Dessa FormData, onde for preciso utilizar o model basta importar da seguinte forma: 

const { passengerModel } = require('./models');

>>>>> TESTES UNITÁRIOS PARA AS FUNÇÕES

--> Esse tipo de teste serve para garantir que as nossas modificações no código sejam consistentes, ou seja, não
adicionem bugs. Diferente dos testes de integração cujo objetivo é testar a interação entre diferentes componentes,
os testes de unidade vão testar uma parte específica do código

--> A ideia para realizar o teste da função findAll é verificar se a função connection.execute, ao ser executada,
nos retorna um array com as linhas da tabela passengers. Porém, não é interessante no cenário de testes que o código
se comunique com o banco de dados, por algumas razões:

    1 - Performance: Se durante os testes o código realizar a chamada para o banco de dados isso vai deixar o teste
    mais lento.

    2 - Imprevisibilidade: O banco de dados é um ambiente dinâmico, por isso não temos como ter certeza do que será
    retornado do banco quando uma consulta for executada. O que pode acontecer é que em um determinado momento, ao
    rodar os testes, a tabela pode ter um número específico de linhas, e ao executar os testes novamente em outro
    momento, a mesma tabela pode ter um número diferente de linhas da primeira execução, pois houve interações de
    pessoas usuárias com o banco entre cada execução. Como no teste precisamos fazer asserções, não é possível usar
    ]a resposta real do banco como um parâmetro.

    SETUP TESTES:

    1 - PREPARAR MOCK
    2 - IMPLEMENTAR O TESTE:

    ~~~~~~~~~~~~
    const { expect } = require('chai');
    const sinon = require('sinon');
    const { passengerModel } = require('../../../src/models');
    const connection = require('../../../src/models/connection');
    const { passengers, newPassenger } = require('./mocks/passenger.model.mock');

    describe('Testes de unidade do model de pessoas passageiras', function () {
      
      it('Recuperando a lista de pessoas passageiras', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([passengers]);
        // Act
        const result = await passengerModel.findAll();
        // Assert
        expect(result).to.be.deep.equal(passengers);
      });

      it('Recuperando uma pessoa passageira a partir do seu id', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([[passengers[0]]]);
        // Act
        const result = await passengerModel.findById(1);
        // Assert
        expect(result).to.be.deep.equal(passengers[0]);
      });

      it('Cadastrando uma pessoa passageira', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
        // Act
        const result = await passengerModel.insert(newPassenger); // >> newPassenger foi criado no mesmo arquivo do mock
        // Assert
        expect(result).to.equal(42);

      afterEach(function () {
        sinon.restore();
      });
    });
    ~~~~~~~~~~~~

    (!) PADRÃO TRIPLE A:
    
    --> Arrange (arranjo): considera a configuração de tudo que é necessário para a execução do teste, geralmente é
    aqui que são definidos os dublês para funções chamadas dentro da função que será testada no caso de uso.
    
    --> Act (ação): define a execução do teste por meio da chamada de uma função sob teste;

    --> Assert (asserção): estabelece a verificação do resultado do teste, resultando na falha ou sucesso do mesmo.

    # O arranjo é feito na primeira linha dentro do it e serve para definir que estamos usando um dublê para a função
    connection.execute e que nesse cenário o seu retorno será um array com a lista de pessoas passageiras ([passengers])

    # O próximo passo é definir a ação, que nesse caso é chamar a função passengerModel.findAll() e guardar seu retorno
    na variável result.

    # Na última linha do it, fazemos a asserção para comparar se o valor da variável result é igual ao valor da variável
    passengers. Usamos o matcher to.be.deep.equal, pois nesse caso estamos comparando dois arrays (result e passengers).

======================================== COBERTURA DE TESTES COM NYC ========================================

--> Instalar nyc: npm install -D -E nyc@15.1.0

--> Add script package.json: 

~~~~~~~~~~~~
"scripts": {
  "test:coverage": "nyc --all --include src/models --include src/services --include src/controllers mocha tests/unit/**/*.js --exit"
},
~~~~~~~~~~~~

======================================== PROMISSE ALL ========================================

--> Promise.all é um método que recebe um array de Promises e devolve uma única Promise, que será resolvida a partir do
retorno de todas as outras.