const express = require("express")
const mongoose = require("mongoose");


const {MenuModel}=require("../model/menu.model")

const MenuRouter = express.Router();
MenuRouter.get("/",async(req,res)=>{
    try{
        let Restorent=await MenuModel.find()
        res.send(Restorent)
    }catch(err){
        console.log(err)
        res.send("err")
    }
})
MenuRouter.get("/:id",async(req,res)=>{
    try{
        let _id=req.params.id
        let Restorent=await MenuModel.findById({_id})
        res.send(Restorent)
    }catch(err){
        console.log(err)
        res.send("err")
    }
})

MenuRouter.post("/",async(req,res)=>{
    try{
        let restaurant=new MenuModel(req.body)
        await restaurant.save()
        res.send(restaurant)

    }catch(err){
        console.log(err)
        res.send(err)
    }
})
MenuRouter.patch("/:id",async(req,res)=>{
    try{
        let _id = req.params.id
        payloade=req.body
        let restaurant=await MenuModel.findByIdAndUpdate(_id,  payloade, { new: true })
        
        res.send(restaurant)

    }catch(err){
        console.log(err)
        res.send(err)
    }
})



module.exports = { MenuRouter }