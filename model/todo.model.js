import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A todo must have a title'],
    trim: true,
    maxlength: [50, 'A todo must be less than or equal to 50 characters in length'],
    minlength: [3, 'A todo must be 3 or more characters'],
    createIndexes: true,
  },

  completed: {
    type: Boolean,
    required: true,
    default: false,
  },

  dueDate: {
    type: Date,
    required: true,
  },
}, { versionKey: false });

const TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;
