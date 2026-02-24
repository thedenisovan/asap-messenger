import express from 'express';
import signupRoute from './routes/signupRoute';

const app = express();

app.use('/signup', signupRoute);

export default app;
