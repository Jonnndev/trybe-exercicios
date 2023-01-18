// O QUE SÃO HOOKS?

//  Todo e qualquer Hook sempre deverá ser uma função. Entretanto, os Hooks são funções especiais, uma vez que eles permitem enganchar funcionalidades aos componentes de função. 

// ======================================== useState ======================================== //

// permite que você utilize o estado do React.
// Exemṕlo de contador:

import React, { useState } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>Counter: {counter}</div>
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increase Counter
      </button>
    </div>
  );
}

export default App;

// ESTRUTURA

// const [counter, setCounter] = useState(0)
//É uma função que retorna um array com dois itens.

// O primeiro item do array retornado é a variável que armazena o estado;
// O segundo item do array é uma função que serve para escrever e atualizar o estado:
// Note que, para atualizar o estado, você sempre precisará utilizar essa função, e nunca manipular a variável de estado diretamente;
// Essa função receberá o novo valor a ser atualizado no estado.

// ======================================== useEffect ======================================== //

// O hook useEffect é uma função que pode ser utilizada para gerenciar os diferentes momentos do ciclo de vida, de forma semelhante aos três métodos citados anteriormente.

// ESTRUTURA

// O useEffect não tem retorno.
// O primeiro argumento deverá ser uma função(callback);
// O segundo argumento, que é opcional, deverá ser um array.Ele é chamado de array de dependências.

useEffect(() => { });

// Essa configuração executará a callback repetidas vezes, toda vez que o componente sofrer qualquer tipo de alteração e renderizar. O comportamento aqui é semelhante ao componentDidUpdate() quando usamos componentes de classe.

useEffect(() => { }, [foo, bar, ...baz]);

// Essa configuração executará a callback sempre que qualquer dos itens do array sofrer alteração. É importante colocarmos no array de dependências variáveis que estamos utilizando dentro da função callback: isso evita que tenhamos variáveis desatualizadas no callback.

// useEffect com a callback retornando uma função <<<<<<<<<<

useEffect(() => {
  return () => { };
}, []);

// Nessa caso, o useEffect está retornando uma nova função. Essa função também é chamada de função cleanup. A função cleanup será executada:

// No momento da desmontagem do componente. O comportamento aqui é semelhante ao componentWillUnmount() quando usamos componentes de classe;
// No momento anterior à próxima execução da callback, quando o componente é renderizado novamente.

// RESUMO

// O useEffect executa, quando disparado, a função que recebe como primeiro parâmetro;
// Se não receber um segundo parâmetro, o useEffect executa a função sempre que o componente é renderizado;
// Se receber um array vazio como segundo parâmetro, o useEffect executa a função somente quando o componente é montado;
// Quando o useEffect recebe um array com valores dentro, sempre que algum desses valores é alterado, a função é executada;
// Se o primeiro parâmetro retornar uma função, essa função será executada quando o componente é desmontado e também antes da próxima renderização.
