========================================== SET ==========================================

--> O “Conjunto” (set) é um conceito matemático que é muito útil na computação, uma vez que
muitas entidades do mundo real podem ser modeladas como conjuntos.

========================================== CONCEITO ==========================================

Um conjunto é uma coleção bem definida de elementos. Essa definição pode se dar por meio da
listagem explícita dos elementos ou por meio da descrição dos elementos que o compõem.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Listagem explícita:
// A = {1, 2, 3, 4, 5, 6}

// Descrição dos elementos
// B = {x | x é um número inteiro tal que 0 < x =< 6}
// Ou seja, x, onde x é um número inteiro tal que x menor igual a 6 e maior que
// zero. Ou seja, faz parte desse conjunto números maiores que 0 e menores
// iguais a 6 ({1, 2, 3, 4, 5, 6}).
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// A = {1, 2, 3}
// B = {2, 1, 3}
// C = {1, 1, 2, 2, 3, 3}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Os três conjuntos acima são iguais. O que nos leva a duas propriedades:

1 - A ordem não importa;

2 - É desnecessário manter cópias do mesmo elemento. Tudo o que precisamos que um conjunto
descreva são seus elementos únicos. As operações de “pertence” e “não pertence” são o que nos
permite aplicar esse conceito de igualdade. Essas operações constituem as operações básicas
mais importantes de conjuntos:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
if element in colection:
    // ...

if element not in colection:
    // ...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# UNIÃO

--> Todos os elementos que pertencem a A ou a B

# INTERSEÇÃO

--> Todos os elementos que pertencem a A e a B

# DIFERENÇA

--> Todos os elementos que pertencem a A e não a B

# DIFERENÇA SIMÉTRICA

-->  Todos os elementos que pertencem exclusivamente a A ou a B

# SUBCONJUNTO

--> Todos os elementos de A pertencem a B

========================================== FORMAS DE REPRESENTAR CONJUNTOS ==========================================

# CONJUNTOS REPRESENTADOS POR VETORES

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
A = {1, 2, 3}
B = {2, 3, 4}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Os elementos são números inteiros e pequenos, então podemos fazer uso dos índices de um vetor de booleanos para
identificar a presença ou não de cada elemento.

Para saber se um elemento pertence ao conjunto, basta verificar se A[2] é True, por exemplo. O acesso direto aos endereços do vetor, consulta, inserção e remoção, ocorrem em O(1).

Os lados negativos dessa implementação são:

1 - Caso os elementos não sejam valores pequenos;

2 - Caso os elementos sejam valores muito esparsos, como {1, 1000, 20000}. Dessa forma, teríamos muitos espaços
    subutilizados na memória;

3 - Caso os elementos não sejam números.

# CONJUNTOS REPRESENTADOS POR DICT

--> Mapearíamos a string para o quê? Poderíamos mapear para qualquer coisa, uma vez que esses valores nunca serão
acessados e estariam lá apenas porque a hash exige. Então vamos escolher valores booleanos, que ocupam pouco espaço.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
A = {1, 2, 3}
// 0: False
// 1: True
// 2: True
// 3: True
// 4: False
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================== CRIANDO CLASSE CONJUNTO ==========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Conjunto:
  def __init__(self):
    self.set = [False] * 1001
    self.last_element = 0

  def add(self, item): // Adiciona elemento ao conjunto
    if not self.set[item]:
      self.set[item] = True
    if item > self.last_element:
      self.last_element = item

  def __str__(self): // Trasforma em string
    string = '{'
      
    for index, is_in_set in enumerate(self.set):
      if is_in_set:
        string += str(index)
        if index < self.last_element:
          string += ", "

    string += "}"
    return string

  def __contains__(self, item): // Verifica se o elemento está no conjunto
    return self.set[item]

  def union(self, conjunto_b): // União
    new_conjunto = Conjunto()

    for index in range(1001):
      if self.set[index] or conjunto_b.set[index]:
        new_conjunto.add(index)

    return new_conjunto

  def intersection(self, conjunto_b): // Interseção
    new_conjunto = Conjunto()

    for index in range(1001):
      if self.set[index] and conjunto_b.set[index]:
        new_conjunto.add(index)

    return new_conjunto
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================== CLASSE SET ==========================================

(!) Por baixo dos panos, a classe Set é uma modificação da classe Dict e não um vetor de booleanos
como fizemos. Ou seja, no fundo, o Set, é uma hashmap. Mas não é um simples mapeamento da chave para
True; a classe Set não guarda valor nenhum, ou seja, não está exatamente replicando uma estrutura do
tipo “chave-valor”, pois não há valor. Por isso, ocupa menos espaço do que um Dict, ao mesmo tempo em
que mantém a eficiência das operações.

--> Set é uma coleção não ordenada de objetos imutáveis únicos.

# FROZENSET

--> É uma coleção imutável de objetos únicos. É uma versão imutável do Set.

--> Uma vez instanciados, não é possível adicionar ou remover elementos e todos os métodos que realizam
    essas duas operações estão indisponíveis no frozenset.

# OPERAÇÕES BÁSICAS

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Podemos instanciar um set vazio ou inicializar com valores de um objeto
// iterável, como uma lista
conjunto_a = set()

// Ao inicializar com valores de uma lista, os valores duplicados serão
// desconsiderados e a ordem de inserção será perdida.
conjunto_b = set([1, 1, 2, 3, 3, 3])

// Add - adiciona o elemento ao conjunto
conjunto_a.add(5)
conjunto_a.add(3)
conjunto_a.add(0)

// sets admitem objetos mistos. Ou seja, admitem ter _strings_ com _ints_
// dentro de um mesmo objeto, por exemplo.
conjunto_a.add('elemento')

// Temos 2 jeitos de remover elementos:
// - remove() causa erro caso o elemento não esteja no set;
// - discard() não causa erro caso o elemento não esteja no set.

// Não vai dar erro
conjunto_b.remove(3)

// Vai dar erro pois já removemos esse elemento e set não guarda duplicatas
conjunto_b.remove(3)

// Não vai dar erro
conjunto_b.discard(3)

// Pop - remove e retorna um elemento aleatório do set
// - set é um objeto iterável, mas não conseguimos garantir em que ordem os
//   elementos serão acessados.
// - A função pop () é útil quando queremos trabalhar com algum elemento do
//   set, mas não sabemos de antemão quais elementos estão dentro dele.
some_element = conjunto_a.pop()

// clear() remove todos os itens do set
conjunto_b.clear()

// Consulta
// A consulta é feita com o operador "in"
if 2 in conjunto_a:
    print("2 está em A")

if 7 not in conjunto_a:
    print("7 não está em A")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# OPERAÇÕES COM OUTROS CONJUNTOS


1 - set.isdisjoint(other): retorna True se o set não tem nenhum elemento em comum com other,
    ou seja, se a intersecção é vazia;

2 - set.issubset(other): verifica se set é um subconjunto de other, ou seja, se todo elemento
    de set está em other;

3 - set.issuperset(other): verifica se set é um superconjunto de other, ou seja, se todos os
    elementos de other estão em set. A diferença de um superconjunto e de um subconjunto é que
    no superconjunto podem haver outros elementos, além dos elementos de other já presentes dentro
    de set. Já no subconjunto não;

4 - set == other: verifica se os conjuntos são iguais, ou seja, se todos os elementos de set estão
    em other e se todos os elementos de other estão em set. Lembre-se que a ordem não importa. Não
    existe função dedicada para a comparação de igualdade.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Conjunto:
  def __init__(self):
    self.set = [False] * 1001
    self.last_element = 0

  def add(self, item): // Adiciona elemento ao conjunto
    if not self.set[item]:
      self.set[item] = True
    if item > self.last_element:
      self.last_element = item

  def __str__(self): // Trasforma em string
    string = '{'
      
    for index, is_in_set in enumerate(self.set):
      if is_in_set:
        string += str(index)
        if index < self.last_element:
          string += ", "

    string += "}"
    return string

  def __contains__(self, item): // Verifica se o elemento está no conjunto
    return self.set[item]

  def union(self, conjunto_b): // União
    new_conjunto = Conjunto()

    for index in range(1001):
      if self.set[index] or conjunto_b.set[index]:
        new_conjunto.add(index)

    return new_conjunto

  def intersection(self, conjunto_b): // Interseção
    new_conjunto = Conjunto()

    for index in range(1001):
      if self.set[index] and conjunto_b.set[index]:
        new_conjunto.add(index)

    return new_conjunto

  def difference(self, conjunto_b): // Diferença
    new_conjunto = Conjunto()

    for index in range(1001):
      if self.set[index] and not conjunto_b.set[index]:
        new_conjunto.add(index)

    return new_conjunto

  def issubset(self, conjunto_b): // Subconjunto
    for index in range(1001):
      if self.set[index] and not conjunto_b.set[index]:
        return False

    return True

  def issuperset(self, conjunto_b): // Superconjunto
    for index in range(1001):
      if conjunto_b.set[index] and not self.set[index]:
        return False

    return True
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~