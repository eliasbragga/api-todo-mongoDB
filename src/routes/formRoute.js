import express from "express";
import FormController from "../controllers/formController.js";

const router = express.Router()

router 
    .get('/form', FormController.listTodos)
    .get('/form/:id', FormController.listTodoById)
    .post('/form', FormController.createTodo)
    .put('/form/:id', FormController.updateTodo)
    .delete('/form/:id', FormController.deleteTodo)

export default router
