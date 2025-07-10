// src/config/cloudinary.config.ts
import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
   cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,

});

export default cloudinary;
