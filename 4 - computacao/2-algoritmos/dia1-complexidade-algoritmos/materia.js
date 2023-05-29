========================================= COMPLEXIDADE DE ALGORITMOS =========================================

 É fundamental que as pessoas desenvolvedoras sejam capazes de aumentar a eficiência de seus
 algoritmos, reduzindo custos envolvidos e entregando a resolução de problemas.

 ========================================= O QUE É UM ALGORITMO? =========================================

“Informalmente, um algoritmo é qualquer procedimento computacional bem definido que toma algum valor ou
conjunto de valores como entrada e produz algum valor ou conjunto de valores como saída. Portanto, um
algoritmo é uma sequência de etapas computacionais que transformam a entrada na saída”
(CLRS - Introduction to Algorithms)

“Um algoritmo é um conjunto de instruções que realizam uma tarefa.”
(BHARGAVA, ADITYA Y. - Entendendo Algoritmos)

Um algoritmo pode ou não ser correto, podemos considerá-lo correto se, e somente se, nos entrega a saída
esperada para todas as entradas, isto é, ele resolve aquele problema.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def sum_array(numbers):
    sum = 0
    for number in numbers:
        sum += number

    return sum
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A função sum_array recebe um array de números, percorre-o e executa a soma de cada um de seus valores (number),
retornando a soma de todos os números pertencentes ao array.

O tempo de execução dele é proporcional ao tamanho do dado de entrada.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# def sum_array(numbers):
  # ...

# Suponha que, para o array abaixo, o tempo de execução seja `n`
sum_array(array_com_dez_mil_numeros)

# Nesse caso, aqui o tempo de execução vai ser `10 * n`, ou `10n`, já que o array é dez vezes maior que o anterior
sum_array(array_com_cem_mil_numeros)

# Já esse é dez mil vezes maior que o primeiro, então esse aqui executa em `100n`
sum_array(array_com_um_milhão_de_numeros)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note que conforme aumentamos o valor da entrada, o tempo de execução do algoritmo aumenta proporcionalmente, de
acordo com uma taxa.

É isso que chamamos de complexidade: A taxa de crescimento do tempo de execução de um algoritmo; quanto maior é
essa taxa, maior é seu tempo de execução e, portanto, maior sua complexidade.

(!) A Ordem de Complexidade nada mais é do que a representação dessa proporção (ou taxa) de crescimento.
Dado que o algoritmo é linearmente proporcional ao tempo de execução, dizemos que este é um algoritmo linear.

========================================= COMPLEXIDADE DE TEMPO E ESPAÇO =========================================

A complexidade de um algoritmo representa o crescimento de seu tempo de execução em função de uma taxa, a quantidade
de operações que ele realiza. Porém, quando falamos em complexidade, não analisamos apenas o tempo, analisamos também
o espaço gasto. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def squared_array(numbers):
    array_of_squares = []
    for number in numbers:
        array_of_squares.append(number * number)

    return array_of_squares
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1 - Em relação à Complexidade de Tempo, temos aqui uma taxa de crescimento linear, uma vez que o aumento no tamanho do
array faz crescer proporcionalmente o tempo gasto na execução do algoritmo. Sendo assim, podemos afirmar que a
Complexidade de Tempo aqui é O(n), chamada geralmente tempo linear (Lembre-se que O faz referência aqui a ordem de
complexidade, enquanto (n) representa a fórmula matemática que diz sobre a taxa de crescimento do número de operações).

2 - Nesse algoritmo sempre nos é retornado um array com o mesmo tamanho da entrada de dados, pois ele sempre devolve um novo
array com todos os números de entrada ao quadrado. Desse modo, conforme a entrada cresce, a saída também cresce e
consequentemente, o espaço ocupado por ela, o que implica dizer que sua Complexidade de Espaço é dada por O(n).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def multiply_array(numbers):
    result = 1
    for number in numbers:
        result *= number

    return result
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--> COMPLEXIDADE DE TEMPO: o(n)
--> COMPLEXIDADE DE ESPAÇO: o(1)

========================================= COMPLEXIDADE QUADRÁTICA =========================================

“tempo de execução dos algoritmos cresce a taxas diferentes”
(BHARGAVA, ADITYA Y.).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Os arrays têm sempre o mesmo tamanho
def multiply_arrays(array1, array2):
    result = []
    for number1 in array1:
        for number2 in array2:
            result.append(number1 + number2)

    return result
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Conforme aumentamos o tamanho dos arrays de entrada, o número de operações para a execução do algoritmo cresce
ao quadrado. Isso significa que, para entradas de tamanho n, a quantidade de operações para executar o algoritmo
é de n². Sendo assim, a complexidade desse algoritmo é dada por O(n²) e a chamamos de Complexidade Quadrática. 

========================================= COMPARANDO COMPLEXIDADES =========================================

1 - A Ordem de Complexidade diz respeito à taxa de crescimento do tempo de execução (ou espaço de memória ocupado)
de um algoritmo, na medida em que aumentamos o tamanho da sua entrada;

2 - Uma complexidade é O(1) (constante), quando o tempo de execução do algoritmo independe do tamanho da entrada;

3 - Uma complexidade é O(n) (linear) quando a taxa de crescimento em seu tempo de execução é linear: se aumentamos
a entrada em 2 vezes, aumentamos o tempo de execução em 2 vezes;

4 - Uma complexidade é O(n²) (quadrática) quando a taxa de crescimento do tempo de execução do algoritmo é quadrática:
se aumentamos a entrada em 2 vezes, aumentamos o tempo de execução em 4 (ou 2²) vezes;

5 - Uma complexidade é O(n³) (cúbica) quando a taxa de crescimento do tempo de execução do algoritmo é cúbica: se
aumentamos a entrada em 2 vezes, aumentamos o tempo de execução em 8 (2³) vezes.

========================================= COMPLEXIDADE LOGARÍTMICA =========================================

(!) Representado pela notação O(log n), um algoritmo logarítmico tem uma alteração na taxa de execução que,
geralmente, reduz pela metade o tempo de finalização das iterações ao reduzir pela metade o tamanho do input
a cada iteração. 

(!) O número de operações para executar o algoritmo logarítmico tem uma relação inversa ao tamanho da entrada:
quanto maior ela é, menor o número de operações e, consequentemente, menor o tempo para a execução do algoritmo! 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// A estrutura deve estar ordenada para que a busca binária funcione
def binary_search(numbers, target):
    # definir os índices
    start = 0
    end = len(numbers) - 1

    while start <= end: // os índices podem ser no máximo iguais, o início não pode ultrapassar o fim
        mid = (start + end) '//' 2 // encontro o meio

        if numbers[mid] == target: // se o elemento do meio for o alvo, devolve a posição do meio
            return mid
        
        if target < numbers[mid]: // se o elemento for menor, atualiza o índice do fim
            end = mid - 1
        else: // caso contrário, atualiza o índice do inicio
            start = mid + 1
    
    return -1 // Não encontrou? Retorna -1

numbers = [2, 3, 4, 10, 40]
target = 40

result = binary_search(numbers, target)
print(f"Elemento encontrado na posição: {result}")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= COMPLEXIDADE EXPONENCIAL E FATORIAL =========================================

Essas complexidades caracterizam algoritmos que, para aumentos pequenos no tamanho da entrada, aumentam enormemente o
número de operações a serem realizadas para serem executados e, consequentemente, seu tempo de execução. A relação
do tempo de execução/espaço ocupado em cada caso é a seguinte:

    1 - Exponencial: 2ⁿ (O(2ⁿ));

    2 - Fatorial: n! (O(n!)).

(!) No caso de um algoritmo com Ordem de Complexidade Exponencial, para uma entrada de dados n que possui vinte elementos,
o  algoritmo realizará aproximadamente um milhão (ou 2²⁰) de operações. Para o caso fatorial, os mesmos vinte elementos
rendem 24 quatrilhões de operações!

========================================= ANALISANDO ALGORITMOS COM VÁRIAS ESTRUTURAS DE REPETIÇÃO =========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def calculations(n):
    number1 = 0
    for n1 in range(n):
        number1 += n1

    number2 = 0
    for n1 in range(n):
       for n2 in range(n):
            number2 += n1 + n2

    number3 = 0
    for n1 in range(n):
       for n2 in range(n):
           for n3 in range(n):
               number3 += n1 + n2 + n3

    return number1, number2, number3

n1, n2, n3 = calculations(100)
print(f'{n1}, {n2}, {n3}')
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Esse algoritmo tem três estruturas de repetição evidentes: uma linear, uma quadrática e uma cúbica. 
COMPLEXIDADE:  O(n + n² + n³). 

========================================= MELHOR CASO, PIOR CASO E CASOM MÉDIO =========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def linear_search(numbers, target):
    n = len(numbers) // N será a quantidade de elementos da lista
    for index in range(0, n): // vamos iterar a lista completa
        if numbers[index] == target: // se encontrar o elemento alvo, retorne a posição
            return index

    return -1 // Não encontrou? Retorne -1


print(linear_search([1, 2, 3], 2))  // saída: 1
print(linear_search([1, 2, 3], 4))  // saída: -1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Dizemos que, para entradas muito grandes, esse algoritmo é O(n). 

(!) O que acontece, porém, caso tenhamos sorte e o número que procuramos seja o primeiro do array?

--> Nesse caso, mesmo para uma entrada infinita, nossa complexidade será O(1). Esse é o melhor caso desse algoritmo. De forma
análoga, o pior caso é o número ser o último elemento do array, ou seja O(n).

O caso médio seria algo como O(n * 1/2). Nesse caso, o número que procuramos está no meio da lista. Mas, para entradas muito
grandes, aprendemos a desprezar os números menos relevantes da soma, então, podemos simplificar e dizer que o caso médio é O(n)
também.

========================================= RESUMO =========================================

1 - Constantes: O(1);
2 - Logarítmicos: O(log n);
3 - Linear: O(n);
4 - Quadráticos: O(n²);
5 - Cúbicos: O(n³);
6 - Exponencial: O(2ⁿ);
7  -Fatorial: O(n!).
