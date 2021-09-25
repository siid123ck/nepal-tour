const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/AppError');

const filterObj = (obj, ...fields)=>{
  const newObj = {}; 
  Object.keys(obj).forEach(element => {
    if(fields.includes(element)) newObj[element] = obj[element];
  });
  return newObj;
}

const getAllUsers = catchAsync(async(req, res, next)=>{
  const users = await User.find()
        res.status(200).json({
            status:'sucess',
            result:users.length,
            users
        })
 })


const getSingleUser =  (req, res)=>{
  res.send('get single user')
};

const deleteUser =  (req, res)=>{
res.send('deleted ')
}

const updateUser = (req, res)=>{
    res.send('updated text ')
}

const updateMe =catchAsync(async (req, res, next)=>{
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


 module.exports= {getAllUsers, getSingleUser, updateUser, deleteUser, updateMe, deleteMe};
