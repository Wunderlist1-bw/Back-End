const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const morgan = require('morgan')


const authRouter = require('./auth/auth-router.js');
const taskRouter = require('./task/task-router.js');

// const middleware = [express.json(), helmet(), cors(), morgan('dev')];
// server.use(middleware);

server.use(express.json())
server.use(helmet())
server.use(cors({
    credentials: true
}))
server.use(morgan('dev'))


server.use('/api/auth', authRouter);
server.use('/api/task', taskRouter);

// server.get('/', (req, res) => {
//     res.send("It's Alive");
// })

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

server.get('/', function (req, res) {
    res.json({ msg: 'Welcome to wunderlust api' })
})

module.exports = server;