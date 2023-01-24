const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required."],
        unique:[true, "Name is already taken."]
    },

    password:{
        type:String,
        required:[true, "Password is required."],
        minLength:[6, "Password should contain at least 6 letters or numbers."]
    },
    image:String,
    passwordConfirm:{
        type:String,
        required:[true, "Please confirm your password."],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:'Error confirming the password.'
        }
    }
})


userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined

    next()

})

const User = mongoose.model('User', userSchema)


module.exports = User