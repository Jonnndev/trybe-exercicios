============================================== FORMS DJANGO ==============================================

Um formulário pode ser criado para receber e validar dados que chegarão em uma requisição. Isso possibilita a
criação ou atualização de registros no banco de dados de forma mais confiável.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/forms.py
from django Import forms


'class CreateMusicForm(forms.Form):
  name = forms.CharField(max_length=50)
  recorded_at = forms.DateField()
  length_in_seconds = forms.IntegerField()

'class CreatePlaylistForm(forms.Form):
  name = forms.CharField(max_length=50)  
  is_active = forms.BooleanField()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# FORMS VINCULADOS x NÃO VINCULADOS:

(!) Um formulário é considerado como não vinculado caso seja instanciado sem nenhum dado, caso contrário,
ele é vinculado. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from playlists.forms Import CreatePlaylistForm


form = CreatePlaylistForm()
form.is_bound // retorna False

form = CreatePlaylistForm({"name":"Playlist de Estudo", "is_active": True})
form.is_bound // retorna True
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

============================================== VALIDAÇÃO DE DADOS ==============================================

A classe Form implementa o método is_valid(), que retorna um booleano para informar se os dados do formulários
são válidos ou não.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from playlists.forms Import CreatePlaylistForm

form = CreatePlaylistForm({}) # formulário instanciado com um dicionário vazio
form.is_valid() // retorna False
form.errors // retorna {'name': ['Este campo é obrigatório.'], 'is_active': ['Este campo é obrigatório.']}

form_2 = CreatePlaylistForm({"name":"Essa playlist tem um nome com mais de cinquenta caracteres, o que você acha que vai acontecer?", "is_active": True})
form_2.is_valid() // retorna False
form_2.errors // retorna {'name': ['Certifique-se de que o valor tenha no máximo 50 caracteres (ele possui 94).']}

form_3 = CreatePlaylistForm({"name":"Playlist de Estudo", "is_active": True})
form_3.is_valid() // retorna True
form_3.errors // retorna {}

unbound_form = CreatePlaylistForm() #  formulário não vinculado
unbound_form.is_valid() //  retorna False
unbound_form.errors //  retorna {} Esse tipo de formulário não passa por validação
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# VALIDAÇÕES PERSONALIZADAS:

EXEMPLO: Considere que a duração de uma música, length_in_seconds, precisa ser um número inteiro entre 1 e
3600 segundos. A função de validação precisa levantar uma exceção ValidationError, que será implementada no
módulo django.core.exceptions e que receberá como parâmetro a mensagem de erro que será exibida caso a
validação falhe.

--> Criar uma função que cheque a validação desejada:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/validators.py

'from django.core.exceptions import ValidationError


def validate_music_length(value):
    if not 1 >= value >= 3600:
        raise ValidationError("A duração da música deve ser um número"
                              " inteiro entre 1 e 3600 segundos. O valor "
                              "{value} não é válido.")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> Indicar no campo do formulário que a função de validação deve ser executada:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/forms.py

'from django import forms
from playlists.validators Import validate_music_length


'class CreateMusicForm(forms.Form):
    name = forms.CharField(max_length=50)
    recorded_at = forms.DateField()
    length_in_seconds = forms.IntegerField(validators=[validate_music_length])
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Agora, se você tentar criar uma música com uma duração menor que 1 ou maior que 3600 segundos, o
formulário não será considerado válido e a mensagem de erro será exibida. 

============================================== RENDERIZANDO FORMS TEMPLATES ==============================================

# NOVO REGISTRO A PARTIR DE UM FORMS:

Uma vez que você já possui um formulário que tem dados válidos, é preciso repassar esses dados para o modelo e, assim, criar
o novo registro no banco. Para isso, depois de usar o método is_valid() para checar a integridade dos dados passados, você
pode usar o atributo cleaned_data para que um dicionário com todos os dados sejam retornados para você.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'from playlists.forms import CreateMusicForm
'from playlists.models import Music

form = CreateMusicForm({"name":"Be brave, Dev", "recorded_at":"2023-06-05", "length_in_seconds":180})

if form.is_valid():
    data = form.cleaned_data // data será igual à {"name":"Be brave, Dev", "recorded_at":"2023-06-05", "length_in_seconds":180}
    Music.objects.create(**data) // criando um novo registro no banco com os dados do formulário
    // Music.objects.create(**data) é o mesmo que Music.objects.create(name="Be brave, Dev", recorded_at="2023-06-05", length_in_seconds=180)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# FORMS E TEMPLATES:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//<!-- playlists/templates/base.html -->

// <!DOCTYPE html>
// <html lang="pt-br">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>{% block title %} {% endblock %}</title>
// </head>
// <body>
//     {% block content %} {% endblock %}    
// </body>
// </html>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <!-- playlists/templates/music.html -->

{% extends 'base.html' %}

{% block title %}
    Formulário para Nova Música
{% endblock %}

{% block content %}
    {{form}}
{% endblock %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/views.py

'from django.shortcuts import render
'from playlists.forms import CreateMusicForm


def music(request):
    form = CreateMusicForm()
    context = {"form": form}
    return render(request, "music.html", context)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

============================================== PERSONALIZANDO FORMS ==============================================

(!) Podemos usar o parâmetro labels para indicar qual deverá ser o nome de cada um dos campos. Ainda, podemos usar
o parâmetro initial para sugerir um dado inicial caso faça sentido para aquele campo.

(!) também é possível usar o parâmetro help_text para indicar uma frase de auxílio no preenchimento do campo. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/forms.py

'from django import forms
'from playlists.validators import validate_music_length, validate_name


'class CreateMusicForm(forms.Form):
    name = forms.CharField(
        max_length=50,
        validators=[validate_name],
        label="Nome da música",
    )
    recorded_at = forms.DateField(
        label="Data de gravação",
        initial="2023-07-06",
    )
    length_in_seconds = forms.IntegerField(
        validators=[validate_music_length],
        label="Duração em segundos",
    )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Um widget nada mais é do que uma representação HTML mais elaborada de um campo input.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/forms.py

'from django import forms
'from playlists.validators import validate_music_length, validate_name


'class CreateMusicForm(forms.Form):
    name = forms.CharField(
        max_length=50,
        validators=[validate_name],
        label="Nome da música",
    )
    recorded_at = forms.DateField(
        label="Data de gravação",
+         widget=forms.DateInput(attrs={"type": "date"}),
        initial="2023-07-06",
    )
    length_in_seconds = forms.IntegerField(
        validators=[validate_music_length],
        label="Duração em segundos",
    )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) O parâmetro attrs passado para o widget é usado para atribuir um conjunto chave: valor à tag que está sendo inserida no template.

============================================== DADOS DO TEMPLATE PARRA VIEW ==============================================

O primeiro passo é justamente envolver o formulário em uma tag form, indicando o método HTTP e ação que será realizada quando
o formulário for submetido.

Adicionar uma tag input capaz de submeter o formulário (type: submit) e adicionar {% csrf_token %} logo após a tag form.

(!) A tag de template {% csrf_token %} é uma estratégia de segurança do framework contra Cross-site Request Forgery.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <!-- playlists/templates/music.html -->

// {% extends 'base.html' %}

// {% block title %}
//     Formulário para Nova Música
// {% endblock %}

// {% block content %}
//     <form method="post" action="">
//         {% csrf_token %}
//         {{form.as_p}}
//         <input type="submit" value="Submeter formulário">
//     </form>
// {% endblock %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) É preciso indicar qual função da camada view receberá os dados submetidos pela requisição (request).

(!) O parâmetro request possui atributos e métodos. Todos os dados que são submetidos por meio de formulários
podem ser visualizados no atributo POST, na forma de um dicionário. Entretanto, se os dados forem enviados no
body da requisição, eles podem ser acessados no atributo body na forma de bytes. Além disso, também é possível
identificar o método HTTP utilizado por meio do atributo method.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// <!-- playlists/templates/music.html -->

// {% extends 'base.html' %}

// {% block title %}
//     Formulário para Nova Música
// {% endblock %}

// {% block content %}
// +    <form method="post" action="{% url 'musics-page' %}">
//         {% csrf_token %}
//         {{form.as_p}}
//         <input type="submit" value="Submeter formulário">
//     </form>
// {% endblock %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# CRIANDO NOVO REGISTRO:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/views.py

# ...
'from playlists.models import Music


def index(request):
    context = {"musics": Music.objects.all()}
    return render(request, "home.html", context)

# ...
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// <!-- playlists/templates/home.html -->

// {% extends 'base.html' %}

// {% block title %}
//     Home Page
// {% endblock %}

// {% block content %}
//     {% for music in musics %}
//         <p>{{music}}</p>
//     {% endfor %}

//     <a href="{% url 'musics-page' %}">Criar nova música</a>
// {% endblock %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  playlists/urls.py

'from django.urls import path
'from playlists.views import music, singer, index


urlpatterns = [
    path("", index, name="home-page"),
    path("musics/", music, name="musics-page"),
    path("singers/", singer, name="singers-page"),
]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

============================================== FORMULÁRIOS DE MODELOS ==============================================

# MODELFORM:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/forms.py

'class CreateMusicModelForm(forms.ModelForm):
    'class Meta:
        model = Music
        fields = "__all__"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// playlists/views.py

def create_music(request):
    // form = CreateMusicForm()
    form = CreateMusicModelForm()

    if request.method == "POST":
        // form = CreateMusicForm(request.POST)
        form = CreateMusicModelForm(request.POST)

        if form.is_valid():
            Music.objects.create(**form.cleaned_data)
            return redirect("home-page")

    context = {"form": form}

    return render(request, "index.html", context)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// # playlists/forms.py

'class CreateMusicModelForm(forms.ModelForm):
    'class Meta:
        model = Music
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["name"].label = "Nome da música"
        self.fields["recorded_at"].label = "Data de gravação"
        self.fields["recorded_at"].widget = forms.DateInput(
                attrs={"type": "date"})
        self.fields["recorded_at"].initial = "2023-07-06"
        self.fields["length_in_seconds"].label = "Duração em segundos"
        self.fields["singer"].label = "Artista"
        self.fields["singer"].widget = forms.Select(

            choices=[

                (singer.id, singer.name)

                for singer in Singer.objects.filter(name__contains="a")

            ]
        )

============================================== RELACIONAMENTO DE MODELOS ==============================================

--> 1:N

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// # playlists/models.py

'from django.db import models
'from playlists.validators import validate_music_length,


'class Music(models.Model):
    name = models.CharField(max_length=50)
    recorded_at = models.DateField()
    length_in_seconds = models.IntegerField(validators=[validate_music_length])
    singer = models.ForeignKey( // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Singer,
        on_delete=models.CASCADE,
        related_name="musics",
        default=2, // Se não houver o objeto com esse id em seu banco você terá um erro ao criar um objeto Music
    )

    def __str__(self):
        return self.name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


--> N:N

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// # playlists/models.py

'from django.db import models


'class Playlist(models.Model):
    name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    musics = models.ManyToManyField("Music", related_name="playlists") // <<<<<<<<<<<<<<<<<<

    def add_music(self, music):
        self.musics.add(music)
        self.save()
    
    def remove_music(self, music):
        self.musics.remove(music)
        self.save()

    def __str__(self):
        return self.name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~