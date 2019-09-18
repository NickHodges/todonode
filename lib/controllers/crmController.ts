//   /lib/controllers/crmController.ts
import * as mongoose from 'mongoose';
import { TodoSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const TheTodo = mongoose.model('Todo', TodoSchema);
export class TodoController {
  public addNewTodo(req: Request, res: Response) {
    let newTodo = new TheTodo({
      complete: req.body.complete,
      editMode: req.body.editMode,
      note: req.body.note,
      title: req.body.title
    });
    newTodo.save((err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    });
  }

  public getTodos(req: Request, res: Response) {
    TheTodo.find({}, (err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    });
  }

  public getTodoWithID(req: Request, res: Response) {
    TheTodo.findOne({ todoid: req.params.todoid }, function(err, todo) {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    });
  }

  public updateTodo(req: Request, res: Response) {
    TheTodo.findOneAndUpdate(
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
    TheTodo.remove({ todoid: req.params.todoid }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted todo!' });
    });
  }
}
