const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const morgan = require('morgan')


const authRouter = require('./auth/auth-router.js');
const taskRouter = require('./task/task-router.js');

const middleware = [express.json(), helmet(), cors(), morgan('dev')];
server.use(middleware);


server.use('/api/auth', authRouter);
server.use('/api/task', taskRouter);

// server.get('/', (req, res) => {
//     res.send("It's Alive");
// })

server.get('/', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

module.exports = server;