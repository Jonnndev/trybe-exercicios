====================================== SOLID: INRTRODUÇÃO AOS PRINCIPIOS S, O, D ======================================

A palavra SOLID no contexto de programação, é um acrônimo para cinco princípios que, se aplicados
de maneira conjunta e inteligente, geram solidez e durabilidade para sua arquitetura como um todo.

====================================== OS PRINCÍPIOS ======================================

-> Single responsibility principle (Princípio da responsabilidade única): uma entidade (classe,
   método, função, etc) deve ter apenas uma única responsabilidade;

-> Open/Closed principle (Princípio aberto/fechado): entidades de software devem ser abertas para
   extensão, mas fechadas para modificação;

-> Liskov substitution principle (Princípio de substituição de Liskov): objetos em um programa devem
  ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa; 

-> Interface segregation principle (Princípio da segregação da interface): interfaces específicas são
   melhores do que uma única Interface para todos os propósitos;

-> Dependency inversion principle (Princípio da inversão da dependência): entidades de alto nível não
   devem depender de entidades de baixo nível. Ambos devem depender de abstrações.

====================================== SINGLE RESPONSIBILITY PRINCIPLE (S) ======================================

Manter o nível de complexidde BaseAudioContext, dividindo As funções com responsabilidade única, aumentado a coesão e diminuindo
o acoplamento da aplicação.

Cada classe deve possuir somente uma finalidade. Isso também se aplica, em certo nível, à organização dos arquivos que contém
nosso código.

====================================== OPEN/CLOSE PRINCIPLE (O) ======================================

Você deve ser capaz de estender um comportamento de uma entidade sem modificar seus comportamentos já existentes.
Independência dos elementos.

====================================== DEPENDENCY INVERSION PRINCIPLE (D) ======================================

1 - Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações

2 - Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

Dependência:

A dependência ocorre quando uma entidade de software (geralmente uma classe ou função) utiliza outra entidade em
seu interior. 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Flute.ts
export default class Flute {
  /* Não se preocupe com problemas do eslint, estamos usando um exemplo didático */
  constructor(public name: string) { }
  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Musician.ts
import Flute from './Flute';

export default class Musician {
  public flute: Flute; //<<<<<<<<<<<<

  constructor(public name: string) {
    this.flute = new Flute('minha flauta'); //<<<<<<<<<<<<
  }

  play(): void {
    this.flute.play(); //<<<<<<<<<<<<
    console.log(
      `"${this.name}" é quem está comandando a emissão das melodias`,
    );
  }
}

const musician = new Musician('Márcia');
musician.play();
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Inversão de dependência:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
interface Instrument {
  name: string;
  play(): void;
}

class Flute implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Drums implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está fazendo o ar vibrar bem forte`);
  }
}

class Guitar implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está vibrando suas cordas`);
  }
}

class Musician {
  constructor(
    public name: string,
    public instrument: Instrument = new Flute('Minha flauta') //<<<<<<<<<<<<
  ) { }

  play() {
    this.instrument.play(); //<<<<<<<<<<<<
    console.log(
      `"${this.name}" é quem está comandando a emissão dos sons`
    );
  }
}

const musician1 = new Musician('Márcia');
const musician2 = new Musician('Vicente', new Drums('Minha bateria'));
const musician3 = new Musician('Natan', new Guitar('Meu violão'));

musician1.play();
musician2.play();
musician3.play();
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~