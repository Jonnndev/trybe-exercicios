================================= PARADIGMAS DE PROGRAMAÇÃO =================================

--> Uma boa organização baseada em entidades possui uma ideia fundamental: separar seu código em
entidades bem descritas, com nome e responsabilidades definidas. As formas de organização de
aplicações que você vem aprendendo até aqui usam essa ideia como inspiração ou base fundamental.


--> Mais do que uma maneira de organizar aplicações ou uma arquitetura, a Programação Orientada a
Objetos (POO) é compreendida no mundo da tecnologia como um paradigma de programação. Um paradigma
de programação é uma forma específica de se pensar e de se abordar a solução de problemas. (!)

================================= CLASSES E OBJETOS =================================

# CLASSES

--> Uma classe é uma forma de organizar o código que representa uma entidade do mundo real. É uma
estrutura que abstrai um conjunto de objetos com características similares. (!)

EX: Conceito Liquidificador. Existem vários liquidificadores no mundo, de várias marcas e modelos,
com várias funcionalidades diferentes, mas todos possuem algumas coisas em comum.

# OBJETOS

--> Um objeto é uma instância de uma classe. É uma entidade que possui um conjunto de características.
Essas características são representadas por atributos e comportamentos, que são representados por
métodos. (!)

# ATRIBUTOS/PROPRIEDADES

--> Atributos são características de um objeto. Eles são representados por variáveis declaradas na
classe. (!)

-->  Uma classe define atributos, e um objeto os valora. 

# MÉTODOS/COMPORTAMENTOS

--> Métodos são comportamentos de um objeto. Eles são representados por funções declaradas na classe.

--> Uma classe define métodos, e um objeto os executa.

EX:  Classe Carro { acelerar frear }
     Classe Pessoa { comer respirar sentir }


================================= MÉTODO CONSTRUTOR/INICIALIZADOR =================================

# MÉTODO CONSTRUTOR

--> O método construtor é um método especial de uma classe que é executado no momento da criação
de um objeto. Ele é muito utilizado para configurar o objeto que está sendo criado. (!)

(!)  Em python, esta operação é dividida em dois métodos:

__new__ (Construtor)
__init__ (Inicializador)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Exemplo:
    def __init__(self):
        print("Inicializando Exemplo")
        self.__privado = "Eu sou privado"

    def __new__(cls, *args, **kwargs):
        print("Criando uma nova instância de Exemplo")
        instance = super().__new__(cls)
        return instance

    def __metodo_privado(self):
        print("Este é um método privado")

    def metodo_publico(self):
        print("Este é um método público")
        self.__metodo_privado()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Dentro do construtor '__init__', há um atributo que começa com dois sublinhados __privado.
Isso também é um exemplo de encapsulamento de dados. Para acessar o método privado de dentro da classe,
podemos simplesmente chamar o método normalmente. Por exemplo, o método público 'metodo_publico' chama o
método privado '__metodo_privado' usando o self.__metodo_privado().

(!) O método '__new__' é responsável por criar e retornar uma nova instância da classe. Ele é uma parte
importante da metaprogramação em Python, pois permite que os desenvolvedores personalizem a criação de
objetos e controlem como As instâncias são criadas. Ele também aceita quaisquer argumentos que seriam
passados para o método '__init__', que são capturados pelos parâmetros '*args' e '**kwargs'.

(!) Os métodos privados são úteis para manter a integridade do objeto, tornando certos métodos e atributos
acessíveis somente dentro da classe, ocultando a implementação interna e evitando que outras partes do código
interfiram no funcionamento da classe.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Liquidificador:
    def __init__(self, cor, potencia, tensao, preco):
        self.preco = preco
        self.cor = cor
        self._potencia = potencia
        self._tensao = tensao
        self.__ligado = False --> hard coded
        self.__velocidade = 0 --> hard coded
        self.__velocidade_maxima = 3
        self.__corrente_atual_no_motor = 0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
meu_liquidificador = Liquidificador("Azul", 200, 127, 200)
seu_liquidificador = Liquidificador(
    cor="Vermelho", potencia=250, tensao=220, preco=100
)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================= ENCAPSULAMENTO E ABSTRAÇÃO =================================

# ENCAPSULAMENTO

--> Encapsulamento é o mecanismo que permite que detalhes internos do funcionamento dos métodos de uma
classe permaneçam ocultos para os objetos. (!)

--> Em Python, o encapsulamento é feito por convenção, utilizando um sublinhado no início do nome do
atributo ou método. (!)

--> Atributos PROTEGIDOS são acessados somente dentro da própria classe e dentro de classes herdadas.
    Underline: são considerados “protegidos“, como os atributos '_potencia' e '_tensao'. 

--> Atributos e métodos PRIVADOS são acessados somente dentro da própria classe. (!)
    Duplo underline: São considerados “privados“, como os atributos '__ligado' e '__velocidade'

--> Atributos e métodos PÚBLICOS são acessados por qualquer objeto que instancie a classe. (!)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Liquidificador:
    def __init__(self, cor, potencia, tensao, preco):
        self.preco = preco
        self.cor = cor
        self._potencia = potencia
        self._tensao = tensao
        self.__ligado = False
        self.__velocidade = 0
        self.__velocidade_maxima = 3
        self.__corrente_atual_no_motor = 0

    def ligar(self, velocidade):
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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# ABSTRAÇÃO

--> Abstração é o mecanismo que permite que os objetos possuam características e comportamentos que
os tornam semelhantes a objetos do mundo real. (!)

--> É outro pilar da orientação a objetos, e oculta os detalhes da implementação mostrando apenas a funcionalidade para quem acessa os métodos, a fim de reduzir a complexidade do código.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
liquidificador_vermelho = Liquidificador("Vermelho", 250, 220, 100)
liquidificador_vermelho.ligar(1)
print("Está ligado?", liquidificador_vermelho.esta_ligado())
// Está ligado? True
liquidificador_vermelho.desligar()
print("Está ligado?", liquidificador_vermelho.esta_ligado())
// Está ligado? False
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================= GETTERS E SETTERS =================================

# GETTERS E SETTERS

--> Getters e setters são métodos utilizados para acessar e modificar atributos privados
de uma classe.

--> Em Python, os getters e setters são implementados utilizando decorators. (!)

--> Decorators são funções que envolvem outras funções e permitem executar código antes e
depois da função envolvida ser executada.

--> O decorator '@property' é utilizado para criar um getter, e o '@atributo.setter' é
utilizado para criar um setter.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Liquidificador:
    # Getter
    @property
    def cor(self):
        return self.__cor.upper()

    @cor.setter # Repare que é @cor.setter, e não @property.setter
    def cor(self, nova_cor):
        if nova_cor.lower() == "turquesa":
            raise ValueError("Não existe liquidificador turquesa")

        self.__cor = nova_cor

    def __init__(self, cor, potencia, tensao, preco):
        # Observe que usamos o setter para já validarmos o primeiro valor:
        # usamos self.cor, que chama o setter, e não self.__cor que manipula
        # o atributo diretamente
        self.cor = cor

        # Demais variáveis omitidas para este exemplo


liquidificador = Liquidificador("Rosa", "110", "127", "200")

print(liquidificador.cor) # ROSA
liquidificador.cor = "Vermelho"
print(liquidificador.cor) # VERMELHO
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================= COMPOSIÇÃO =================================

# COMPOSIÇÃO

--> Composição é um tipo de associação que permite que uma classe seja composta por
outras classes. É atribuir o objeto de uma classe a um atributo da outra, gerando assim
um relacionamento de pertencimento entre elas. (!)

--> É uma relação do tipo “tem-um” ou “tem-muitos”, e é utilizada quando uma classe
precisa de outra para executar sua ação.

--> A composição é uma alternativa à herança, e é utilizada quando não faz sentido
herdar uma classe de outra.

--> A composição é implementada criando atributos privados que instanciam outras classes.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Pessoa:
    def __init__(self, nome, saldo_na_conta):
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
        self.liquidificador = None

    def comprar_liquidificador(self, liquidificador):
        if liquidificador.preco <= self.saldo_na_conta:
            self.saldo_na_conta -= liquidificador.preco
            self.liquidificador = liquidificador
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Agora, a classe Pessoa tem o método específico para comprar seu liquidificador:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

pessoa_cozinheira = Pessoa("Jacquin", 1000)
pessoa_cozinheira.comprar_liquidificador(liquidificador_vermelho)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Conforme observado no vídeo, ao imprimir a instância de um objeto, o Python exibe a posição de memória do objeto.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
print(pessoa_cozinheira)
// retorno: Pessoa object at 0x7f53bbe1b580>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Necessàrio implementar o método '__str__' para a classe que deseja imprimir.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Pessoa:
// ....
    def __str__(self):
        return f"{self.nome} - possui {self.saldo_na_conta} reais em sua conta."

print(pessoa_cozinheira)
// retorno: Jacquin - possui 800 reais em sua conta.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================= HERANÇA =================================

# HERANÇA

--> Herança é um tipo de associação que permite que uma classe herde atributos e métodos
de outra classe. (!)

--> É uma relação do tipo “é-um”, e é utilizada quando uma classe é um tipo especial de
outra classe.

--> A herança é implementada passando a classe mãe entre parênteses na declaração da classe
filha.

--> A herança é um dos pilares da orientação a objetos, e permite que classes filhas
herdem atributos e métodos de classes mães.

--> A herança é utilizada para reaproveitar código, e para criar classes mais genéricas
que podem ser especializadas em outras classes filhas.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Eletrodomestico:
    def __init__(self, cor, potencia, tensao, preco):
        self.preco = preco
        self.cor = cor
        self._potencia = potencia
        self._tensao = tensao
        self.__ligado = False
        self.__velocidade = 0
        self.__velocidade_maxima = 3
        self.__corrente_atual_no_motor = 0

    def ligar(self, velocidade):
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

    @property
    def cor(self):
        return self.__cor.upper()

    @cor.setter
    def cor(self, nova_cor):
        self.__cor = nova_cor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Class A:
    def faz_algo(self, valor):
        print(valor)


Class B(A):
    def faz_outra_coisa(self):
        print("Vou printar o valor pelo método criado em A")
        // Chama o método da classe A, que neste caso é a superclasse, passando
        // o `self` explicitamente
        super().faz_algo(valor=1) --> substituindo o 'A.faz_algo' por 'super()' e passando o 'self' explicitamente


b = B()
b.faz_outra_coisa()
// Vou printar o valor pelo método criado em A
// 1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# HERANÇA MÚLTIPLA

--> Herança múltipla é um tipo de associação que permite que uma classe herde atributos
e métodos de mais de uma classe. (!)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class A(B, C): 
    pass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================= POLIMORFISMO =================================

# POLIMORFISMO

--> Polimorfismo é um dos pilares da orientação a objetos, e permite que classes filhas
possam ter métodos com o mesmo nome de classes mães, mas com comportamentos diferentes.

--> O polimorfismo é utilizado para criar classes mais genéricas que podem ser especializadas

## SOBRECARGA DE MÉTODO

--> Sobrecarga de método é um tipo de polimorfismo que permite que uma classe filha
tenha um método com o mesmo nome de uma classe mãe, mas com PARÂMETROS diferentes.

--> É algo que nativamente não existe em Python, mas é comum em outras linguagens. Ela acontece
quando mais de um método pode ser definido com o mesmo nome, mas aceitando parâmetros em quantidades
ou tipos diferentes. Por exemplo, na linguagem C++ podemos ter duas funções com o mesmo nome, func,
onde uma recebe um número inteiro e outra recebe um caractere.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Código em C++
#include "stdio.h"

int func(int a) { return a + 1; }
int func(char b) { return 4; }

int main() { printf("%d %d", func(1), func('a')); }
// saída: 2 4
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## PARAMETROS OPCIONAIS

--> Parâmetros opcionais são parâmetros que possuem um valor padrão, e que podem ser
omitidos na chamada do método.

--> Parâmetros opcionais são utilizados para permitir que um método seja chamado sem
passar todos os parâmetros.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Pessoa:
    def __init__(self, nome, idade=None, saldo_na_conta=None):
        self.idade = idade
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
        self.brinquedos = []

pessoa_1 = Pessoa("Marcelo", 22, 700)
pessoa_2 = Pessoa("Matheus")
pessoa_3 = Pessoa("Maria", 33)
pessoa_4 = Pessoa("Márcia", saldo_na_conta=100)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## SOBRESCRITA DE MÉTODO

--> Sobrescrita de método é um tipo de polimorfismo que permite que uma classe filha
tenha um método com o mesmo nome de uma classe mãe, mas com COMPORTAMENTOS diferente.

--> Para realizar a sobrescrita, basta declarar novamente o método na subclasse.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Liquidificador(Eletrodomestico):
    def esta_ligado(self):
        return False
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## SUPER

--> A função super() é utilizada para acessar o método da classe mãe na classe filha.

--> Por meio dessa referência, você pode acessar métodos da superclasse por meio da
subclasse. Para isso utilizamos a notação super().método().

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Liquidificador(Eletrodomestico):
    def esta_ligado(self):
        return "Sim" if super().esta_ligado() else "Não" <<<<<<<<<<<<<<<<<<<<<<
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Class Liquidificador(Eletrodomestico):
    pass

Class Ventilador(Eletrodomestico):
    def __init__(self, cor, potencia, tensao, preco, quantidade_de_portas=1):
        // Chamada ao construtor da superclasse
        super().__init__(cor, potencia, tensao, preco)
        
        // Faz outras coisas específicas dessa subclasse
        self.quantidade_de_portas = quantidade_de_portas


Class Pessoa:
    def __init__(self, nome, saldo_na_conta):
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
        self.eletrodomesticos = []

    // Permite a aquisição de qualquer eletrodoméstico
    def comprar_eletrodomestico(self, eletrodomestico):
        if eletrodomestico.preco <= self.saldo_na_conta:
            self.saldo_na_conta -= eletrodomestico.preco
            self.eletrodomestico.append(eletrodomestico)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## CLASSE ABSTRATA

--> Uma classe abstrata é uma classe que não pode ser instanciada, e que possui
pelo menos um método abstrato.

--> Um método abstrato é um método que não possui implementação na classe abstrata,
mas que deve ser implementado em suas subclasses.

--> Geralmente classes mais genéricas são abstratas, e classes mais específicas herdam delas.

--> Nas classes abstratas podemos ter alguns métodos abstratos, que são métodos que não
possuem uma implementação, e servem para obrigar a classe normal que herda da classe abstrata
a implementá-los.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from abc Import ABC, abstractmethod


Class Database(ABC):
    @abstractmethod <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    def execute(self, query):
        ...


Class MongoDatabase(Database):
    def execute(self, query):
        print(f"executando query '{query}' no mongo")


Class MySQLDatabase(Database):
    def execute(self, query):
        print(f"executando query '{query}' no mysql")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## INTERFACE

--> Uma Interface é uma classe abstrata que possui apenas métodos abstratos.

--> Uma classe abstrata pode ter métodos concretos, mas uma Interface não pode.

--> Uma classe abstrata pode ter atributos, mas uma Interface não pode.

--> Uma classe abstrata pode herdar de outra classe abstrata ou interface, mas uma
Interface não pode herdar de uma classe abstrata.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def minha_func(database): # repare que o d é minúsculo
    if isinstance(database, Database):
        database.execute("query qualquer")
    else:
        print(f"{database} não é um Database válido")

db1 = MongoDatabase()
db2 = MySQLDatabase()

minha_func(db1)
minha_func(db2)
minha_func("db_inválido")

// executando query 'query qualquer' no mongo
// executando query 'query qualquer' no mysql
// db_inválido não é um Database válido
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================= MÉTODOS ESTÁTICOS DE CLASSE =================================

# MÉTODOS ESTÁTICOS

--> Métodos estáticos são métodos que podem ser chamados sem instanciar a classe.

--> Métodos estáticos não podem acessar atributos de instância da classe.

--> Métodos estáticos não podem acessar métodos de instância da classe.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Classe:
    @staticmethod <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    def método_estático():
        print("Olá")


objeto = Classe()
Classe.método_estático()
objeto.método_estático()
// Saída:
// Olá
// Olá
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# ATRIBUTO DE CLASSE

--> Atributos de classe são atributos que pertencem à classe, e não a instância.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Classe:
    atributo_da_classe = 1


objeto_1 = Classe()
objeto_2 = Classe()

print(Classe.atributo_da_classe)  // Saída: 1
print(objeto_1.atributo_da_classe)  // Saída: 1
print(objeto_2.atributo_da_classe)  // Saída: 1

Classe.atributo_da_classe = 2
print(Classe.atributo_da_classe)  // Saída: 2
print(objeto_1.atributo_da_classe)  // Saída: 2
print(objeto_2.atributo_da_classe)  // Saída: 2

objeto_1.atributo_da_classe = 3
print(Classe.atributo_da_classe)  // Saída: 2
print(objeto_1.atributo_da_classe)  // Saída: 3
print(objeto_2.atributo_da_classe)  // Saída: 2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# MÉTODO DE CLASSE

--> Métodos de classe são métodos que pertencem à classe, e não a instância.

--> Métodos de classe são decorados com @classmethod.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Class Classe:
    _atributo_da_classe = 1

    @classmethod
    def seta_atributo_da_classe(cls, valor):
        cls._atributo_da_classe = valor

    @classmethod
    def retorna_atributo_da_classe(cls):
        return cls._atributo_da_classe


objeto_1 = Classe()
objeto_2 = Classe()

print(Classe.retorna_atributo_da_classe())  // Saída: 1
print(objeto_1.retorna_atributo_da_classe())  // Saída: 1
print(objeto_2.retorna_atributo_da_classe())  // Saída: 1

Classe.seta_atributo_da_classe(2)
print(Classe.retorna_atributo_da_classe())  // Saída: 2
print(objeto_1.retorna_atributo_da_classe())  // Saída: 2
print(objeto_2.retorna_atributo_da_classe())  // Saída: 2

objeto_1.seta_atributo_da_classe(3)
print(Classe.retorna_atributo_da_classe())  // Saída: 3
print(objeto_1.retorna_atributo_da_classe())  // Saída: 3
print(objeto_2.retorna_atributo_da_classe())  // Saída: 3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# CHAMANDO MÉTODOS

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Class Classe:
    atributo_da_classe = 1

    def __init__(self):
        self.atributo_do_objeto = 2

    def método_normal(self):
        print(self)

    @classmethod
    def método_de_classe(cls):
        print(cls)

    @staticmethod
    def método_estático():
        print("Olá")


objeto = Classe()

// Acessando atributo do objeto
print(objeto.atributo_do_objeto)
// Não dá pra chamar usando a classe (Classe.atributo_do_objeto dá erro)
// Saída:
// 2

// Acessando atributo da classe
print(Classe.atributo_da_classe)
print(objeto.atributo_da_classe) 
// Saída:
// 1
// 1

// Chamando o método normal
Classe.método_normal(objeto)  // Ou Classe.método_normal(self=objeto)
objeto.método_normal() // Açúcar sintático para a forma da linha acima
// Saída:
// <__main__.Classe object at 0x7f2304ab3d30>
// <__main__.Classe object at 0x7f2304ab3d30>

// Chamando o método estático
Classe.método_estático()
objeto.método_estático()
// Saída:
// Olá
// Olá

// Chamando o método de classe
Classe.método_de_classe()  // Observe que não precisa passar nenhum parâmetro
objeto.método_de_classe() 
// Saída:
// <class '__main__.Classe'>
// <class '__main__.Classe'>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~