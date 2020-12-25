import mongoose from 'mongoose';
const { Schema } = mongoose;

const Point = new Schema({
    id:{type:Number,unique:true},
    latitude:   Number,
    longitude:Number ,
    country: String,
    city: String,
    streetName: String,
  
  
});
export  const PointM = mongoose.model('Point', Point);
