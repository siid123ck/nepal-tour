const dotenv = require('dotenv');
const AppError = require('../utils/AppError');
dotenv.config({path:'./config.env'});

const hanldeCastErr = err=>{
    const message = `Invalid ${err.path}: ${err.value}`; 
    return new AppError(message, 400)
}

const handleDuplicateFields = err=>{
    const value = err.errmsg.match(/"([^"]*)"/)[0];
    const message = `Duplicate field value (${value}) please check and rewrite it`;
    return new AppError(message, 400);
}

const handleJsonWebTokenError = err =>new AppError('Json token invalid, please try login again', 401)
const handleTokenExpiredError = err =>new AppError('Json token has been expired, please try login again', 401)

const sendDevErr = (err, res)=>{
    //operational and trusted error 
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            error:err,
            stack:err.stack
        })

    //programming or other errors
    // else {
    //     console.err('error', err)
    //     res.status(500).json({
    //         status:'error', 
    //         message:'something went wrong'
    //     })
    // }
}


const sendProdErr = (err, res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    })
} 

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode||500; 
    err.status = err.status||'error';

   if(process.env.NODE_ENV==='development'){
    sendDevErr(err, res)
   }

   else if(process.env.NODE_ENV==='production'){
    let error = {...err} ;
    if(err.name ==='CastError') {
        error = hanldeCastErr(error);
        // sendProdErr(error, res)
    } 
    
    if(err.code===11000) {
        error = handleDuplicateFields(err);
        // sendProdErr(error, res)
    }

    if(err.name === "JsonWebTokenError") {
        error = handleJsonWebTokenError()
        // sendProdErr(error, res)
    }
    if(err.name === "TokenExpiredError") {
        error = handleTokenExpiredError()
        // sendProdErr(error, res)
    }

      sendProdErr(error, res)
   }
   
}