========================================== MIDDLEWARES ==========================================

--> O Express é um framework com um objetivo central: receber requisições e enviar respostas. Como ele
usa funções que recebem requisição (req) e resposta (res) como parâmetros. Agora,
veremos como essas funções podem ser decompostas em funções menores, que podem ser aproveitadas
em diversas rotas.

--> Cada função terá uma responsabilidade única, se essa função capturar algum problema, uma resposta
de erro será retornada para a pessoa usuária.

--> Será indicado no final dessa função, seguir para a próxima função da rota (fazendo uma validação
diferente). Com isso, serão feitas quantas funções forem necessárias, até que uma delas devolva uma
resposta a pessoa usuária. Esse é um estilo de composição de funções chamado MIDDLEWARES.

    (!) No Express toda função passada para uma rota é um middleware.

Na prática, middlewares recebem três parâmetros: req, res e next, exatamente como as funções callback
que usamos até agora para registrar rotas.

========================================== REFATORANDO MIDDLEWARES ==========================================

~~~~~~~~
// src/server

const app = require('./app');

app.listen(3001, () => console.log('server running on port 3001'));
~~~~~~~~
// src/app.js

const express = require('express');

const app = express();

let nextId = 3;
const teams = [
  { id: 1, nome: 'São Paulo Futebol Clube', sigla: 'SPF' },
  { id: 2, nome: 'Sociedade Esportiva Palmeiras', sigla: 'PAL' },
];

app.use(express.json());

app.get('/teams', (req, res) => res.json(teams));

app.get('/teams/:id', (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    res.json(team);
  } else {
    res.sendStatus(404);
  }
});

app.post('/teams', (req, res) => {
  const requiredProperties = ['nome', 'sigla'];
  if (requiredProperties.every((property) => property in req.body)) { // <<<< Validação dos dados
    const team = { id: nextId, ...req.body };
    teams.push(team);
    nextId += 1;
    res.status(201).json(team);
  } else {
    res.sendStatus(400);
  }
});

app.put('/teams/:id', (req, res) => {
  const id = Number(req.params.id);
  const requiredProperties = ['nome', 'sigla'];
  const team = teams.find(t => t.id === id);
  if (team && requiredProperties.every((property) => property in req.body)) { // <<< Validação dos dados
    const index = teams.indexOf(team);
    const updated = { id, ...req.body };
    teams.splice(index, 1, updated);
    res.status(201).json(updated);
  } else {
    res.sendStatus(400);
  }
});

app.delete('/teams/:id', (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    const index = teams.indexOf(team);
    teams.splice(index, 1);
  }
  res.sendStatus(204);
});

module.exports = app;
~~~~~~~~

--> O Express permite que o tratamento de uma rota seja decomposto em várias funções middlewares.
Um middleware deve fazer apenas o seu próprio trabalho (por exemplo, conferir um cabeçalho), e então
escolher entre responder (res) a requisição ou chamar o próximo middleware (next). Assim, uma rota pode
ser tratada por uma sequência de middlewares, cada um fazendo uma parte do tratamento da requisição.

~~~~~~~~
// src/app.js

// ...
const validateTeam = (req, res, next) => {
  const requiredProperties = ['nome', 'sigla'];
  if (requiredProperties.every((property) => property in req.body)) {
    next(); // Chama o próximo middleware
  } else {
    res.sendStatus(400); // Ou já responde avisando que deu errado
  }
};

// Arranja os middlewares para chamar validateTeam primeiro
app.post('/teams', validateTeam, (req, res) => {
  const team = { id: nextId, ...req.body };
  teams.push(team);
  nextId += 1;
  res.status(201).json(team);
});

app.put('/teams/:id', validateTeam, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    const index = teams.indexOf(team);
    const updated = { id, ...req.body };
    teams.splice(index, 1, updated);
    res.status(201).json(updated);
  } else {
    res.sendStatus(400);
  }
});

// module.exports = app;
~~~~~~~~

(!) Os middlewares seguintes podem receber o next como um terceiro parâmetro, mas geralmente o último
middleware de uma rota precisa responder a requisição. Portanto, se ele não for chamar outro middleware,
não há necessidade de usar o objeto next e você pode escrever a função recebendo apenas dois parâmetros:
os objetos req e res.

>>>> E o que o middleware validateTeam faz no exemplo acima?

    1 - Faz uma validação básica que apenas confere se todas as propriedades esperadas estão presentes
        no req.body.

    2 - Se a validação aprovar, esse middleware endereça a requisição para o próximo middleware, que
        efetivamente cria o time.

    3 - Se a validação falhar, esse middleware retorna uma resposta com status 400 e nunca chama o
        próximo middleware. 400 é o código HTTP para Bad Request, indicando que existe algo errado n
        requisição. Para mais informações sobre códigos HTTP, confira a documentação no site da MDN
        (Mozilla Developer Network).

========================================== MIDDLEWARES ASSÍNCRONOS ==========================================

--> Middleware global: Quando precisamos reaproveitar um middleware para todas as rotas da aplicação.

~~~~~~~~
//...
const app = express();
const teams = { ... };

app.use(apiCredentials); // <<<<<<<<<<<< Middleware global
app.use(express.json());

app.get('/teams', (req, res) => res.json(teams));
// ...
~~~~~~~~

--> MIddlewares assíncronos: Suponha que tenhamos um arquivo authdata.json com um objeto mapeando tokens
com as informações dos apps que usam nossa API. Quando uma requisição chega, ela precisa ter um cabeçalho
X-API-TOKEN com um token presente nesse arquivo. Se não tiver o cabeçalho ou se não tiver um token válido,
responde com o código http 401 Unauthorized.

~~~~~~~~
//authdata.json
{
  "dGlqb2xvMjIK": { "appId": 1, "teams": ["SAO", "PAL"] },
  "bDRkcjFsaDAK": { "appId": 2, "teams": ["FLA", "FLU"] }
}
~~~~~~~~
// src/middlewares/apiCredentials.js

const fs = require('fs/promises');

// como vamos ler arquivos assincronamente, precisamos do async
module.exports = async function apiCredentials(req, res, next) {
  // pega o token do cabeçalho, se houver
  const token = req.header('X-API-TOKEN');
  // lê o conteúdo do `./authdata.json` (relativo à raiz do projeto)
  const authdata = await fs.readFile('./authdata.json', { encoding: 'utf-8' });
  // readFile nos deu uma string, agora vamos carregar um objeto a partir dela
  const authorized = JSON.parse(authdata);

  if (token in authorized) {
    next(); // pode continuar
  } else {
    res.sendStatus(401); // não autorizado
  }
};
~~~~~~~~

(!) O protocolo HTTP tem cabeçalhos já estabelecidos, mas é costume prefixar cabeçalhos customizados 
com X-, como fizemos com X-API-TOKEN.

========================================== ERROS ASSÍNCRONOS ==========================================

--> Por padrão, o Express vai encaminhar todos os erros lançados para serem tratados pelos middlewares
de erros. No entanto, erros lançados em middlewares assíncronos não são tratados do mesmo jeito.

(!) Se por acaso o arquivo authdata.json não estivesse disponível no momento da requisição, ou tivesse
um JSON quebrado, você obteria um erro, mas não teria uma resposta HTTP.

Para ajudar na solução instalar: npm install express-async-errors@3.1.1 --save-dev --save-exact
- importar ele no arquivo app.js antes de criar o objeto app e esse pacote vai alterar o comportamento
  padrão do express.

~~~~~~~~
// app.js
const express = require('express');
require('express-async-errors'); // não precisa definir uma variável

const apiCredentials = require('./middlewares/apiCredentials');

const app = express();
// ...
~~~~~~~~

========================================== PRÁTICAS COMUNS DE MIDDLEWARES ==========================================

--> Enviando mensagens de erros personalizadas na resposta:

  (!) Pode se enviar na responta um json com um objeto por exemplo 
      { message: 'Mensagem de erropersonalizada'}.


~~~~~~~~
// Função padrão sem tratamento de erro
const validateTeam = (req, res, next) => {
  const requiredProperties = ['nome', 'sigla'];
  if (requiredProperties.every((property) => property in req.body)) {
    next(); // Chama o próximo middleware
  } else {
    res.sendStatus(400); // Ou já responde avisando que deu errado
  }
};
~~~~~~~~
// Função com tratamentro de Erro
const validateTeam = (req, res, next) => {
  const { nome, sigla } = req.body;
  if (!nome) return res.status(400).json({ message: 'O campo "nome" é obrigatório'});
  if (!sigla) return res.status(400).json({ message: 'O campo "sigla" é obrigatório'});
  next();
};
~~~~~~~~

(!) Desta forma, caso seja enviado na requisição um objeto que não possua propriedade “nome”,
    a aplicação retornar o status 400 e o objeto { message: 'O campo "nome" é obrigatório'}. Caso
    seja enviado um objeto que não possua propriedade “sigla”, o middleware retorna o status 400 e
    o objeto { message: 'O campo "sigla" é obrigatório'}. Mas caso seja enviado um objeto com as
    propriedades “nome” e “sigla”, então será chamado o próximo middleware através do next().
~~~~~~~~

--> Passando valores entre middlewares com objeto req:

  (!) Middlewares também podem modificar os objetos req e res. Essas modificações serão recebidas pelos
próximos middlewares caso next seja chamado. Geralmente isso é utilizado para propagar informações de
um middleware para o outro. Isso dá ainda mais flexibilidade para sua composição de middlewares.

~~~~~~~~
// src/middlewares/apiCredentials.js
//...
module.exports = async function apiCredentials(req, res, next) {
  //...
  const authorized = JSON.parse(authdata);
  if (token in authorized) {
    // modifica o req para guardar a informação importante
    req.teams = authorized[token];
    next();
  } else {
    res.status(401).json({ message: 'Token inválido ou expirado.'});
  }
};
~~~~~~~~

- Estamos usando req.teams para guardar essa informação. Poderíamos criar qualquer propriedade, mas
devemos ter cuidado para não sobrescrever as propriedades que req já tem. Na dúvida, você pode conferir
os campos do req usando o debugger.

- Agora, no middleware da rota POST /teams podemos usar essa informação para conferir se aquele cliente
da nossa API tem a autoridade para criar o time que ele está querendo criar:

~~~~~~~~
// src/app.js

//...

app.post('/teams', validateTeam, (req, res) => {
  if (
    // confere se a sigla proposta está inclusa nos times autorizados
    !req.teams.teams.includes(req.body.sigla)
    // confere se já não existe um time com essa sigla
    && teams.every((t) => t.sigla !== req.body.sigla)
  ) {
    return res.status(422).json({ message: 'Já existe um time com essa sigla'});
  }
  const team = { id: nextId, ...req.body };
  teams.push(team);
  nextId += 1;
  res.status(201).json(team);
});

//...
~~~~~~~~

--> Respondendo duas vezes acidentalmente:

Conferir corretamente os RETURNS nas condicionais e funções para que não ocorra o erro:

~~~~~~~~
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
~~~~~~~~

(!) você não pode enviar mais de uma resposta para uma requisição. 

==========================================  MIDDLEWARES DE TERCEIROS ==========================================

--> Interpretando conteúdo JSON com express.json:

 (!) Ele é um middleware que lê o conteúdo da requisição HTTP, interpreta os conteúdos como JSON e cria
     no objeto req uma propriedade body com o valor encontrado no conteúdo.

A função express.json() utilizada na linha app.use(express.json()) cria um middleware que processa
corpos de requisições escritos em JSON. Se executarmos nossa API e fizermos uma requisição do tipo POST,
conseguiremos ter acesso aos valores enviados no body da requisição. 

--> Servindo arquivos estáticos com express.static:

  (!) Ele pega o req.path e usa para procurar um arquivo. Se encontrado, ele já responde com esse arquivo.
      Se não, ele assume que alguém vai responder essa requisição e simplesmente passa para o próximo.

~~~~~~~~
// src/app.js
//...
const app = express();
// configura para procurar o path no diretório ./images
app.use(express.static('./images'));
//....
~~~~~~~~

Com essa configuração, uma requisição GET /brasao/COR.png vai passar primeiro pelo express.static,
que procura por um arquivo em ./images/brasao/COR.png e vai enviá-lo se ele for encontrado.

--> Gerando logs da aplicação com morgan:

  (!) Um log nada mais é do que um registro organizado e consistente de todas as ocorrências de um evento.
      Logs são fundamentais para reconhecer bugs em uma aplicação web, dando visibilidade para a frequência
      e as condições em que os bugs ocorreram. E como você nunca sabe quando um bug vai acontecer, é
      conveniente ter um log de todas as requisições recebidas.

- Para instalar o Morgan: npm install morgan@1.10.0 --save-exact <<<<

~~~~~~~~
// src/app.js
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
//...
const app = express();
app.use(morgan('dev'));
app.use(express.static('./images'));
~~~~~~~~

(!) Ele irá emitir uma mensagem para cada requisição recebida.

--> Liberando acesso ao frontend com cors:

  (!) Permite que outras aplicações front-end consumam sua API.

- Para instalar o cors: npm install cors@2.8.5 --save-exact <<<<

~~~~~~~~
const cors = require('cors');
app.use(cors());
~~~~~~~~

  (!) Quando uma aplicação frontend é carregada em um endereço (localhost:3000) e tenta acessar uma API
      em outro endereço (localhost:3001), o navegador primeiro perguntará à API se essa aplicação pode
      fazer essas requisições. Esse é um recurso de segurança presente em todos os navegadores modernos.
  
- Com o cors configurado, nosso back-end vai deixar o navegador enviar requisições para nossa API. Sem
o cors, o navegador bloquearia as requests do nosso front-end para nossa API. O middleware cors tem um
conjunto de configurações que permitem criar regras específicas, limitando quem pode fazer requisições
e quais requisições podem ser feitas.
~~~~~~~~

--> Retornando 404 com um middleware global customizado:

  (!) O Express já vem com um middleware de erro pronto para lidar com a maior parte dos casos comuns.
      Por padrão, ele responde com HTML para qualquer erro. No entanto, se você quiser customizar sua
      resposta para rotas não tratadas, basta escrever um middleware global no final das configurações
      do seu app.

~~~~~~~~
// src/app.js
app.put('/teams/:id', validateTeam, ... );
app.delete('/teams/:id', ... );

// se ninguém respondeu, vai cair neste middleware
app.use((req, res) => res.sendStatus(404));

module.exports = app;
~~~~~~~~

--> Middlewares de segurança:

    (!) Em um ambiente de produção é importante se preocupar com segurança da aplicação. O Helmet pode
        ajudar a proteger seu aplicativo de algumas vulnerabilidades da Web conhecidas, definindo os
        cabeçalhos HTTP de forma adequada. Ele é uma coleção de várias funções de middleware menores que
        definem cabeçalhos de resposta HTTP relacionados à segurança. 

- Para instalar o Helmet: npm install helmet@6.0.1 --save-exact.

~~~~~~~~
const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());
~~~~~~~~

--> Limite de taxa de requisições:

  (!) Uma aplicação recebe diversas solicitações e de diferentes usuários e pode-se realizar um
      monitoramento do número de solicitações realizadas em um determinado período de tempo e/ou
      a quantidade de tempo de solicitações realizada por um mesmo consumidor da aplicação.
      Realizar uma limitação destas solicitações, denominado rate limit, tem objetivos como:

  1 - Limitar o consumo de uma API para reduzir o uso de recursos do servidor necessários para que o
      código seja executado;
  2 - Gerar serviços em que a quantidade de serviços que podem ser consumidos dependam do plano do
      usuário;
  3 - Proteger a API contra um ataque de negação de serviço (DoS ou DDoS) que é uma tentativa maliciosa
      de sobrecarregar uma propriedade web com tráfego a fim de interromper seu funcionamento normal.

- Para instalar o exoress-rate-limit: npm install express-rate-limit@6.7.0 --save-exact.

~~~~~~~~
const express = require("express");

const rateLimit = require("express-rate-limit");
const app = express();

// Configuramos um limitador para uma taxa máxima de 100 requisições em um intervalo de 15 minutos
const limiter = rateLimit({
   max: 100, // número máximo de requisições
   windowMs: 15 * 60 * 1000, // intervalo de tempo, em milissegundos, para atingir o número máximo de requisições
   message: "Muitas requisições originadas desta IP" // mensagem personalizada quando atinge o limit rate
});

app.use(limiter);
~~~~~~~~

==========================================  MIDDLEWARES DE ERRO ==========================================

  1 - Middleware de erro sempre deve vir depois de rotas e outros middleware;

  2 - Middleware de erro só recebe requisições se algum middleware lançar um erro ou chamar a função
      next() com algum parâmetro.

  3 - Middleware de erro sempre deve receber quatro parâmetros.

--> Configuração:

(!) É precisamos definir o middleware de erro, que será chamado sempre que tiver um next(error)
    em nosso código.

~~~~~~~~
// src/app.js
const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/teams', async (req, res, next) => {
  try {
        const data = await fs.readFile(path.resolve(__dirname, './teams.json'));
        const teams = JSON.parse(data);
        return res.status(200).json({ teams })
    } catch (error) {
      return next(error); // <<<<< Passa o erro para o tratamento
    }
});

app.use((error, _req, res, _next) => {
  return res.status(500).json({ error: error.message }); // <<<<< Onde o erro será tratado
});

app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
~~~~~~~~

==========================================  ROUTER MIDDLEWARE ==========================================

(!) O Router é um middleware que “agrupa” várias rotas em um mesmo lugar, como se fosse uma versão mini
    do app do Express.

~~~~~~~~
// src/app.js
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
// require no nosso novo router
const teamsRouter = require('./routes/teamsRouter');

const app = express();
app.use(morgan('dev'));
app.use(express.static('/images'));
app.use(express.json());
// monta o router na rota /teams (1)
app.use('/teams', teamsRouter);

app.use((err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: `Algo deu errado! Mensagem: ${err.message}` });
});

module.exports = app;
~~~~~~~~
// src/routes/teamsRouter.js

const express = require('express');
// os requires são relativos ao arquivo, então o path muda ligeiramente
const existingId = require('../middlewares/existingId');
const validateTeam = require('../middlewares/validateTeam');
const apiCredentials = require('../middlewares/apiCredentials');

// cria um router middleware
const router = express.Router();

let nextId = 3;
const teams = [
  { id: 1, nome: 'São Paulo Futebol Clube', sigla: 'SPF' },
  { id: 2, nome: 'Sociedade Esportiva Palmeiras', sigla: 'PAL' },
];

// o path é relativo à rota em que o router foi montado (2)
router.get('/', (req, res) => res.json(teams));

// configurações globais afetam apenas este router (3)
router.use(apiCredentials);

router.get('/:id', existingId, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  res.json(team);
});

router.post('/', validateTeam, (req, res) => {
  const team = { id: nextId, ...req.body };
  teams.push(team);
  nextId += 1;
  res.status(201).json(team);
});

router.put('/:id', existingId, validateTeam, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  const index = teams.indexOf(team);
  const updated = { id, ...req.body };
  teams.splice(index, 1, updated);
  res.status(200).json(updated);
});

router.delete('/:id', existingId, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  const index = teams.indexOf(team);
  teams.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
~~~~~~~~

1 - O arquivo src/app.js, repare no uso de mais um parâmetro na chamada à função app.use. Isso diz ao
Express que queremos que aquele middleware (no caso o router) seja executado para qualquer rota que
comece com aquele caminho(no caso, '/teams').

2 - Já no src/routes/teamsRouter.js, repare que, ao registrar uma rota no router, não precisamos repetir
a parte do caminho que já passamos para app.use. É por isso que a rota que definimos com
router.get('/:id') na verdade se torna acessível por meio de /teams/:id.

3 - Routers suportam que qualquer tipo de middleware seja registrado. Ou seja, se tivermos vários
endpoints com autenticação e vários endpoints abertos, podemos criar um router, e registrar nele
nosso middleware de autenticação, bem como todas as rotas que precisam ser autenticadas, registrando
as rotas abertas diretamente no app.

