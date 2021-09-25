
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');

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
    passwordChangeAt: Date,
    passwordResetToken:String, 
    passwordResetExpire:Date,
    role:{
        type:String,
        enum:['user', 'guide', 'guide-lead', 'admin'],
        default:'user'
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
    return matchedPassword;
}

userSchema.methods.changedPasswordAfter = function(jwtTimeStamp){
    if(this.passwordChangeAt){
        const changedTimeStamp = this.passwordChangeAt.getTime()/1000;
        return changedTimeStamp > jwtTimeStamp;
    }

    return false;
} 

userSchema.methods.createResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 
    this.passwordResetExpire = Date.now() + 1000 * 60 *5;
 
    console.log(resetToken, this.passwordResetToken, this.passwordResetExpire)
    return resetToken;
}
module.exports=mongoose.model('User', userSchema); 