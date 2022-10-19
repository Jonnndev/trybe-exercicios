// INCORPORNAOD EXPRESSÕES NO JSX

const nome = 'Jorge Maravilha';
const element = <h1>Hello, {nome}</h1>;

// E se aprofundarmos um pouco mais chamando uma função na nossa constante element?

function nomeCompleto (nome, sobrenome) {
  return `${nome} ${sobrenome}`;
}

const element = <h1>Hello, {nomeCompleto('Jorge', 'Maravilha')}</h1>;

// Agora, vamos incorporar a nossa constante element na função helloWorld, retornar um código JSX e encapsulá-la em uma div:

function helloWorld (nome, sobrenome) {
  return <h1>Hello, {`${nome} ${sobrenome}`}</h1>;
}

const element = helloWorld('Jorge', 'Maravilha');
const container = <div>{element}</div>;

// No JSX é necessário substituir class por className, para evitar conflitos entre o Javascript e o HTML, mas também podemos utilizar expressões Javascript para atribuir valor à este atributo.

const nome = 'Jorge Maravilha';
const classe = 'hello-class';
const element = <h1 className={classe}>Hello, {nome}</h1>;

//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CSS E IMPORT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Para importar um arquivo que está dentro do próprio projeto ou que esteja em uma biblioteca externa, você pode utilizar o import, com a seguinte sintaxe:

import myImport from 'file';

// Onde o myImport é a variável pela qual você acessará o módulo importado. Caso você queira importar algo que não seja a exportação default, será necessário colocar o nome do que está sendo importado entre chaves:

import { myImport } from 'file';

// A origem do arquivo importado é indicada após o from, e pode ser um caminho relativo ou o nome da biblioteca que foi instalada no projeto:

import React from 'react' // importando de uma biblioteca
import Header from './components/Header.js' // importando de um caminho relativo

// A utilização de CSS (estilização) em componentes React não é nada muito diferente de como é feito no HTML, você deve criar um arquivo para manter todo o seu CSS e então deverá importá-lo onde você deseja utilizá-lo e colocar as classes e ids que você criou nos elementos da sua página.

/* App.css */
.App {
  background-color: #282c34;
  text-align: center;
}

// App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>APP</h1>
    </div>
  );
}

export default App;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CLASSES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// A principal diferença entre o uso de componentes por classe e o uso de componentes por função reside no fato de aqueles gerados por classe terem acesso a métodos e ao estado próprios de qualquer componente React gerado via classe, como o método render(), que te permite renderizar todo o conteúdo criado na tela, os quais são acessíveis somente por componentes criados por classe na maior parte das versões do React. A sintaxe para criar um componente com classes é a seguinte:

import React from 'react';

class ReactClass extends React.Component {
  render() {
    return (
      <h1>My first React Class Component!</h1>
    )
  }
}