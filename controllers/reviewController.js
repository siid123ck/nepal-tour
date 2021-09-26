const Review = require("../model/review");
const catchAsync = require("../utils/catchAsync");

module.exports.createReview = catchAsync(async (req, res, next)=>{
    const review = await Review.create(req.body);

    // if(req.body)

    res.status(202).json({
        status:'success',
        review
    })
})

module.exports.getAllReviews = catchAsync(async (req, res, next)=>{
    const reviews = await Review.find();

    res.status(202).json({
        status:'success',
        reviews
    })
})
