========================================= CLASSES ABSTRATAS =========================================

São aquelas que contêm um ou mais métodos abstratos (métodos declarados, porém sem implementação,
ou seja, somente a assinatura desses métodos sem corpo).

Uma classe abstrata em Python pode ser considerada um projeto, um contrato ou um molde para outras
classes. Ela não pode ser instanciada, ou seja, não podemos criar objetos a partir dela.

Elas precisam de subclasses que gerem implementação para os métodos, ou seja, as subclasses que
herdam a classe abstrata devem sobrescrever obrigatoriamente seus métodos.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import abc


'class InterfaceFormal(abc.ABC):
    @abc.abstractmethod
    def exemplo(self):
        pass


teste = InterfaceFormal()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
>>> TypeError: Can´t instantiate abstract 'class InterfaceFormal with abstract methods exemplo
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# ABCs - Abstract Base Classes:

Por padrão, o Python não fornece classes abstratas. Ele vem com um módulo que fornece a base para
definir as classes-base abstratas.

Um método torna-se abstrato quando decorado com a palavra-chave '@abstractmethod'.


/*
EXEMPLO: Suponha, por exemplo, que você esteja criando uma API para gerenciamento de propagandas
em sites. Nela, você precisa exibir as propagandas em um site ou aplicativo móvel em ordem aleatória,
mas sem repetir as propagandas antes que o conjunto completo tenha sido mostrado. Um dos requisitos
da sua API é aceitar classes definidas pelo usuário que façam seleção aleatória, sem repetição. Para
deixar claro para quem vai utilizar sua API, o que se espera de um componente que faça “seleção
aleatória, sem repetição”, você pode definir uma ABC.
*/

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from abc 'import ABC, abstractmethod


'class Pessoa(ABC):
    @abstractmethod
    def nome(self):
        pass


'class Vendedor(Pessoa):
    def __init__(self, seu_nome):
        self.seu_nome = seu_nome

    def nome(self):
        print(f"Seu nome é: {self.seu_nome}")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from abc 'import ABC, abstractmethod


'class X(ABC):
    @abstractmethod
    def exemplo(self):
        print("Classe-base abstrata")


'class Y(X):
    def exemplo(self):
        super().exemplo()
        print("Subclasse")


z = Y()
z.exemplo()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# PROPRIEDADES ABSTRATAS:

Classes abstratas incluem atributos além de métodos.
Os atributos em classes concretas podem ser definidos com o decorador '@property.

========================================= INTERFACES =========================================

Luciano Ramalho, em seu livro Python Fluente, define as interfaces como o subconjunto dos métodos
públicos de um objeto. Trata-se de uma espécie de contrato para forçar a implementação de determinados
métodos e determinadas propriedades. Em um alto nível, uma 'interface atua como um modelo para projetar classes.

Assim como as classes, as interfaces definem métodos. No entanto, ao contrário das classes,
esses métodos são abstratos. Um método abstrato é aquele que a 'interface simplesmente define, ou seja,
não implementa o corpo desses métodos. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class Funcionario:

    def calcular_salario(self):
      raise NotImplementedError("Classes derivadas de Funcionario precisam implementar o cálculo de salário.")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Mesmo sem uma palavra reservada 'interface na linguagem Python e independente das ABCs, toda classe
tem uma interface: os atributos públicos definidos (métodos ou atributos de dados), implementados ou
herdados pela classe. Isso inclui métodos especiais, como __getitem__ ou __add__. 

# INTERFACES FORMAIS vs INTERFACES INFORMAIS:

--> As classes abstratas são exemplos de 'interfaces formais'. Ela funcionará como uma espécie de contrato,
obrigando suas subclasses a implementar seus métodos.

--> Já a 'interface informal' será muito parecida com uma classe Python comum. No caso, ela poderá
definir métodos que posteriormente serão sobrescritos, mas não há obrigatoriedade para tal.

========================================= PROTOCOLOS E TIPAGEM ESTRUTURAL ESTÁTICA =========================================

Protocolos são classes que herdam de 'typing.Protocol'. Eles servem para possibilitar a tipagem estática na verificação estrutural.

--> Vantagens:

1 - Fazem verificação estrutural, e não nominal. Isto é, não forçam que as classes usem herança, basta ter os métodos esperados.
    1.1 - Isso significa que existe um baixo acoplamento.

2 - Rodam em tempo de verificação estática, pegando erros antes de o código ser executado.

3 - Caso utilize uma 'interface baseada em classe abstrata (ou seja, uma classe abstrata sem métodos concretos), a diferença será bem pequena, evitando muita mudança de código.

--> Desvantagens:

1 - Comparando com a tipagem nominal, o uso de protocolos exige a criação de pelo menos duas classes: o protocolo e a classe
que o respeita. Por vezes, a tipagem nominal pode ser mais simples por utilizar somente uma classe.

2 - Comparando com o duck typing puro, há a necessidade de criar uma classe, colocar nos parâmetros que a esperam etc. Caso o
seu código já funcione sem tipagem, pode ser um trabalho desnecessário.

3 - Não têm nenhuma utilidade em tempo de execução e podem indicar que são inválidos, durante a verificação estática, alguns
códigos que rodam perfeitamente bem em tempo de execução.

--> Quando utilizar:

1 - Estamos colocando tipagem estática em um código que já usa tipagem estrutural - duck typing - e queremos mantê-la.

2 - Já estamos usando tipagem estática e queremos remover a tipagem nominal, deixando o código menos acoplado. Por exemplo,
quando queremos ter mais de uma classe concreta que respeitam o mesmo protocolo.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from typing 'import Protocol


// Para criar um protocolo, basta criar uma classe que herda de Protocol
'class Connection(Protocol):
    """Protocolo de conexão com o banco de dados"""

    // Definimos os métodos normalmente, com a devida assinatura
    def execute(self, query: str) -> list[str]:
        """Executa uma query no banco e retorna os dados, caso existam"""
        // O corpo do método não deve ter nada, portanto é comum utilizar
        // ellipsis (os 3 pontos abaixo) do Python, ou a palavra reservada pass
        ...


'class Database(Protocol):
    """Protocolo de um banco de dados"""

    def connect(self, connection_url: str) -> Connection:
        """Realiza uma conexão com o banco de dados"""
        ...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Os próximos arquivos são os bancos de dados e as conexões concretas. No caso, esses códigos são apenas exemplos,
com uma implementação apenas figurativa. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class MySQLConnection:
    def execute(self, query: str) -> list[str]:
        return [f"MySQL executou a query `{query}`"]


'class MySQLDatabase:
    def connect(self, connection_url: str) -> MySQLConnection:
        if connection_url == "":
            raise ValueError("Invalid connection")
        return MySQLConnection()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'class PostgresConnection:
    def execute(self, query: str) -> list[str]:
        return [
            f"Postgres executou a query `{query}`",
            "e retornou mais uma string adicional",
        ]


'class PostgresDatabase:
    def connect(self, connection_url: str = "123") -> PostgresConnection:
        if connection_url == "123":
            raise ValueError("Invalid connection")
        return PostgresConnection()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!!) É necessário observar aqui a falta da existência de herança: MySQLDatabase e PostgresDatabase não herdam do
protocolo Database. Esse é o ponto positivo “baixo acoplamento”.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from .databases.mysql 'import MySQLDatabase  # Observe os imports relativos
from .databases.postgresql import PostgresDatabase
from .interfaces 'import Connection, Database


// Função que recebe um Database qualquer, que faz uso do protocolo como tipo
// na dica de tipo
def connect_and_print_result(database: Database) -> None:
    // Podemos inclusive dar a dica de tipo da conexão, apesar de não ser
    // necessário fazer isso explicitamente
    connection: Connection = database.connect("url_de_exemplo")
    result = connection.execute("query de exemplo")
    for element in result:
        print(element)


def main() -> None:
    database_name = input("Database: ").lower()

    if database_name == "postgres":
        // Podemos chamar a função passando qualquer coisa que respeite o
        // protocolo Database, seja um PostgresDatabase
        connect_and_print_result(PostgresDatabase())
    elif database_name == "mysql":
        // ou seja um MySQLDatabase
        connect_and_print_result(MySQLDatabase())
    else:
        raise ValueError("Database inválido!")


if __name__ == "__main__":
    main()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~