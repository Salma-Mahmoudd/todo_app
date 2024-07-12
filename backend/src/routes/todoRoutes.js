import express from "express";
import {
  createTodo,
  getTodosByUserId,
  getTodoByCategoryId,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router
  .route("/")
  .get(getTodosByUserId)
  .post(createTodo);
router
  .route("/:id")
  .put(updateTodo)
  .delete(deleteTodo);
router.get("/:categoryId", getTodoByCategoryId);

export default router;
