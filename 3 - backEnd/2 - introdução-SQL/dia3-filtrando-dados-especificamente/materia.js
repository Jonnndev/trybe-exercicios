======================= FILTRANDO DADOS ESPECIFICAMENTE =======================

======================= WHERE =======================

-> WHERE: Operador "ONDE". Serve para especificar sua busca por uma variável que virá em seguida.

(!) Ordem dos operadores: 
    1º - ();
    2º - > * e /;
    3º - - e +;
    4º - NOT;
    5º - AND;
    6º - OR;

>>>>>>

SELECT * FROM sakila.payment
WHERE amount = 0.99 OR amount = 2.99 AND staff_id = 2;

>>>>>>

-> Como o operador AND tem preferência sobre o operador OR, ele é avaliado primeiro. Então os registros
buscados são aqueles nos quais amount = 2.99 e staff_id = 2. Na sequência, são buscados os registros nos
quais amount = 0.99, independente do valor de staff_id.

-> Ou seja, o comando é rodado como se fosse assim: amount = 0.99 OR (amount = 2.99 AND staff_id = 2);

======================= Operadores booleanos e relacionais =======================

OPERADOR - DESCRIÇÃO
//     =   IGUAL
//     >   MAIOR QUE
//     <   MENOR QUE
//     >=  MAIOR QUE OU IGUAL
//     <=  MENOR QUE OU IGUAL
//     <>  DIFERENTE DE
//     AND OPERADOR LÓGICO E
//     OR  OPERADOR LÓGICO OU
//     NOT NEGAÇÃO
//     IS  COMPARA COM VALORES BOOLEANOS (TRUE, FALSE, NULL)

======================= LIKE =======================

-> LIKE: "TIPO". É usado para buscar por meio de uma sequência específica de caracteres;

      % - O sinal de percentual, que pode representar zero, um ou múltiplos caracteres;
      _ - O underscore (às vezes chamado de underline, no Brasil), que representa um único caractere;

>>>>>>

SELECT * FROM sakila.film
WHERE title LIKE '%don';

>>>>>>

title
METAL ARMAGED>>DON<<

======================= IN e BETWEEN =======================

-> IN: trabalha com faixa de resultados.

Usando o AND ou OR em uma pesquisa:

>>>>>>

SELECT * FROM sakila.actor
WHERE first_name = 'PENELOPE'
OR first_name = 'NICK'
OR first_name = 'ED'
OR first_name = 'JENNIFER';

>>>>>>

Usando o IN em uma pesquisa:

>>>>>>

SELECT * FROM sakila.actor
WHERE first_name IN ('PENELOPE','NICK','ED','JENNIFER');

>>>>>>

SINTAXE:

>>>>>>

SELECT * FROM banco_de_dados
WHERE coluna IN (valor1, valor2, valor3, valor4, ..., valorN);

-- ou também
SELECT * FROM banco_de_dados
WHERE coluna IN (expressão);

>>>>>>

-> BETWEEN: trabalha com faixa de resultados.

>>>>>>

-- Note que o MySQL inclui o valor inicial e o final nos resultados:

SELECT title, length FROM sakila.film
WHERE length BETWEEN 50 AND 120;

>>>>>>

(!) BETWEEN com strings: digitando a palavra por completo.

>>>>>>

SELECT * FROM sakila.language
WHERE name BETWEEN 'Italian' AND 'Mandarin'
ORDER BY name;

>>>>>>

(!) BETWEEN com data: digitando ano formato padrão da data YYY-MM-DD HH:MM:SS.

>>>>>>>

SELECT rental_id, rental_date FROM sakila.rental
WHERE rental_date
BETWEEN '2005-05-27' AND '2005-07-17';

>>>>>>>

1 - Portando, qual usar (?)

Lembrando que com IN -> especificamos todos os valores que devem der incluídos.
                  BETWEEN   -> não precisa incluir os valores que estão entre o valor final e inicial.

======================= DATA e TEMPO =======================

No MySQL, o tipo DATE faz parte dos tipos de dados temporais, os quais vamos ver com mais detalhes no
decorrer do curso. O MySQL, por padrão, usa o formato YYYY-MM-DD (ano/mês/dia) ao armazenar os valores
de uma data. Você é obrigado, pelo banco de dados, a salvar nesse formato, e não é possível alterá-lo.
Temos também o tipo DATETIME, que inclui informações de tempo. 

    -> DATE - Possui apenas data, no formato YYYY-MM-DD na faixa de 1001-01-01 até 9999-12-31
    -> DATETIME - Possui data e tempo, no formato YYYY-MM-DD HH:MM:SS com a faixa de 1000-01-01 00:00:00
       até 9999-12-31 23:59:59.

1 - Encontrando dados por dara:

>>>>>>

SELECT * FROM sakila.payment
WHERE DATE(payment_date) = '2005-07-31';

>>>>>>

SELECT * FROM sakila.payment
WHERE payment_date LIKE '2005-07-31%';

>>>>>>

SELECT *
FROM sakila.payment
WHERE payment_date BETWEEN '2005-05-26 00:00:00' AND '2005-05-27 23:59:59';

>>>>>>

2 - Selecionando por uma parte da data:

    - SELECT DATE(payment_date) FROM sakila.payment; -- YYYY-MM-DD
    - SELECT YEAR(payment_date) FROM sakila.payment; -- Ano
    - SELECT MONTH(payment_date) FROM sakila.payment; -- Mês
    - SELECT DAY(payment_date) FROM sakila.payment; -- Dia
    - SELECT HOUR(payment_date) FROM sakila.payment; -- Hora
    - SELECT MINUTE(payment_date) FROM sakila.payment; -- Minuto
    - SELECT SECOND(payment_date) FROM sakila.payment; -- Segundo