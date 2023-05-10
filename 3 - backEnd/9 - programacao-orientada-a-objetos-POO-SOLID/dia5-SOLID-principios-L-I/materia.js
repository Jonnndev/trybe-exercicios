====================================== SOLID: INRTRODUÇÃO AOS PRINCIPIOS L, I ======================================

====================================== LISKOV SUBSTITUTION PRINCIPLE (L) ======================================

Objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa.

Podemos estender isso para uma Interface (já que uma interface pode ser vista como uma classe abstrata com todos os métodos
e elementos públicos, e nenhum método implementado): se A é uma Interface e B é uma classe que implementa A, onde quer que
seja esperada algo do tipo A, se B for passada seu programa deve se comportar da mesma forma.

1 - A ideia principal é que você deve manter a assinatura dos métodos das subclasses idênticas as da superclasse
   (o TypeScript já te obriga a isto, mas existem linguagens que não o fazem).

2 - Os métodos implementados nas subclasses devem possuir a mesma assinatura e a mesma semântica, ou seja, devem
    fazer a mesma coisa. É importante ressaltar isso, porque você pode manter a assinatura, mas utilizar os dados
    para fazer algo completamente diferente, o que semanticamente quebra o princípio.

3 - As validações dos dados necessários para o funcionamento correto do método criado na subclasse não devem ser
    mais estritas. Ex: Imagine que RedisConnector.incrementCount faça uma verificação do tamanho do token antes de
    prosseguir. Como essa verificação não existe e não é esperada em Connector, é possível surgir um erro em algum
    lugar no qual Connector era esperada e RedisConnector foi passada, o que fere o princípio de substituição de
    Liskov, que diz que objetos podem ser substituídos por seus subtipos sem que isso afete a execução correta do programa.

====================================== INTERFACE SEGREGATION PRINCIPLE (I) ======================================

Nenhum cliente deve ser forçado a depender de métodos que não utiliza.
O ISP garante que cada classe tenha que implementar somente métodos que de fato ela vai precisar, deixando para outras
a tarefa de implementar métodos adicionais.