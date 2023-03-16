=================================== JOIN ===================================

- A ideia do JOIN é permitir combinar registros de duas ou mais tabelas,
através do relacionamento que uma tabela tem com a outra.

=================================== INNER JOIN ===================================

- INNER JOIN: permite retornar todos os resultados em que a condição da cláusula ON for satisfeita.

~~~~~~~~~~~
Sintaxe:

SELECT t1.coluna, t2.coluna
FROM tabela1 AS t1
INNER JOIN tabela2 AS t2
ON t1.coluna_em_comum = t2.coluna_em_comum;
~~~~~~~~~~~

//========================= FIXANDO =========================//

1 - Monte uma query que exiba o id do ator, nome do ator e id do filme em que ele já atuou,
usando as tabelas actor e film_actor.

--> SELECT
      act.actor_id,
      CONCAT(act.first_name, " ", act.last_name) AS Nome_Completo,
      film.film_id
    FROM
      sakila.actor AS act
    INNER JOIN
      sakila.film_actor AS film
    ON
      act.actor_id = film.actor_id;

2 - Use o JOIN para exibir o nome, sobrenome e endereço de cada um dos funcionários do banco.
Use as tabelas staff e address.

--> SELECT
      staff.first_name,
      staff.last_name,
      staff.address_id,
      CONCAT(address.district, ", ", address.address) AS Endereço_Completo
    FROM
      sakila.staff AS staff
    INNER JOIN
      sakila.address AS address
    ON
      staff.address_id = address.address_id;

3 - Exiba o id do cliente, nome e email dos primeiros 100 clientes, ordenados pelo nome em ordem
decrescente, juntamente com o id do endereço e o nome da rua onde o cliente mora. Essas informações
podem ser encontradas nas tabelas customer e address.

--> SELECT
      customer.customer_id,
      CONCAT(customer.first_name, " ", customer.last_name) AS Nome_Completo,
      customer.email,
      customer.address_id,
      address.address AS Nome_da_Rua
    FROM
      sakila.customer AS customer
    INNER JOIN
      sakila.address AS address
    ON
      customer.address_id = address.address_id
    ORDER BY
      Nome_Completo DESC
    LIMIT 100;

4 - Exiba o nome, email, id do endereço, endereço e distrito dos clientes que moram no distrito da
California e que contêm “rene” em seus nomes. As informações podem ser encontradas nas tabelas address
e customer.

--> SELECT
      CONCAT(customer.first_name, " ", customer.last_name) AS Nome_Completo,
      customer.email,
      customer.address_id,
      address.address,
      address.district
    FROM
      sakila.customer AS customer
    INNER JOIN
      sakila.address AS address
    ON
      customer.address_id = address.address_id
    WHERE
      address.district = 'California'
    AND
      customer.first_name LIKE 'rene%';

5 - Exiba o nome, o sobrenome e a quantidade de filmes alugados por cada cliente cadastrado. Ordene
seus resultados por nome e sobrenome de forma decrescente. Exiba somente os clientes ativos. As
informações podem ser encontradas nas tabelas customer e rental.

--> SELECT
      customer.first_name,
      customer.last_name,
      COUNT(rental.customer_id) AS Alugueis
    FROM
      sakila.customer As customer
    INNER JOIN
      sakila.rental AS rental
    ON
      customer.customer_id = rental.customer_id
    GROUP BY
      rental.customer_id
    ORDER BY
      CONCAT(customer.first_name, " ", customer.last_name) DESC;

6 - Monte uma query que exiba o nome, sobrenome e a média de valor (amount) paga aos funcionários no
ano de 2006. Use as tabelas payment e staff. Os resultados devem estar agrupados pelo nome e sobrenome
do funcionário.

--> SELECT
      CONCAT(staff.first_name, " ", staff.last_name) AS Nome_Completo,
      AVG(payment.amount) AS Media_Pagamento
    FROM
      sakila.staff AS staff
    INNER JOIN
      sakila.payment AS payment
    GROUP BY
      staff.staff_id;

7 - Monte uma query que exiba o id do ator, nome, id do filme e título do filme, usando as tabelas
actor, film_actor e film. Dica: você precisará fazer mais de um JOIN na mesma query.

--> SELECT
      actor.actor_id,
      CONCAT(actor.first_name, " ", actor.last_name) AS Nome_Completo,
      film_act.film_id,
      film.title
    FROM
      sakila.actor AS actor
    INNER JOIN
      sakila.film_actor AS film_act
    ON
      actor.actor_id = film_act.actor_id
    INNER JOIN
      sakila.film AS film
    ON
      film_act.film_id = film.film_id;

=================================== LEFT JOIN & RIGHT JOIN ===================================

~~~~~~~~~~~~~
LEFT JOIN:  quando utilizamos o LEFT JOIN, focamos a tabela da esquerda. São retornados todos
os registros da tabela da esquerda e valores correspondentes da tabela da direita, caso existam.
Valores que não possuem correspondentes são exibidos como nulos.

SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    a.actor_id,
    a.first_name,
    a.last_name
FROM sakila.customer AS c
LEFT JOIN sakila.actor AS a
ON c.last_name = a.last_name
ORDER BY c.last_name;
~~~~~~~~~~~~~

RIGHT JOIN: Quando utilizamos o RIGHT JOIN, focamos a tabela da direita. São retornados todos os
registros da tabela da direita e valores correspondentes da tabela da esquerda, caso existam.
Valores que não possuem correspondentes são exibidos como nulos.

SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    a.actor_id,
    a.first_name,
    a.last_name
FROM sakila.customer AS c
RIGHT JOIN sakila.actor AS a
ON c.last_name = a.last_name
ORDER BY c.last_name;
~~~~~~~~~~~~~

INNER JOIN: finalmente, temos o INNER JOIN, que foca em trazer somente os registros que possuem
valores correspondentes em ambas as tabelas.

SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    a.actor_id,
    a.first_name,
    a.last_name
FROM sakila.customer AS c
INNER JOIN sakila.actor AS a
ON c.last_name = a.last_name
ORDER BY c.last_name;
~~~~~~~~~~~~~

=================================== SELF JOIN ===================================

- SELF JOIN: caso em que uma tabela faz JOIN consigo mesma. O auto relacionamento geralmente
é usado para consultar dados hierárquicos ou para comparar uma linha com outras linhas na mesma
tabela.

~~~~~~~~~~~~~
SELECT
    CONCAT(Employee.first_name, " ", Employee.last_name) AS "Nome da Pessoa Colaboradora",
    CONCAT(Manager.first_name, " ", Manager.last_name) AS "Nome Gerente"
FROM
    employees AS Employee
INNER JOIN
    employees AS Manager ON Employee.manager_id = Manager.employee_id;
~~~~~~~~~~~~~

//========================= FIXANDO =========================//

1 - Queremos saber o Nome das pessoas colaboradoras e suas respectivas gerências (manager)
cujos departamentos (department) são diferentes.

--> SELECT
      CONCAT(employee.first_name, " ", employee.last_name) AS "Nome da Pessoa Colaboradora",
      CONCAT(manager.first_name, " ", manager.last_name) AS "Nome Gerente"
    FROM
      hr.employees AS employee
    INNER JOIN
      employees AS manager
    ON
      employee.manager_id = manager.employee_id
    WHERE
      employee.department_id <> manager.department_id;

2 - Exiba o Nome e a quantidade de pessoas lideradas de cada pessoa gerente.

--> SELECT
      CONCAT(manager.first_name, " ", manager.last_name) AS "Nome Gerente",
      COUNT(*) AS Gerenciados
    FROM
      hr.employees AS manager
    INNER JOIN
      hr.employees AS employee
    ON
      employee.manager_id = manager.employee_id
    GROUP BY
      manager.employee_id;

=================================== UNION & UNION ALL ===================================

- UNION: Permite unir os registros de uma tabela com outra, desde que usemos a mesma quantidade
de COLUNAS. 

(!) REMOVE OS VALORES DUPLICADOS

~~~~~~~~~~~~~
#1 - Tabelas com mesmo tamanho:

--> SELECT
      first_name,
      last_name,
    FROM
      sakila.actor
    UNION
    SELECT
      first_name,
      last_name,
    FROM
    sakila.customer;
~~~~~~~~~~~~~

- UNION ALL
~~~~~~~~~~~~~
#2 - Tabelas com tamanho diferente:

--> (SELECT
      first_name,
      last_name,
      '-' AS 'customer_id' --> NECESSÁRIO P/ PAREAR COM A QNT DE COLUNA DA OUTRA QUERY (!).
    FROM
      sakila.actor) <<<
    UNION
    (SELECT
      first_name,
      last_name,
      customer_id
    FROM
    sakila.customer) <<<
    ORDER BY --> AO USAR, NECESSÁRIO COLCOAR ( ) NAS QUERIES.
      first_name;

//========================= DESAFIOS =========================//

1 - Todos os funcionários foram promovidos a atores. Monte uma query que exiba a união da
tabela staff com a tabela actor, exibindo apenas o nome e o sobrenome. Seu resultado não
deve excluir nenhum funcionário ao unir as tabelas.

--> SELECT
      UPPER(CONCAT(first_name, " ", last_name)) AS Nome_Completo
    FROM
      sakila.staff
    UNION ALL
    SELECT
      CONCAT(first_name, " ", last_name) AS Nome_Completo
    FROM
      sakila.actor;

2 - Monte uma query que una os resultados das tabelas customer e actor, exibindo os nomes
que contêm a palavra “tracy” na tabela customer e os que contêm “je” na tabela actor. Exiba
apenas os resultados únicos.

--> SELECT
      CONCAT(first_name, " ", last_name) AS Nome_Completo
    FROM
      sakila.customer
    WHERE
      first_name LIKE '%tracy%' OR last_name LIKE '%tracy%'
    UNION
    SELECT
      CONCAT(first_name, " ", last_name) AS Nome_Completo
    FROM
      sakila.actor
    WHERE
      first_name LIKE '%je%' OR last_name LIKE '%je%';

3 - Monte uma query que exiba a união dos cinco últimos nomes da tabela actor, o primeiro nome
da tabela staff e cinco nomes a partir da 15ª posição da tabela customer. Não permita que dados
repetidos sejam exibidos. Ordene os resultados em ordem alfabética.

--> (SELECT
    	first_name, 
      last_name
    FROM 
	    sakila.actor
    LIMIT 5 OFFSET 195)
    UNION
    (SELECT
	    UPPER(first_name), 
      UPPER(last_name)
    FROM 
	    sakila.staff
    LIMIT 1)
    UNION
    (SELECT
	    first_name, 
      last_name
    FROM 
	    sakila.customer
    LIMIT 599 OFFSET 14)
    ORDER BY
	    first_name;

=================================== STORED PROCEDURES ===================================

=================================== STORED FUNCTIONS ===================================

=================================== TRIGGERS ===================================

=================================== EXISTS ===================================
