const jwt = require('jsonwebtoken');
const User = require('../model/user');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const jsonToken = id=>jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn:process.env.JWT_SECRET_EXPIRE
}) 

exports.signup = catchAsync(async (req, res, next)=>{
    const newUser = await User.create({
        name:req.body.name,
        gmail:req.body.gmail,
        password:req.body.password,
        comfirm_password:req.body.comfirm_password
    }); 
    console.log(newUser._id)
    const token = jsonToken(newUser._id)
    res.status(201).json({
        status:'success',
        user:newUser,
        token
    })
})

exports.login = catchAsync(async (req, res, next)=>{
    const {gmail, password} = req.body;
    
    if(!gmail && !password) return next(new AppError('Please provide gmail and password'))
    if(!gmail) return next(new AppError('Please provide email', 400))
    if(!password) return next(new AppError('Please provide password', 400))
    
    const user = await User.findOne({gmail}).select('+password')

    
    if(!user || !await user.correctPassword(user.password, password)){
        console.log('userid1')
        return next(new AppError('Incorrect email or password', 401))  
    } 
    const token = jsonToken(user._id)
    res.json({
        status:'success',
        token
    })
})

exports.protect = catchAsync(async (req, res, next)=>{
    let token; 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return next(new AppError('You are not authorized to access this page, sign up today', 401))
    console.log(token)
    next();
})