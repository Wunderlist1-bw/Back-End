const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const authRouter = require('./auth/auth-router.js');
const taskRouter = require('./task/task-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/task', taskRouter);

server.get('/', (req, res) => {
    res.send("It's Alive");
})

module.exports = server;