from abc import ABC, abstractmethod
from math import pi as PI

"""
EXERCICIO 01:

Implemente uma classe que contenha os atributos e os métodos a seguir.

Atributos:

    volume - será inicializado com um valor de 50 e só pode estar entre 0 e 99;
    canal - será inicializado com um valor de 1 e só pode estar entre 1 e 99;
    tamanho - será inicializado com o valor do parâmetro;
    ligada - será inicializado com o valor de False, pois está inicialmente 
            desligado.

Todos os atributos devem ser privados.

Métodos:

    aumentar_volume - aumenta o volume de 1 em 1 até o máximo de 99;
    diminuir_volume - diminui o volume de 1 em 1 até o mínimo de 0;
    modificar_canal - altera o canal de acordo com o parâmetro recebido e deve
                    lançar uma exceção (ValueError) caso o valor esteja fora
                    dos limites;
    ligar_desligar - alterna o estado da TV entre ligado e desligado
                    (True/False).

"""


class Televisão:
    __volume: int = 50
    __canal: int = 1
    __ligado: bool = False

    def __init__(self, tamanho: int):
        self.__tamanho = tamanho

    def aumentar_volume(self):
        if self.__volume < 99:
            self.__volume += 1
        return self.__volume

    def diminuir_volume(self):
        if self.__volume > 0:
            self.__volume -= 1
        return self.__volume

    def modificar_canal(self, novo_canal: int):
        if novo_canal <= 99 and novo_canal >= 1:
            self.__canal = novo_canal
            return self.__canal

        else:
            raise ValueError("Canal não suportado")

    def ligar_desligar(self):
        self.__ligado = not self.__ligado
        return self.__ligado


"""

 Exercício 2: Implemente uma classe Estatistica

Ela deve possuir um atributo numbers (uma lista de números)
com três métodos:
1 - um que calcula a média
2 - um que calcula a mediana mediana
3 - um que calcula a moda de uma lista de números.

🐦 Dica: você pode utilizar sorted para te auxiliar no método mediana.
            🐦 Dica: você pode utilizar collections.
            te auxiliar no método da moda.

"""


class Estatistica:
    def __init__(self, numbers_list: list):
        self.numbers = numbers_list

    def media(self):
        return sum(self.numbers) / len(self.numbers)

    def mediana(self):
        n = len(self.numbers)
        sorted_numbers = sorted(self.numbers)

        if n % 2 == 0:
            metade_esquerda = n // 2
            metade_direita = metade_esquerda - 1
            mediana = (
                sorted_numbers[metade_esquerda]
                + sorted_numbers[metade_direita]
            ) / 2

        else:
            metade = n // 2
            mediana = sorted_numbers[metade]

        return mediana

    def moda(self):
        frequencia = {}

        for numero in self.numbers:
            if numero in frequencia:
                frequencia[numero] += 1
            else:
                frequencia[numero] = 1

        frequente = max(frequencia.values())

        for i, j in frequencia.items():
            if j == frequente:
                moda = i

        return moda


"""
Exercício 3: Implemente as classes das figuras geométricas

 Você deverá implementar as seguintes classes:

    FiguraGeometrica:
    uma classe abstrata com os métodos abstratos area e perimetro.

    Quadrado:
    que herda de FiguraGeometrica e adiciona o atributo lado.

    Retangulo:
    que herda de FiguraGeometrica e adiciona os atributos base e altura.

    Circulo:
    que herda de FiguraGeometrica e adiciona o atributo raio.

"""


class FiguraGeometrica(ABC):
    @abstractmethod
    def area(self):
        raise NotImplementedError

    @abstractmethod
    def perimetro(self):
        raise NotImplementedError


class Quadrado(FiguraGeometrica):
    def __init__(self, lado):
        self.lado = lado

    def area(self):
        return self.lado * self.lado

    def perimetro(self):
        return 4 * self.lado


class Retangulo(FiguraGeometrica):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def area(self):
        return self.base * self.altura

    def perimetro(self):
        return 2 * (self.base + self.altura)


class Circulo(FiguraGeometrica):
    def __init__(self, raio):
        self.raio = raio

    def area(self):
        return PI * self.raio * self.raio

    def perimetro(self):
        return 2 * PI * self.raio
