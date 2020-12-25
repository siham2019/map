import express from "express";
export const route = express.Router();
import { PointM } from "../model/points.js";
import {geocoder} from "../geocode.js"
import bodyParser from 'body-parser'

/* const {h}=geocoder;
 */route.post("/",bodyParser.urlencoded({extended:true}),async(req,res,next)=>{
   
    geocoder
    .geocode([
     req.body.adress,
      
    ],async function(err, locations) {
      if (err) throw err;
      const g={...locations.received[0]};
        try {
           await PointM.create({
                id:req.body.id,
                latitude:   g[0].locations[0].latLng.lat,
                longitude: g[0].locations[0].latLng.lng ,
                country: g[0].locations[0].adminArea1,
                city:  g[0].locations[0].adminArea5,
                streetName: g[0].locations[0].street,
              })
              res.send("success");
        } catch (error) {
            res.send(error);
        }
    });
 
    
})
route.get("/",async(req,res,next)=>{
  const g=await PointM.find({})
  res.send(g)
})
