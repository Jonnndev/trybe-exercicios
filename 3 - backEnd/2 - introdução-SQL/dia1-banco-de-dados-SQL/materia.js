========================================== BANCOS DE DADOS SQL ==========================================

- Salvar os dados das aplicações no servidor
- Ampla utilização no mercado de trabalho

==========================================  O QUE É E QUAIS OS TIPOS DE BANCOS DE DADOS ==========================================

-> Dados são fatos, percepções ou observações sobre algo.
-> Existem desordenadamente.

-> O banco de dados reune os dados de forma estruturada, organizada e pesquisável.
-> É possível gerar novos dados a partir do BD.

-> O BD é limitado às pessoas.
-> SGBD - Sistema de Gerenciamento de Banco de Dados.

-> Banco de dados relacionais VS Não relacionais.
(1º): - Armazenam os dados em tabelas.
      - Possui estrutura pré-definida.
      - Não permitem alterações dinâmicas.
      - Previsibilidade.
      - Relacionamento entre as tabelas.
      - Linguagem: SQL.

(2º): - Possui estrutura pré-definida NÃO OBRIGATÓRIA.
      - Dados podem ser inseridos dinamicamente.

==========================================  O QUE É SQL? ==========================================

Structured Query Language -> é a linguagem mais usada para criar, pesquisar, extrair e também manipular dados dentro
de um banco de dados relacional.

Comandos: - SELECT
          - UPDATE
          - DELETE
          - INSERT
          - WHERE

==========================================  COMO AS INFORMAÇÕES SÃO ARMAZENADAS? ==========================================

LINHAS -> é uma instância daquilo que queremos representar
COLUNA -> descreve uma característica que queremos armazenar

==========================================  INSTALAR MySQL COM DOCKER ==========================================

-> Criar e rodar:
docker container run --name container-mysql -e MYSQL_ROOT_PASSWORD=senha-mysql -d -p 3306:3306 mysql:5.7

-> Parar:
docker container stop container-mysql

-> Iniciar:
docker container start container-mysql

-> Remover:
docker container rm container-mysql

==========================================  MySQL NA LINHA DE COMANDO ==========================================

-> Entrar na linha de comando do container:
docker exec -it container-mysql bash

-> Acessar o MySQL do container:
mysql -u root -p

-> Mostrar todos os bancos de dados instalados:
SHOW DATABASES;

==========================================  COMANDOS MAIS COMUNS ==========================================

-> USE: serve pra definir a referência do banco de dados que será utilizado na query.

        - USE nome_do_banco_de_dados_que_quero_conectar;
        EX: USE trybe;

(!) Outra forma de fazer referência ao banco é no formato: banco_de_dados.tabela

        - SELECT * FROM banco_de_dados.tabela;
        EX: SELECT * FROM trybe.students;

-> SHOW TABLES; para retornar todas as tabelas inicializadas no seu server.

-> DESCRIBE nome_da_tabela; para visualizar estrutura de uma tabela:
        - EX: DESCRIBE students;

-> CREATE DATABASE nome_do_banco_de_dados; Criar um banco de dados:
        - EX: CREATE DATABASE trybe;

==========================================   WORKBENCH ==========================================


========================================== Constraints (restrições) ==========================================

Uma das grandes vantagens de armazenar seus dados em um banco de dados é possibilitar a criação de restrições ou regras.
Essas restrições limitam os tipos de dados de uma COLUNA em uma determinada tabela, o que fornece assertividade e confiabilidade em seu banco de dados.
Em outras palavras, podemos dizer que se você tentar executar alguma ação que viole as regras da constraint, a ação não será concluída.

-> NOT NULL - Garante que aquele campo não pode conter valores nulos, ou seja, se não houver um valor padrão (DEFAULT) definido, 
será sempre necessário passar um valor para esse campo durante a inserção ou alteração de dados.

-> UNIQUE - Garante que o valor inserido na coluna da tabela é único, isto é, não pode haver outro valor igual para esta coluna registrado nesta tabela.

-> PRIMARY KEY - Garante que o valor seja a chave primária da tabela, ou seja, que a coluna que possui essa constraint aplicada seja o identificador
único da tabela. Ela também é, por definição, não nula (mesmo efeito da constraint NOT NULL) e única (mesmo efeito da constraint UNIQUE).

-> FOREIGN KEY - Garante que o valor seja uma chave estrangeira da tabela, ou seja, faça referência à chave primária
(valor em uma coluna com a constraintPRIMARY KEY) de outra tabela, permitindo um relacionamento entre tabelas.

-> DEFAULT - Garante que, caso nenhum valor seja inserido na coluna (ou caso a pessoa usuária insira um valor nulo), a constraint colocará o valor padrão
passado para ela.

        EX:  imagine uma tabela que liste os sabores de sorvete de uma sorveteria.
        Nessa tabela, temos três COLUNAS: um código identificador, o nome do sabor
        do sorvete e o código identificador de quem fornece.
        -> Constraints que podemos adicionar às tabelas:
                 
                - [ Código identificador (id)] - Para o id do sorvete, precisamos que ele identifique e represente o sabor do sorvete na tabela,
                então podemos adicionar como constraint a PRIMARY KEY.

                - [ Nome ] - Aqui, queremos que os valores sejam únicos, afinal, não temos a necessidade de cadastrar um novo sabor de sorvete que
                já conste na tabela. Além disso, queremos que, ao cadastrar, o valor não seja nulo. Então, como constraints, podemos adicionar
                UNIQUE e NOT NULL.

                - [ Código identificador de quem fornece (id) ] - Suponha que já possuímos uma tabela onde listamos todas as empresas fornecedoras,
                e que nessa tabela, os valores estão sendo representados por uma primary key. Então, podemos atribuir como constraint a FOREIGN KEY.

========================================== O QUE É UMA ENTIDADE? ==========================================

Refere-se a uma  tabela que representa algum conceito do mundo real que você quer descrever (pessoa, eventos, acontecimentos) e suas propriedades
(altura, horário do evento, nome do acontecimento).

-> A entidade pessoa, por exemplo, pode ter as propriedades de altura, peso e idade.
-> Uma entidade festa pode possuir as propriedades horário do evento, público-alvo e data da festa.
-> Uma entidade venda pode possuir as propriedades valor da venda, dia da venda, produto vendido.

(!) A entidade é nossa tabela dentro de um banco de dados e as propriedades fazem parte dessa tabela.

========================================== COMO OS DADOS SÃO LIGADOS? ==========================================

Para não precisarmos duplicar dados em tabelas diferentes, podemos estabelecer relacionamentos entre as
tabelas. Em um banco de dados existem quatro tipos de relacionamento

-> UM PARA UM: Uma linha da Tabela A só deve possuir uma linha correspondente na tabela B ou vice-versa.

-> UM PARA MUITOS OU MUITOS PARA UM: Esse é um dos tipos mais comuns de relacionamento. Em cenários assim, uma linha na tabela A
pode ter várias linhas correspondentes na tabela B, mas uma linha da tabela B só pode possuir uma linha correspondente na tabela A.

-> MUITOS PARA MUITOS: O tipo de relacionamento muitos para muitos acontece quando uma linha na tabela A pode possuir muitas linhas
correspondentes na tabela B e vice-versa.



