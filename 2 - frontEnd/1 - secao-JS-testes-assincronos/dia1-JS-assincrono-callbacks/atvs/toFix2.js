// callbacks-para-fixar-02.js

// 2 - No código abaixo você tem a função getUser modificada, que agora funciona de modo assíncrono. Adicione uma callback como parâmetro da função getUser para realizar as operações abaixo:

// A função getUser, ao ser chamada com o parâmetro userFullName, deve imprimir na tela: “Olá! Meu nome é Ivan Ivanovich”
// A função getUser, ao ser chamada com o parâmetro userNationality, deve imprimir na tela: “Ivan é Russo”
// Obs.: Analise o comportamento assíncrono da função getUser ao chamar getUser(userFullName) seguido de getUser(userNationality). Há momentos em que o nome da pessoa é impresso primeiro e outros em que a nacionalidade da pessoa é impressa primeiro!

const userFullName = ({ firstName, lastName }) => `Olá! Meu nome é ${firstName} ${lastName}`;
const userNationality = ({ firstName, nationality }) => `${firstName} é ${nationality}`;

const delay = (maxMilliseconds = 5000) => Math.floor(Math.random() * maxMilliseconds);

const getUser = (callback) => {
  setTimeout(() => {
    const user = {
      firstName: 'Ivan',
      lastName: 'Ivanovich',
      nationality: 'Russo',
    };

    // Dica: use esse `console.log()` abaixo para imprimir o resultado na tela.
    // console.log(user);
    callback(user);
  }, delay(1000));
};

getUser((user) => console.log(userFullName(user))); // deve imprimir "Olá! Meu nome é Ivan Ivanovich" depois de um certo tempo
getUser((user) => console.log(userNationality(user))); // deve imprimir "Ivan é Russo" depois de um certo tempo