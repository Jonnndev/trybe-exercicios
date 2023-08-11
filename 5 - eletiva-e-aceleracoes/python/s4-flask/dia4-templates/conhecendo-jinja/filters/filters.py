from jinja2 import Environment, FileSystemLoader

# Configurando um loader
loader = FileSystemLoader('filters')

# Criando um ambiente Jinja2
environment = Environment(loader=loader)

# Carrega um template a partir de um arquivo
template = environment.get_template('filters.html')


# Cria um contexto
data = {
    'name': 'a primeira letra vai ficar maiúscula',
    'to_upper': 'todas as letras vão ficar maiúsculas',
    'to_lower': 'TODAS AS LETRAS VÃO FICAR MINÚSCULAS',
    'my_list': [0, 1, 2, 3, 4, 5],
    'text': 'Esse texto irá ser truncado'
}

# Carregando um template e renderizando com um contexto
output = template.render(data)

# Imprime o resultado
print(output)
