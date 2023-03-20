const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (newDriverCar) => {
  const columns = Object.keys(snakeize(newDriverCar))
    .join(', ');

  const placeholders = Object.keys(newDriverCar)
    .map((_m) => '?')
    .join(', ');
    
  const [{ insertId }] = await connection.execute(
  `INSERT INTO drivers_cars (${columns}) VALUE (${placeholders})`,
  [Object.values(newDriverCar)], 
  );

  return insertId;
};

module.exports = {
  insert,
};