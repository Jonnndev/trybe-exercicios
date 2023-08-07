===================================== "OLÁ MUNDO" COM FLASK =====================================

--> .venv/bin/activate
--> pip install flask

O arquivo principal de uma aplicação Flask, denominado app.py, é responsável por criar a instância
da aplicação web e configurar sua execução, incluindo definições como porta, URL e modo de depuração.

No arquivo app.py, é possível configurar as rotas da aplicação Flask, que são definidas por meio de
métodos Python decorados com @app.route("/").

(!) Mesmo ao retornar apenas uma string, o Flask é capaz de gerar uma página HTML graças à biblioteca
Werkzeug, que fornece um servidor WSGI (Web Server Gateway Interface)

# RETORNO COM JSON:

A função jsonify é uma verdadeira ajuda, pois ela retorna um objeto Response do Flask com o cabeçalho
'Content-Type: application/json';

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// app.py
'from flask import Flask, jsonify

app = Flask(__name__)  // Cria a instância da aplicação


@app.route("/")  // Cria uma rota, para a raiz do projeto. (GET por padrão)
def hello_world():  // Método a ser executado ao navegar
    return "Hello World!"


@app.route("/api/")
def api_helo():
    return jsonify({"message": "Hello World!"})


if __name__ == "__main__":
    // debug = True, reinicia automaticamente a cada mudança de arquivo
    // mude a porta, caso ela estiver em uso
    app.run(debug=True, host="0.0.0.0", port=8000)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


===================================== CONFIGURAÇÃO DOCKER =====================================

# BUILD DOCKER:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// app.py

'from flask import Flask, jsonify
'import random

app = Flask(__name__)

joke_list = [
    "Por que o bombeiro não gosta de andar? <br> Porque ele socorre.",
    "Sabe como chama a sorveteria do Michel Teló? <br> Ice te Pego.",
    "Por que o espanador não luta caratê? <br> Porque ele luta capoeira",
]


@app.route("/api/joke")
def joke():
    return jsonify({"joke": random.choice(joke_list)})


def start_server(host: str = "0.0.0.0", port: int = 8000):
    app.run(debug=True, host=host, port=port)


if __name__ == "__main__":
    start_server()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Observe: temos um bloco if que verifica a variável de ambiente $FLASK_ENV. Isso garante que apenas
as bibliotecas não necessárias em produção sejam instaladas durante o desenvolvimento. Para alcançar
esse comportamento, apresentamos o comando ARG, que reconhece um argumento que será passado pelo
arquivo docker-compose. Dessa forma, podemos controlar de forma flexível quais bibliotecas serão
instaladas com base na configuração de ambiente.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Dockerfile
FROM python:3-alpine3.17

WORKDIR /src

// Dica: instale primeiro as dependências antes de copiar todo projeto

COPY 'src/*requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

// Este argumento será passado dentro do docker-compose
ARG FLASK_ENV
RUN if [ "$FLASK_ENV" = "dev" ] ; then pip install --no-cache-dir -r dev-requirements.txt  ; fi

COPY ./src .

CMD ["python3", "app.py"]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// docker-compose
version: '3.4'

services:
  flask-api:
    container_name: flask-api
    build:
      // A configuração do 'args' possibilita o nosso IF funcionar no Dockerfile
      args:
        - FLASK_ENV=dev
      context: .
    volumes:
      - ./src:/src
    ports:
      - 8000:8000
    depends_on:
      - mongodb
    networks:
      - flask_net
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - FLASK_ENV=dev
    restart: always

  mongodb:
    image: mongo:5.0.7
    container_name: mongo_db
    restart: always
    ports:
      - 27017:27017
    networks:
      - flask_net

networks:
  flask_net:
    driver: bridge
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

===================================== KIT DE FERRAMENTAS WSGI =====================================

# WSGI:

A Python Software Foundation (PSF), juntamente com a comunidade Python, desenvolveu o padrão WSGI
(Web Server Gateway Interface), que define uma Interface padrão para a comunicação entre servidores
web e aplicativos Python.

Esse padrão determina como as solicitações HTTP devem ser feitas, como os dados devem ser processados
e como as respostas devem ser enviadas de volta ao servidor.

Por meio desse padrão, o Flask pode retornar strings ou objetos JSON a partir de métodos Python, o que
possibilita a criação de APIs. Essa mágica é possível graças ao Werkzeug, uma biblioteca que oferece as
ferramentas necessárias para implementar o padrão WSGI.

# WERKZEUG:

É um kit de ferramentas para aplicações web em Python que oferece diversas funcionalidades para o Flask,
como rotas de URL, geração de URLs, manipulação de solicitações HTTP, resposta HTTP, suporte a sessões,
gerenciamento de arquivos estáticos e muito mais.

(!)Quando usamos o servidor de desenvolvimento do Flask, o servidor é reiniciado a cada alteração no código.
No entanto, quando usamos o Waitress, isso não acontece. Portanto, se você fizer alterações no código, precisará
reiniciar o servidor manualmente.

(!) Como não configuramos nenhum tipo de log para o Waitress, não veremos nenhuma mensagem de log no terminal.
Mas pode ter tranquilidade: o servidor está funcionando perfeitamente.

===================================== PRIMEIRA API EM FLASK =====================================

# ARQUITETURA MVC:


M (Model): lógica de negócios e interação com banco de dados (Objetos Principais);
V (View): Interface com a pessoa usuária (HTML);
C (Controller): gerencia interação entre View e Model (Requisições HTTP).

# MODEL:

As models no padrão MVC são responsáveis por representar a lógica de negócios da aplicação e cuidar
do acesso e da manipulação dos dados armazenados no banco de dados. Elas desempenham um papel
fundamental como uma camada de abstração entre a aplicação e o banco de dados.

# CONTROLLERS:

Ela é responsável por receber e processar as requisições HTTP, manipulando os dados necessários e
retornando uma resposta apropriada para o cliente.

Nossa intenção é manter o arquivo app.py o mais limpo e organizado possível. Portanto, vamos separar a
lógica de manipulação de requisições em controllers individuais. Dessa forma, o app.py terá apenas a
responsabilidade de iniciar o servidor e registrar os módulos das controllers.


Blueprint: permite modularizar e reutilizar rotas em diferentes partes do código;
jsonify: retorna uma resposta JSON para uma requisição, com o cabeçalho completo;
request: encapsula a requisição HTTP, fornecendo os parâmetros da URL e o corpo da requisição.
