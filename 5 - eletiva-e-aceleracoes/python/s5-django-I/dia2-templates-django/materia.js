================================== JINJA2 x DJANGO TEMPLATE LANGUAGE ==================================

O Jinja2 pode ser usado em qualquer projeto Python, enquanto o DTL é um mecanismo específico do Django.
Contudo, por ser um mecanismos específico do Django, o DTL possui algumas funcionalidades que não estão
presentes no Jinja2

# CONFIGURAÇÃO TEMPLATES DJANGO:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// event_manager/settings.py
...

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
+   'events', // NOME DO APP QUE CRIOU
]

...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// event_manager/settings.py
...

DATABASES = {
    'default': {
+       'ENGINE': 'django.db.backends.mysql', // TIPO DE BANCO DE DADOS
+       'NAME': 'event_manager_database',   // NOME DO BANCO DE DADOS
+       'USER': 'root',                    // USUÁRIO DO BANCO DE DADOS
+       'PASSWORD': 'password',           // SENHA DO BANCO DE DADOS
+       'HOST': '127.0.0.1',            // HOST DO BANCO DE DADOS
+       'PORT': '3306',               // PORTA DO BANCO DE DADOS
    }
}

...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar o database:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
mkdir database && cd database
touch 01_create_database.sql
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 01_create_database.sql

CREATE DATABASE IF NOT EXISTS event_manager_database;

USE event_manager_database;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar o Dockerfile:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FROM mysql:8.0.32

ENV MYSQL_ROOT_PASSWORD password
COPY ./database/01_create_database.sql /docker-entrypoint-initdb.d/data.sql01
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Build image:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
docker build -t event-manager-db .
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Executar container:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
docker run -d -p 3306:3306 --name=event-manager-mysql-container -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=event_manager_database event-manager-db
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar migrate:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 manage.py migrate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Alterando local de busca do template:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// event_manager/settings.py
Import os

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
+       'DIRS': [os.path.join(BASE_DIR,'templates')], // LOCAL DE BUSCA DOS TEMPLATES
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar pasta templates:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//<!--events/templates/home.html-->

// <!DOCTYPE html>
// <html lang="pt-BR">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Primeiro Template</title>
// </head>
// <body>
//     <h1> Meu primeiro template usando Django! </h1>
// </body>
// </html>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Implementar a view:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  events/views.py
from django.shortcuts Import render


def index(request):
    return render(request, 'home.html')
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar a url:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  events/urls.py

from django.urls Import path
from events.views Import index


urlpatterns = [
    path("", index, name="home-page")
//    path("/rota-comentada", função-que-será-executada, name="nome-que-identifica-a-rota")
]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Alterar urls do projeto:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  event_manager/urls.py
  from django.contrib Import admin
  from django.urls Import path, include


  urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('events.urls'))
  ]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================== APROFUNDANDO NO TEMPLATE ==================================

# HERANÇA DE TEMPLATE:

A DTL (Django Template Language) permite que se crie um template base que contém a estrutura essencial
do HTML e lacunas intencionais - com cada template filho preenchendo as lacunas com o próprio conteúdo. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <!-- events/templates/base.html -->
// <!DOCTYPE html>
// <html lang="pt-BR">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>{% block title %} {% endblock %}</title>
// </head>
// <body>
//     {% block content %} {% endblock %}
// </body>
// </html>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para usar a herança de template:

1 - Vá no template filho e inclua no seu cabeçalho a seguinte sintaxe: {% extends 'base.html' %},
onde se usa a palavra reservada extends seguida de qual template se quer herdar.

2 - Modifique o template filho, por exemplo o home.html, criando os blocos com os mesmos nomes
daqueles criados no template herdado de acordo com a sintaxe abaixo.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <!-- events/templates/home.html -->
{% extends 'base.html' %}

{% block title %}
  Primeiro Template
{% endblock %}

{% block content %}
  <h1> Meu primeiro template usando Django! </h1>
{% endblock %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# CRIANDO MODEL EVENT:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// events/models.py
from django.db Import models


class Event(models.Model):
    TYPE_CHOICES = (
        ('C', 'Conference'),
        ('S', 'Seminar'),
        ('W', 'Workshop'),
        ('O', 'Other'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    event_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    is_remote = models.BooleanField(default=False)
    image = models.ImageField(upload_to='events/img', blank=True)

    def __str__(self): # O método __str__ é sobrescrito para indicar como será a visualização do objeto
        return f'{self.title} - {self.date} - {self.location}' # Título do evento - Data - Local
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A tabela event ao ser criada no banco terá 8 colunas, sendo elas:

- id: inteiro e chave primária única pro evento (que não precisa ser explicitamente declarado no modelo);

- title: texto com no máximo 200 caracteres;

- description: texto sem limitação de caracteres;

- date: data e hora do evento;

- location: texto com no máximo 200 caracteres;

- event_type: texto com no máximo 50 caracteres e que só pode assumir os valores C, S, W ou O
(ao usar o parâmetro choices, o Django faz a validação se o valor inserido é um dos valores permitidos);

- is_remote: booleano (True ou False) que indica se o evento é remoto ou não;

- image: imagem que será salva na pasta {CAMINHO-DE-MÍDIA}/events/img
(o caminho de mídia pode ser definido no arquivo settings.py)

--> python3 manage.py makemigrations 
--> python3 manage.py migrate

# RENDERIZANDO TEMPLATES:

(!) Toda função que renderiza um template usando o método render, do Django, é capaz também de fornecer um
contexto para esse template.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// events/views.py
from django.shortcuts Import render


def index(request):
    context = {"company": "Trybe"}
    return render(request, 'home.html', context)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <!-- events/templates/home.html -->
 {% extends 'base.html' %}

 {% block title %}
   Primeiro Template
 {% endblock %}

 {% block content %}
     <h1> Meu primeiro template usando Django! </h1>
     <h2> {{ company }} </h2>
 {% endblock %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================== ELEMENTOS DO BANCO ==================================

 (!) Todas as classes que herdam de models.Model possuem um atributo chamado objects. Esse atributo
 permite a interação direta com o banco de dados usando a própria sintaxe do Python. Através desse
 atributo você pode criar novas entradas no banco, fazer consultas e até mesmo aplicar filtros em
 uma consulta.

 --> python3 manage.py shell // no mesmo diretório do manage.py

 Esse comando abre o shell do Django já carregando suas configurações e permitindo usar o ORM do framework.
 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from events.models Import Event // importa o modelo Event

Event.objects.all() // retorna todos os eventos do banco. Se você não criou nenhum, o retorno será um QuerySet vazio

Event.objects.create(title='Conferência de Django', description='Evento massa sobre Django', date='2023-09-29 12:00:00-03:00', location='São Paulo', event_type='C', is_remote=False) # cria um novo evento no banco

Event.objects.all() // retorna todos os eventos do banco. Agora o retorno será um QuerySet com um evento a mais

Event.objects.create(title='Django Workshop', description='Workshop que acontece semestralmente sobre Django', date='2024-10-02 15:30:00-03:00', location='Web', event_type='W', is_remote=True) # cria outro evento no banco

Event.objects.filter(is_remote=True) // retorna apenas os eventos do banco que são remotos

Event.objects.filter(event_type='W') // retorna apenas os eventos do banco que são workshops

Event.objects.filter(event_type='C', is_remote=False) // retorna apenas os eventos do banco que são conferências e presenciais, simultaneamente

Event.objects.filter(date__year=2024) // retorna apenas os eventos do banco que acontecem em 2024

Event.objects.filter(date__range=['2023-01-01', '2024-12-31']) // retorna apenas os eventos do banco que acontecem entre 2023 e 2024
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Event.objects.all() 
// <QuerySet [<Event: Conferência de Django - 2023-09-29 15:00:00+00:00 - São Paulo>, <Event: Django Workshop - 2024-10-02 18:30:00+00:00 - Web>]>

evento_1 = Event(title='Django Devs', description='Pessoas fantásticas que usam Django se reunindo em um só lugar', date='2025-07-02 13:30:00-03:00', location='Web', event_type='W', is_remote=True) # instancia um novo evento

evento_1.save() // salva o evento no banco

evento_2 = Event(title='DjangoFest', description='Um festival um pouco menos legal que desenvolver com Django', date='2023-11-22 18:00:00-03:00', location='São Paulo', event_type='C', is_remote=False) # instancia outro evento

evento_2.save() // salva o evento no banco

Event.objects.all() 
// <QuerySet [<Event: Conferência de Django - 2023-09-29 15:00:00+00:00 - São Paulo>, <Event: Django Workshop - 2024-10-02 18:30:00+00:00 - Web>, <Event: Django Devs - 2025-07-02 16:30:00+00:00 - Web>, <Event: DjangoFest - 2023-11-22 21:00:00+00:00 - São Paulo>]>

evento_3 = Event(title='DJ ANGO', description='Conheça a mais nova sensação musical.', date='2027-06-19 20:00:00-03:00', location='São Paulo', event_type='C', is_remote=False) # instancia um evento idêntico ao anterior

evento_3.save() // salva o evento no banco

Event.objects.all() 
// <QuerySet [<Event: Conferência de Django - 2023-09-29 15:00:00+00:00 - São Paulo>, <Event: Django Workshop - 2024-10-02 18:30:00+00:00 - Web>, <Event: Django Devs - 2025-07-02 16:30:00+00:00 - Web>, <Event: DjangoFest - 2023-11-22 21:00:00+00:00 - São Paulo>, <Event: DJ ANGO - 2027-06-19 23:00:00+00:00 - São Paulo>]>

evento_3.delete() // remove o evento do banco

Event.objects.all() 
// <QuerySet [<Event: Conferência de Django - 2023-09-29 15:00:00+00:00 - São Paulo>, <Event: Django Workshop - 2024-10-02 18:30:00+00:00 - Web>, <Event: Django Devs - 2025-07-02 16:30:00+00:00 - Web>, <Event: DjangoFest - 2023-11-22 21:00:00+00:00 - São Paulo>]>

================================== LIDANDO COM EXCEÇÕES ==================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// events/views.py
from django.http Import Http404
from django.shortcuts Import render, get_object_or_404
from events.models Import Event


def event_details(request, event_id):
    try:
        event = get_object_or_404(Event, id=event_id)
        return render(request, 'details.html', {'event': event})
    except Http404:
        return render(request, '404.html')
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <!-- events/templates/404.html -->
{% extends 'base.html' %}

{% block title %}
    Página não encontrada
{% endblock %}

{% block content %}
    <h1> 404 - Página não encontrada </h1>
    <h2> Desculpe, mas o evento não foi encontrado </h2>
    <p><a href="{% url 'home-page' %}"> Volte a página inicial </a></p>
{% endblock %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

================================== APRIMORANDO TEMPLATES ==================================

--> pip install whitenoise // Serve os arquivos estáticos a partir de um diretório
--> pip install django-static-autocollect // Coleta os arquivos estáticos e os coloca em um diretório

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// event_manager/settings.py
...

 INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'events',
+   'static_autocollect' // INSTALAR O APP
 ]
 

 MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
+   'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
 ]

 ...

+ MEDIA_URL = ''
+ MEDIA_ROOT = BASE_DIR / 'media'

 STATIC_URL = 'static/'
+ STATIC_ROOT = BASE_DIR / 'staticfiles'

+ STATICFILES_DIRS = [
+     str(BASE_DIR / 'media/'),
+ ]

+ STORAGE = {
+    "default": {
+        "BACKEND": "django.core.files.storage.FileSystemStorage",
+    },
+    "staticfiles": {
+        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
+    }
+ }

+ WHITE_NOISE_AUTOREFRESH = True
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


1 - instalando o pacote static_autocollect no projeto;

2 - adicionando o pacote whitenoise na lista de middlewares;

3 - definindo o caminho relativo onde se encontra o diretório media em MEDIA_URL;

4 - definindo o caminho absoluto em MEDIA_ROOT e que será usado como caminho base para o
upload de imagens vindas das pessoas usuárias;

5 - definindo o caminho absoluto em STATIC_ROOT e que será usado pelo whitenoise para servir os arquivos estáticos;

6 - definindo uma lista de caminhos em STATICFILES_DIRS que serão usados pelo static_autocollect para coletar os
arquivos estáticos e direcionar para STATIC_ROOT;

7 - definindo o comportamento de armazenamento do whitenoise;

8 - definindo que o whitenoise deve atualizar os arquivos estáticos automaticamente.

--> python3 manage.py watch_static & python3 manage.py runserver