const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/AppError');
const factoryHandler = require('./factoryHandler')

const filterObj = (obj, ...fields)=>{
  const newObj = {}; 
  Object.keys(obj).forEach(element => {
    if(fields.includes(element)) newObj[element] = obj[element];
  });
  return newObj;
}

const updateMe = catchAsync(async (req, res, next)=>{
 if(req.body.password || req.body.comfirm_password){
   return next(new AppError('You can not change password in this page', 400))
 }

 const updatedBody = filterObj(req.body, 'name', 'gmail');
 const updateUser = await User.findByIdAndUpdate(req.user.id, updatedBody,{
   new:true,
   runValidators:true
 })
 res.status(202).json({
   status:'success',
   user:updateUser
 })
})

const deleteMe = catchAsync(async (req, res, next)=>{
  await User.findByIdAndUpdate(req.user.id, {active:false}); 

  res.status(202).json({
    status:'success',
    result:null
  })
})

const getMe = (req, res, next)=>{
  req.params.id = req.user.id;
  next()
}


const getAllUsers =factoryHandler.getAll(User);
const getSingleUser =  factoryHandler.getOne(User);
const updateUser = factoryHandler.updateOne(User);
const deleteUser = factoryHandler.deleteOne(User);

 module.exports= {getAllUsers, getSingleUser, updateUser, deleteUser, updateMe, deleteMe, getMe};
