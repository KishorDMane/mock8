const mongoose = require("mongoose");
const MenuSchema = mongoose.Schema(
    {
      
        name: String,
        description: String,
        price: Number,
        image: String
      }
)


const MenuModel = mongoose.model("menu", MenuSchema);
module.exports = { MenuModel }
