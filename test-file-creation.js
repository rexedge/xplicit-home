import { writeFile, mkdir } from "fs/promises";
import { dirname, join } from "path";

async function testFileCreation() {
  try {
    const uploadDir = join(process.cwd(), "public", "uploads", "test");
    const filePath = join(uploadDir, "test-file.txt");

    // Ensure the upload directory exists
    await mkdir(dirname(filePath), { recursive: true });

    // Write a test file
    await writeFile(filePath, "This is a test file");

    console.log(`File created successfully at: ${filePath}`);
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

testFileCreation();
