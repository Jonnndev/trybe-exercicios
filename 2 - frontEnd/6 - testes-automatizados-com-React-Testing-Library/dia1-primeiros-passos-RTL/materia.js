// INTRODUÇÃO AO RTL

// No conteúdo de testes já visto no curso, funções eram testadas. Já no RTL o objetivo é testar comportamento, como se algo aparece ou não na tela.

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Note que ele está fazendo uma verificação se algum elemento dentro do componente App possui o texto “learn react” (/string/i é utilizado para ignorar case sensitive, ou seja, não diferenciar letras maiúsculas e minúsculas).

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PASSO A PASSO DOS TESTES:
// ACESSAR OS ELEMENTOS NA TELA
// INTERAGIR COM OS ELEMENTOS (SE FOR NECESSÁRIO)
// TESTES

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDERIZAÇÃO:
// A função render() faz a renderização de um componente em memória para que se possa simular as interações com esse componente.

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Para usar o seletor/query getByText, precisamos usar o screen.getByText.
// Seguindo a mesma lógica, ao usar o screen.getByText(), ele retornará um elemento html. A vantagem de utilizar o screen é que você não precisará atualizar e desestruturar a chamada do render para todo teste que você fizer, pois é possível consultar e utilizar todos os elementos do DOM por meio do próprio screen


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SELETORES:

// Seletores ou Queries são métodos que usamos para indicar ao RTL algum elemento da nossa aplicação e assim podermos realizar nossos testes e comparações.
// getByRole => PEGA 1 PELA FUNÇÃO DO ELEMENTO
// getByLabelText => PEGA TODOS PELA FUNÇÃO DO ELEMENTO

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TESTANDO EVENTOS:

// Por enquanto, estamos apenas testando se as coisas estão sendo renderizadas, mas também precisamos testar o comportamento da pessoa usuária, como um clique em um botão. Para isso, usaremos a userEvent.

// A user-event é uma biblioteca complementar à React Testing Library (RTL) que possibilita a simulação de várias interações com o navegador. Essa biblioteca é baseada no método fireEvent da React Testing Library, mas seus métodos são mais aproximados da interação da pessoa usuária.

// O type possui três parâmetros, sendo o terceiro parâmetro opcional, type(element, text, [options]). Esse terceiro parâmetro pode ser utilizado para passar um delay, em milissegundos, que será o tempo esperado entre dois caracteres digitados para realizar a ação do teste.

// O userEvent.type é um evento que retorna uma Promise, porém, como valor default é 0, você só precisará aguardar o retorno dessa Promise caso passe algum valor para a option delay, do contrário o userEvent.type funcionará de modo síncrono.

// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Verificando se o botão e o campo email estão funcionando.', () => {
  render(<App />);

  const EMAIL_USER = 'email@email.com';

  const textEmail = screen.getByTestId('id-email-user');
  expect(textEmail).toBeInTheDocument();
  expect(textEmail).toHaveTextContent('Valor:');

  const btnSend = screen.getByTestId('id-send');
  const inputEmail = screen.getByLabelText('Email');
  userEvent.type(inputEmail, EMAIL_USER);
  userEvent.click(btnSend);

  expect(inputEmail).toHaveValue('');
  expect(textEmail).toHaveTextContent(`Valor: ${EMAIL_USER}`);
});

// Passo 1: Renderizamos a aplicação, depois salvamos o email da pessoa usuária em uma variável (o que é uma boa prática).

// Passo 2: Verificamos se a tag <h2> onde o email aparece na tela está apenas com o texto Valor:,

// Passo 3: Procuramos pelo o campo de email e o botão que enviará os dados.

// Passo 4: Simulamos a digitação da pessoa usuária no campo de email, com o userEvent.type(inputEmail, EMAIL_USER), passando o campo do input como primeiro parâmetro e o valor esperado como segundo parâmetro ('email@email.com').

// Passo 5: Simulamos um clique no botão com o userEvent.click(btnSend), passando o elemento do botão como parâmetro.

// Passo 6: Verificamos se após o click, o campo de input do email retorna para vazio e se a tag <h2>, que anteriormente só exibia Valor:, agora recebe o email passado ao input, resultando em Valor: email@email.com.

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TESTANDO UM COMPONENTE

// Não é preciso que você renderize toda a sua aplicação para realizar um teste: é possível renderizar apenas aquele componente específico e criar os testes para ele.

import React from 'react';
import { render, screen } from '@testing-library/react';
import ValidEmail from './ValidEmail'; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

test('Testando um componente, caso o email seja válido.', () => {
  const EMAIL_USER = 'email@email.com'; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  render(<ValidEmail email={EMAIL_USER} />); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const isValid = screen.getByText('Email Válido');
  expect(isValid).toBeInTheDocument();
});

// No lugar de render(<App />), colocamos render(<ValidEmail email={ EMAIL_USER } />). O componente que queremos renderizar precisa de uma props para funcionar, portanto precisamos passar um valor para ela, que no caso é email={ EMAIL_USER }. O teste verifica se, com a prop passada, o nosso teste passará.

test('Testando um componente, caso o email seja inválido.', () => {
  const EMAIL_USER = 'emailerrado'; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  render(<ValidEmail email={EMAIL_USER} />); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const isValid = screen.getByText('Email Inválido');
  expect(isValid).toBeInTheDocument();
});
