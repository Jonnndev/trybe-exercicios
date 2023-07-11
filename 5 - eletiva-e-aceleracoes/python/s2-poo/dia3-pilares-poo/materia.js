====================================== HERANÇA ======================================

--> É a capacidade de uma classe herdar atributos e métodos de outra classe.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Eletrodoméstico:
    def __init__(
        self,
        cor: str,
        potência: int,
        tensão: int,
        preço: float | int
    ) -> None:
        self.cor = cor
        self.preço = preço
        self.potência = potência
        self.tensão = tensão
        self.velocidade_máxima = 3

        // Inicia os valores de `corrente_atual_no_motor`, `velocidade` e
        // `ligado` chamando o método `desligar` direto no construtor
        self.desligar()

    def ligar(self, velocidade: int) -> None:
        if velocidade > self.velocidade_máxima or velocidade < 0:
            raise ValueError(
                f"Velocidade deve estar entre 0 e {self.velocidade_máxima}"
            )

        self.velocidade = velocidade
        self.ligado = True

        corrente_máxima = self.potência / self.tensão
        velocidade_percentual = velocidade / self.velocidade_máxima
        self.corrente_atual_no_motor = corrente_máxima * velocidade_percentual

    def desligar(self) -> None:
        self.ligado = False
        self.velocidade = 0
        self.corrente_atual_no_motor = 0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Em Python, para declarar que um objeto herda as características de outro, basta
fazer a declaração da classe “passarmos como parâmetro” a classe que será herdada. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador(Eletrodoméstico):
    pass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Em Python, a palavra-chave super é usada para acessar métodos e atributos de uma
classe pai ou uma superclasse a partir de uma classe filha ou subclasse. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from typing 'import Any


'class Pai:
    def faz_algo(self, valor: Any) -> None:
        print(valor)


'class Filha(Pai):
    def faz_outra_coisa(self) -> None:
        print("Método da classe Pai")

        // Chama o método da superclasse `Pai` passando o `self`
        // explicitamente
        super().faz_algo(valor=1)


sub_objeto = Filha()
sub_objeto.faz_outra_coisa()
// Método da classe Pai
// 1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# HERANÇA VS COMPOSIÇÃO:

COMPOSIÇÃO: É quando uma classe é composta por outra classe, ou seja, uma classe possui
uma instância de outra classe criando um relacionamento de pertencimento entre elas. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Pessoa:
    def __init__(self, nome: str, saldo_na_conta: float) -> None:
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
        self.liquidificador: Liquidificador | None = None

    def comprar_liquidificador(self, liquidificador: Liquidificador) -> None:
        if liquidificador.preço <= self.saldo_na_conta:
            self.saldo_na_conta -= liquidificador.preço
            self.liquidificador = liquidificador
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== HERANÇA MÚLTIPLA ======================================

MULTINÍVEL:

Quando uma classe pode herdar de outra que herda de outra, ou seja, A herda de B, B herda de C.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class C: 
    def x(self): 
        print(1)

'class B(C): 
    pass

'class A(B): 
    pass


a = A()
a.x()
// 1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MÚLTIPLA:

É a capacidade que uma classe tem de herdar de mais de uma classe ao mesmo tempo
sem que haja herança multi-nível. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class A(B, C): 
    pass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MIXINS:

Uma forma de amenizar o problema da herança múltipla é o uso de mixins. São classes
que não têm estado, mas apenas métodos, que podem ser utilizados por outras classes.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'Class Animal:
    def __init__(self, name: str) -> None:
        self.name = name


'class MixinVoar:
    def voar(self):
        print("Pássaro voando...")


'class Passaro(Animal, MixinVoar):
    def __init__(self, name: str) -> None:
        super().__init__(name)


passaro = Passaro("Pardal")
passaro.voar() // Pássaro voando...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  |(!) MRO:
  |
  |(!) Ao utilizar herança em Python, o método super busca os métodos em uma ordem específica
  |das superclasses. Chama-se isso de Method Resolution Order (MRO). 

====================================== ABSTRAÇÃO ======================================

-->  Oculta os detalhes da implementação mostrando apenas a funcionalidade para quem acessa
os métodos, a fim de reduzir a complexidade do código.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
liquidificador_vermelho = Liquidificador("Vermelho", 250, 220, 100)
liquidificador_vermelho.ligar(1)
print("Está ligado?", liquidificador_vermelho.esta_ligado())
// Está ligado? True
liquidificador_vermelho.desligar()
print("Está ligado?", liquidificador_vermelho.esta_ligado())
// Está ligado? False
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Não existe a necessidade de conhecer o cálculo interno

====================================== ENCAPSULAMENTO ======================================

--> É a capacidade de ocultar partes independentes da implementação, permitindo construir
partes invisíveis ao mundo exterior.

Em Python, existe uma convenção de nomenclatura para definir a acessibilidade de cada recurso.

1 - Nomes iniciados com _ (underline): são considerados “protegidos“, como os atributos
_potencia e _tensao.
    (!) Isso é apenas uma convenção entre pessoas desenvolvedoras Python, pois ainda será
    possível fazer um
    acesso direto por fora da classe;

2 - Nomes iniciados com __ (dunder/duplo underline): são considerados “privados“, como os
atributos __ligado e __velocidade.
    (!) Não será possível fazer o acesso diretamente por fora da classe, mas existem formas
    de burlar isso.

3 - Quaisquer outros nomes válidos são públicos.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador:
    def __init__(self, cor: str, potencia: str, tensao: str, preco: str) -> None:
        self.preco = preco
        self.cor = cor
        self._potencia = potencia <-- PROTEGIDO
        self._tensao = tensao <-- PROTEGIDO
        self.__ligado = False <-- PRIVADO
        self.__velocidade = 0 <-- PRIVADO
        self.__velocidade_maxima = 3 <-- PRIVADO
        self.__corrente_atual_no_motor = 0 <-- PRIVADO

    def ligar(self, velocidade: int) -> None:
        if velocidade > self.__velocidade_maxima or velocidade < 0:
            raise ValueError(
                f"Velocidade deve estar entre 0 e {self.__velocidade_maxima}"
            )

        self.__velocidade = velocidade 
        self.__corrente_atual_no_motor = (
            (self._potencia / self._tensao) / self.__velocidade_maxima
        ) * velocidade
        self.__ligado = True 

    def desligar(self):
        self.__ligado = False 
        self.__velocidade = 0 

    def esta_ligado(self):
        return self.__ligado
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# GETTERS E SETTERS:

(!) Um método SETTER implementa a lógica de como ALTERAR um valor.
(!) Um método GETTER implementa a lógica de como RECUPERAR um valor.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador:
    def get_cor(self):
        return self.__cor.upper()

    def set_cor(self, nova_cor: str) -> None:
        if nova_cor.lower() == "turquesa":
            raise ValueError("Não existe liquidificador turquesa")

        self.__cor = nova_cor

    def __init__(self, cor: str, potencia: str, tensao: str, preco: str) -> None:
        // Observe que usamos o setter para já validarmos o primeiro valor
        self.set_cor(cor)

        // Demais variáveis omitidas para este exemplo


liquidificador = Liquidificador("Azul", "110", "127", "200")

// print(f"A cor atual é {liquidificador.__cor}")
// AttributeError: 'Liquidificador' object has no attribute '__cor'

print(f"A cor atual é {liquidificador.get_cor()}")
// A cor atual é AZUL
liquidificador.set_cor("Preto")
print(f"Após pintarmos, a nova cor é {liquidificador.get_cor()}")
// Após pintarmos, a nova cor é PRETO
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# ESPECIFICIDADES EM PYTHON:

(!) Métodos com prefixos get_ e set_ costumam, em Python, ser substituídos por uma forma de
acesso mais transparente, para que possam ser utilizados como “atributos públicos”. Para isso,
são utilizados os decoradores (decorators) @property e @propriedade.setter.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador:
    // Getter
    @property
    def cor(self):
        return self.__cor.upper()

    @cor.setter // Repare que é @cor.setter, e não @property.setter
    def cor(self, nova_cor: str) -> str:
        if nova_cor.lower() == "turquesa":
            raise ValueError("Não existe liquidificador turquesa")

        self.__cor = nova_cor

    def __init__(self, cor: str, potencia: str, tensao: str, preco: str) -> None:
        // Observe que usamos o setter para já validarmos o primeiro valor:
        // usamos self.cor, que chama o setter, e não self.__cor que manipula
        // o atributo diretamente
        self.cor = cor

        // Demais variáveis omitidas para este exemplo


liquidificador = Liquidificador("Rosa", "110", "127", "200")

print(liquidificador.cor) // ROSA
liquidificador.cor = "Vermelho"
print(liquidificador.cor) // VERMELHO
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== POLIMORFISMO ======================================

--> É a capacidade de redefinir métodos de uma classe herdada. Ocorre quando diferentes
métodos são chamados pelo mesmo nome.

# SOBRECARGA DE MÉTODOS:

(!) A sobrecarga de métodos é algo que, embora não exista em Python, é comum em outras linguagens,
portanto é interessante entender. Ela acontece quando mais de um método pode ser definido com
o mesmo nome, mas aceitando parâmetros em quantidades ou tipos diferentes.

# PARÂMETROS OPCIONAIS:

--> Não nomeados: 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def produto(num1, num2=1): // (posicional, nomeado)
  return num1 * num2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Nomeados:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def produto(Number=7, other_num=1): //(nomeado, nomeado)
  return Number * other_num
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Posicional:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def produtorio(nums, /, inicio=1): // Os parâmetros antes de / DEVEM ser posicionais
  total = inicio or 1
  for item in lista:
    total *= item
  return total 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def func(a, b, *, option): // Os parâmetros após * DEVEM ser nomeados
  pass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# DESPACHO:

Python até suporta sobrecarga de funções e métodos, mas não de maneira transparente e simplificada,
e sim por meio dos decoradores singledispatch e singledispatchmethod, respectivamente.

Ambos estão presentes no módulo functools.

(!) A sobrecarga pode ser feita decorando uma função ou um método com o decorador equivalente e, em
seguida, registrando funções/métodos adicionais com o decorator @nome_da_função.register.
Essas funções/métodos adicionais não devem ter um nome, sendo declaradas com um _. Para isso, o
register deve receber o tipo do parâmetro ou esse tipo deve ser declarado como dica de tipo (type hint)
nas funções decoradas.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import functools


@functools.singledispatch  // decorando a função para criar um dispatcher
def func(parâmetro):
    print(parâmetro)


@func.register(int)  // passando um tipo para o registrador do dispatcher
def _(parâmetro):  // observe que o nome da função é irrelevante
    print(parâmetro * 2)


@func.register  // NÃO passando o tipo para o registrador
def _(parâmetro: float):  // mas passando o tipo como type hint
    print(parâmetro * 5)


func(4)  // saída: 8
func(4.0)  // saída: 20.0
func("4")  // saída: 4
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Chamar func com qualquer parâmetro que não seja do tipo int ou float vai chamar a função original.

# SOBRESCRITA DE MÉTODOS:

(!) A sobrescrita ocorre quando um método definido em uma superclasse é novamente definido
(reescrito/sobrescrito) na subclasse.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1class Liquidificador(Eletrodoméstico):
    def esta_ligado(self):
        return False
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# SUPER:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador(Eletrodoméstico):
    def esta_ligado(self):
        return "Sim" if super().esta_ligado() else "Não"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Observe que há uma chamada ao mesmo método na superclasse, de forma a não precisar recriar a
lógica dele na subclasse. Nesse caso aqui é algo simples, pois é só o retorno de um booleano, mas
Eletrodomestico.esta_ligado poderia ser um método complexo e custoso, fazendo com que reaproveitá-lo
seja a melhor escolha.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Liquidificador(Eletrodoméstico):
    pass

'class Ventilador(Eletrodoméstico):
    def __init__(self,
        cor: str,
        potencia: str,
        tensao: str,
        preco: str,
        quantidade_de_portas=1
    ) -> None:
        // Chamada ao construtor da superclasse
        super().__init__(cor, potencia, tensao, preco)

        // Faz outras coisas específicas dessa subclasse
        self.quantidade_de_portas = quantidade_de_portas


'class Pessoa:
    def __init__(self, nome, saldo_na_conta):
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
        self.eletrodomesticos = []

    // Permite a aquisição de qualquer eletrodoméstico
    def comprar_eletrodomestico(self, eletrodomestico):
        if eletrodomestico.preco <= self.saldo_na_conta:
            self.saldo_na_conta -= eletrodomestico.preco
            self.eletrodomestico.append(eletrodomestico)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Ao sobrescrever o construtor, devemos chamar o construtor da superclasse também, de forma
a garantir que ele seja executado e o que ele faça, seja aproveitado. Caso não façamos isso,
como em qualquer método normal, teremos de reimplementar a lógica do construtor da superclasse
manualmente na subclasse.