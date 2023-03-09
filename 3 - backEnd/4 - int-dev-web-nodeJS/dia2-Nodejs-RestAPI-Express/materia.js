==================================== NODE.JS: API REST COM  EXPRESS ====================================

APIs Web são ferramentas definitivas para conectar o front-end de uma aplicação aos dados que ela
precisa salvar e receber. O padrão REST, rotas e aplicações C.R.U.D são partes do conhecimento de
como se fazer uma boa API.


--> Padrão CRUD: Create: Criar;
                 Read: Ler;
                 Update: Alterar;
                 Delete: Deletar;
                 
==================================== SERVIDOR NODE.JS ====================================

--> SERIDORES:  é quem ou aquele que serve! são programas de computador que entregam algum tipo
                de informação ou página a quem os solicita através da internet. Temos vários tipos
                de servidores, tais como:

                  # Servidor Web;
                  # Servidor de arquivos;
                  # Servidor de impressão;
                  # Servidor de e-mail.

(!) Assim como temos vários tipos de servidores, também temos vários tipos de servidores web!

    # Apache HTTP Server;
    # NGINX;
    # Apache Tomcat;
    # Node.js;

==================================== EXPRESS ====================================

Instalar express: npm i express@4.17.1 --save-exact

    (!) 1 - O arquivo package-lock.json serve para gerenciar as dependências de nossas dependências;
        2 - O diretório (node_modules) é onde todas as nossas dependências, e dependências de
            nossas dependências, serão instaladas.

Instalar Lint: npm i eslint@6.8.0 eslint-config-trybe-backend@1.0.1 --save-dev --save-exact

Configurações ESlint: touch .eslintignore .eslintrc.json

(!) .eslintignore: Usado para você dizer ao ESLint que ignore arquivos e diretórios específicos;
    .eslintrc.json: Usado para você sobrescrever regras do ESLint;

==================================== CRIANDO O SERVIDOR ====================================

~~~~~~~
// src/app.js
const express = require('express');

const app = express();

module.exports = app;
~~~~~~~
// src/server.js
const app = require('./app');

app.listen(3001, () => console.log('server running on port 3001'));
~~~~~~~
// package.json

"start": "node src/server.js",
"dev": "nodemon src/server.js",
"lint": "eslint --no-inline-config --no-error-on-unmatched-pattern -c .eslintrc.json ."
~~~~~~~

==================================== PRODUTIVIDADE COM NODEMON ====================================

Instalar nodemon: npm i nodemon@2.0.15 --save-dev --save-exact

==================================== ENDPOINTS ====================================

-->  O que são rotas?

No contexto de Back-end, rotas representam as portas de entrada para a sua API.

--> Anatomia de uma URL:

URL: https://app.betrybe.com/login

PROTOCOLO: https

DPMÍNIO: app.betrybe.com

ROTA: /login

      (!) Uma rota é a parte de uma URL que usamos para acessar uma API e fazer uma requisição a ela. 

==================================== API ====================================

GET: Usamos essa função toda vez que queremos pedir algum dado.

A função get recebe dois parâmetros:

  1° parâmetro '/': A rota. Pode ser /login, /produtos, /pessoas, ou qualquer outra coisa.
  Chamamos a rota '/' de rota raiz;

2° parâmetro (req, res) => {}: Este espera uma função de callback. Esta função pode receber de 2 a 4
parâmetros, sendo eles:

  # req: Essa é a Request (ou requisição), é por meio dela que recebemos os dados
    (envio por query, params e body);

  # res: Essa é a Response (ou resposta), é por meio dela que respondemos o que nos é solicitado;

  # next: Posteriomente;

  # err: Posteriomente;

O res responde as requisições. Estas requisições podem ser respondidas de vários jeitos, tais como:
  
  -> Formato text/JSON, como o caso do res.json({ message: 'Olá Mundo!' });
  -> Formato text/HTML, como o caso do res.send('<h1>Olá Mundo!</h1>');
  -> Redirecionamentos, como o caso do res.redirect('https://www.betrybe.com/');
  -> Páginas completas ou partes dela, como o caso do res.render('index.html');
  -> Finalizando, como o caso do res.end();

(!) É de costume enviar um status code. Estes status code são importantes para identificarmos o que
está acontecendo com nossas requisições;

Os status code mais conhecidos são:

   - 200: Que quer dizer ‘ok’;
   - 500: Que quer dizer erro no servidor;
   - 404: Este muitas pessoas já viram, ele quer dizer que a página não foi encontrada;

   const OK = 200 / const INTERNAL_SERVER_ERROR = 500 / const NOT_FOUND = 404;

==================================== ANATOMIA DE REQUISIÇÃO ====================================

REQUISIÇÃO:

~~~~~~~~
GET / HTTP/1.1
Host: developer.mozilla.org
Accept: text/html
~~~~~~~~

  -> O método HTTP definido por um verbo em inglês. Nesse caso, utilizamos o GET, que normalmente
     é utilizado para “buscar” algo do servidor, e é também o método padrão executado por navegadores
     quando acessamos uma URL.

  -> O caminho no servidor do recurso que estamos tentando acessar. Nesse caso, o caminho é /, pois
     estamos acessando a página inicial da aplicação;

  -> A versão do protocolo (1.1 é a versão nesse exemplo);
  
  -> O local (host, ou “hospedeiro”) onde está o recurso que se está tentando acessar, ou seja, a
    URL! Ou, se for mais direto, o endereço IP servidor.

  -> Os headers, ou cabeçalhos, são informações adicionais a respeito de uma requisição ou de uma
     resposta. Eles podem ser enviados do cliente para o servidor, ou vice-versa. Na requisição do
     exemplo acima, temos o header Host, o qual informa o endereço do servidor e o header Accept, que
     informa o tipo de resposta a qual esperamos do servidor

(!)  Os mais comuns tipos de requisição são:
     GET, PUT, POST, DELETE e PATCH;
     Além do método OPTIONS, utilizado por clientes para entender como deve ser realizada a
     comunicação com o servidor

RESPOSTA:

~~~~~~~~
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html

<!DOCTYPE html... (aqui vêm os 29769 bytes da página solicitada)
~~~~~~~~

  -> A versão do protocolo (1.1 no nosso exemplo);

  -> O código do status que diz se a requisição foi um sucesso ou não. Nesse caso, deu certo, pois
     recebemos um código 200, acompanhado de uma pequena mensagem descritiva (OK, nesse caso);

  -> Os headers no mesmo esquema da requisição. No caso do exemplo acima, o Content-Type diz para o
     navegador o que ele precisa fazer. No caso do HTML, ele deve renderizar o documento na página;

  -> Um body ou corpo (da requisição), que envia dados quando necessário, sendo opcional. Por exemplo,
     caso você submeta um formulário registrando um pedido em uma loja virtual, no corpo da resposta
     pode ser retornado o número do pedido ou algo do tipo.


(!) O body e os headers da requisição representam a informação que um cliente está enviando para o
    servidor;
(!) O body e os headers da resposta representam a informação que o servidor está devolvendo para o
    cliente.

==================================== ENVIANDO DADOS PARA O SERVIDOR ====================================

--> Envio por CONSULTA, ou req.query:

Construção: /rota?variavel1=valor&variavel1=valor&variavelN=valor
Explicação:
  - /rota é o caminho, por exemplo, /produtos, /pessoas, /pesquisa, 
  - ? é o indicador que vamos passar dados em para a rota;
  - & é o separador que se usa quando queremos enviar muitos dados;
  - variavelN é uma chave identificadora, por exemplo, nome, frequenciaMinima, q;
  - valor é o valor da variável, por exemplo, nome=Tobias, frequenciaMinima=144, q=express;

  - TIPO DE ENVIO: GET

--> Envio por PARÂMETRO DE ROTA ou req.params:

Construção: /rota/:variavelN
Explicação:
   - /rota é o caminho, por exemplo, /produto, /pessoa;
   - /: é o indicador que vamos passar um dado para a rota;
   - variavelN é uma chave identificadora, por exemplo, id;

   - TIPO DE ENVIO: GET

--> Envio por CORPO ou req.body:

 (!) O envio de informações vai pelo corpo e não mais pela URL, onde podemos ver explicitamente.
     Isso se dá por duas questões:

     # A primeira é por segurança. Imagine sua senha ou código de segurança do seu cartão de crédito
       escritos na URL do seu computador e quem está perto de você podendo ler.

     # O segundo motivo é pelo tamanho do que enviamos. Imagina que inviável enviar todo um cadastro
       de um formulário gigante pela URL.
    
  - TIPO DE ENVIO: POST/PUT

==================================== CRIANDO UMA API ====================================

--> LISTANDO TIMES PELO MÉTODO GET:

- Em nossa API, os dados serão armazenados em um array de objetos. 

~~~~~~~~
// src/app.js

// const express = require('express');

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

// ...
~~~~~~~~

- Criar um endpoint do tipo GET com a rota /teams

~~~~~~~~
// src/app.js

// ...

// app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

app.get('/teams', (req, res) => res.status(200).json({ teams }));

// module.exports = app;
~~~~~~~~

--> CADASTRANDO TIMES PELO MÉTODO POST:

- Para cadastrar um novo time é muito simples, porém agora queremos receber os dados no corpo
  da requisição.

~~~~~~~~
// src/app.js

// ...

// app.get('/teams', (req, res) => res.status(200).json({ teams }));

app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);

  res.status(201).json({ team: newTeam });
});

// module.exports = app;
~~~~~~~~

(!) No caso acima os dados serão enviados pelo corpo da requisição e temos acesso a eles por meio
    do req.body. Criamos uma nova constante chamada newTeam e aplicamos a desestruturação no req.body.
    Após isso, armazenamos o dado em nosso array de times e respondemos a requisição, agora com o status
    201.



(!) app.use() --> serve para “instalar” algumas coisas que queremos em nossas APIs.]

--> EDITANDO TIMES PELO MÉTODO PUT:

- Para alterar algum time, você precisa do id deste time e dos novos dados, correto? Com o que
aprendemos até agora, os novos dados vêm no corpo da requisição e o id vem por parâmetro. Após
capturar tudo isso, você precisa procurar dentro do array teams o time correspondente com aquele
id e alterar as informações dele. Como pode acontecer de não existir um time com aquele id buscado,
precisamos também devolver uma resposta para esses casos.

(!) O método PUT: é utilizado quando queremos alterar um recurso. Ele também recebe dados pelo corpo
    da requisição.

(!) Todo dado que vem por params ou por query (ou seja dados enviados pela URL do navegador) são
    recebidos como string. <<<<<<

--> DELETANDO TIMES PELO MÉTODO DELETE:

==================================== ARQUITETURA REST ====================================

--> REST: é um conjunto de boas práticas utilizadas durante a construção de uma API;

--> RESTful: é um serviço web (desenvolvido por nós ou não) que segue as regras definidas pelo REST;

(!) AS 5 RESTRIÇÕES PARA SER RESTFUL:

    1 - Interface uniforme (Uniform Interface): respeitar um padrão para transferir informações;

    2 - Arquitetura cliente-servidor: o REST quer nossa API organizada de forma que ela sirva a
        clientes gerenciando suas solicitações HTTP;

    3 - Sem estado (stateless): entre uma requisição e outra, a API não armazena informações do
        cliente. Todas as requisições são independentes;

    4 - Cacheable: requisições repetidas podem ser otimizadas, pois retornam os mesmos resultados;

    5 - Sistema em camadas (Layered System): quem faz a requisição não vê as várias partes que fazem
        uma API - só a sua camada que gerencia requisições.

==================================== ERST NO EXPRESS ====================================

(!) Uma das vantagens de se usar o Express para construção de APIs é a organização das rotas,
podendo separar as rotas pelo método (ou verbo) HTTP da requisição. Além disso, torna-se mais
simples retornar um formato específico solicitado pelo cliente e/ou retornar um status HTTP.

app.get(...)
app.post(...)
app.put(...)
app.delete(...)