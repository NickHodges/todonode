//   /lib/controllers/crmController.ts
import * as mongoose from 'mongoose';
import { TodoSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const Todo = mongoose.model('Todo', TodoSchema);
export class TodoController {
  public addNewTodo(req: Request, res: Response) {
    let newTodo = new Todo(req.body);

    newTodo.save((err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    });
  }

  public getTodos(req: Request, res: Response) {
    Todo.find({}, (err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    });
  }

  public getTodoWithID(req: Request, res: Response) {
    Todo.findOne({ todoid: req.params.todoid }, function(err, todo) {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    });
  }

  public updateTodo(req: Request, res: Response) {
    Todo.findOneAndUpdate(
      { todoid: req.params.todoid },
      req.body,
      { new: true },
      (err, todo) => {
        if (err) {
          res.send(err);
        }
        res.json(todo);
      }
    );
  }

  public deleteTodo(req: Request, res: Response) {
    Todo.remove({ todoid: req.params.todoid }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted todo!' });
    });
  }
}
