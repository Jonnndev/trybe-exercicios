========================================= TIPAGEM COM PYTHON =========================================

Quando falamos de tipagem, estamos querendo saber como identificamos o tipo de uma variável. 

# TIPAGEM ESTÁTICA:
    - A tipagem estática é quando o tipo da variável é definido em tempo de compilação, ou seja, antes
    do programa ser executado (TypeScript).

# TIPAGEM DINÂMICA:
    - A tipagem dinâmica é quando o tipo da variável é definido em tempo de execução, ou seja, durante
    a execução do programa (JavaScript).

# TIPAGEM NOMINAL:
    - A tipagem nominal é quando o tipo da variável é definido pelo nome da variável.

# TIPAGEM ESTRUTURAL:
    - A tipagem estrutural é quando o tipo da variável é definido de acordo com os métodos aos quais o
    tipo dá suporte. 

# TYPE ANNOTATIONS / TYPE HINTS:
    - São utilizadas para checagem estática e, como o nome sugere, são apenas dicas.

      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      def my_func(parameter: str) -> int:
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# TIPOS COMPLEXOS:

    - ANY: é o tipo que usamos quando queremos deixar explícita a falta de tipagem: o valor pode ser de
    qualquer tipo.

    - UNION: é utilizado quando algo pode ter um dentre dois tipos.
      1 - def my_func(parameter: Union[int, str])
      2 - def my_func(parameter: int | str) <<<<<< PIPE OPERATOR

    - OPTIONAL: é utilizado quando algo pode ser de um tipo ou None. def my_func(parameter: Optional[int])

    - CALLABLE: é o tipo que usamos quando queremos indicar que o valor é uma função:
      def my_func(parameter: Callable[[int, str], int])

# MYPY:

O mypy é uma ferramenta que permite realizar a verificação de conformidade de tipagem antes do código
ser executado.

--> install: pip install mypy

--> run: mypy app.py
    Retorna uma janela com erro, caso exista, na tipagem EXPLÍCITA do código.

--> run: mypy app.py --strict
    Retonra uma janela com erro, caso exista, na tipagem EXPLÍCITA e IMPLÍCITA do código.

========================================= CLASSES E OBJETOS =========================================

# CLASSE:  Toda classe tem como finalidade modelar com precisão a representação de uma entidade, dizendo
quais características essa entidade tem e quais ações pode realizar. Utilizamos a palavra reservada 'class'

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador:
    pass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# OBJETOS:  ou instância da classe, é algo específico.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
liquidificadorDeCasa = Liquidificador()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= ATRIBUTOS E MÉTODOS =========================================

# ATRIBUTOS:  são propriedades das coisas. São as características que definem o objeto.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Pessoa:
    pass

maria = Pessoa()

# Atribuo o valor "Maria" a um atributo chamado `nome` dentro do objeto `maria`
maria.nome = "Maria"
print(maria.nome) # saída: Maria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# MÉTODOS E COMPORTAMENTOS: são as ações que o objeto pode realizar.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Pessoa:
    def diz_nome_e_idade(self, idade: int) -> None:
        print(f"{self.nome} tem {idade} anos.")

maria = Pessoa()
maria.nome = "Maria"
maria.diz_nome_e_idade(20) # saída: Maria tem 20 anos.

jorge = Pessoa()
jorge.nome = "Jorge"
jorge.diz_nome_e_idade(28) # saída: Jorge tem 28 anos.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Os métodos de uma classe não precisam ser declarados dentro dela.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def método(self, idade: int) -> None:
    print(f"{self.nome} tem {idade} anos.")

'class Pessoa:
    diz_nome_e_idade = método

maria = Pessoa()
maria.nome = "Maria"
maria.diz_nome_e_idade(20) # saída: Maria tem 20 anos.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= CONSTRUCTOR =========================================

é um método especial que roda automaticamente quando a gente cria (instancia) o objeto.

1 - __new__ (Construtor)
2 - __init__ (Inicializador)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador:
    def __init__( 
        self,
        cor: str,
        potência: int,
        tensão: int,
        preço: float | int
    ) -> None:
        // Adiciona o valor do parâmetro `cor` a um atributo de mesmo nome (homônimo)
        // do objeto que está sendo criado (`self.cor`).
        self.cor = cor
        self.preço = preço
        self.potência = potência
        self.tensão = tensão

        // Valores _hard coded_
        self.ligado = False
        self.velocidade = 0
        self.velocidade_máxima = 3
        self.corrente_atual_no_motor = 0

// Agora, podemos criar nossos primeiros liquidificadores.
// Os argumentos nos parênteses são passados para o `__init__`
meu_liquidificador = Liquidificador("Azul", 200, 127, 200)
seu_liquidificador = Liquidificador(
    cor="Vermelho", potência=250, tensão=220, preço=100
)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= CLASSES COMO TIPO =========================================

Uma classe pode ser utilizada como tipo quando uma instância dela é esperada como valor de alguma variável.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador:
    def __init__(self, cor: str) -> None:
        self.cor = cor


'class Geladeira:
    def __init__(self, cor: str) -> None:
        self.cor = cor


'class Fogão:
    def __init__(self, quantidade_de_bocas: int) -> None:
        self.quantidade_de_bocas = quantidade_de_bocas


liq = Liquidificador("preto")
gel = Geladeira("branca")
fog = Fogão(4)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> COM TIPAGEM ESTRUTURAL DINÂMICA:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def print_cor(liquidificador): # Não colocamos type hints
    print(liquidificador.cor) # simplesmente tentamos acessar o atributo

print_cor(liq) # roda normalmente e tem saída "preto"
print_cor(gel) # roda normalmente e tem saída "branca"
print_cor(fog) # levanta um AttributeError
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> COM TIPAGEM ESTRUTURAL ESTÁTICA:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def print_cor(liquidificador: Liquidificador) -> None:  # Colocamos type hints
    print(liquidificador.cor)

print_cor(liq)
print_cor(gel)
print_cor(fog)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.py:26: error: Argument 1 to "print_cor" has incompatible type "Geladeira"; expected "Liquidificador"  [arg-type]
app.py:27: error: Argument 1 to "print_cor" has incompatible type "Fogão"; expected "Liquidificador"  [arg-type]
Found 2 errors in 1 file (checked 1 source file)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================= RESUMO =========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1 - Anotação de tipo | Dica de tipo | Type annotation | Type hint:
    --> Forma explícita de tipar valores em Python. Usando uma ferramenta externa conseguimos
    usá-los para ter tipagem estática em Python

2 - Atributo:
    --> Características que definem uma classe. A classe os define e os objetos dão seus valores.

3 - Checagem de tipos:
    Estática:
        --> Define o tipo explicitamente, permitindo sua checagem em tempo de execução
    Dinâmica: 
        --> ‘Descobre-se’ o tipo durante a execução do código somente, sem necessidade de se
        definir nada explicitamente
    Estrutural:
        --> Infere-se o tipo de um valor baseado nos comportamentos que ele tem
    Nominal:
        --> infere-se o tipo de um valor com base no nome do mesmo, ainda que outros tipos
        tenham comportamentos 100% idênticos

4 - Classe:
    --> Entidade, que pode se basear em algo real ou num conceito abstrato, que possui atributos
    e comportamentos no seu código

5 - Instância:
    --> Se a classe é o molde, a instância é a coisa que o molde faz. Uma classe pode gerar N
    instâncias, cada uma com seus valores em atributos.

6 - Método:
    --> Comportamento de uma classe - funções dela, que podem acessar seus atributos

7 - mypy:
    --> Ferramenta que permite tipagem estática em Python

8 - Objeto:
    --> Instância de uma classe. Se Carro é a classe,meuCarroEsporte é o objeto.

9 - Self:
    --> Entidade que permite, no Python, uma classe acessar os valores dos atributos de quem a
    invocou, como o this do JavaScript.

10 - Método construtor: 
    --> Invocado sempre que se cria uma instância, ele coloca valores em atributos.

11 - Classes como tipos:
    --> Se a instância de uma classe é esperada como valor, ela pode ser usada para fazer tipagem estática.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~