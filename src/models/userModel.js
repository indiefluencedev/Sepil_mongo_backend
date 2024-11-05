const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String, 
        required:true,
        trim:true
    },
    email : {
        type:String, 
        required:true,
        unique:true,
        trim:true
    },
    phone : {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password : {
        type:String,
        required:true
    },
    address : { 
               houseNo: {type:String},
               state:{type:String},
               city: {type:String},
               landMark:{type:String},
               pincode: {type:String}
                },
     isVerified:{
        type:Boolean,
         default:false
    }, 
    isAdmin:{
        type:Boolean,
        default: false
    },
    otp: {
        type: String,
        
    },
    otpExpiry: {
        type: Date,
    
    },
},{timestamps: true })

module.exports = mongoose.model("user", userSchema)