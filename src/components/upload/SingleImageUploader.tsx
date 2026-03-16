"use client";

import { forwardRef, useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { uploadFileWithFreshToken } from "@/lib/upload/clientUpload";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ACCEPTED_IMAGE_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
]);

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

export interface SingleImageUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
    showDelete?: boolean;
    onUpdated?: (storageKey?: string, dataURL?: string) => void;
}

export const SingleImageUploader = forwardRef<HTMLDivElement, SingleImageUploaderProps>(
    ({ className, showDelete, onUpdated, children, ...props }, ref) => {
        const t = useTranslations("Uploader");
        const inputRef = useRef<HTMLInputElement>(null);
        const [isUploading, setIsUploading] = useState(false);

        const handleDelete = useCallback(() => {
            onUpdated?.(undefined);
        }, [onUpdated]);

        const handleUpload = useCallback(
            async (file: File) => {
                if (isUploading) return;

                if (!ACCEPTED_IMAGE_TYPES.has(file.type)) {
                    toast.error(t("error.format"));
                    throw new Error(t("error.format"));
                }

                if (file.size > MAX_FILE_SIZE) {
                    toast.error(t("error.size", { size: MAX_FILE_SIZE_MB }));
                    throw new Error(t("error.size", { size: MAX_FILE_SIZE_MB }));
                }

                const reader = new FileReader();
                reader.onload = async (event) => {
                    const dataURL = event.target?.result as string | undefined;
                    if (!dataURL) return;

                    setIsUploading(true);
                    try {
                        const { objectKey } = await uploadFileWithFreshToken(file);
                        onUpdated?.(objectKey, dataURL);
                    } catch (error) {
                        console.error(error);
                        toast.error(t("error.common"));
                        if (inputRef.current?.value) {
                            inputRef.current.value = "";
                        }
                    } finally {
                        setIsUploading(false);
                    }
                };
                reader.readAsDataURL(file);
            },
            [isUploading, onUpdated, t],
        );

        return (
            <div
                aria-busy={isUploading}
                ref={ref}
                className={cn(
                    "group relative cursor-pointer",
                    className,
                )}
                onClick={() => {
                    inputRef.current?.click();
                }}
                {...props}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    multiple={false}
                    onChange={(event) => {
                        const files = event.target.files;
                        if (!files?.length) return;
                        if (files.length > 1) {
                            toast.error(t("error.count"));
                            return;
                        }
                        void handleUpload(files[0]);
                    }}
                />
                {children}
                {showDelete ? (
                    <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                            "absolute inset-0 flex h-full w-full flex-col items-center justify-center space-y-1 border-none shadow-none outline-none hover:border-none",
                            "bg-transparent opacity-0 transition-all group-hover:bg-transparent group-hover:opacity-100",
                            "text-white hover:text-white group-hover:text-white",
                        )}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleDelete();
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.82832 2.31373H4.71404C4.7769 2.31373 4.82832 2.2623 4.82832 2.19944V2.31373H9.17118V2.19944C9.17118 2.2623 9.22261 2.31373 9.28547 2.31373H9.17118V3.3423H10.1998V2.19944C10.1998 1.69516 9.78975 1.28516 9.28547 1.28516H4.71404C4.20975 1.28516 3.79975 1.69516 3.79975 2.19944V3.3423H4.82832V2.31373ZM12.0283 3.3423H1.97118C1.71832 3.3423 1.51404 3.54659 1.51404 3.79944V4.25659C1.51404 4.31944 1.56547 4.37087 1.62832 4.37087H2.49118L2.84404 11.8423C2.8669 12.3294 3.26975 12.7137 3.7569 12.7137H10.2426C10.7312 12.7137 11.1326 12.3309 11.1555 11.8423L11.5083 4.37087H12.3712C12.434 4.37087 12.4855 4.31944 12.4855 4.25659V3.79944C12.4855 3.54659 12.2812 3.3423 12.0283 3.3423ZM10.1326 11.6852H3.8669L3.52118 4.37087H10.4783L10.1326 11.6852Z"
                                fill="white"
                            />
                        </svg>
                    </Button>
                ) : null
                }

                {isUploading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 bg-transparent text-white">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                            className="h-5 w-5 animate-spin text-primary"
                        >
                            <g clipPath="url(#loading-thin)">
                                <path
                                    d="M15 8.56C14.69 8.56 14.44 8.31 14.44 8C14.44 7.07 14.26 6.17 13.9 5.32C13.55 4.51 13.05 3.76 12.42 3.14C11.8 2.51 11.05 2.01 10.24 1.66C9.39 1.31 8.49 1.12 7.56 1.12C7.25 1.12 7 0.87 7 0.56C7 0.25 7.25 0 7.56 0C8.64 0 9.69 0.21 10.67 0.63C11.62 1.03 12.48 1.61 13.21 2.34C13.94 3.07 14.52 3.93 14.92 4.88C15.35 5.87 15.56 6.92 15.56 8C15.56 8.31 15.31 8.56 15 8.56Z"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="loading-thin">
                                    <rect width={8.56} height={8.56} fill="white" transform="translate(7)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                ) : null}
            </div>
        );
    },
);

SingleImageUploader.displayName = "SingleImageUploader";

