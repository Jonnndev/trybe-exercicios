// ASSINCRONICIDADE NO REDUX

npm install redux - thunk

// Para habilitar o uso do redux-thunk na sua aplicação, é preciso fazer uso da função applyMiddleware() do Redux:

// arquivo em que a redux store é criada
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '/path/to/your/root/reducer';

// ...
const store = createStore(reducer, applyMiddleware(thunk));
// ...

// Para usar o redux-thunk junto com o Redux Devtools, é preciso passar o applyMiddleware(thunk) como parâmetro para a função composeWithDevTools, como no exemplo a seguir:

// arquivo em que a redux store é criada
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '/path/to/your/root/reducer';
import { composeWithDevTools } from '@redux-devtools/extension';

// ...
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))); //<<<<<<<<<<<<<<<<<<<
// ...

// IMPORTANTE -> thunk action creator
// Até agora, ao criar uma action creator, essa função deveria retornar sempre um objeto (action). Com redux-thunk, você consegue definir uma action creator que retorna uma função em vez de retornar um objeto - tecnicamente o nome dessa função é thunk action creator.

// Na função que é retornada pelo thunk action creator você poderá realizar uma operação assíncrona. Uma vez finalizada a operação, você conseguirá enviar uma action com os dados obtidos por ela, da mesma forma que tem feito até então.

// No exemplo abaixo, temos duas actions: REQUEST_MOVIES_STARTED E RECEIVE_MOVIES. A primeira deve ser disparada no momento em que a api é chamada, enquanto a segunda apenas após o recebimento dos dados assíncronos. Ambas são disparadas dentro do thunk action creator:

//src/redux/actions/index.js

// action creator
const requestMoviesStarted = () => ({
  type: 'REQUEST_MOVIES_STARTED',
});

// action creator
const receiveMovies = (movies) => ({
  type: 'RECEIVE_MOVIES',
  movies,
});

// thunk action creator: deve retornar uma função
export function fetchMovies() {
  return (dispatch, _getState) => {
    dispatch(requestMoviesStarted()); // dispatch da action 'REQUEST_MOVIES_STARTED' 
    return fetch('alguma-api-qualquer.com')
      .then((response) => response.json())
      .then((movies) => dispatch(receiveMovies(movies))); // dispatch da action 'RECEIVE_MOVIES'
  };
}

// No componente:

//src/components/Movies.js

import { fetchMovies } from './redux/actions';

// ...
class Movies extends Component {
  // ...
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies()); // enviando a action fetchMovies
  }
  // ...
}
// ...
export default connect()(Movies)
