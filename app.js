const express = require('express');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
// const hpp = require('hpp')
const path = require('path');

const authController = require('./controllers/authController')
const tourRouter = require('./routes/tour');
const userRouter = require('./routes/user');
const viewRouter = require('./routes/viewRouter')
const reviewRoute = require('./routes/review');
const AppError = require('./utils/AppError');
const errorHandler = require('./ErrorHandler/errorHandler')

const app = express();

//set template engines 
app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views'))

//set to serve static files
app.use(express.static(path.join(__dirname, 'public')))
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
app.use('/api/reviews', reviewRoute)
app.use('/', viewRouter)

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