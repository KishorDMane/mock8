const mongoose=require("mongoose");
const SignupSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      }
    
})
const SignupModel=mongoose.model("signup",SignupSchema);
module.exports={SignupModel}
