"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/cn";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useTranslations } from "next-intl";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  submitted: boolean;
}

export default function ImageUploader({
  images,
  onChange,
  multiple = true,
  submitted,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const { edgestore } = useEdgeStore();
  const t = useTranslations("adminNews");

  const confirmUpload = async (url: string) => {
    await edgestore.PublicImages.confirmUpload({
      url,
    });
  };

  useEffect(() => {
    if (submitted) {
      for (const image of images) {
        confirmUpload(image);
      }
    }
  }, [submitted]); // eslint-disable-line

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploaded: string[] = [];

      for (const file of files) {
        const res = await edgestore.PublicImages.upload({
          file,
          options: { temporary: true },
        });
        uploaded.push(res.url);
      }

      onChange([...images, ...uploaded]);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (url: string) => {
    onChange(images.filter((img) => img !== url));
  };

  return (
    <div className="">
      {multiple || images.length === 0 ? (
        <label
          className={cn(
            "inline-flex items-center px-4 py-2 bg-primary/20 dark:hover:bg-primary/10 hover:bg-primary/60 text-black dark:text-white  rounded-md cursor-pointer border border-primary",
            multiple && "mb-4"
          )}
        >
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      ) : null}

      <div className="grid grid-cols-3 gap-3">
        {images.length > 0 &&
          images[0] !== undefined &&
          images.map((img) => (
            <Dialog key={img}>
              <DialogTrigger asChild>
                <div
                  key={img}
                  className="relative rounded-sm overflow-hidden shadow border border-primary cursor-pointer"
                >
                  <img //eslint-disable-line
                    src={img}
                    alt="temporary uploaded image"
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute top-1 right-1 text-white bg-[#aa0000] rounded-full p-1.5 hover:bg-[#ff0000] cursor-pointer transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </DialogTrigger>
              <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]" />
              <DialogContent
                className="z-[10001] lg:p-4 p-2 w-auto !min-w-0 !min-h-0 !max-w-[80vw] !max-h-[80vw]"
                aria-description="image"
              >
                <DialogTitle className="lg:text-2xl sm:text-xl text-lg font-semibold">
                  {t("Image")}
                </DialogTitle>
                <div className="w-auto max-w-[80vw] max-h-[80vw] overflow-hidden relative rounded-md ">
                  <img //eslint-disable-line
                    src={img}
                    alt="image"
                    className="w-auto h-auto object-cover"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
      </div>
    </div>
  );
}
