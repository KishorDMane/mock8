const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const { SignupModel } = require("../model/signup.model");

const SignupRouter = express.Router();



SignupRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await SignupModel.findOne({ email });
        if (!user) {
            res.status(401).json({ error: "invalid Credentials" });

        } else {
            const hash = user.password;
            bcrypt.compare(password, hash, function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: "passworde not match" });
                } else if (result == false) {
                    res.status(401).json({ error: "invalid credential" });
                } else {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email,
                        name: user.name
                    },process.env.JET_Secret);
                    res.json({token})
                }
            })


        }





    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });

    }

})










SignupRouter.post("/register", async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const userExists = await SignupModel.findOne({ email });

        if (userExists) {
            res.status(400).json({ "msg": "user Exists" });

        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    res.status(500).json({ error: "Internal server error" });

                } else {
                    const user = new SignupModel({ name, email, password: hash })
                    await user.save();
                    res.json(user)
                }
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }


})

SignupRouter.patch("/user/:id/reset", (req, res) => {

    try {
        let _id = req.params.id

        let payloade = req.body;
        let password = payloade.password;
        console.log(password)

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(500).json({ error: "Internal server error" });

            } else {
                payloade.password = hash;
               
                const user = await SignupModel.findByIdAndUpdate(_id,  payloade, { new: true })
                res.json(user)
            }
        })


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
    }

})

module.exports = { SignupRouter }