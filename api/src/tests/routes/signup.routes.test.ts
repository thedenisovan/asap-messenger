import { afterAll, afterEach, describe, test } from '@jest/globals';
import signupRoute from '../../routes/signup.routes.js';
import request from 'supertest';
import express from 'express';
import { prisma } from '../../db/prisma.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/signup', signupRoute);

afterEach(async () => {
  await prisma.profile.deleteMany({ where: { email: 'johnDoe@odin.net' } });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /signup', () => {
  test('signup route works', (done) => {
    request(app)
      .post('/signup')
      .send({
        username: 'johnDoe',
        email: 'johnDoe@odin.net',
        password: 'Admin123@',
        passwordConfirmation: 'Admin123@',
      })
      .expect('Content-Type', /json/)
      .expect({ message: 'profile created' })
      .expect(200, done);
  });
});
