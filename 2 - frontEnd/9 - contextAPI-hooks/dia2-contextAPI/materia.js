// CONTEXT

//O Context fornece um meio de passar dados por meio da árvore de componentes, sem a necessidade de passar props manualmente em cada nível.

// ================ Criar Context ================ //

// Para isso, utilizamos a função createContext do React.

// /src/context/ThemeContext.js
import React, { createContext } from 'react';

const ThemeContext = createContext();

export default ThemeContext;

// O createContext retorna um objeto que possui dois componentes como propriedades: Provider e Consumer.

// Provider é responsável por “prover” os dados para os componentes que estão nos níveis abaixo dele na árvore de componentes. Ele aceita uma prop obrigatória value com os dados que serão compartilhados para todos os componentes abaixo dele. Esse valor pode ser qualquer valor JavaScript, como um número, string, array ou objeto.

// Consumer é responsável por “consumir” os valores armazenados no Context. Também é possível consumir os dados de um Context usando o Hook useContext, dessa forma não é obrigatório o uso do Consumer.

// /src/App.js

import ThemeContext from './context/ThemeContext';
// ...

export default function App() {
  return (
    <ThemeContext.Provider value={{ color: 'dark' }}>
      <div>
        <Header />
        <Image />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

// ================ Lendo Context ================ //

// /src/components/Footer.js
import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function Footer() {
  const theme = useContext(ThemeContext);
  return (
    <footer>Tema Atual: {theme.color}</footer>);
}

export default Footer;

// ================ Escrevendo Context ================ //

// /src/App.js
import React, { useState } from 'react';
import ThemeContext from './context/ThemeContext';

export default function App() {
  const [themeColor, setThemeColor] = useState('dark');

  // ...
}

// No código acima estamos criando um estado com o Hook useState, passando dark como valor inicial. Agora precisamos informar ao Provider que a chave color deverá receber o valor do estado themeColor:

// /src/App.js

// ...

// /src/App.js

import ThemeContext from './context/ThemeContext';
// ...

export default function App() {
  const [themeColor, setThemeColor] = useState('dark');

  return (
    <ThemeContext.Provider value={{ color: themeColor }}>
      <div>
        <Header />
        <Image />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

// Agora, vamos criar uma função que altere o valor do estado themeColor de dark para light e vice-versa. Depois, também adicionaremos essa função ao nosso Provider para que qualquer componente possa invocá-la:

export default function App() {
  const [themeColor, setThemeColor] = useState('dark');

  function toggleTheme() {
    setThemeColor(themeColor === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ color: themeColor, toggleTheme }}>
      <div>
        <Header />
        <Image />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

// ================ Finalizando Context ================ //

import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function Header() {
  const theme = useContext(ThemeContext);

  return (
    <header>
      <h1>Trybe</h1>
      <button onClick={() => theme.toggleTheme()}>
        {theme.color === 'dark' ? '☀️' : '🌒'}
      </button>
    </header>
  );
}

export default Header;

// ================ PROVIDER PATTERN ================ //

// Esse padrão nada mais é que extrair o Provider, bem como os dados e a lógica, para um componente próprio. 

// /src/context/ThemeProvider.js

import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState('dark');

  function toggleTheme() {
    setThemeColor(themeColor === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ color: themeColor, toggleTheme }}>
      <div className={themeColor}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Veja como agora o componente App fica muito mais limpo e legível. Agora ele não tem mais a responsabilidade de gerenciar as informações do Context:

import React from 'react';
import ThemeProvider from './context/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Image from './components/Image';
import './style.css';

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <Image />
      <Footer />
    </ThemeProvider>
  );
}
