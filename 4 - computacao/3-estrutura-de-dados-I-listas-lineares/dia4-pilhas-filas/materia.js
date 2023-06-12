======================================== PROBLEMÁTICA ========================================

Às vezes quando estamos escrevendo um código, podemos esquecer de fechar algum parêntese ou chave,
o que leva a erros que o interpretador/compilador pode não entender muito bem. Faça um programa que
recebe um código do qual foram removidos todos os outros caracteres, e verifica se todos os parêntese
E chaves foram fechados corretamente.

Exemplo de retorno True: {}()({}), (){} Exemplos de retorno False: {(}), ()}

======================================== O QUE É UMA PILHA? ========================================

--> A estrutura de pilha é uma estrutura do tipo LIFO (Last In First Out). Ou seja, o último elemento
a entrar na pilha é o primeiro a sair.

======================================== OPERAÇÕES COMUNS ========================================

--> push(): adiciona um elemento no topo da pilha

--> pop(): remove o elemento do topo da pilha

--> peek(): retorna o elemento do topo da pilha

--> isEmpty(): retorna true se a pilha estiver vazia

--> isFull(): retorna true se a pilha estiver cheia

--> size(): retorna o tamanho da pilha

--> clear(): limpa a pilha

--> print(): imprime a pilha

======================================== IMPLEMENTAÇÕES ========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// stack.py

Class Stack():
    def __init__(self):
      self._data = list()

    def size(self): // VERIFICA O TAMANHO DA PILHA
      return len(self._data)

    def is_empty(self): // VERIFICA SE A PILHA ESTÁ VAZIA
      return not bool(self.size())

    def push(self, value):  // ADICIONA UM ELEMENTO NO TOPO DA PILHA
      self._data.append(value) 

    def pop(self): // REMOVE O ELEMENTO DO TOPO DA PILHA

      if self.is_empty():
        return None

      // -1 se refere ao último objeto da pilha.
      // Ou seja, o valor do topo da pilha

      value = self._data[-1]
      del self._data[-1]

      return value

    def peek(self): // RETORNA O ELEMENTO DO TOPO DA PILHA

      if self.is_empty():
          return None

      value = self._data[-1]

      return value

    def clear(self): // LIMPA A PILHA
      self._data.clear()

    
    def __str__(self):  // IMPRIME A PILHA

      str_items = ""

      for i in range(self.size()):
          value = self._data[i]
          str_items += str(value)

          if i + 1 < self.size():
              str_items += ", "

      return "Stack(" + str_items + ")"

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# ONDE PILHAS SÃO USADAS?

--> Muitas linguagens utilizam a pilha para poder controlar o estado das chamadas de funções ou para
resolver expressões matemáticas e lógicas.

--> Pilhas também podem ser utilizadas para replicar o funcionamento de algoritmos recursivos, ou
qualquer outro cenário em que temos uma coleção de elementos e precisamos controlar qual foi o elemento
mais recente.

======================================== O QUE É UMA FILA? ========================================

--> A estrutura de fila é uma estrutura do tipo FIFO (First In First Out). Ou seja, o primeiro elemento
a entrar na fila é o primeiro a sair.

======================================== OPERAÇÕES COMUNS ========================================

--> enqueue(): adiciona um elemento no final da fila

--> dequeue(): remove o elemento do início da fila

--> peek(): retorna o elemento do início da fila

--> isEmpty(): retorna true se a fila estiver vazia

--> isFull(): retorna true se a fila estiver cheia

--> size(): retorna o tamanho da fila

--> clear(): limpa a fila

--> print(): imprime a fila

======================================== IMPLEMENTAÇÕES ========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// queue.py

Class Queue():
    def __init__(self):
        self._data = list()

    def enqueue(self, value):
        self._data.append(value)

    def dequeue(self):
        if len(self._data) == 0:
            return None
        return self._data.pop(0)

    def __str__(self):
        str_items = ""
        for i in range(len(self._data)):
            value = self._data[i]
            str_items += str(value)
            if i + 1 < len(self._data):
                str_items += ", "

        return "Queue(" + str_items + ")"

if __name__ == "__main__":
    elements = ["Milkshake", "Batata Frita", "Refrigerante"]
    content_queue = Queue()

    print(content_queue)
    // Saída: Queue()
    
    for elem in elements:
        content_queue.enqueue(elem)

    print(content_queue)
    // Saída: Queue(Milkshake, Batata Frita, Refrigerante)
    
    content_queue.dequeue()
    print(content_queue)
    // Saída: Queue(Batata Frita, Refrigerante) 
    
    print(content_queue.dequeue())
    // Saída: Batata Frita
    // porque "Milkshake" já foi removido e "Batata Frita" se tornou o primeiro elemento da fila 

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~