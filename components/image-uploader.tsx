import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

interface ImageUploaderProps {
  onUpload: (urls: string[]) => void;
  category: "SALON" | "SPA" | "LOUNGE";
}

export function ImageUploader({ onUpload, category }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Compression error:", error);
      return file;
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const uploadPromises = Array.from(files).map(async (file) => {
      const compressedFile = await compressImage(file);
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("category", category.toLowerCase());
      console.log({ formData });

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.url;
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Upload failed", {
          description: "There was an error uploading your image.",
        });
        return null;
      }
    });

    const urls = (await Promise.all(uploadPromises)).filter(
      Boolean
    ) as string[];
    setIsUploading(false);
    onUpload(urls);
  };

  return (
    <div className="flex items-center space-x-4">
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={isUploading}
        className="hidden"
        id="image-upload"
      />
      <Button asChild variant="outline" disabled={isUploading}>
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "Upload Images"}
        </label>
      </Button>
    </div>
  );
}
