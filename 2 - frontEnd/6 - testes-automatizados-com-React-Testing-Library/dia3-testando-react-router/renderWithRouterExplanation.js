// 1- Fazemos as importações necessárias:

// 1.1- Vamos importar o React para podermos trabalhar com a criação de componentes em JSX;

// 1.2- Vamos importar o Router que servirá para termos acesso ao histórico criado pelo createMemoryHistory;

// 1.3- Vamos importar o createMemoryHistory que irá criar nosso histórico em memória durante os testes; e

// 1.4- Vamos importar o render, assim teremos acesso a todos os seletores que ele possui como getByText ou getByRole.

// 2- Feitas as importações, vamos criar nossa função helper chamada renderWithRouter e exportá-la como default;

// 3- Recebemos em nossa função renderWithRouter um parâmetro component, que é o componente que desejamos renderizar em nossos testes;

// 4- Utilizamos a função createMemoryHistory para criar uma variável history que armazenará nosso histórico;

// 5- Por último, retornamos um objeto com as informações necessárias para o teste:

// 5.1- Todas as propriedades retornadas pelo método render também serão retornadas em nosso objeto, pois estamos usando a Spread Syntax. Além disso, também é retornada a nossa constante history.

// 5.2- Repare que a função render recebe como parâmetro o componente <Router />.

// 5.3- O <Router />, por sua vez, recebe como props history a variável que também se chama history criada no passo 4.

// 5.4- Além disso o parâmetro recebido component é passado como children para o <Router />. Dessa forma, conseguimos renderizar em nossos testes o componente desejado encapsulado pelo <Router />.