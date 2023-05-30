# 1 - Faça um algoritmo recursivo de soma. Esse algoritmo deve receber um número de parâmetro e deve somar todos os números antecessores a ele.

# Número passado por parâmetro à função: 4
# Execução: 4 + 3 + 2 + 1
# Resultado: 10


# def recursive_sum(num):
#     if num == 0:
#         return 0
#     else:
#         print(num)
#         return num + recursive_sum(num - 1)


# recursive_sum(4)

# Exercicio 1 - Crie um algoritmo não recursivo para contar quantos números pares existem em uma sequência numérica (1 a n).
print("Exercicio 1")


def iterative_sum(n):
    a = list(range(1, n + 1))
    index = 0
    sum = 0
    while index < len(a):
        if a[index] % 2 == 0 and n != 0:
            sum += 1
        index += 1
    return sum


print(f"Qntds de números pares é:", iterative_sum(20))

# Exercicio 2 -  Transforme o algoritmo criado acima em recursivo
print("Exercicio 2")


def recursive_sum(n):
    if n == 1:
        return 0
    elif n % 2 == 0:
        return 1 + recursive_sum(n - 1)
    else:
        return recursive_sum(n - 1)


print(f"Qntds de números pares é:", recursive_sum(10))

# Exercicio 3 -   Crie um algoritmo recursivo que encontre, em uma lista, o maior número inteiro.
print("Exercicio 3")


def maiorinteiro_aux(lista, tamanho):
    if tamanho == 1:
        return lista[0]
    else:
        maior_do_resto_da_lista = maiorinteiro_aux(lista, tamanho - 1)
        if maior_do_resto_da_lista > lista[tamanho - 1]:
            return maior_do_resto_da_lista
        else:
            return lista[tamanho - 1]


def maiorinteiro(lista):
    tamanho = len(lista)
    return maiorinteiro_aux(lista, tamanho)


print(f"Maior número é:", maiorinteiro([1, 21, 300, 4, 57]))

# Exercicio 4 - Escreva um algoritmo recursivo para encontrar o máximo divisor comum (mdc) de
# dois inteiros.
print("Exercicio 4")


def mdc(a, b):
    if b == 0:
        return a
    return mdc(b, a % b)


print(f"MDC:", mdc(4, 16))
