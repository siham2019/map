import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import bodyperser from "body-parser"
dotenv.config();
import {route} from "./routes/points.js"

/* const {g}=routes;
 */
const app = express()
const port = 8000 
app.use(bodyperser.json())
app.use(cors())
app.use("/",route)

app.listen(port, () =>{
 mongoose.connect(process.env.DB_URL,{
      useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
     console.log("all things are ok")
 }).catch(err=> console.log(err))
})