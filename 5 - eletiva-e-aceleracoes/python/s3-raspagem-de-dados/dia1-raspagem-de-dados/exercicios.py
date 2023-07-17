import requests
from parsel import Selector

# import time

"""
 Exercício 1:

Faça uma requisição ao site https://httpbin.org/encoding/utf8 e exiba seu conteúdo de forma legível.

"""

URL_BASE = "https://httpbin.org/encoding/utf8"
response = requests.get(URL_BASE)
print(response.text)
print("=======================================================")

"""
 Exercício 2:

Faça uma requisição ao recurso usuários da API do Github (https://api.github.com/users), exibindo o username e url de todos os usuários retornados.

"""

URL_BASE = "https://api.github.com/users"
response = requests.get(URL_BASE)

for user in response.json():
    print(user["login"], user["url"])

print("=======================================================")


"""
 Exercício 3:

Às vezes, você precisa fazer com que o seu raspador da Web pareça estar fazendo solicitações HTTP como o navegador, para que o servidor retorne os mesmos dados que você vê no seu navegador. Faça uma requisição a https://scrapethissite.com/pages/advanced/?gotcha=headers e verifique se foi bem sucedida.
"""

URL_BASE = "https://scrapethissite.com/pages/advanced/?gotcha=headers"
response = requests.get(
    URL_BASE,
    headers={"User-agent": "Mozilla", "Accept": "text/html"},
)

assert "bot detected" not in response.text
print("ok")
print("=======================================================")


"""
Exercício 4:

Baseando-se em uma página contendo detalhes sobre um livro (http://books.toscrape.com/catalogue/the-grand-design_405/index.html), faça a extração dos campos título, preço, descrição e url contendo a imagem de capa do livro.

Exercício 5:

Modifique o exercício anterior para retornar também quantos livros estão disponíveis, apresentando como último campo no retorno.
"""

URL = "http://books.toscrape.com/catalogue/the-grand-design_405/index.html"
URL_BASE = "http://books.toscrape.com/catalogue/"
response = requests.get(URL)
selector = Selector(text=response.text)

# título
title = selector.css(".product_main h1::text").get()

# preço
price = selector.css(".product_main .price_color::text").re_first(
    r"£\d+\.\d{2}"
)

# descrição
description = selector.css("#product_description ~ p::text").get()
suffix = "...more"
if description.endswith(suffix):
    description = description[: -len(suffix)]

# img URL
img_src = selector.css(".item img::attr(src)").get()
img_url = URL_BASE + img_src


stock_number = selector.css(".product_main .availability::text").re_first(
    r"\d"
)

print(f"{title},{price},{description},{img_url},{stock_number}")
print("=======================================================")
