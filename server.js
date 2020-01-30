
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()


const authenticate = require('./auth/authenticate-middleware')
const authRouter = require('./auth/auth-router')
const userRouter = require('./users/users-router')
const storiesRouter = require('./stories/stories-router')

const server = express();

server.use(helmet());
server.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}));
server.use(express.json());

server.get('/', (req, res) => {
    const messageOfTheDay = process.env.MOTD || "Per aspera ad astra"
    res.send(`<h2>${messageOfTheDay}</h2>`)
})

server.use('/api/auth', authRouter)
server.use('/api/users', authenticate, userRouter)
server.use('/api/stories', storiesRouter )

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Bad mistake, Engineer!", err 
    })
})


module.exports = server;
