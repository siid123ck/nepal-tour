const jwt = require('jsonwebtoken');
// const { decode } = require('punycode'); // idk why I used it here
const {promisify} = require('util'); 
const crypto = require('crypto');
const sendEmail = require('../utils/email')
const User = require('../model/user');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const jsonToken = id=>jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn:process.env.JWT_SECRET_EXPIRE
}) 

const sendResponseToken = (user, statusCode, res) =>{
    const token = jsonToken(user._id)
    res.status(statusCode).json({
        status:'success',
        user,
        token
    })
}

exports.signup = catchAsync(async (req, res, next)=>{
    // const newUser = await User.create({
    //     name:req.body.name,
    //     gmail:req.body.gmail,
    //     password:req.body.password,
    //     comfirm_password:req.body.comfirm_password
    // }); 
    const newUser = await User.create(req.body)
    // const token = jsonToken(newUser._id)
    // res.status(201).json({
    //     status:'success',
    //     user:newUser,
    //     token
    // })
    sendResponseToken(newUser, 201, res)
})

exports.login = catchAsync(async (req, res, next)=>{
    const {gmail, password} = req.body;
    
    if(!gmail && !password) return next(new AppError('Please provide gmail and password'))
    if(!gmail) return next(new AppError('Please provide email', 400))
    if(!password) return next(new AppError('Please provide password', 400))
    
    const user = await User.findOne({gmail}).select('+password')

    
    if(!user || !await user.correctPassword(user.password, password)){
        return next(new AppError('Incorrect email or password', 401))  
    } 
    // const token = jsonToken(user._id)
    // res.json({
    //     status:'success',
    //     token
    // })
    sendResponseToken(user, 201, res)

})

exports.protect = catchAsync(async (req, res, next)=>{
    let token; 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    //return error if there's no token
    if(!token) return next(new AppError('You are not authorized to access this page, sign up today', 401))
   
    // verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    //check user 
    const newUser = await User.findById(decoded.id)
    if(!newUser) return next(new AppError('the token belonging to user does not exist anymore', 401))
     
    // console.log(newUser)
    // check if user changed the password
    // console.log(newUser.changedPasswordAfter(decoded.iat))
    if(newUser.changedPasswordAfter(decoded.iat)) return next(new AppError('password has been changed', 401))
    
    req.user = newUser;
    next();
}) 

exports.restrictTo = (...roles) => (req, res, next)=>{
    if(!roles.includes(req.user.role)) return next(new AppError('You dont have permission to this page', 403))
   
    next()
}

exports.forgotPassword = catchAsync(async (req, res, next)=>{
  const user = await User.findOne({gmail:req.body.gmail}); 

  if(!user) return next(new AppError('There is no email with this email', 404));

  const resetToken = user.createResetToken(); 
//   await user.save({validateBeforeSave:false});
  await user.save({validateBeforeSave:false});

// send token to email
const resetLink = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`
// console.log(resetLink)
const message = `forgot your password ? click on link ${resetLink} to reset the password`;
try {
    await sendEmail({
        email:user.gmail,
        subject:'reset token (valid for 5 minutes',
        message
    })
      res.status(202).json({
          status:'success',
          resetToken
      })  
} catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;

    await user.save({validateBeforeSave:false});
    return next(new AppError('There is error while sending email'))
}
}) 

exports.resetPassword = catchAsync(async(req, res, next)=>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex'); 
    const user = await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpire:{$gt: Date.now()}
    })
    console.log(user)

    if(!user) return next(new AppError('token is expired or invalid', 400))
    
    user.password = req.body.password;
    user.comfirm_password = req.body.comfirm_password;
    user.passwordResetExpire = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    sendResponseToken(user, 201, res)
})

exports.updatePassword = catchAsync(async(req, res, next)=>{
    //get the user from collection 
    const {password, comfirm_password, currentPassword} = req.body;
    const user = await User.findOne(req.user._id).select('+password');
    if(!user) return next(new AppError('You are not logged in, please login with your gmail or sign up', 402))

    if(!password) return next(new AppError('Please provide current password', 400))

    //check if current password is matched with entered password
    if(!await user.correctPassword(user.password, currentPassword)){
        return next(new AppError('password you entered did not matched with current password, try again', 400))
    }

    user.password = password; 
    user.comfirm_password = comfirm_password;
    await user.save();

    //generate token and send it
    console.log(user)
    console.log(req.user)
    sendResponseToken(user, 201, res)
})
