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
        shipping : {
               HouseNo: {type:String},
               State:{type:String},
               city: {type:String},
               LandMark:{type:String},
               pincode: {type:String}
                   }
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