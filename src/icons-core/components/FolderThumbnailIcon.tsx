import { cn } from "@/lib/utils";
import React from "react";

export interface FolderThumbnailIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FolderThumbnailIcon = React.forwardRef<SVGSVGElement, FolderThumbnailIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3 18.4999C21.3 16.4565 22.9566 14.7999 25 14.7999C27.0435 14.7999 28.7 16.4565 28.7 18.4999C28.7 20.5434 27.0435 22.1999 25 22.1999C22.9566 22.1999 21.3 20.5434 21.3 18.4999ZM25 17.1999C24.2821 17.1999 23.7 17.782 23.7 18.4999C23.7 19.2179 24.2821 19.7999 25 19.7999C25.718 19.7999 26.3 19.2179 26.3 18.4999C26.3 17.782 25.718 17.1999 25 17.1999Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.7863 9.41283H18.3622L13.6493 4.9048C13.5893 4.84866 13.5104 4.81711 13.4283 4.81641H3.21491C2.50375 4.81641 1.9292 5.39096 1.9292 6.10212V29.8878C1.9292 30.599 2.50375 31.1735 3.21491 31.1735H32.7863C33.4975 31.1735 34.0721 30.599 34.0721 29.8878V10.6985C34.0721 9.98739 33.4975 9.41283 32.7863 9.41283ZM22.4494 28.2807H4.82206V25.171L11.0486 20.1898L22.4494 28.2807ZM27.1146 28.2807L10.9513 16.8099L4.82206 21.7133V7.70926H12.3957L17.2011 12.3057H31.1792V28.2807H27.1146Z" fill="currentColor"/>
      </svg>
    );
  }
);

FolderThumbnailIcon.displayName = "FolderThumbnailIcon";

export default FolderThumbnailIcon;
