import form from "../modules/Form.js";

export default class FormController {
  static listTodos = (req, res) => {
    form
      .find()
      .then((forms) => {
        const sortedForms = forms.sort((a, b) => {
          if (a.priority && !b.priority) {
            return -1;
          }
          if (!a.priority && b.priority) {
            return 1;
          }
          return 0;
        });
        res.status(200).json(sortedForms);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
  static listTodoById = (req, res) => {
    const id = req.params.id

    form.findById(id)
        .then((todo) => {
            if (!todo) {
                res.status(404).send({message: `Atividade com o ID ${id} não foi encontrada.`})
                return
            }
            res.status(200).json(todo)
        })
        .catch((err) => {
            res.status(500).send({message: `Erro ao encontrar atividade com o ID ${id}. Erro: ${err.message}`})
        })
  }

  static createTodo = (req, res) => {
    const isDone = req.body.hasOwnProperty('isDone') ? req.body.isDone : false;
    const priority = req.body.hasOwnProperty('priority') ? req.body.priority : false;
    const todo = new form({
      todo: req.body.todo,
      isDone: isDone,
      priority: priority
    })
  
    todo.save()
      .then(() => {
        res.status(201).send({message: 'Atividade cadastrada com sucesso!'})
      })
      .catch((err) => {
        res.status(500).send({message: err.message + ' Não foi possível cadastrar a atividade'})
      })
  }
  static updateTodo = async (req, res) => {
    const {id} = req.params
    try {
        const updatedForm = await form.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedForm);
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao atualizar atividade` });
    }
  }

  static deleteTodo = async (req, res) => {
    const {id} = req.params
    try {
        const deleteForm = await form.findByIdAndDelete(id);
        res.status(200).send('Atividade excluida com sucesso!');
    } catch (err) {
        res.status(500).send({ message: `${err.message} - falha ao excluir atividade` });
    }
  }
}
