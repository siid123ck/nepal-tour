// const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const Tour = require('../model/tour');
const catchAsync = require('../utils/catchAsync');
// const catchAsync = require('../utils/catchAsync');
const factoryHandler = require('./factoryHandler')

// const hanldeCastErr = err=>{
//     const message = `Invalid ${err.path}: ${err.value}`; 
//     return new AppError(message, 400)
// }

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

//  const uploadPhoto = upload.single('photo');  //req.file
//  const uploadPhotos = upload.array('photos', 5); //req.files

const uploadTourFiles = upload.fields([
    {name:'imageCover', maxCount:1}, 
    {name:'images', maxCount:3}
])

const customizedUploadedFiles = catchAsync( async (req, res, next)=>{
  if(!req.files.imageCover && !req.files.images) return next();
  
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
  await sharp(req.files.imageCover[0].buffer)
  .resize(1300, 1200)
  .toFormat('jpeg')
  .jpeg({quality:80}) 
  .toFile(`public/images/tours/${req.body.imageCover}`)
  console.log(req.body.imageCover)

   
   req.body.images = [];
  await Promise.all(
      req.files.images.map(async (file, i)=>{
      const filename =  `tour-${req.params.id}}-${Date.now()}-${i+1}-cover.jpeg`
      await sharp(file.buffer)
      .resize(1300, 1200)
      .toFormat('jpeg')
      .jpeg({quality:80}) 
      .toFile(`public/images/tours/${filename}`)

      req.body.images.push(filename)
    }))
    console.log(req.body.images)

    next();
})

const getAllTours = factoryHandler.getAll(Tour)
const postTour = factoryHandler.createOne(Tour);
const getSingleTour = factoryHandler.getOne(Tour, 'reviews');
const updateTour = factoryHandler.updateOne(Tour);
const deleteTour = factoryHandler.deleteOne(Tour);



 module.exports= {getAllTours, postTour, getSingleTour, updateTour, deleteTour,
     uploadTourFiles, customizedUploadedFiles};
