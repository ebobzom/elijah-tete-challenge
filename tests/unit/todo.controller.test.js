/* eslint-disable no-undef */
import httpMocks from 'node-mocks-http';
import TodoModel from '../../model/todo.model';
import {
  createTodo, fetchTodos, updateTodo, deleteTodo,
} from '../../controllers/todo.controller';
import newTodo from '../mock-data/sample-data';

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();
TodoModel.findByIdAndDelete = jest.fn();

let req; let
  res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it('should have a createTodo function', () => {
    expect(typeof createTodo).toBe('function');
  });

  it('should call TodoModel.create', () => {
    createTodo(req, res);

    expect(TodoModel.create).toBeCalledWith(newTodo);
    expect(TodoModel.create).toHaveBeenCalled();
  });

  it('should return a status code of 201', async () => {
    await createTodo(req, res);
    expect(res.statusCode).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return the right json body', async () => {
    await TodoModel.create.mockReturnValue(newTodo);
    const response = await createTodo(req, res);
    // eslint-disable-next-line no-underscore-dangle
    const result = response._getJSONData();
    expect(result.status).toBe('success');
    expect(result.todo).toStrictEqual(newTodo);
  });
});

describe('TodoController.fetchTodos', () => {
  it('should have a fetchTodos function', () => {
    expect(typeof fetchTodos).toBe('function');
  });

  it('should call TodoModel.find', async () => {
    await fetchTodos(req, res);
    expect(TodoModel.find).toHaveBeenCalled();
  });
});

describe('TodoController.updateTodo', () => {
  it('should have a updateTodos function', () => {
    expect(typeof updateTodo).toBe('function');
  });

  it('should call TodoModel.findByIdAndUpdate', async () => {
    await updateTodo(req, res);
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('should be called with id and update object', async () => {
    const id = '123dertdfdf';
    await TodoModel
      .findByIdAndUpdate.mockReturnValue({ id, completed: false, dueDate: '2020-12-11T23:00:00.000Z' });
    req.body = { id, completed: false, dueDate: '2020-12-11T23:00:00.000Z' };
    const response = await updateTodo(req, res);

    // eslint-disable-next-line no-underscore-dangle
    const result = response._getJSONData();
    expect(result.status).toBe('success');
    expect(result.todo).toStrictEqual({ id, completed: false, dueDate: newTodo.dueDate });
    expect(result.todo.id).toBe(id);
  });
});

describe('TodoController.deleteTodo', () => {
  it('should have a deleteTodo function', () => {
    expect(typeof deleteTodo).toBe('function');
  });

  it('should call deleteTodo.findByIdAndDelete and return correct response body', async () => {
    await TodoModel.findByIdAndDelete.mockReturnValue({ status: 'success', message: 'todo deleted successfully' });
    const response = await deleteTodo(req, res);
    // eslint-disable-next-line no-underscore-dangle
    const result = response._getJSONData();
    expect(response.statusCode).toBe(200);
    expect(result).toStrictEqual({ status: 'success', message: 'todo deleted successfully' });
    expect(TodoModel.find).toHaveBeenCalled();
  });
});
