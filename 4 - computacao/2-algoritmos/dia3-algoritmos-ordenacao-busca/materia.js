==================================== ALGORITMOS DE ORDENAÇÃO ====================================

--> Os Algoritmos de ordenação (sorting algorithms) fazem parte de uma categoria de algoritmos que
buscam colocar elementos de uma sequência em uma determinada ordem definida. Esta ordem pode ser
numérica, lexicográfica ou por qualquer outra característica. As razões para se ordenar uma
sequência podem variar, desde facilitar a visualização até facilitar uma busca.

==================================== ALGORITMOS FORÇA BRUTA ====================================

--> A força bruta caracteriza-se por ser uma técnica que testa cada possibilidade existente, uma a
uma, até resolver um problema.

# SELECTION SORT:

1 - Encontre o menor elemento da lista;
2 - Adicione o elemento encontrado em uma outra lista;
3 - Repita o processo para todos os elementos restantes.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def selection_sort(numbers):
    n = len(numbers) // Quantidade de elementos da lista

    for index in range(n - 1): // Precisamos ordenar N-1 elementos
        min_element_index = index // Definimos a variável para buscar o menor elemento

        for search_index in range(index + 1, n): // Início da busca pelo menor elemento
            if numbers[search_index] < numbers[min_element_index]:
                min_element_index = search_index // Atualiza o índice atual do menor elemento

        // Troca os elementos de posição
        current_element = numbers[index]
        numbers[index] = numbers[min_element_index]
        numbers[min_element_index] = current_element

    return numbers

numbers = [7, 5, 9, 2, 6, 8]
print(f"Lista inicial: {numbers}")
ordered_numbers = selection_sort(numbers)
print(f"Lista final: {ordered_numbers}")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// OTIMIZADO

def search(numbers, start, end):
    min_element = numbers[start]
    min_element_index = start

    for i in range(start + 1, end): // Busca pelo menor elemento
        if numbers[i] < min_element:
            min_element = numbers[i]
            min_element_index = i

    return min_element_index // Retorna a posição do menor elemento

def selection_sort(numbers):
    n = len(numbers)

    for index in range(n - 1): // Início da iteração para ordenar os N-1 elementos
        min_element_index = search(numbers, index, n)
        numbers[index], numbers[min_element_index] = numbers[min_element_index], numbers[index] // Trocando oselementos utilizando desempacotamento.

    return numbers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Analisando a complexidade deste algoritmo, vemos que independente de todos os elementos estarem
ordenados (ou não), ou parcialmente ordenados, sempre teremos que percorrer o array completamente e
também n - 1 elementos a cada iteração. Isto nos leva a uma complexidade O(n²) para todos os casos
(pior, médio, melhor).

# INSERTION SORT:

--> A ordenação por inserção (insertion sort) tem esse nome por inserir um elemento de cada vez em
sua posição correta. A ordenação por inserção é mais eficiente que a ordenação por seleção e também
considerada mais simples.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def insertion_sort(numbers):
    n = len(numbers) // Quantidade de elementos na lista

    for index in range(1, n): // Começaremos a ordenar pelo segundo elemento
        key = numbers[index] // Pegamos o segundo elemento e o definimos como chave

        new_position = index - 1 // Tomamos a posição anterior para iniciar a comparação
        while new_position >= 0 and numbers[new_position] > key: // Enquanto a chave for menor, remaneja o elemento para frente
            numbers[new_position + 1] = numbers[new_position] // Remaneja o elemento
            new_position = new_position - 1

        numbers[new_position + 1] = key // Insere a chave na posição correta

    return numbers

numbers = [7, 5, 9, 2, 6, 8]
print(insertion_sort(numbers))
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Como precisamos percorrer cada um dos elementos e depois percorrer comparando os elementos à
esquerda do mesmo, em um pior caso, onde a lista esteja inversamente ordenada, teremos uma
complexidade de O(n²).

(!) Isto se repete também em média, para listas parcialmente ordenadas. Porém, se inicialmente a
lista estiver ordenada, este algoritmo terá complexidade O(n), pois só fará a iteração de todos os
elementos, e não precisará ficar remanejando os elementos.

=================================== ALGORITMOS SOLUÇÃO ITERATIVA ===================================

--> Soluções iterativas consistem na realização de uma ou mais operações repetidas vezes, por meios
de comandos de repetição.

# BUBBLE SORT:

--> Também conhecido como ordenação por bolha. Nesse caso, são realizadas múltiplas iterações sobre
a coleção, sempre comparando o valor ao item adjacente e realizando a troca daqueles que estão fora
de ordem. A cada iteração o próximo maior valor é colocado em sua posição correta, ou seja, cada
item se desloca como uma bolha para a posição a qual pertence.

--> Os maiores elementos da lista serão jogados para as últimas posições.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def bubble_sort(numbers):
    n = len(numbers) // Quantidade de elementos na lista

    for ordered_elements in range(n - 1): // Precisamos ordenar n-1 elementos
        for item in range(0, n - 1 - ordered_elements): // Vamos percorrer até o elemento anterior ao ordenado
            if numbers[item] > numbers[item + 1]: // se um elemento for maior, flutuamos ele para cima
                current_element = numbers[item]
                numbers[item] = numbers[item + 1]
                numbers[item + 1] = current_element
                
                // Lembra da troca com desempacotamento?
                // numbers[item], numbers[item + 1] = numbers[item + 1], numbers[item]
    return numbers

numbers = [7, 5, 9, 2, 6, 8]
print(bubble_sort(numbers))
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Assim como nos algoritmos de força bruta, no pior caso do Bubble Sort ele executará O(n²) operações,
então, ele também é um algoritmo de ordem quadrática.

=================================== ALGORITMOS DIVIDIR CONQUISTAR ===================================

--> Consistem em dividir um problema grande em partes menores, encontrar soluções para as partes menores,
e então combinar as soluções obtidas em uma solução global. 

# MERGE SORT:

--> Na ordenação por mistura vamos dividindo a nossa coleção em porções menores até atingirmos uma coleção
mínima. Em seguida, vamos misturando as porções de forma ordenada até que toda a coleção seja reunida novamente,
resultando na ordenação.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def merge_sort(numbers, start=0, end=None):
    if end is None:
        end = len(numbers)
    if (end - start) > 1: // se não reduzi o suficiente, continua
        mid = (start + end) '//' 2 // encontrando o meio
        merge_sort(numbers, start, mid) // dividindo as listas
        merge_sort(numbers, mid, end)
        merge(numbers, start, mid, end) // unindo as listas

// função auxiliar que realiza a mistura dos dois arrays

def merge(numbers, start, mid, end):
    left = numbers[start:mid] // indexando a lista da esquerda
    right = numbers[mid:end] // indexando a lista da direita

    left_index, right_index = 0, 0 // as duas listas começarão do início

    for general_index in range(start, end): // percorrer sobre a lista inteira como se fosse uma
        if left_index >= len(left): // se os elementos da esquerda acabaram, preenche o restante com a lista da direita 
            numbers[general_index] = right[right_index]
            right_index = right_index + 1
        elif right_index >= len(right): // se os elementos da direita acabaram, preenche o restante com a lista da esquerda
            numbers[general_index] = left[left_index]
            left_index = left_index + 1
        elif left[left_index] < right[right_index]: // se o elemento do topo da esquerda for menor que o da direita, ele será o escolhido
            numbers[general_index] = left[left_index]
            left_index = left_index + 1
        else:
            numbers[general_index] = right[right_index] // caso o da direita seja menor, ele será o escolhido
            right_index = right_index + 1


numbers = [6, 5, 3, 1, 8, 7, 2, 4]
merge_sort(numbers, 0, len(numbers))
print(numbers)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) A separação em partes traz uma complexidade O(log n), e as misturas O(n). Com isso, temos uma complexidade
de O(n log n), independente do array estar ordenado por completo, não ordenado, ou parcialmente ordenado.

(!) Como é um algoritmo recursivo, consome mais memória, possuindo uma complexidade de espaço O(n), ou seja,
cresce linearmente proporcional à entrada de dados.

# QUICK SORT:

--> Sua estratégia de ordenação consiste em determinar um elemento pivô.
--> Em seguida, todos os elementos maiores que o pivô serão colocados à direita e os menores à esquerda. Com isto,
o pivô será colocado em sua posição correta e teremos duas subcoleções não ordenadas ao seu redor. Recursivamente
ordenamos os sub arrays, repetindo o mesmo processo de escolha do pivô e particionamento.

1 - Função quicksort: nela a coleção será particionada de acordo com o pivô;
2 - Função partition: ela é a chave para o algoritmo. Nela, a coleção será reorganizada.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def quick_sort(numbers, start, end):
    if start < end:
        p = partition(numbers, start, end) 
        quick_sort(numbers, start, p - 1) // Os menores em relação ao pivô ficarão à esquerda
        quick_sort(numbers, p + 1, end) // Os maiores elementos em relação ao pivô ficarão à direita

// função auxiliar responsável pela partição do array
// escolhendo um pivô e fazendo movimentações dos sub arrays gerados

def partition(numbers, start, end):
    pivot = numbers[end]
    delimiter = start - 1

    for index in range(start, end):
        // o índice será o elemento em análise no momento, ele passará por todos os elementos
        if numbers[index] <= pivot:
          delimiter = delimiter + 1
          numbers[index], numbers[delimiter] = numbers[delimiter], numbers[index]

    numbers[delimiter + 1], numbers[end] = numbers[end], numbers[delimiter + 1]

    return delimiter + 1

numbers = [6, 5, 3, 1, 8, 7, 2, 4]
quick_sort(numbers, 0, len(numbers) - 1)
print(numbers)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Normalmente esta ordenação ocorre com complexidade O(n log n), porém em um pior caso (onde o array está
ordenado de forma inversa), ocorrerá com complexidade O(n²).

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
# SORTED VS .SORT

--> SORTED: cria uma NOVA lista ordenada sem alterar a lista original;

--> .SORT: ordena uma lista alterando seu formato original;
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

=================================== ALGORITMOS DE BUSCA ===================================

--> Buscam um item com uma determinada propriedade dentro de uma coleção, podendo esta coleção
ser gerada elemento a elemento, a partir de uma série de operações, não necessitando uma
coleção de fato.

# BUSCA LINEAR:

--> Consiste em percorrer toda a estrutura elemento a elemento, tentando encontrar o valor.
Também é conhecida como busca sequencial, por conta da maneira com que percorremos a estrutura
em busca do valor.

(!) Solução simples, mas não a mais rápida.

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

# BUSCA BINÁRIA:

--> Mais um exemplo onde empregamos a técnica da divisão e conquista. É importante destacar
que ela supõe que nossa coleção está ORDENADA e seu funcionamento se dá através de múltiplas
divisões do espaço de busca, reduzindo-o, buscando o elemento no meio do espaço.

1 - Vamos supor a seguinte lista: [1, 10, 35, 42, 51, 60, 75].

2 - Nesse caso, o número buscado é 60.

3 - Dividimos a lista em duas partes e verificamos se o elemento do meio (42) é o elemento
procurado.

4 - Como sabemos que a lista está ordenada e que o valor buscado é maior que o encontrado,
não precisamos comparar com todos os outros à esquerda. Vamos procurar somente os valores
posteriores a ele [51, 60, 75].

5 - Realizamos o mesmo processo de divisão e nosso elemento do meio passa a ser 60.

6 - Como encontramos o valor, vamos retornar o seu índice, 5.

(!) Mais rápida que a busca linear, pois possui menor número de coparações.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def binary_search(numbers, target):
    // definir os índices
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

# COMPLEXIDADE:

--> linear_search: no pior caso (se o elemento estiver na última posição ou não
  existir), precisará percorrer toda a estrutura para encontrar o elemento. Diante disso, sua
  complexidade é O(n). No entanto, o algoritmo de linear_search não necessita que a coleção esteja
  ordenada.

--> binary_search: no pior caso ele precisará de O(log n) operações para encontrar o elemento (também ocorre caso o elemento não exista).