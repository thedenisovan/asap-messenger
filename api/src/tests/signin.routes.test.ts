import { afterAll, afterEach, describe, test } from '@jest/globals';
import signinRoute from '../routes/signin.routes.js';
import request from 'supertest';
import express from 'express';
import { prisma } from '../db/prisma.js';
import 'dotenv/config.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/signin', signinRoute);

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /signin', () => {
  test('signin route works', (done) => {
    request(app)
      .post('/signin')
      .send({
        email: 'johnDoe@odin.com',
        password: process.env.TEST_PASS,
      })
      .expect('Content-Type', /json/)
      .expect({ message: 'this is signin route' })
      .expect(200, done);
  });

  test('wrong email should fail signin', (done) => {
    request(app)
      .post('/signin')
      .send({
        email: 'john@odin.com',
        password: process.env.TEST_PASS,
      })
      .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: process.env.TEST_PASS,
            msg: 'User with give email does not exist.',
            path: 'password',
            location: 'body',
          },
        ],
      })
      .expect(200, done);
  });

  test('wrong password should fail signin', (done) => {
    request(app)
      .post('/signin')
      .send({
        email: 'johnDoe@odin.com',
        password: 'wrongPass',
      })
      .expect('Content-Type', /json/)
      .expect({
        errors: [
          {
            type: 'field',
            value: 'wrongPass',
            msg: 'Invalid password.',
            path: 'password',
            location: 'body',
          },
        ],
      })
      .expect(200, done);
  });
});
