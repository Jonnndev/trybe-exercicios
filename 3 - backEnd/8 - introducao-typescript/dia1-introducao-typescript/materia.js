============================================ TYPESCRIPT ============================================

TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft. Ela é um 
superconjunto (superset) do JavaScript, 

============================================ TIPAGEM ============================================

Tipagem, também conhecida como dicas de tipos, é a forma que utilizamos para descrever de qual
tipo será o valor de um componente do nosso código.

  1 - Tipagem Estática:

  - Não permite que a pessoa desenvolvedora altere o tipo após ele ser declarado e, geralmente,
    a verificação de tipo é feita em tempo de compilação.
  - Contém no TS.AbortController

  2 - Tipagem Dinâmica:

  - Está ligada à habilidade da linguagem de programação em “escolher o tipo de dado” de acordo
    com o valor atribuído à variável em tempo de execução - ou seja, de forma dinâmica.
  - Não contém no TS.

  3 - Tipagem Forte:

  - Linguagens fortemente tipadas não realizam conversões automaticamente. Melhor dizendo, não
    é possível realizar operações entre valores de diferentes tipos, sendo necessário que a
    pessoa desenvolvedora faça a conversão para um dos tipos, caso seja possível.
  - Contém no TS.

  4 - Tipagem Fraca:

  - Tem a característica da linguagem de realizar conversões automáticas entre tipos diferentes
    de dados - ou melhor, operações entre valores de tipos diferentes podem ocorrer sem a
    necessidade de uma conversão explícita de tipo. Porém, o resultado pode não ser o esperado
    e erros podem ocorrer durante a execução.
  - Não contém no TS.

  (!) TypeScript é uma linguagem fortemente tipada e estaticamente tipada que possui inferência de tipo.

============================================ COMPILADOR E TRANSPILADOR ============================================

-> Um Compilador é um programa que traduz o código desenvolvido usando uma linguagem de mais alto nível (mais próxima
dos seres humanos) em um código de um programa equivalente de uma linguagem de mais baixo nível (mais próxima do
processador).

-> Um Transpilador é um programa de sistema que traduz o código desenvolvido utilizando uma linguagem de mais alto
nível em um código de um programa equivalente de uma outra linguagem de mais alto nível ou em uma versão diferente
da mesma linguagem.

(!) Um Transpilador também é considerado por algumas pessoas como um tipo de Compilador que atua em um nível mais
alto de abstração. Por isso, muitas vezes você verá pessoas dizendo que o TypeScript é uma linguagem transpilador
por traduzir código TypeScript em código JavaScript, ambas linguagens de mais alto nível.

============================================ TSC: TYPESCRIPT COMPILER ============================================

O TSC é o responsável por realizar a tradução do nosso código TypeScript para código JavaScript.

-> A melhor prática de utilização do Typescript em um projeto é instalá-lo como uma devDependency e utilizá-lo
por meio do comando npx. Isso garante que toda vez que o projeto for compilado, será utilizada a mesma versão
do TypeScript definida no package.json.

Instalar o compilador Typescript: npm i -D -E typescript@4.4.4

Para gerar código JS de um arquivo TS: npx tsc nomeDoArquivo.ts

Ao rodarmos esse comando, será verificado o conteúdo do arquivo nomeDoArquivo.ts e, caso nenhum problema seja
encontrado, um novo arquivo será criado com o nome nomeDoArquivo.js e contendo o código compilado para JavaScript.
A seguir, podemos rodar o arquivo .js gerado utilizando o Node. Caso haja erro, o compilador apontará uma mensagem
de erro no terminal e o arquivo .js não será gerado.

============================================ TSconfig: Introdução ============================================

-> O que define que um projeto é TypeScript é a presença de um arquivo de configuração TSConfig. O arquivo
tsconfig.json possui as variáveis de configuração que definirão como o nosso código será compilado.

Pelo compilador: npx tsc --init

~~~~~~~~~~~~~~~~~
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    [...]
    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include
    [...]

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "./",                                     /* Specify the root folder within your source files. */
    [...]

    /* JavaScript Support */
    [...]

    /* Emit */
    "outDir": "./",                                      /* Specify an output folder for all emitted files. */
    [...]

    /* Interop Constraints */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules.
    [...]

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    [...]
  }
}
~~~~~~~~~~~~~~~~~

module: especifica o sistema de módulo a ser utilizado no código JavaScript que será gerado pelo compilador
como sendo o CommonJS;

target: define a versão do JavaScript do código compilado como ES6;

rootDir: define a localização raiz dos arquivos do projeto;

outDir: define a pasta onde ficará nosso código compilado;

esModuleInterop: habilitamos essa opção para ser possível compilar módulos ES6 para módulos CommonJS;

strict: habilitamos essa opção para ativar a verificação estrita de tipo;

include: essa chave vai depois do objeto CompilerOptions e com ela conseguimos incluir na compilação os
arquivos ou diretórios mencionados; e

exclude: essa chave também vai depois do objeto CompilerOptions e com ela conseguimos excluir da compilação
os arquivos mencionados.

(!) Se estivermos desenvolvendo um projeto que usará a versão 16 do Node podemos utilizar o módulo base: @typescript/node16.

  -> npm i -D -E @tsconfig/node16@1.0.3

~~~~~~~~~~~~~~~~~
{
"extends": "@tsconfig/node16/tsconfig.json",
"compilerOptions": {
  "target": "es2016",
  "module": "commonjs",
  "rootDir": "./",
  "outDir": "./dist",
  "preserveConstEnums": true,
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true
},
"include": ["src/**/*"], /* aqui estamos incluindo todos os arquivos dentro da pasta src */
"exclude": ["node_modules", "**/*.spec.ts"] /* aqui estamos excluindo a pasta node_modules e os arquivos de teste */
}
~~~~~~~~~~~~~~~~~

============================================ TYPESCRIPT PLAYGROUND ============================================

Segundo o time desenvolvedor da ferramenta o TypeScript Playground é um site feito para você escrever
compartilhar e aprender TypeScript.

Esse site possui vários recursos interessantes: nele você pode ver exemplos de programas criados com TypeScript;
testar os recursos mais novos do compilador; criar seus próprios programas e compartilhar a URL deles com outras
pessoas. O melhor de tudo é que o Playground é um ambiente seguro de aprendizagem sem o risco do seu código afetar
alguma aplicação.

-> https://www.typescriptlang.org/pt/play

============================================ TIPOS E SUBTIPOS ============================================

Em TypeScript todos os tipos são subtipos de um tipo principal chamado any e este é um tipo que pode
representar qualquer valor em JavaScript. Os demais tipos são os tipos primitivos Tipos de objeto ou
parâmetros de tipo.

1 - Tipos Primitivos: 

  a - boolean: recebe verdadeiro (true) ou falso (false):

  ~~~~~~~~~~~~
  let yes: boolean = true; // cria uma variável de nome "yes" e diz que o tipo é booleano e o valor é true
  let no: boolean = false; // cria uma variável de nome "no" e diz que o tipo é booleano e o valor é false
  ~~~~~~~~~~~~

  b - number: recebe valores numéricos e, assim como no JavaScript, todos são valores de ponto flutuante.

  ~~~~~~~~~~~~
  // cria uma variável de nome "x" e diz que o tipo é number mas não seta o valor
  // isso não funciona com const
  let x: number;

  let y: number = 0;
  let z: number = 123.456;
  ~~~~~~~~~~~~

  c - string: recebe uma sequência de caracteres armazenados como unidades de código UTF-16 Unicode.

  ~~~~~~~~~~~~
  let s: string;
  let empty: string = "";
  let abc: string = 'abc';
  ~~~~~~~~~~~~

  d - void: existe apenas para indicar a ausência de um valor como em uma função sem valor retornado.

  ~~~~~~~~~~~~
  function sayHelloWorld(): void {
    console.log("Hello World!");
  }
  ~~~~~~~~~~~~

  e - null e undefined: são subtipos de todos os outros tipos.

  ~~~~~~~~~~~~
  let nullValue = null;
  let undefinedValue = undefined;
  ~~~~~~~~~~~~

(!) Podemos utilizar a inferência de tipo no TypeScript. É possível declarar uma variável sem
especificarmos explicitamente o tipo e o compilador fará a inferência do tipo por meio do valor
definido para a variável.

~~~~~~~~~~~~
let flag = true; // o compilador irá inferir o tipo boolean
console.log('O tipo de "flag" é:', typeof flag); // 'O tipo de "flag" é:', 'boolean'

const numberPI = 3.1416; // o compilador irá inferir o tipo number
console.log('O tipo de "numberPI" é:', typeof numberPI); // 'O tipo de "numberPI" é:', 'number'

let message = "Hello World!"; // o compilador irá inferir o tipo string
console.log('O tipo de "message" é:', typeof message); // 'O tipo de "message" é:', 'string'
~~~~~~~~~~~~