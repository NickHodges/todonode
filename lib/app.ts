import express = require('express');
import * as bodyParser from 'body-parser';
import { Routes } from './routes/crmRoutes';
import * as mongoose from 'mongoose';
import { TodoSchema } from './models/crmModel';

const autoIncrement = require('mongoose-sequence')(mongoose);

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = 'mongodb://localhost/TodosDB8';

  // Autoinc stuff

  // private mongoose = require('mongoose');
  // protected AutoIncrementFactory = require('mongoose-sequence');
  // private theconnection = mongoose.createConnection(this.mongoUrl);
  // protected autoIncrement = this.AutoIncrementFactory(this.theconnection);
  // public connection = this.theconnection;

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();

    //mongoose.Promise = global.Promise;

    TodoSchema.plugin(autoIncrement, {
      inc_field: 'todoid',
      start_seq: 422
    });
    mongoose.model('Todos', TodoSchema);
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
