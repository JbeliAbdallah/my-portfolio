import { cloudinary } from "@/lib/cloudinary";
import path from "path";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { v4 as uuid } from "uuid";

export async function saveUploadedFile(
  file: File | null,
  folder: string,
  allowedExtensions?: string[],
): Promise<string | null> {
  if (!file || file.size === 0) {
    return null;
  }

  const extension = path.extname(file.name).toLowerCase();

  if (allowedExtensions && !allowedExtensions.includes(extension)) {
    throw new Error("Invalid file type.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${folder}`,
        public_id: uuid(),
        resource_type: allowedExtensions?.includes(".pdf") ? "raw" : "image",
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Upload failed."));
          return;
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });

  return result.secure_url;
}
