import express from 'express';
import signupRoute from './routes/signupRoute';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/signup', signupRoute);

export default app;
