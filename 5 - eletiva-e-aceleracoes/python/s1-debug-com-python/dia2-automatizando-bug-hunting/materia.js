====================================== DOCTESTS =======================================

Doctests se baseiam na capacidade de criar exemplos em docstrings (strings de documentação).
O módulo doctest, que já vem com o Python, roda todos os exemplos encontrados em docstrings
como se fossem testes, garantindo que funcionam.

VANTAGENS:

1 - Fornecer uma forma fácil e rápida de, ao mesmo tempo, criar testes e documentar como uma
função deve ser usada, já que a documentação e os testes estão no mesmo lugar.

2 - Facilitar o desenvolvimento orientado a testes (TDD), visto que os exemplos ficam logo na
função, dispensando a necessidade de outro arquivo ou a criação de uma suíte de testes complexa.

(!) Eles são mais adequados para testar funções simples que tenham uma entrada e uma saída bem
definidas, e não são tão bons para testes mais complexos ou para testar funções que dependem de
dados externos ou aleatórios.

====================================== CONFIGURANDO DOCTESTS =======================================

Os doctests usam a sintaxe de exemplos baseada no REPL do Python: Você pode indicar expressões como
colocaria no REPL, precedidas de >>> e um espaço, e colocar a saída na linha posterior.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def mean(numbers):
    """
    Calcula a média de uma lista de números.

    >>> my_list = [1, 2, 3, 4, 5]
    >>> mean(my_list)
    3.0
    >>> mean([2.5, 3.75, 1.25, 4])
    2.875
    >>> mean([])
    0

    """
    return sum(numbers) / len(numbers)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Com isso podemos perceber que, ao passar uma lista vazia (linha 10), temos um ZeroDivisionError,
pois len(numbers) é 0.

Podemos corrigir isso de duas formas:

1 - Corrigimos nossa função para verificar o tamanho da lista e retornar 0 caso seja uma lista vazia
(mais recomendável nesse caso).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def mean(numbers):
    """
    Calcula a média de uma lista de números.

    >>> my_list = [1, 2, 3, 4, 5]
    >>> mean(my_list)
    3.0
    >>> mean([2.5, 3.75, 1.25, 4])
    2.875
    >>> mean([])
    0

    """
    # Adicionamos as duas linhas abaixo. O resto continua igual.
    try:
        return sum(numbers) / len(numbers)
    except ZeroDivisionError:
        return 0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2 - Ajustamos nosso exemplo na docstring para esperar um erro (menos recomendável nesse caso, mas será
mostrado como fica para quando você precisar verificar erros em outros cenários).

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def mean(numbers):
    """
    Calcula a média de uma lista de números.

    >>> my_list = [1, 2, 3, 4, 5]
    >>> mean(my_list)
    3.0
    >>> mean([2.5, 3.75, 1.25, 4])
    2.875
    >>> mean([])
    Traceback (most recent call last):
    ...
    ZeroDivisionError: division by zero

    """
    return sum(numbers) / len(numbers)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) A constante Python Ellipsis, representada pelos três pontos (...), serve para indicar que existem
mais linhas na saída, mas que o conteúdo delas não importa para o exemplo (visto que vão variar a depender
de em qual computador o teste está sendo executado).

====================================== CONFIGURANDO PYTEST =======================================

1 - Garanta que está com seu ambiente virtual devidamente criado e ativado.
      Crie o ambiente virtual com o comando 'python -m venv .venv'.
      Ative o ambiente virtual com o comando source ''.venv/bin/activate'.
2 - Instale o Pytest com o comando 'pip install pytest==7.3.1'.
3 - Confirme que a instalação foi bem sucedida rodando o comando 'pytest --version'.

# CRIANDO UM TESTE:

(!) O Pytest procura automaticamente arquivos Python (com extensão .py) que comecem com test_ ou que terminem
com _test.py. O primeiro formato ajuda a identificar arquivos de teste, mas o segundo facilita na busca por
arquivos em ordem alfabética e facilita a visualização.

(!) Os testes em si, devem ser funções que comecem com o prefixo test_. 

# CRIANDO DOCTEST COM PYTEST

(!) O Pytest pode rodar, além dos testes que criamos nos arquivos, doctests. Para isso, basta incluir a flag
doctest-modules no comando de execução dos testes no terminal.

Comando: 'pytest --doctest-modules -vv'

====================================== FIXTURES =======================================

Fixtures são funções que rodam antes e/ou depois dos testes, geralmente criando um recurso que o teste precisa
para rodar ou fazendo uma limpeza após a execução do teste. É muito comum utilizar fixtures para criar dados
que serão utilizados por diversos testes.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import pytest


@pytest.fixture # Criamos a fixture por meio do decorador pytest.fixture
def my_list(): # Por padrão, o nome da fixture será o nome da função
    return [1, 2, 3] # Retorna o valor que a fixture possuirá


def test_a_simple_test():
    assert True


def test_sum(my_list): # Recebemos a fixture como parâmetro da função de teste
    assert sum(my_list) == 6 # Usamos a lista retornada pela fixture


def test_list_item_multiply(my_list): # Recebemos a mesma fixture aqui também
    assert [item * 3 for item in my_list] == [3, 6, 9]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== FIXTURES EM VÁRIOS ARQUIVOS =======================================

O pytest utiliza arquivos chamados conftest.py. Podemos ter um arquivo deste para cada sub-diretório, e as suas
definições valerão para todos os arquivos de teste do respectivo diretório.

# ESCOPO FIXTURE:

1 - Function (função): é inicializada a cada função de teste que a utiliza;
2 - Module (módulo): é inicializada uma vez para cada módulo de teste que a utiliza;
3 - Class (classe): é inicializada uma vez para cada classe de teste que a utiliza;
4 - Package (pacote): é inicializada apenas uma vez para cada diretório que contém arquivos de teste;
5 - Session (sessão): é inicializada apenas uma vez, no início da execução da suíte de testes. 

(!) Para mudar o escopo, basta passar o escopo desejado como argumento para o parâmetro scope do decorador
pytest.fixture, por exemplo @pytest.fixture(scope="module").

====================================== FIXTURES BUILTIN =======================================

# CAPSYS:

A fixture capsys é usada para capturar as saídas padrão e de erro em um teste. Com isso, é possível verificar
se a saída está correta ou fazer asserções nas mensagens de erro.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Sim, é só receber `capsys` como parâmetro em qualquer função de teste que o
# pytest faz o resto da magia acontecer
def test_print_to_stdout(capsys):
    print("Hello, world!")
    captured = capsys.readouterr()
    assert captured.out == "Hello, world!\n"  # print coloca \n automaticamente
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def test_error_to_stderr(capsys):
    Import sys
    sys.stderr.write("Error message\n")
    captured = capsys.readouterr()
    assert captured.err == "Error message\n"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# MONKEYPATCH:

A fixture monkeypatch, do pytest, é usada para alterar o comportamento de funções ou métodos, permitindo a
simulação de condições específicas para testes. Ela permite o acesso ao objeto “patch” que pode ser utilizado
para modificar objetos ou módulos importados, bem como variáveis de ambiente, argumentos de linha de comando e outros.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def my_function():
    return f"Você digitou {input('Digite algo: ')}!"


def test_my_function(monkeypatch):
    # Input recebe um parâmetro que mock_input não usa, por isso o _
    def mock_input(_):
        return "Python"

    # Trocamos a input do sistema pela nossa mock_input
    monkeypatch.setattr("builtins.input", mock_input)
    output = my_function()

    assert output == "Você digitou Python!"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# DIRETORIO TEMPORARIO:

A fixture tmp_path do pytest é usada para criar um diretório temporário em que um teste pode criar e
manipular arquivos. O pytest se encarrega de criar e limpar o diretório temporário automaticamente antes
e depois dos testes que utilizam a fixture.

tmp_path retorna um objeto pathlib.Path, que pode ser utilizado como uma string de caminho para um
diretório, bem como pode fazer mais coisas.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import json
Import os


def generate_output(content, path):
    with open(path, "w", encoding="utf-8") as file:
        file.write(json.dumps(content))


def test_generate_output(tmp_path):
    content = {"a": 1}
    output_path = tmp_path / "out.json"
    # O operador '/' funciona na linha anterior pois temp_path não é uma
    # string comum, mas sim um objeto Path

    generate_output(content, output_path)

    assert os.path.isfile(output_path)
    with open(output_path) as file:
        assert file.read() == '{"a": 1}'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== MARKERS =======================================

Os markers (marcadores) no Pytest são uma forma de marcar testes com atributos específicos que podem
ser usados para executar, filtrar ou pular testes. Os marcadores podem ser definidos usando a sintaxe
'@pytest.mark.nome_do_marker' no código de teste.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import time

Import pytest


@pytest.mark.slow
def test_slow_marker():
    time.sleep(4)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Você pode executar o comando pytest -m MARKEXPR, no qual MARKEXPR é uma expressão que adiciona
ou remove a seleção de um ou mais marcadores. Por exemplo, ao rodar pytest -m 'not slow' -vv são
executados todos os testes, menos os marcados como slow.

(!) É preciso informar ao Pytest que os marcadores existem adicionando o seguinte código no conftest.py:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def pytest_configure(config):
    config.addinivalue_line(
        "markers", "slow: marks tests as slow"
    )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~