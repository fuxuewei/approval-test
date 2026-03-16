import { cn } from "@/lib/utils";
import React from "react";

export interface ExcelIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ExcelIcon = React.forwardRef<SVGSVGElement, ExcelIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 68 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path d="M4.55 0C3.5375 0 2.4575 0.4 1.715 1.2C0.9725 2 0.5 3 0.5 4V76C0.5 77 0.905 78.0667 1.715 78.8C2.525 79.6 3.5375 80 4.55 80H63.95C64.9625 80 66.0425 79.6 66.785 78.8C67.595 78 68 77 68 76V22.6667L45.05 0H4.55Z" fill="currentColor"/>
<path d="M31.0913 45.1662L21.9113 32.4995H28.2563L34.2638 41.5662L40.5413 32.4995H46.6838L37.3013 45.1662L47.1563 58.6328H40.7438L34.1288 49.0328L27.5138 58.6995H21.2363L31.0913 45.1662Z" fill="currentColor"/>
<path d="M67.9998 22.6667H49.0998C48.0873 22.6667 47.0073 22.2667 46.2648 21.4667C45.4548 20.7333 45.0498 19.6667 45.0498 18.6667V0L67.9998 22.6667Z" fill="currentColor"/>
      </svg>
    );
  }
);

ExcelIcon.displayName = "ExcelIcon";

export default ExcelIcon;
