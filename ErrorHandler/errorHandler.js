const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const sendDevErr = (err, res)=>{
    //operational and trusted error
    if(err.operational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            error:err,
            stack:err.stack
        })
    }

    //programming or other errors
    else {
        console.err('error', err)
        res.status(500).json({
            status:'error', 
            message:'something went wrong'
        })
    }
}

const sendProdErr = (err, res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode||501;
    err.status = err.status||'error';

   if(process.env.NODE_ENV==='development'){
    sendDevErr(err, res)
   }

   else if(process.env.NODE_ENV==='production'){
    sendProdErr(err, res)
   }
}