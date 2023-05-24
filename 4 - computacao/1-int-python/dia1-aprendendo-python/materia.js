========================================= O QUE É PYTHON? =========================================

# Python é uma linguagem de programação que busca simplicidade em sua sintaxe, resultando assim em
legibilidade do código e maior produtividade. Seu interpretador pode ser executado em diversos sistemas
operacionais como Linux, MacOS e Windows, quase sempre sem mudanças no código.

Muito popular hoje em dia devido à área de ciência de dados, essa linguagem pode ser utilizada em:

--> criação de aplicações web;
--> automação de tarefas repetitivas;
--> aplicativos desktop;
--> aplicações para dispositivos móveis (embora para essa finalidade Python não seja tão popular e nem recomendada).

========================================= TERMINAL REPL =========================================

As distribuições do sistema operacional Linux e Mac, normalmente, já vem com uma versão Python instalada,
pois utilizam a linguagem em diversos programas essenciais.

- python3

~~~~~~~~~~~~~~~~~~~~~~~~~~
Python 3.8.2 (default, Jun  2 2020, 13:51:17)
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= OPERAÇÕES BÁSICAS =========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~
2 * 3  # saída: 6
2 + 3  # saída: 5
3 / 2  # saída: 1.5
3 / / 2  # saída: 1
~~~~~~~~~~~~~~~~~~~~~~~~~~

square_root = 25 ** (1/2)  # raiz quadrada de 25. O operador `**` significa "elevado a"

print(square_root + 1)  # saída: 6.0
~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= TIPOS DE DADOS EMBUTIDOS =========================================

bool: True e False (!) - com iniciais maiúsculas;
int: número inteiro; a = 5 - type(a) => 'class int';
float: número fracionário; a = 5,5;
str: cadeiras de caracteres; a = 'Olá';

sequência: list, tuple, range;
conjuntos: set, fronzenset;
mapeamento: dict;
binárias: bytes, bitearray, memoryview;

--> list:
É uma sequência mutável e ordenada de elementos. Ela pode armazenar elementos heterogêneos, ter seu tamanho
variável e crescer à medida que itens são adicionados.

~~~~~~~~~~~~~~~~~~~~~~~~~~
fruits = ["laranja", "maçã", "uva", "abacaxi"]  # elementos são definidos separados por vírgula, envolvidos
por colchetes

fruits[0]  # o acesso é feito por índices iniciados em 0

fruits[-1]  # o acesso também pode ser negativo

fruits.append("banana")  # adicionando uma nova fruta

fruits.remove("abacaxi")  # removendo uma fruta

fruits.extend(["pera", "melão", "kiwi"])  # acrescenta uma lista de frutas a lista original

fruits.index("maçã")  # retorna o índice onde a fruta está localizada, neste caso, 1

fruits.sort()  # ordena a lista de frutas
~~~~~~~~~~~~~~~~~~~~~~~~~~

--> set:
É uma coleção de elementos únicos e não ordenados. Conjuntos implementam operações de união, intersecção e outras.

~~~~~~~~~~~~~~~~~~~~~~~~~~
permissions = {"member", "group"}  # elementos separados por vírgula, envolvidos por chaves

permissions.add("root")  # adiciona um novo elemento ao conjunto

permissions.add("member")  # como o elemento já existe, nenhum novo item é adicionado ao conjunto

permissions.union({"user"})  # retorna um conjunto resultado da união

permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
~~~~~~~~~~~~~~~~~~~~~~~~~~

--> frozenset:
É uma variação do set, porém imutável, ou seja, seus elementos não podem ser modificados durante a execução do
programa.

~~~~~~~~~~~~~~~~~~~~~~~~~~
permissions = frozenset(["member", "group"])  # assim como o set, qualquer estrutura iterável pode ser utilizada
para criar um frozenset

permissions.union({"user"})  # novos conjuntos imutáveis podem ser criados à partir do original, mas o mesmo não
pode ser modificado

permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
~~~~~~~~~~~~~~~~~~~~~~~~~~

--> dict:
Estrutura que associa uma chave a um determinado valor. É a representação do tão famoso objeto que utilizamos
em JavaScript.

~~~~~~~~~~~~~~~~~~~~~~~~~~
people_by_id = {1: "Maria", 2: "Fernanda", 3: "Felipe"}  # elementos no formato "chave: valor" separados por
vírgula, envolvidos por chaves

people_by_name = {"Maria": 1, "Fernanda": 2, "Felipe": 3}  # outro exemplo, dessa vez usando strings como chaves.
As aspas são necessárias para que o Python não ache que `Maria`, `Fernanda` e `Felipe` sejam variáveis.

# elementos são acessados por suas chaves
people_by_id[1]  # saída: Maria

# elementos podem ser removidos com a palavra chave del
del people_by_id[1]

people_by_id.items()  # dict_items([(2, "Fernanda"), (3, "Felipe")])
# é retornada uma coleção iterável de tuplas contendo chaves e valores
~~~~~~~~~~~~~~~~~~~~~~~~~~

--> range:
Estrutura capaz de gerar uma sequência numérica de um valor inicial até um valor final, modificando seu valor
de acordo com o passo (step) definido. Pode ser declarado como range( [start], [stop], [step] ), em que start
e step podem ser omitidos, possuindo valores iniciais iguais a 0 e 1 respectivamente.

(!) O stop não é incluído na sequência, portanto, caso queira uma sequência de 1 até 10 a chamada deverá ser
range(1, 11)

~~~~~~~~~~~~~~~~~~~~~~~~~~
# vamos converter o range em uma lista para ajudar na visualização

# definimos somente o valor de parada
list(range(5))  # saída: [0, 1, 2, 3, 4]

# definimos o valor inicial e o de parada
list(range(1, 6))  # saída: [1, 2, 3, 4, 5]

# definimos valor inicial, de parada e modificamos o passo para 2
list(range(1, 11, 2))  # saída: [1, 3, 5, 7, 9]

# podemos utilizar valores negativos para as entradas também
list(range(10, 0, -1))  # saída: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= ESTRUTURAS CONDICIONAIS =========================================

--> if / elif:

~~~~~~~~~~~~~~~~~~~~~~~~~~
position = ""
if salary <= 2000:
    position = "estagiário"
elif 2000 < salary <= 5800:
    position = "júnior"
elif 5800 < salary <= 7500:
    position = "pleno"
elif 7500 < salary <= 10500:
    position = "senior"
else:
    position = "líder"
~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) A indentação do código deve ser feita com 4 espaços em vez de tabs. 

--> for:

~~~~~~~~~~~~~~~~~~~~~~~~~~
restaurants = [
  {"name": "Restaurante A", "nota": 4.5},
  {"name": "Restaurante B", "nota": 3.0},
  {"name": "Restaurante C", "nota": 4.2},
  {"name": "Restaurante D", "nota": 2.3},
]

filtered_restaurants = []
min_rating = 3.0
for restaurant in restaurants:
    if restaurant["nota"] > min_rating:
        filtered_restaurants.append(restaurant)
print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Em alguns casos, podemos ainda querer percorrer uma sequência numérica, e para isto iteramos sobre
a estrutura de dados range. 

~~~~~~~~~~~~~~~~~~~~~~~~~~
for index in range(5):
    print(index)
~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) list comprehension:

A compreensão de listas em Python possui uma sintaxe fácil e compacta para criação de listas, seja a
partir de uma string ou de outra lista. É uma maneira concisa de criação que executa uma operação em
cada item da lista já existente.

~~~~~~~~~~~~~~~~~~~~~~~~~~
min_rating = 3.0
filtered_restaurants = [
    restaurant
    for restaurant in restaurants
    if restaurant["nota"] > min_rating
]
print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
~~~~~~~~~~~~~~~~~~~~~~~~~~
names_list = ['Duda', 'Rafa', 'Cris', 'Yuri']
new_names_list = [name for name in names_list if 'a' in name]

# Aqui o for percorre cada nome em "names_list", verifica se existe a letra "a" nele,
# o adiciona à variável "name", e então gera nossa nova lista "new_names_list"
print(new_names_list)

# Saída
['Duda', 'Rafa']
~~~~~~~~~~~~~~~~~~~~~~~~~~
quadrados = [x*x for x in range(11)]
print(quadrados)

# Saída
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
~~~~~~~~~~~~~~~~~~~~~~~~~~

--> while:

~~~~~~~~~~~~~~~~~~~~~~~~~~
n = 10
last, next = 0, 1
while last < n:
    print(last)
    last, next = next, last + next
~~~~~~~~~~~~~~~~~~~~~~~~~~
No exemplo anterior, estamos imprimindo os elementos da sequência até que atinja o valor 10. Neste caso,
foi utilizado um truque chamado atribuição múltipla. Isto é, atribuição de vários valores a múltiplas
variáveis ao mesmo tempo.

--> enumerate:

Em Python, um loop for geralmente é escrito como um loop sobre um objeto iterável. Isso significa que
você não precisa de uma variável de contagem para acessar itens no iterável.

Porém, às vezes, pode acontecer de você querer uma variável que muda em cada iteração do loop. Em vez
de criar e incrementar uma variável você mesmo, você pode usar enumerate() do Python para obter um
contador e o valor do iterável ao mesmo tempo!

~~~~~~~~~~~~~~~~~~~~~~~~~~
languages = ['Python', 'Java', 'JavaScript']

enumerate_prime = enumerate(languages)

# converte um objeto enumerate em uma lista
print(list(enumerate_prime))

# Saída: [(0, 'Python'), (1, 'Java'), (2, 'JavaScript')]
~~~~~~~~~~~~~~~~~~~~~~~~~~
languages = ['Python', 'Java', 'JavaScript']

for index, language in enumerate(['Python', 'Java']):
    print(f'{index} - {language}')

# Saída:
0 - Python
1 - Java
~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= FUNÇÕES =========================================

# Funções são definidas através da palavra reservada def, seguida por um nome e os parâmetros entre
parênteses. Como todo bloco de código em Python, o caractere : define o início do bloco, e a indentação
define seu fim.

Os parâmetros podem ser passados de forma:

--> posicional: são aqueles definidos por meio da posição em que cada um é passado;
--> nomeada: são definidos por meio de seus nomes.

~~~~~~~~~~~~~~~~~~~~~~~~~~
def soma(x, y):
    return x + y

soma(2, 2)  # os parâmetros aqui são posicionais

soma(x=2, y=2)  # aqui estamos nomeando os parâmetros
~~~~~~~~~~~~~~~~~~~~~~~~~~
def concat(*strings):
    # Equivalente a um ", ".join(strings), que concatena os elementos de um iterável em uma string utilizando um separador
    # Nesse caso a string resultante estaria separada por vírgula
    final_string = ""
    for string in strings:
        final_string += string
        if not string == strings[-1]:
            final_string += ', '
    return final_string

# pode ser chamado com 2 parâmetros
concat("Carlos", "Cristina")  # saída: "Carlos, Cristina"

# pode ser chamado com um número n de parâmetros
concat("Carlos", "Cristina", "Maria")  # saída: "Carlos, Cristina, Maria"

# dict é uma função que já vem embutida no python
dict(nome="Felipe", sobrenome="Silva", idade=25)  # cria um dicionário utilizando as chaves passadas

dict(nome="Ana", sobrenome="Souza", idade=21, turma=1)  # o número de parâmetros passados para a função pode variar
~~~~~~~~~~~~~~~~~~~~~~~~~~

As variáveis definidas dentro das funções tem escopo local. Porém, quando uma função não encontra 
um nome no escopo local, ela irá procurar no espaço de nomes global.

Em alguns casos, podemos querer limitar um parâmetro em nomeado ou posicional para evitar ambiguidades
e/ou aumentar legibilidade.

~~~~~~~~~~~~~~~~~~~~~~~~~~
len([1, 2, 3, 4])  # função len não aceita argumentos nomeados

len(obj=[1, 2, 3, 4])  # este código irá falhar

print("Coin", "Rodrigo", ", ")  # imprime Coin Rodrigo ,

print("Coin", "Rodrigo", sep=", ")  # nomeando o terceiro parâmetro, agora temos a saída: Coin, Rodrigo
~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= ARQUIVOS PYTHON =========================================

area.py;

~~~~~~~~~~~~~~~~~~~~~~~~~~
PI = 3.14  # PI é uma "constante" em nosso módulo


def square(side):
    '''Calculate area of square.'''
    return side * side


def rectangle(length, width):
    '''Calculate area of rectangle.'''
    return length * width


def circle(radius):
    '''Calculate area of circle.'''
    return PI * radius * radius
~~~~~~~~~~~~~~~~~~~~~~~~~~

Observe que esse código segue algumas boas práticas para legibilidade, tais como:

--> Entre cada função temos um espaço de 2 linhas;
--> As funções são declaradas com nomes em letras minúsculas;
--> A constante PI é definida em letras maiúsculas.


(!) O Import é utilizado para termos todas As funções do módulo disponíveis em outro arquivo. Uma outra
maneira de utilizarmos é escrevendo From area Import rectangle, por exemplo, se quisermos importar apenas
rectangle a partir de area. Porém, tome cuidado com conflitos de nomes caso use essa segunda maneira.

========================================= PYTHON NO DOCKER =========================================

1 - baixe a imagem:

~~~~~~~~~~~~~~~~~~~~~~~~~~
# Baixe a última versão do python
docker pull python

# Baixe uma versão específica
docker pull python:tag
~~~~~~~~~~~~~~~~~~~~~~~~~~

2 - execute REPL:

~~~~~~~~~~~~~~~~~~~~~~~~~~
docker run -it --rm python:tag
~~~~~~~~~~~~~~~~~~~~~~~~~~

3 - crie um dockerfile

~~~~~~~~~~~~~~~~~~~~~~~~~~
// O comando `FROM` é usado para especificar a imagem base da qual a sua imagem irá derivar
//  Neste caso vamos usar como base a imagem do Python3 mais recente
FROM python:3

// A partir da imagem do Python 3 vamos realizar uma série de passos para preparar o ambiente da nova imagem.

// O comando `WORKDIR` é usado para definir o diretório principal de execução e armazenamento no interior da imagem
WORKDIR /usr/src/app

//  O comando `COPY` copia um diretório ou arquivo local para dentro da imagem durante o build
//  Com isso ao executar um contêiner a partir dessa imagem os arquivos já estarão lá
//  Neste caso copiamos o arquivo de requisitos para dentro do WORKDIR
COPY requirements.txt ./

//  O comando `RUN` permite que executemos um comando durante o build da imagem
//  Neste caso executamos a instalação das dependências, fazendo com que ao criar
//  um contêiner a partir da nossa imagem, o mesmo já tenha todas as dependências instaladas
RUN pip install --no-cache-dir -r requirements.txt

//  Copiamos o resto dos arquivos do diretório atual para o WORKDIR da imagem
COPY . .

//  O comando `CMD` define qual comando será executado quando criarmos um contêiner a partir da imagem
CMD [ "python", "./seu-arquivo.py" ]
~~~~~~~~~~~~~~~~~~~~~~~~~~

4 - rodar a imagem:

~~~~~~~~~~~~~~~~~~~~~~~~~~
docker build -t my-python-app .
docker run -it --rm --name my-running-app my-python-app
~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= CONVENÇÕES =========================================

1 - Docstring:

São os literais de string que aparecem logo após a definição de uma função, método, classe ou módulo.

~~~~~~~~~~~~~~~~~~~~~~~~~~
def quadrado(n):
    '''Recebe um número n, retorna o quadrado de n''' # Literal de string <<<<<<<<<<<<
    return n**2
~~~~~~~~~~~~~~~~~~~~~~~~~~

2 - Atributo __doc__:

Podemos acessar essas docstrings usando o atributo __doc__.

~~~~~~~~~~~~~~~~~~~~~~~~~~
def quadrado(n):
    '''Recebe um número n, retorna o quadrado de n''' # Literal de string
    return n**2
print(quadrado.__doc__)

# Saída
Recebe um número n, retorna o quadrado de n
~~~~~~~~~~~~~~~~~~~~~~~~~~