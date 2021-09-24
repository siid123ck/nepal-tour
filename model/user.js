
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        minlength:8,
        select:false
    },
    comfirm_password:{
        type:String,
        required:[true, "Password must be comfirmed"],
        validate:{
            validator: function(el){
             return  el ===this.password
            },
            message:"Password must be matched"
        }
    },
    photo:String

}) 

userSchema.pre('save', async function(next){
    // if password not modified
    if(!this.isModified('password')) return next();

    //hash the password if modified
    this.password= await bcrypt.hash(this.password, 12)

    this.comfirm_password=undefined;
})

userSchema.methods.correctPassword =async function(userPassword, enteredPassword){
    const matchedPassword = await bcrypt.compare(enteredPassword, userPassword)
    console.log(matchedPassword) 
    return matchedPassword;
}

module.exports=mongoose.model('User', userSchema);