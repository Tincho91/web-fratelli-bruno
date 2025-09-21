import { Buffer } from "node:buffer";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const defaultFolder = process.env.CLOUDINARY_UPLOAD_FOLDER ?? "fratelli-bruno";

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export async function uploadImageFromArrayBuffer(params: {
  arrayBuffer: ArrayBuffer;
  folder?: string;
}): Promise<UploadApiResponse> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured. Set the required environment variables.");
  }

  const targetFolder = params.folder ?? defaultFolder;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: targetFolder,
        resource_type: "image",
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(Buffer.from(params.arrayBuffer));
  });
}
