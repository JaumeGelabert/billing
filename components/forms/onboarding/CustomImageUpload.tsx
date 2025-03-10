"use client";

import type React from "react";

import { UploadCloudIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface CustomFileUploadProps {
  value: File | string | null;
  onChange: (file: File | string) => void;
  onBlur?: () => void;
  name?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export function CustomFileUpload({
  value,
  onChange,
  onBlur,
  name,
  accept = "image/png, image/jpeg, image/svg+xml",
  maxSize = 5 // Default 5MB
}: CustomFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create preview URL when file changes
  const handleFileChange = (file: File | null) => {
    // Clear previous preview
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    if (!file) {
      onChange("");
      setError(null);
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onChange(file);
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    onChange("");
    setError(null);
  };

  return (
    <div className="w-full">
      {error && <p className="text-sm text-red-500 mb-1">{error}</p>}

      {preview ? (
        <div className="relative w-full h-24 border rounded-lg overflow-hidden bg-zinc-50">
          <Image
            src={preview || "/placeholder.svg"}
            alt="File preview"
            fill
            className="object-contain p-2"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-zinc-200 hover:bg-zinc-300"
            onClick={clearFile}
          >
            <XIcon className="h-3 w-3" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      ) : (
        <div
          className="relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept={accept}
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            onBlur={onBlur}
            className="sr-only absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col justify-center items-center border bg-zinc-50 rounded-lg w-full h-24 cursor-pointer border-dashed hover:border-zinc-300 transition-colors">
            <UploadCloudIcon className="h-5 w-5 text-zinc-500 group-hover:text-zinc-600 transition-colors" />
            <p className="text-sm text-zinc-500">
              <span className="font-medium text-zinc-800">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              SVG, PNG or JPG (Max. {maxSize}MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
