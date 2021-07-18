const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'tour must have name'], 
        unique:true,
        trim: true
    },
    rating:Number,
    ratingAverage: Number,
    ratingQty:Number,
    discount:Number,
    price:{
        type:Number, 
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
    difficulty: String,
    duration: String,
    imageCover:{
        type:String, 
        required:[true, 'tour must have imageCover'],
        trim:true
    },
    images: [String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    startDate:[Date]
}, {
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

tourSchema.virtual('nepaliPrice').get(function (){
    return this.price * 100;
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;