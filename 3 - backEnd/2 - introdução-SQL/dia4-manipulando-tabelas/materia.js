=========================== MANIPULANDO TABELAS ===========================

CRUD (Create, Read, Update, Delete) 

=========================== INSERT ===========================

(!) Informações importantes sobre os tipos de aspas:

    -> Backticks ou crase (``): são usadas para identificar nome de tabelas e colunas. São necessárias
       apenas quando o identificador for uma palavra reservada do MySQL, ou quando o nome da tabela ou
       coluna contiver espaços em branco.

    -> Aspas simples (''): devem ser usadas em valores do tipo string. Aspas simples são aceitas na
       maioria dos Sistemas de Gerenciamento de Banco de Dados, sendo assim, é preferível usar aspas
       simples no lugar das aspas duplas.

A sintaxe para inserir dados em uma tabela é a seguinte:

>>>>>>

INSERT INTO nome_da_tabela (coluna1, coluna2)
VALUES ('valor_coluna1', 'valor_coluna2');

>>>>>>

- A query acima vai inserir uma linha na tabela nome_da_tabela com os valores em suas colunas
correspondentes. 

Para multiplas linhas: 

>>>>>>

INSERT INTO nome_da_tabela (coluna1, coluna2) VALUES
('valor_1','valor_2'),
('valor_3','valor_4'),
('valor_5','valor_6');

>>>>>>

(!) Utilizando INSERT IGNORE:
    
    -> Para ignorar erros pulando os dados problemáticos.

>>>>>>

INSERT IGNORE INTO pessoas (id, name) VALUES
(4,'Gloria'), -- Sem o IGNORE, essa linha geraria um erro e o INSERT não continuaria, pois é um nome repetido;
(5,'Amanda');

>>>>>>

(!) Inserindo valores na tabela com auto_increment:

    -> É uma funcionalidade que todos os bancos de dados possuem. Ela permite que valores sejam gerados
       automaticamente cada vez que uma nova linha é inserida em uma tabela que tem essa restrição ativa.

    -> Com isso em mente, a coluna que possui auto_increment é omitida no INSERT, uma vez que o valor já 
       é gerado automaticamente:

>>>>>>

INSERT INTO sakila.actor (first_name, last_name)
VALUES('Marcelo','Santos');

>>>>>>

(!) Inserindo dados de uma outra tabela com INSERT INTO SELECT:

>>>>>>

INSERT INTO tabelaA (coluna1, coluna2)
    SELECT tabelaB.coluna1, tabelaB.coluna2
    FROM tabelaB
    WHERE tabelaB.nome_da_coluna <> 'algumValor'
    ORDER BY tabelaB.coluna_de_ordenacao;

>>>>>>

    -> Assim, estaríamos extraindo a coluna1 e a coluna2 da tabelaB e as inserindo na tabelaA, de acordo
       com a condição que for passada no WHERE.

    -> É possível usar também SELECT * FROM e copiar todos os dados de todas as colunas de uma tabela
       para outra, mas nessa situação a tabelaA e a tabelaB precisam obrigatoriamente possuir a mesma
       quantidade de colunas, e os tipos de dados das colunas correspondentes devem ser iguais.

Com essa funcionalidade, é fácil criar tabelas temporárias para testes ou por necessidade.
Por exemplo, para trazer os dados da tabela sakila.staff para a tabela sakila.actor, poderíamos fazer:

>>>>>>

INSERT INTO sakila.actor (first_name, last_name)
	SELECT first_name, last_name FROM sakila.staff;

>>>>>>

=========================== UPDATE ===========================

UPDATE: permite alterar valores de uma tabela com base em alguma condição.

>>>>>>

UPDATE sakila.staff
SET first_name = 'Rannveig'  ----> novo valor
WHERE first_name = 'Ravein'; ---> condição específica (!) IMPORANTE para não alterar toda a tabela

>>>>>>

    (!) Uma curiosidade sobre o UPDATE e o DELETE no MySQL Server é que, por padrão, existe uma
        configuração chamada safe updates mode que só vai te permitir executá-los caso eles incluam
        quais IDs devem ser modificados. Então, caso você tente fazer a query acima, ela não
        funcionaria por não incluir o ID.

        - SET SQL_SAFE_UPDATES = 0; ---> Oara evitar essa restrição, rodar sempre que abrir o banco.

(!) Alterando mais de uma COLUNA ao mesmo tempo:

>>>>>>

UPDATE sakila.staff
SET first_name = 'Rannveig', last_name = 'Jordan'
WHERE staff_id = 4;

>>>>>>

(!) UPDATE em massa:

>>>>>>

-- Opção 1 - Incluindo a lista de condições fixas
UPDATE sakila.actor
SET first_name = 'JOE'
WHERE actor_id IN (1,2,3);

-- Opção 2 - Especificando como cada entrada será alterada individualmente
UPDATE sakila.actor
SET first_name = (
CASE actor_id WHEN 1 THEN 'JOE' -- se actor_id = 1, alterar first_name para 'JOE'
              WHEN 2 THEN 'DAVIS' -- se actor_id = 2, alterar first_name para 'DAVIS'
              WHEN 3 THEN 'CAROLINE' -- se actor_id = 3, alterar first_name para 'CAROLINE'
	      ELSE first_name -- em todos os outros casos, mantém-se o first_name
END);

>>>>>>

(!) UPDATE de forma sequencial:

  -> Se o comando ORDER BY for usado juntamente com o UPDATE, os resultados serão alterados na ordem
     em que forem encontrados.

  -> Se o comando LIMIT for usado em conjunto com o UPDATE, um limite será imposto na quantidade de
     resultados que podem ser alterados. Caso contrário, todos os resultados que satisfizerem a
     condição serão atualizados.

>>>>>>

UPDATE nome_da_tabela
SET coluna1 = valor1, coluna2 = valor2
[WHERE condições]
[ORDER BY expressao [ ASC | DESC ]]
[LIMIT quantidade_resultados];

-- Exemplo:
UPDATE sakila.staff
SET password = 'FavorResetarSuaSenha123'
WHERE active = 1
ORDER BY last_update
LIMIT 2;

>>>>>>

=========================== --safe-updates ===========================

    (!) -> Ele é útil para casos nos quais você tenha emitido um comando UPDATE ou DELETE,
           mas esquecido de incluir WHERE para indicar quais linhas devem ser modificadas,
           evitando que a query atualize ou exclua todas as linhas da tabela.

A opção --safe-updates exige que o mysql execute a seguinte instrução ao se conectar ao servidor:

- SET sql_safe_updates=1, sql_select_limit=1000, max_join_size=1000000;

    -> sql_select_limit=1000: limita o conjunto de resultados SELECT a 1.000 linhas, a menos que a
       instrução inclua LIMIT.

    -> max_join_size=1.000.000: faz com que as instruções SELECT de várias tabelas produzam um erro
       se o servidor estimar que deve examinar mais de 1.000.000 combinações de linhas.

Você pode desabilitar o --safe-updates utilizando o comando SET:

- SET SQL_SAFE_UPDATES = 0;

=========================== DELETE ===========================

>>>>>>

DELETE FROM banco_de_dados.tabela
WHERE coluna = 'valor';
-- O WHERE é opcional. Porém, sem ele, todas as linhas da tabela seriam excluídas.

>>>>>>

DELETE FROM sakila.film_text
WHERE title = 'ACADEMY DINOSAUR';

>>>>>>

  (!) -> Importante: Novamente, caso o modo --safe-updates esteja habilitado, o comando DELETE só
         funcionaria se os IDs fossem incluídos em suas queries. 

  (!) -> Caso haja relações entre as tabelas (primary key e foreign keys) e existam restrições
         aplicadas a elas, ao executar o DELETE ocorrerá uma ação de acordo com a restrição que
         tiver sido imposta na criação da foreign key. Essas restrições podem ser:

-- Rejeita o comando DELETE.
ON DELETE NO ACTION;

-- Rejeita o comando DELETE.
ON DELETE RESTRICT;

-- Permite a exclusão dos registros da tabela pai, e seta para NULL os registros da tabela filho.
ON DELETE SET NULL;

-- Exclui a informação da tabela pai e registros relacionados.
ON DELETE CASCADE;

>>>>>>

DELETE FROM sakila.actor
WHERE first_name = 'GRACE';

>>>>>>

-> O banco de dados não vai permitir que você delete o ator chamado “GRACE”. Isso acontece porque a
   coluna actor_id da tabela film_actor é uma chave estrangeira (foreign key) que aponta para a coluna
   actor_id na tabela actor, e essa chave estrangeira possui a restrição ON DELETE RESTRICT. Se essa
   restrição não existisse, o ator seria deletado, deixando nosso banco de dados em um estado
   inconsistente, pois haveria linhas na tabela film_actor com um actor_id que não mais existiria!

Para conseguir excluir este ator em actors, precisamos primeiro excluir todas as referências a ele
na tabela sakila.film_actor:

>>>>>>

DELETE FROM sakila.film_actor
WHERE actor_id = 7; ---> actor_id = 7 é o Id de GRACE

>>>>>>

Após excluir as referências, podemos excluir o ator com o nome “GRACE”:

>>>>>>

DELETE FROM sakila.actor
WHERE first_name = 'GRACE';

>>>>>>

=========================== DELETE VS TRUNCATE ===========================

Se tem certeza absoluta de que quer excluir os registros de uma tabela de uma maneira mais rápida,
para efeitos de testes ou necessidade, o TRUNCATE é mais rápido que o DELETE. A função principal e
única do TRUNCATE é de limpar (excluir todos os registros) de uma tabela, não sendo possível
especificar o WHERE. Por isso, o TRUNCATE só pode ser usado nesse cenário.

>>>>>>

TRUNCATE banco_de_dados.tabela;

>>>>>>

=========================== RESUMO ===========================

Todos os conceitos apresentados para se operar as informações em um banco de dados podem ser resumidos
pelo conceito de CRUD.

    -> Adicionar novas informações ao banco de dados, utilizamos o conceito CREATE com o comando:

      >>>>>>
        INSERT INTO banco.tabela (coluna1, coluna2) VALUES (‘valor_A’, ‘valor_B’);
      >>>>>>   

    -> Obter as informações armazenadas no bando de dados, utilizamos o conceito READ, com o comando:

      >>>>>>
        SELECT colunaA, colunaB FROM banco.tabela;
      >>>>>>

    -> Atualizar informações existentes no banco de dados, utilizamos o conceito UPDATE com o comando:

      >>>>>>
        UPDATE banco.tabela SET coluna1='valor' WHERE alguma_condicao;
      >>>>>>

    -> Remover informações existentes no banco de dados, utilizamos o conceito DELETE com o comando:

      >>>>>>
        DELETE FROM banco.tabela WHERE alguma_condicao;
      >>>>>>