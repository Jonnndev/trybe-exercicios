====================================== INTRODUÇÃO: ORIENTAÇÃO A OBJETOS ======================================

Programação Orientada a Objetos é um dos paradigmas de programação mais populares, se não o mais popular. 
Linguagens como Java, Python, C++, Ruby e a clássica Smalltalk são fortemente voltadas para que se programe
de forma orientada a objetos. Até mesmo linguagens como JavaScript, que não abraçam o paradigma completamente,
são muito influenciadas por ele. As classes de JavaScript, por exemplo, vêm da Programação Orientada a Objetos.

====================================== PROBLEMATIZAÇÃO ======================================

A liderança da empresa que você trabalha te pediu para implementar um projeto de desenvolvimento que consiste
em um simples gerenciador e-mails.

Para isso, você precisa de:

1 - Uma modelagem de representação genérica de um email

    1.1 - Todo e-mail criado deve possuir os campos:

      1.1.1- Endereço de e-mail da pessoa remetente

      1.1.2 - Endereço de e-mail da pessoa destinatária

      1.1.3 - Assunto da mensagem, que não pode ter mais de 20 caracteres

      1.1.4 - Mensagem

    1.2 - Todo e-mail criado deve ter sua representação textual, que combina todos os dados em uma string única

2 - Uma representação genérica de uma lista de e-mails (mailList)

  2.1 - A lista de e-mails deve ser capaz de retornar e-mails filtrados por pessoa remetente, destinatária ou
        por assunto.

====================================== ANALOGIA ======================================

I - Classe: é o primeiro dos conceitos. Ele é utilizado para determinar algo genérico. Na programação orientada
    a objetos, toda classe tem como finalidade modelar com precisão a representação de uma entidade do mundo real.


Exemplo: Conceito Pessoa.
  
    --> Existem várias pessoas no mundo, sendo você e eu duas delas, e por mais que sejamos pessoas diferentes,
        pertencemos a mesma classe Pessoa. 

II - Objetos: Objeto ou instância da classe é algo específico.

    --> Cada Pessoa é um objeto diferente.

III - Atributos s e métodos: Existem dentro das classes e objetos.
      # Um atributo representa um valor;
      # Um método representa uma ação;

    --> Altura de uma Pessoa é seu atributo.
    --> Uma pessoa pode dormir ou acordar - método.

    (!)`Um atributo é uma variável criada numa classe, e um método é uma função criada numa classe.`

    (!) Método constructor: é rodado automaticamente na criação de um objeto, e serve para inicializar alguns
        atributos e chamar alguns métodos. 

(!)` Uma classe é uma estrutura que abstrai um conjunto de objetos com características similares, e um objeto é uma
    instância (ou seja, um exemplar) de uma classe. Uma classe define o comportamento de seus objetos - através de
    métodos - e os estados possíveis destes objetos - através de atributos.`

====================================== PILARES DA POO ======================================

1 - ABSTRAÇÃO: indica que você não necessariamente precisa saber os detalhes de como algo funciona.

2 - ENCAPSULAMENTO: faz com que alguns atributos só possam ser acessados e/ou modificados dentro da classe.

3 - HERANÇA: permite que classes filhas, que herdam métodos e atributos de outra classe (super classe), sejam criadas. 

4 - POLIMOSRFISMO: permite que coisas diferentes aconteçam ao chamarmos objetos de classes filhas distintas de uma mesma super classe.

====================================== SINTAXE GERAL ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Person {
  name: string;
  height: number;
  weight: number;

  constructor(n: string, h: number, w: number) {
    console.log(`Creating person ${n}`);
    this.name = n;
    this.height = h;
    this.weight = w;
  }

  sleep() {
    console.log(`${this.name}: zzzzzzz`);
  }
}

const p1 = new Person('Maria', 171, 58);
const p2 = new Person('João', 175, 66);
console.log(p1.name, p1.height, p1.weight);
console.log(p2.name, p2.height, p2.weight);
p1.sleep();
p2.sleep();

/*
Saída:
Creating person Maria
Creating person João
Maria 171 58
João 175 66
Maria: zzzzzzz
João: zzzzzzz
*/
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FIXANDO:

1 - Crie uma classe chamada Tv, com os atributos:

brand: marca da TV;
size: tamanho em polegadas;
resolution: resolução da tela;
connections: conexões disponíveis(HDMI, Ethernet, etc.);
connectedTo: conexão atual Este atributo não precisa ser inicializado no construtor.

2 - Dentro da classe Tv, crie o método turnOn, que imprimirá os atributos inicializados no construtor.

3 - Instancie um objeto a partir da classe Tv, chame o método turnOn para imprimir seus atributos.

class Tv {
  brand: string;
  size: number;
  resolution: string;
  connections: string[];
  connectedTo?: string;

  constructor(brand: string, size: number, resolution: string, connections: string[]) {
    this.brand = brand;
    this.size = size;
    this.resolution = resolution;
    this.connections = connections;
  }

  turnOn(): void {
    console.log(this.brand, this.size, this.resolution, this.connections)
  }
}

====================================== ABSTRAÇÃO ======================================

A mentalidade ao desenvolver código Orientado a Objetos deve ser essa: a pessoa que vai usá-lo não deve
ter que se preocupar em como determinado método funciona. Ela só precisa saber que, ao receber certa entrada,
esse método irá retornar ou exibir um certo resultado.

====================================== ENCAPSULAMENTO ======================================

A ideia é garantir que os processos internos da classe possam ocorrer sem que a pessoa que a utiliza altere 
atributos de forma indevida, o que poderia ocasionar em problemas no funcionamento. Para isso existem os
modificadores de visibilidade do atributo, sendo os principais o public, o private, o protected e o readonly.

Para alterar atributos privados fora de uma classe, utilizamos os métodos. Eles validam as leituras e alterações,
de forma a não comprometer o funcionamento da classe.

====================================== SINTAXE DE ENCAPSULAMENTO ======================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Person {
  name: string;
  private _weight: number;
  private _age: number;
  readonly height: number;

  constructor(name: string, height: number, weight: number, age: number) {
    this.name = name;
    this._weight = weight;
    this._age = age;
    this.height = height;
  }

// esta sintaxe permite acessar o valor retornado via person.getWeight()
  getWeight() {
    return this._weight;
  }

// esta sintaxe permite acessar o valor retornado via person.age (como se fosse um atributo normal)
  get age() {
    return this._age;
  }

// do mesmo modo, esta sintaxe permite modificar o valor com uma simples atribuição: person.age = 42
// mesmo que esteja ocorrendo uma validação internamente
  set age(newValue: number) {
    if (newValue >= 0 && newValue < 200) {
      this._age = newValue;
    }
  }

  birthday() {
    this._age += 1;
  }

}

const p1 = new Person('Maria', 171, 58, 19);
const p2 = new Person('João', 175, 66, 18);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FIXANDO:

5 - Altere a visibilidade dos atributos definidos na classe Tv para private.

6 - Crie um método getter e um setter para o atributo _connectedTo, da classe Tv.

O setter deverá verificar se o valor definido está entre as conexões disponíveis (_connections) e:
Em caso positivo, definir este valor para o atributo _connectedTo;
Em caso negativo, imprimir no console a mensagem “Sorry, connection unavailable!”

7 - Defina um valor para o atributo _connectedTo por meio do método setter criado e imprima seu valor.

class Tv {
  private _brand: string;
  private _size: number;
  private _resolution: string;
  private _connections: string[];
  private _connectedTo?: string;

  constructor(brand: string, size: number, resolution: string, connections: string[]) {
    this._brand = brand;
    this._size = size;
    this._resolution = resolution;
    this._connections = connections;
  }

  turnOn(): void {
    console.log(this._brand, this._size, this._resolution, this._connections)
  }

  get connectedTo(): string | undefined {
    return this._connectedTo;
  }

  set connectedTo(connect: string) {
    if (this.connections.includes(connect)) {
      this._connectedTo = connect;
      console.log(this._connectedTo);
    } else {
      console.log('Sorry, connection unavailable!');
    }
  }
}

====================================== RESOLUÇÃO PROBLEMA INICIAL ======================================

Primeiramente vamos criar a classe Email. Ela será responsável por guardar os dados do e-mail na forma de 
atributos. Além disso, Email possui alguns métodos, sendo o mais importante deles o get content, que retorna
uma string formatada com todo o corpo do e-mail.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Email {
  private _from: string;
  private _to: string;
  private _message: string;
  private _subject: string;

  constructor(
    from: string,
    to: string,
    subject: string,
    message: string,
  ) {
    this._from = from;
    this._to = to;
    this._message = message;
    this._subject = subject;
  }

  set subject(newSubject: string) {
    if (newSubject.length <= 40) this._subject = newSubject;
  }

  get subject(): string {
    return this._subject;
  }

  get from(): string { return this._from; }

  get to(): string { return this._to; }

  get content(): string {
    return `
    From ${this._from} to ${this._to}
    ${this.subject}

    ${this._message}`;
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Em seguida vem a criação da classe MailList, que representa uma lista de e-mails. Esta é uma classe muito
interessante, pois nos permite manter todos os e-mails correlacionados em um único objeto. Além disso, nos
permite filtrar os e-mails da lista de forma simplificada, utilizando abstração.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class MailList {
  // Essa sintaxe no construtor é chamada `Parameter Properties`
  // É um atalho para declarar e automaticamente atribuir o valor que será recebido via parâmetro ao atributo privado `mailList`
  constructor(private mailList: Email[] = []) { }

  get all(): Email[] { return this.mailList; }

  getEmailsBySender(mailAddress: string): Email[] {
    return this.mailList.filter((mail) => mail.from === mailAddress);
  }

  getEmailsTo(mailAddress: string): Email[] {
    return this.mailList.filter((mail) => mail.to === mailAddress);
  }

  getEmailsBySubject(searchString: string): Email[] {
    return this.mailList
      .filter((mail) => mail.subject.indexOf(searchString) !== -1);
  }

  addEmail(newMail: Email): void { this.mailList.push(newMail); }

  removeEmail(mailToRemove: Email): void {
    // note que como essa é uma comparação de objetos, esse filter só funcionará se a referência de `mail` e `mailToRemove` for a mesma
    this.mailList = this.mailList.filter((mail) => mail !== mailToRemove);
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~