const express = require('express');
const authController = require('./controllers/authController')
const tourRouter = require('./routes/tour');
const userRouter = require('./routes/user');
const AppError = require('./utils/AppError');
const errorHandler = require('./ErrorHandler/errorHandler')

const app = express();

app.use(express.json()) 

app.use(express.static(`${__dirname}/public`))

// app.use('/api/users', (req, res, next)=>{
//     console.log('hi, this is midddleware from express js');
//     next();
// })


app.use('/api/tours', tourRouter)

app.use('/api/users', userRouter)

app.post('/api/auth/signup', authController.signup)
app.post('/api/auth/login', authController.login)

//handling unhadled routes 

app.all('*', (req, res, next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     data:`page with ${req.originalUrl} not found on this page` 
    // })

    // const err = new Error(`page with ${req.originalUrl} not found on this page`);
    // err.statusCode = 404; 
    // err.status = 'fail';

    next(new AppError(`page with ${req.originalUrl} not found on this page, pleaze check url`))
})

// app.use((req, res, next)=>{
//     res.status(401)
//     .json({
//         status:'fail',
//         data:`page with ${req.originalUrl} not found on this page`
//     })
// })

app.use(errorHandler)

module.exports= app;