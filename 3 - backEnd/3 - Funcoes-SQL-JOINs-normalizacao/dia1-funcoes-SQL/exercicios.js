================== BANCO DE DADOS hr ==================

1 - Escreva uma query que exiba o maior salário da tabela.

--> SELECT MAX(salary) FROM hr.employees;

2 - Escreva uma query que exiba a diferença entre o maior e o menor salário.

--> SELECT MAX(salary) AS Maior_Salario,
    MIN(salary) AS Menor_Salario,
    (MAX(salary) - MIN(salary)) AS Diferença FROM hr.employees;

3 - Escreva uma query que exiba a média salarial de cada job_id, ordenando pela média salarial em ordem decrescente.

--> SELECT job_id,
    AVG(salary) AS Media_Salarial
    FROM hr.employees
    GROUP BY job_id
    ORDER BY Media_Salarial DESC;

4 - Escreva uma query que exiba a quantidade de dinheiro necessária para realizar o pagamento de todas as pessoas funcionárias.

--> SELECT SUM(salary) AS Folha_de_Pagamento
    FROM hr.employees;

5 - Escreva uma query que exiba quatro informações: o maior salário, o menor salário, a soma de todos os salários e a média dos salários. Todos os valores devem ser formatados para ter apenas duas casas decimais.

--> SELECT MAX(salary) AS Maior_Salario,
    MIN(salary) AS Menor_Salario,
    SUM(salary) AS Folha_de_Pagamento,
    ROUND(AVG(salary), 2) AS Media_Salarial
    FROM hr.employees;

6 - Escreva uma query que exiba a quantidade de pessoas que trabalham como pessoas programadoras (it_prog).

--> SELECT COUNT(job_id) AS Qntd_Programadores // Mostra 1 coluna
    FROM hr.employees
    WHERE job_id = 'IT_PROG';

--> SELECT job_id,
    COUNT(*) AS Qntd_Programadores // Mostra 2 colunas
    FROM hr.employees
    WHERE job_id = 'IT_PROG';

7 - Escreva uma query que exiba a quantidade de dinheiro necessária para efetuar o pagamento de cada profissão (job_id).

--> SELECT job_id,
    SUM(salary) AS Folha_Pagamento_Vinculo
    FROM hr.employees
    GROUP BY job_id;

8 - Utilizando a query anterior, faça as alterações para que seja exibido somente a quantidade de dinheiro necessária para cobrir a folha de pagamento das pessoas programadoras (it_prog).

--> SELECT job_id,
    SUM(salary) AS Folha_Pagamento_Vinculo
    FROM hr.employees
    WHERE job_id = 'IT_PROG';

9 - Escreva uma query que exiba em ordem decrescente a média salarial de todos os cargos, exceto das pessoas programadoras (it_prog).

--> SELECT job_id,
    SUM(salary) AS Folha_Pagamento_Vinculo
    FROM hr.employees
    WHERE job_id <> 'IT_PROG' //diferente
    GROUP BY job_id
    ORDER BY Folha_Pagamento_Vinculo DESC;

10 -  Escreva um query que exiba média salarial e o número de funcionários de todos os departamentos com mais de dez funcionários. Dica: agrupe pelo department_id.

--> SELECT department_id,
    COUNT(*) AS Qntd_Funcionarios,
    SUM(salary) AS Folha_Pagamento_Departamento
    FROM hr.employees
    GROUP BY department_id
    HAVING Qntd_Funcionarios > 10;

11 - Escreva uma query que atualize a coluna phone_number, de modo que todos os telefones iniciados por 515 agora devem iniciar com 777.

--> SELECT REPLACE(phone_number, 515, 777)
    FROM hr.employees;

12 - Escreva uma query que só exiba as informações dos funcionários cujo o primeiro nome tenha oito ou mais caracteres.

--> SELECT first_name
    FROM hr.employees
    WHERE CHAR_LENGTH(first_name) >= 8;

13 - Escreva uma query que exiba as seguintes informações de cada funcionário: id, primeiro nome e ano no qual foi contratado (exiba somente o ano).

--> SELECT employee_id AS id,
    first_name AS Primeiro_Nome, 
    YEAR(hire_date) AS Ano_Contratacao
    FROM hr.employees;

14 - Escreva uma query que exiba as seguintes informações de cada funcionário: id, primeiro nome e dia do mês no qual foi contratado (exiba somente o dia).

--> SELECT employee_id AS id,
    first_name AS Primeiro_Nome, 
    DAY(hire_date) AS Dia_Contratacao
    FROM hr.employees;

15 - Escreva uma query que exiba as seguintes informações de cada funcionário: id, primeiro nome e mês no qual foi contratado (exiba somente o mês).

--> SELECT employee_id AS id,
    first_name AS Primeiro_Nome, 
    MONTH(hire_date) AS Mes_Contratacao
    FROM hr.employees;

16 - Escreva uma query que exiba os nomes dos funcionários em letra maiúscula.

--> SELECT UCASE(first_name) AS Upper_Names
FROM hr.employees;

17 - Escreva uma query que exiba o sobrenome e a data de contratação de todos os funcionário contratados em julho de 1987.

--> SELECT last_name AS Sobrenome,
    hire_date AS Data_Contratacao
    FROM hr.employees
    WHERE MONTH(hire_date) = 7;

18 - Escreva uma query que exiba as seguintes informações de cada funcionário: nome, sobrenome, tempo que trabalha na empresa (em dias).

--> SELECT first_name AS Nome,
    last_name AS Sobrenome,
    DATEDIFF('2023-02-28', hire_date) AS Dias_de_Contrato
    FROM hr.employees;