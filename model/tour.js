const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'tour must have name'], 
        unique:true,
        trim: true
    },
    ratingAverage: Number,
    ratingQty:Number,
    discount:Number,
    price:{
        type:String, 
        required:[true, 'tour must have price']
    },
    summary:{
        type:String, 
        required:[true, 'tour must have summary'],
        trim:true
    },
    description:{
        type:String, 
        trim:true
    },
    imageCover:{
        type:String, 
        required:[true, 'tour must have imageCover'],
        trim:true
    },
    images: [String],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    startDate:[Date]
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;