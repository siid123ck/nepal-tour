// const fs = require('fs');
const Tour = require('../model/tour');
// const catchAsync = require('../utils/catchAsync');
const factoryHandler = require('./factoryHandler')

// const hanldeCastErr = err=>{
//     const message = `Invalid ${err.path}: ${err.value}`; 
//     return new AppError(message, 400)
// }


const getAllTours = factoryHandler.getAll(Tour)
const postTour = factoryHandler.createOne(Tour);
const getSingleTour = factoryHandler.getOne(Tour, 'reviews');
const updateTour = factoryHandler.updateOne(Tour);
const deleteTour = factoryHandler.deleteOne(Tour);



 module.exports= {getAllTours, postTour, getSingleTour, updateTour, deleteTour};
