const express=require("express");

const {connection}=require("./config/db");
const {SignupRouter}=require("./routs/signup.router")
const {RestorentRouter}=require("./routs/restorent.router")
const {OrderRouter}=require("./routs/order.router")
const {MenuRouter}=require("./routs/menu.router")

let app=express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("srever is started")
})
app.use("/api",SignupRouter)
app.use("/api/restaurants",RestorentRouter)
app.use("/api/orders",OrderRouter)
app.use("/menu",MenuRouter)
app.listen(8000,async()=>{
    await connection
    console.log("app is started on 8000")
})