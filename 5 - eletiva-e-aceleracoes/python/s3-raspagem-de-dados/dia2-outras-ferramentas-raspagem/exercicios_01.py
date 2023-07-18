from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By

options = Options()
options.add_argument("--headless")

firefox = webdriver.Firefox(options=options)

"""
Exercício 1

Com o Selenium, faça uma requisição para o endpoint https://quotes.toscrape.com/ e imprima a primeira citação que aparece na página.

"""

url = "https://quotes.toscrape.com/"
response = firefox.get(url)

search_quote = firefox.find_elements(By.CLASS_NAME, "text")[0].text

print("======================= EX01 ======================= ")
print(search_quote)


"""
Exercício 2

Imprima todos os parágrafos da página https://www.wikimetal.com.br/iron-maiden-scorpions-kiss-veja-melhores-albuns-1982/.

"""

url = "https://www.wikimetal.com.br/iron-maiden-scorpions-kiss-veja-melhores-albuns-1982/"
response = firefox.get(url)

search_tags = firefox.find_elements(By.TAG_NAME, "p")

print("======================= EX02 ======================= ")
for ps in range(len(search_tags)):
    print("===============", ps, "===============")
    print(search_tags[ps].text)
print("=======================  ======================= ")


"""
Exercício 3

Utilizando a ferramenta Selenium, no site https://diolinux.com.br/, faça a extração dos campos título, link para o post, trecho exibido de cada post da página inicial.

"""

url = "https://diolinux.com.br/"
response = firefox.get(url)

posts = []

for post in firefox.find_elements(By.CLASS_NAME, "inhype-post-details"):
    new_post = {}

    new_post["title"] = (
        post.find_element(By.TAG_NAME, "h3")
        .find_element(By.TAG_NAME, "a")
        .get_attribute("innerHTML")
    )

    new_post["link"] = (
        post.find_element(By.TAG_NAME, "h3")
        .find_element(By.TAG_NAME, "a")
        .get_attribute("href")
    )

    posts.append(new_post)

print("======================= EX03 ======================= ")

for item in posts:
    print(item)
