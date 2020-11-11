import TodoModel from '../model/todo.model';

export const fetchTodos = async (req, res) => {
  try {
    // 1) Filtering
    const queryObject = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit'];
    const allFilterParameters = ['completed', 'dueDate'];

    // remove excluded fields and unwanted fields from queryObject
    excludedFields.forEach((field) => delete queryObject[field]);

    // remove any remaining field that is not completed or dueDate
    const allQueryKeys = Object.keys(queryObject);
    allQueryKeys.forEach((el) => {
      if (!allFilterParameters.includes(el)) {
        delete queryObject[el];
      }
    });

    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const modifiedQueryObject = JSON.parse(queryString);

    // 2) Searching
    if (req.query.search) {
      modifiedQueryObject.$text = { $search: req.query.search };
    }

    let query = TodoModel.find(modifiedQueryObject);

    // 3) Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      // sort by due date if sort parameter is not provided
      query.sort('dueDate');
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1; // multiplied by 1 to convert it to number type
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit);

    if (req.query.page) {
      const numberOfTodos = await TodoModel.countDocuments();
      if (skip >= numberOfTodos) throw new Error('This page does not exist');
    }

    // EXECUTE QUERY
    const todos = await query.exec();

    // SEND RESPONSE
    return res.status(200).json({
      status: 'success',
      totalCount: todos.length,
      todos,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const createTodo = async (req, res) => {
  const { title, completed, dueDate } = req.body;
  try {
    const createdTodo = await TodoModel.create({ title, completed, dueDate });

    return res.status(201).json({
      status: 'success',
      todo: createdTodo,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  const { id, completed, dueDate } = req.body;

  const updateObject = {};
  if (completed) {
    updateObject.completed = completed;
  }

  if (dueDate) {
    updateObject.dueDate = dueDate;
  }
  try {
    const updatedTodo = await TodoModel
      .findByIdAndUpdate(id, updateObject, { new: true, runValidators: true });

    if (!updatedTodo) {
      return res.status(400).json({
        status: 'error',
        message: 'todo id required',
      });
    }
    return res.status(200).json({
      status: 'success',
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: 'success',
      message: 'todo deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
