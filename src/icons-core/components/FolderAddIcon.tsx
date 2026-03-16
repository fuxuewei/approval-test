import { cn } from "@/lib/utils";
import React from "react";

export interface FolderAddIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FolderAddIcon = React.forwardRef<SVGSVGElement, FolderAddIconProps>(
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
        <path d="M16.8756 15.2268V18.638H13.4805C13.3158 18.638 13.1792 18.7625 13.1792 18.9192V20.6067C13.1792 20.7594 13.3158 20.888 13.4805 20.888H16.8756V24.2991C16.8756 24.4558 17.0042 24.5844 17.1568 24.5844H18.8443C19.001 24.5844 19.1256 24.4558 19.1256 24.2991V20.888H22.5207C22.6854 20.888 22.822 20.7594 22.822 20.6067V18.9192C22.822 18.7625 22.6854 18.638 22.5207 18.638H19.1256V15.2268C19.1256 15.0701 19.001 14.9415 18.8443 14.9415H17.1568C17.0042 14.9415 16.8756 15.0701 16.8756 15.2268ZM32.7863 9.41296H18.3622L13.6493 4.90492C13.5893 4.84878 13.5104 4.81723 13.4283 4.81653H3.21488C2.50372 4.81653 1.92917 5.39108 1.92917 6.10224V29.888C1.92917 30.5991 2.50372 31.1737 3.21488 31.1737H32.7863C33.4975 31.1737 34.072 30.5991 34.072 29.888V10.6987C34.072 9.98751 33.4975 9.41296 32.7863 9.41296ZM31.1792 28.2808H4.82203V7.70939H12.3957L17.201 12.3058H31.1792V28.2808Z" fill="currentColor"/>
      </svg>
    );
  }
);

FolderAddIcon.displayName = "FolderAddIcon";

export default FolderAddIcon;
