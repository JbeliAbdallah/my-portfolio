import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function saveUploadedFile(
  file: File | null,
  folder: string,
  allowedExtensions?: string[],
): Promise<string | null> {
  if (!file || file.size === 0) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = path.extname(file.name);
  if (
    allowedExtensions &&
    !allowedExtensions.includes(extension.toLowerCase())
  ) {
    throw new Error("Invalid file type.");
  }
  const filename = `${uuid()}${extension}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  await mkdir(uploadDir, { recursive: true });

  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}
