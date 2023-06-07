========================================== NÓ E LISTAS ENCADEADAS ========================================== 

--> Os Nós (Chamados em inglês de Nodes) são um Tipo Abstrato de Dados. O nó é pequeno, elementar e, quando
utilizado sozinho, não possui muita utilidade, mas é com ele que vários outros TADs muito poderosos são construídos.
Um deles é a lista encadeada!

--> As listas encadeadas (em inglês chamadas LinkedLists) oferecem algumas vantagens importantes sobre outras
estruturas de dados lineares. Ao contrário dos arrays, as LinkedLists são uma estrutura de dados dinâmica,
redimensionável em tempo de execução. Além disso, as operações de inserção e exclusão são eficientes e facilmente
implementadas.

========================================== NÓ ========================================== 

--> Um nó é um elemento básico de uma LinkedList. Cada nó armazena um DADO e uma REFERÊNCIA para o próximo nó da
lista. A LinkedList mantém uma referência para o primeiro e último nó da lista.

========================================== LISTA ENCADEADA ========================================== 

--> Uma LinkedList é uma coleção de nós, cada um com uma referência para o próximo nó da lista. A LinkedList
mantém uma referência para o primeiro e último nó da lista.

--> A LinkedList é uma estrutura de dados dinâmica, redimensionável em tempo de execução. Isso significa que
você pode adicionar e remover elementos da lista conforme necessário. A LinkedList também é uma estrutura de
dados linear, o que significa que os elementos são organizados em uma ordem linear e podem ser percorridos em
uma direção.

1 - É uma estrutura de dados encadeada, o que significa que os elementos não são armazenados em
uma localização contígua na memória e os elementos são vinculados uns aos outros usando ponteiros.

2 - É uma estrutura de dados ordenada, o que significa que os elementos são organizados em uma
ordem linear e podem ser percorridos em uma direção.

(!) LinkedLists não tem as restrições de acesso como nas seguintes TADs:

- FILA: Acessar apenas o primeiro elemento;

- PILHA: Acessar apenas o último elemento;

- DEQUE: Acessar apenas as extremidades - Deque.

========================================== OPERAÇÕES COMUNS ========================================== 

* A operação insert_first nos permite adicionar um Node no início da lista; Complexidade: O(1)

* A operação insert_last nos permite adicionar um Node no final da lista; Complexidade: O(n)

* A operação insert_at nos permite adicionar um Node em qualquer posição da lista; Complexidade: O(n)

* A operação remove_first nos permite remover um Node do início da lista; Complexidade: O(1)

* A operação remove_last nos permite remover um Node do final da lista; Complexidade: O(n)

* A operação remove_at nos permite remover um Node em qualquer posição da lista; Complexidade: O(n)

* A operação clear nos permite remover todos os Nodes da lista; Complexidade: O(n)

* A operação get_element_at nos permite visualizar o Node em qualquer posição da lista; Complexidade: O(n)

* A operação is_empty nos permite identificar se existe ao menos um Node na lista. Complexidade: O(1)

========================================== ENCADEAMENTO DUPLO ========================================== 

--> O encadeamento duplo é uma técnica que permite que cada nó da lista encadeada tenha duas referências, uma
para o próximo nó e outra para o nó anterior.

--> O encadeamento duplo permite que você percorra a lista em ambas as direções, mas o custo é o dobro do
espaço de armazenamento.

========================================== IMPLEMENTAÇÃO DE UM NODE ========================================== 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Node:
    def __init__(self, value):
        self.value = value  // 🎲 Dado a ser armazenado
        self.next = None  // 👉 Forma de apontar para outro nó

    def __str__(self):
        return f"Node(value={self.value}, next={self.next})"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================== IMPLEMENTAÇÃO DE UMA LINKEDLIST ========================================== 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from node Import Node


Class LinkedList:
    def __init__(self):
        self.head_value = None
        self.__length = 0

    def __str__(self):
        return f"LinkedList(len={self.__length}, value={self.head_value})"

    def __len__(self):
        return self.__length

    // INSERIR NO INICIO
    def insert_first(self, value):
      first_value = Node(value)
      first_value.next = self.head_value
      self.head_value = first_value
      self.__length += 1

    // INSERIR NO FINAL
    def insert_last(self, value):
      last_value = Node(value)
      current_value = self.head_value

      if self.is_empty():
          return self.insert_first(value)

      while current_value.next:
          current_value = current_value.next

      current_value.next = last_value
      self.__length += 1

    // INSERIR QUALQUER POSIÇÃO
    def insert_at(self, value, position):
      if position < 1:
          return self.insert_first(value)

      if position >= len(self):
          return self.insert_last(value)

      current_value = self.head_value

      while position > 1:
          current_value = current_value.next
          position -= 1

      next_value = Node(value)
      next_value.next = current_value.next
      current_value.next = next_value
      self.__length += 1

    // REMOVER NO INICIO
    def remove_first(self):
      value_to_be_removed = self.head_value

      if value_to_be_removed:
          self.head_value = self.head_value.next
          value_to_be_removed.next = None
          self.__length -= 1

      return value_to_be_removed

    // REMOVER NO FINAL
    def remove_last(self):

      if len(self) <= 1:
          return self.remove_first()

      previous_to_be_removed = self.head_value

      while previous_to_be_removed.next.next:
          previous_to_be_removed = previous_to_be_removed.next

      value_to_be_removed = previous_to_be_removed.next
      previous_to_be_removed.next = None
      self.__length -= 1

      return value_to_be_removed

    // REMOVER QUALQUER POSIÇÃO
    def remove_at(self, position):
        if position < 1:
            return self.remove_first()

        if position >= len(self):
            return self.remove_last()

        previous_to_be_removed = self.head_value

        while position > 1:
            previous_to_be_removed = previous_to_be_removed.next
            position -= 1

        value_to_be_removed = previous_to_be_removed.next
        previous_to_be_removed.next = value_to_be_removed.next
        value_to_be_removed.next = None
        self.__length -= 1

        return value_to_be_removed

    // OBTER QUALQUER ELEMENTO
      // Caso não haja elementos em nossa estrutura será retornado None;
      // Caso a posição seja menor igual a 0, será retornado o primeiro elemento;
      // Caso a posição seja maior igual a N, onde N é o tamanho da lista, será retornado o último elemento.
    def get_element_at(self, position):

      value_returned = None
      value_to_be_returned = self.head_value

      if value_to_be_returned:
          while position > 0 and value_to_be_returned.next:
              value_to_be_returned = value_to_be_returned.next
              position -= 1

          if value_to_be_returned:
              value_returned = Node(value_to_be_returned.value)

      return value_returned

    // LISTA VAZIA
    def is_empty(self):
      return not self.__length
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~