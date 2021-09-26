const mongoose = require('mongoose');

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

module.exports = mongoose.model('Review', reviewSchema)