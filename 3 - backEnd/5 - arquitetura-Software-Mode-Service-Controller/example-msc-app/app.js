// src/app.js

const express = require('express');
const { passengerRouter, driverRoutes } = require('./routers');

/* Removemos a importação do passengerService pois ele não é mais usado aqui! */

const app = express();

app.use(express.json());

/* Já temos nossa rota /passengers definida por isso não precisamos alterar aqui! */
app.use('/passengers', passengerRouter);

/* Aqui apagamos todos o código que movemos para o do router de pessoas motoristas
e associamos o mesmo para ser responsável por qualquer rota que começar com /drivers */

app.use('/drivers', driverRoutes);

module.exports = app;