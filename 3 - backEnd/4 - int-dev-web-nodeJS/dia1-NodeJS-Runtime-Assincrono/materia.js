======================================  NODE JS ====================================== 
======================================  SISTEMA DE MÓDULOS ====================================== 

Um módulo em Node.js é um “pedaço de código”, o qual pode ser organizado em um ou mais arquivos,
que possui escopo próprio. Ou seja, suas variáveis, funções, classes e afins só estão disponíveis
nos arquivos que fazem parte daquele módulo.

~~~~~~~~~~~~~~~~~~~
 
O Node.js possui três tipos de módulos: internos, locais e de terceiros.

 ---> MÓDULOS INTERNOS:

 São inclusos no Node.js e instalados junto com ele quando baixamos o runtime.
 Alguns exemplos de core modules são:

        # fs: fornece uma API para interagir com o sistema de arquivos de forma geral;

        # url: provê utilitários para ler e manipular URLs;
        
        # util: oferece ferramentas e funcionalidades comumente úteis a pessoas programadoras.
        
       #  os: oferece ferramentas e funcionalidades relacionadas ao sistema operacional.

--> MÓDULOS LOCAIS:

São aqueles definidos juntamente à nossa aplicação. Eles representam as funcionalidades ou partes
do nosso programa que foram separados em arquivos diferentes. Podem ser publicados no NPM, para que
outras pessoas possam baixá-los e utilizá-los.

--> MÓDULOS DE TERCEIROS:

- são aqueles criados por outras pessoas desenvolvedoras e disponibilizados para uso por meio do NPM.

~~~~~~~~~~~~~~~~~~~

--> IMPORTAR E EXPORTAR MÓDULOS

Existem dois sistemas de módulos difundidos na comunidade JavaScript:

  # Módulos ES6;

  # Módulos CommonJS.

~~~~~~~~~~~~~~~~~~~

--> ES6:

  (!) Nessa especificação, os módulos são importados utilizando a palavra-chave IMPORT,
      tendo como contrapartida a palavra-chave EXPORT para exportá-los.

  (!) Se você tentar utilizar os módulos ES6 em um projeto Node.js de forma padrão, você poderá se
      deparar com o seguinte erro no seu terminal SyntaxError: Cannot use import statement outside a
      module.

--> COMMONJS:

  (!) No CommonJS as palavras-chaves utilizadas para importação e exportação de módulos são,
      respectivamente, require() e module.exports.

======================================  EXPORTANDO MÓDULOS ====================================== 

Para exportar algo no sistema CommonJS, utilizamos a variável global module.exports, atribuindo a
ela o valor que desejamos exportar

EX:
~~~~~~
// brlValue.js
const brl = 5.37;

module.exports = brl;
~~~~~~

  (!) O module.exports nos permite definir quais desses “objetos” internos ao módulo serão exportados,
      ou seja, estarão acessíveis para os arquivos que importarem aquele módulo. Ele pode receber
      qualquer valor válido em JavaScript, incluindo objetos, classes, funções e afins.

Vamos observar um caso que acontece com mais frequência:

EX: 
~~~~~~
// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = usdToBrl;
~~~~~~

Imagine que estamos exportando uma função, de modo que podemos utilizá-la para converter um valor
em dólares para outro valor, neste caso em reais.

Aplicação do módulo:

~~~~~~
// index.js
const convert = require('./brlValue');

const usd = 10;
const brl = convert(usd);

console.log(brl) // 53.7
~~~~~~

  (!) podemos dar o nome que quisermos para a função depois que a importamos, independente de qual
      é o seu nome dentro do módulo.

Suponha que agora desejamos exportar tanto a função de conversão quanto o valor do dólar (a variável
brl). Para isso, podemos exportar um objeto contendo as duas constantes:

~~~~~~
// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = {
  brl,
  usdToBrl,
};
~~~~~~

Desse modo, ao importarmos o módulo receberemos o seguinte objeto como resposta:

~~~~~~
// index.js
const brlValue = require('./brlValue');

console.log(brlValue); // { brl: 5.37, usdToBrl: [Function: usdToBrl] }

console.log(`Valor do dólar: ${brlValue.brl}`); // Valor do dólar: 5.37
console.log(`10 dólares em reais: ${brlValue.usdToBrl(10)}`); // 10 dólares em reais: 53.7
~~~~~~

Como estamos lidando com um objeto, podemos utilizar object destructuring para transformar
as propriedades do objeto importado em constantes no escopo global:

~~~~~~
const { brl, usdToBrl } = require('./brlValue');

console.log(`Valor do dólar: ${brl}`); // Valor do dólar: 5.37
console.log(`10 dólares em reais: ${usdToBrl(10)}`); // 10 dólares em reais: 53.7
~~~~~~

======================================  IMPORTANDO MÓDULOS ====================================== 

--> MÓDULOS LOCAIS: 

Quando queremos importar um módulo local, precisamos passar para o require o caminho do módulo.

~~~~~~
// meuModulo/funcionalidade-1.js

module.exports = function () {
  console.log('funcionalidade1');
}
~~~~~~
// meuModulo/funcionalidade-2.js

module.exports = function () {
  console.log('funcionalidade2');
}
~~~~~~
// meuModulo/index.js
const funcionalidade1 = require('./funcionalidade-1');
const funcionalidade2 = require('./funcionalidade-2');

module.exports = { funcionalidade1, funcionalidade2 };

Acima, quando importarmos o módulo meuModulo, teremos um objeto contendo duas propriedades, as
quais são as funcionalidades que exportamos dentro de meuModulo/index.js

Para importarmos e utilizarmos o módulo meuModulo, basta passar o caminho da pasta como argumento
para a função require

~~~~~~
// minha-aplicacao/index.js
const meuModulo = require('./meuModulo');

console.log(meuModulo); // { funcionalidade1: [Function: funcionalidade1], funcionalidade2: [Function: funcionalidade2] }

meuModulo.funcionalidade1();
~~~~~~

--> MÓDULOS LOCAIS: 


Para utilizarmos um módulo interno, devemos passar o nome do pacote como parâmetro para a função
require

~~~~~~
const fs = require('fs');

fs.readFileSync('./meuArquivo.txt');
~~~~~~

  (!) O nome da variável pode ser qualquer um que escolhermos. O importante é o nome do pacote que
      passamos como parâmetro para o require.

--> MÓDULOS DE TERCEIROS: 

Módulos de terceiros são importados da mesma forma que os módulos internos: passando seu nome como
parâmetro para a função require

(!) Quando importamos um módulo que não é nativo do Node.js e que não aponta para um arquivo local,
o Node inicia uma busca por esse módulo. Essa busca acontece na pasta node_modules. Caso um módulo
não seja encontrado na node_modules mais próxima do arquivo que o chamou, o Node procurará por uma
pasta node_modules na pasta que contém a pasta atual. Caso encontrado, o módulo é carregado. Caso
contrário, o processo é repetido em um nível de pasta acima. Isso acontece até que o módulo seja
encontrado ou até que uma pasta node_modules não exista no local em que o Node está procurando.

======================================  NPM ====================================== 

É o repositório oficial para publicação de pacotes Node.js. É para ele que realizamos upload dos
arquivos de nosso pacote quando queremos disponibilizá-lo para uso de outras pessoas ou em diversos
projetos.

~~~~~~

--> Utilizando o CLI npm:

É uma ferramenta oficial que nos auxilia no gerenciamento de pacotes, sejam eles dependências da nossa
aplicação ou nossos próprios pacotes. É por meio dele que criamos um projeto, instalamos e removemos
pacotes, publicamos e gerenciamos versões dos nossos próprios pacotes.


  ## npm initi :
  
    - Permite criar de forma rápida e simplificada um novo pacote Node.js na pasta onde é executado.
    - Para criar um novo pacote Node.js, o npm init simplesmente cria um arquivo chamado package.json
      com as respostas das perguntas realizadas e mais alguns campos de metadados.


  ## npm run:

    - Faz com que o npm execute um determinado script configurado no package.json. 
    - Para criar um script, precisamos alterar o package.json e adicionar uma nova chave ao objeto
      scripts. O valor dessa chave deve ser o comando que desejamos que seja executado quando
      chamarmos aquele script.

~~~~~~
{
  "scripts": {
    "lint": "eslint ."
}
}
~~~~~~
    
    - Agora, com um script criado, podemos utilizar o comando npm run <nome do script> para executá-lo.
      No nosso caso, o nome do script é lint, então o comando completo fica assim:

~~~~~~
npm run lint
~~~~~~

  ## npm start:

    - Age como um “atalho” para o comando npm run start, uma vez que sua função é executar o script
      start definido no package.json.
    - Como convenção, todo pacote que pode ser executado pelo terminal deve ter um script start com
      o comando necessário para executar a aplicação principal daquele pacote.
    - Por exemplo: se tivermos um pacote que calcula o IMC (Índice de Massa Corporal) de uma pessoa
      cujo código está no arquivo imc.js, é comum criarmos o seguinte script:

~~~~~~
{
  // ...
  "scripts": {
    "start": "node imc.js"
  }
  // ...
}
~~~~~~

  ## npm install:

    - É o responsável por baixar e instalar pacotes Node.js do NPM para o nosso pacote.
      
      -> npm install <nome do pacote>: baixa o pacote do registro do NPM e o adiciona ao objeto
         dependencies do package.json;

      -> npm install -D <nome do pacote>: baixa o pacote do registro do NPM, porém o adiciona ao
         objeto devDependencies do package.json, indicando que o pacote em questão não é necessário
         para executar a aplicação. Ele é necessário para desenvolvimento, ou seja, para alterar o
         código daquela aplicação. Isso é muito útil ao colocar a aplicação no ar, pois pacotes marcados
         como devDependencies podem ser ignorados, já que vamos apenas executar a aplicação, e não
         modificá-la. A versão longa equivalente dessa flag é --save-dev.

      -> npm install -E <nome do pacote>: baixa uma versão exata de um pacote do registro do NPM e o
         adiciona ao objeto dependencies ou ao objeto devDependencies caso a flag -D também esteja
         presente. A diferença é que quando instalamos as dependências da nossa aplicação, novas versões
         que corrigem bugs ou introduzem novos recursos desses pacotes podem ser instaladas. Usando a
         flag -E garantimos que a mesma versão do pacote sempre será instalada, independentemente se
         novas versões estão disponíveis ou não. No package.json a presença do símbolo ˆ antes do número
         da versão significa que aquela dependência aceita que novas versões sejam instaladas, e a
         ausência de qualquer símbolo antes do número da versão significa que exatamente aquela
         versão deve ser instalada. A versão longa equivalente dessa flag é --save-exact.
      
      -> npm install: baixa e instala todos os pacotes listados nos objetos de dependencies e
         devDependencies do package.json. Sempre deve ser executado ao clonar o repositório de um pacote
         para garantir que todas as dependências desse pacote estão instaladas.

======================================  CRIANDO UM SCRIPT SIMPLES ====================================== 

--> npm init na pasta desejada;
--> escrever o código;
--> configurar script start;
--> exeutar no terminal;

======================================  FLUXO ASSÍNCRONO ====================================== 

(!) Existem duas formas principais para implementarmos código assíncrono em JavaScript, usando
Callbacks e Promises.

(!) Para resolver o problema da chamada Callback Hell, podemos utilizar as Promises. Elas foram
introduzidas ao JavaScript como estratégia para melhorar a legibilidade do código, basicamente uma
forma de resolver a “bagunça” que as callbacks causavam. Quando usamos Promises, ainda estamos
utilizando um tipo de callback, mas que possui uma interface mais legível e intuitiva.

1 - PROMISE: Resolve/Reject

--> TRATANDO ERROR SINCRONO: 

~~~~~~
function dividirNumeros(num1, num2) {
  if (num2 == 0) throw new Error("Não pode ser feito uma divisão por zero");

  return num1 / num2;
}

try {
  const resultado = dividirNumeros(2, 1);
  console.log(resultado: ${resultado});
} catch (e) {
  console.log(e.message);
}
~~~~~~

--> TRATANDO ERROR ASSINCRONO: 

~~~~~~
function dividirNumeros(num1, num2) {
  const promise = new Promise((resolve, reject) => {
    if (num2 == 0) 
      reject(new Error("Não pode ser feito uma divisão por zero"));

    const resultado = num1 / num2;
    resolve(resultado)
  });

  return promise;
}

dividirNumeros(2, 1)
  .then(result => console.log(`sucesso: ${result}`))
  .catch(err => console.log(`erro: ${err.message}`));
~~~~~~

(!) As Promises foram introduzidas para resolver o famoso problema do Callback Hell, mas elas
introduziram uma certa complexidade de execução e sintaxe do código. Por esse motivo, em 2017 o
JavaScript trouxe uma nova forma para trabalhar com operações assíncronas de forma mais simples: 
As funções async/await .

2 - Async/await

(!) As funções async são, basicamente, uma abstração de Promises que facilitam ainda mais a nossa
programação com operações assíncronas. Essas funções reduzem cláusulas repetitivas (boilerplates)
em torno de Promises e, consequentemente, evitam a propagação de erros em promises encadeadas.

======================================  LEITURA E ESCRITA DE ARQVUIVOS ====================================== 

--> Lendo arquivos com metodos Síncronos: fs.readFileSync.

--> Lendo arquivos com metodos Assíncronos: fs.readFile.
        (!) Para utilizar as operações assíncronas do fs, precisamos alterar a importação do módulo
            fs para ('fs').promises. Dessa forma, poderemos chamar as funções assíncronas para leitura
            e escrita de arquivos que retornarão Promises.

--> Escrevendo no arquivos: fs.writeFile
        (!) Substitui o texto do arquivo.
    
