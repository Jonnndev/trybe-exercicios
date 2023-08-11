========================================== TEMPLATES FLASK ==========================================


1 - O que é a API do Jinja2
2 - Jinja2.Template e Jinja2.BaseLoader
3 - Utilitários do Jinja2.
4 - Filtros customizados no Jinja2.
5 - Tratamento de exceções no Jinja2.

========================================== API JINJA2 ==========================================

# FUNCIONAMENTO:

1 - Carregamento do template:
O processo se inicia com o carregamento do template de uma fonte específica, como um arquivo, um
banco de dados ou mesmo uma string. Esse carregamento é realizado por meio de um “loader”, que tem
a função de localizar e carregar o conteúdo do template, podendo esse conteúdo estar armazenado em
uma simples variável ou um arquivo HTML.

2 - Compilação do template:
Após o carregamento, o Jinja2 compila o template em uma representação interna otimizada, conhecida
como código de template. Essa compilação transforma o template em uma estrutura de dados que o Jinja2
pode entender e processar de forma eficiente.

3 - Criação do ambiente:
O próximo passo é criar um ambiente Jinja2. O ambiente é responsável por fornecer a configuração global
e os recursos necessários para processar o template. Ele contém informações como os loaders disponíveis,
filtros personalizados, funções auxiliares e outras configurações.

4 - Renderização do template:
Após a configuração do ambiente, o Jinja2 utiliza o código do template e o contexto fornecido para
realizar a renderização. O contexto consiste em um dicionário de variáveis e seus respectivos valores,
que são utilizados durante a renderização para substituir as partes dinâmicas do template. Durante o
processo de renderização, o Jinja2 interpreta as expressões, tags e blocos específicos do Jinja2 presentes
no template, substituindo-os pelos valores correspondentes no contexto.

5 - Saída do resultado:
O resultado final da renderização é uma string que contém o conteúdo resultante. Esse resultado pode ser
retornado como uma resposta HTTP em um aplicativo web, gravado em um arquivo ou utilizado de outras formas,
dependendo do contexto de uso.

========================================== CLASSE JINJA2.TEMPLATE ==========================================

(!) Uma das principais classes na API do Jinja2. Ela representa um template carregado a partir de uma string
ou arquivo e fornece métodos para renderizá-lo com um contexto específico.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// arquivo.html

<!-- <!DOCTYPE html>
...
<body>
    <h1>{{ saudacao }}</h1> -->
    <h2>{{ informacao }}</h2>
    <p>{{ contexto }}</p>
<!-- </body>
</html> -->
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// template.py

'from jinja2 import Template

// Carrega um template a partir de um arquivo
template_file = open("template.html").read()
template = Template(template_file)

// Cria um contexto
data = {
    "saudacao": "Eu sou um template HTML",
    "informacao": "E essa é uma das formas de se passar múltiplas informações para o template",
    "contexto": "Isso é possível através da criação de um contexto",
}

// Renderiza o template com um contexto específico
output = template.render(data)

// Imprime o resultado
print(output)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================== CLASSE JINJA2.BASELOADER ==========================================

(!) É uma classe base abstrata na biblioteca Jinja2 que define a Interface básica para os loaders de templates.
Ela é usada para carregar os templates de suas respectivas origens, como sistema de arquivos, banco de dados,
rede, entre outros.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// dict_loader.py

'from jinja2 import BaseLoader, Environment

'class DictLoader(BaseLoader):
    def __init__(self, templates):
        self.templates = templates

    def get_source(self, environment, template):
        if template in self.templates:
            source = self.templates[template]
            return source, None, lambda: False
        return

// Configurando o loader personalizado
templates = {

  'index.html': '<h1>Um template usando {{ nome }}!</h1>',

  'about.html': '<p>Este é um exemplo de template Jinja2.</p>'

}

loader = DictLoader(templates)

// Criando um ambiente Jinja2
environment = Environment(loader=loader)


// Carregando um template e renderizando com um contexto
template = environment.get_template('index.html')

output = template.render(nome='BaseLoader')

print(output)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# ENVIRONMENT:

É uma parte fundamental da API do Jinja2. Ela representa o ambiente de execução do Jinja2 e contém as
configurações globais e os recursos necessários para processar templates.

Essa classe pode receber alguns parâmetros de inicialização, dentre eles temos o loader. Através do
parâmetro loader, é possível especificar o carregador (loader) que será usado para carregar os templates.

========================================== FILTROS CUSTOMIZADOS ==========================================

No Jinja2, existem funções embutidas que permitem transformar ou modificar valores dentro dos templates,
essa funções são chamadas de filtros


capitalize:
Converte o primeiro caractere de uma string em maiúsculo e os demais em minúsculo. Exemplo: {{ name|capitalize }}

upper:
Converte todos os caracteres de uma string em maiúsculo. Exemplo: {{ text|upper }}

lower:
Converte todos os caracteres de uma string em minúsculo. Exemplo: {{ text|lower }}

length:
Retorna o tamanho de uma sequência (string, lista, etc.). Exemplo: {{ my_list|length }}

default:
Define um valor padrão para ser usado caso a variável seja nula ou vazia. Exemplo: {{ variable|default("Valor padrão") }}

truncate:
Trunca uma string para um número específico de caracteres. Exemplo: {{ text|truncate(20) }}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// arquivo.html

// <!DOCTYPE html>
// <html lang="pt-br">
// <head>
//     <meta charset="UTF-8">
//     <title>Filtros</title>
// </head>
// <body>
//     <p>{{ name|capitalize }}</p>
//     <p>{{ to_upper|upper }}</p>
//     <p>{{ to_lower|lower }}</p>
//     <p>{{ my_list|length }}</p>
//     <p>{{ variable|default("Valor padrão") }}</p>
//     <p>{{ text|truncate(20) }}</p>
// </body>
// </html>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'from jinja2 import Environment, FileSystemLoader

// Configurando um loader
loader = FileSystemLoader('filters')

// Criando um ambiente Jinja2
environment = Environment(loader=loader)

// Carrega um template a partir de um arquivo
template = environment.get_template('filters.html')


// Cria um contexto
data = {
    'name': 'a primeira letra vai ficar maiúscula',
    'to_upper': 'todas as letras vão ficar maiúsculas',
    'to_lower': 'TODAS AS LETRAS VÃO FICAR MINÚSCULAS',
    'my_list': [0, 1, 2, 3, 4, 5],
    'text': 'Esse texto irá ser truncado'
}

// Carregando um template e renderizando com um contexto
output = template.render(data)

// Imprime o resultado
print(output)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========================================== TRATAMENTO EXCEÇÕES ==========================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

'from jinja2 import TemplateNotFound, Environment
'from dict_loader import DictLoader

templates = {
    'index.html': '<h1>Um template sem exceções!</h1>',
    'about.html': '<p>Este é um exemplo de template Jinja2.</p>'
}

try:
    loader = DictLoader(templates)
    environment = Environment(loader=loader)
    template = environment.get_template('random.html')
except TemplateNotFound:
    print('Erro: Template não encontrado')
except Exception as e:
    print("Erro: ", str(e))
else:
    print(template.render())
finally:
    print("Fim do programa.")

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) O erro cannot unpack non-iterable NoneType object é disparado quando tentamos atribuir a algo um
objeto do tipo None.