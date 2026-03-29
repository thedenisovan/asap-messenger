import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import signupRoute from './routes/signup.routes.js';
import signinRoute from './routes/signin.routes.js';
import dashboard from './routes/dashboard.routes.js';

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/dashboard', dashboard);

io.on('connection', (socket) => {
  console.log(`User connected on socket id: ${socket.id}`);

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room: ${roomName}`);
  });

  socket.on('send_message', ({ roomName, newMsg }) => {
    socket.to(roomName).emit('receive_message', newMsg);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected from socket with id: ${socket.id}`);
  });
});

export default server;
