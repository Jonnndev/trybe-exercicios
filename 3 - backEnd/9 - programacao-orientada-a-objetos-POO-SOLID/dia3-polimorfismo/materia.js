====================================== PROBLEMATIZAÇÃO ======================================

No trabalho do mês, foi solicitado que você criasse uma implementação de um tabuleiro de xadrez, com
algumas peças que podem se mover no tabuleiro.

A título de exemplo, neste problema desconsidere que as peças podem ser adversárias, e pense em como
você implementaria um peão e uma torre.

Ambos, Peão e Torre, devem possuir um método mover, respeitando as regras de movimentação de um peão
e de uma torre no xadrez.

As regras são bem simples:

Um peão só pode se mover uma casa para frente, desde que não tenha outra peça em sua frente.
Uma torre pode se mover quantas casas quiser para frente, para trás ou para um dos lados, entretanto
parando antes de qualquer outra peça que esteja em uma destas 4 direções.

====================================== POLIMORFISMO ======================================

Existe mais de uma forma de polimorfismo mas vamos nos concentrar na mais comum: sobrescrita de métodos.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Animals {
  declare turns: number;
  public makeSound(sound: string) {
      console.log('Som emitido:' + sound);
  }
}

class Dogs extends Animals {
  numberTurn(turns: number) {
      return turns;
  }

  makeSound( sound: string): void {
    const times = this.numberTurn(5);
    console.log(`Som emitido: ${sound}, ${times} vezes`);
  }
}

class Birds extends Animals {
  declare specie: string;

  makeSound (sound: string) {
    this.specie = 'pássaro';
      console.log(`O som emitido pelo ${this.specie} é ${sound}`);
  }
}

const dogs = new Dogs();
dogs.makeSound("au au au"); // 'Som emitido: au au au, 5 vezes'

const birds = new Birds();
birds.makeSound("fiu fiu fiu fiu fiu"); // 'O som emitido pelo pássaro é fiu fiu fiu fiu fiu'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== SINTAXE COM CLASSES ======================================

SOBRESCRITA DE MÉTODOS:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Animal {
  constructor(public name: string) { }
  move() { console.log(`${this.name} está se movendo.`); }
}
class Bird extends Animal {
  move() { console.log(`${this.name} está voando.`); }
}
class Mammal extends Animal {
  move() { console.log(`${this.name} está andando.`); }
}

const a = new Animal('Tubarão');
const b = new Bird('Papagaio');
const m = new Mammal('Tatu');

const myMove = (animal: Animal) => {
  animal.move();
}
myMove(a);
myMove(b);
myMove(m);

/*
Saída:
Tubarão está se movendo.
Papagaio está voando.
Tatu está andando.
*/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Observe que myMove recebe como parâmetro um animal da classe Animal e chama o método move.

(!) Podemos passar uma subclasse quando uma superclasse é esperada, visto que ela possui todos os
    métodos que a superclasse possui.

USO DO SUPER:

Sabemos como utilizar o super para chamar o construtor da superclasse dentro da subclasse.

Podemos também, ao sobrescrever um método qualquer, chamar a implementação dele na superclasse por meio do super.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Animal {
  constructor(public name: string) { }
  move() { console.log(`${this.name} está se movendo.`); }
}
class Bird extends Animal {
  move() {
    super.move(); // <<<<<<<<<<<<<<<<<<<<<<<
    console.log(`${this.name} está voando.`);
  }
}
class Mammal extends Animal {
  move() { console.log(`${this.name} está andando.`); }
}

const a = new Animal('Tubarão');
const b = new Bird('Papagaio');
const m = new Mammal('Tatu');

const myMove = (animal: Animal) => {
  animal.move();
}
myMove(a);
myMove(b);
myMove(m);

/*
Saída:
Tubarão está se movendo.
Papagaio está se movendo.  // <<<<<<<<<<<<<<<<<<<<<<<
Papagaio está voando. // <<<<<<<<<<<<<<<<<<<<<<<
Tatu está andando.
*/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== CLASSE, MÉTODOS E ATRIBUTOS ABSTRATOS ======================================

Por vezes, criamos classes que devem possuir métodos pensados para serem implementados em subclasses.

A ideia é que a superclasse, mais genérica, não deve fazer ideia de como esse método deve funcionar, apenas saber que ele existe.

Isso é o mesmo que quando há uma implementação de interface, com a diferença na Interface nenhum método é implementado, e aqui
queremos selecionar alguns métodos para que não sejam implementados.

(!) CLASSES ABSTRATAS:
    Possuem métodos abstrastos e  não podem ser instanciadas, ou seja, você não pode criar um objeto a partir de uma classe
    abstrata.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
abstract class Employee {
  constructor(public name: string) { }

  /* Aqui temos um atributo abstrato que implica às classes
  filhas atribuírem, de maneira obrigatória, um valor do tipo 'number' */
  abstract MIN_SALARY: number

  /* Já aqui temos um método abstrato que implica às classes filhas 
  implementá-la, de maneira obrigatória, de acordo com a utilidade da classe filha  */
  abstract work(): void
}

class Instructor extends Employee {
  constructor(public name: string) {
    super(name); 
  }
  MIN_SALARY = 10000;
  work() { console.log(`${this.name} está auxiliando as pessoas estudantes em mentorias.`); }
}

class Specialist extends Employee {
  constructor(public name: string) {
    super(name); 
  }
  MIN_SALARY = 20000;
  work() { console.log(`${this.name} está ministrando uma aula ao vivo.`); }
}

class Facilitator extends Employee {
  constructor(public name: string) {
    super(name); 
  }
  MIN_SALARY = 50000;
  work() { console.log(`${this.name} está conduzindo um 1:1.`); }
}

const instructor = new Instructor('Victor');
const specialist = new Specialist('Gus');
const facilitator = new Facilitator('Silvinha');

instructor.work(); // Victor está auxiliando as pessoas estudantes em mentorias.
specialist.work(); // Gus está ministrando uma Aula Ao Vivo.
facilitator.work(); // Silvinha está conduzindo um 1:1.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FIXANDO:

1 - Crie uma classe abstrata Character que tenha os métodos abstratos talk(): void e specialMove(): void.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
abstract class Character {
  abstract talk(): void;
  abstract specialMove(): void;
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2 - Crie a classe concreta MeleeCharacter que estenda Character e sobrescreva os métodos abstratos dessa classe.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class MeleeCharacter extends Character {
  constructor(private _name: string, private _specialMoveName: string) {
    super();
  }

  talk(): void {
    /* Entra aqui uma implementação exclusiva para os personagens de curto alcance */
    console.log(`Hi, I'm ${this._name}. I attack at close range.`);
  }

  specialMove(): void {
    /* Entra aqui uma implementação exclusiva para os personagens de curto alcance */
    console.log(`${this._name} used ${this._specialMoveName}!`);
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3 - Crie a classe concreta LongRangeCharacter que estenda Character e sobrescreva os métodos abstratos dessa classe.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class LongRangeCharacter extends Character {
  constructor(private _name: string, private _specialMoveName: string) {
    super();
  }

  talk(): void {
    /* Entra aqui uma implementação exclusiva para os personagens de longo alcance */
    console.log(`Hi, I'm ${this._name}. I can attack from a long range.`);
  }

  specialMove(): void {
    /* Entra aqui uma implementação exclusiva para os personagens de longo alcance */
    console.log(`${this._name} used ${this._specialMoveName}!`);
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

4 - Agora instancie as classes filhas com os personagens Yoshi e Samus, com seus respectivos specialMoveName e
    chame os métodos talk e specialMove para apresentar o personagem e seus respectivos ataques especiais.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const yoshi = new MeleeCharacter('Yoshi', 'Super dragon');
const samus = new LongRangeCharacter('Samus', 'Zero Laser');

yoshi.talk();
yoshi.specialMove();
samus.talk();
samus.specialMove();
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== MÉTODOS E ATRIBUTOS ESTÁTICOS ======================================

Um método estático nada mais é do que uma função que não precisa acessar nenhum atributo do objeto.

A diferença semântica de um método estático para uma função é que o método estático tem a ver com a classe.
Isso significa que fica um pouco “sem sentido” você disponibilizar um método sozinho, pois, por mais que ele
não precise manipular uma instância, ele está muito ligado à classe.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Employee {
  /* Atributo estático, que pertence a classe */
  private static employeeCount = 0
  
    /* Aqui temos o exemplo de um atributo comum que, em contraste com o atributo estático,
    é utilizado pelas instâncias e não pela classe */
    private employeeName: string;
  
    constructor(name: string) {
      /* Pelo fato do o método addEmployee() ser estático, ou seja, acessível 
      apenas a partir da própria classe e não de suas instâncias, é que a
      chamamos a partir de Employee e não do 'this' */
      Employee.addEmployee();
  
      // Nesse caso, o 'this' se refere à instância dessa classe, que está sendo construída
      this.employeeName = name;
    }
  
    // Esse é um método exclusivo da classe, por isso estático 
    private static addEmployee() {
      /* Nesse caso, como o atributo é estático, melhor forma de acessar
      o atributo é a partir do nome da classe.  */
      Employee.employeeCount += 1;
      console.log(`Total de pessoas funcionárias: ${Employee.employeeCount}`)
    }
  
    /* Aqui temos o exemplo de método comum que, em contraste com o método estático,
    é utilizado pelas instâncias e não pela classe */
    public getName(): string { 
      // Novamente, o 'this' se referindo à instância
      return this.employeeName
    }
  }
  
  const employee1 = new Employee('Kissyla'); // Total de pessoas funcionárias: 1
  const employee2 = new Employee('Calaça'); // Total de pessoas funcionárias: 2
  const employee3 = new Employee('Setinha'); // Total de pessoas funcionárias: 3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Observe que usamos o nome da classe para acessar o atributo employeeCount dentro do método addEmployee()
da classe Employee. Poderíamos utilizar o this para acessá-lo, mas como boa prática, mantemos o nome da
classe para acessar atributos e métodos estáticos em qualquer ponto do código. Isso acontece para deixar
nítido, para outras pessoas desenvolvedoras, que aquele atributo ou método é estático.

RESUMO:

A - Os métodos e atributos estáticos pertencem a classe e não aos objetos da classe.

B - Se um atributo estático tiver seu valor alterado em algum objeto da classe, a alteração se aplicará
    a todos os objetos já instanciados e os que serão instanciados.

FIXANDO:

1 - Crie um método estático que receba como parâmetro character: Character e, dentro dele, chame os métodos
    talk e specialMove para apresentar o personagem.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
abstract class Character {
  abstract talk(): void;
  abstract specialMove(): void;

  static characterPresentation(character: Character): void {
    character.talk();
    character.specialMove();
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2 - Agora, ao invés de acionarmos os métodos talk e specialMove individualmente a partir das instâncias,
    acione-os por meio do método estático criado no exercício anterior.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const yoshi = new MeleeCharacter('Yoshi', 'Super dragon');
const samus = new LongRangeCharacter('Samus', 'Zero Laser');

Character.characterPresentation(yoshi);
Character.characterPresentation(samus);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== SINTAXE COM INTERFACES E GENERICS ======================================

POLIMORFISMO COM INTERFACES:

O polimorfismo com interfaces se dá da mesma forma que o com herança.

Duas classes diferentes implementam a mesma interface, implementando também os métodos obrigatórios que a Interface estipula.

Há uma garantia de que tudo o que a Interface estipula está implementado na classe e, consequentemente, no objeto.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
interface Person {
  id: number;
  name: string;
  showIdentification(): void;
}

class PhysicalPerson implements Person {
  private static lastId = 0;
  private _name;
  private _id;
  private _cpf;

  constructor(name: string, cpf: string) {
    this._id = PhysicalPerson.newId();
    this._name = name;
    this._cpf = cpf;
  }

  private static newId() { return this.lastId++; }
  get id() { return this._id; }
  get name() { return this._name; }
  get cpf() { return this._cpf; }
  showIdentification() { console.log(this.id, this._cpf); }
}

class LegalPerson implements Person {
  private static lastId = 0;
  private _name;
  private _id;
  private _cnpj;

  constructor(name: string, cnpj: string) {
    this._id = LegalPerson.newId();
    this._name = name;
    this._cnpj = cnpj;
  }

  private static newId() { return this.lastId++; }
  get id() { return this._id; }
  get name() { return this._name; }
  get cnpj() { return this._cnpj; }
  showIdentification() { console.log(this.id, this._cnpj); }
}

const pp0 = new PhysicalPerson('John', '123456789');
const pp1 = new PhysicalPerson('Jenny', '987654321');
const lp = new LegalPerson('International Sales SA', '834729384723');

const showIdentification = (person: Person) => {
  person.showIdentification();
}
showIdentification(pp0);
showIdentification(pp1);
showIdentification(lp);

/*
Saída:
0 123456789
1 987654321
0 834729384723
*/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GARANTIA E TIPO COM GENERICS:

Ao passar simplesmente Pessoa como tipo da pessoa corretora, você perde a capacidade de acessar elementos específicos
das classes PessoaFísica e PessoaJurídica.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Contract {
  static _number = 0;
  constructor(public broker: Person){}
  static get number() { return this._number; }
}

const c1 = new Contract(pp0);
console.log(c1.broker.cpf); // Erro, pois não existe cpf em Person
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para garantir o tipo utilizado, podemos utilizar generics.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Contract<T> { // Agora a classe recebe o genérico T
  static _number = 0;
  constructor(public broker: T) { } // T no lugar de Person
  static get number() { return this._number; }
}

// Tipo inferido (não explícito)
const c1 = new Contract(pp0); // TypeScript "advinha" que pp0 é pessoa física
console.log(c1.broker.cpf); // Okay

// Tipagem explícita
const c2: Contract<LegalPerson> = new Contract(lp); // Deixo explícito que lp é pessoa jurídica
console.log(c2.broker.cnpj); // Okay

/*
Saída:
123456789
834729384723
*/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FIXANDO:

1 - Crie uma Interface chamada IModel que defina as operações básicas de um CRUD para a entidade Character.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
interface IModel {
  create: (character: Character) => Promise<DbCharacter>;
  update: (id: number, character: Character) => Promise<DbCharacter>;
  delete: (id: number) => Promise<boolean>;
  getAll: () => Promise<DbCharacter[]>;
  getById: (id: number) => Promise<DbCharacter>;
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2 - Crie uma classe LocalDbModel que implemente a Interface IModel.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class LocalDbModel implements IModel {
  create = async (character: Character) => {
    const lastId = db.length > 0 ? db[db.length - 1].id : 0;
    const newCharacter = { id: lastId + 1, ...character };
    db.push(newCharacter);
    return newCharacter;
  };

  findIndexById = (id: number) => {
    const index = db.findIndex((character) => character.id === id);
    if (index < 0) throw new Error('Character not found');
    return index;
  };

  update = async (id: number, character: Character) => {
    const indexToUpdate = this.findIndexById(id);
    db[indexToUpdate] = { ...db[indexToUpdate], ...character };
    return db[indexToUpdate];
  };

  delete = async (id: number) => {
    const indexToDelete = this.findIndexById(id);
    const deletedItem = db.splice(indexToDelete, 1);
    if (deletedItem.length > 0) return true;
    return false;
  };

  getAll = async () => db;

  getById = async (id: number) => {
    const indexToGet = this.findIndexById(id);
    return db[indexToGet];
  };
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3 - Crie uma classe CharacterService que recebe como dependência em seu construtor uma instância do
    tipo LocalDbModel e a utilize em sua lógica de negócio.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class CharacterService {
  constructor(readonly model: LocalDbModel) { }

  async create(character: Character) {
    const newCharacter = await this.model.create(character);
    return ({ status: 201, data: newCharacter });
  }

  async getAll() {
    const allCharacter = await this.model.getAll();
    return ({ status: 200, data: allCharacter });
  }

  async getById(id: number) {
    const allCharacter = await this.model.getById(id);
    return ({ status: 200, data: Character });
  }

  async delete(id: number) {
    const allCharacter = await this.model.delete(id);
    return ({ status: 200 });
  }

  async update(id: number, character: Character) {
    const allCharacter = await this.model.update(id, character);
    return ({ status: 200, data: updatedCharacter });
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

4 - Refatore CharacterService para que possa receber uma instância de qualquer classe que implemente a Interface IModel.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class CharacterService {
  constructor(readonly model: IModel) { } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  async create(character: Character) {
    const newCharacter = await this.model.create(character);
    return ({ status: 201, data: newCharacter });
  }

  async getAll() {
    const allCharacter = await this.model.getAll();
    return ({ status: 200, data: allCharacter });
  }

  async getById(id: number) {
    const allCharacter = await this.model.getById(id);
    return ({ status: 200, data: Character });
  }

  async delete(id: number) {
    const allCharacter = await this.model.delete(id);
    return ({ status: 200 });
  }

  async update(id: number, character: Character) {
    const allCharacter = await this.model.update(id, character);
    return ({ status: 200, data: updatedCharacter });
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

5 - Crie uma classe MockedDbModel que implemente IModel com uma versão mock.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class MockDbModel implements IModel {
  async create(character: Character) {
    console.log('character created');
    return { id: 1, name: 'Peach', specialMove: 'Toad' };
  }

  async update(id: number, character: Character) {
    console.log('character updated');
    return { id: 1, name: 'Yoshi', specialMove: 'Egg Lay' };
  }

  async delete(id: number) {
    console.log('character deleted');
    return true;
  }

  async getAll() {
    return [
      { id: 1, name: 'Samus', specialMove: 'Charge Shot' },
      { id: 2, name: 'Kirby', specialMove: 'Inhale' },
    ];
  }

  async getById(id: number) {
    return { id: 1, name: 'Mario', specialMove: 'Fireball' };
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== RESOLUÇÃO PROBLEMÁTICA ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
type BoardColumn = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type BoardRow = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
type BoardSquare = [BoardColumn, BoardRow];

const boardColumns: BoardColumn[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const boardRows: BoardRow[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

const isBoardSquareInList = (element: BoardSquare, list: BoardSquare[]) =>
    list.some(e => element[0] === e[0] && element[1] === e[1]);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Agora, vamos definir a estrutura (a classe) de uma peça de xadrez genérica:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
abstract class Piece {
  protected _position: BoardSquare;
  abstract type: string;

  constructor(position: BoardSquare, protected board: Board) {
      this._position = position;
  };

  get position() { return this._position; }
  abstract get availableMoves(): BoardSquare[];

  move(newPosition: BoardSquare) {
      console.log(
          `MOVENDO ${this.type} DA CASA ${this._position} PARA A CASA ${newPosition}`
      );
      if (!isBoardSquareInList(newPosition, this.availableMoves)) return false;
      this._position = newPosition;
      return true;
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Observe que a classe Piece (Peça) é uma classe abstrata. Além disso, repare que o método availableMoves
(obter movimentos disponíveis) é um método abstrato, pois cada tipo de peça se movimenta de uma forma diferente.
OBS: availableMoves é um getter, mas a sintaxe de método abstrato pode ser utilizada com métodos normais também!

PEÂO:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Pawn extends Piece {
  type = 'Peão';
  get availableMoves() {
      const column = this.position[0];
      const row = this.position[1];
      const rowIndex = boardRows.indexOf(row);
      if (rowIndex === 7)
          return [];

      const nextSquare: BoardSquare = [column, boardRows[rowIndex + 1]];
      if (isBoardSquareInList(nextSquare, this.board.occupiedSquares))
          return [];

      return [nextSquare];
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TORRE:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Rook extends Piece {
  type = "Torre";
  get availableMoves() {
      const column = this.position[0];
      const columnIndex = boardColumns.indexOf(column);

      const row = this.position[1];
      const rowIndex = boardRows.indexOf(row);

      let availableSquares: BoardSquare[] = [];

      // Adiciona todas as casas abaixo
      for (let i = rowIndex - 1; i >= 0; i--) {
          const square: BoardSquare = [boardColumns[columnIndex], boardRows[i]];
          if (isBoardSquareInList(square, this.board.occupiedSquares)) break;
          availableSquares.push(square);
      }

      // Adiciona todas as casas acima
      for (let i = rowIndex + 1; i < 8; i++) {
          const square: BoardSquare = [boardColumns[columnIndex], boardRows[i]];
          if (isBoardSquareInList(square, this.board.occupiedSquares)) break;
          if (isBoardSquareInList(square, availableSquares)) continue;
          availableSquares.push(square);
      }

      // Adiciona todas as casas na direita
      for (let i = columnIndex + 1; i < 8; i++) {
          const square: BoardSquare = [boardColumns[i], boardRows[rowIndex]];
          if (isBoardSquareInList(square, this.board.occupiedSquares)) break;
          if (isBoardSquareInList(square, availableSquares)) continue;
          availableSquares.push(square);
      }

      // Adiciona todas as casas na esquerda
      for (let i = columnIndex - 1; i >= 0; i--) {
          const square: BoardSquare = [boardColumns[i], boardRows[rowIndex]];
          if (isBoardSquareInList(square, this.board.occupiedSquares)) break;
          if (isBoardSquareInList(square, availableSquares)) continue;
          availableSquares.push(square);
      }

      return availableSquares;
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TABULEIRO:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Board {
  pieces: Piece[] = [];

  constructor() {
      this.addPiece(new Pawn(['C', '2'], this));
      this.addPiece(new Rook(['F', '1'], this));
  }

  private addPiece(piece: Piece) {
      if (isBoardSquareInList(piece.position, this.occupiedSquares))
          return;
      this.pieces.push(piece);
  }
  get occupiedSquares() {
      return this.pieces.map((piece) => piece.position);
  }

}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~