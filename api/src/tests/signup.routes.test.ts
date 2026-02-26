import { describe, test, expect } from '@jest/globals';
import signupRoute from '../routes/signup.routes.js';
import request from 'supertest';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/signup', signupRoute);

test('signup route works', (done) => {
  request(app)
    .post('/signup')
    .expect('Content-Type', /json/)
    .expect({ message: 'This is signup route' })
    .expect(200, done);
});
