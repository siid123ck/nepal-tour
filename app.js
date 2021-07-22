const express = require('express');
const tourRouter = require('./routes/tour');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json())

app.use(express.static(`${__dirname}/public`))

// app.use('/api/users', (req, res, next)=>{
//     console.log('hi, this is midddleware from express js');
//     next();
// })


app.use('/api/tours', tourRouter)

app.use('/api/users', userRouter)

//handling unhadled routes

app.all('*', (req, res, next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     data:`page with ${req.originalUrl} not found on this page` 
    // })
    const err = new Error(`page with ${req.originalUrl} not found on this page`);
    err.statusCode = 404; 
    err.status = 'fail';
    console.log('console before middleware')
    next(err)
    console.log('console after middleware')
})

// app.use((req, res, next)=>{
//     res.status(401)
//     .json({
//         status:'fail',
//         data:`page with ${req.originalUrl} not found on this page`
//     })
// })

app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode||501;
    err.status = err.status||'error';

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
})

module.exports= app;