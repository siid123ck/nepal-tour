const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'tour must have name'], 
        unique:true,
        trim: true
    },
    secretTour:{
        type:Boolean,
        default:false
    },
    slug:String,
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

//document middleware
tourSchema.pre('save', function (next){
    this.slug = slugify(this.name, {lower:true})
     next();
})

tourSchema.post('save', function (doc, next){
    console.log(doc)
     next();
})

// query middleware
tourSchema.pre(/^find/, function(next){
    this.find({secretTour:{$ne:true}})
    this.start=Date.now()
    next();
})
// tourSchema.pre('findOne', function(next){
//     this.find({secretTour:{$ne:true}})
//     next();
// })

tourSchema.post(/^find/, function(doc, next){
    console.log(`this query took ${Date.now() - this.start} miliseconds`)
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;