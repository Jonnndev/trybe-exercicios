================================================== SELENIUM ==================================================

--> É um conjunto de ferramentas para automação de navegadores da web, que permite controlar remotamente
instâncias de navegadores e emular a interação de um usuário com o navegador.

--> No núcleo do Selenium está o WebDriver, uma API e protocolo que define uma Interface para controlar
o comportamento dos navegadores web. É através do WebDriver que o Selenium suporta a automação dos
principais navegadores do mercado.

// INSTALAÇÃO:

1 - python3 -m venv .venv
2 - source .venv/bin/activate
3 - pip3 install selenium
4 - download do driver do navegador (geckodriver)
// docker run -d -p 4444:4444 -p 7900:7900 --shm-size 2g --name firefox selenium/standalone-firefox:106.0
5 - descompactar o driver e mover para a pasta .venv/bin

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// importação do webdriver, que é o que possibilita a implementação para todos
// os principais navegadores da web
from selenium 'import webdriver

// criação de uma instância de navegador utilizando o Firefox
firefox = webdriver.Firefox()

// requisições para essa instância criada utilizando o método `get`
response = firefox.get("https://www.python.org/")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// CODIGO NO DOCKER:

// importação do webdriver, que é o que possibilita a implementação para todos
// os principais navegadores da web
from time 'import sleep
from selenium 'import webdriver

// Para usar o chrome ao invés do firefox trocamos FirefoxOptions por ChromeOptions
// Todavia, caso esteja utilizando o docker, atente-se ao container sendo utilizado.
options = webdriver.FirefoxOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors=yes')
options.add_argument('--start-maximized')

firefox = webdriver.Remote(command_executor="http://localhost:4444/wd/hub", options=options)

// requisições para essa instância criada utilizando o método `get`
response = firefox.get("https://www.python.org/")

// espera 10 segundos
sleep(10)

// encerra o navegador, importante quando usamos containers
firefox.quit()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Utilizando páginas reais da web, que estão recebendo manutenção e atualizações constantes
significa que um campo utilizado no exemplo e que existe na página hoje, pode não existir mais
no site daqui a um mês.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// from selenium import webdriver
from selenium.webdriver.common.keys 'import Keys // Importa teclas comuns

// firefox = webdriver.Firefox()

response = firefox.get("https://www.google.com.br/")

// pesquisa na instância aberta do navegador pela primeira ocorrência
// do nome 'q'
search_input = firefox.find_element("name", "q")

// escreve selenium dentro do campo de pesquisa
search_input.send_keys("selenium")

// pressiona enter para realizar a busca
search_input.send_keys(Keys.ENTER)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

O Selenium tem vários métodos públicos, como o find_element que usamos anteriormente e o find_elements
(no plural), utilizados para localizar o primeiro elemento correspondente ao resultado do filtro ou todos
os elementos que se encaixarem na busca, respectivamente.

Também podemos utilizar o By para especificar um elemento CSS ou XPATH que será buscado, para isso é
necessário importá-lo via:

--> from selenium.webdriver.common.by 'import By

|Com o By             | Sem o By           |
|_____________________|____________________|
|By.ID                | “id”               |
|By.NAME              | “name”             |
|By.XPATH             |	“xpath”            |
|By.LINK_TEXT         |	“link text”        |
|By.PARTIAL_LINK_TEXT |	“partial link text”|
|By.TAG_NAME          | “tag name”         |
|By.CLASS_NAME        |	“'class name”       |
|By.CSS_SELECTOR      |	“css selector”     |

(!) Utilizamos bastante no código o método get_attribute. A razão disso é que com o Selenium, o
elemento retornado depois da busca pelo atributo CSS será do tipo webdriver e não texto. É justamente
para fazer essa conversão que utilizamos esse método especificando o atributo ‘innerHTML’ ou ‘href’, por exemplo.

(!) Também utilizamos o método find_element encadeado para procurar um elemento dentro de outro elemento,
como fizemos para pegar o link, por exemplo, que era um elemento âncora dentro de uma div.


(!) Para pegar todos os livros da paginação:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// from selenium import webdriver

// from selenium.webdriver.common.by import By

from selenium.webdriver.firefox.options 'import Options

from selenium.common.exceptions 'import NoSuchElementException

firefox = webdriver.Firefox()

// Instancia um objeto da classe 'Options'
options = Options()

// Adiciona um argumento passando o parâmetro '--headless' --> Para não abrir o navegador durnte a execução
options.add_argument('--headless')

// Define que a instância do navegador deve usar as options definidas
firefox = webdriver.Firefox(options=options)

// def scrape(url):
//     firefox.get(url)

    books = []

//     for book in firefox.find_elements(By.CLASS_NAME, "product_pod"):
//         new_item = {}

//         new_item["title"] = (
//             book.find_element(By.TAG_NAME, "h3")
//             .find_element(By.TAG_NAME, "a")
//             .get_attribute("innerHTML")
//         )

//         new_item["price"] = book.find_element(
//             By.CLASS_NAME, "price_color"
//         ).get_attribute("innerHTML")

//         new_item["link"] = (
//             book.find_element(By.CLASS_NAME, "image_container")
//             .find_element(By.TAG_NAME, "a")
//             .get_attribute("href")
//         )

        books.append(new_item)
    return books

firefox.get("https://books.toscrape.com/")

all_books = []
url2request = "https://books.toscrape.com/"

// Cria uma variável com o seletor que captura o link do botão de passar para
// a próxima página
next_page_link = (
    firefox.find_element(By.CLASS_NAME, "next")
    .get_attribute("innerHTML")
)

// Enquanto este botão de 'next' existir na página ele irá iterar
while next_page_link:

    // Usa o método extend para colocar todos os elementos de uma lista dentro
    // de outra
    all_books.extend(scrape(url2request))

    try:
      url2request = (
          firefox.find_element(By.CLASS_NAME, "next")
          .find_element(By.TAG_NAME, "a")
          .get_attribute("href")
      )
    except NoSuchElementException:
        print("exception handled")
        break

print(all_books)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================================== BEAUTIFUL SOUP ==================================================

--> É uma biblioteca Python para extrair dados de arquivos HTML e XML. Ela é de grande valia para analisar esses
arquivos e fornecer maneiras mais simples de navegar, pesquisar e modificar a árvore de análise, podendo economizar
várias horas de trabalho.

--> .venv/bin/activate
--> pip3 install beautifulsoup4==4.11.1 requests==2.27.1

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import requests
from bs4 'import BeautifulSoup

url = "https://quotes.toscrape.com"
page = requests.get(url)
html_content = page.text

// Cria uma instância do objeto Beautiful Soup e usa o parser de HTML nativo
// do Python
soup = BeautifulSoup(html_content, "html.parser")

// Utiliza o método prettify para melhorar a visualização do conteúdo
print(soup.prettify())

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// TIPOS DE OBJETOS

O Beautiful Soup transforma um documento HTML complexo em uma árvore de objetos Python. Os quatro tipos de
objetos que podemos lidar são Tag, NavigableString, BeautifulSoup e Comment.

--> Tag: Em suma, um objeto do tipo Tag corresponde a uma tag XML ou HTML do documento original. Toda tag
possui um nome acessível através de .name. Por exemplo, quando vemos <header>, ele é um elemento do tipo
tag e o nome dessa tag é header.

--> NavigableString: Uma string corresponde a um texto dentro de uma tag e esse texto fica armazenado
na classe NavigableString.

// BUSCANDO NA ÁRVORE:

O Beautiful Soup também possui dois métodos principais para encontrar elementos. Eles são o find() e find_all().

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import requests
from bs4 'import BeautifulSoup

url = "https://quotes.toscrape.com"
page = requests.get(url)
html_content = page.text

// Cria uma instância do objeto Beautiful Soup e usa o parser de HTML nativo
// do Python
soup = BeautifulSoup(html_content, "html.parser")

// Utiliza o método prettify para melhorar a visualização do conteúdo
print(soup.prettify())

// acessando a tag 'title'
title = soup.title

// retorna o elemento HTML da tag
print(title)

// o tipo de 'title' é tag
print(type(title))

// o nome de 'title' é title
print(title.name)

// acessando a tag 'footer'
footer = soup.footer

// acessando o atributo classe da tag footer
print(footer["class"])

print("======================")

// retorna o elemento HTML da tag
print(title)

// Acessando a string de uma tag
print(title.string)

// Verificando o tipo dessa string
print(type(title.string))

print("======================")

// Imprime todas as ocorrências da tag "p" da página ou uma lista vazia,
// caso nenhum elemento corresponda a pesquisa
print(soup.find_all("p"))

// Imprime o elemento com o id especificado ou "None",
// caso nenhum elemento corresponda a pesquisa
print(soup.find(id="quote"))

// Imprime todo o texto da página
print(soup.get_text())

// Imprime todas as "divs" que possuam a classe "quote" ou uma lista vazia,
// caso nenhum elemento corresponda a pesquisa
print(soup.find_all("div", {"class": "quote"}))
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

'import requests
from bs4 'import BeautifulSoup


// Acessa uma URL e retorna um objeto do Beautiful Soup
def get_html_soup(url):
    page = requests.get(url)
    html_page = page.text

    soup = BeautifulSoup(html_page, "html.parser")
    soup.prettify()
    return soup


// Recebe um objeto soup e retorna informações das notícias de uma página
def get_page_news(soup):
    // Define uma lista vazia a ser populada com os dados do scraping
    news = []

    // Percorre todos os elementos da tag 'article' com a classe especificada
    for post in soup.find_all(
        "article", {"class": "tec--card tec--card--medium"}
    ):
        // Cria um dicionário para guardar os elementos a cada iteração
        item = {}

        // Cria um item chamado tag no dicionário para guardar a tag do post
        // Primeiro pesquisa pela div com a classe específica
        // Depois pela tag 'a' dentro dos resultados do primeiro filtro
        // Por fim, traz o resultado da string dentro da tag a
        item["tag"] = post.find("div", {"class": "tec--card__info"}).a.string

        // Mesma lógica da busca anterior
        item["title"] = post.find("h3", {"class": "tec--card__title"}).a.string

        // Parecido com o que foi feito anteriormente, mas dessa vez pega
        // o atributo 'href' dentro da tag 'a'
        item["link"] = post.find("h3", {"class": "tec--card__title"}).a["href"]

        // Mesma lógica da primeira busca, mas trazendo a string dentro da 'div'
        // direto
        item["date"] = post.find(
            "div", {"class": "tec--timestamp__item z--font-semibold"}
        ).string

        // Mesma lógica da busca anterior
        item["time"] = post.find(
            "div", {"class": "z--truncate z-flex-1"}
        ).string

        // Adiciona os itens criado no dicionário à lista 'news'
        news.append(item)

    return news


// Recebe um objeto soup e retorna o link que redireciona
// para a página seguinte, caso ele exista


def get_next_page(soup_page):
    try:
        // Busca pela tag 'a' com as classes específicas do link desejado
        return soup_page.find(
            "a",
            {"class": "tec--btn"},
        )["href"]
    except TypeError:
        return None


// Recebe uma URL e retorna uma lista com todas as notícias do site
def scrape_all(url):
    all_news = []

    // Enquanto a pesquisa pelo link que vai para a página seguinte existir
    while get_next_page(get_html_soup(url)) is not None:
        // Imprime a URL da página seguinte
        print(get_next_page(get_html_soup(url)))

        // Adiciona os elementos da lista com as notícias de cada
        // página na lista 'all_news'
        all_news.extend(get_page_news(get_html_soup(url)))

        // define a página seguinte como URL para a próxima iteração
        url = get_next_page(get_html_soup(url))

    return all_news


// Vamos começar perto das últimas páginas pra não ter que fazer a requisição
// do site inteiro
print(scrape_all("https://www.tecmundo.com.br/novidades?page=11030"))
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~