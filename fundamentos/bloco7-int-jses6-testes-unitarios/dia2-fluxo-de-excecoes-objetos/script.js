// EX1 - PT 2 - PEDIDO DE CLIENTES

// const order = {
//   //1 
//   name: 'Rafael Andrade',
//   //2
//   phoneNumber: '11-98763-1416',
//   //3
//   address: {
//     //3.1
//     street: 'Rua das Flores',
//     //3.2
//     number: '389',
//     //3.3
//     apartment: '701',
//   },


//   order: {
//     //1
//     pizza: {
//       //1.1
//       marguerita: {
//         amount: 1,
//         price: 25,
//       },
//       //1.2
//       pepperoni: {
//         amount: 1,
//         price: 20,
//       },
//     },
//     //2
//     drinks: {
//       //2.1
//       coke: {
//         type: 'Coca-Cola Zero',
//         price: 10,
//         amount: 1,
//       },
//     },
//     //3
//     delivery: {
//       deliveryPerson: 'Ana Silveira',
//       price: 5,
//     },
//   },
//   //4
//   payment: {
//     total: 60,
//   },
// };

// const customerInfo = (order) => {
//   // Adicione abaixo as informações necessárias.
//   return `Olá ${order.order.delivery.deliveryPerson}, entrega para: ${order.name}, Telefone: ${order.phoneNumber}, ${order.address.street}, Nº: ${order.address.number}, AP: ${order.address.apartment}.`;
// };

// customerInfo(order);

// const orderModifier = (order) => {
//   // Adicione abaixo as informações necessárias.
//   order.name = 'Luiz Silva';
//   order.payment = 50;

//     console.log(`Olá ${order.name}, o total do seu pedido de marguerita, pepperoni e Coca-Cola Zero é R$${order.payment},00`);
// };

// orderModifier(order);

// EX1 - PT 3 - ORGANIZANDO LIÇÕES

const lesson1 = {
  materia: 'Matemática',
  numeroEstudantes: 20,
  professor: 'Maria Clara',
  turno: 'manhã',
};

const lesson2 = {
  materia: 'História',
  numeroEstudantes: 20,
  professor: 'Carlos',
};

const lesson3 = {
  materia: 'Matemática',
  numeroEstudantes: 10,
  professor: 'Maria Clara',
  turno: 'noite',
};

// FUNÇÃO ADICIONAR PROPRIEDADE
const property = (obj, key, value) => {
  obj[key] = value;
}

property(lesson2, 'turno', 'noite');

// FUNÇÃO LISTAR KEYS DE OBJETO
const keys = (obj) => Object.keys(obj);

// FUNÇÃO TAMAHO DE UM OBJETO
const keysLenght = (obj) => Object.keys(obj).length;

// OBJETO ALLLESSONS
let allLessons = {};
allLessons.lesson1 = {};
Object.assign(allLessons.lesson1, lesson1);
allLessons.lesson2 = {};
Object.assign(allLessons.lesson2, lesson2);
allLessons.lesson3 = {};
Object.assign(allLessons.lesson3, lesson3);

// FUNÇÃO RETORNO NUMERO DE ESTUDANTES

const sumStudents = () => {

  return `O número total de estudantes na Lesson1 é ${allLessons.lesson1.numeroEstudantes + allLessons.lesson2.numeroEstudantes + allLessons.lesson3.numeroEstudantes}`;
}

sumStudents();

// FUNÇÃO VALOR DA CHAVE / POSIÇÃO

const getValueByNumber = (key, num) => {
  if (key === lesson1) {
    const a = Object.keys(allLessons.lesson1);
    return a[num];
  }
  if (key === lesson2) {
    const b = Object.keys(allLessons.lesson2);
    return b[num];
  }
  if (key === lesson3) {
    const c = Object.keys(allLessons.lesson3);
    return c[num];
  }
}

// FUNÇÃO VERIFICAÇÃO CHAVE/VALOR EXISTE NA FUNÇÃO

const verifyPair = (obj, key, value) => {
  let result = '';
  if (obj === lesson1) {
    const keys = Object.keys(allLessons.lesson1);
    const values = Object.values(allLessons.lesson1);
    keys.includes(key) && values.includes(value)
      ? result = true
      : result = false
  }
  if (obj === lesson2) {
    const keys = Object.keys(allLessons.lesson2);
    const values = Object.values(allLessons.lesson2);
    keys.includes(key) && values.includes(value)
      ? result = true
      : result = false
  }
  if (obj === lesson3) {
    const keys = Object.keys(allLessons.lesson3);
    const values = Object.values(allLessons.lesson3);
    keys.includes(key) && values.includes(value)
      ? result = true
      : result = false
  }
  return result;
}

// FUNÇÃO RETORNO NUMERO DE ESTUDANTES AULA DE MATEMATICA

const sumMathStudents = () => {
  return `O número total de estudantes na aula de matemática foi de ${allLessons.lesson1.numeroEstudantes}`
}

sumMathStudents();

// FUNÇÃO RETORNA OBJETO => PROFESSOR/AULAS/ESTUDANTES

const createReport = (obj, value) => {
  const report = {};

  if (obj.lesson1.professor.includes(value) || obj.lesson2.professor.includes(value) || obj.lesson3.professor.includes(value)) {
    report.professor = value;
  };

  report.aulas = [];
  report.estudante = 0;
  if (obj.lesson1.professor.includes(value)) {
    report.professor = value;
    report.aulas.push(obj.lesson1.materia);
    report.estudante += allLessons.lesson1.numeroEstudantes;
  }
  if (obj.lesson2.professor.includes(value)) {
    report.professor = value;
    report.aulas.push(obj.lesson2.materia);
    report.estudante += allLessons.lesson2.numeroEstudantes;
  }
  if (obj.lesson3.professor.includes(value)) {
    report.professor = value;
    report.aulas.push(obj.lesson3.materia);
    report.estudante += allLessons.lesson3.numeroEstudantes;
  }
  return report;
}

console.log(createReport(allLessons, 'Maria Clara'))