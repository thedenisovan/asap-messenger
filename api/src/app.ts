import express from 'express';
import signupRoute from './routes/signup.routes.js';
import signinRoute from './routes/signin.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/signup', signupRoute);
app.use('/signin', signinRoute);

export default app;
