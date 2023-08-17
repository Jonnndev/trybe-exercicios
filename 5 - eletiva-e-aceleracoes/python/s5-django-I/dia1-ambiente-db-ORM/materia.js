========================================== DJANGO ==========================================

É um framework de alto nível para desenvolvimento web em Python.

1- Modularização: os aplicativos Django são compostos por diversos módulos (chamados de apps),
cada um com sua própria responsabilidade específica, o que facilita a organização e a manutenção
do código, além de sua reutilização.

2- Padrão Model-Template-View (MTV): o Django segue um padrão de arquitetura em três camadas - model,
template e view, popularmente referido pela comunidade como Model-Template-View ou MTV. Nessa arquitetura,
os modelos (models) representam a estrutura dos dados (mapeamento do banco de dados), as visualizações
(views) são responsáveis por concentrar a lógica (regras de negócio) e os templates lidam com a apresentação
dos dados para a pessoa usuária (HTML que será renderizado no browser).

3- ORM (Object-Relational Mapping): o próprio Django já fornece um ORM que permite o uso de código Python para
fazer as consultas e manipulações de banco de dados, tornando o desenvolvimento mais ágil por eliminar a necessidade
de escrever consultas SQL manualmente.

4- Interface de administração pronta para uso: a Interface de administração automática oferecida pelo Django lê
metadados nos modelos para fornecer uma Interface que permite gerenciar seus dados - adicionar, editar e excluir
registros do banco de dados, por exemplo, sem a necessidade de escrever um código.

5- Roteamento de URLs: o Django usa um sistema de mapeamento simples entre os padrões de URL de requisições HTTP
e as funções que definem suas views (exibições) correspondentes, facilitando além da organização do código, a manutenção
e a expansão da aplicação.

6- Autenticação: O Django vem com um sistema de autenticação completo de fácil uso, que lida com contas de usuário,
grupos, permissões e sessões baseadas em cookies, permitindo a criação de sites em que pessoas usuárias possam
criar contas e fazer login/logout com segurança.

7- Segurança: o Django tem alguns recursos integrados para ajudar a proteger as aplicações contra vulnerabilidades
comuns, como injeção de SQL, CSRF (Cross-Site Request Forgery) e XSS (Cross-Site Scripting).

========================================== PRIMEIROS PASSOS ==========================================

--> python3 -m venv .venv
--> source .venv/bin/activate
--> pip install django
--> django-admin startproject nome_projeto
--> python3 manage.py migrate
--> python manage.py runserver

ONLINE!


1 - manage.py: é o arquivo usado internamente quando executamos comandos do Django.

2 - __init__.py: arquivo que indica que o diretório é um pacote Python.

3 - asgi.py: arquivo de configuração do ASGI (Asynchronous Server Gateway Interface), que é o protocolo usado pelo
Django para comunicação entre servidores web e aplicações web para lidar com solicitações assíncronas e em tempo real.

4 - settings.py: arquivo de configuração do projeto, que contém todas as configurações do Django para o projeto.

5 - urls.py: arquivo de configuração de rotas do projeto.

6 - wsgi.py: arquivo de configuração do WSGI (Web Server Gateway Interface), que é o protocolo usado pelo Django para
comunicação entre servidores web e aplicações web para lidar com solicitações HTTP.

7 - __pycache__: diretório que contém arquivos gerados automaticamente pelo Python para otimizar o carregamento de módulos.

~~~~~~~~~~~~~~~~~~~~~
(!) ARQUIVO SETTINGS:
~~~~~~~~~~~~~~~~~~~~~

--> SECRET_KEY: é uma chave de segurança que o Django utiliza para criptografar dados sensíveis, como senhas de pessoas
usuárias, por exemplo. Ela já vem com um valor por padrão, mas explicitamente dada como insegura e por isso, é recomendável
substitui-la por uma chave personalizada forte, especialmente em ambientes de produção.

--> DEBUG: é um booleano que indica se o modo de depuração (debug) está ativado ou não. Durante o desenvolvimento, ter esse
modo ativado é muito útil para ajudar a identificar e corrigir bugs, o valor default (padrão) dessa variável é true justamente
por isso. Contudo, ele pode trazer algumas vulnerabilidades à segurança, como, por exemplo, mostrar informações sensíveis do
projeto - algo ruim se mostrado para uma pessoa usuária. Por isso, é importante que ele esteja desativado quando o projeto
estiver em produção.

--> ALLOWED_HOSTS: é uma lista de nomes de domínios, subdomínios ou endereços IP que o Django permite que acessem o projeto.
Você pode usar o valor '*', caso queira dar acesso a todos, ou definir uma lista com os grupos que terão acesso ao projeto,
por exemplo, ['exemplo.com', 'subdomínio.exemplo.com', '192.168.1.1'].

--> INSTALLED_APPS: é uma lista de apps que serão acoplados no projeto Django. Alguns já vêm instalados por padrão, mas os
apps criados por você para o projeto podem compor essa variável também.

--> MIDDLEWARE: é uma lista de middlewares que o Django utiliza para fazer algumas coisas como, por exemplo, o middleware
de autenticação de pessoa usuária. Sua lógica é similar a dos Middlewares do Express, mas entraremos em detalhes sobre eles
apenas na próxima seção.

--> TEMPLATES: é uma lista de diretórios em que o Django irá procurar por templates HTML.

--> DATABASES: é a configuração de banco de dados do projeto. Como o Django já vem com o SQLite instalado por padrão, ele já
vem com a configuração do SQLite, mas podemos trocar por outros.

--> LANGUAGE_CODE: é a configuração de idioma padrão do projeto. Por padrão, ele vem com o inglês, mas podemos alterar para
qualquer outro.

~~~~~~~~~~~~~~~~~~~~~
(!) ARQUIVO URLS.py:
~~~~~~~~~~~~~~~~~~~~~

Este arquivo reúne as rotas do projeto, com alguns valores já definidos por padrão.

A primeira coisa que temos é a função path, que define uma rota. Como parâmetro ela recebe a URL que será acessada e a
função que será executada quando a URL for acessada.

A admin/ é a Interface administrativa que o Django fornece para o projeto.

========================================== USANDO OUTREO DB ==========================================

--> Podemos iniciar apagando o arquivo db.sqlite3.
--> Alterar a variavel DATABASE no arquivo settings.py

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.mysql',
      'NAME': 'ecommerce_database',
      'USER': 'root',
      'PASSWORD': 'password',
      'HOST': '127.0.0.1',
      'PORT': '3306',
      }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar um arquivo que conterá o script SQL que criará o banco de dados

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
mkdir database && cd database
touch 01_create_database.sql
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Por ora não haverá tabelas, logo, o script de criação do banco de dados ecommerce_database deve ficar assim:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
CREATE DATABASE IF NOT EXISTS ecommerce_database;

USE ecommerce_database;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar o Dockerfile no nível do arquivo manage.py:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FROM mysql:8.0.32

ENV MYSQL_ROOT_PASSWORD password

// Copia o script SQL que acabamos de criar para um determinado diretório no container
COPY ./database/01_create_database.sql /docker-entrypoint-initdb.d/data.sql01
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Buildar a imagem:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
docker build -t ecommerce-db .
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Executar o container e o script de criação do banco copiado no Dockerfile, passando algumas das
variáveis de acesso definidas na variável DATABASES, do arquivo settings.py, para o container.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
docker run -d -p 3306:3306 --name=ecommerce-mysql-container -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=ecommerce_database ecommerce-db
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Rodar as migrations:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 manage.py migrate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Instalar mysqlclient

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
pip install mysqlclient
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) pkg-config --> conferir documentação do erro (!)
--> sudo apt-get install python3-dev default-libmysqlclient-dev build-essential pkg-config

========================================== CRIANDO PRIMEIRA APLICAÇÃO ==========================================

(!) De forma resumida, todas as aplicações (componentes reutilizáveis tipo os de React), que estão registradas na
variável INSTALLED_APPS, do arquivo settings.py fazem parte do projeto.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ecommerce/ecommerce/settings.py

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
+    "products",
]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar o app:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
django-admin startapp products
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Editar o arquivo models.py:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ecommerce/products/models.py

from django.db Import models


'class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.IntegerField(default=0)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(
      upload_to="media/products", null=True, blank=True
    )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


1 - CharField:  para campos de texto curtos, passando a opção max_length para definir o tamanho máximo do campo;

2 - DecimalField: para campos de números decimais, passando as opções max_digits e decimal_places para definir
o número máximo de dígitos e o número de casas decimais, respectivamente;

3 - IntegerField: para campos de números inteiros, passando a opção default para definir um valor padrão para o campo;

4 - TextField: para campos de texto longos;

5 - DateTimeField: para campos de data e hora, passando as opções auto_now_add e auto_now para definir que o campo deve
ser preenchido automaticamente com a data e hora atual quando o objeto for criado e atualizado, respectivamente;

6 - ImageField: para campos de imagens, passando as opções upload_to para definir o diretório em que as imagens serão
salvas, null=True para permitir que o campo seja nulo e blank=True para permitir que o campo seja vazio.


--> Instalar biblioteca Pillow para utilizar o campo ImageFiled do Django:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python -m pip install Pillow
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Rodar novamente o servidor:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 manage.py runserver
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar e rodar as migrations:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 manage.py makemigrations
python3 manage.py migrate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# INSERINDO DADOS NO DB PELO TERMINAL:

--> Abrir o terminal do Django:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 manage.py shell
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Importar o model:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from products.models Import Product
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Criar um objeto:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
moka = Product(name="Moka - 6 xícaras", price=199.99, amount=10, description="Cafeteira italiana, serve 6 xícaras, não elétrica")
moka.save()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================== DJANGO ADMIN ==========================================

É uma ferramenta que permite a criação de um painel de administração para o projeto. Com ele, é possível visualizar,
criar, editar e excluir objetos do banco de dados (o famoso CRUD), sem a necessidade de escrever código.

# CRIANDO SUPERUSUÁRIO:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
python3 manage.py createsuperuser
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# REGISTRANDO O MODELO:

--> Abrir o arquivo admin.py:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ecommerce/products/admin.py
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Adicionar o código:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from django.contrib 'import admin
from products.models 'import Product
from products.models 'import Customer # Modelo criado no exercício de fixação


admin.site.register(Product)
admin.site.register(Customer)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Para alterar o cabeçalho do painel adicionar a seguinte linha:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
admin.site.site_header = "Novo nome do cabeçalho"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Para alterar o nome dos objetos implemente a seguinte função no arquivo ecommerce/products/models.py:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def __str__(self):
  return f'{self.name} - {self.price}'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~