======================================== TESTES EM FLASK ========================================

# UNITTEST:


1: Test fixture - refere-se a funções que são executadas antes e/ou depois dos testes, geralmente
criando um contexto necessário para a execução dos testes ou realizando tarefas de limpeza após a
conclusão dos mesmos. É comum utilizar fixtures para criar dados que serão utilizados por vários testes.

2: Test case - representa um caso de teste específico que verifica uma resposta particular para uma
determinada execução de uma função ou fluxo.

3: Test suite - consiste em coleções de casos de teste, podendo incluir outras suites de teste ou uma
combinação de ambas. As suites são utilizadas para agrupar testes que devem ser executados em conjunto
ou que possuem uma relação lógica entre si.

4: Test runner - é um componente responsável por orquestrar a execução dos testes e fornecer os resultados
ao usuário. O executor pode utilizar uma Interface gráfica, uma Interface textual ou retornar um valor
especial para indicar os resultados da execução dos testes.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import unittest
'from app import app
'from tests.mocks.home import project_cards

'class TestHome(unittest.TestCase):
    def setUp(self):
        test_app = app.test_client()
        self.response = test_app.get("/")

    def test_status_response(self):
        self.assertEqual(self.response.status_code, 200)

    def test_quantity_of_projects(self):
      self.assertTrue(project_titles[1] in self.response.text) // mock
      self.assertTrue(project_titles[2] in self.response.text)
      self.assertTrue(project_titles[3] in self.response.text)

    def test_unknown_route(self):
      response = app.test_client().get("/unknown") // mock
      self.assertEqual(response.status_code, 404)
      self.assertTrue(unknown_page['title'] in response.text)
      self.assertTrue(unknown_page['text'] in response.text)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# PYTEST:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'import pytest
'from app import app


@pytest.fixture
def client():
    return app.test_client()


@pytest.fixture
def response(client):
    return client.get("/")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'from src.tests.mocks.home import project_cards, project_titles

  def test_status_response(response):
    assert response.status_code == 200

  def test_quantity_of_projects(response):
    assert response.text.count(project_cards) == 3


  def test_projects_titles(response):
    assert project_titles[1] in response.text
    assert project_titles[2] in response.text
    assert project_titles[3] in response.text

  def test_unknown_route(client):
    response = client.get("/unknown")
    assert response.status_code == 404
    assert unknown_page['title'] in response.text
    assert unknown_page['text'] in response.text
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~