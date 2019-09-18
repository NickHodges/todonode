import { Request, Response } from 'express';
import * as express from 'express';
import { TodoController } from '../controllers/crmController';

export class Routes {
  public todoController: TodoController = new TodoController();

  public routes(app: express.Application): void {
    // Create a new todo
    app.route('/todos').post(this.todoController.addNewTodo);

    // Get all todos
    app.route('/todos').get(this.todoController.getTodos);

    // get a specific todo
    app.route('/todos/:todoid').get(this.todoController.getTodoWithID);

    // update a specific todo
    app.route('/todos/:todoid').put(this.todoController.updateTodo);

    // delete a specific todo
    app.route('/todos/:todoid').delete(this.todoController.deleteTodo);
  }
}
