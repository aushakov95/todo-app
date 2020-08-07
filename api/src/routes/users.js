import { Router } from "express";
import todos from "./todos";

const router = Router();

router.use("/:userId/todos", todos);

export default router;
