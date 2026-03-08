import express from 'express';
import signupRoute from './routes/signup.routes.js';
import signinRoute from './routes/signin.routes.js';
import userProfile from './routes/profile.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/chatPage', userProfile);

export default app;
