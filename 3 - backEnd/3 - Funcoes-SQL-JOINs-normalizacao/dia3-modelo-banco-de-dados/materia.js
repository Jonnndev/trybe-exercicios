======================================= DATABASE DESIGN =======================================

- Passo a passo:

1 - Identificando entidades, atributos e relacionamentos:

--> Identificar as entidades, atributos e relacionamentos com base na descrição do problema.
    
    ENTIDADES: São uma representação de algo do mundo real dentro do banco de dados e que normalmente
    englobam toda uma ideia. São armazenadas em formato de tabelas em um banco de dados.

        EX: Entidade 1: Álbum;
            Entidade 2: Artista;
            Entidade 3: Estilo Musical;
            Entidade 4: Canção.

    ATRIBUTOS: Um atributo é tudo aquilo que pode ser usado para descrever algo. Por exemplo, uma
    entidade pessoa pode ter nome, altura, peso e idade como atributos. (São as colunas).

        EX: Álbum: album_id, titulo, preco, estilo_id e artista_id;
            Artista: artista_id e nome;
            Estilo Musical: estilo_id e nome;
            Canção: cancao_id, nome e album_id.

    RELACIONAMENTOS: Os relacionamentos servem para representar como uma entidade deve estar ligada
    com outra(s) no banco de dados. Há três tipos de relacionamentos possíveis em um banco de dados,
    são eles:

      A - Relacionamento Um para Um (1:1);
      B - Relacionamento Um para Muitos ou Muitos para Um (1:N);
      C - Relacionamento Muitos para Muitos (N:N).


        EX: Um artista pode possuir um ou mais álbuns;
            Um estilo musical pode estar contido em um ou mais álbuns;
            Um álbum pode possuir uma ou mais canções.

2 - Construindo um diagrama entidade-relacionamento:

  - Para diagramas ER (entidade-relacionamento) mais detalhados, deve-se incluir o nome das tabelas,
    suas chaves primárias e estrangeiras, suas colunas e seus relacionamentos.

    (!)  Por questão de convenções e boas práticas na criação de tabelas, não são usados
         acentos ou espaços entre os nomes das tabelas. 

    (!) A ideia de um diagrama ER é prover uma representação gráfica para a estrutura de seu banco
    de dados, descrevendo suas entidades com seus atributos e como elas se relacionam. Essa
    visualização pode te ajudar tanto a criar e modelar seu banco de dados quanto a entender se sua
    modelagem precisa ser alterada ou se houve algum erro ao pensar na organização de suas entidades.
    Com esse diagrama você consegue pensar um pouco mais antes de começar a escrever as queries para
    criar as tabelas.

3 - Criando um banco de dados para conter suas tabelas:

// Cria um banco de dados com o nome especificado.
CREATE DATABASE nome_do_banco_de_dados;

//`CREATE DATABASE` ou `CREATE SCHEMA` fazem a mesma coisa.
CREATE SCHEMA nome_do_banco_de_dados;

// Verifica se o banco de dados ainda não existe.
// Essa verificação é comumente utilizada junto ao CREATE DATABASE para evitar
// a tentativa de criar um banco de dados duplicado, o que ocasionaria um erro.
IF NOT EXISTS nome_do_banco_de_dados;

// Lista todos os bancos de dados existentes.
SHOW DATABASES;

// Define o banco de dados ativo para uso no momento.
USE nome_do_banco_de_dados;

--> CREATE DATABASE IF NOT EXISTS albuns;

4 - Criando e modelando tabelas de acordo com um diagrama ER:

    --> Tipos de dados de uma tabela: - Booleanos:
                                      - Caracteres:
                                          CHAR() 
                                            - Armazena o total de caracteres independente
                                          VARCHAR()
                                            - Armazena ATÉ o tanto de caracteres determinado
                                      - Números:
                                          TINYINT()
                                            - UNSIGNED -> Valores positivos
                                            - SIGNED -> Negativos e positivos
                                          SMALLINT()
                                          MEDIUMINT()
                                          INT()
                                          BIGINT()
                                          DECIMAL(5,2)
                                          FLOAT()/REAL()
                                            - Precisão de uma casa decimal
                                          DOUBLE()
                                            - Precisão de duas casas decimais
                                      - Temporais:
                                          DATE()
                                            - YYYY-MM-DD
                                          TIME()
                                            - HH:MM:SS
                                          YEAR()
                                            - Anos entre 1901 até 2155
                                          DATETIME()
                                          TIMESTAMP()
                                            - Considera fuso horário

(!) PRIMARY KEY & FOREIGN KEY (!)

--> PRIMARY KEY: Identificador único de uma tabela. 

    (!) Chave Composta: é aquela criada com duas ou mais colunas e, desta forma, passa a utilizar
    a junção desses dados para formar um valor único e assim bloquear a duplicidade.

--> FOREIGN KEY: Coluna ou grupo de coluna que está ligada a outra tabela. 

// Há muitas formas de grafia existentes, mas para manter uma padronização e seguirmos a boa prática adotaremos a notação em "snake_case"
// para construirmos nossos bancos de dados e tabelas.

DROP SCHEMA IF EXISTS trybe_flix;
CREATE SCHEMA trybe_flix;
USE trybe_flix;

// Primeiro criamos a tabela actor
CREATE TABLE actor(
    actor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

// E a tabela film
CREATE TABLE film(
    film_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

// E por fim, a tabela film_actor com a relação N:N

CREATE TABLE film_actor(
  actor_id INTEGER,
  film_id INTEGER,
  CONSTRAINT PRIMARY KEY(actor_id, film_id),
    FOREIGN KEY (actor_id) REFERENCES actor (actor_id),
    FOREIGN KEY (film_id) REFERENCES film (film_id)
);

======================================= NORMALIZAÇÃO =======================================

--> É uma técnica para organizar tabelas RELACIONADAS no banco de dados com o objetivo de reduzir
    a REDUNDÂNCIA de dados.

      1º FORMA NORMAL:
        # Colunas devem possuir apenas um valor;
        # Valores em uma coluna devem ser do mesmo tipo de dados;
        # Cada coluna deve possuir um nome único;
        # A ordem dos dados registrados em uma tabela não deve afetar a integridade dos dados.

      2º FORMA NORMAL:
        # A tabela deve estar na 1ª Forma Normal;
        # A tabela não deve possuir dependências parciais.

      3º FORMA NORMAL:
        # A tabela deve estar na 1ª e 2ª Formas Normais;
        # A tabela não deve conter atributos (colunas) que não sejam dependentes exclusivamente
          da PK (chave primária).
