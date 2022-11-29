// INTRODUÇÃO AO REDUX

// CIRANDO ESTADO GLOBAL
// Para criar a store da sua aplicação, você deverá usar a função createStore() do Redux, passando como argumento uma função reducer

// Criando a nossa store:
const store = createStore(reducer);

// REDUCER
// O reducer é a função responsável por escrever no estado global. Ela tem uma “assinatura” bem definida: deverá receber um state e uma action como parâmetro e retornar um novo estado ou o estado anterior:

// Criando uma função Reducer
const reducer = (state, action) => state

// ACTION

// Uma action nada mais é do que um objeto que possui obrigatoriamente a chave type:

// Action para Incrementar nosso contador:
const action = {
  type: 'INCREMENT_COUNTER'
};

// Definimos o type da action como sendo a ação que será enviada para o reducer para alterar o estado. No caso acima, a action irá enviar a ação INCREMENT_COUNTER para o reducer. Assim que receber essa action, o reducer será responsável por atualizar o estado global.

// DISPATCH()

// Para enviar uma action para o reducer é necessário passá-la como argumento para a função dispatch().
dispatch({ type: 'INCREMENT_COUNTER' });

// GETSTATE()

// Para ler o estado global, o objeto store disponibiliza a função getState(). Essa função retorna o estado global:
const state = store.getState()

// SUBSCRIBE()
// Essa função recebe um callback que irá ser chamado toda vez que o estado global sofrer alterações:
store.subscribe(() => {
  console.log(`O novo estado global é ${store.getState()}`)
})

// IMPORTANTE <<<<<
// Apesar do deprecation warning, o createStore não está deprecado e não há planos de retirada dessa API da biblioteca. De forma opcional, se você preferir remover esse warning, basta inserir essa linha na importação:

import { legacy_createStore as createStore } from 'redux';
