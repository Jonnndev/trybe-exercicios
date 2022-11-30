// REDUX NO REACT
// No caso do React, a biblioteca React Redux é quem faz essa conexão e pode ser instalada em sua aplicação por meio do comando:
npm install react - redux

// ====== CRIANDO STORE E REDUCER ======

// ./src/redux/index.js
import { createStore } from 'redux';

const store = createStore();

export default store;

// Para conseguirmos visualizar as informações do nosso estado global, vamos também adicionar a biblioteca Redux Devtools. Para instalá-la, utilize o comando abaixo:
npm install--save @redux-devtools / extension
