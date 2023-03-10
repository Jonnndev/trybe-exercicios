const express = require('express');
const cacauTrybe = require('./cacauTrybe');

const app = express();
app.use(express.json());


//ENDPOINTS
app.get('/chocolates', async (req, res) => {
  const chocolates = await cacauTrybe.getAllChocolates();
  return res.status(200).json({ chocolates });
});

app.get('/chocolates/total', async (_req, res) => {
const totalChocolates = await cacauTrybe.getAllChocolates();
return res.status(200).json({ totalChocolates: totalChocolates.length });
});

app.get('/chocolates/search', async (req, res) => {
  const { name} = req.query;
  const chocolates = await cacauTrybe.findChocolatesByName(name);
  if (chocolates.length === 0) return res.status(404).json([]);
  return res.status(200).json(chocolates);
});

app.get('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  // Usamos o Number para converter o id em um inteiro
  const chocolate = await cacauTrybe.getChocolateById(Number(id));
  if (!chocolate) return res.status(404).json({ message: 'Chocolate not found' });
  return res.status(200).json(chocolate);
});

app.get('/chocolates/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const chocolates = await cacauTrybe.getChocolatesByBrand(Number(brandId));
  return res.status(200).json({ chocolates });
});

app.put('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  const { name, brandId } = req.body;
  const updatedChocolate = await cacauTrybe.updateChocolate(Number(id), { name, brandId });

  if (updatedChocolate) return res.status(200).json({ chocolate: updatedChocolate });
  return res.status(404).json({ message: 'chocolate not found' });
});

module.exports = app;