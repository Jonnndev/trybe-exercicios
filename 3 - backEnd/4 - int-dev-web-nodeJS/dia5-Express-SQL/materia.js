=========================================== EXPRESS E MYSQL ===========================================
=========================================== MYSQL NO DOCKER ===========================================

~~~~~~~~~~~
//docker-compose.yaml
version: '3'
services:
  database:
    image: mysql:8.0.29
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: trybecashdb
    ports:
      - "33060:3306"
~~~~~~~~~~~

- Esse docker-cpmpose inicializará um container Docker com a imagem do Servidor MySQL versão 8.0.29.

- O parâmetro restart define a política de reinício do container como always. Assim, o container sempre
será reiniciado automaticamente em caso de parada. Na seção environment foi definido o valor de duas
variáveis dentro do container:

--> MYSQL_ROOT_PASSWORD: Essa variável define a senha do usuário root do MySQL (será a senha que utilizaremos
    para acessar o MySQL);

--> MYSQL_DATABASE: Essa variável define o nome do banco de dados que será criado ao iniciar MySQL, caso
    ele não exista.

- Já a seção ports está vinculando uma porta do seu computador local (a porta 33060) a uma porta dentro
do container (a porta 3306).

Para iniciar nossos containers, precisaremos criar um arquivo chamado Dockerfile na raiz do projeto,
com o seguinte conteúdo:

~~~~~~~~~~~
FROM node:16

# o expose serve apenas para sinalizar em qual porta rodaremos o container
# a definição da porta se dá no arquivo docker-compose.yaml
EXPOSE 3000

WORKDIR /

# aqui copiamos apenas o package.json e o package-lock.json, pois assim
# garantimos que quando as dependências forem instaladas, suas versões não vão ser alteradas.
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
~~~~~~~~~~~

Configurar um container para rodar nossa aplicação Node.js em nosso arquivo docker-compose.yaml:

~~~~~~~~~~~
version: '3'
services:
  node:
    # Faz o docker construir (build) de uma imagem personalizada
    # baseada no arquivo Dockerfile
    build: 
      dockerfile: ./Dockerfile
      context: .
    # Nome do container para facilitar execução
    container_name: trybecash_api
    # Restarta a imagem caso algo a faça parar
    restart: always
    # Diretório padrão de execução
    working_dir: /app
    # Lista de volumes (diretórios) mapeados de fora para dentro do container
    volumes:
      # Monta o diretório atual, com todos os dados da aplicação, dentro do diretório /app
      - ./:/app
    ports:
      # Expõe a porta padrão da aplicação: altere aqui caso use outra porta
      # na notação porta_de_fora:porta_de_dentro
      - 3000:3000
    # Informa ao docker, para que o container node seja iniciado após o container database
    depends_on:
      - "database"

  database:
    image: mysql:8.0.29
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: trybecashdb
    ports:
      - "33060:3306"
~~~~~~~~~~~

=========================================== API TRYBECASH ===========================================

--> Tabelas:

~~~~~~~~~~~
USE trybecashdb; // --> Criação da tabela implementada no docker-compose

CREATE TABLE people (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    phone VARCHAR(20),
    PRIMARY KEY(id),
    UNIQUE(email)
);

CREATE TABLE transactions(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    type INT NOT NULL,
    person_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_transaction_person_id FOREIGN KEY (person_id)
    REFERENCES people(id)
);

CREATE TABLE logs(
    id INT NOT NULL AUTO_INCREMENT,
    event VARCHAR(100) NOT NULL,
    timestamp BIGINT NOT NULL,
    person_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_logs_person_id FOREIGN KEY (person_id)
    REFERENCES people(id)
);
~~~~~~~~~~~

(!) Para subir a imagem do MySQL já com as tabelas criadas, podemos utilizar um dump. Assim,
faremos a automatização desse processo de criação do banco de dados através do seu arquivo
docker-compose. Isso é importante em casos em que, por exemplo, vamos utilizar uma base de
dados já existente.

1 - Salar o script acima em um arquivo chamado trybecash_script.sql na sua pasta raiz de sua aplicação
(onde está o arquivo docker-compose).

2 - Alterar o nosso arquivo docker-compose.yaml e fazer, na opção volumes, o espelhamento do nosso script
.sql na pasta docker-entrypoint-initdb.d. Essa alteração fará com que as tabelas já sejam criadas no
momento em que subirmos o container. 

~~~~~~~~~~~
//docker-compose
version: '3'
services:
  node:
    build:
      dockerfile: ./Dockerfile
      context: .
    container_name: trybecash_api
    restart: always
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - 3000:3000
    depends_on:
      - "database"

  database:
    image: mysql:8.0.29
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: trybecashdb
    ports:
      - "33060:3306"
    volumes:
    - ./trybecash_script.sql:/docker-entrypoint-initdb.d/trybecash_script.sql
~~~~~~~~~~~

=========================================== CONFIGURANDO MYSQL NO EXPRESS ===========================================

npm i express@4.17.1 mysql2@2.3.3 --save-exact

--> A novidade aqui está no módulo (ou drive) mysql2, responsável por permitir que uma aplicação
Node.js consiga comunicar-se com o MySQL. Comumente chamamos esse tipo de biblioteca (que permite
nossa aplicação conversar com banco de dados) de client, o qual possui todo o código necessário
para enviarmos comandos SQL para o nosso banco de dados, no caso o MySQL, e recebermos as
respostas dos comandos enviados.

Precisaremos criar em nossa aplicação o arquivo src/db/connection.js, que será responsável por
realizar a conexão com o servidor MySQL utilizando a biblioteca mysql2:

~~~~~~~~~~~
// src/db/connection.js

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  port: 33060,
  user: 'root',
  password: 'root',
  database: 'trybecashdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
~~~~~~~~~~~

No trecho de código acima estamos importando a biblioteca mysql2 com o recurso de promises.
Isso permitirá utilizar o MySQL de forma assíncrona com async/await. Em seguida, criamos
uma constante connection que recebe um pool de conexões criado com a função createPool.

Um pool de conexões é um repositório que contém um conjunto de conexões estabelecidas
previamente com o banco de dados. Essas conexões serão reutilizadas durante a execução
da aplicação conforme a necessidade. Em outras palavras, quando uma operação no banco
de dados for necessária nossa aplicação irá:

1- Requisitar uma conexão no pool de conexões;
2 - Utilizar essa conexão para enviar uma operação SQL ao servidor MySQL;
3 - Devolver a conexão para o pool de conexões ao final da operação com o MySQL;
4 - Tornar a conexão disponível para ser utilizada em requisições futuras

(!) O uso do pool de conexões é encorajado, pois sem ele, para cada operação com o MySQL uma
conexão seria aberta e, após seu uso, seria fechada. Assim, seria necessário abrir novamente
uma nova conexão com o MySQL para executar uma nova operação. E abrir uma nova conexão com o
MySQL demanda tempo, adicionando um atraso para cada requisição da API como consequência.


--> criar o arquivo src/app.js com o seguinte conteúdo:

~~~~~~~~~~~
// src/app.js

const express = require('express');

const app = express();

app.use(express.json());

module.exports = app;
~~~~~~~~~~~

No código acima estamos criando as definições do express. Vale ressaltar que a função app.listen()
não está sendo executada no arquivo src/app.js. Contudo, estamos realizando um module.exports na
constante app que inicializa o express e registra os middlewares que serão utilizados inicialmente.

A razão disso é que quando formos escrever nossos testes de integração, a definição de inicialização,
rotas e middlewares do express, devem estar separadas da inicialização dele. Isso nos permitirá criar
um mock das nossas rotas facilitando o processo de testar nossa API.

Nesse ponto entra o nosso arquivo src/server.js, no qual adicionaremos o seguinte conteúdo:

~~~~~~~~~~~
// src/server.js
const app = require('./app');
const connection = require('./db/connection');

const PORT = 3001;

app.listen(PORT, async () => {
  console.log(`API TrybeCash está sendo executada na porta ${PORT}`);

  // O código abaixo é para testarmos a comunicação com o MySQL
  const [result] = await connection.execute('SELECT 1'); // Desestruturação!
  if (result) {
    console.log('MySQL connection OK');
  }
});
~~~~~~~~~~~

Acima, criamos uma constante app que importa o que foi definido no arquivo src/app.js e,
a partir dessa constante, iniciamos o nosso express executando a função app.listen().

(!) Dentro da função app.listen() foi adicionado um trecho de código que executa a função
    connection.execute(), que recebe como parâmetro uma consulta SQL SELECT 1. Essa função 
    ealiza uma conexão com o MySQL, executa o SQL passado como parâmetro e recebe uma
    resposta que é armazenada na constante result 

=========================================== PRIMEIRO TESTE ===========================================

Instalação das dependências mocha, chai, sinon e chai-http:

npm i mocha@10.0.0 chai@4.3.6 sinon@14.0.0 chai-http@4.3.0 -D

--> O fluxo se dará da seguinte maneira:

1 - Primeiramente receberemos uma requisição para o endpoint POST /people. Essa requisição terá no seu
    corpo um JSON com os dados a serem cadastrados no banco de dados similar ao seguinte:

    {
      "firstName": "Luke",
      "lastName": "Skywalker",
      "email": "luke.skywalker@trybe.com",
      "phone": "851 678 4453"
    }

2 - Em seguida, o express passará o JSON recebido na requisição para um componente de software
    que irá enviar uma declaração SQL INSERT para o MySQL;

3 - Após o envio do comando SQL inserção da pessoa no MySQL, receberemos uma resposta do MySQL 
    sobre a operação;
    
4 - Enviamos a resposta para a requisição com o código de estado 201 se a operação ocorreu com
    sucesso, ou o código de estado 500 caso algum erro ocorrer durante o processo de cadastro
    da pessoa no MySQL.

Nesse ponto vamos criar o subdiretório tests/integration, que conterá os nossos testes de integração. 

~~~~~~~~~~~
//  tests/integration/people.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/db/connection');

const { expect, use } = chai;

use(chaiHttp);

describe('Testando os endpoints de people', function () {
  it('Testando o cadastro de uma pessoa ', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const response = await chai
      .request(app)
      .post('/people')
      .send(
        {
          firstName: 'Luke',
          lastName: 'Skywalker',
          email: 'luke.skywalker@trybe.com',
          phone: '851 678 4453',
        },
      );

    expect(response.status).to.equal(201);
    expect(response.body).to.
      deep.equal({ message: 'Pessoa cadastrada com sucesso com o id 42' });
  });

  afterEach(sinon.restore);
});
~~~~~~~~~~~

--> Em seguida são criadas as variáveis app e connection que fazem referência aos módulos
src/app.js e src/db/connection.js. Teremos apenas um describe que agrupará os testes
relacionados ao endpoint people.

--> Dentro do describe criado, temos um caso de teste (declaração it) que realiza duas tarefas:

    1 - Cria um stub com o sinon na função execute de connection, de maneira que quando essa função for
        chamada no teste, ela retornará um array contendo um objeto com a chave insertId com o valor 42.

    2 - Uma requisição ao endpoint POST /people passando um JSON com os dados da pessoa a ser cadastrada
        no corpo da requisição.

--> Também foi adicionado um afterEach após a declaração it, que desfaz o stub criado, fazendo com que
    o método execute de connection se comporte conforme nossa implementação.

    (!) Nós temos acesso ao método execute através da biblioteca mysql2, que possui seus testes de
        integração e testes unitários. Como a biblioteca mysql2 realiza os testes nas funções que ela
        disponibiliza, podemos assumir em nossos testes que, da chamada da função connection.execute()
        em diante, tudo está sendo testado!

Para podermos executar o nosso teste (e ele falhar), temos que alterar a chave test dos scripts do
package.json:

~~~~~~~~~~~
{
  ...
  "scripts": {
    ...
    "test": "mocha tests/**/*$NAME*.test.js --exit"
  },
  ...
}
~~~~~~~~~~~

=========================================== ENDPOINT DE CADASTRO DE PESSOAS ===========================================

Criar um subdiretório chamado routes dentro de src para armazenar os arquivos com as rotas do nosso
projeto:

~~~~~~~~~~~
// src/routes/peopleRoutes.js

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const person = req.body;
  res.status(201).json(person);
});

module.exports = router;
~~~~~~~~~~~

--> No trecho de código acima, estamos criando o endpoint POST /. No corpo da requisição é esperado um
arquivo JSON (o mesmo que definimos no teste de integração) e simplesmente retornamos o mesmo JSON
como resposta, cujo código de estado é igual a 201.

Vamos adicionar o seguinte trecho de código para que o express publique nossa rota:

~~~~~~~~~~~
// src/app.js

// const express = require('express');
const peopleRoutes = require('./routes/peopleRoutes');

// const app = express();

// app.use(express.json());

app.use('/people', peopleRoutes);

// module.exports = app;
~~~~~~~~~~~

--> No trecho de código acima:

  1 - Adicionamos uma variável peopleRoutes com o router exportado no arquivo src/routes/peopleRoutes.js;
  2 - Adicionamos esse middleware definindo que toda requisição em que o path comece com /people seja
      encaminhada para ele.

# REALIZANDO COMUNICAÇÃO COM O MYSQL:

Vamos criar arquivo src/db/peopleDB.js, que tem como responsabilidade agrupar todas as
operações SQL relacionadas a tabela people. 

~~~~~~~~~~~
// src/db/peopleDB.js

const conn = require('./connection');

const insert = (person) => conn.execute(
    `INSERT INTO people 
      (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`,
    [person.firstName, person.lastName, person.email, person.phone],
  );

module.exports = {
  insert,
};
~~~~~~~~~~~

--> Inicialmente importamos a conexão com o MySQL do nosso outro módulo e, em seguida, editamos a função
    insert para receber como parâmetro um objeto person. Nela escrevemos o código referente a um INSERT
    no banco de dados. Então, chamamos a função conn.execute(), a qual recebe dois parâmetros:

  1 - Uma string que contém um INSERT de dados na tabela people. Note que a string foi definida
      utilizando-se crase para possibilitar a quebra de linhas, mas pode-se utilizar as aspas
      simples ou duplas;
  
  2 - Um array de valores que são extraídos do objeto person;

(!) Esses símbolos de interrogação são chamados de placeholders (ou marcadores, em português).
    Sua função é de justamente marcar os locais que serão substituídas pelos valores dentro da
    consulta SQL.
  
(!) Os valores são justamente os valores do array que passamos como segundo parâmetro da função
    conn.execute()! A chamada da função conn.execute() com os dois parâmetros citados é o que
    caracteriza uma prepared statement no mysql2.

IMPORTANTE: 

--> Podemos pensar nas Prepared Statements como um template ou um molde para consultas SQL que uma
    aplicação deseja executar, e que pode ser customizado utilizando variáveis de parâmetros
    (os placeholders ou marcadores). Isso nos oferece dois grandes benefícios:

      1 - As consultas SQL só necessitam ser preparadas uma única vez, entretanto podem ser executadas
          múltiplas vezes com os mesmos parâmetros ou com parâmetros diferentes. Quando uma consulta é
          preparada, o banco de dados irá analisar, compilar e otimizar a execução da consulta;

      2 - Os parâmetros das prepared statements não devem ser vinculadas diretamente na consulta SQL
          (utilizando concatenação de string, por exemplo). O recurso das prepared statements identifica
          os parâmetros para o banco de dados, evitando que ele erroneamente interprete strings como parte
          da consulta. Se uma aplicação utiliza prepared statements em todas as operações que realiza com
          o banco de dados, essas operações estão seguras contra o ataque do tipo SQL injection.

--> Agora que temos uma prepared statement para inserir uma pessoa, vamos refatorar o endpoint POST /
    para que ele consiga realizar o cadastro de uma pessoa no banco de dados:

~~~~~~~~~~~
// src/routes/peopleRoutes.js

// const express = require('express');
const peopleDB = require('../db/peopleDB');

// const router = express.Router();

router.post('/', async (req, res) => {
  const person = req.body;
  try {
    const [result] = await peopleDB.insert(person);
    res.status(201).json({
      message: `Pessoa cadastrada com sucesso com o id ${result.insertId}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' });
  }
});
// module.exports = router;
~~~~~~~~~~~

--> No código acima, importamos o módulo de src/db/peopleDB.js. No endpoint POST /, criamos a variável
    person para receber os dados da pessoa a ser cadastrada.

--> Em seguida, temos um bloco try/catch responsável por responder a requisição. Dentro do bloco try é
    utilizada a função insert passando como parâmetro os dados recebidos na requisição e, por conta do
    await, aguardamos a inserção da pessoa no banco de dados.

--> Se a inserção ocorrer com sucesso, é retornada uma resposta com o status 201 e com um JSON contendo
    uma mensagem indicando o sucesso da operação.

--> Em caso de erro, ele é impresso no terminal via console.log e é retornada uma resposta com o status
    500 e com um JSON contendo uma mensagem indicando a falha na operação.

=========================================== ENDPOINT DE LISTAGEM DE PESSOAS ===========================================

Novas rotas:

~~~~~~~~~~~
router.get('/', async (_req, res) => {
  try {
    const [result] = await peopleDB.findAll(); // --> retorna uma array com 2 arrays, por isso desestrutura
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [[result]] = await peopleDB.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
});
~~~~~~~~~~~

--> O código acima adiciona dois novos endpoints GET / e GET /:id. O novo endpoint GET / contém um
    bloco try/catch, que é responsável por responder a requisição. Dentro do bloco try temos uma chamada
    para a função findAll (ainda não foi implementada no arquivo src/db/peopleDB.js, mas o faremos em breve),
    que retorna uma Promise (por isso temos um await aqui) e realiza a desconstrução da resposta, armazenando
    na constante result.

--> A constante result contém a lista de pessoas e a mesma é retornada como resposta. Caso ocorra algum
    erro durante a requisição, o bloco catch responderá com um código de estado 500 e a mensagem de erro
    do mysql2.

--> Já o endpoint GET /:id também contém um bloco try/catch, que é responsável por responder a requisição
    também! Dentro do bloco try temos uma chamada para a função findById (ainda não foi implementada no 
    arquivo src/db/peopleDB.js, mas o faremos em breve), que recebe o parâmetro de requisição id
    (obtido da desestruturação de req.params) e retorna uma Promise (por isso temos também um await aqui),
    realizando a desestruturação da resposta e armazenando na constante result.

--> A constante result contém um array de pessoas. Porém, nesse endpoint essa lista pode ter nenhum
    objeto (situação na qual não existe uma pessoa no banco de dados com o id passado como parâmetro)
    ou um objeto. Por essa razão temos um bloco if/else para avaliar se o tamanho do array result é
    maior que zero.

--> Se o tamanho do array result for maior que zero, uma pessoa foi encontrada no banco de dados e é
    retornada como resposta da requisição com código de estado 200. Caso contrário, será retornada como
    resposta da requisição uma mensagem com status 404 indicando que uma pessoa não foi encontrada.

--> Se executarmos os nossos testes com o comando npm test novamente, eles irão falhar e apresentar uma
    mensagem de erro indicando que findAll e findById não são funções. O motivo desse erro é que
    realizamos a chamada dessas funções no arquivo src/routes/peopleRoutes.js, mas não as
    criamos no arquivo src/db/peopleDB.js 

Vamos adicionar a definição das funções findAll e findById no arquivo src/db/peopleDB.js com o código
necessário para realizar as consultas no banco de dados:

~~~~~~~~~~~
// const conn = require('./connection');
// ...

const findAll = () => conn.execute('SELECT * FROM people');

const findById = (id) => conn.execute('SELECT * FROM people WHERE id = ?', [id]);

// module.exports = {
//   insert,
  findAll,
  findById,
// };
~~~~~~~~~~~

1 - A função findAll realiza uma consulta no banco de dados, que retorna todas as pessoas cadastradas;

2 - A função findById realiza uma consulta no banco de dados, que retorna uma pessoa tendo como critério
    o valor do seu id.

=========================================== ENDPOINT DE ATUALIZAÇÃO E EXCLUSÃO ===========================================

Testes adicionados:

~~~~~~~~~~~
it('Testando a alteração de uma pessoa com o id 1', async function () {
  sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
  const response = await chai
    .request(app)
    .put('/people/1')
    .send(
      {
        firstName: 'Lucão',
        lastName: 'Andarilho dos céus',
        email: 'lucao.andarilho@trybe.com',
        phone: '851 678 4453',
      },
    );

  expect(response.status).to.equal(200);
  expect(response.body).to
    .deep.equal({ message: 'Pessoa de id 1 atualizada com sucesso' });
});

it('Testando a exclusão da pessoa com id 1', async function () {
  sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
  const response = await chai
    .request(app)
    .delete('/people/1');

  expect(response.status).to.equal(200);
  expect(response.body).to
    .deep.equal({ message: 'Pessoa de id 1 excluída com sucesso' });
});
~~~~~~~~~~~

=========================================== VARIVÁVEIS AMBIENTE ===========================================

(!) Quando o seu código for versionado em um repositório GitHub, por exemplo, esses dados estarão lá e se o
    repositório for PÚBLICO, todas as pessoas que olharem o arquivo src/repository/connection.js verão os
    dados utilizados para conectar ao servidor MySQL. Agora imagine se as credenciais existentes nesse
    arquivo forem dados de um servidor MySQL de produção ao qual apenas pessoas autorizadas deveriam ter
    acesso? Nesse caso as credenciais estão visíveis no GitHub! Seria um caos! 

--> Uma variável de ambiente é um recurso disponível nos sistemas operacionais que permite criar uma
    variável no formato NOME_DA_VARIÁVEL=VALOR, onde NOME_DA_VARIÁVEL é o nome da variável de ambiente,
    e VALOR se refere a um valor que será vinculado à variável. Toda vez que solicitarmos ao sistema
    operacional o valor de uma variável de ambiente, fornecemos a ele uma NOME_DA_VARIÁVEL e ele 
    etorna o VALOR associado a esta chave, se ela estiver definida.

    (!) A solução para nosso dilema será criar variáveis de ambiente para as configurações de acesso
        ao servidor de banco de dados e ler os valores através do objeto process.env.

1 - Criar na raiz do projeto um arquivo .env:

MYSQL_HOST=localhost
MYSQL_PORT=33060
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE_NAME=trybecashdb
MYSQL_WAIT_FOR_CONNECTIONS=true
MYSQL_CONNECTION_LIMIT=10
MYSQL_QUEUE_LIMIT=0

--> Agora é necessário extrair o conteúdo do arquivo .env e adicioná-lo ao ambiente do sistema 
    operacional. Em sistema baseados em UNIX podemos fazer isto através do comando env $(cat .env).
    Desta forma é possível adicionar temporariamente as variáveis contidas no arquivo .env às variáveis
    do sistema operacional.

2 - Atualizar os arquivos:

~~~~~~~~~~~
// src/db/connection.js
// ...
// const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME,
  waitForConnections: process.env.MYSQL_WAIT_FOR_CONNECTIONS,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  queueLimit: process.env.MYSQL_QUEUE_LIMIT,
// });

// module.exports = connection;
~~~~~~~~~~~
{
  // ...
  //   "main": "src/server.js",
  //   "scripts": {
      "start": "env $(cat .env) node src/server.js",
      "dev": "env $(cat .env) nodemon src/server.js",
      "test": "env $(cat .env) mocha tests/**/*$NAME*.test.js --exit"
  //   },
  // ...
  }
~~~~~~~~~~~

--> FORMA COMBINADA DO DOCKER-COMPOSE:

// #version: '3'

// services:
//   node:
//       Faz o docker construir (build) de uma imagem personalizada
//       baseada no arquivo Dockerfile
//      build: 
//        dockerfile: ./Dockerfile
//        context: .
//       Nome do container para facilitar execução
//      container_name: trybecash_api
//       Restarta a imagem caso algo a faça parar
//      restart: always
//       Diretório padrão de execução
//      working_dir: /app
//       Lista de volumes (diretórios) mapeados de fora para dentro do container
//      volumes:
//         Monta o diretório atual, com todos os dados da aplicação, dentro do diretório /app
//        - ./:/app
//      ports:
//         Expõe a porta padrão da aplicação: altere aqui caso use outra porta
//         na notação porta_de_fora:porta_de_dentro
//        - 3000:3000
//       Informa ao docker, para que o container node seja iniciado após o container database
//      depends_on:
//        - "database"
//       adicionando o atributo environment com uma lista de variáveis
//       com suas respectivas chaves e valores      
     environment:
       //  O valor dessa variável deve ser o nome do serviço do docker-compose
       //  que roda o mysql, neste caso database e não mais localhost.
       - MYSQL_HOST=database 
       //  A porta aqui é 3306 e não 33060 pois nesse caso estamos informando
       //  o valor de um container (node) para outro (database)
       - MYSQL_PORT=3306
       //  Aqui é o valor do nome de usuário que por padrão é root.
       - MYSQL_USER=root
       //  o valor desta variável de ambiente ser igual ao valor da variável MYSQL_ROOT_PASSWORD definida no serviço do mysql
       - MYSQL_PASSWORD=my_secret_password
     //  Pode usar o atributo env_file para especificar o caminho para 
     //  um arquivo que contém as variáveis de ambiente, nesse caso,
     //  o arquivo .env
     env_file:
      - .env         
//   database:
//     image: mysql:8.0.29
//     restart: always
//     environment:
//       MYSQL_ROOT_PASSWORD: my_secret_password
//       MYSQL_DATABASE: trybecashdb
//     ports:
//       - "33060:3306"
//     volumes:
//       - ./trybecash_script.sql:/docker-entrypoint-initdb.d/trybecash_script.sql