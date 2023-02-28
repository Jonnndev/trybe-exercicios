=================== MANIPULAÇÃO DE STRINGS ===================

-> Principais funções de manipualação:

-- Converte o texto da string para CAIXA ALTA:
SELECT UCASE('Oi, eu sou uma string');

-- Converte o texto da string para caixa baixa:
SELECT LCASE('Oi, eu sou uma STRING');

-- Substitui as ocorrências de uma substring em uma string:
SELECT REPLACE('Oi, eu sou uma string', 'string', 'cadeia de caracteres');

-- Retorna a parte da esquerda de uma string de acordo com o
-- número de caracteres especificado:
SELECT LEFT('Oi, eu sou uma string', 3); --> Retorno: 'Oi,';

-- Retorna a parte da direita de uma string de acordo com o
-- número de caracteres especificado:
SELECT RIGHT('Oi, eu sou uma string', 6); --> Retorno: 'string';

-- Exibe o tamanho, em caracteres, da string, a função LENGTH retorna o tamanho em bytes:
SELECT CHAR_LENGTH('Oi, eu sou uma string'); --> Retorno: 21;

-- Extrai parte de uma string de acordo com o índice de um caractere inicial
-- e a quantidade de caracteres a extrair:
SELECT SUBSTRING('Oi, eu sou uma string', 5, 2); --> Retorno: 'eu';

-- Se a quantidade de caracteres a extrair não for definida,
-- então a string será extraída do índice inicial definido, até o seu final:
SELECT SUBSTRING('Oi, eu sou uma string', 5); --> Retorno: 'eu sou uma string';

(!) NO SQL AS STRINGS SÃO INDEXADAS A PARTIR DO ÍNDICE >> 1 << (!)

-> Testando em um banco de dados conhecido (sakila): 

SELECT UCASE(title) FROM sakila.film LIMIT 10;
--> Retorno:
'ACADEMY DINOSAUR'
'ACE GOLDFINGER'
'ADAPTATION HOLES'
'AFFAIR PREJUDICE'
'AFRICAN EGG'
'AGENT TRUMAN'
'AIRPLANE SIERRA'
'AIRPORT POLLOCK'
'ALABAMA DEVIL'
'ALADDIN CALENDAR'

SELECT REPLACE(title, 'ACADEMY', 'FOO') FROM sakila.film WHERE film_id = 1;
--> Retorno:
'FOO DINOSAUR'

SELECT LEFT(title, 7) FROM sakila.film WHERE film_id = 1;
--> Retorno:
'ACADEMY'

SELECT RIGHT(title, 8) FROM sakila.film WHERE film_id = 1;
--> Retorno:
'DINOSAUR'

=================== CONDICIONAIS ===================

-> base para a criação de algoritmos dinâmicos que se adaptam de acordo com a necessidade do programa.
- IF:
-- Sintaxe: SELECT IF (CONDIÇÃO, VERDADEIRO, FALSO)

--> EX: SELECT title, IF (rental_rate > 0.99, 'CARO', 'BARATO')
        FROM sakila.film;
~~~~~~~~~~~~~

(!) Em situações onde precisamos comparar mais de uma condição, melhor utilizar o:
- CASE:
-- Sintaxe: SELECT <variável>
              CASE
                WHEN
                WHEN
              ELSE
            END AS (nomear a coluna) <<<<<
            FROM
            LIMIT;

--> EX: SELECT title, RENTAL_RATE,
          CASE
            WHEN rental_rate = 0.99 THEN 'BARATO'
            WHEN rental_rate = 2.99 THEN 'MÉDIO'
            WHEN rental_rate = 4.99 THEN 'CARO'
          ELSE rental_rate = 'NÃO CLASSIFICADO'
        END AS valor
        FROM sakila.film
        LIMIT 10;
~~~~~~~~~~~~~

=================== FUNÇÕES MATEMÁTICAS ===================

-> Adição, subtração, multiplicação e divisão:

SELECT rental_duration + rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration - rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration / rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration * rental_rate FROM sakila.film LIMIT 10;
~~~~~~~~~~~~~

-> Divisão de inteiros com DIV e como encontrar seus restos com o MOD

- DIV: Retorna um resultado inteiro de uma divisão.

SELECT 10 DIV 3; -- 3
SELECT 10 DIV 2; -- 5
SELECT 14 DIV 3; -- 4
SELECT 13 DIV 2; -- 6

- MOD: Retorna o resto da divisão.

SELECT 10 MOD 3; -- 1
SELECT 10 MOD 2; -- 0
SELECT 14 MOD 3; -- 2
SELECT 13 MOD 2; -- 1
SELECT 10.5 MOD 2; -- 0.5, ou seja, 2 + 2 + 2 + 2 + 2 = 10, restando 0.5

//================ DESAFIOS ================//

1 - Monte uma query usando o MOD juntamente com o IF para descobrir se o valor 15 é par ou ímpar.
Chame essa coluna de ‘Par ou Ímpar’, onde ela pode dizer ‘Par’ ou ‘Ímpar’.

--> SELECT IF (15 MOD 2 = 0, 'PAR', 'IMPAR') AS 'Par ou Ímpar'; //IMPAR

2 - Temos uma sala de cinema que comporta 220 pessoas. Quantos grupos completos de 12 pessoas
podemos levar ao cinema sem que ninguém fique de fora?

--> SELECT 220 DIV 12; //18

3 - Utilizando o resultado anterior, responda à seguinte pergunta: temos lugares sobrando?
Se sim, quantos?

--> Sim. 18 x 12 = 216.
    220 - 216 = 4 -- Lugares restantes.
~~~~~~~~~~~~~

-> Arredondando valores

- ROUND: arredonda os números de acordo com sua parte decimal. Se for maior ou igual a 0.5, o resultado
         é um arredondamento para cima. Caso contrário, ocorre um arredondamento para baixo. 

  -- Podemos omitir ou especificar quantas casas decimais queremos
  SELECT ROUND(10.4925); -- 10
  SELECT ROUND(10.5136); -- 11
  SELECT ROUND(-10.5136); -- -11
  SELECT ROUND(10.4925, 2); -- 10.49
  SELECT ROUND(10.4925, 3); -- 10.493

- CEIL: arredonda sempre paracima.

  SELECT CEIL(10.51); -- 11
  SELECT CEIL(10.49); -- 11
  SELECT CEIL(10.2); -- 11

- FLOOR: arredonda sempre para baixo.

  SELECT FLOOR(10.51); -- 10
  SELECT FLOOR(10.49); -- 10
  SELECT FLOOR(10.2); -- 10
~~~~~~~~~~~~~

-> Exponenciação e raiz quadrada

- POW: para elevar um número X a potencia Y.

  SELECT POW(2, 2); -- 4
  SELECT POW(2, 4); -- 16

- SQRT: encontra ra raiz quadrada.

  SELECT SQRT(9); -- 3
  SELECT SQRT(16); -- 4
~~~~~~~~~~~~~

-> Gerando valores aleatórios

- RAND: para gerar numeros aleatórios.

  -- Para gerar um valor aleatório entre 0 e 1:
  SELECT RAND();

  -- Para gerar um valor entre 7 e 13:
  SELECT ROUND(7 + (RAND() * 6));

  -- O cálculo que é feito é o seguinte: (7 + (0.0 a 1.0 * 6))

//================ FIXANDO ================//

1 - Monte uma query que gere um valor entre 15 e 20.
--> SELECT ROUND(15 + (RAND() * 5));

2 - Monte uma query que exiba o valor arredondado de 15.7515971 com uma precisão de 5 casas decimais.
--> SELECT ROUND(15.7515971, 5);

3 - Estamos com uma média de 39.494 de vendas de camisas por mês. Qual é o valor aproximado para baixo
    dessa média?
--> SELECT FLOOR(39.494);

4 - Temos uma taxa de inscrição de 85.234% no curso de fotografia para iniciantes. Qual é o valor
    aproximado para cima dessa média?
--> SELECT CEIL(85.234);

=================== TRABALHANDO COM DATAS ===================

- Para consultar data e hora atual:

  SELECT CURRENT_DATE(); //YYYY-MM-DD
  SELECT NOW(); //YYYY-MM-DD HH:MM:SS

- DATEDIFF: calcula a diferença em dias entre duas datas.
- TIMEDIFF: diferença de tempo entre dois horários.

-- 30, ou seja, a primeira data é 30 dias depois da segunda
SELECT DATEDIFF('2020-01-31', '2020-01-01');

-- -30, ou seja, a primeira data é 30 dias antes da segunda
SELECT DATEDIFF('2020-01-01', '2020-01-31');

-- -01:00:00, ou seja, há 1 hora de diferença entre os horários
SELECT TIMEDIFF('08:30:10', '09:30:10');

-- -239:00:00, ou seja, há uma diferença de 239 horas entre as datas
SELECT TIMEDIFF('2021-08-11 08:30:10', '2021-08-01 09:30:10');

(!) Resultados dinâmicos com CURRENT_DATE() e NOW():

  SELECT YEAR(CURRENT_DATE()); //retorna o ano atual
  SELECT HOUR(NOW()); //retorna a hora atual

//================ FIXANDO ================//

1 - Monte uma query que exiba a diferença de dias entre '2030-01-20' e hoje.
--> SELECT DATEDIFF('2030-01-20', '2023-02-28'); //2518

2 - Monte uma query exiba a diferença de horas entre '10:25:45' e '11:00:00'.
--> SELECT TIMEDIFF('10:25:45', '11:00:00'); //-00:34:15

=================== FUNÇÕES DE AGREGAÇÃO: AVG, MIN, MAX, SUM e COUNT ===================

- As seguintes funções analisam todos os registros de uma determinada coluna e retornam
  um valor depois de comparar e avaliar todos os registros:

  // Usando a coluna replacement_cost(valor de substituição), vamos encontrar:
  SELECT AVG(replacement_cost) FROM sakila.film; // 19.984000 (Média entre todos registros)
  SELECT MIN(replacement_cost) FROM sakila.film; // 9.99 (Menor valor encontrado)
  SELECT MAX(replacement_cost) FROM sakila.film; // 29.99 (Maior valor encontrado)
  SELECT SUM(replacement_cost) FROM sakila.film; // 19984.00 (Soma de todos registros)
  SELECT COUNT(replacement_cost) FROM sakila.film; // 1000 registros encontrados (Quantidade)

//================ FIXANDO ================//

1 - A média de duração dos filmes e dê o nome da coluna de ‘Média de Duração’;
  --> SELECT AVG(length) AS 'Média de Duração' FROM sakila.film; //115.2720

2 - A duração mínima dos filmes como ‘Duração Mínima’;
  --> SELECT MIN(length) AS 'Duração Mínima' FROM sakila.film; //46

3 - A duração máxima dos filmes como ‘Duração Máxima’;
  --> SELECT MAX(length) AS 'Duração Máxima' FROM sakila.film; //185

4 - A soma de todas as durações como ‘Tempo de Exibição Total’;
  --> SELECT SUM(length) AS 'Tempo de Exibição Toral' FROM sakila.film; //115272

5 - A quantidade total de filmes cadastrados na tabela sakila.film como ‘Filmes Registrados’.
  --> SELECT COUNT(length) AS 'Filmes Registrados' FROM sakila.film; // 1000 

  =================== EXIBINDO E FILTRANDO DADOS DE FORMA AGRUPADA: GROUP BY / HAVING ===================

  - GROUP BY: Pode agrupar os resultados de uma query em uma ou mais colunas.
  Podemos utilizar o GROUP BY para agrupar os registros pelo valor de uma coluna, exibindo apenas
  um registro de cada valor,

  --> SELECT first_name FROM sakila.actor
      GROUP BY first_name; // > variável

      (!) O GROUP BY evita duplicações agrupando registros que possuem a mesma variável. 

      - caso queiramos saber quantos registros existem na tabela de cada nome registrado,
        podemos usar o COUNT();

        --> SELECT first_name, COUNT(*) FROM sakila.actor
            GROUP BY first_name; (!) Demonstra assim, em outra coluna, a quantidade de vezes que aquela
                                     variável aparece;
                        
      - Também podemos utilizar o GROUP BY para agrupar os registros pelos valores de mais de uma
        coluna.

        --> SELECT rating, rental_rate, COUNT(1) as total FROM sakila.film
            GROUP BY rating, rental_rate 
            ORDER BY rating, rental_rate;

    // Média de duração de filmes agrupados por classificação indicativa
    SELECT rating, AVG(length) AS 'Duração média'
    FROM sakila.film
    GROUP BY rating;

    // Valor mínimo de substituição dos filmes agrupados por classificação indicativa
    SELECT rating, MIN(replacement_cost) AS 'Valor Mínimo'
    FROM sakila.film
    GROUP BY rating;

    // Valor máximo de substituição dos filmes agrupados por classificação indicativa
    SELECT rating, MAX(replacement_cost) AS 'Valor Máximo'
    FROM sakila.film
    GROUP BY rating;

    // Custo total de substituição de filmes agrupados por classificação indicativa
    SELECT rating, SUM(replacement_cost) AS 'Custo Total de Substituição'
    FROM sakila.film
    GROUP by rating;

//================ DESAFIOS ================//

1 - Monte uma query que exiba a quantidade de clientes cadastrados na tabela sakila.customer
que estão ativos e a quantidade que estão inativos.

    --> SELECT active, IF (active = 0, 'INATIVO', 'ATIVO') AS 'Status',
        COUNT(*) AS 'Quantidades'
        FROM sakila.customer
        GROUP BY active;

2 - Monte uma query que exiba a média de duração de locação por classificação indicativa (rating)
dos filmes cadastrados na tabela sakila.film. Os resultados devem ser agrupados pela classificação
indicativa e ordenados da maior média para a menor.

    --> SELECT rating AS 'Classificação Indicativa',
        AVG(length) AS 'Média de Duração da Locação'
        FROM sakila.film
        GROUP BY rating
        ORDER BY AVG(length) DESC;

3 - Monte uma query para a tabela sakila.address que exiba o nome do distrito e a quantidade de
endereços registrados nele. Os resultados devem ser ordenados da maior quantidade para a menor.

    --> SELECT district AS 'Distritos',
        COUNT(address) AS 'Endereços Registrados' FROM sakila.address
        GROUP BY district
        ORDER BY COUNT(address) DESC;
~~~~~~~~~~~~~

- HAVING: Utilizado para filtrar resultados agrupados.

    --> SELECT first_name, COUNT(*)
        FROM sakila.actor
        GROUP BY first_name
        HAVING COUNT(*) > 2;

//Ou, melhor ainda, usando o AS para dar nomes às colunas de agregação,
//melhorando a leitura do resultado

    --> SELECT first_name, COUNT(*) AS nomes_cadastrados
        FROM sakila.actor
        GROUP BY first_name
        HAVING nomes_cadastrados > 2;

(!) Observação: o alias não funciona com strings para o HAVING,
    então use o underline ("_") para separar palavras
    Ou seja, o exemplo abaixo não vai funcionar

--> SELECT first_name, COUNT(*) AS 'nomes cadastrados'
    FROM sakila.actor
    GROUP BY first_name
    HAVING 'nomes cadastrados' > 2;

(!) É importante entender que, quando usamos o HAVING, estamos filtrando
somente os resultados gerados após o GROUP BY ter sido executado.

//================ FIXANDO ================//

1 - Usando a query a seguir, modifique-a de forma que exiba apenas as durações
médias que estão entre 115.0 a 121.50. Além disso, dê um alias (apelido) à coluna
gerada por AVG(length), de forma que deixe a query mais legível. Finalize ordenando
os resultados de forma decrescente.

SELECT rating, AVG(length)
FROM sakila.film
GROUP BY rating;

RESULT:
    --> SELECT rating,
        AVG(length) AS Média_de_Duração
        FROM sakila.film
        GROUP BY rating
        HAVING Média_de_Duração BETWEEN 115.0 AND 121.50
        ORDER BY Média_de_Duração DESC;

2 - Usando a query a seguir, exiba apenas os valores de total do custo de substituição
que estão acima de $3950.50. Dê um alias que faça sentido para SUM(replacement_cost), de
forma que deixe a query mais legível. Finalize ordenando os resultados de forma crescente.

SELECT rating, SUM(replacement_cost)
FROM sakila.film
GROUP by rating;

RESULT:
    --> SELECT rating,
        SUM(replacement_cost) AS Custo_de_Substituição
        FROM sakila.film
        GROUP by rating
        HAVING Custo_de_Substituição > 3950.50
        ORDER BY Custo_de_Substituição ASC;