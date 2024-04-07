import { Sequelize } from 'sequelize';

/**
 * Database connection using sequelize
 */
const sequelizeConnection = new Sequelize('dev', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  // logging: (msg) => winston.info(msg),
});

async function connectToDatabase() {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelizeConnection, connectToDatabase };
