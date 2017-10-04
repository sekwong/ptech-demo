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

  test.skip('it should response code 500', async () => {
    mockingoose.User.toReturn(new Error(), 'findOne');
    const response = await supertest(app)
      .get('/api/users/12345678')
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Error getting user.',
    });
  });
});

describe('GET /api/users', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  test('it should return all users', async () => {
    mockingoose.User.toReturn({}, 'find');
    const response = await supertest(app)
      .get('/api/users')
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
  });
});
