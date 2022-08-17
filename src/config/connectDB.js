const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('db2soukmu4ieub', 'caneaomujeynjp', "f92d7caee605fd211c88039ea150437c2704d95d70423213a01e9daad0f51e82", {
  host: 'ec2-34-203-182-65.compute-1.amazonaws.com',
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = connectDB;