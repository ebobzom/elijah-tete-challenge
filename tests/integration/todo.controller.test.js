/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../app';
import newTodo from '../mock-data/sample-data';

const endPointUrl = process.env.BASE_URL;

describe(endPointUrl, () => {
  beforeEach(async () => {
    await request(app)
      .post(endPointUrl)
      .send({
        title: 'PUT oo',
        completed: false,
        dueDate: '2020-12-11T23:00:00.000Z',
      });

    await request(app)
      .post(endPointUrl)
      .send({
        title: 'DELETE oo',
        completed: false,
        dueDate: '2020-12-11T23:00:00.000Z',
      });
  });

  test(`GET ${endPointUrl}`, async () => {
    afterEach(async () => {
      const response = await request(app)
        .get(`${endPointUrl}?search=unit`);
      const todoItem = response.body.todos;

      if (typeof todoItem.length !== 'undefined' && todoItem.length !== 0) {
        const { _id } = todoItem[0];
        await request(app)
          .delete(`${endPointUrl}/${_id}`);
      }
    });
    const response = await request(app)
      .get(endPointUrl)
      .send(newTodo);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(typeof response.body.todos).toBe('object');
    expect(typeof response.body.totalCount).toBe('number');
    expect(response.body.todos[0].title).toBeDefined();
    expect(response.body.todos[0].completed).toBeDefined();
    expect(response.body.todos[0].dueDate).toBeDefined();
  });

  it(`POST ${endPointUrl}`, async () => {
    const response = await request(app)
      .post(endPointUrl)
      .send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.todo.title).toBe(newTodo.title);
    expect(response.body.todo.dueDate).toBe(newTodo.dueDate);
    expect(response.body.todo.completed).toBe(newTodo.completed);
  });

  it(`POST ${endPointUrl} should error for empty POST request body`, async () => {
    const response = await request(app)
      .post(endPointUrl)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it(`PUT ${endPointUrl}`, async () => {
    const answer = await request(app)
      .get(`${endPointUrl}?search=PUT`);
    // eslint-disable-next-line no-underscore-dangle
    const id = answer.body.todos[0]._id;

    if (id !== 'undefined') {
      const response = await request(app)
        .put(endPointUrl)
        .send({
          id,
          completed: true,
          dueDate: '2020-12-11T23:00:00.000Z',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.todo.title).toBe('PUT oo');
      expect(response.body.todo.dueDate).toBe('2020-12-11T23:00:00.000Z');
      expect(response.body.todo.completed).toBe(true);
    }
  });

  it(`PUT ${endPointUrl} should error out if id is not provided`, async () => {
    const response = await request(app)
      .put(endPointUrl)
      .send({
        completed: true,
        dueDate: '2020-12-11T23:00:00.000Z',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('todo id required');
  });

  it(`DELETE ${endPointUrl}/id should return required JSON object`, async () => {
    const answer = await request(app)
      .get(`${endPointUrl}?search=DELETE`);
    // eslint-disable-next-line no-underscore-dangle
    const id = answer.body.todos[0]._id;

    if (id) {
      const response = await request(app)
        .delete(`${endPointUrl}/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('todo deleted successfully');
    }
  });

  it(`DELETE ${endPointUrl}/id should return required error JSON object for wrong or empty id`, async () => {
    const response = await request(app)
      .delete(`${endPointUrl}/234`);

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('error');
  });
});
