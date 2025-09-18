"use client";

import { cn } from "@/lib/utils";
import { Trash2Icon, XIcon } from "lucide-react";
import * as React from "react";
import { type DropzoneOptions } from "react-dropzone";
import { Dropzone } from "./dropzone";
import { ProgressCircle } from "./progress-circle";
import { useUploader } from "./uploader-provider";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

/**
 * Props for the ImageUploader component.
 *
 * @interface ImageUploaderProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
export interface ImageUploaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of images allowed.
   */
  maxFiles?: number;

  /**
   * Maximum file size in bytes.
   */
  maxSize?: number;

  /**
   * Whether the uploader is disabled.
   */
  disabled?: boolean;

  /**
   * Additional className for the dropzone component.
   */
  dropzoneClassName?: string;

  /**
   * Additional className for the image list component.
   */
  imageListClassName?: string;

  /**
   * Ref for the input element inside the Dropzone.
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * Props for the ImageList component.
 *
 * @interface ImageListProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
export interface ImageListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the image deletion controls should be disabled.
   */
  disabled?: boolean;
}

/**
 * Displays a grid of image previews with upload status and controls.
 *
 * @component
 * @example
 * ```tsx
 * <ImageList className="my-4" />
 * ```
 */
export interface ImageListProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  maxFiles?: number;
  maxSize?: number;
  dropzoneClassName?: string;
}
const ImageList = React.forwardRef<HTMLDivElement, ImageListProps>(
  (
    {
      className,
      disabled: initialDisabled,
      inputRef,
      maxFiles,
      maxSize,
      dropzoneClassName,
      ...props
    },
    ref
  ) => {
    const { fileStates, removeFile, cancelUpload } = useUploader();
    const t = useTranslations("adminNews");

    // Create temporary URLs for image previews
    const tempUrls = React.useMemo(() => {
      const urls: Record<string, string> = {};
      fileStates.forEach((fileState) => {
        if (fileState.file) {
          urls[fileState.key] = URL.createObjectURL(fileState.file);
        }
      });
      return urls;
    }, [fileStates]);

    // Clean up temporary URLs on unmount
    React.useEffect(() => {
      return () => {
        Object.values(tempUrls).forEach((url) => {
          URL.revokeObjectURL(url);
        });
      };
    }, [tempUrls]);

    // if (!fileStates.length) return null;

    return (
      <div
        ref={ref}
        className={cn("mt-4 grid grid-cols-3 gap-2", className, "relative")}
        {...props}
      >
        {fileStates.length > 0
          ? fileStates.map((fileState) => {
              const displayUrl = tempUrls[fileState.key] ?? fileState.url;
              return (
                <div
                  key={fileState.key}
                  className={
                    "relative min-h-[80px] w-full rounded-md border-0 bg-muted p-0 shadow-md"
                  }
                >
                  {displayUrl ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <img // eslint-disable-line
                          className="h-[80px] w-full rounded-md object-cover"
                          src={displayUrl}
                          alt={fileState.file.name}
                        />
                      </DialogTrigger>
                      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]" />
                      <DialogContent
                        className="z-[10001]"
                        aria-description="image"
                      >
                        <DialogTitle>{t("Image")}</DialogTitle>
                        <div className="relative w-auto max-w-[80vw] max-h-[80vh]">
                          <img // eslint-disable-line
                            src={displayUrl}
                            alt="image"
                            className="w-auto h-auto rounded-md"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                      <span className="text-xs text-muted-foreground">
                        No Preview
                      </span>
                    </div>
                  )}

                  {/* Upload progress indicator */}
                  {fileState.status === "UPLOADING" && (
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-md bg-black/70">
                      <ProgressCircle progress={fileState.progress} />
                    </div>
                  )}

                  {/* Delete/cancel button */}
                  {displayUrl && !initialDisabled && (
                    <button
                      type="button"
                      className="group pointer-events-auto absolute right-1 top-1 z-10 -translate-y-1/4 translate-x-1/4 transform rounded-full border border-muted-foreground bg-background p-1 shadow-md transition-all hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (fileState.status === "UPLOADING") {
                          cancelUpload(fileState.key);
                        } else {
                          removeFile(fileState.key);
                        }
                      }}
                    >
                      {fileState.status === "UPLOADING" ? (
                        <XIcon className="block h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Trash2Icon className="block h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  )}
                </div>
              );
            })
          : null}
        <ImageDropzone
          ref={inputRef}
          dropzoneOptions={{
            maxFiles,
            maxSize,
          }}
          className={`${dropzoneClassName} bg-blur-500`}
        />
      </div>
    );
  }
);
ImageList.displayName = "ImageList";

/**
 * Props for the ImageDropzone component.
 *
 * @interface ImageDropzoneProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
export interface ImageDropzoneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the dropzone is disabled.
   */
  disabled?: boolean;

  /**
   * Options passed to the underlying Dropzone component.
   * Cannot include 'disabled' or 'onDrop' as they are handled internally.
   */
  dropzoneOptions?: Omit<DropzoneOptions, "disabled" | "onDrop">;

  /**
   * Ref for the input element inside the Dropzone.
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * A dropzone component specifically for image uploads.
 *
 * @component
 * @example
 * ```tsx
 * <ImageDropzone
 *   dropzoneOptions={{
 *     maxFiles: 5,
 *     maxSize: 1024 * 1024 * 2, // 2MB
 *   }}
 * />
 * ```
 */
const ImageDropzone = React.forwardRef<HTMLDivElement, ImageDropzoneProps>(
  ({ className, disabled, inputRef, ...props }, ref) => {
    const t = useTranslations("adminNews");
    return (
      <div ref={ref} className={className} {...props}>
        <Dropzone
          ref={inputRef}
          dropzoneOptions={{
            accept: { "image/*": [] },
          }}
          disabled={disabled}
          className="h-[80px]"
          dropMessageDefault={t("click to select")}
        />
      </div>
    );
  }
);
ImageDropzone.displayName = "ImageDropzone";

/**
 * A complete image uploader component with dropzone and image grid preview.
 *
 * @component
 * @example
 * ```tsx
 * <ImageUploader
 *   maxFiles={10}
 *   maxSize={1024 * 1024 * 5} // 5MB
 * />
 * ```
 */
const ImageUploader = React.forwardRef<HTMLDivElement, ImageUploaderProps>(
  (
    {
      maxFiles,
      maxSize,
      disabled,
      className,
      dropzoneClassName,
      imageListClassName,
      inputRef,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ImageList
          className={`${imageListClassName} mt-0`}
          disabled={disabled}
          inputRef={inputRef}
          maxFiles={maxFiles}
          maxSize={maxSize}
          dropzoneClassName={dropzoneClassName}
        />
      </div>
    );
  }
);
ImageUploader.displayName = "ImageUploader";

export { ImageList, ImageDropzone, ImageUploader };
