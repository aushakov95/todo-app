import { Router } from "express";

// Merging req.params to access the userid parameter from the
// users router.
const router = Router({ mergeParams: true });

const checkIfBodyIsEmpty = (body) => {
  if (Object.keys(body).length === 0) return true;
  return false;
};

router.get("/", async (req, res) => {
  try {
    console.log(`Received get request for userid: ${req.params.userId}`);
    const todos = await req.context.models.Todo.findAll({
      include: [
        {
          model: req.context.models.User,
          where: { id: req.params.userId },
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.send(todos);
  } catch (e) {
    return res.status(500).send({ Error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const isBodyEmpty = checkIfBodyIsEmpty(req.body);
    if (isBodyEmpty) return res.status(400).send({ Error: "Empty body" });
    console.log(`userid: ${req.params.userId}`);
    const newTodo = await req.context.models.Todo.create({
      task: req.body.task,
      isCompleted: false,
      userId: req.params.userId,
    });
    return res.status(201).send(newTodo);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const isBodyEmpty = checkIfBodyIsEmpty(req.body);
    if (isBodyEmpty) return res.status(400).send({ Error: "Empty body" });
    const result = await req.context.models.Todo.update(req.body, {
      where: { id: req.params.id },
    });
    console.log(result);
    if (result[0] > 0) return res.status(200).send("Succesfully updated");
    return res.status(404).send({ Error: "Todo does not exist" });
  } catch (e) {
    return res.status(500).send({ Error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await req.context.models.Todo.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).send("Successfully deleted");
  } catch (e) {
    return res.status(500).send({ Error: e.message });
  }
});

export default router;
