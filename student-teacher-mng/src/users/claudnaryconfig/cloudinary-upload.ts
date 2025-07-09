import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as streamifier from 'streamifier'; // <-- use this import
import cloudinary from './claudinary';

export function uploadToCloudinary(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file?.buffer) return reject(new Error('File buffer is missing'));

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'users' },
      (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (err || !result) {
          return reject(err || new Error('Cloudinary upload failed'));
        }
        resolve(result.secure_url);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
}