require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const POSTGRES_URL = process.env.DATABASE_URL;
//For production development
const sequelize = new Sequelize('tilosh', 'tilosh', 'tilsoh@1234', {
  host: 'localhost',
  dialect: 'postgres'
});
//For local development
// const sequelize = new Sequelize('tilosh', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
// const sequelize = new Sequelize(POSTGRES_URL);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection Successful");
    } catch (error) {
        console.error("Unable to connect to database: ", error);
    }
}

module.exports = { connectDB, sequelize, Sequelize, DataTypes };