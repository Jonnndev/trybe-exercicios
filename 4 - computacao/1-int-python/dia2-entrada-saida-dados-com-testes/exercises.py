#  Exercício 1:
# Faça um programa que receba um nome e imprima o mesmo na vertical em escada invertida. Exemplo:
# Entrada: PEDRO
# Saida:
# PEDRO
# PEDR
# PED
# PE
# P
print("Exercicio 1:")


def print_name(param):
    for i in range(len(param)):
        for ind in range(len(param) - i):
            print(param[ind], end="")
        print()


print_name("Jonathas")


# Exercício 2:

# Jogo da palavra embaralhada. Desenvolva um jogo em que a pessoa usuária tenha que adivinhar uma palavra que será mostrada com as letras embaralhadas. O programa terá uma lista de palavras e escolherá uma aleatoriamente. O jogador terá três tentativas para adivinhar a palavra. Ao final, a palavra deve ser mostrada na tela, informando se a pessoa ganhou ou perdeu o jogo.
print("Exercicio 2:")

import random

WORDS = [
    "cat",
    "elephant",
    "dog",
    "monkey",
    "duck",
    "chameleon",
    "bear",
    "moose",
    "rooster",
]
MAX_ATTEMPTS = 3


def draw_secret_word(words):
    secret_word = random.choice(words)
    scrambled_word = "".join(random.sample(secret_word, len(secret_word)))
    return secret_word, scrambled_word


def collect_guesses():
    guesses = []
    for attempt in range(MAX_ATTEMPTS):
        guess = input("Guess the word: ")
        guesses.append(guess)
    return guesses


def check_game_result(secret_word, guesses):
    if secret_word in guesses:
        print(f"You win: {secret_word}")
    else:
        print(f"You lose: {secret_word}")


if __name__ == "__main__":
    secret_word, scrambled_word = draw_secret_word(WORDS)
    print(f"Scrambled word is {scrambled_word}")
    guesses = collect_guesses()
    check_game_result(secret_word, guesses)

#  Exercício 3:

# Modifique o exercício anterior para que as palavras sejam lidas de um arquivo. Considere que o arquivo terá cada palavra em uma linha.
print("Exercicio 3:")


import random


MAX_ATTEMPTS = 3


def retrieve_words(file):
    return [word.strip() for word in file]


def draw_secret_word(words):
    secret_word = random.choice(words)
    scrambled_word = "".join(random.sample(secret_word, len(secret_word)))
    return secret_word, scrambled_word


def collect_guesses():
    guesses = []
    for attempt in range(MAX_ATTEMPTS):
        guess = input("Guess the word: ")
        guesses.append(guess)
    return guesses


def check_game_result(secret_word, guesses):
    if secret_word in guesses:
        print(f"You win: the secret word is {secret_word}")
    else:
        print(f"You lose: the secret word is {secret_word}")


if __name__ == "__main__":
    with open("words.txt") as file:
        words = retrieve_words(file)
    secret_word, scrambled_word = draw_secret_word(words)
    print(f"Scrambled word is {scrambled_word}")
    guesses = collect_guesses()
    check_game_result(secret_word, guesses)

# Exercício 4:
# leia seu conteúdo e calcule a porcentagem de livros em cada categoria em relação ao número total de livros.
print("Exercicio 4:")

import json
import csv


def retrieve_books(file):
    return json.load(file)


def count_books_by_categories(books):
    categories = {}
    for book in books:
        for category in book["categories"]:
            if not categories.get(category):
                categories[category] = 0
            categories[category] += 1
    return categories


def calculate_percentage_by_category(book_count_by_category, total_books):
    return [
        [category, num_books / total_books]
        for category, num_books in book_count_by_category.items()
    ]


def write_csv_report(file, header, rows):
    writer = csv.writer(file)
    writer.writerow(header)
    writer.writerows(rows)


if __name__ == "__main__":
    # retrieve books
    with open("books.json") as file:
        books = retrieve_books(file)

    # count by category
    book_count_by_category = count_books_by_categories(books)

    # calculate percentage
    number_of_books = len(books)
    books_percentage_rows = calculate_percentage_by_category(
        book_count_by_category, number_of_books
    )

    # write csv
    header = ["categoria", "percentagem"]
    with open("report.csv", "w") as file:
        write_csv_report(file, header, books_percentage_rows)

print("csv done!")

# Exercício 5:
#  Escreva um programa que retorne uma lista com os valores numéricos de 1 a N, mas com as seguintes exceções:

#     Números divisíveis por 3 deve aparecer como “Fizz” ao invés do número;

#     Números divisíveis por 5 devem aparecer como “Buzz” ao invés do número;

#     Números divisíveis por 3 e 5 devem aparecer como “FizzBuzz” ao invés do número.

# Exemplo: 3 -> [1, 2, "Fizz"].
print("Exercicio 5:")


def fizzbuzz(n):
    numbers = []
    for number in range(1, n + 1):
        if number % 15 == 0:
            numbers.append("FizzBuzz")
        elif number % 3 == 0:
            numbers.append("Fizz")
        elif number % 5 == 0:
            numbers.append("Buzz")
        else:
            numbers.append(number)
    return numbers


print("done!")


# Exercício 6:
# Faça uma função que valide um e-mail, lançando uma exceção quando o valor for inválido. Endereços de e-mail válidos devem seguir as seguintes regras:

#     Devem seguir o formato nomeusuario@nomewebsite.extensao;

#     O nome de usuário deve conter somente letras, dígitos, traços e underscores (_);

#     O nome de usuário deve iniciar com uma letra;

#     O nome do website deve conter somente letras e dígitos;

#     O tamanho máximo da extensão é de 3 caracteres.

# As funções isalpha, isdigit e isnumeric podem ser utilizadas para verificar se uma letra ou palavra são compostas de somente caracteres ou dígitos. Exemplo: "1".isalpha() -> False , "a".isalpha() -> True, "123".isnumeric() -> True.
print("Exercicio 6:")


def validate_email(email):
    index = 0
    if not email[index].isalpha():
        raise ValueError("Username should start with a letter")

    # validate username
    while email[index] != "@" and index < len(email):
        letter = email[index]
        if not letter.isalpha() and not letter.isdigit() and letter not in ("_", "-"):
            raise ValueError(
                "Username should contain only letters, " "digits, dashes or underscores"
            )
        index += 1
    index += 1  # @
    # validate website
    while email[index] != "." and index < len(email):
        letter = email[index]
        if not letter.isalpha() and not letter.isdigit():
            raise ValueError("Website should contain only letters, and digits")
        index += 1

    index += 1  # .
    # validate extension
    counter = 0
    while index < len(email):
        counter += 1
        index += 1
    if counter > 3:
        raise ValueError("Extension maximum length is 3")
    return None
