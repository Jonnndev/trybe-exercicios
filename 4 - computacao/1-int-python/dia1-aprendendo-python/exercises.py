# Exercício 1: Crie uma função que receba dois números e retorne o maior deles.
print("Exercise 1")

# value1 = input("Digite um número:")
# value2 = input("Digite outro número:")


def bigger(param1, param2):
    return param1 if param1 > param2 else param2


print(bigger(2, 3))

#  Exercício 2: Calcule a média aritmética dos valores contidos em uma lista.
print("Exercise 2")

array = range(0, 9)


def average(list_items):
    counter = 0

    for number in list_items:
        counter += number
    return counter / len(list_items)


print(average(array))

#  Exercício 3: Faça um programa que, dado um valor n qualquer, tal que n > 1, imprima na tela um quadrado feito de asteriscos de lado de tamanho n. Por exemplo:
print("Exercise 3")

# n = 5

# *****
# *****
# *****
# *****
# *****


def square(number):
    for n in range(number):
        print("*" * number)


square(5)

# Exercício 4: Crie uma função que receba uma lista de nomes e retorne o nome com a maior quantidade de caracteres. Por exemplo, para ["José", "Lucas", "Nádia", "Fernanda", "Cairo", "Joana"], o retorno deve ser "Fernanda".
print("Exercise 4")


list_names = ["José", "Lucas", "Nádia", "Fernanda", "Cairo", "Joana"]


def len_name(list_names):
    bigger = ""
    for name in list_names:
        if len(name) > len(bigger):
            bigger = name
    return bigger


print(len_name(list_names))

# Exercício 5: Considere que a cobertura da tinta é de 1 litro para cada 3 metros quadrados e que a tinta é vendida em latas de 18 litros, que custam R$ 80,00. Crie uma função que retorne dois valores em uma tupla contendo a quantidade de latas de tinta a serem compradas e o preço total a partir do tamanho de uma parede (em m²).
print("Exercise 5")

cost = 80
ink_yield = 3
paint_can_liters = 18


def calc_resources(m2):
    spent_liters = m2 / 3
    total_cans = spent_liters // paint_can_liters

    if spent_liters % paint_can_liters:
        total_cans += 1
    total_cost = total_cans * cost

    return total_cans, total_cost


print(calc_resources(55))


#  Exercício 6: Crie uma função que receba os três lado de um triângulo e informe qual o tipo de triângulo formado ou "não é triangulo", caso não seja possível formar um triângulo.
print("Exercise 6")


def is_triangle(value1, value2, value3):
    triangle = (
        (value1 + value2) > value3
        and (value2 + value3) > value1
        and (value1 + value3) > value2
    )
    if not triangle:
        return "Não é Triângulo"
    if value1 == value2 == value3:
        return "Triângulo Equilátero"
    if value1 != value2 != value3:
        return "Triângulo Escaleno"
    return "Triângulo Isósceles"


print(is_triangle(45, 42, 41))
