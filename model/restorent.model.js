const mongoose = require("mongoose");
const RestorentSchema = mongoose.Schema({
 
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menu'
},]
}
)


const RestorentModel = mongoose.model("restorent", RestorentSchema);
module.exports = { RestorentModel }
