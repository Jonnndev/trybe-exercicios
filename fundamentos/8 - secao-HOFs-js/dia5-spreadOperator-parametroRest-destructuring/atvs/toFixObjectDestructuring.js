// OBJECT DESTRUCTURING

// Crie um terceiro objeto, que terá os dados pessoais e os dados de cargo juntos.

const user = {
  name: 'Maria',
  age: 21,
  nationality: 'Brazilian',
};

const jobInfos = {
  profession: 'Software engineer',
  squad: 'Rocket Landing Logic',
  squadInitials: 'RLL',
};

const { name, age, nationality } = user;
const { profession, squad, squadInitials } = jobInfos;

const userJobInfos = {
  name,
  age,
  nationality,
  profession,
  squad,
  squadInitials
}

console.log(userJobInfos);

// Imprima no console uma frase utilizando os dados do objeto criado anteriormente. Para isso, utilize a desestruturação de objetos em conjunto com template literals.

const message = `Hi, my name is ${name}, I'm ${age} years old and I'm ${nationality}. I work as a ${profession} and my squad is ${squad}`;

console.log(message);
