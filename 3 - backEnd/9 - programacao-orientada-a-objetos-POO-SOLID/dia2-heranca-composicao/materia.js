====================================== HERANÇA E COMPOSIÇÃO ======================================

Como compartilhar lógica entre classes, criando versões especializadas de classes, com base tanto na
herança como na implementação de uma interface.

====================================== PROBLEMATIZAÇÃO ======================================

Você precisa, de forma eficiente, criar entidades que representem pessoas físicas e pessoas jurídicas,
compartilhando alguns elementos em comum, tais como nome e endereço, mas com elementos específicos de
cada uma delas, como CPF e CNPJ.

Além disso, você precisa criar uma Interface para contratos, que devem possuir cláusulas e devem poder
ser assinados por pessoas diversas.

====================================== HERANÇA ======================================

Herança:  é a capacidade de especializar classes, de forma a atender objetivos mais específicos. Com
isso podemos criar uma classe com o comportamento base, e estender os comportamentos de uma classe
existente sem precisar modificá-la.

  (!) A classe base é denominada classe mãe ou superclasse, e a classe que estende dela é denominada
      classe filha ou subclasse.

====================================== SINTAXE GERAL ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Animal {
  /*
    Ao invés de declarar os atributos antes do construtor, receber parâmetros
    no construtor e colocá-los nos atributos da classe, se não formos
    validar, podemos utilizar uma forma simplificada de escrita, simplesmente
    colocando o modificador de visibilidade na frente
    do nome do parâmetro no construtor

    Exemplo
    O seguinte código:

    public x: number
    constructor(x: number) { this.x = x }

    Pode ser substituído por:

    constructor(public x: number) { }
    
    Obs: Usando essa sintaxe é necessário indicar explicitamente 
    logo antes do nome do atributo se ele é public, private, protected ou readonly
  */
  constructor(public name: string, private birthDate: Date) { }

  get age() {
    /*Para operar com datas, vamos operar somente com milissegundos. Uma data
    é o número de milissegundos desde o dia 01/01/1970 (era Unix).*/
    const timeDiff = Math.abs(
      Date.now() -
      new Date(this.birthDate).getTime()
    );

    /*Convertendo de volta para o número de anos inteiros, considerando anos bissextos.
    Tente entender a lógica abaixo: como converter de milissegundos para anos?*/
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
}

class Mammal extends Animal { // <<<<<<<<<<<<<<<<<<<<<<
  walk() {
    console.log(`${this.name} está andando!`);
  }
}

const tiger = new Mammal(
  'Tigre',
  new Date(Date.parse('May 03, 2020')),
);

const main = (animal: Animal) => { // <<<<<<<<<<<<<<<<<<<<<<
  console.log(animal.age);
}

main(tiger);
tiger.walk();

/*
Saída (código rodado em Mar/2022):
1
Tigre está andando!
*/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  (!) Observe que a função main espera receber um parâmetro do tipo Animal. Porém, o objeto passado
      para a função é o objeto tiger, que é do tipo Mammal. Isso ocorre pois todo Mammal é também um
      Animal, então qualquer parâmetro do tipo Animal pode receber um objeto de classes filhas. Essa
      é a grande vantagem do polimorfismo por subtipagem (ou herança).

  (!) A função main, porém, só entende um objeto do tipo Animal. Por isso ela não consegue acessar nada
      restrito ao subtipo Mammal (também conhecida como classe filha ou subclasse)! Você vai obter um erro
      que diz “a propriedade ‘walk’ não existe no tipo Animal“.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const main = (animal: Animal) => {
  console.log(animal.age);
  animal.walk(); // error: Property 'walk' does not exist on type 'Animal'.
}

main(tiger);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FIXANDO:

class Superclass {
  isSuper: boolean;

  constructor() {
    this.isSuper = true;
  }

  public sayHello(): void {
    console.log('Olá mundo!')
  }
}

class Subclass extends Superclass {}

const myFunc = (object: Superclass) => {
  object.sayHello();
}

const sup = new Superclass();
const sub = new Subclass();

myFunc(sup);
myFunc(sub);

====================================== ATRIBUTOS PROTEGIDOS ======================================

Observe que temos, na classe Animal, um atributo privado birthDate (data de nascimento). Você não
pode acessar ou alterar este atributo fora da classe Animal.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Animal {
  constructor(private birthDate: Date) { } // Repare no private

}
class Bird extends Animal {
  showBirthDate() {
    console.log(this.birthDate); // ERRO! birthDate é privado e não é visível pra subclasse Bird.
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Entretanto, às vezes precisamos manter alguns atributos e métodos privados do mundo externo, mas
possíveis de serem modificados dentro de subclasses. É aí que entra o protected.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Animal {
  constructor(protected birthDate: Date) { } // Protected: classe filha pode ler e escrever, mas acessos externos não
}
class Bird extends Animal {
  showBirthDate() {
    console.log(this.birthDate); // Okay!
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

====================================== SUPER ======================================

(!) Sempre que você, na subclasse, queira referenciar a superclasse, poderá utilizar a palavra reservada super.

Em TypeScript, o método construtor de uma subclasse deve ser o mesmo da superclasse (os exemplos anteriores
funcionaram pois não tinham o construtor), ou deve chamar o da superclasse.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Animal {
  constructor(protected birthDate: Date) { }
}
class Bird extends Animal {
  constructor(public name: string) {
    super(new Date());
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

O super é basicamente uma referência à superclasse. Ao ser invocado como uma função, está invocando o construtor
da superclasse.

O super também é útil quando fazemos sobrescrita de métodos,

====================================== IMPLEMENTANDO INTERFACES ======================================

Atualmente, quando falamos de orientação a objetos, falamos também de Orientação a Interfaces. Na herança,
temos a ideia de que subclasses vão herdar métodos e atributos das superclasses.

Quando estamos usando Interfaces, porém, temos uma Class que vai implementar métodos definidos em uma interface.
O objetivo é desacoplar a implementação do contrato.

Na interface, nós determinamos quais as assinaturas dos métodos e quais atributos o contrato deve respeitar.
A Interface por si só não pode ser instanciada, ou seja, não podemos usar ela junto com o new para criar um
objeto novo. Ela é apenas o contrato que será implementado por uma classe.

Na Interface não implementamos nenhum código, apenas definimos o contrato (atributos e assinatura dos métodos).
A classe que implementar essa interface, deve, obrigatoriamente, implementar todos os métodos e ter todos os
atributos que a Interface declara.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
interface Animal {
  name: string;
  age: number;

  getBirthDate(): Date;
}

class Bird implements Animal { // <<<<<<<<<<<<<<<<<<<<<<<
  constructor(
    public name: string,
    private birthDate: Date) {}

  get age() {
    var timeDiff = Math.abs(Date.now() - new Date(this.birthDate).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  getBirthDate() { return this.birthDate; }

  fly() { console.log(`${this.name} está voando!`); }
}

const parrot = new Bird(
  'Papagaio',
  new Date(Date.parse('Aug 16, 2015')),
);

console.log(parrot.age);
parrot.fly();

/*
Saída (código executado em Mar/2022):
6
Papagaio está voando!
*/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(!) Observe que a Interface é implementada por uma classe por meio da sintaxe: clasS Classe implements Interface.

Importante salientar que a Interface é um contrato de tudo que a classe deve possuir de forma PÚBLICA.
Atributos privados precisam ter seu correspondente público, e você pode usar getters e setters como uma forma pública
de acessar atributos privados.

FIXANDO:

interface MyInterface {
  myNumber: number;

  myFunc(myParam: number): string;
}

class MyClass implements MyInterface {
  constructor(public myNumber: number) {
    this.myNumber = myNumber;
  }

  myFunc(myParam: number): string {
    console.log(`A somatória é ${this.myNumber + myParam}`)
  }
}

const a = new MyClass(10);
console.log(a.myFunc(10)) // 'A somatória é 20'

====================================== INTERFACES X CLASSES ======================================

Interfaces e (super)classes podem servir para especificar o comportamento de classes, mas de formas e em níveis distintos.

1 - Quando utilizamos interfaces, queremos garantir que alguns atributos e métodos existam, sem se importar com o que fazem.

2 - Já quando utilizamos a herança, disponibilizamos não só um contrato, mas uma base já implementada de código que funciona,
    de forma que apenas vamos especializar esta base de código adicionando novas funcionalidades.


(!) Quando a classe A implementa a Interface I, ela deve implementar todos os métodos declarados em I e possuir todos os
    atributos de I. Quando a classe A herda da classe B, ela já herda todos os métodos e atributos públicos ou protegidos
    implementados na classe B.

====================================== COMPOSIÇÃO E AGREGAÇÃO ======================================

COMPOSIÇÃO:

(!) A composição de objetos/classes é uma forma de combinar objetos ou tipos de dados para construir sua estrutura.

O segredo para entender se existe relação entre duas classes é se perguntar:

    “A classe Secundária (perfil) está contida na classe Principal (conta)?”.

Se a resposta for sim, você tem uma composição.

1 - Qual a diferença entre composição e herança?

A herança tem por característica obter todas as propriedades da classe principal. Com isso, você obtém todos os atributos
e métodos, deixando a classe secundária mais especializada e específica. Isso quer dizer que se você precisar alterar algo
na classe principal você vai refletir isso na sua classe secundária.

Por outro lado, a composição permite que você realize alterações na classe principal sem afetar as demais envolvidas ou
correr o risco de comprometer algum comportamento.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Profile {
  private name: string;
  private email: string;

  public setName(name: string) {
    this.name = name;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public toString(): string {
    return `name - [${this.name}] - email - [${this.email}]`;
  }
}

class SocialMediaAccount {
  // Cria nossa composição com o perfil --- NÃO EXTENDEU E SIM AGREGOU DENTRO DA NOVA CLASSE
  private profile = new Profile();

  public editProfile(name: string, email: string) {
    this.profile.setName(name);
    this.profile.setEmail(email);
  }

  public printProfile() {
    console.log(this.profile.toString());
  }
}

const socialMediaAccount = new SocialMediaAccount();
socialMediaAccount.editProfile('Manuella', 'manu@trybe.com');
socialMediaAccount.printProfile();
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No código acima, você possui a classe Profile que possui os métodos responsáveis por atualizar o nome e email do perfil.

Em seguida, temos uma classe SocialMediaAccount que vai instanciar a classe Profile e ser utilizada no método editProfile
para você editar o nome e email na respectiva conta da rede social.

A ação de utilizarmos a classe do perfil (Profile) para compor a classe de conta da rede social (SocialMediaAccount) é
conhecida por composição.

AGREGAÇÃO:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Friend {
  private nickname: string;

  public getNickname(): string {
    return this.nickname;
  }

  public setNickname(nickname: string) {
    this.nickname = nickname;
  }
}

class SocialMediaAccount {
  private friends = new Array<Friend>();

  public addFriend(friend: Friend) {
    this.friends.push(friend);
  }

  public printFriends() {
    this.friends.map((friend) => console.log(friend));
  }
}

const socialMediaAccount = new SocialMediaAccount();

const friendCarol = new Friend();
friendCarol.setNickname('Carol');

const friendFernando = new Friend();
friendFernando.setNickname('Fernando');

socialMediaAccount.addFriend(friendCarol);
socialMediaAccount.addFriend(friendFernando);
socialMediaAccount.printFriends();
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No código acima, você possui a classe Friend que possui os métodos responsáveis por atualizar o nickname de uma pessoa
amiga.

Em seguida, você tem uma classe SocialMediaAccount que possui um array de pessoas amigas e possui o método addFriend
para adicionar novas pessoas amigas na respectiva conta da rede social.

Por fim, você instância a classe SocialMediaAccount para representar uma conta e a classe Friend realizando a atualização
de cada nickname para representar as duas pessoas amigas que você gostaria de adicionar na conta.

====================================== RESOLUÇÃO DA PROBLEMÁTICA ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
interface Contract {
  subject: string;
  clauses: string[];
  signatories: Person[];
  describe(): void;
}

class Person {
  private _name;
  constructor(name: string) {
    this._name = name;
  }
  get name() { return this._name; }
}

class NaturalPerson extends Person {
  private _cpf;
  constructor(name: string, cpf: string) {
    super(name);
    this._cpf = cpf;
  }
  get cpf() { return this._cpf; }
}

class LegalPerson extends Person {
  private _cnpj;
  constructor(name: string, cnpj: string) {
    super(name);
    this._cnpj = cnpj;
  }
}

class SalesContract implements Contract {
  private _signatories: Person[];
  private _clauses: string[];

  constructor() {
    this._signatories = [];
    this._clauses = [];
  }

  get signatories() { return [...this._signatories]; }
  get clauses() { return [...this._clauses]; }
  get subject() { return "Sales"; }

  sign(signatory: Person) { this._signatories.push(signatory); }
  addClause(clause: string) {
    if (this._signatories.length > 0) return;
    this._clauses.push(clause);
  }

  describe() {
    console.log('--------------------');
    console.log(`Contrato: ${this.subject}`);
    this.clauses.forEach((clause) => { console.log(`Cláusula: ${clause}`) });
    this.signatories.forEach((signatory) => { console.log(`Assinado por: ${signatory.name}`) });
    console.log('--------------------\n');
  }
}

const s1 = new SalesContract();
const pp1 = new NaturalPerson('Tony', '123456789');
const pp2 = new NaturalPerson('Lilly', '987654321');
const lp = new LegalPerson('International Sales SA', '23961237162378');

s1.describe();
s1.addClause('Foo');
s1.addClause('Bar');
s1.describe();
s1.sign(pp1);
s1.sign(pp2);
s1.describe();
s1.addClause('Baz');
s1.sign(lp);
s1.describe();

/*
Saída:
--------------------
Contrato: Sales
--------------------

--------------------
Contrato: Sales
Cláusula: Foo
Cláusula: Bar
--------------------

--------------------
Contrato: Sales
Cláusula: Foo
Cláusula: Bar
Assinado por: Tony
Assinado por: Lilly
--------------------

--------------------
Contrato: Sales
Cláusula: Foo
Cláusula: Bar
Assinado por: Tony
Assinado por: Lilly
Assinado por: International Sales SA
--------------------
 */
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~