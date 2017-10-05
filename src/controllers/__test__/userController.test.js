// intergration test

import mockingoose from 'mockingoose';
import supertest from 'supertest';
import app from '../../app';

describe('GET /api/user/:id', () => {
  beforeAll(() => {
    //
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  test('it should GET a user', async () => {
    const doc = {
      name: 'test user',
      email: 'test@test.com',
      _id: '507f191e810c19729de860ea',
    };
    mockingoose.User.toReturn(doc, 'findOne');
    const response = await supertest(app)
      .get('/api/users/507f191e810c19729de860ea')
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(doc);
  });

  test('it should response code 404', async () => {
    const response = await supertest(app)
      .get('/api/users/12345678')
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: 'User id=12345678 not found',
    });
  });
});

describe('GET /api/users', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  test('it should GET all users', async () => {
    mockingoose.User.toReturn([{}, {}, {}], 'find');
    const response = await supertest(app)
      .get('/api/users')
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
  });

  test('it should GET empty array', async () => {
    mockingoose.User.toReturn([], 'find');
    const response = await supertest(app).get('/api/users');
    expect(response.body.length).toBe(0);
  });
});

describe('POST /api/users', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  test('it should create new user', async () => {
    const user = {
      name: 'test user',
      email: 'test@test.com',
    };
    const doc = {
      __v: 0,
      _id: '59d5a497a5384609f05b0c69',
      name: 'test user',
      email: 'test@test.com',
    };
    mockingoose.User.toReturn(doc, 'save');
    const response = await supertest(app)
      .post('/api/users')
      .send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(doc);
  });

  test.skip('it should return error on saving fail', async () => {
    mockingoose.User.toReturn(new Error(), 'save');
    const response = await supertest(app)
      .post('/api/users')
      .send({
        name: 'test user',
        email: 'test@test.com',
      });
    expect(response.statusCode).toBe(500);
  });
});

describe('PUT /api/users/:id', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  test('it should UPDATE user', async () => {
    const doc = {
      _id: '59d5a497a5384609f05b0c69',
      name: 'new name',
      email: 'test@test.com',
      __v: 0,
    };
    mockingoose.User.toReturn(doc, 'findOneAndUpdate');
    const response = await supertest(app)
      .put('/api/users/59d5a497a5384609f05b0c69')
      .send({
        name: 'new name',
      });
    expect(response.statusCode).toBe(200);
  });
});
