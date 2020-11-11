import express from 'express';
import {
  createTodo, updateTodo, deleteTodo, fetchTodos,
} from '../controllers/todo.controller';

const router = express.Router();

// fetch todos
router.get('/', fetchTodos);

// create new todo
router.post('/', createTodo);

// update todo
router.put('/', updateTodo);

// delete single todo
router.delete('/:id', deleteTodo);

export default router;
