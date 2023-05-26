======================================== ESTRUTURANDO UMA APLICAÇÃO ========================================

1 - MÓDULOS:

Um módulo é um arquivo que contém definições e instruções em Python. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~
//my_math.py

def sum(a, b):
  return a + b


def pot(a, b):
  return a ** b


print(sum(2, 2))
print(pot(2, 3))
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Este arquivo é um módulo Python, que pode ser executado como script com o comando python3 my_math.py.
Se isso ocorrer, os retornos serão 4 e 8, respectivamente, devido às chamadas das funções dentro dos
métodos print().

2 - PACOTES:

Pacotes são módulos Python que contêm outros módulos e/ou pacotes, comumente separados por
responsabilidades similares. Na prática, um pacote é um diretório que pode conter vários módulos.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import http  // importa o pacote http como um módulo

from http Import client  // importa o módulo client do pacote http

from http.client Import HTTP_PORT  // importa a constante HTTP_POST do módulo client do pacote http
~~~~~~~~~~~~~~~~~~~~~~~~~~~

3 - AMBIENTE VIRTUAL:

O venv é um módulo já embutido na linguagem, e serve para isolar ambientes de projetos. Ou seja, eu
consigo ter dois projetos rodando em dois ambientes diferentes, que podem ter versões diferentes
de uma mesma biblioteca.

--> python3 -m venv .venv

--> ativar: source .venv/bin/activate

======================================== ENTRADA E SAÍDA ========================================

1 - ENTRADA:

Uma das maneiras que existem de receber valores em nossos programas é utilizando o módulo sys.
Quando executamos um script e adicionamos parâmetros, os mesmos estarão disponíveis através de
uma variável chamada sys.argv, que é preenchida sem que precisemos fazer nada. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import sys


if __name__ == "__main__":
    for argument in sys.argv:
        print("Received -> ", argument)
~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 arquivo.py 2 4 "teste"
~~~~~~~~~~~~~~~~~~~~~~~~~~~
Received ->  arquivo.py
Received ->  2
Received ->  4
Received ->  teste
~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Também é possível coletar dados do terminal através da função input, que vem embutida na própria linguagem.
    Esta função está vinculada à entrada padrão do sistema operacional e tem como parâmetro opcional o prompt
    que, caso seja fornecido, exibirá a mensagem passada para ele em tela. O valor recebido através da função
    será do tipo texto (str):

~~~~~~~~~~~~~~~~~~~~~~~~~~~
user_input = input("Digite uma mensagem: ")
print('O valor recebido foi:', user_input)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

2 - SAÍDA:

A função print — que já vem embutida na linguagem — é a principal função para imprimirmos um valor em “tela”.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
print("O resultado é", 42)  // saída: O resultado é 42
print("Os resultados são", 6, 23, 42)  // saída: Os resultados são 6 23 42
~~~~~~~~~~~~~~~~~~~~~~~~~~~
print("Maria", "João", "Miguel", "Ana")  // saída: Maria João Miguel Ana
print("Maria", "João", "Miguel", "Ana", sep=", ")  // saída: Maria, João, Miguel, Ana
~~~~~~~~~~~~~~~~~~~~~~~~~~~
print("Em duas ")
print("linhas.")
~~~~~~~~~~~~~~~~~~~~~~~~~~~
print("Na mesma", end=" ")
print("linha.")
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Já sabemos que erros podem acontecer e o sistema operacional normalmente espera que um programa escreva seus
erros na saída de erros.

Existe um parâmetro que nos permite modificar a saída padrão para a saída de erros:

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import sys


err = "Arquivo não encontrado"
print(f"Erro aconteceu: {err}", file=sys.stderr)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

======================================== DESEMPACOTAMENTO DE VALORES ========================================


É um recurso muito útil de Python quando queremos separar os valores recebidos em variáveis diferentes.
Quando há uma atribuição múltipla e o valor da direita pode ser percorrido, o Python entende que deve atribuir
cada um dos valores a uma variável da esquerda, seguindo a ordem.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
a, b = "cd"
print(a)  // saída: c
print(b)  // saída: d

head, *tail = (1, 2, 3) // Quando um * está presente no desempacotamento, os valores são desempacotados em formato de lista.
print(head)  // saída: 1
print(tail)  // saída: [2, 3]
~~~~~~~~~~~~~~~~~~~~~~~~~~~

======================================== MANIPULAÇÃO DE ARQUIVOS ========================================

OPEN: 

A função open é a responsável por abrir um arquivo, tornando possível sua manipulação. Seu único parâmetro
obrigatório é o nome do arquivo. Por padrão, arquivos são abertos somente para leitura, mas podemos modificar
isto passando o modo com que vamos abrir o arquivo. No exemplo abaixo, estamos utilizando mode="w", ou seja,
estamos abrindo o arquivo para escrita:

~~~~~~~~~~~~~~~~~~~~~~~~~~~
file = open("arquivo.txt", mode="w")  /* ao abrir um arquivo para escrita, um novo arquivo é criado mesmoque
ele já exista, sobrescrevendo o antigo. */
~~~~~~~~~~~~~~~~~~~~~~~~~~~

FILE: 

Será usado para fazermos leituras e escritas no arquivo, como veremos a seguir. Depois de realizarmos todas
as operações desejadas, é imprescindível que o comando file.close() seja executado pois existe uma quantidade
limite de arquivos que podemos abrir de uma só vez. Caso o limite seja excedido, o Sistema Operacional levantará um OSError.

WITH:

É a palavra reservada para gerenciamento de contexto no Python. Este gerenciamento (with) é utilizado para
encapsular a utilização de um recurso, garantindo que certas ações sejam tomadas independentemente se ocorreu
ou não um erro naquele contexto.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Criamos um contexto, limitando o escopo onde o arquivo está aberto.
// O uso do "as" aqui é somente para atribuir o valor utilizado no contexto à variável file
with open("arquivo.txt", "w") as file:
    // como estamos DENTRO do contexto, verificamos que o arquivo está ABERTO
    //através do atributo booleano 'closed' (file.closed = False)
    print(file.closed)
// como estamos FORA do contexto, o arquivo está FECHADO (file.closed = True)
print(file.closed)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para escrevermos um conteúdo em um arquivo utilizamos a função write:

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// with open("arquivo.txt", "w") as file:
    // file.write("nome idade\n")

    file.write("Maria 45\n")
    file.write("Miguel 33\n")
~~~~~~~~~~~~~~~~~~~~~~~~~~~
(!) Só é possível escrever em um arquivo após abri-lo em um modo que permita escrita. 

Assim como podemos redirecionar a saída do nosso programa para a saída de erros, podemos redirecionar o
conteúdo digitado dentro de print para um arquivo. Ou seja, também podemos escrever em um arquivo através do print.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// with open("arquivo.txt", "w") as file:
//     file.write("Miguel 33\n")


    // Não precisa da quebra de linha, pois esse é um comportamento padrão do print
    print("Túlio 22", file=file)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para escrever múltiplas linhas podemos utilizar a função writelines. Repare que a função espera que cada linha
tenha seu próprio caractere de separação (\n):

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// with open("arquivo.txt", "w") as file:
//   ...

    LINES = ["Alberto 35\n", "Betina 22\n", "João 42\n", "Victor 19\n"]
    file.writelines(LINES)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

A leitura do conteúdo de um arquivo pode ser feita utilizando a função read:

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// escrita
with open("arquivo.txt", "w") as file:
    file.write("Trybe S2")

// leitura
with open("arquivo.txt", "r") as file:
    content = file.read()
    print(content)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Um arquivo é também um iterável, ou seja, pode ser percorrido em um laço de repetição. A cada iteração, uma
nova linha é retornada.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// escrita
with open("arquivo.txt", "w") as file:
    LINES = ["Olá\n", "mundo\n", "belo\n", "do\n", "Python\n"]
    file.writelines(LINES)

// leitura
with open("arquivo.txt", "r") as file:
    for line in file:
        print(line)  // não esqueça que a quebra de linha também é um caractere da linha
~~~~~~~~~~~~~~~~~~~~~~~~~~~

======================================== LIDANDO COM EXCEÇÕES ========================================

1 - ERROS DE SINTAXE:

Erros de sintaxe ocorrem quando o código utiliza recursos inexistentes da linguagem que não consegue
interpretá-los. É como executar print{"Olá, mundo!"} em vez de print("Olá, mundo!").

2 - EXCEÇÕES:

As exceções ocorrem durante a execução e resultam em mensagem de erro. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~
print(10 * (1 / 0))
// Traceback (most recent call last):
//   File "<stdin>", line 1, in <module>
// ZeroDivisionError: division by zero
print(4 + spam * 3)
// Traceback (most recent call last):
//   File "<stdin>", line 1, in <module>
// NameError: name 'spam' is not defined
print('2' + 2)
// Traceback (most recent call last):
//   File "<stdin>", line 1, in <module>
// TypeError: can only concatenate str (not "int") to str
~~~~~~~~~~~~~~~~~~~~~~~~~~~

3 - TRATAMENTO DE EXCEÇÕES:

Para tratar exceções utilizamos o conjunto de instruções try, com as palavras reservadas try e except.
O funcionamento dessa cláusula ocorre da seguinte forma:

--> Se nenhuma exceção ocorrer, a cláusula except é ignorada e a execução da instrução try é finalizada.
--> Se ocorrer uma exceção durante a execução da cláusula try, as instruções remanescentes na cláusula são ignoradas.
    Se o tipo da exceção ocorrida tiver sido previsto em algum except, então essa cláusula será executada.
--> Se não existir nenhum tratador previsto para tal exceção, trata-se de uma exceção não tratada e a execução do
    programa termina com uma mensagem de erro.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
while True:
  try:
    x = int(input("Por favor digite um número inteiro: "))
    break
  except ValueError:
    // 'ValueError' é a exceção que ocorre quando a função int() recebe um
    // valor que não pode ser traduzido para número inteiro
    print("Oops! Esse não era um número inteiro. Tente novamente...")
~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Lidando com exceções enquanto manipulamos arquivos:

~~~~~~~~~~~~~~~~~~~~~~~~~~~
try:
    with open("arquivo.txt", "r") as file:
        print(file.read())
except FileNotFoundError:
    // será executado caso haja a exceção 'FileNotFoundError'
    print("Arquivo inexistente")
else:
    // será executado se tudo ocorrer bem no try
    print("Arquivo manipulado e fechado com sucesso")
finally:
    // será sempre executado, independentemente de erro
    print("Fim da tentativa de ler o arquivo")
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Como estamos abrindo o arquivo em modo de leitura, uma exceção será levantada caso ele não exista,
executando as cláusulas except e finally. Entretanto, se alterarmos o modo para escrita, o arquivo
será criado mesmo se inexistente, executando as cláusulas else e finally.

======================================== MANIPULANDO ARQUIVOS JSON ========================================

JSON é um formato textual muito utilizado para integração de sistemas. Ele é baseado em um subconjunto de
regras JavaScript, embora seja independente de linguagem.

--> Seus principais métodos para manipulação são: load, loads, dump, dumps.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import json  // json é um modulo que vem embutido, porém precisamos importá-lo

with open("pokemons.json") as file:
    content = file.read()  // leitura do arquivo
    pokemons = json.loads(content)["results"]  // o conteúdo é transformado em estrutura python equivalente, dicionário neste caso.
    // acessamos a chave results que é onde contém nossa lista de pokemons

print(pokemons[0])  // imprime o primeiro pokemon da lista
~~~~~~~~~~~~~~~~~~~~~~~~~~~

A leitura pode ser feita diretamente do arquivo, utilizando o método load ao invés de loads. O loads carrega
o JSON a partir de um texto e o load carrega o JSON a partir de um arquivo.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import json


with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

print(pokemons[0])  // imprime o primeiro pokemon da lista
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Import json

// Leitura de todos os pokemons
with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

// Separamos somente os do tipo grama
grass_type_pokemons = [
    pokemon for pokemon in pokemons if "Grass" in pokemon["type"]
]

// Abre o arquivo para escrevermos apenas o pokemons do tipo grama
with open("grass_pokemons.json", "w") as file:
    json_to_write = json.dumps(
        grass_type_pokemons
    )  // conversão de Python para o formato json (str)
    file.write(json_to_write)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Assim como a desserialização, que faz a transformação de texto em formato JSON para Python, a serialização
(caminho inverso) possui um método equivalente para escrever em arquivos de forma direta.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import json

// leitura de todos os pokemons
with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

// separamos somente os do tipo grama
grass_type_pokemons = [
    pokemon for pokemon in pokemons if "Grass" in pokemon["type"]
]

// abre o arquivo para escrita
with open("grass_pokemons.json", "w") as file:
    // escreve no arquivo já transformando em formato json a estrutura
    json.dump(grass_type_pokemons, file)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

======================================== MANIPULANDO ARQUIVOS CSV ========================================

O formato CSV (Comma Separated Values) é muito comum em exportações de planilhas de dados e base de dados.
Foi utilizado por muito tempo antes de sua definição formal, o que gerou uma despadronização deste formato
e o surgimento de vários dialetos.

O módulo csv, contém duas principais funções:

--> Um leitor (reader) que nos ajuda a ler o conteúdo, já fazendo as transformações dos valores para Python;

--> E um escritor (writer) para facilitar a escrita nesse formato.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import csv

with open("graduacao_unb.csv", encoding = "utf-8") as file:
    // Os valores padrão de 'delimiter' e 'quotechar' são os mesmos utilizados 
    // abaixo. Você pode removê-los ou alterá-los conforme necessidade
    graduacao_reader = csv.reader(file, delimiter=",", quotechar='"')

    // Usando o conceito de desempacotamento
    header, *data = graduacao_reader

print(data)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Um leitor de .csv pode ser percorrido utilizando o laço de repetição for e, a cada iteração, retorna uma nova
linha já transformada em uma lista Python com seus respectivos valores.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import csv

with open("graduacao_unb.csv", encoding="utf8") as file:
    graduacao_reader = csv.reader(file, delimiter=",", quotechar='"')
    // Usando o conceito de desempacotamento
    header, *data = graduacao_reader

group_by_department = {}
for row in data:
    department = row[15]
    if department not in group_by_department:
        group_by_department[department] = 0
    group_by_department[department] += 1

// Escreve o relatório em .csv
// Abre um arquivo para escrita
with open("department_report.csv", "w", encoding = "utf-8") as file:
    writer = csv.writer(file)

    // Escreve o cabeçalho
    headers = [
        "Departamento",
        "Total de Cursos",
    ]
    writer.writerow(headers)

    // Escreve as linhas de dados
    // Desempacotamento de valores
    for department, grades in group_by_department.items():
        // Agrupa o dado com o turno
        row = [
            department,
            grades,
        ]
        writer.writerow(row)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Existem ainda o leitor e o escritor baseados em dicionários. A principal vantagem é que não precisamos
manipular os índices para acessar os dados das colunas. A desvantagem é o espaço ocupado em memória
(que é maior que o comum), devido à estrutura de dados utilizada.

~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import csv

// lê os dados
with open("graduacao_unb.csv", encoding = "utf-8") as file:
    graduacao_reader = csv.DictReader(file, delimiter=",", quotechar='"')

    // A linha de cabeçalhos é utilizada como chave do dicionário
    // agrupa cursos por departamento
    group_by_department = {}
    for row in graduacao_reader:
        department = row["unidade_responsavel"]
        if department not in group_by_department:
            group_by_department[department] = 0
        group_by_department[department] += 1
~~~~~~~~~~~~~~~~~~~~~~~~~~~

======================================== TESTES AUTOMATIZADOS ========================================

Utilizaremos a biblioteca pytest, um framework que facilita a escrita de testes simples, mas capazes 
de testar funcionalidades complexas em aplicações e bibliotecas.

--> python3 -m pip install pytest

--> python3 -m pytest --version
/* This is pytest version 5.3.0, imported from /home/cassiobotaro/projects/gerenciador-tarefas/.venv/
lib/python3.8/site-packages/pytest.py */

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// codigo.py

def is_odd(number):
    'Retorna True se um número é ímpar, senão False.'
    return number % 2 != 0
~~~~~~~~~~~~~~~~~~~~~~~~~~~
// test_codigo,py

from codigo Import is_odd


def test_is_odd_when_number_is_odd_returns_true():
    'Para um número ímpar a função deve retornar o valor True'
    assert is_odd(3) is True


def test_is_odd_when_number_is_even_returns_false():
    'Para um número par a função deve retornar o valor False'
    assert is_odd(2) is False
~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> python3 -m pytest

======================================== TESTANDO FALHAS ========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~
// codigo.py

def divide(a_number, other_number):
    "Retorna a divisão de a_number por other_number"
    return a_number / other_number
~~~~~~~~~~~~~~~~~~~~~~~~~~~
// test_codigo,py

Import pytest


from codigo Import is_odd, divide

def test_divide_when_other_number_is_zero_raises_an_exception():
    with pytest.raises(ZeroDivisionError, match="division by zero"):
        divide(2, 0)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Utilizamos a função raises da pytest para verificar se a exceção ocorreu. Caso contrário, ela lança
um AssertionError, indicando que o teste não passou. Podemos verificar também se o texto retornado
na exceção é o esperado através do parâmetro match, que pode receber uma expressão regular.
No exemplo, temos uma divisão por zero, que lança a exceção esperada e o teste passa com sucesso.


(!) pytest.fixtures: são funções que podemos criar e serão executadas antes e/ou depois dos nossos 
testes. Podemos usá-las para inicializar ou limpar um banco de dados, criar valores de mock reutilizáveis,
capturar logs do terminal e muito mais! 

(!) unittest.mock: é uma biblioteca nativa que oferece diversas formas de simular comportamentos que queremos
testar. São úteis quando estamos fazendo testes unitários e não queremos depender do funcionamento de outras
partes da aplicação (como testar um Service sem depender de sua Model).

(!) hypothesis e faker: são 2 exemplos de bibliotecas externas (precisam ser instaladas com o pip) que nos
ajudam a criar diversos valores de teste. A biblioteca hypothesis nos ajuda executando
um teste para diversos valores a partir de uma regra como “números pares“ ou “dicionários com a chave ‘name’
sendo uma string“. Já a faker possui diversos geradores mais complexos (ex: email, telefone,
endereço, CPF, cartão de crédito, etc.), e tudo isso com poucas linhas de código!
