================================== SERVER SIDE RENDERING ==================================

Existe a possibilidade de você escrever todo arquivo HTML no servidor e, depois, encaminhar
uma versão estática para o cliente.

Para realizar isso em Python, vamos utilizar o Jinja2, um mecanismo para criar templates HTML,
com recurso de aplicar os poderes do Python. Um exemplo são as variáveis criadas na controller.

                     |   Client Side Rendering          |  Server Side Rendering
Execução             | 	'No navegador do usuário        | 	No servidor web
Desempenho           | 	'Depende do hardware do usuário | 	Depende do hardware e da capacidade do servidor
Carregamento inicial | 	'Tende ser mais rápido          | 	Tende ser mais lento
Atualizações         | 	'Mais rápidas e eficientes      | 	Mais lentas e consomem mais largura de banda
Segurança            | 	'Menos seguros                  | 	Mais seguros
Complexidade         | 	'Menos complexos                | 	Mais complexos

================================== CLIENT-SIDE VS SERVER-SIDE VS REST-API ==================================

# SERVER-SIDE:

- O servidor é responsável por renderizar o HTML e enviar para o cliente.
- O desenvolvimento é geralmente mais fácil porque há menos preocupações com a compatibilidade e porque a
  camada view fica dentro de um mesmo projeto.


# CLIENT-SIDE:

- O cliente é responsável por renderizar o HTML.
- O servidor pode enviar os arquivos para o navegador mais rapidamente, resultando em um tempo de carregamento
mais rápido, diminuindo a latência.

# REST-API:

- O cliente é responsável por renderizar o HTML.
- As REST APIs servem de apoio para retornar com segurança as informações do Back-end/Banco de Dados, dando
muito mais dinamismo à aplicação. No entanto, isso pode acabar aumentando o tempo de renderização se houver
constantes requisições.

================================== JINJA2 ==================================

O Jinja2 é um mecanismo de template utilizado para criar páginas HTML dinâmicas por meio da incorporação de
variáveis e comandos Python (if, else, for). O Flask possui uma integração nativa com o Jinja2, permitindo
que os templates sejam facilmente renderizados dentro do contexto da aplicação.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// app.py

// 1 - Importe uma nova controller para nossa pagina inicial
// Obs: não se preocupe, implementaremos ela logo a seguir
from controllers.home_controller 'import home_controller

// Lembrando: instanciamos o servidor Flask
app = Flask(__name__)

// 2 - Indique à aplicação onde ficarão nossos arquivos estáticos e templates
app.static_folder = "views/static"
app.template_folder = "views/templates"

// 3 - Registre a nova controller
app.register_blueprint(home_controller, url_prefix="/")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// home_controller.py

from flask 'import Blueprint, render_template

// 1 - Crie o objeto Blueprint da home_controller, para o registro em app.py
home_controller = Blueprint("home_controller", __name__)


// 2 - Crie o endpoint GET /, que renderiza o template index.html
@home_controller.route("/", methods=["GET"])
def index():
    // 3 - Renderize a template index.html com a função render_template
    return render_template("index.html")

// CUSTOMIZANDO A MENSAGEM

// Precisamos adicionar a importação do módulo datetime, e do objeto request
from datetime 'import datetime
from flask 'import Blueprint, render_template, request

home_controller = Blueprint("home_controller", __name__)

// É possível uma configuração de rota já atender os dois métodos
@home_controller.route("/", methods=["GET", "POST"])
def index():
    // Reconhecimento do username que chegou do formulário da requisição
    username = request.form.get("username") if request.method == "POST" else ""

    // Ao renderizar novamente a template, alguns parâmetros devem ser passados
    return render_template(
        "index.html",
        username=username,
        greeting=_get_greeting(),
    )

def _get_greeting():
    """Retorna a saudação correta para o horário atual"""
    curr_hour = datetime.now().hour
    if curr_hour < 6:
        return "Boa noite"
    if curr_hour < 12:
        return "Bom dia"
    if curr_hour < 18:
        return "Boa tarde"
    return "Boa noite"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// views/templates/index.html

/*<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Chat Trybot</title>
    <!-- {{url_for}} utilizado para importar um css estático -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/main.css') }}">
</head>

<body class="container">
    <!-- {{url_for}} utilizado para importar uma imagem estática -->
    <img src="{{ url_for('static', filename='images/logo.png') }}" width="40%">

    <form action="/" method="post">
    {% if username and greeting %}
      <p>Olá {{ username|capitalize|trim }}! {{ greeting }}!</p>
    {% endif %}
        <div class="send-box">
            <input type="text" name="username">
            <button type="submit" id="chat">Entrar</button>
        </div>
    </form>
</body>
</html> */
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================== CHATBOT: MODEL E VIEW ==================================


1 - Atendimento automático;
2 - Respostas de perguntas frequentes (FAQ);
3 - Segunda via de boletos;
4 - Notificação de eventos;
5 - Acompanhar pós-atendimento;
6 - Contar piadas.

# MODEL:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// src/models/message_model.py

from .db 'import db
from .abstract_model 'import AbstractModel


// Herdando a classe Abstrata que domina o uso do Mongodb
class MessageModel(AbstractModel):
    // Define que a Coleção do Banco se chamará 'chat'.
    // Uma coleção é o equivalente a uma tabela no Mysql
    _collection = db["chat"]

    // Vamos reaproveitar o construtor da classe superior implicitamente

    // Define as regras de como o objeto MessageModel pode virar um Dict
    def to_dict(self):
        return {
            "content": self.data["content"],
            "to": self.data["to"],
            "from": self.data["from"],
            "time": self.data["time"],
        }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# VIEW:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// src/views/templates/chat.html

<!-- Section é uma tag html para criar um componente -->
<section class="messenger">
  <!-- cabeçalho -->
  <header class="messenger-header">
    <meta charset="UTF-8">
    <title>Chat Trybot</title>

    <!-- Carrega o CSS estático -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/chat.css') }}">

    <div class="messenger-header-title">
      <i class="fas fa-comment-alt"> Trybot</i>
    </div>

    <div class="messenger-header-options">
      <span><i class="fas fa-cog"></i></span>
    </div>
  </header>

  <main class="messenger-chat" id="chat">
    <!-- loop for nas mensagens recebidas da controller -->
    {% for message in session_messages %}
      <!-- se mensagem é do Trybot, deve alinhar a esquerda e definir avatar-->
      {% if message['from'] == 'Trybot' %}
        {% set class_message = 'left-msg' %}
        {% set file_name = 'images/avatar.png' %}
      {% else %}
        {% set class_message = 'right-msg' %}
        {% set file_name = 'images/avatar-user.png' %}
      {% endif %}

      <div class="msg {{ class_message }}">
        <div class="msg-avatar">
          <img src="{{ url_for('static', filename=file_name)}}" width="100%">
        </div>

        <div class="msg-ballon">
          <div class="msg-info">
            <div class="msg-info-name">{{ message['from'] }}</div>
            <div class="msg-info-time">{{ message['time'] }}</div>
          </div>

          <div class="msg-text">
            {{message['content']|safe}}
          </div>
        </div>
      </div>
    {% endfor %}
  </main>

  <form method="post" class="messenger-inputarea">
    <input type="text" name="message-content" class="messenger-input" placeholder="Escreva sua mensagem...">
    <input type="hidden" name="username" value="{{ username }}">
    <button type="submit" class="messenger-send-btn">Enviar</button>
  </form>
</section>

<!-- Não somos contra Javascript! Podemos usar também 😄 -->
<!-- Aqui, ele serve para descer a barra de rolagem ao carregar o chat-->
<script>
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
  var chatDiv = document.getElementById("chat");
  chatDiv.scrollTop = chatDiv.scrollHeight;
</script>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Importante observar que a sintaxe de marcação do for exige o fechamento com um {% endfor %}, e a do if exige
o fechamento com {% endif %}. Isso se assemelha ao formato do próprio HTML nativo, que exige abertura e fechamento
de algumas tags.

(!) Comandos são marcados com {% %} (chave simples + operador de porcentagem) e variáveis com {{ }} (chaves duplas)

(!) O filtro safe em {{message['content']|safe}} prevenE um HTML injection. Assim evitamos bugs que “só uma pessoa
usuária poderia encontrar”, ou até mesmo que uma pessoa maliciosa envie um Javascript como mensagem no input e nosso
código o consuma.

================================== CHATBOT: CONTROLLER ==================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// src/controllers/chat_controller.py

from flask 'import Blueprint, request, render_template
from datetime 'import datetime
import random
from models.joke_model 'import JokeModel
from models.message_model 'import MessageModel

chat_controller = Blueprint("chat_controller", __name__)


// GET considerará usuário visitante, POST o usuário recebido do formulário
@chat_controller.route("/", methods=["GET", "POST"])
def continue_chat():
    username = request.form.get("username") or "Visitante"
    message_content = request.form.get("message-content")

    _save_message(message_content, _from=username, to="Trybot")
    // Prepara a resposta
    answer = _prepare_answer(username, message_content)
    _save_message(answer, _from="Trybot", to=username)

    // Retorna todas as mensagens que este usuário possui com o bot
    session_messages = _get_session_messages(username)
    return render_template(
        "chat.html", username=username, session_messages=session_messages
    )


// Métodos de serviços auxiliares
def _save_message(message_content, _from, to):
    if not message_content:
        return

    chat_message = MessageModel(
        {
            "content": message_content,
            "from": _from,
            "to": to,
            "time": datetime.now().strftime("%H:%M"),
        }
    )
    chat_message.save()


def _prepare_answer(name, message_content):
    if not message_content:
        return _answer_first(name)
    if "1" in message_content:
        return _answer_joke()
    return _answer_default()


def _answer_first(name):
    return (
        f"Olá { name }, bem vindo a central de ajuda! Por hora posso "
        "te ajudar em algumas coisas 😄<br>1 - Contar uma piada"
    )


def _answer_default():
    return random.choice(
        [
            "Interessante, me conte mais sobre isso.",
            "Compreendo como você se sente.",
            "Isso é algo com o qual muitas pessoas lidam.",
            "Como você está lidando com isso?",
            "Eu estou aqui para você, se precisar conversar.",
        ]
    )


def _answer_joke():
    joke = JokeModel.get_random()
    return joke.to_dict()["joke"] if joke else "Ainda não conheço piadas"


def _get_session_messages(name):
    messages = MessageModel.find({"$or": [{"to": name}, {"from": name}]})
    return [message.to_dict() for message in messages]

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//app.py

// from flask import Flask
from controllers.chat_controller import chat_controller
// ...
// app.register_blueprint(home_controller, url_prefix="/")
// app.register_blueprint(jokes_controller, url_prefix="/jokes")
app.register_blueprint(chat_controller, url_prefix="/chat")

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// index.html


    <img src="{{ url_for('static', filename='images/logo.png') }}" width="40%">

    {/* <form action="/" method="post"> */}
    <form action="/chat" method="post">
        <p>Olá {{username|capitalize|trim}}! {{greeting}}, como você se chama?</p>
        <div class="send-box">
            <input type="text" name="username">

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) O atributo action na tag form do HTML5 especifica a URL para onde os dados do formulário serão
enviados, quando o usuário submetê-lo. Esse atributo define o destino do envio dos dados para
processamento, seja para uma página no mesmo servidor, seja para um servidor remoto.