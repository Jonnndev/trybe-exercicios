========================================= ENCONTRANDO DADOS =========================================
========================================= O QUE SÃO QUERIES? =========================================

É o nome dado aos comandos que você digita dentro de uma janela ou linha de comando com a intenção de 
interagir de alguma maneira com uma base de dados

-> DDL: Data Definition Language - Todos os comandos que lidam com o esquema, a descrição e o modo como
os dados devem existir em um banco de dados:

  - CREATE: Para criar bancos de dados, tabelas, índices, views, procedures, functions e triggers;
  - ALTER: Para alterar a estrutura de qualquer objeto;
  - DROP: Permite deletar objetos;
  - TRUNCATE: Apenas esvazia os dados dentro de uma tabela, mas a mantém no banco de dados.

  -> DML: Data Manipulation Language - Comandos que são usados para manipular dados. São utilizados para
  armazenar, modificar, buscar e excluir dados em um banco de dados. Os comandos e usos mais comuns nesta
  categoria são:

    - SELECT: Usado para buscar dados em um banco de dados;
    - INSERT: Insere dados em uma tabela;
    - UPDATE: Altera dados dentro de uma tabela;
    - DELETE: Exclui dados de uma tabela.

-> DCL: Data Control Language - Mais focado nos comandos que concedem direitos, permissões e outros tipos
de controle ao sistema de banco de dados.

    - GRANT: Concede acesso a um usuário;
    - REVOKE: Remove acessos concedidos através do comando GRANT.

-> TCL: Transactional Control Language - Lida com as transações dentro de suas pesquisas.
    
    - COMMIT: Muda suas alterações de temporárias para permanentes no seu banco de dados;
    - ROLLBACK: Desfaz todo o impacto realizado por um comando;
    - SAVEPOINT: Define pontos para os quais uma transação pode voltar. É uma maneira de voltar para pontos
      específicos de sua query;
    - TRANSACTION: Comandos que definem onde, como e em que escopo suas transações são executadas.

========================================= SELECT =========================================

-> SELECT: para gerar valores.

-> AS: para dar nomes às suas colunas.

  1 - É possível gerar e calcular valores usando apenas SELECT valor_a_ser_calculado_ou_exibido;
  2 - Perceba que a palavra-chave AS permite que você dê nome às suas colunas para que elas façam mais sentido
  quando estiver lendo os resultados. Lembre-se de que, caso o nome tenha mais de uma palavra, devemos usar
  aspas simples para nomear as colunas;
  3 - Note que sempre finalizamos uma query usando o ponto e vírgula (;);
  4 - Observe também que as palavras-chave (reservadas) estão em maiúsculo. Isso é uma convenção para facilitar
  a leitura da query. 

    - SELECT * FROM banco_de_dados.tabela_escolhida; -> Retorna TODA a tabela daquele banco de dados.
    - SELECT city, country_id FROM banco_de_dados.tabela_escolhida -> Retorna as colunas ESPECÍFICAS city e country_id.

    (!) PARA DIMINUIR VERBOSIDADE USAR "USE" ANTES DOS COMANDOS SEGUINTES PARA SELECIONAR O BANCO DE DADOS DESEJADO.

    - USE banco_de_dados;
    - SELECT * tabela_escolhida;
    - SELECT city, country_id FROM tabela_escolhida;

========================================= CONCAT =========================================

-> CONCAT: para concatenar dados;

  - SELECT CONCAT(first_name, last_name) FROM banco_de_dados.pessoas;

    -- jonathasoliveira

  - SELECT CONCAT(first_name, " ", last_name) FROM sakila.actor;

    -- jonathas oliveira

  - SELECT CONCAT(first_name, " ", last_name) AS "Nome Completo" FROM sakila.actor;

    -- coloca o nome definido na COLUNA

========================================= DISTINCT =========================================

-> DISTINCT: para remover dados duplicados do banco de dados.

  - SELECT DISTINCT first_name, last_name FROM banco_de_dados.pessoas;
    
    -- Nesse caso, irá remover nomes que possuam as duas varíaveis iguais.
      Ex: Amanda Bento
          Amanda Senra
          Jonathas Oliveira
          Amanda Senra -> será removido

(!) Esse comando não apaga os dados do ImageBitmapRenderingContext, apenas não os exibe na tela de comando.

========================================= COUNT =========================================

-> COUNT: retorna o número resultado da conta.

  - SELECT COUNT (*) FROM banco_de_dados.pessoas;
    
    -- Conta quantas pessoas existem na tabela pessoas.

  - SELECT COUNT (first_name) FROM banco_de_dados.pessoas;

    -- Conta e retorna o resultado levando em consideração a variável COLUNA determinada.


  - SELECT COUNT (DISTINCT first_name) FROM banco_de_dados.pessoas;

    -- Conta e retorna o resultado levando em consideração APENAS "first_name" que sejam diferentes.

~~~~~~~

  - SELECT COUNT (district) FROM sakila.adress
    WHERE district = 'Alberta';

    -- Irá retornar a quantidade exata de contagem que correspondem a condição dada.

(!) O comando COUNT não retorna dados NULOS, mas retorna dados vazios ('');

========================================= LIMIT =========================================

-> LIMIT: especifica a quantidade de resultados.

  - SELECT * FROM sakila.rental LIMIT 10;

    -- Limita os resultados recebidos a 10 linhas.

  ========================================= LIMIT OFFSET =========================================

-> LIMIT OFFSET: Para pular uma certa quantidade de linhas do seu resultado.

    - SELECT * FROM sakila.rental LIMIT 10 OFFSET 3;

    -- Além de limitar os resultados recebidos a 10 linhas, pula as 3 primeiras linhas.

    ========================================= ORDER BY =========================================

-> ORDER BY: ordena os reultados da forma desejada.

  - SELECT * FROM sakila.address
    ORDER BY district ASC, address DESC;

========================================= RESUMO =========================================

-> Para fazer pesquisas e retornar dados do banco, utilizamos o SELECT.
-> Para juntar (concatenar) duas ou mais colunas, utilizamos o CONCAT.
-> Para evitar dados repetidos em nossas queries, utilizamos o DISTINCT.
-> Para contar todos os dados retornados, usamos o COUNT.
-> Com o LIMIT e o OFFSET, podemos especificar quantos e quais serão os valores retornados.
-> E para ordenar nossos dados de maneira crescente ou decrescente, utilizamos o comando ORDER BY.