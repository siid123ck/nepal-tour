const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'tour must have name'], 
        unique:true,
        trim: true,
        minlength:[3, 'the tour name must have at least 3 characters'],
        maxlength:[30, 'the tour name must have maximum 30 characters']
    },
    secretTour:{
        type:Boolean,
        default:false
    },
    slug:String,
    rating:{
        type:Number,
        min:[1, 'rating number must be at least 1'],
        max:[5, 'rating number must not be more than 5'],
    },
    ratingAverage: Number,
    ratingQty:Number,
    price:{
        type:Number, 
        required:[true, 'tour must have price']
    },
    discount:{
        type:Number,
        validate:{
            // this points to current doc so it only work on creating new document not on updating document
            validator:function(val){
                return val < this.price;
            },
            message:'the discount value ({VALUE}) must be less than tour price'
        } 
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
    difficulty: {
        type:String, 
        enum:{
            values:['easy', 'medium', 'hard'],
            message:'tour difficulty can be either easy, medium or hard'
        }
    },
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