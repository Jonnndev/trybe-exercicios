// ========== CONCEITOS DOCKER ==========

// O Docker garante a funcionalidade das aplicaçoes em diversos dispositivos diferentes devido ao empacotamento (containerização) de seus requisitos operacionais.

// ========== Imagens X Containers ==========

// A imagem é a nossa aplicação “empacotada” com todas as dependências necessárias já instaladas dentro dela.A imagem é a nossa aplicação “empacotada” com todas as dependências necessárias já instaladas dentro dela.

//  O container é um processo que representa a execução de uma imagem já construída anteriormente.

// ========== Registry ==========

// É um local remoto onde podemos encontrar diversas imagens, públicas e privadas, ja feitas por outras pessoas

// ========== Comandos básicos ==========

//  docker images -> para listar as imagens presentes na máquina

// docker ps OU docker container ls -> para listar os containers em execução no momento na máquina.
// PS: para exibir containers que foram parados ou que terminaram sua execução -> docker ps -a

// container run <flags>? <imagem>:<tag> <argumentos>? -> para executar um novo container. EX: docker container run alpine:3.14 echo "Hello World"

// FLAG: --name -> nos permite colocar um nome específico para o container. EX: docker container run --name MEU-CONTAINER alpine:3.14 echo "Hello World 2"

// FLAG: rm -> container só pode ser removido com esse comando. EX: docker rm xenodochial_kapitsa

// AUTOREMOVER: exclui o container logo após finalizar sua execução. EX: docker container run --rm alpine:3.14 echo "Hello World 3".

// SEGUNDO PLANO - FLAG: -d: faz com que a execução do container ocorra em segundo plano. EX: docker container run --rm -d alpine:3.14 sleep 300

//docker stop -t 0 -> força o container a encerrar sua execução.

// ========== Comandos Avançados ==========

// docker exec -it <nome-do-container> <comando-a-ser-executado> -> acessar o terminal de um container.

// docker logs <flags> <nome-do-container> -> nos permite verificar os logs de determinado container em execução.

// docker top -> traz as informações sobre os processos que estão sendo rodados dentro do container

// docker container prune -> remove TODOS os containers inativos do computador.

// ========== RESUMO ==========


// Docker: conjunto de ferramentas (Daemon, API, CLI) para gerenciar imagens e containers.

// Arquivo Dockerfile: arquivo com linguagem própria, com os passos necessários para criar uma nova imagem Docker usando o código-fonte de um projeto.

// Imagem Docker: é o projeto “compactado”, que foi construído de acordo com os passos contidos no arquivo Dockerfile. Pode ser usado como base para criar novas imagens Docker.

// Container: é a execução de projeto através da sua imagem Docker já construída anteriormente.

// Registry: é o local remoto onde podemos enviar e baixar imagens Docker. Um registry pode ser público ou privado.

// Docker Hub:

// É o registry oficial da empresa Docker Inc.
// Ele é público, porém possui alguns limites.
// É possível assinar o serviço para utilizá-lo como registry privado.