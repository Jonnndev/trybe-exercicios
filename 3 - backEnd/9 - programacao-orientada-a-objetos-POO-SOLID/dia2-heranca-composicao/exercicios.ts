// Exercicio 1 - Crie uma nova classe cujos objetos representarão uma pessoa no nosso sistema.

// `Class`: Person
// `Attributes`:
//     - name: nome da pessoa
//     - birthDate: data de nascimento da pessoa
// `Methods`:
//     - Getters/Setters
//     - constructor: deve receber como parâmetro nome e data de nascimento
// `Validations`:
//     - O nome deve ter no mínimo três caracteres
//     - A data de nascimento não pode ser uma data no futuro
//     - A pessoa não pode possuir mais de 120 anos

// ./Person.ts

export class Person {
  protected MINIMUM_NAME_LENGTH = 3;

  protected MAXIMUM_AGE = 120;

  constructor(
    private _name: string,
    private _birthDate: Date,
  ) {
    this.validatePerson(); // validação do objeto criado com o construtor da classe
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this.validateName(name);
    this._name = name;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(date: Date) {
    this.validateBirthDate(date);
    this._birthDate = date;
  }

  static getAge(date: Date): number {
    const diff = Math.abs(new Date().getTime() - date.getTime()); // diferença em milissegundos entre a data atual e a data passada por parâmetro
    const yearMs = 31_536_000_000; // 1 ano = 31536000000 milissegundos
    return Math.floor(diff / yearMs);
  }

  private validateName(name: string): void {
    if (name.length < this.MINIMUM_NAME_LENGTH) {
      throw new Error(`O nome deve conter no mínimo ${this.MINIMUM_NAME_LENGTH} caracteres.`);
    }
  }

  private validateBirthDate(date: Date): void {
    if (date.getTime() > new Date().getTime()) {
      throw new Error('A data de nascimento não pode ser uma data no futuro.');
    }
    if (Person.getAge(date) > this.MAXIMUM_AGE) {
      throw new Error(`A pessoa deve ter no máximo ${this.MAXIMUM_AGE} anos.`);
    }
  }

  private validatePerson(): void {
    this.validateName(this.name);
    this.validateBirthDate(this.birthDate);
  }
}

// Exercicio 2 - Refatore nossa classe de pessoa estudante para que ela herde da nossa classe pessoa.

// `Class`: Student
// `Extends`: Person
// `Attributes`:
//     - enrollment: matrícula da pessoa estudante
//     - examsGrades: notas de provas
//     - assignmentsGrades: notas de trabalhos
// `Methods`:
//     - Getters/Setters
//     - constructor: deve receber como parâmetro nome e data de nascimento e
//       preencher a matrícula automaticamente
//     - sumGrades: retorna a soma das notas da pessoa estudante
//     - sumAverageGrade: retorna a média das notas da pessoa estudante
//     - generateEnrollment: retorna uma string única gerada
//       como matrícula para a pessoa estudante
// `Validations`:
//     - A matrícula deve possuir no mínimo 16 caracteres
//     - A pessoa estudante deve possuir no máximo 4 notas de provas
//     - A pessoa estudante deve possuir no máximo 2 notas de trabalhos

// ./Student.ts

export class Student extends Person {
  private _enrollment = String();
  private _examsGrades: number[] = [];
  private _assignmentsGrades: number[] = [];

  constructor(name: string, birthDate: Date) {
    super(name, birthDate);
    this.enrollment = this.generateEnrollment();
  }

  get enrollment(): string {
    return this._enrollment;
  }

  //esse método checa se a inscrição da pessoa estudante possui no mínimo 16 caracteres
  set enrollment(value: string) {
    if (value.length < 16) throw new Error('A matrícula deve possuir no mínimo 16 caracteres.');

    this._enrollment = value;
  }

  get examsGrades(): number[] {
    return this._examsGrades;
  }

  set examsGrades(value: number[]) {
    if (value.length > 4) throw new Error('A pessoa estudante só pode possuir 4 notas de provas.');

    this._examsGrades = value;
  }

  get assignmentsGrades(): number[] {
    return this._assignmentsGrades;
  }

  set assignmentsGrades(value: number[]) {
    if (value.length > 2) throw new Error('A pessoa estudante só pode possuir 2 notas de trabalhos.');

    this._assignmentsGrades = value;
  }

  //esse método gera um id de inscrição aleatório baseado na data de cadastro da pessoa estudante
  generateEnrollment(): string {
    const randomStr = String(Date.now() * (Math.random() + 1)).replace(/\W/g, '');

    return `STU${randomStr}`;
  }
}

// Exercicio 3 - Crie uma interface que representará uma pessoa funcionária.

// `Interface`: Employee
// `Attributes`:
//     - registration: número do registro
//     - salary: valor do salário
//     - admissionDate: data de admissão
// `Methods`:
//     - generateRegistration: retorna uma string única gerada como registro

export interface Employee {
  registration: string;
  salary: number;
  admissionDate: Date;

  generateRegistration(): string;
}

// Exercicio 4 - Crie uma classe cujos objetos representem uma disciplina lecionada na escola.

// `Class`: Subject
// `Attributes`:
//     - name: nome da disciplina
// `Methods`:
//     - Getters/Setters
//     - constructor: deve receber como parâmetro nome
// `Validations`:
//     - O nome tem que possuir no mínimo 3 caracteres

// ./Subject.ts

export class Subject {
  constructor(private _name: string) {
    this.name = _name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this.validateName(value);
    this._name = value;
  }

  private validateName(value: string): void {
    if (value.length < 3) throw new Error('O nome deve conter no mínimo 3 caracteres.');
  }
}

// Exercicio 5 - Crie uma classe cujos objetos representem uma pessoa professora.

// `Class`: Teacher
// `Extends`: Person
// `Implements`: Employee
// `Attributes`:
//     - subject: a disciplina lecionada pela pessoa professora
// `Methods`:
//     - Getters/Setters
//     - constructor: deve receber como parâmetro nome, data de nascimento, salário
//       e a disciplina
// `Validations`:
//     - O registro deve possuir no mínimo 16 caracteres
//     - O salário não pode ser negativo.
//     - A data de admissão não pode ser no futuro

export class Teacher extends Person implements Employee {
  private _subject: Subject;
  private _registration = String();
  private _admissionDate: Date;

  constructor(name: string, birthDate: Date, private _salary: number, subject: Subject) {
    super(name, birthDate);

    this._subject = subject;
    this.salary = _salary;
    this._admissionDate = new Date();
    this.registration = this.generateRegistration();
  }

  get subject(): Subject {
    return this._subject;
  }

  set subject(value: Subject) {
    this._subject = value;
  }

  get registration(): string {
    return this._registration;
  }

  set registration(value: string) {
    if (value.length < 16) throw new Error('O registro deve possuir no mínimo 16 caracteres.');

    this._registration = value;
  }

  get salary(): number {
    return this._salary;
  }

  set salary(value: number) {
    if (value < 0) throw new Error('O salário não pode ser negativo.');

    this._salary = value;
  }

  get admissionDate(): Date {
    return this._admissionDate;
  }

  set admissionDate(value: Date) {
    if (value.getTime() > new Date().getTime()) throw new Error('A data de admissão não pode ser uma data no futuro.');

    this._admissionDate = value;
  }

  generateRegistration(): string {
    const randomStr = String(Date.now() * (Math.random() + 1)).replace(/\W/g, '');

    return `PRF${randomStr}`;
  }
}
