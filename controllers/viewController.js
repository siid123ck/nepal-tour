const Tour = require("../model/tour")
const catchAsync = require("../utils/catchAsync")

exports.getOverview = catchAsync(async (req, res, next)=>{
    const tours = await Tour.find();

    res.status(200).render('overview', {
        tours, 
        title:'All tours'
    })
})


exports.getTour = catchAsync(async(req, res, next)=>{
    const tour = await Tour.findOne({slug:req.params.slug}).populate({
        path:'reviews',
        fields:'review rating user'
    })
    console.log(req.params)
    res.status(200).render('tour',{
        title:tour.name, 
        tour
    })
})