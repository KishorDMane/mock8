const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({





    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restorent'
    },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status:{
        type:String,
        enum:["placed","preparing","On the way","delivered"],
        default:"placed"
    }



}
)


const OrderModel = mongoose.model("order", OrderSchema);
module.exports = { OrderModel }
