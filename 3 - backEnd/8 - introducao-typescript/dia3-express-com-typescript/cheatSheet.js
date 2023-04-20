====================================== CONFIG TS E SEQUELIZE ======================================

1 - Iniciar o PromiseRejectionEvent

    npm init -y

2 - Instalar dependências

    //TS 
    npm install -D -E typescript@4.4.4 @types/node@16.18.23 ts-node-dev@1.1.8

    //EXPRESS
    npm install -E express@4.17.1 && npm install -D -E @types/express@4.17.1

    //SEQUELIZE
    npm install -E sequelize@6.11.0 && npm install -D -E @types/sequelize@4.28.14 mysql2@2.3.0 sequelize-cli@6.2.0

3 - TS config

    npx tsc --init

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // tsconfig.json

    {
      "compilerOptions": {
        // ...
        "rootDir": "./src",
        "outDir": "./build",
        // ...
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "build"]
    }
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

4 - Sequelize config

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // .sequelizerc

    const path = require('path');

    module.exports = {
      'config': path.resolve(__dirname,'build','database','config', 'database.js'),
      'models-path': path.resolve(__dirname,'build','database','models'),
      'seeders-path': path.resolve(__dirname,'src','database', 'seeders'),
      'migrations-path': path.resolve(__dirname,'src','database', 'migrations'),
    };
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    npx sequelize-cli init

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ./src/database/config/database.ts

    import { Options } from 'sequelize';

    const config: Options = {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'books_api',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      dialect: 'mysql',
    }

    export = config;
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //package.json

    {
      // ...
      "scripts": {
        // ...
        "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
      }
      // ...
      }
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      //./src/database/models/index.ts

      import { Sequelize } from 'sequelize';
      import * as config from '../config/database';

      export default new Sequelize(config);