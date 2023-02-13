========== DOCKER COMPOSE ==========

Também pode ser considerado uma receita, onde  conseguimos especificar todos os parâmetros que
antes rodávamos unitariamente utilizando docker run.

Mapear todos os comandos e estruturá-los em um único
arquivo com o Compose tem diversas vantagens:

-> Evita ter que digitar sempre vários parâmetros para executar o comando docker run;
-> Facilita na ordem de execução, caso um container seja dependente de outro;
-> Permite configurar políticas de reinicialização, onde dizemos ao Compose o que fazer caso
um container dê erro ou termine sua execução.

Boa prática em relação ao nome do arquivo:
-> docker-compose.yaml

========== VERSÃO DO ARQUIVO ==========

-> Todo arquivo docker-compose.yaml deve iniciar com a chave version.

========== CRIANDO SERVIÇOS ==========

-> Serviços nada mais é o que será executado dentro do arquivo.

Todo container é criado a partir de uma imagem. Sendo assim, precisamos especificá-las aos nossos serviços.
Temos duas opções para isso:

image: especifica uma imagem Docker pronta, seja local ou a ser baixada no Docker Hub;

build: especifica a pasta contendo um arquivo Dockerfile a partir do qual o Compose vai executar o
comando docker build automaticamente.

========== MAPEANDO PORTAS ==========

-> Dentro de cada serviço, podemos especificar o ports, que é uma lista de mapeamentos de portas entre o computador
local e as portas do container.

========== CONTAINER COM PROBLEMAS ==========

-> O Compose nos permite configurar uma política de reinicialização!

O Compose possui quatro políticas de reinicialização, sendo elas:

- no : define que o container não reiniciará automaticamente (Padrão);

- on-failure: define que o container será reiniciado caso ocorra alguma falha apontada pelo exit code, diferente de zero;

- always: especifica que sempre que o serviço parar, seja por um falha ou porque ele simplesmente finalizou sua execução,
ele deverá ser reiniciado;

- unless-stopped: define que o container sempre será reiniciado, a menos que utilizemos o comando docker stop <container>
manualmente.

========== VARIÁVEIS DE AMBIENTE ==========

-> Toda vez que solicitarmos ao sistema operacional o valor de uma variável de ambiente, fornecemos a ele uma NOME_DA_VARIÁVEL
e ele retorna o VALOR associado a esta chave, se ela estiver definida.

-> É possível criar e usar variáveis de ambiente dentro dos containers. O nome da chave que utilizamos é environment. 

========== DEPENDÊNCIAS ENTRE SERVIÇOS ==========

-> Com a chave depends_on, conseguimos criar dependências entre os serviços!

========== RESUMO ==========

-> Três serviços, um deles usando uma imagem Docker pronta e dois com arquivo Dockerfile;
-> Mapeamos as portas de conexão;
-> Configuramos a política de reinicialização;
-> Criamos uma variável de ambiente;
-> Definimos a ordem de subida dos serviços.

========== SUBINDO SERVIÇOS ==========

-> docker-compose up
(!)  O arquivo docker-compose.yaml deve estar na mesma pasta da execução deste comando.

-> docker-compose logs <nome-do-serviço> : Para ler os logs dos serviços.

-> O Compose vai executar todos os containers especificados, baixando as imagens do Registry (Docker Hub), de acordo com o
que foi especificado no arquivo. 

-> Outro detalhe importante é que, nesse momento, além de executar os containers, o Compose vai criar uma rede virtual padrão
entre esses containers, permitindo a comunicação entre eles.

========== VERIFICANDO STATUS DOS SERVIÇOS ==========

-> docker-compose ps

========== RECONSTRUINDO IMAGEM DOCKER ==========

-> Depois de efetuar as alterações, precisamos deixar nítido que as imagens precisam ser construídas novamente usando o Compose.
Para isso, utilizamos a flag --build, junto com o comando docker-compose up. 

========== DESCENDO SERVIÇOS ==========

-> docker-compose down

========== SUBINDO SERVIÇOS ESPECÍFICOS ==========

-> docker-compose up <serviço>
EX: docker-compose up backend

========== LOGS DOS SERVIÇOS ==========

-> docker-compose logs <serviço>

-> docker-compose logs --tail 5 <serviço>: para especificar a quantidade de linhas do log.


========== >>>> ARQUIVOS COMPOSE ROBUSTOS <<<< ==========

-> volumes: são pastas dentro de um serviço que é persistente, ou seja, mesmo após descer o serviço, esta pasta ainda mantém
seus arquivos na próxima vez que os serviços subirem.

-> redes virtuais: onde alguns serviços podem se comunicar apenas em uma rede virtual #1, enquanto outros serviços podem se
comunicar apenas em uma rede virtual #2.

========== VOLUMES ==========

-> adicionar a chave { volumes } com nome específico no serviço desejado dentro do YAML.

========== REDES VIRTUAIS ==========

-> O serviço front-end só precisa se comunicar diretamente com o back-end;
-> O serviço back-end precisa se comunicar tanto com o front-end quanto com o database;
-> O serviço database só precisa se comunicar diretamente com o back-end.

Ao limitar as comunicações entre os serviços que não necessitam se comunicar de fato, acabamos criando uma arquitetura segura e
robusta para os nossos serviços.

Entendendo as alterações em nosso arquivo docker-compose.yaml:

-> No final do arquivo existe uma nova chave de primeiro nível networks:

- Em cada linha declaramos o nome de uma nova rede virtual;
- As redes virtuais permitem criar isolamento entre os serviços;
- Ao utilizar esta chave, o Compose não vai mais criar a rede virtual padrão, como estava fazendo antes!
- Dentro de cada serviço, também temos a nova chave networks:

- Para o front-end, declaramos que ele está presente na rede-virtual-1;
- Para o back-end, declaramos que ele está presente na rede-virtual-1 e na rede-virtual-2;
- Para o database, declaramos que ele está presente na rede-virtual-2.

========== SERVIÇOS VS CONTAINER ==========

-> Em ambientes de produção, temos que garantir que nossas aplicações tenham alta escalabilidade, ou seja, a aplicação deve ser
capaz de receber uma alta carga de requisições sem maiores problemas durante horários de pico.

-> E é por este motivo que normalmente temos múltiplas cópias dos nossos containers atendendo o mesmo serviço! Chamamos a
quantidade de cópias de um container como o número de réplicas atuais do serviço.

-> docker-compose up --scale service=<número-de-replicas>