// COMPONENTE BROWSERROUTER <<<<<<<<<<<

// Você pode encapsular os componentes diretamente no App.js:

// ./src/App.js
import { BrowserRouter } from 'react-router-dom';
// ...
<BrowserRouter>
  <Home />
  <About />
</BrowserRouter>
// ...

// Outra forma é encapsulando o próprio componente <App />, no arquivo index.js. Assim, todos os componentes renderizados por App poderão fazer uso da navegação:

// ./src/index.js
import { BrowserRouter } from 'react-router-dom';
// ...
<BrowserRouter>
  <App />
</BrowserRouter>
// ...

// COMPONENTE ROUTE <<<<<<<<<<<

// O caminho da URL atual do navegador começa com o caminho /about, declarado na prop path no componente Route. Dessa forma, se o caminho da URL for /about, o componente About será renderizado:

<Route path="/about" component={ About } />

// Entretanto, se a URL atual for /about/me, por exemplo, também existirá correspondência, e o componente About continuará sendo renderizado. Nesse caso, o parâmetro exact pode entrar em ação:

<Route exact path="/about" component={ About } />

// Outra maneira de renderização de componente com Route é fazendo uso do elemento children. Ou seja, se o seu código estiver assim: <Route path="/about" component={About} />, você também poderá fazer da seguinte forma:

<Route path="/about" >
<About />
</Route>

// COMPONENTES RENDERIZADOS <<<<<<<<<<<

<Route path="/about" component={ About } />
<Route path="/contact" component={ Contact } />
<Route path="/" component={ Home } />

// Se o caminho atual da URL da aplicação for /, todos esses componentes serão renderizados, haja vista que nenhuma rota faz correspondência exata entre o caminho da URL, definido via prop path. Assim, path="/" faz correspondência com qualquer caminho de URL

// COMPONENTE LINK

<Link to="/about" > About </Link>

// ROUTE COM PROPS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// No que diz respeito ao componente Route, você pode associar um componente com o caminho da URL via children, component ou render;

// Faz-se uso da prop component de Route quando não é necessário passar informações adicionais via props para o componente a ser mapeado. Ou seja, se você tem um componente About que não precisa de props setadas para ser chamado, e você precisa mapeá-lo para o caminho de URL /about, você poderia criar uma rota da seguinte forma: <Route path="/about" component={About} />;

// Já a prop render de Route é usada quando é necessário passar informações adicionais via props para o componente a ser mapeado. Ou seja, se você tem um componente Movies que precisa receber uma lista de filmes via props movies, e você precisa mapeá-lo para o caminho de URL /movies, você poderia criar uma rota da seguinte forma: <Route path="/movies" render={(props) => <Movies {...props} movies={['Cars', 'Toy Story', 'The Hobbit']} />} />;

// Tanto component quanto render permitem que você tenha acesso a informações de rota (match, location e history) via props do componente que você está mapeando. Ou seja, se você tem a rota <Route path="/about" component={About} />, About terá match, location e history setadas via props.

// ROUTE COM PARÂMETROS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// O interessante em rotas dinâmicas é que podemos utilizar o mesmo componente para renderizar vários caminhos diferentes. Para fazer uso de parâmetro de URL em Route, é preciso fazer uso da sintaxe :nome_do_parametro dentro da propriedade path. Ou seja, <Route path="/movies/:movieId" component={Movie} /> vai definir um parâmetro chamado movieID, e o componente Movie é mapeado a qualquer um dos seguintes caminhos de URL:

// /movies/1;

// /movies/2;

// /movies/thor.

// COMPONENTE SWITCH <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

<Switch>
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route path="/movies" component={Movies} />
  <Route path="/" component={Home} />
</Switch>

// Ao mudarmos a URL da aplicação para que seu caminho seja /contact, somente o componente Contact será renderizado.

// Todos os filhos de um Switch devem ser Route ou Redirect. Apenas o primeiro filho que corresponder ao local atual será renderizado. Se não houvesse o Switch mais de um componente poderia ser renderizado na mesma rota de forma errada.

// COMPONENTE REDIRECT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Um caso de uso bastante comum de Redirect é autenticação: a pessoa só pode acessar informações sensíveis (tipo conta bancária) de uma aplicação se ela já estiver autenticada; caso contrário, ela é redirecionada para uma página de login.

<Switch>
<Route path="/dashboard" component={Dashboard} />
<Route exact path="/">
  {logado ? <Redirect to="/dashboard" /> : <Login />}
</Route>
</Switch>
