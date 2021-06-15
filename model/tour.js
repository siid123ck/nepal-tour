const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'tour must have name'], 
        unique:true
    },
    rating:{
        type:String,  
        required:true
    },
    price:{
        type:String, 
        required:[true, 'tour must have price']
    }
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;