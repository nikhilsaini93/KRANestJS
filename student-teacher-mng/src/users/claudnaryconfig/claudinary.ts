// src/config/cloudinary.config.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dbtg0cump',
  api_key: '851819885991757',
  api_secret: 'risv-J3Rk08MxpOxNJkDZo90UYw'
});

export default cloudinary;







// cloudinary.config({
//    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//   apiKey: process.env.CLOUDINARY_API_KEY,
//   apiSecret: process.env.CLOUDINARY_API_SECRET,

// });

// export default cloudinary;
