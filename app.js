const express = require('express');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const hpp = require('hpp')

const authController = require('./controllers/authController')
const tourRouter = require('./routes/tour');
const userRouter = require('./routes/user');
const AppError = require('./utils/AppError');
const errorHandler = require('./ErrorHandler/errorHandler')

const app = express();

//helmet to set security http headers
app.use(helmet())

app.use(express.json()) 

app.use(mongoSanitize()); 

app.use(xss())

//premeter parameter polution 
// app.use(hpp({
//     whitelist:[]
// }))
 

app.use(express.static(`${__dirname}/public`))

// app.use((req, res, next)=>{
//     req.requestTime = new Date().toISOString();
//     // console.log(req.headers)
//     next();
// })

//limit request from same ip
const limiter = rateLimit({
    max:100,
    windowMs:60*60*100,
    message:'too many reuests in this ip, please try again later'
})
app.use('/api', limiter)
 
app.use('/api/tours', tourRouter)

app.use('/api/users', userRouter)

app.post('/api/auth/signup', authController.signup)
app.post('/api/auth/login', authController.login)
app.post('/api/auth/forgotpassword', authController.forgotPassword)
app.patch('/api/auth/resetpassword/:token', authController.resetPassword)
app.post('/api/auth/updatepassword', authController.protect, authController.updatePassword)



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