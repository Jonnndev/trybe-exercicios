=================================== TIPO ABSTRATO DE DADOS: LISTA LINEAR ===================================

# TIPO ABSTATO DE DADOS

--> Tipo abstrato de dados (TAD) é uma especificação de um conjunto de dados e operações que podem ser realizadas
    sobre esses dados.

# LISTA LINEAR

--> Estrutura de dados que armazena uma coleção de elementos de tal forma que cada um dos elementos possa ser
    identificado por, pelo menos, um índice ou uma chave.

--> A lista linear é uma estrutura de dados que permite a inserção de novos elementos em qualquer posição da lista
    e a remoção de elementos de qualquer posição da lista.

=================================== ESTRUTURA DE DADOS: ARRAY ===================================

# ESTRUTURA DE DADOS

--> Estrutura de dados é uma forma de organizar dados na memória de um computador ou em qualquer dispositivo de
    armazenamento, de modo que possam ser utilizados de maneira eficiente.

# IMPLEMENTANDO TAD LISTA LINEAR COM ARRAYS

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*Perceba que temos uma coleção de valores
e operações que atuam sobre estes valores,
de acordo com o que foi definido pelo TAD.*/


Class ListaArray:
    def __init__(self):
        self.data = []

    def __len__(self):
        // quando pedido o tamanho do array
        // retorne o tamanho de data
        return len(self.data)

    def __str__(self):
        // converte para string e exibe os valores de data
        return str(self.data)

    def get(self, index):
        // recupera o elemento no índice informado
        return self.data[index]

    def set(self, index, value):
        // insere um elemento no índice informado
        self.data.insert(index, value)


// vamos inicializar e preencher uma estrutura de dados array
array = ListaArray()
array.set(0, "Felipe")
array.set(1, "Ana")
array.set(2, "Shirley")
array.set(3, "Miguel")

// para acessar um elemento do array, utilizamos seu índice
print(array.get(0))  // saída: Felipe
print(array.get(2))  // saída: Shirley
print("-----")

// podemos iterar sobre seus elementos da seguinte maneira
index = 0
// enquanto há elementos no array
while index < len(array):
    // recupera o elemento através de um índice
    print("Index:", index, ", Nome:", array.get(index))
    index += 1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=================================== ENTENDENDO A ESTRUTURA ===================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Supondo uma lista com 4 valores numéricos:
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |   posição na memória: 0x01
            *---*---*---*---*

// Ao adicionar um novo item, a lista precisa crescer:
            *---*
novo item   | 5 |
            *---*
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |    posição na memória: 0x01
            *---*---*---*---*

// Uma nova lista é criada:
            *---*---*---*---*---*---*---*---*
nova        |   |   |   |   |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

// Os elementos da lista original são copiados para a nova lista:
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |    posição na memória: 0x01
            *---*---*---*---*
              ↓   ↓   ↓   ↓
            *---*---*---*---*---*---*---*---*
nova        | 1 | 2 | 3 | 4 |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

// O novo elemento é colocado na nova lista:
            *---*
novo item   | 5 | -------------
            *---*             ↓
            *---*---*---*---*---*---*---*---*
nova        | 1 | 2 | 3 | 4 |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*
// O endereço onde se encontrava a lista antiga é liberado para ser utilizado
// e o "nome original" é atribuído a nova lista:
            *---*---*---*---*---*---*---*---*
original    | 1 | 2 | 3 | 4 | 5 |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Quando inserimos um novo elemento no início do array, todos os elementos já existentes são deslocados
    à direita, tendo seu índice modificado em 1. Análogo a isto, quando adicionamos em uma posição intermediária,
    todos os elementos com índices posteriores ao inserido serão movidos em uma posição.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Supondo uma lista com 4 caracteres ao qual adicionaremos mais um no início:
            *---*
novo item   | a |
            *---*
              ↓
            *---*---*---*---*
original    | b | c | d |   |    posição na memória: 0x01
            *---*---*---*---*
                ⤻  ⤻  ⤻

// Os elementos são deslocados para o próximo índice.

            *---*---*---*---*
original    | a | b | c | d |    posição na memória: 0x01
            *---*---*---*---*

// As regras de crescimento ainda se aplicam portanto pode ser que uma nova lista
// seja criada, o elemento adicionado e os elementos copiados para a nova lista.
// Ainda assim, o índice de todos os elementos posteriores a inserção
// serão acrescidos em 1.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Algo similar ocorre quando fazemos remoções de valores à partir dos índices:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Supondo uma lista com 4 caracteres ao qual removeremos um elemento

// Se removermos o último elemento (índice 3), nada precisa ser modificado

         *---*---*---*---*
array    | a | b | c |   |    posição na memória: 0x01
         *---*---*---*-⤹-*
                        d

// Porém se removermos o primeiro, ou qualquer outro índice,
// todos os valores serão deslocados à esquerda:
                 ⤺  ⤺  ⤺
         *---*---*---*---*---*---*---*---*
array    | a |   | c | d | e |   |   |   |    posição na memória: 0x01
         *---*-⤹-*---*---*---*---*---*---*
                b

// À medida que itens são removidos, a estrutura diminui em tamanho:
         *---*---*---*---*
array    | a | c | d | e |    posição na memória: 0x01
         *---*---*---*---*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Código:

// import sys

Class ListaArray:
    // ...
    def remove(self, index):
        // removeremos o item, retornando-o
        return self.data.pop(index)

// ...
// array = ListaArray()
array.set(0, "Marcos")
array.set(1, "Patrícia")
print(array)  // saída: ['Marcos', 'Patrícia']

array.remove(0)  // retorna a string "Marcos"
print(array)  // saída: ['Patrícia']
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=================================== ARRAYS MULTIDIMENSIONAIS ===================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from array_example  Import ListaArray


Class Matrix(ListaArray):

    def get(self, row, column):
        return self.data[row][column]

    def set(self, row, column, value):
        /*Caso a linha não exista, uma nova linha
        será criada.*/
        try:
            self.data[row].insert(column, value)
        except IndexError:
            self.data.insert(row, [value])

    def remove(self, row, column):
        // removeremos o item, retornando-o
        return self.data[row].pop(column)

print('----- Arrays multidimensionais')
array = Matrix()
array.set(0, 0, "Marcos")
array.set(0, 1, 6)
array.set(0, 2, 9)

array.set(1, 0, "Patrícia")
array.set(1, 1, 9)
array.set(1, 2, 6)

print(array)

// remove o índice 2, da primeira linha com o valor 9
array.remove(0, 2)

print(array)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Dado um array com os valores
array = [1, 2, 4, 5, 6]
// e outro com os valores
other_array = [7, 8, 9]
// podemos junta-los em um novo utilizando o operador +
new_array = array + other_array
// um novo array é criado e o conteúdo de ambos é copiado
// para a nova estrutura
print('Array unido:', new_array)

print("-----")

// Uma outra operação interessante é a busca
// pois podemos buscar um elemento utilizando o operador in
// É equivalente a iterar sobre cada elemento e verificar a igualdade
// essa busca pode demorar um pouco já
// que se não encontrar pode acabar percorrendo toda a estrutura

print("Possui 5:", 5 in new_array)  // saída: True
print("Possui 10:", 10 in new_array)  // saída: False

print("-----")

// temos o count para contar quantas vezes um elemento aparece
print("Vezes em que o 1 se repete:", [1, 2, 1, 2, 1, 4, 5, 6].count(1))

// array de duas dimensões
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

print("-----")

// acessando um índice
print('indice[1][1]:', matrix[1][1])  // saída: 5

print("-----")

// deletando um elemento á partir do índice
del matrix[2][2]
print('deletando índice [2][2]:', matrix)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=================================== IMPLEMENTAÇÕES DO TIPO LIST ===================================

# MÓDULO ARRAY

--> Este módulo que já vem na linguagem Python, contém uma implementação de arrays compacta e otimizada
    para valores básicos como caracteres, números inteiros e ponto flutuante.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import sys
from array Import array

// define um array vazio de inteiros sem sinal
myarray = array("I")

// podemos adicionar alguns valores
myarray.insert(0, 5)  # na posição 0 o valor 5
myarray.insert(1, 3)
myarray.insert(2, 5)
print("Após adicionar alguns valores: ", myarray)

// adicionar em uma posição intermediária
myarray.insert(1, 4)
print("Após inserção em índice intermediário: ", myarray)


// remover um valor através do índice
myarray.pop(0)
print("Após remover um valor:", myarray)

// compare o tamanho entre uma lista e um array
elements = list(range(100))  # definimos uma lista de 100 números
print("Tamanho da lista:", sys.getsizeof(elements))
array_from_list = array("I", elements)  // criamos um array a partir da lista
print("Tamanho do array", sys.getsizeof(array_from_list))
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# NUMPY

--> python3 -m pip install numpy

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import numpy as np

// define um array vazio de inteiros
myarray = np.array([], dtype=int)

// podemos adicionar alguns valores
myarray = np.insert(myarray, 0, 5)  // na posição 0 o valor 5
myarray = np.insert(myarray, 1, 3)
myarray = np.insert(myarray, 2, 5)
print("Após adicionar alguns valores: ", myarray)

// adicionar em uma posição intermediária
myarray = np.insert(myarray, 1, 4)
print("Após inserção em índice intermediário: ", myarray)


// remover um valor através do índice
myarray = np.delete(myarray, 0)
print("Após remover um valor:", myarray)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~