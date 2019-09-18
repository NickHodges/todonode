//   /lib/models/crmModel.ts

import * as mongoose from 'mongoose';

export const TodoSchema: mongoose.Schema = new mongoose.Schema({
  // todoid: {
  //   type: Number
  // },
  title: {
    type: String,
    required: 'Enter a title'
  },
  note: {
    type: String
  },
  complete: {
    type: Boolean,
    default: false
  },
  editMode: {
    type: Boolean,
    default: false
  }
});
