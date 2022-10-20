//  COMPONENTES DE FUNÇÃO

function Greeting(props) {
  return (
    <h1>Hello, {props.name}</h1>
  );
}

export default Greeting;

// COMPONENTES DE CLASSE 

import React from 'react';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

export default Greeting;

Analisando o código acima, temos:

// A declaração de um componente chamado Greeting;
// O componente Greeting herda da classe Component da biblioteca react;
// O componente Greeting descreve o que vai ser mostrado para quem usar a aplicação, declarado no método obrigatório render. Nesse caso, Greeting retorna: <h1>Hello, {this.props.name}</h1>;
// O componente Greeting possui como propriedade um objeto chamado props, que contém todos os dados passados como parâmetro na hora de chamar um componente, ou seja, chamar <Greeting name="Samuel" /> faz com que o componente tenha uma prop igual a { name: "Samuel" };
// Exportamos o componente Greeting de forma que ele possa ser reutilizado na aplicação.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> PROPS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// As props são umas das partes mais importantes de um componente. São por elas que passamos os valores para o componente, e é como o torna reutilizável em diferentes contextos. Elas são como os parâmetros de uma função.

// Observe o exemplo abaixo de como seria uma função que retornaria a mesma mensagem que o componente Greeting renderiza:


function greeting(name, lastName){
  return `Hello, ${name} ${lastName}`;
}
// console.log(greeting('Samuel', 'Silva'));

// Ao componente Greeting:

import React from 'react';

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name} {this.props.lastName}</h1>;
  }
}

export default Greeting;

// Visando seguir as boas práticas nas suas aplicações, você pode desestruturar as props. Para isso, basta refatorar o código anterior, no qual o componente Greeting ficará da seguinte forma:

import React from 'react';

class Greeting extends React.Component {
  render() {
    const { name, lastName } = this.props;
    return <h1>Hello, {name} {lastName}</h1>;
  }
}

export default Greeting;

// Agora o chamamos dentro do componente App:

import React from 'react';
import Greeting from './Greeting';

class App extends React.Component {
  render() {
    return (
      <main>
        <Greeting name="Samuel" lastName="Silva" />
      </main>
    );
  }
}

export default App;

// Observe como a chamada do componente lembra a chamada de uma função com passagem de parâmetros. Nesse exemplo, o retorno do componente será a tag <h1>Hello, Samuel Silva</h1>.

// Para compreender melhor, vamos analisar com mais cuidado a linha 06 do código anterior. Ao atribuir as props name e lastName ao componente Greeting, o React automaticamente monta um objeto contendo as informações passadas e as disponibiliza para o componente montado numa variável chamada props, em um formato parecido com esse:

const props = { name: 'Samuel', lastName: 'Silva' }

// Esse objeto props, por sua vez, é passado para o componente Greeting, o qual poderá resgatar tanto o nome como o sobrenome por meio do this.props.name e this.props.lastName.