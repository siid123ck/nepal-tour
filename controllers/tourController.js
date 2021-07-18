const fs = require('fs');
const Tour = require('../model/tour');
const APIFeature = require('../utils/apiFeatures')

const checkTourId = (req, res, next, value) =>{
    
}

// const aliasTopTours =  (req, res, next)=>{
// console.log('middleware used');
// next()
// }

const getAllTours = async (req, res)=>{
    try {
        const features = new APIFeature(Tour.find(), req.query).filter().sort().limit()
        .limitFields().paginate()
        const tours = await features.query; 
            res.status(200).json({
                status:'sucess',
                result:tours.length,
                data:{tours}
            })
        } catch (error) {
        console.log(error)
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
  
 }

 const postTour = async (req, res)=>{
    // const new_tour = new Tour(req.body);
    // new_tour.save();

    try {
        const new_tour = await Tour.create(req.body);
        res.status(201).json({
            status:'sucess',
            data:{new_tour}
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
}

const getSingleTour = async (req, res)=>{
try {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
      status:'success',
      data:{tour}
  })
} catch (err) {
    console.log(error)
    res.status(404).json({
        status:'fail',
        data:{err}
    })
}
}

const updateTour = async (req, res)=>{
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        console.log('tour' + tour)
        console.log(req.body)
        res.status(200).json({
            status:'success',
            data:{tour}
        })

    } catch (error) {
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
 
};

const deleteTour = async (req, res)=>{
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
        console.log('tour' + tour)
        res.status(200).json({
            status:'success',
            data:{tour}
        })

    } catch (error) {
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
}


 module.exports= {getAllTours, postTour, getSingleTour, updateTour, deleteTour};
