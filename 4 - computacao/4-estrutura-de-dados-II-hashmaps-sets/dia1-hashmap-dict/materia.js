==================================== HASHMAP OU HASHTABLE ====================================

O hash map, também conhecida como hash table, é uma estrutura de dados importante na computação,
pois oferece operações de consulta e inserção em O(1). Além de usar uma estrutura de chave-valor,
você pode melhorar a legibilidade de seu código e pensar em diferentes lógicas durante a resolução
dos desafios.

==================================== HASHING EM COMPUTAÇÃO ====================================

--> Hashing significa transformar um dado em uma representação numérica única.

--> É atribuir um id para um determinado dado, mas diferente de um id sequencial, a composição do
dado influencia diretamente no id gerado. Para isso, precisamos submeter o dado a alguma transformação
matemática que considere a sua composição.

--> O hash resultante é menor que o dado de entrada, pois é uma representação simplificada do dado.

--> Hash function é a função que transforma o dado em um número.

--> Bucket: é o local onde o dado será armazenado.

==================================== USANDO HASHING PARA ESTRUTURAR DADOS ====================================

--> A estratégia de armazenamento de dados da hashmap é submeter o dado a um procedimento matemático (hash Function)
para obter um endereço único onde ela será guardada (address).

--> Na relação chave-valor, o id numérico da classe Employee é a chave e o objeto Employee inteiro é o valor. A hash
Function vai ler o valor da chave para definir o endereço do objeto como um todo.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Class Employee:
    def __init__(self, id_num, name):
        self.id_num = id_num
        self.name = name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// HASH FUNCTION
Class HashMap:
    def __init__(self): // BUCKET

      self._buckets = [None for i in range(10)]

    def get_address(self, id_num): // GET POSITION

      return id_num % 10

    def insert(self, employee): // INSERT

      address = self.get_address(employee.id_num)

      self._buckets[address] = employee

    def get_value(self, id_num): // GET VALUE

      address = self.get_address(id_num)

      return self._buckets[address].name

    def has(self, id_num): // HAS VALUE

      address = self.get_address(id_num)

      return self._buckets[address] is not None
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

==================================== FIXANDO ====================================

Exercício 1: Instancie a sua classe HashMap e use os objetos Employee para povoá-la.
Imprima na tela o nome da pessoa de id_num = 23, acessando a informação a partir da HashMap.

Exercício 2: A pessoa de id_num = 10 está com o nome errado, deveria ser name30.
Implemente um método com a assinatura abaixo, onde id_num é a chave para localizar o
registro que queremos alterar e new_name é o nome a ser colocado. Verifique se o seu código 
está realmente alterando o nome, imprimindo o nome antes e depois da alteração:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Employee:
    def __init__(self, id_num, name):
        self.id_num = id_num
        self.name = name

Class HashMap:
    def __init__(self):
        self._buckets = [None] * 10

    def get_address(self, id_num):
        return id_num % 10

    def insert(self, employee):
        address = self.get_address(employee.id_num)
        self._buckets[address] = employee

    def get_value(self, id_num):
        address = self.get_address(id_num)
        return self._buckets[address].name

    def has(self, id_num):
        address = self.get_address(id_num)
        return self._buckets[address] is not None

    def update_value(self, id_num, new_value): // EXERCICIO 2

      address = self.get_address(id_num)
      employee = self._buckets[address]
      employee.name = new_value

if __name__ == "__main__":

    employees = [(14, 'name1'), (23, 'name2'), (10, 'name3'), (9, 'name4')] // ENTRADA
    registry = HashMap()

    for id_num, name in employees:
        employee = Employee(id_num, name)
        registry.insert(employee)

    print(registry.get_value(23))

    // EXERCICIO 2
    print(registry.get_value(10))
    registry.update_value(10, "name30")
    print(registry.get_value(10))
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

==================================== COLISÃO ====================================

--> Colisão é quando dois dados diferentes são transformados em um mesmo endereço.

--> Existem duas formas de tratar colisão: chaining e linear probing.

# SEPARATE CHAINING

--> A estratégia de separar os dados em listas encadeadas é chamada de separate chaining.

--> A ideia é que cada endereço da hashmap guarde uma LISTA encadeada de dados.

--> Quando ocorre uma colisão, o dado é inserido no final da lista encadeada.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ALTERANDO O HASH
Class HashMap:
    def __init__(self):
      self._buckets = [[] for i in range(10)] <<<<<<<<<<<<<<<<<<<<<<<<<<

    def get_address(self, id_num):
      return id_num % 10

    def insert(self, employee):
      address = self.get_address(employee.id_num)
      self._buckets[address].append(employee) <<<<<<<<<<<<<<<<<<<<<<<<<<

      def get_value(self, id_num): <<<<<<<<<<<<<<<<<<<<<<<<<<
        address = self.get_address(id_num)
        for item in self._buckets[address]:
          if item.id_num == id_num:
              return item.name
        return None

    def has(self, id_num):
      address = self.get_address(id_num)
      return self._buckets[address] is not None

    def update_value(self, id_num, new_value): 
      address = self.get_address(id_num)
      employee = self._buckets[address]
      employee.name = new_value

# OPEN ADDRESSING (LINEAR PROBING)

--> A estratégia de linear probing é inserir o dado em um endereço diferente quando ocorre uma colisão.

--> A ideia é que cada endereço da hashmap guarde um dado.

--> Quando ocorre uma colisão, o dado é inserido no próximo endereço disponível.

--> O próximo endereço disponível é calculado somando 1 ao endereço atual.

--> Quando o endereço atual é o último endereço da hashmap, o próximo endereço disponível é o primeiro endereço.

(!) A classe Dict, de Python, utiliza a técnica de tratamento de colisão chamada Open Addressing e busca o próximo
Espaço vazio em duas fases. Ambas aS fases utilizam a representação binária da chave e aplicam fórmulas matemáticas
para definir o próximo índice a ser visitado.

(!) A solução do Python determina o próximo índice a ser visitado de maneira relativamente randômica e resulta em
uma complexidade assintótica de tempo de O(1). Por outro lado, para evitar que o vetor buckets fique rapidamente sem
espaço, um Dict é inicializado com uma lista de tamanho 2**15 ints. Como em Python cada int ocupa 24 bytes, no mínimo,
o uso de memória é considerável.

==================================== CLASSE DICT ====================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Instanciando a classe Dict
employee_registry = {}

// Inserindo dados
// objeto[chave] = valor
employee_registry[14] = 'name1'
employee_registry[23] = 'name2'
employee_registry[10] = 'name3'
employee_registry[9] = 'name4'
print(employee_registry)

// Alterando o nome do id 10
// objeto[chave] = novo_valor
employee_registry[10] = 'name30'
print(f"Novo valor do id 10, após a atualização: {employee_registry[10]}")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Instanciação do objeto vazio
dict1 = {}
dict2 = dict()

// Instanciação com preenchimento inicial de dados
dict3 = {1: 'name1', 2: 'name2'}
print(f"Dicionário 1: {dict1}")
print(f"Dicionário 2: {dict2}")
print(f"Dicionário 3: {dict3}")

// Inserção e Alteração
// Se a chave não existir no dict, uma nova entrada será criada
// Se já existir, o valor será sobreposto
dict1[14] = 'name1'
print(f"Novo dicionário 1, pós inserção/alteração: {dict1}")

// Consulta e Remoção
// Se a chave não existir no dict, causa erro
name = dict1[14]
del dict1[14]
print(f"Dicionário 1 pós consulta e deleção: {dict1}")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

==================================== FIXANDO ====================================

Exercício 5: Consulte a forma de se criar um dicionário chamado de dict comprehension e crie um dicionário que
mapeia inteiros de 3 a 20 para o seu dobro. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
double = {i: i*2 for i in range(3, 21)}

print(double)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Exercício 6: Dada uma string, construa um dicionário com a contagem de cada caractere da palavra. Utilize o
pseudocódigo e o exemplo abaixo para se nortear.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Para cada char na string:
	- Se o char não estiver no dicionário, inclua com o valor 1;

	- Se estiver, incremente o valor.


// Exemplo:

str = "bbbbaaaacccaaaaaaddddddddccccccc"
// saída: {'b': 4, 'a': 10, 'c': 10, 'd': 8}

str = "coxinha"
// saída: {'c': 1, 'o': 1, 'x': 1, 'i': 1, 'n': 1, 'h': 1, 'a': 1}
// Explicação: Nenhuma letra repete em coxinha :)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
count_chars = {}

for char in string:
	if char not in count_chars:
		count_chars[char] = 1
	else:
		count_chars[char] += 1

print(count_chars)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Exercício 7: Utilize o dicionário criado no exercício 5. Para as chaves ímpares, não queremos mais mapear
para o seu dobro, mas sim para o seu triplo. Consulte o método keys() e atualize o seu dicionário para a
nova regra.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// double = {i: i*2 for i in range(3, 21)}

for key in double.keys():
	if key % 2 is not 0:
		double[key] = key * 3


print(double)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~