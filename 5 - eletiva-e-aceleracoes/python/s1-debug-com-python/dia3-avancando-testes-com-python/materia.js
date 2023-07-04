====================================== UNITEST MOCKS  ======================================

O módulo unittest é uma biblioteca de testes unitários nativa do Python. Ele é inspirado no JUnit,
um framework de testes para Java. O unittest é uma ferramenta muito poderosa, mas também é um pouco
mais complexa que o Pytest. Por isso, vamos aprender a utilizá-la aos poucos.

Para criar um mock com o unittest, é preciso utilizar a classe unittest.mock.Mock. Essa classe é muito
parecida com a fixture monkeypatch do Pytest, mas um pouco mais complexa.

(!) O teste que implementamos funciona, mas ele não é muito bom. Ele depende de um arquivo externo, e
isso pode causar problemas. Por exemplo, se o arquivo person_data.json for apagado ou mesmo alterado,
o teste vai falhar.

(!) Para resolver esse problema, criaremos um mock para a função read_json_file, ou seja, um objeto
que se comporta como a função read_json_file. Para isso, serão utilizadas a classe 'unittest.mock.Mock'
e a função patch.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# arquivo: testes/teste_analyzer.py

# Passo 1
from unittest.mock import Mock, patch

from analyzer Import analyze_json_file


def test_analyze_json_file():
    # Passo 2
    mock_read_json_file = Mock(return_value={"nome": "Maria", "idade": 31})
    fake_file_path = "invalid.json"

    # Passo 3
    with patch("analyzer.read_json_file", mock_read_json_file):
        result = analyze_json_file(fake_file_path)

    assert result == "A pessoa de nome Maria tem 31 anos de idade."
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1 - Primeiro, foram importadas a classe Mock e a função patch do módulo unittest.mock.
2 - Depois, foi criado um mock para a função read_json_file com a classe Mock.
    Com o parâmetro return_value=, foi definido que esse mock sempre retornará um dicionário com os dados da pessoa.
3 - Por fim, a função patch foi utilizada para substituir a função read_json_file dentro do módulo analyzer pelo mock criado.
    Assim, quando a função analyze_json_file for executada, ela utilizará o mock no lugar da função read_json_file.

(!) Até o momento, não há muita coisa diferente do que já havia sido feito com a fixture monkeypatch, do Pytest.
Mas o unittest tem uma vantagem: ele nos permite averiguar se um mock foi chamado, o que é muito útil para testar
funções que chamam outras funções.

(!) Para averiguar se um mock foi chamado, utilizaremos o método assert_called_with do mock:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# arquivo: testes/teste_analyzer.py
from unittest.mock Import Mock, patch

from analyzer Import analyze_json_file


def test_analyze_json_file():
    mock_read_json_file = Mock(return_value={"nome": "Maria", "idade": 31})
    fake_file_path = "invalid.json"

    with patch("analyzer.read_json_file", mock_read_json_file):
        result = analyze_json_file(fake_file_path)
    
    assert result == "A pessoa de nome Maria tem 31 anos de idade."
    mock_read_json_file.assert_called_with(fake_file_path) <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== COBERTURA DE TESTES ======================================

A cobertura de testes é uma métrica crucial que nos auxilia a compreender quais partes do código
estão sendo testadas e é fundamental para assegurar que todas essas áreas sejam testadas.

(!) Para calcular a cobertura de testes do nosso código, será utilizado o pacote pytest-cov. 

--> pip install pytest-cov==4.0.0

--> python3 -m pytest --cov

====================================== DAODS FALSOS ======================================

Para criar dados falsos, você pode usar a biblioteca Faker. Ela é muito útil porque permite
que a criação de dados estruturados (nome, e-mail, senha, endereço, cartão de crédito, etc.)
falsos, de forma simples e rápida.

Para instalar a biblioteca Faker, você pode usar o comando 'pip install faker==18.9.0' no terminal.
Depois da instalação, você deve importá-la no seu código usando o comando 'from faker import Faker'.

Em seguida, você pode usar o método name() da biblioteca Faker para criar nomes falsos.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from faker Import Faker


faker = Faker(locale='pt_BR')

print(faker.name())
print(faker.name())
print(faker.name())
print(faker.name())
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# PREVSIBILIDADE COM SEED:

A biblioteca Faker permite a definição de uma seed para os dados falsos que você cria.

(!) A seed (semente) é um valor que serve como base para a geração de números aleatórios.
Se a mesma seed for usada, teremos sempre a mesma sequência de resultados. Por padrão, o
Faker usa o timestamp atual do sistema e por isso cada execução resulta em valores diferentes. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from faker Import Faker


faker = Faker(locale='pt_BR')

Faker.seed(0)  # repare que usamos a classe 'Faker', e não a instância 'faker'

# O restante do código permanece igual
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# TIPOS DE INFORMAÇÃO:

faker.email(): cria um e-mail falso;
faker.password(): cria uma senha falsa;
faker.address(): cria um endereço falso;
faker.credit_card_number(): cria um número de cartão de crédito falso;
faker.phone_number(): cria um número de telefone falso;
faker.company(): cria um nome de empresa falso;
faker.date(): cria uma data falsa;
faker.cpf(): cria um CPF falso.

====================================== PYTEST COM FAKER ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
def test_faker_email(faker):
    fake_email = faker.email()
    assert isinstance(fake_email, str)
    assert '@' in fake_email
    assert '.' in fake_email
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# GARANTINDO MESMO RESULTADOS E CONIG LOCALE:

Diferentemente do uso “puro” do Faker, a fixture faker já possui a seed configurada por padrão com o
valor 0, garantindo que os dados gerados sejam sempre os mesmos.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Import pytest


@pytest.fixture(scope="session", autouse=True)
def faker_seed():
    return "Trybe"


@pytest.fixture(scope="session", autouse=True)
def faker_locale():
    return "pt_BR"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~