======================================== JWT: JSON WEB TOKEN ========================================

O JWT (JSON Web Token) é um token gerado a partir de dados “pessoais” que pode ser trafegado pela
internet ao fazer requisições para APIs e afins. Mas atenção: toda a informação que colocamos no JWT
é pública e qualquer pessoa com o token consegue ler essas informações. O mecanismo de segurança do JWT
permite, no entanto, que apenas quem tem a senha consiga alterar as informações contidas em um token.

1 - O navegador solicita que o usuário digite seu login e senha.
2 - O navegador então envia esse login e senha ao servidor, para verificar que esses dados estão corretos.
3 - Uma vez que valida login e senha, o servidor cria dois objetos: um contendo informações sobre o token
    que será gerado, que chamamos de header, e outro contendo os dados do usuário e as permissões que 
    aquela pessoa tem, ao qual chamamos de payload.
4 - O servidor, então, converte esses dois objetos em JSON, junta-os em uma mesma string e utiliza um 
    algoritmo chamado HMAC para “criptografar” essa string usando um “segredo” que só ele sabe, gerando
    o que chamamos de assinatura – que nada mais é do que header + payload criptografados.
5 - Por fim, o servidor combina o header, o payload originais e a assinatura, criando assim o token.
6 - O token é enviado ao cliente, que o armazena para utilizá-lo nas próximas requisições.

--> O QUE É HMAC?

O HMAC é um algoritmo para gerar um MAC (código de autenticação de mensagem) criptografado através de
algum algoritmo de hash (algoritmos que codificam mensagens), como md5, sha1 ou sha256, a partir de uma
chave secreta (uma senha) e de uma mensagem qualquer.

======================================== ENTENDENDO JWT ========================================

O Header contém duas propriedades: o tipo do token, que é JWT, e o tipo do algoritmo de hash, como HMAC-SHA256 ou RSA:

{
  "alg": "HS256",
  "typ": "JWT"
}

Payload é a segunda parte do token, que contém os “dados”. Esses “dados” são declarações sobre uma 
entidade (geralmente, o usuário):

{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}

======================================== IMPLEMENTANDO JWT ========================================

Instalar jsonwebtoken: npm install -E jsonwebtoken@9.0.0

Editar o arquivo src/controllers/login.js. Lá, vamos trabalhar na geração do nosso JWT e adicionar os
seguintes trechos de código:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//src/controllers/login.js

const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
   Em projetos reais, armazene-a numa variável de ambiente e tenha cuidado com ela, pois só quem tem acesso
   a ela poderá criar ou alterar tokens JWT. */
const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const isBodyValid = (username, password) => username && password;

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isBodyValid(username, password)) {
      return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });
    }

    const user = await UserService.getByUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });
    }

    /* Criamos uma config básica para o nosso JWT, onde:
    expiresIn -> significa o tempo pelo qual esse token será válido;
    algorithm -> algoritmo que você usará para assinar sua mensagem
                (lembra que falamos do HMAC-SHA256 lá no começo?). */

    /* A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias. '8h' = 8 horas. */
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    /* Aqui é quando assinamos de fato nossa mensagem com a nossa "chave secreta".
      Mensagem essa que contém dados do seu usuário e/ou demais dados que você
      quiser colocar dentro de "data".
      O resultado dessa função será equivalente a algo como: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6Iml0YWxzc29kaiIsInBhc3N3b3JkIjoic2VuaGExMjMifSwiaWF0IjoxNjM4OTc1MTMyLCJleHAiOjE2Mzk1Nzk5MzJ9.hnpmu2p61Il8wdQfmUiJ7wiWXgw8UuioOU_D2RnB9kY */
    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

    /* Por fim, nós devolvemos essa informação ao usuário. */
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Agora temos que usar esse token de alguma forma, não é mesmo? Para isso, vamos criar uma pasta chamada auth dentro do diretório
src e, dentro dela, um arquivo chamado validateJWT.js.

Esse arquivo conterá uma função que será usada como middleware para as nossas requisições, validando todas as rotas em que nós
solicitarmos autenticação.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

const { UserService } = require('../services');

/* Mesma chave privada que usamos para criptografar o token.
   Agora, vamos usá-la para descriptografá-lo.
   Numa aplicação real, essa chave jamais ficaria hardcoded no código assim,
   e muitos menos de forma duplicada, mas aqui só estamos interessados em
   ilustrar seu uso ;) */
const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do
     header Authorization em todas as rotas que queremos que
     sejam autenticadas. */
  const token = req.header('Authorization');

  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, secret);
    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          userId: 1
        },
        iat: 1656616422,
        exp: 1657221222
      }
    */

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
       por isso não é necessário fazer validação do tempo.
       Caso esteja tudo certo, nós então usamos o serviço de usuário para obter seus dados atualizados */

    const user = await UserService.getByUserId(decoded.data.userId);

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No arquivo src/app.js, onde definimos as rotas, usamos esse middleware para adicionar autenticação na nossa rota de listagem de 
posts.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const express = require('express');
// const routes = require('./routes');

/* Aqui, importamos nossa função que valida se o usuário está ou não autenticado */
const validateJWT = require('./auth/validateJWT');

// const app = express();

// app.use(express.json());

// const apiRoutes = express.Router();

apiRoutes.get('/api/posts', validateJWT, routes.getPosts);
// apiRoutes.post('/api/users', routes.createUsers);
// apiRoutes.get('/api/users', routes.getUsers);
// apiRoutes.post('/api/login', routes.login);

// app.use(apiRoutes);

// module.exports = app;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~