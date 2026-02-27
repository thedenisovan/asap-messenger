import { describe, test, expect } from '@jest/globals';
import signupRoute from '../routes/signup.routes.js';
import request from 'supertest';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/signup', signupRoute);

describe('POST /signup', () => {
  test('signup route works', (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'admin1' })
      .expect('Content-Type', /json/)
      .expect({ message: 'This is signup route' })
      .expect(200, done);
  });

  test('username is too short', (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'adm' })
      .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: 'adm',
            msg: 'Username must be 6-16 characters long.',
            path: 'username',
            location: 'body',
          },
        ],
      })
      .expect(200, done);
  });
});
