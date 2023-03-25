const express = require("express")
const mongoose = require("mongoose");


const {OrderModel}=require("../model/order.model")
const user=require("../model/signup.model")
const restaurant=require('../model/restorent.model')
const OrderRouter = express.Router();
OrderRouter.get("/",async(req,res)=>{
    try{
        let Restorent=await OrderModel.find().populate("user",'name email').populate('restaurant','name address')
        res.send(Restorent)
    }catch(err){
        console.log(err)
        res.send("err")
    }
})
OrderRouter.get("/:id",async(req,res)=>{
    try{
        let _id=req.params.id
        let Restorent=await OrderModel.findById({_id}).populate("user",'name email').populate('restaurant','name address')
        res.send(Restorent)
    }catch(err){
        console.log(err)
        res.send("err")
    }
})

OrderRouter.post("/",async(req,res)=>{
    try{
        let restaurant=new OrderModel(req.body)
        await restaurant.save()
        res.send(restaurant)

    }catch(err){
        console.log(err)
        res.send(err)
    }
})
OrderRouter.patch("/:id",async(req,res)=>{
    try{
        let _id = req.params.id
        payloade=req.body
        let restaurant=await OrderModel.findByIdAndUpdate(_id,  payloade, { new: true })
        
        res.send(restaurant)

    }catch(err){
        console.log(err)
        res.send(err)
    }
})



module.exports = { OrderRouter }