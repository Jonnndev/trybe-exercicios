=============================================== O QUE É RASPAGEM DE DADOS? ===============================================

--> É uma técnica computacional para extrair dados provenientes de um serviço ou aplicação, estruturando-os em bancos de
dados, planilhas ou outros formatos. Essa técnica consiste em extrair dados de sites e transportá-los para um formato mais
simples e maleável para que possam ser analisados e cruzados com mais facilidade.

=============================================== REQUISIÇÕES WEB ===============================================

--> Uma requisição web é um pedido feito por um cliente a um servidor, para que o servidor execute uma ação e envie uma
resposta. O cliente pode ser um navegador, um aplicativo ou qualquer outro dispositivo que faça uma requisição a um servidor.

O Python possui um pacote para lidar com o protocolo HTTP o urllib, porém seu uso é mais verboso. Por isso vamos utilizar a biblioteca requests.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import requests


// Requisição do tipo GET
response = requests.get("https://www.betrybe.com/")
print(response.status_code)  // código de status
print(response.headers["Content-Type"])  // conteúdo no formato html

// Conteúdo recebido da requisição
print(response.text)

// Bytes recebidos como resposta
print(response.content)

//# Requisição do tipo post
response = requests.post("http://httpbin.org/post", data="some content")
print(response.text)

// Requisição enviando cabeçalho (header)
response = requests.get("http://httpbin.org/get", headers={"Accept": "application/json"})
print(response.text)

// Requisição a recurso binário
response = requests.get("http://httpbin.org/image/png")
print(response.content)

// Recurso JSON
response = requests.get("http://httpbin.org/get")
// Equivalente ao json.loads(response.content)
print(response.json())

// Podemos também pedir que a resposta lance uma exceção caso o status não seja OK
response = requests.get("http://httpbin.org/status/404")
response.raise_for_status()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=============================================== PROBLEMAS ===============================================

# RATE LIMIT:

--> É uma técnica utilizada para limitar o número de requisições que um cliente pode fazer a um servidor
em um determinado.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import requests


// À partir da décima requisição somos bloqueados de acessar o recurso
// Código de status 429: Too Many Requests
for _ in range(15):
    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
    print(response.status_code)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Uma boa prática é sempre fazermos uma pausa entre as requisições, ou lote delas, mesmo que o website
onde a informação está não faça o bloqueio. Assim, evitamos tirar o site do ar.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import requests
'import time


// Coloca uma pausa de 6 segundos a cada requisição
// Obs: este site de exemplo tem um rate limit de 10 requisições por minuto
for _ in range(15):
    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
    print(response)
    time.sleep(6)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# TIMEOUT:

--> É o tempo máximo que uma requisição pode levar para ser executada. Se o tempo limite for atingido, a
requisição é cancelada e um erro é retornado.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import requests

// Por 10 segundos não temos certeza se a requisição irá retornar
response = requests.get("https://httpbin.org/delay/10")
print(response)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Podemos definir um tempo limite (timeout) para que, após este tempo, possamos tomar alguma atitude,
como por exemplo, realizar uma nova tentativa.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import requests


try:
    # recurso demora muito a responder
    response = requests.get("http://httpbin.org/delay/10", timeout=2)
except requests.ReadTimeout:
    # vamos fazer uma nova requisição
    response = requests.get("http://httpbin.org/delay/1", timeout=2)
finally:
    print(response.status_code)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=============================================== ANALISANDO RESPOSTAS ===============================================

--> python3 -m pip install parsel

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from parsel 'import Selector
'import requests


response = requests.get("http://books.toscrape.com/")
selector = Selector(text=response.text)
print(selector)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// response = requests.get("http://books.toscrape.com/")
// selector = Selector(text=response.text)

// O título está no atributo title em um elemento âncora (<a>)
// Dentro de um h3 em elementos que possuem classe product_pod
titles = selector.css(".product_pod h3 a::attr(title)").getall()
// Estamos utilizando a::attr(title) para capturar somente o valor contido no texto do seletor

// Os preços estão no texto de uma classe price_color
// Que se encontra dentro da classe .product_price
prices = selector.css(".product_price .price_color::text").getall()

// Combinando tudo podemos buscar os produtos
// em em seguida buscar os valores individualmente
for product in selector.css(".product_pod"):
    title = product.css("h3 a::attr(title)").get()
    price = product.css(".price_color::text").get()
    print(title, price)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=============================================== RECURSOS PAGINADOS ===============================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// [...]

// for product in selector.css(".product_pod"):
//     title = product.css("h3 a::attr(title)").get()
//     price = product.css(".price_color::text").get()
//     print(title, price)

// Existe uma classe next, que podemos recuperar a url através do seu elemento âncora
next_page_url = selector.css(".next a::attr(href)").get()
print(next_page_url)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Agora que sabemos como recuperar a próxima página, podemos iniciar na primeira página e continuar
buscando livros enquanto uma nova página for encontrada. Cada vez que encontrarmos uma página,
extraímos seus dados e continuamos até acabarem as páginas.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'from parsel import Selector
'import requests


// Define a primeira página como próxima a ter seu conteúdo recuperado
URL_BASE = "http://books.toscrape.com/catalogue/"
next_page_url = 'page-1.html'
while next_page_url:
    // Busca o conteúdo da próxima página
    response = requests.get(URL_BASE + next_page_url)
    selector = Selector(text=response.text)
    // Imprime os produtos de uma determinada página
    for product in selector.css(".product_pod"):
        title = product.css("h3 a::attr(title)").get()
        price = product.css(".price_color::text").get()
        print(title, price)
    // Descobre qual é a próxima página
    next_page_url = selector.css(".next a::attr(href)").get()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

============================================= RECURSOS OBTIDOS POR OUTROS RECURSOS =============================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// exemplo_scrape.py

// from parsel import Selector
// import requests


// URL_BASE = "http://books.toscrape.com/catalogue/"
// Define a primeira página como próxima a ter seu conteúdo recuperado
// next_page_url = 'page-1.html'
while next_page_url:
    // Busca o conteúdo da próxima página
    // response = requests.get(URL_BASE + next_page_url)
    // selector = Selector(text=response.text)
    // Imprime os produtos de uma determinada página
    for product in selector.css(".product_pod"):
        // Busca e extrai o título e  o preço
        // title = product.css("h3 a::attr(title)").get()
        // price = product.css(".price_color::text").get()
        // print(title, price)

        // Busca o detalhe de um produto
        detail_href = product.css("h3 a::attr(href)").get()
        detail_page_url = URL_BASE + detail_href

        // Baixa o conteúdo da página de detalhes
        detail_response = requests.get(detail_page_url)
        detail_selector = Selector(text=detail_response.text)

        // Extrai a descrição do produto
        description = detail_selector.css("#product_description ~ p::text").get()
        print(description)

    // Descobre qual é a próxima página
    // next_page_url = selector.css(".next a::attr(href)").get()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

============================================= LIMPEZA DE DADOS =============================================

Seria conveniente, antes de estruturar e armazenar estes dados, que fizéssemos uma limpeza neles.

No caso do valor, poderíamos utilizar uma expressão regular para remover os outros caracteres. O padrão é conter
um símbolo de libra, seguido por números, ponto para separar casas decimais e dois números como casas decimais.
Essa expressão regular pode ser feita da seguinte forma: £\d+\.\d{2}.

Agora, para utilizar a expressão regular que fizemos, podemos substituir o método getall pelo método re (TODOS), ou o método
get por re_first (PRIMEIRO). Ambos, além de recuperar valores, aplicarão a expressão regular sobre aquele valor.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// exemplo_scrape.py

'from parsel import Selector
'import requests


// URL_BASE = "http://books.toscrape.com/catalogue/"
// Define a primeira página como próxima a ter seu conteúdo recuperado
// next_page_url = 'page-1.html'
// while next_page_url:
    // Busca o conteúdo da próxima página
    // response = requests.get(URL_BASE + next_page_url)
    // selector = Selector(text=response.text)
    // Imprime os produtos de uma determinada página
    // for product in selector.css(".product_pod"):
        // Busca e extrai o título e  o preço
        // title = product.css("h3 a::attr(title)").get()
        price = product.css(".product_price .price_color::text").re(r"£\d+\.\d{2}")
        // print(title, price)

        // Busca o detalhe de um produto
        // detail_href = product.css("h3 a::attr(href)").get()
        // detail_page_url = URL_BASE + detail_href

        // Baixa o conteúdo da página de detalhes
        // detail_response = requests.get(detail_page_url)
        // detail_selector = Selector(text=detail_response.text)

        // Extrai a descrição do produto
        // description = detail_selector.css("#product_description ~ p::text").get()
        suffix = "...more"
        if description.endswith(suffix):
            description = description[:-len(suffix)]
        // print(description)

    // Descobre qual é a próxima página
    // next_page_url = selector.css(".next a::attr(href)").get()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!)  À partir da versão 3.9 do Python, teremos uma função chamada removesuffix, que é equivalente à palavra[:-len(suffix)].

============================================= FATIAMENTO =============================================

// Quando não incluso o valor inicial, iniciaremos do índice 0
// e do índice 2 em diante, os elementos não são incluídos
(1, 2, 3, 4)[:2]  // Saída: (1, 2)

// Quando omitimos o valor final
// o fatiamento ocorre até o fim da sequência
(1, 2, 3, 4)[1:]  // Saída: (2, 3, 4)

// Vá do índice 3 até o 7.
// O item no índice 7 não é incluído
"palavra"[3:7]  // Saída: "avra"

// Começando do elemento de índice 1, vá até o último,
// saltando de 2 em 2
[1, 2, 3, 4][1::2]  // Saída: [2, 4]

============================================= DICA =============================================

(!!) Scrapy --> Ferramenta para raspagem de dados.