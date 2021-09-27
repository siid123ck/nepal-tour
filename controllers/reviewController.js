const Review = require("../model/review");
const catchAsync = require("../utils/catchAsync");
const factoryHandler = require('./factoryHandler')

module.exports.setTourAndUser = (req, res, next)=>{
    //alow nested routes
    if(!req.body.tour)  req.body.tour = req.params.tourId
    if(!req.body.user)  req.body.user = req.user.id
    next();
}

module.exports.getSingleReview = factoryHandler.getOne(Review);
module.exports.createReview = factoryHandler.createOne(Review);
module.exports.updateReview = factoryHandler.updateOne(Review);
module.exports.getAllReviews = factoryHandler.getAll(Review);
module.exports.deleteReview = factoryHandler.deleteOne(Review);

