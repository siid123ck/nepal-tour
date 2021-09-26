const Review = require("../model/review");
const catchAsync = require("../utils/catchAsync");

module.exports.createReview = catchAsync(async (req, res, next)=>{
    //alow nested routes
    if(!req.body.tour)  req.body.tour = req.params.tourId
    if(!req.body.user)  req.body.user = req.user.id
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
        length:reviews.length,
        reviews
    })
})
