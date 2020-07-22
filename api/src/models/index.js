import { Sequelize, DataTypes } from "sequelize";
import todo from "./todo";

const sequelize = new Sequelize(process.env.DATABASE);

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
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
