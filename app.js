const express = require('express');
const tourRouter = require('./routes/tour');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json())

app.use(express.static(`${__dirname}/public`))

app.use('/api/users', (req, res, next)=>{
    console.log('hi, this is midddleware from express js');
    next();
})


app.use('/api/tours', tourRouter)

app.use('/api/users', userRouter)

module.exports= app;