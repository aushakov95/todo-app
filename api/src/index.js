import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import models, { sequelize } from "./models";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use("/todos", routes.todos);

const eraseDatabaseOnSync = true;
console.log(`eraseDatabaseOnSync is set to ${eraseDatabaseOnSync}`);

const createTodo = async () => {
  await models.Todo.create({
    task: "Run the app without errors.",
    isCompleted: true,
  });
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) createTodo();
  app.listen(process.env.PORT, () =>
    console.log(`Express Todo Api app listening on port ${process.env.PORT}`)
  );
});
