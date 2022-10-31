// CICLO DE VIDA DE COMPONENTE

// Entendendo quando cada método é chamado <<<<<<<<<<<<<<<<<<<<<<<<<<

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    console.log("construtor");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  render() {
    console.log("render");
    return (
      <div>
        <p>Contador</p>
        <button
          onClick={() => this.setState((state) => ({ counter: state.counter + 1 }))}
        >
          Soma
        </button>
        <p>{this.state.counter}</p>
      </div>
    );
  }
}

// Note que, durante o processo de atualização, o método render é chamado novamente. Isso acontece porque, quando se atualiza uma props ou estado, o React “pede” que o componente seja renderizado no DOM. Como apresentamos acima, caso seja válido, podemos impedir essa renderização retornando false com o método shouldComponentUpdate.

// Podemos também, nos métodos shouldComponentUpdate e componentDidUpdate, acessar os estados ou props próximos e anteriores. Para isso, devemos utilizar os parâmetros nextProps e nextState no shouldComponentUpdate e prevProps e prevState no componentDidUpdate.

shouldComponentUpdate(nextProps, nextState) {
  console.log("shouldComponentUpdate", this.state, nextState);
  return true;
}

componentDidUpdate(prevProps, prevState) {
  console.log("componentDidUpdate", this.state, prevState);
}

// Perceba que o estado só é de fato atualizado quando chega no método componentDidUpdate. Por isso, caso seja necessário impedir uma renderização, você deve utilizar o método shouldComponentUpdate, que permite comparar os atuais e próximos estados ou props e adicionar a lógica.

