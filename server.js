const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./auth/auth-router');
const catRouter = require('./routes/category/cat-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/category', catRouter);

server.get('/', (req, res) => {
  res.send('Gigapet 7 is alive!');
});

server.use((req, res) => {
  res.status(404).json({ message: '404 route was not found' });
});

server.use((err, req, res, next) => {
  console.log(err); // ! rm when complete
  res.status(500).json({ message: 'an internal server error occurred' });
});

module.exports = server;
