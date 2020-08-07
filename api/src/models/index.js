import { Sequelize, DataTypes } from "sequelize";
import todo from "./todo";
import user from "./user";

let sequelize = null;

if (process.env.DATABASE_URL) {
  //The application is executed on Heroku.
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  //The application is executed on the local machine.
  sequelize = new Sequelize(process.env.LOCAL_DATABASE_URL);
}

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDatabaseConnection();

const models = {
  Todo: todo(sequelize, DataTypes),
  User: user(sequelize, DataTypes),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
