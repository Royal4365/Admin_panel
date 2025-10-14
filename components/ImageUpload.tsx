"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  aspectRatio?: "square" | "video" | "banner";
  folder?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  label = "Upload Image",
  aspectRatio = "square",
  folder = "restaurant-admin",
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Get upload signature from API with folder parameter
      const signatureResponse = await fetch(
        `/api/cloudinary/signature?folder=${encodeURIComponent(folder)}`
      );
      if (!signatureResponse.ok) {
        throw new Error("Failed to get upload signature");
      }
      const signatureData = await signatureResponse.json();

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", signatureData.timestamp.toString());
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);

      // Upload to Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error("Cloudinary upload error:", errorData);
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await uploadResponse.json();
      onChange(data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload image. Please try again."
      );
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "banner":
        return "aspect-[21/9]";
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group">
          <div
            className={`relative ${getAspectClass()} w-full rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600`}
          >
            <img
              src={value}
              alt="Upload preview"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <label className="cursor-pointer">
                  <div className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading || disabled}
                    className="hidden"
                  />
                </label>
                {onRemove && (
                  <button
                    onClick={onRemove}
                    disabled={uploading}
                    className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-white flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm">Uploading...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <label className="cursor-pointer block">
          <div
            className={`${getAspectClass()} w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex flex-col items-center justify-center gap-2 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Max 10MB • JPG, PNG, GIF
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading || disabled}
            className="hidden"
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
