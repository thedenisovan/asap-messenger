import { afterAll, describe, test } from '@jest/globals';
import signinRoute from '../../routes/signin.routes.js';
import request from 'supertest';
import express from 'express';
import { prisma } from '../../db/prisma.js';
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
      .expect(200, done);
  });
});
