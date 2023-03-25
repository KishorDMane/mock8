const express = require("express")
const mongoose = require("mongoose");

const menu = require("../model/menu.model")
const { RestorentModel } = require("../model/restorent.model")

const RestorentRouter = express.Router();
RestorentRouter.get("/", async (req, res) => {
    try {
        let Restorent = await RestorentModel.find().populate('menu')
        res.send(Restorent)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }
})
RestorentRouter.get("/:id", async (req, res) => {
    try {
        let _id = req.params.id
        let Restorent = await RestorentModel.findById({ _id }).populate('menu')
        res.send(Restorent)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }
})
RestorentRouter.get("/:id/menu", async (req, res) => {
    try {
        let _id = req.params.id
        let Restorent = await RestorentModel.findById({ _id }).populate('menu')
        res.send(Restorent.menu)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }
})
RestorentRouter.post("/", async (req, res) => {
    try {
        let restaurant = new RestorentModel(req.body)
        await restaurant.save()
        res.send(restaurant)

    } catch (err) {
        console.log(err)
        res.send(err)
    }
})
RestorentRouter.patch("/:id/menu", async (req, res) => {
    try {
        let _id = req.params.id
        payloade = req.body
        let restaurant = await RestorentModel.findByIdAndUpdate(_id, payloade, { new: true })

        res.send(restaurant)

    } catch (err) {
        console.log(err)
        res.send(err)
    }
})
RestorentRouter.delete("/:id/menu/:mid", async (req, res) => {
    try {
        const _id = req.params.id
        const menuid = req.params.mid
        const restaurant = await RestorentModel.findById(req.params.id)
        let payloade = restaurant.menu
        let newObj = payloade.filter((el) => {
            return el != menuid
        })
        console.log(newObj)
        restaurant.menu=newObj
        // console.log(restaurant)
        const newrest = await RestorentModel.findByIdAndUpdate(_id, restaurant, { new: true })
        res.send(newrest)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }
})


module.exports = { RestorentRouter }