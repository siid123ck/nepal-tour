const multer = require('multer');
const sharp = require('sharp');

const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/AppError');
const factoryHandler = require('./factoryHandler')

// const upload = multer({dest:'public/images/users'});
// const multiStorage = multer.diskStorage({
//   destination: (req, file, cb)=>cb(null, 'public/images/users'),
//   filename:(req, file, cb)=>{
//     ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//   }
// })
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb)=>{
    if(file.mimetype.startsWith('image')){
      cb(null, true)
    } else{
      cb(new AppError('The file you submitted is not supported here, please submit image'), false)
    }
  }
})


const filterObj = (obj, ...fields)=>{
  const newObj = {}; 
  Object.keys(obj).forEach(element => {
    if(fields.includes(element)) newObj[element] = obj[element];
  });
  return newObj;
}

const uploadPhoto = upload.single('photo');

const resizedAfterUpload = (req, res, next)=>{
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`
  sharp(req.file.buffer)
  .resize(300, 300)
  .toFormat('jpeg')
  .jpeg({quality:80})
  .toFile(`public/images/users/${req.file.filename}`)

  next();
}

const updateMe = catchAsync(async (req, res, next)=>{
  console.log(req.file)
 if(req.body.password || req.body.comfirm_password){
   return next(new AppError('You can not change password in this page', 400))
 }

 const updatedBody = filterObj(req.body, 'name', 'gmail');
 if(req.file) updatedBody.photo = req.file.filename;
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

 module.exports= {getAllUsers, getSingleUser, updateUser, deleteUser,
   updateMe, deleteMe, getMe, uploadPhoto, resizedAfterUpload};
