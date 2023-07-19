==================================================== NOSQL ====================================================

--> Os bancos de dados não relacionais ou NoSQL possuem uma estrutura flexível utilizada para
armazenar os dados e possuem alta disponibilidade alcançada quando comparado aos bancos de dados relacionais.

# TEOREMA CAP: qualquer sistema distribuído de dados pode apenas prover duas das três propriedades a seguir:


1 - Consistência (Consistency): Significa que todas as pessoas que utilizam o banco de dados visualizam os
mesmos dados não importando qual servidor elas estejam conectadas (no caso do banco de dados estar distribuído
em mais de um servidor). Para que isso aconteça, sempre que os dados forem gravados em um nó (servidor),
ele deve ser instantaneamente replicado para todos os outros nós (servidores) antes que a gravação seja
considerada bem-sucedida;

2 - Disponibilidade (Availability): Significa que qualquer pessoa que realizar uma solicitação de dados,
obterá uma resposta! Mesmo que um ou mais nós (servidores) estejam desativados. Em outras palavras, todos
os nós em funcionamento do banco de dados retornam uma resposta válida para qualquer solicitação, sem exceção;

3 - Tolerância a Partição (Partition Tolerance): É a quebra de comunicação (e possivelmente de dados) dentro
de um banco de dados que funciona sobre vários servidores (nós) permitindo que, em caso de uma ou mais falhas
de comunicação entre um ou mais servidores, o sistema deve continuar a funcionar.

OPÇÕES DOS BANCO DE DADOS:

A - Banco de dados CP: Um banco de dados do tipo CP (Consistency and Partition Tolerance) entrega consistência
e tolerância a falhas em detrimento da disponibilidade. Quando uma partição (divisão) ocorre entre dois nós,
por exemplo, uma divisão de uma tabela em duas, por aplicação de uma forma normal, o nó não consistente deverá
ser desativado (indisponível) até que tudo se resolva;

B - Banco de dados AP: Um banco de dados do tipo AP (Availability and Partition Tolerance) entrega disponibilidade
e tolerância a falhas em detrimento da consistência. Quando ocorre uma partição, todos os nós permanecem disponíveis,
exceto aqueles que estão trabalhando no processo de particionamento. Quando a partição é resolvida, todos os nós
realizam uma sincronização dos dados para corrigir as inconsistências do sistema.

(!) BANCO DE DADOS SQL: são do tipo CP, pois quando realizamos uma modificação na estrutura do banco de dados ele
fica indisponível para garantir a consistência (permitir que todas as pessoas tenham acesso aos dados mais recentes).

(!) BANCO DE DADOS NOSQL: são do tipo AP, pois quando realizamos uma modificação na estrutura do banco de dados, o mesmo
não fica indisponível. Na pior das hipóteses uma pesquisa no banco de dados não retornará os dados mais recentes, contudo
ainda retornará uma resposta.

==================================================== MONGODB ====================================================

--> É O banco de dados NoSQL mais utilizado no mundo.

--> É um banco de dados orientado a documentos, ou seja, os dados são armazenados em documentos, que são similares
aos objetos JSON.

==================================================== MONGODB COM DOCKER ====================================================

- CONTAINER:
docker run --name mongodb_v6 -d -p 27017:27017 mongo:6.0

- SHELL:
docker exec -it mongodb_v6 mongosh

- DATABASE:
docker cp trybnb.json mongodb_v6:/tmp/trybnb.json (COPIA O ARQUIVO PARA DENTRO DO CONTAINER)

(!) A ferramenta mongoimport importa conteúdo de um arquivo .JSON, .CSV ou .TSV criados pela ferramenta utilitária mongoexport.

- IMPORT JSON PARA MONGODB:
docker exec mongodb_v6 mongoimport -d trybnb -c places --file /tmp/trybnb.json --jsonArray

==================================================== RECUPERANDO DADOS ====================================================

--> USAR O BD: use <banco de dados>
--> LISTAR BD: show dbs
--> LISTAR COLLECTIONS: show collections
--> LISTAR DOCUMENTOS: db.<collection>.find()
--> LISTAR DOCUMENTOS FORMATADO: db.<collection>.find().pretty()
--> LISTAR DOCUMENTOS LIMITANDO: db.<collection>.find().limit(10)
--> LISTAR DOCUMENTOS LIMITANDO E PULANDO: db.<collection>.find().limit(10).skip(10)
--> LISTAR DOCUMENTOS COM FILTRO: db.<collection>.find({<campo>: '<valor>'})
--> CONTAGEM DE DOCUMENTOS: db.<collection>.countDocuments()
--> CONTAGEM DE DOCUMENTOS COM FILTRO E PROJECTION: db.<collection>.find({<campo>: '<valor>'}, {<campo>: true})
--> litar ordenadamente: db.<collection>.find().sort({<campo>: 1}) (1 = ASC, -1 = DESC)

==================================================== OPERADORES DE COMPARAÇÃO ====================================================

--> $EQ: Específica uma condição de igualdade (equal). O operador $eq realiza a correspondência de documentos em que o valor
de uma chave é igual ao valor especificado.

{'<chave> { $eq: '<valor> }}

--> $GT: Específica uma condição de maior que (greater than). O operador $gt seleciona os documentos em que o valor de uma chave
é maior que o valor especificado.

{'<chave> { $gt: '<valor> }}

--> $NE: Específica uma condição de não igual (not equal). O operador $ne seleciona os documentos em que o valor de uma chave
não é igual ao valor especificado.

{'<chave> { $ne: '<valor> }}

--> $GTE: Específica uma condição de maior ou igual (greater than or equal). O operador $gte seleciona os documentos em que o
valor de uma chave é maior ou igual ao valor especificado.

{'<chave> { $gte: '<valor> }}

--> $LE: Específica uma condição de menor que (less than). O operador $lt seleciona os documentos em que o valor de uma chave
é menor que o valor especificado.

{'<chave> { $lt: '<valor> }}

--> $LTE: Específica uma condição de menor ou igual (less than or equal). O operador $lte seleciona os documentos em que o valor
de uma chave é menor ou igual ao valor especificado.

{'<chave> { $lte: '<valor> }}

==================================================== INSERINDO DADOS ====================================================

1 - Método insertOne(): Para inserir apenas um documento;
2 - Método insertMany(): Para inserir um array de documentos.

EX:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
db.places.insertMany
(
  [
    { '_id': 101, 'name': 'Casa na Sol', 'description': 'Apesar de distante, um lugar com clima sempre quente!' },
    { '_id': 102, 'name': 'Casa em Marte ', 'description': 'Ambiente calmo e inóspito onde é possível encontrar alguns robôs!'},
    { '_id': 103, 'name': 'Casa em Plutão', 'description': 'Para quem deseja ficar distante de tudo e de todes!'}
  ]
)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

=============================================== OPERADORES DE CONSULTA EM ARRAYS ===============================================

--> $ALL: Específica uma condição de todos (all). O operador $all seleciona os documentos em que o valor de uma chave é um array
que contém todos os elementos especificados no argumento.

{'<chave> { $all: ['<valor1>', '<valor2>', '<valor3>'] }}

--> $ELEM_MATCH: Específica uma condição de elemento de correspondência (elemMatch). O operador $elemMatch seleciona os documentos
em que o valor de uma chave é um array que contém pelo menos um elemento que corresponde aos critérios especificados.

{'<chave> { $elemMatch: { '<chave1>': '<valor1>', '<chave2>': '<valor2>' } }}

=============================================== MÉTODO UPDATE ===============================================

1 - Método updateOne(): Para alterar apenas um valor;
2 - Método updateMany(): Para alterar vários valores;

--> SINTAXE:
db.<collection>.updateOne({<campo>: '<valor>'}, {$set: {<campo>: '<valor>'}})

EXEMPLO:
db.places.updateOne
(
  { _id: 12 },
  { $set: { "review_scores.review_scores_rating": 65 } }
)

--> SINTAXE:
db.<collection>.updateMany({<campo>: '<valor>'}, {$set: {<campo>: '<valor>'}})

EXEMPLO:
db.places.updateMany
(
  { "host.host_name": "José Edmílson" },
  { $set: { "host.host_identity_verified": true } }
)

=============================================== MÉTODO DELETE ===============================================

1 - Método deleteOne(): Para deletar apenas um documento;
2 - Método deleteMany(): Para deletar vários documentos.

--> SINTAXE:
db.<collection>.deleteOne({<campo>: '<valor>'})

EXEMPLO:
db.places.deleteOne({ _id: 12 })

--> SINTAXE:
db.<collection>.deleteMany({<campo>: '<valor>'})

EXEMPLO:
db.places.deleteMany({ "host.host_identity_verified": { $eq: false } })

=============================================== MONGODB E CRAWLERS ===============================================

--> PYMONGO:

python3 -m venv .venv && source .venv/bin/activate
python3 -m pip install pymongo

--> CONEXÃO COM BD:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from pymongo 'import MongoClient

// Por padrão o host é localhost e porta 27017
// Estes valores podem ser modificados passando uma URI
// client = MongoClient("mongodb://localhost:27017/")
client = MongoClient()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> ACESSANDO BD:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from pymongo 'import MongoClient

client = MongoClient()
// o banco de dados catalogue será criado se não existir
db = client.catalogue
// a coleção books será criada se não existir
students = db.books
client.close()  // fecha a conexão com o banco de dados
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> INSERINDO DADOS (ONE):

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from pymongo 'import MongoClient

client = MongoClient()
db = client.catalogue
// book representa um dado obtido na raspagem
book = {
    "title": "A Light in the Attic",
}
document_id = db.books.insert_one(book).inserted_id
print(document_id)
client.close()  // fecha a conexão com o banco de dados
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> INSERINDO DADOS (MANY):

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from pymongo 'import MongoClient

client = MongoClient()
db = client.catalogue
documents = [
    {
        "title": "A Light in the Attic",
    },
    {
        "title": "Tipping the Velvet",
    },
    {
        "title": "Soumission",
    },
]
db.books.insert_many(documents)
client.close()  // fecha a conexão com o banco de dados
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--> BUSCANDO:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from pymongo 'import MongoClient


with MongoClient() as client:
    db = client.catalogue
    for book in db.books.find({"title": {"$regex": "t"}}):
        print(book["title"])
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~