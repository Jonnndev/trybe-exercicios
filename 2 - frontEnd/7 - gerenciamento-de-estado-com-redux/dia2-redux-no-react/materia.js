// REDUX NO REACT
// No caso do React, a biblioteca React Redux é quem faz essa conexão e pode ser instalada em sua aplicação por meio do comando:
npm install react - redux

// ====== CRIANDO STORE E REDUCER ======

// ./src/redux/index.js
import { legacy_createStore as createStore } from 'redux';

const store = createStore();

export default store;

// Para conseguirmos visualizar as informações do nosso estado global, vamos também adicionar a biblioteca Redux Devtools. Para instalá-la, utilize o comando abaixo:
npm install--save @redux-devtools / extension

// Construção do estado global
// ./src/redux/index.js
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

const INITIAL_STATE = { count: 0 };

const reducer = (state = INITIAL_STATE, action) => state;

const store = createStore(reducer, composeWithDevTools());

export default store;


// Lembra a biblioteca react-redux instalada anteriormente? Ela nos fornece um componente chamado Provider. Ele que proverá as informações da store para a nossa aplicação. Para isso, precisamos importá-lo no ./src/index.js e encapsular o componente App, passando a store como prop:
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// ====== Função mapStateToProps ======
const mapStateToProps = (state) => ({
  countState: state.count,
});

// ====== CONNECT ======
// import React from 'react';
import { connect } from 'react-redux';

// class App extends React.Component {
//   render() {
//     const { countState } = this.props;
//     return (
//       <div>
//         <h1>Contador</h1>
//         <h2>{ countState }</h2>
//         <button>Incrementa 1</button>
//         <button>Incrementa 5</button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   countState: state.count,
// });

export default connect(mapStateToProps)(App);

// ====== REDUCERS ======
// ./src/redux/reducers/counterReducer.js
const INITIAL_STATE = {
  count: 0,
};

function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

export default counterReducer;

// ====== ACTIONS & ACTION CREATOR ======
const action = {
  type: 'INCREMENT_COUNTER',
  payload: 10
}

// As actions creators são funções que criam e retornam uma action, evitando o trabalho de precisarmos digitar o objeto inteiro toda vez que formos chamar a action. Além disso, é uma boa forma de padronizarmos uma ação, evitando assim possíveis erros caso ela seja utilizada várias vezes.

// ====== ESCREVENDO NO ESTADO GLOBAL - DISPATCH- ======

// Quando temos um componente conectado, podemos acessar uma prop chamada dispatch. Precisamos utilizar essa função para chamar a action, a qual enviará a ação para o reducer que, por sua vez, realizará a alteração no estado global.
// import React from 'react';
// import './style.css';
// import { connect } from 'react-redux';
import { actionCreator } from './redux/actions';

// class App extends React.Component {
//   render() {
const { dispatch, countState } = this.props;
//     return (
//       <div>
//         <h1>Contador</h1>
//         <h2>{ countState }</h2>
        <button onClick={() => dispatch(actionCreator())}>Incrementa 1</button>
        <button onClick={() => dispatch(actionCreator(5))}>Incrementa 5</button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   countState: state.count,
// });

// export default connect(mapStateToProps)(App);

// ====== IMUTABILIDADE DO ESTADO ======
// como o estado é imutável, o reducer não consegue atualizar o valor do estado global. Quando o executamos, ele sobrescreve o estado.
// para não sobrescrever o estado utilizamos o spread operator
const INITIAL_STATE = {
  clicks: 0,
  count: 0,
};

function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return {
        ...state, //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        count: state.count + action.payload,
      };
    default:
      return state;
  }
}
export default counterReducer;

// ====== combineReducers ======

// O método combineReducers, como o próprio nome diz, é uma função que faz a junção de todos os reducers. Ela deve receber como parâmetro um objeto com todos os reducers que serão utilizados:
import { combineReducers } from 'redux';

combineReducers({
  reducer1,
  reducer2,
  reducer3,
  // ...
})

// Para fazermos uso do combineReducers precisamos informar à store que iremos utilizar os reducers combinados:

import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools());

export default store;

// ⚠️ Quando utilizamos o combineReducers, o estado global se torna um objeto em que as suas chaves são os reducers:
state = {
  reducer1: { ... },
  reducer2: { ... },
  reducer3: { ... },
}

// Logo, a função mapStateToProps criada no componente App também precisaria ser alterada, conforme abaixo:
const mapStateToProps = (state) => ({
  countState: state.counterReducer.count,
});