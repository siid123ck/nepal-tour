const mongoose = require('mongoose');

const Tour = require('./tour')

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'review can not be empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true, 'review must belong to tour']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true, 'review must belong to user']
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

reviewSchema.index({tour: 1, user: 1}, {unique:true})

reviewSchema.statics.calculateAvgRating = async function(tourId){
    const stats =await this.aggregate([
        {
            $match:{tour:tourId}
        },
        {
            $group:{_id: '$tour', ratingQty:{$sum: 1}, ratingAverage:{$avg: '$rating'}}
        }
    ])
    
    if(stats.length){
        await Tour.findByIdAndUpdate(tourId, {
            ratingQty:stats[0].ratingQty,
            ratingAverage:stats[0].ratingAverage
        })
    } else{
        await Tour.findByIdAndUpdate(tourId, {
            ratingQty:0,
            ratingAverage:0
        })
    }


}

reviewSchema.pre(/^find/, function(next){
    this.populate({ 
        path:'user',
        select:'name photo'
    })
    // this.populate({
    //     path:'tour',
    //     select:'name'
    // }).populate({
    //     path:'user', 
    //     select:'name photo'
    // })  
    next();
})

reviewSchema.pre(/^findOneAnd/, async function(next){
this.tempReview = await this.findOne();
next();
})

reviewSchema.post('save', function(){
    this.constructor.calculateAvgRating(this.tour)
})

reviewSchema.post(/^findOneAnd/, async function(){
    this.tempReview.constructor.calculateAvgRating(this.tempReview.tour)
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;