// const fs = require('fs');
const Tour = require('../model/tour');
const APIFeature = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const hanldeCastErr = err=>{
    const message = `Invalid ${err.path}: ${err.value}`; 
    return new AppError(message, 400)
}


const getAllTours = catchAsync(async (req, res, next)=>{
        const features = new APIFeature(Tour.find(), req.query).filter().sort().limit()
        .limitFields().paginate()
        const tours = await features.query; 
            res.status(200).json({
                status:'sucess',
                result:tours.length,
                data:{tours}
            })
  
 })


 const postTour = catchAsync(async (req, res, next)=>{
    // const new_tour = new Tour(req.body);
    // new_tour.save();
    const new_tour = await Tour.create(req.body);
    res.status(201).json({
        status:'sucess',
        data:{new_tour}
    })
})

const getSingleTour = catchAsync(async (req, res, next)=>{
  const tour = await Tour.findById(req.params.id);
  if(!tour) return next(new AppError(`Tour not found with id ${req.params.id}`, 404));

  res.status(200).json({
      status:'success',
      data:{tour}
  })
})

const updateTour = catchAsync(async (req, res, next)=>{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!tour) return next(new AppError(`Tour not found with id ${req.params.id}`, 404));
        
        res.status(200).json({
            status:'success',
            data:{tour}
        })
});

const deleteTour = catchAsync(async (req, res, next)=>{
        const tour = await Tour.findByIdAndDelete(req.params.id)
        if(!tour) return next(new AppError(`Tour not found with id ${req.params.id}`, 404));
        res.status(200).json({
            status:'success',
            data:{tour}
        })
})


 module.exports= {getAllTours, postTour, getSingleTour, updateTour, deleteTour};
