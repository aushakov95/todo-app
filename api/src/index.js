import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import models, { sequelize } from "./models";

const app = express();
app.use(cors({ origin: "https://todo-app-by-andrei.herokuapp.com" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use("/todos", routes.todos);
app.use("/users", routes.users);

const eraseDatabaseOnSync = true;
console.log(`eraseDatabaseOnSync is set to ${eraseDatabaseOnSync}`);

const createUserWithTodos = async () => {
  await models.User.create(
    {
      id: "fzGldBx61ggdZFmSkAjJpmFqOlR2",
      todos: [
        {
          task: "This task belongs to Andrei.",
          isCompleted: false,
        },
        {
          task: "Another task belongs to Andrei.",
          isCompleted: true,
        },
      ],
    },
    {
      include: [models.Todo],
    }
  );
  await models.User.create(
    {
      id: "test",
      todos: [
        {
          task: "This task belongs to test.",
          isCompleted: false,
        },
        {
          task: "Another task belongs to test.",
          isCompleted: true,
        },
      ],
    },
    {
      include: [models.Todo],
    }
  );
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) createUserWithTodos();
  app.listen(process.env.PORT, () =>
    console.log(`Express Todo Api app listening on port ${process.env.PORT}`)
  );
});
