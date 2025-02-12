import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log({ formData });
    const file = formData.get("file") as File | null;
    const category = formData.get("category") as string | null;

    if (!file || !category) {
      return NextResponse.json(
        { error: "File or category is missing" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure filename ends with .webp
    const originalName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filename = `${Date.now()}.webp`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", category);
    const filePath = path.join(uploadDir, filename);

    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });

    // Optimize and convert to webp using sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(1920, 1080, { fit: "inside", withoutEnlargement: true })
      .toFormat("webp", { quality: 80 })
      .toBuffer();

    // Save the optimized image
    await writeFile(filePath, optimizedBuffer);

    return NextResponse.json({ url: `/uploads/${category}/${filename}` });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
