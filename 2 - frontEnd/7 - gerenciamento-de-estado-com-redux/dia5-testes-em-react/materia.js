// COMO TESTAR COM REDUX?

// Para garantir acesso à store nos testes de aplicações que usam o Redux, podemos criar uma função auxiliar chamada renderWithRedux:

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { reducer } from './redux/reducers/reducer'

// const renderWithRedux = (
//   component,
//   {
//     initialState,
//     store = createStore(reducer, initialState)
//   } = {},
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   };
// };

// A função renderWithRedux recebe dois parâmetros:

// component: Deve receber o componente que será renderizado para o teste;
// { initialState, store = createStore(reducer, initialState) }: O segundo parâmetro é um objeto desconstruído:
// initialState: Um objeto que permite você controlar o estado inicial do redux no ambiente de testes, definindo um valor específico para ele.
// store: Cria uma store customizada para o ambiente de testes, se necessário. Essa chave recebe um valor default, portanto, se nenhuma store for definida, a função irá criar uma nova store com o reducer importado e o initialState definido acima.

// ====================== TESTANDO OS VALORES DA STORE ======================

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createStore, combineReducers } from 'redux';
import counterReducer from './redux/reducers/counterReducer';

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(combineReducers({ counterReducer }), initialState),
  } = {}
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});


test('A página deve renderizar dois botões e o número "0"', () => {
  renderWithRedux(<App />);
  const buttonAdicionar = screen.queryAllByRole('button');

  expect(buttonAdicionar.length).toBe(2);
  expect(screen.getByText('0')).toBeInTheDocument();
});

test('Com o valor padrão do reducer, os botões devem incrementar os valores corretamente', () => {
  renderWithRedux(<App />);

  const buttons = screen.queryAllByRole('button');
  expect(buttons.length).toBe(2);

  expect(screen.getByText('0')).toBeInTheDocument();

  userEvent.click(buttons[0]);
  expect(screen.getByText('1')).toBeInTheDocument();

  userEvent.click(buttons[1]);
  expect(screen.getByText('6')).toBeInTheDocument();
})

test('Iniciando o estado global com um valor personalizado, os botões devem incrementar os valores corretamente', () => {
  const initialState = {
    counterReducer: {
      count: 5,
    }
  }
  renderWithRedux(<App />, { initialState });

  const buttons = screen.queryAllByRole('button');
  expect(buttons.length).toBe(2);

  expect(screen.getByText('5')).toBeInTheDocument();

  userEvent.click(buttons[0]);
  expect(screen.getByText('6')).toBeInTheDocument();

  userEvent.click(buttons[1]);
  expect(screen.getByText('11')).toBeInTheDocument();
})

// ====================== TESTES ASSÍNCRONOS ======================

// Para isso, basta adicionarmos o thunk como terceiro argumento no createStore() da nossa função renderWithRedux:

// src/helpers/renderWithRedux.js
import { createStore, applyMiddleware } from 'redux'; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import { reducer } from './redux/reducers/reducer'

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      reducer,
      initialState,
      applyMiddleware(thunk) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    ),
  } = {}
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

export default renderWithRedux;

// ====================== TESTES COM ROTAS EM REDUX ======================
// renderWithRouterAndRedux: <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import { render } from '@testing-library/react';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

// import { reducer } from './redux/reducers/reducer'

// const renderWithRouterAndRedux = (
//   component,
//   {
//     initialState = {},
//     store = createStore(reducer, initialState, applyMiddleware(thunk)),
//     initialEntries = ['/'],
//     history = createMemoryHistory({ initialEntries }),
//   } = {},
// ) => ({
//   ...render(
//     <Router history={history}>
//       <Provider store={store}>
//         {component}
//       </Provider>
//     </Router>,
//   ),
//   store,
//   history,
// });

// initialEntries:
// Essa chave deve receber como valor um array contendo a rota que se deseja testar. Por exemplo, caso você queira que o componente seja renderizado diretamente na rota /login, devemos passar o valor 

//initialEntries: ['/login'];
// Caso nenhum valor seja passado aqui, o componente irá renderizar na rota default '/'.

// history: Essa chave utiliza a função createMemoryHistory para criar um novo histórico de navegação para ser utilizado durante o teste.

// ======= CRIANDO FUNÇÃO AUXILIAR

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createStore } from 'redux';
import userReducer from './redux/reducers/userReducer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(userReducer, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={history}>
      <Provider store={store}>
        {component}
      </Provider>
    </Router>,
  ),
  history,
});

// ======= TESTANDO ROTA

test('Ao acessar a rota /profile a partir da Home, o nome da pessoa deverá ser renderizado', () => {
  renderWithRouterAndRedux(<App />);

  const nameInput = screen.getByRole('textbox');
  expect(nameInput).toBeInTheDocument();
  userEvent.type(nameInput, 'Tryber');
  expect(nameInput.value).toBe('Tryber');

  const loginButton = screen.getByRole('button');
  userEvent.click(loginButton);

  expect(screen.getByText('Boas vindas, Tryber')).toBeInTheDocument();
});

// Nesse primeiro teste, testamos o que é esperado pela pessoa usuária: que ela digite um nome válido no input e clique no botão. Dessa forma ela será direcionada para a página contendo as boas vindas e o seu nome.

// ======= TESTANDO ROTA /PROFILE DIRETO NA URL

test('Ao acessar diretamente a rota /profile, o nome da pessoa não pode ser renderizado', () => {
  const initialEntries = ['/profile']; //<<<<<<<<<<<<<<<<<<<<

  renderWithRouterAndRedux(<App />, { initialEntries }); //<<<<<<<<<<<<<<<<<<<<

  expect(screen.queryByText('Boas vindas')).not.toBeInTheDocument();
  expect(screen.getByText('Você precisa realizar o login')).toBeInTheDocument();
});

// ======= TESTANDO ROTA /PROFILE ALTERANDO ESTADO GLOBAL

test('Ao acessar diretamente a rota /profile e alterando o estado global, o nome da pessoa deve ser renderizado', () => {
  const initialEntries = ['/profile'] //<<<<<<<<<<<<<<<<<<<<
  const initialState = { userName: 'Tryber' } //<<<<<<<<<<<<<<<<<<<<

  renderWithRouterAndRedux(<App />, { initialState, initialEntries });

  expect(screen.queryByText('Você precisa realizar o login')).not.toBeInTheDocument();
  expect(screen.getByText('Boas vindas, Tryber')).toBeInTheDocument();
});