=============================== RECURSIVIDADE ===============================

--> Uma função que chama a si mesma é chamada de recursiva. O processo para
executar tal função recursiva é chamado de recursividade.

=============================== LEIS DA RECURSÃO ===============================

Função recursiva de loop infinito.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def countdown(n):
    print(n)
    countdown(n - 1)  // chamada recursiva

countdown(5)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Caso base e Caso recursivo:
(!) sQuando estamos escrevendo uma função recursiva, precisamos informar nossa
condição de parada ou caso base da recursão.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def countdown(n):
    if n == 0: // caso base
        print("FIM!")
    else:
        print(n)
        countdown(n - 1) // caso recursivo

countdown(5)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1 - Um algoritmo recursivo deve ter um caso base: quando falamos de recursão,
devemos sempre lembrar do caso base, pois sem ele nosso algoritmo ficará 
executando infinitamente.

O caso base é a condição de PARADA do algoritmo recursivo, ele é o menor
subproblema do problema, tornando-o possível de resolver de forma direta/
trivial;

2 - Um algoritmo recursivo deve mudar o seu estado e se aproximar do caso
base: após o início da execução de um algoritmo recursivo, a cada nova chamada
a ele mesmo, o seu estado deve se aproximar progressivamente do caso base.

3 - Um algoritmo recursivo deve chamar a si mesmo, recursivamente: Essa lei é
a própria definição de recursão.

=============================== PILHA DE CHAMADAS ===============================

--> A pilha de chamadas,também conhecida como call stack, organiza as sub-rotinas
que estão executando no computador. Trazendo para o nosso contexto de recursividade,
a pilha de chamadas registra a execução das funções, ou seja, qual está sendo executada,
em que ponto ela deve retornar, qual é a proxima a ser chamada, etc.

1 - Toda vez que chamamos uma função em um programa, o sistema operacional reserva memória
para as variáveis e parâmetros da função;

2 - Sempre quando uma função é executada, ela é guardada na pilha;

3 - Quando a função termina de ser executada, ela sai da pilha.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def recursive_sum(num):
    if num == 0:
        return 0
    else:
        print(num)
        return num + recursive_sum(num - 1)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=============================== ITERATIVO X RECURSIVO ===============================

FUNÇÃO ITERATIVA:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def iterative_countdown(n):
    while n > 0:
        print(n)
        n = n - 1
    print("FIM!")

iterative_countdown(5)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FUNÇÃO RECURSIVA:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def iterative_factorial(n):
    fact = 1

    for i in range(1, n + 1):
        fact = fact * i

    return fact

iterative_factorial(5)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1 - Escolher uma solução recursiva não significa ganho de performance, muito pelo contrário,
grande parte das vezes, a solução iterativa será mais performática.

2 - Escolher a solução recursiva terá um ganho na diminuição de complexidade do código do seu
projeto. Aqui, complexidade significa legibilidade. Ou seja, nosso código fica mais simples,
mais harmonioso, quando utilizamos a recursividade.

=============================== ANÁLISE DE ALGORITMOS RECURSIVOS ===============================

ÁRVORE DE RECURSÃO:

--> Pode ser utilizado para estimar o custo de um algoritmo. É um modo de analisarmos seu custo, o que nos ajuda a decidir se tal solução recursiva vale a pena ou não. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def fibonacci(num):  // nome da função e parâmetro
    if (num <= 1):  // condição de parada
        return num
    else:
        return fibonacci(num - 2) + fibonacci(num - 1)  // chamada de si mesma com um novo valor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Se cada subproblema é O(n) e você criou um para cada elemento da sua entrada de tamanho n,
você tem aí uma complexidade O(n * n), ou seja, uma complexidade quadrática. Se, por outro lado,
a cada subproblema você dividiu o tamanho do problema original por dois, você gerará log n
subproblemas. Se cada um desses custa O(n), você teria uma complexidade O(n* log n).

=============================== CUIDADOS AO USAR RECURSÃO ===============================

--> Quando um loop recursivo é muito grande, ele fará muitas chamadas, e quando ele faz muitas
chamadas podemos ter um stack overflow. O stack overflow, significa que ficaríamos sem memória
para continuar com a execução do programa.

--> Para evitar um estouro de pilha, é importante que As chamadas recursivas parem. Para que
consigamos fazer As chamadas recursivas pararem é importante lembrarmos sempre de implementar a
condição de parada na função.

=============================== ESTRATÉGIAS PARA SOLUÇÃO DE PROBLEMAS ===============================

--> ITERATIVA:

1 - É caracterizada pela repetição de uma determinada operação, procurando resolver algum
problema encontrando sucessivas aproximações, a partir de uma suposição inicial.

2 - A ideia nesse tipo de processo é repetir um determinado cálculo várias vezes, obtendo-se a
cada repetição, ou iteração, um resultado mais preciso que aquele obtido na iteração anterior.

3 - A cada iteração, utiliza-se o resultado da anterior como parâmetro de entrada para o cálculo
seguinte. O resultado é uma sequência de valores aproximados, não exatos, mas que estão dentro
de uma faixa de erro aceitável.

--> FORÇA BRUTA:

1 - Ela consiste basicamente em enumerar todas As combinações possíveis para uma solução e
avaliar se satisfazem o problema.

2 - É possível escolher a melhor das soluções,mas apesar de trivial, em alguns casos, a força
bruta possui desempenho geralmente ruim.

--> DIVIDIR E CONQUISTAR:

A modularização de um programa consiste em dividi-lo em partes funcionais que conversam entre
si, tornando o software mais eficiente.

A técnica de Divisão e Conquista consistem em três passos:

    1 - Divisão: dividir a instância do problema original em duas ou mais instâncias menores,
    considerando-as como subproblemas;

    2 - Conquista: resolver cada subproblema recursivamente;

    3 - Combinação: combinar as soluções encontradas em cada subproblema, compondo uma solução
    para o problema original.


