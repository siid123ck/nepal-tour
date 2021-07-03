
const mongoose = required('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        trim:true
    },
    gmail:{
        type: String,
        required:[true, "Gmail is required"],
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, 'This is not valid email']
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:8
    },
    confirm_password:{
        type:String,
        required:[true, "Password must be comfirmed"]
    },
    photo:String

})

module.exports=mongoose.model('User', userSchema);