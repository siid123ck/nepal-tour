const User = require('../model/user');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next)=>{
    const newUser = await User.create({
        name:req.body.name,
        gmail:req.body.gmail,
        password:req.body.password,
        comfirm_password:req.body.comfirm_password
    }); 
    res.json({
        status:'success',
        user:newUser
    })
})

exports.sign = async (req, res, next)=>{
    res.json({
        status:'success',
        user:'newUser'
    })
}