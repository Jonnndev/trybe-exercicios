======================== FECHAR PORTA EM USO ========================

sudo kill $(sudo lsof -t -i:3001)

======================== SERVER ========================

const app = require('./app');

app.listen(3001, () => console.log('Server rodando na porta 3001'));

======================== API BÁSICA ========================

const express = require('express');
const path = require('path');
const readJsonData = require('./utils/fs/readJsonData');
const writeJsonData = require('./utils/fs/writeJsonData');

const app = express();
app.use(express.json());

const moviePath = path.resolve(__dirname, './movies.json');

// ENDPOINTS

// Página home
app.get('/', (_req, res) => res.status(200).json({ message: 'Rodando na rota /' }));

// Listar filme pelo id
app.get('/movies/:id', async (req, res) => {
  const movies = await readJsonData(moviePath);
  const movieSelected = movies.find((movie) => movie.id === Number(req.params.id));

  if (!movieSelected) return res.status(404).json({ message: 'Filme não encontrado' });
  return res.status(200).json(movieSelected);
});

// Listar todos os filmes
app.get('/movies', async (_req, res) => {
  const movies = await readJsonData(moviePath);

  if (!movies) return res.status(500).json({ message: 'Filmes não encontrados' });
  
  return res.status(200).json(movies);
});

// Adicionar novo filme
app.post('/movies', async (req, res) => {
  const movies = await readJsonData(moviePath);
  const id = movies.length + 1;
  const newMovie = { id, ...req.body };

  if (!movies) return res.status(500).json({ message: 'Filmes não encontrados' });

  if (!newMovie) return res.status(404).json({ message: 'Página não encontrada' });
  
  movies.push(newMovie);
  
  await writeJsonData(moviePath, movies); // adiciona await
  
  return res.status(201).json(newMovie);
});

// Atualizar algum filme
app.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const movies = await readJsonData(moviePath);
  const movieToEdit = movies.find((movie) => movie.id === Number(id));

  if (!movieToEdit) return res.status(404).json({ message: 'Filme não encontrado' });

  movieToEdit.movie = req.body.movie;
  movieToEdit.price = req.body.price;

  await writeJsonData(moviePath, movies); // adiciona await

  return res.status(200).json(movieToEdit);
});

// Deletar filme
app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const movies = await readJsonData(moviePath);
  const movieToDeleteIndex = movies.findIndex((movie) => movie.id === Number(id));

  movies.splice(movieToDeleteIndex, 1);

  await writeJsonData(moviePath, movies);

  return res.status(200).json({ message: 'Filme deletado com sucesso' });
});

module.exports = app;

======================== readJsonData ========================

const fs = require('fs').promises;

const readJsonData = async (path) => {
  try {
    const fileContent = await fs.readFile(path, 'utf-8');
    const movies = JSON.parse(fileContent);
    return movies;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = readJsonData;

======================== writeJsonData ========================

const fs = require('fs').promises;

const writeJsonData = async (path, movie) => {
  try {
    const stringify = JSON.stringify(movie);
    return await fs.writeFile(path, stringify);
  } catch (error) {
    return console.log(error.message);
  }
};

module.exports = writeJsonData;

