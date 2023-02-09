========== Manipulação e Criação de Imagens no Docker ==========

-> Uma imagem Docker é um arquivo imutável e a partir dele um ou mais containers podem ser gerados. 

-> O Dockerfile é um arquivo que contém as instruções necessárias (como uma receita) para construirmos a imagem Docker exatamente como desejamos.

========== Obtendo e Removendo imagem ==========

docker pull <nome-da-imagem> -> para baixar uma imagem do Docker Hub sem executa-la.

(!) uma imagem pode ter vários conainers. (!)

docker rmi -> remover uma imagem docker.

========== Criando imagem no Docker ==========

docker system prune -af -> remover todos os containers e imagens Docker que estejam em seu computador.

FROM -> significa a partir de onde iremos começar a construção da imagem.

CMD -> mostra o comando que deve ser utilizado ao iniciar a imagem como um container. (!) Aceita uma lista de parâmetros [].

docker build <flags> -t <nome-da-imagem> <contexto> -> [ *Uma flag -t, que indicará qual será o nome da imagem, e também a tag, se utilizar o formato <nome>:<tag>; **Um contexto, ou seja, em qual caminho de pasta o Docker deve se basear para processar o arquivo Dockerfile. ***Normalmente utilizamos apenas . (ponto final), que indica a pasta atual. ] EX: docker build -t primeira-imagem (nome dado a imagem).

========== Criando servidor Web ==========

COPY -> copia um arquivo no computador local e o coloca dentro da imagem, no caminho especificado à frente. Possui a capacidade de copiar arquivos entre os estágios;

ADD -> o comando ADD poderia fazer o mesmo que o copy e ainda possui mais funcionalidades, como: 1 - Fazer o download do conteúdo de uma URL <src> na pasta de destino <dest> | 2 - Descompactar automaticamente arquivos compactados de formatos reconhecidos (.tar, .gzip, .bzip2, etc)

EXPOSE -> indica que a imagem poderá receber conexões pelo número da porta que for informado.

-P -> a flag -P atribui automaticamente uma porta local conectada à porta do container executado, realizando o bind de portas.

-p -> já essa flag necessita de complemento indicando em qual porta será feito o bind. EX: docker container run -d -p 80:80 [...]. Nesse caso estamos ligando a porta 80 local com a porta 80 do container.

========== Criando imagens robustas ==========

Hugo -> ferramenta que facilita a criação de páginas,  de modo que as pessoas possam focar mais em escrever o conteúdo do que se preocupar com tags HTML das páginas.

AS -> prefixo que nomeia o estágio atual (AS) do processamento.

WORKDIR ->  indica para o Docker qual é a pasta atual de trabalho dentro da imagem.

ENTRYPOINT -> indica para o Docker qual comando deve ser executado ao iniciar o container.

--from -> indica que devemos copiar o seguinte arquivo ou pasta de um estágio para o estágio atual.

ENV -> utilizado para setar variáveis que podem ser recuperadas no container.

========== RUN vs. ENTRYPOINT vs. CMD ==========

1º - RUN <comando> <argumento1> <argumento2> <argumentoN>:

Indica que o comando dado deve ser executado durante a construção da imagem Docker!
Ou seja, é muito comum utilizar o RUN para fazer instalações de dependências.

2º - ENTRYPOINT <comando> <argumento1> <argumento2> <argumentoN>:

Indica qual é o comando (e seus argumentos) que deve ser executado ao iniciar esta imagem Docker como um container.
Considere o ENTRYPOINT como obrigação de comando a ser executado. Ele sempre será utilizado como ponto de entrada da imagem.

3º - CMD <comando> <argumento1> <argumento2> <argumentoN>:

Indica qual é o comando (e seus argumentos) que pode ser executado ao iniciar esta imagem Docker como um container.
Conside o CMD como sugestão de comando a ser executado.
Ele pode ser substituído ao executar o comando docker run imagem <comando> <argumento1>.

EXEMPLOS CMD VS ENTRYPOINTS

============ 1 ============
Dockerfile: 
FROM alpine:3.14
CMD ["echo", "Olá mundo!"]

docker run --rm exemplo-cmd:
pessoa@trybe:~$ docker run --rm exemplo-cmd
Olá mundo!
pessoa@trybe:~$

docker run --rm exemplo-cmd echo "Sou diferente!":
pessoa@trybe:~$ docker run --rm exemplo-cmd echo "Sou diferente!"
Sou diferente!
pessoa@trybe:~$

============ 2 ============
Dockerfile: 
FROM alpine:3.14
ENTRYPOINT ["echo", "Olá mundo!"]

docker run --rm exemplo-entrypoint:
pessoa@trybe:~$ docker run --rm exemplo-entrypoint
Olá mundo!
pessoa@trybe:~$

docker run --rm exemplo-entrypoint "Sou diferente!":
pessoa@trybe:~$ docker run --rm exemplo-entrypoint "Sou diferente!"
Olá mundo! Sou diferente!
pessoa@trybe:~$

============ 3 ============
Dockerfile: 
FROM alpine:3.14
ENTRYPOINT ["echo"]
CMD ["Sou a mensagem padrão."]

docker run --rm exemplo-entrypoint-cmd:
pessoa@trybe:~$ docker run --rm exemplo-entrypoint-cmd
Sou a mensagem padrão.
pessoa@trybe:~$

docker run --rm exemplo-entrypoint-cmd "Sou uma mensagem nova!":
pessoa@trybe:~$ docker run --rm exemplo-entrypoint-cmd "Sou uma mensagem nova!"
Sou uma mensagem nova!
pessoa@trybe:~$

==================================================

Ordem de execução do container:
<conteúdo-do-entrypoint> <conteúdo-do-cmd>