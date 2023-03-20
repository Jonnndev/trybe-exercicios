const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (newCar) => {
  const columns = Object.keys(snakeize(newCar)).join(', ');

  const placeholders = Object.keys(newCar)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO cars (${columns}) VALUE (${placeholders})`,
    [...Object.values(newCar)],
  );

  return insertId;
};

const findById = async (id) => {
  const [[carId]] = await connection.execute(
    'SELECT * FROM cars WHERE id = ?', [id],
  );
  console.log(carId);
  return camelize(carId);
};

module.exports = {
  insert,
  findById,
};