import cloudinary from "cloudinary";
import { UploadedFile } from "express-fileupload";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class UploadPosterService {
  public async uploadPoster(poster: UploadedFile): Promise<{ url: string }> {
    try {
      if (!poster.tempFilePath) {
        throw new Error("No valid file path provided.");
      }

      const result = await cloudinary.v2.uploader.upload(poster.tempFilePath, {
        public_id: `${Date.now()}`,
        overwrite: true,
      });

      return { url: result.secure_url };
    } catch (error) {
      const _error = error as Error;

      throw new Error(
        `Error uploading poster: ${_error.message || "Unknown error"}`
      );
    }
  }
}
