// ESTADOS DE COMPONENTES

// Por que isso é importante?
// O estado dos componentes é o que dá dinamismo às páginas do React, de acordo com a interação de quem usa. Ele é uma abstração essencial para o desenvolvimento de páginas mais ricas e interativas, que respondem a inputs do usuário e se atualizam em função disso.

// O Estado de um componente é um lugar especial que todo componente tem para armazenar informações que devem persistir enquanto a tela não for fechada ou atualizada. 

// O Estado de um componente React talvez seja a peça mais essencial para o seu funcionamento. Enquanto, numa aplicação JavaScript sem uso de bibliotecas, tais informações ficariam, muito provavelmente, espalhadas e desorganizadas, no React, cada componente cuida das suas informações, e o React garante que todas estejam atualizadas de maneira otimizada.

// EVENTOS DE COMPONENTES

// import React from 'react';
// import './App.css';

/* Embora isso funcione, essa DEFINITIVAMENTE
não é a maneira correta de se criar eventos
em React! A função se refere ao componente,
então deve ser parte de sua classe! */
// function handleClick() {
//   console.log('Clicou no botão!')
// }

// class App extends React.Component {
  /* Repare que, diferentemente do HTML, no
  JSX você associa uma função a um evento
  passando a própria função entre chaves `{}` */
//   render() {
//     return <button onClick={handleClick}>Meu botão</button>
//   }
// }

// export default App;

// Acessando uma função nossa dentro da classe

// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   handleClick() {
//     console.log('Clicou!')
//   }

  // render() {
    /* No React, precisamos dizer explicitamente que queremos uma função da nossa classe através da sintaxe `this.minhaFuncao` para usá-la num evento */
//     return <button type="button" onClick={this.handleClick}>Meu botão</button>;
//   }
// }

// export default App;

// A grande questão, no entanto, é que é possível adicionar aos construtores das classes React comportamentos e lógica extras! Fazemos assim:

// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   constructor(props) {
    // A função `super()` é chamada para garantir que a lógica interna do React rode **antes** da sua. Se não for assim, o código não funcionará
    // super()

    // Sua lógica extra vai aqui! O parâmetro `props` é opcional, para você acessar as props diretamente no construtor
  // }

//   render() {
//     return <span>Meu componente!</span>
//   }
// }

// export default App;

// THIS <<<<<<<<<<<<<<<<<<<<<<<<<<<

// Como se pode ver, o this, dentro das classes de componentes React, é um objeto enorme que contém, basicamente, tudo o que concerne àquele componente dentro da aplicação. Quando fazemos this.props, estamos acessando a chave props dentro do objeto this, que irá conter as propriedades (props vem de propriedades!) passadas àquele componente. Com ele, por exemplo, conseguimos acessar as props e outras coisas, como o estado do componente, dentro das funções render e constructor, para dar dois exemplos.

// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   handleClick() {
    // Essa chamada ao `this` retorna `undefined`? !
  //   console.log(this)
  //   console.log('Clicou')
  // }

  // render() {
    // Já essa chamada ao `this`, feita de dentro da função `render`, retorna o objeto que esperamos
//     console.log(this)
//     return <button onClick={this.handleClick}>Meu botão</button>
//   }
// }

// export default App;

// Esse comportamento acontece, em resumo, em função de dificuldades que o JavaScript tem com a implementação de uma lógica de classes, lógica para qual a linguagem não foi feita!. A solução é, no constructor, fazermos, para cada uma de nossas funções, um vínculo “manual” da nossa função com o this.

// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   constructor() {
//     super()
    // A função abaixo vincula "manualmente" o `this` à nossa função
  //   this.handleClick = this.handleClick.bind(this)
  // }

  // handleClick() {
    /* Agora esse log retorna o objeto `this`, já acessível para nossa função!
    Com isso, podemos acessar as `props`, estado do componente (ainda vamos ver como!)
    e tudo o mais daqui de dentro */
//     console.log(this)
//     console.log('Clicou!')
//   }

//   render() {
//     return <button onClick={this.handleClick}>Meu botão</button>
//   }
// }

// export default App;

// Ao definir uma função da classe com uma arrow function, com a sintaxe minhaFuncao = () => {...}, você não precisará fazer o bind. Então não precisaremos do construtor nesse caso. Veja como o exemplo acima seria feito com arrow function:

// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   handleClick = () => {
//     console.log('Clicou!')
//   }

//   render() {
//     return <button onClick={this.handleClick}>Meu botão</button>
//   }
// }

// export default App;

// >>>>>>>>>>>>>>>>>>> Agora que aprendemos sobre this e sobre como lidar com eventos dentro das classes React <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// import React from 'react';
// import './App.css';

// class App extends React.Component {
//   constructor() {
//     super();
    /* Para definir um estado inicial ao componente, a ser definido
    no momento em que o componente for colocado na tela, faça uma atribuição
    de um objeto à chave `state` do `this`, ou seja, ao `this.state` */
  //   this.state = {
  //     numeroDeCliques: 0,
  //   };
  //   this.handleClick = this.handleClick.bind(this);
  // }
  // handleClick() {
    /* Você **NUNCA** deve fazer atribuições diretamente a `this.state`. Deve,
    ao invés disso, SEMPRE utilizar a função `this.setState(novoEstado)` do
    React */
  //   this.setState({
  //     numeroDeCliques: 1,
  //   });
  // }
  // render() {
    /* Para LER o estado, você pode usar `this.state.chaveDoMeuEstado` */
//     const { numeroDeCliques } = this.state;
//     return (
//       <button
//         type="button"
//         onClick={ this.handleClick }
//       >
//         { numeroDeCliques }
//       </button>
//     );
//   }
// }
// export default App;

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      numeroDeCliques: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    /* Passando uma callback à função setState, que recebe de parâmetros
    o estado anterior e as props do componente, você garante que as atualizações
    do estado acontecerão uma depois da outra! */
    this.setState((estadoAnterior, _props) => ({
      numeroDeCliques: estadoAnterior.numeroDeCliques + 1,
    }));
  }

  render() {
    const { numeroDeCliques } = this.state;
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        { numeroDeCliques }
      </button>
    );
  }
}

export default App;

// >>>>>>>>>>>>>>>>>>>>>> DEFININDO ESTADO PELO PUBLIC CLASS FIELDS

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    // Removemos a declaração do estado de dentro do construtor
    // this.state = {
    //   numeroDeCliques: 0,
    // };

    this.handleClick = this.handleClick.bind(this);
  }

  // Fazemos a definição do estado utilizando a sintaxe Public Class Field
  state = {
    numeroDeCliques: 0,
  };

  handleClick() {
    this.setState((estadoAnterior, _props) => ({
      numeroDeCliques: estadoAnterior.numeroDeCliques + 1,
    }));
  }

  render() {
    const { numeroDeCliques } = this.state;
    return (
      <button type="button" onClick={ this.handleClick }>
        { numeroDeCliques }
      </button>
    );
  }
}

export default App;

// Se você quisesse chamar, no elemento, um evento passando um parâmetro, você deveria trocar a sintaxe <button onClick{this.minhaFuncao} ...> por <button onClick={() => this.minhaFuncao('meu parametro')}.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> RESUMO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Ler o estado de um componente e usá-lo para alterar o que exibimos no browser;

// Inicializar um componente, dando a ele um estado pré-definido;

// Atualizar o estado de um componente;

// Capturar eventos utilizando a sintaxe do React.

// Para isso, estudamos, no conteúdo, os seguintes pontos:

// Todo componente possui seu próprio estado e tem 100% de controle sobre ele;

// Quando um componente é colocado na tela, ele executa uma função chamada constructor, e, usando a linha super(), podemos sobrescrevê-la para estender seu comportamento;

// O objeto this, acessível a toda classe de componente React, contém tudo o que concerne àquele componente e deve ser vinculado explicitamente às funções criadas dentro da classe, por meio da sintaxe this.minhaFuncao = this.minhaFuncao.bind(this) no construtor do componente;

// Funções que tratam eventos devem ser vinculadas aos seus respectivos elementos com {this.minhaFuncao} ou {() => this.minhaFuncao('Meu parametro')};

// É possível ler o estado de um componente via this.state, é possível definir um estado inicial no construtor com uma atribuição a this.state, e deve-se atualizar tal estado somente com a função this.setState;

// A atualização do estado é assíncrona e, por isso, se você quiser garantir que uma atualização ocorrerá depois da outra, tal atualização deverá ser definida via callback passada à função this.setState, no formato this.setState((estadoAnterior, props) => novoEstado)