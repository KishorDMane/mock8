const mongoose=require("mongoose");

require("dotenv").config()
 
let mongo_url=process.env.mongo_url
// console.log(mongo_url)

const connection= mongoose.connect(mongo_url);
module.exports={connection}