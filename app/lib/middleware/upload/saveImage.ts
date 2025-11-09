import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export async function saveImage(file: File, folder: string) {
  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), "public/assets", folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Generate unique filename
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const filePath = path.join(uploadDir, fileName);

  // Convert & write buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);

  // Return relative path for DB
  return `/assets/${folder}/${fileName}`;
}
