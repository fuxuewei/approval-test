import { cn } from "@/lib/utils";
import React from "react";

export interface PptIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PptIcon = React.forwardRef<SVGSVGElement, PptIconProps>(
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
        <path d="M4.05 0C3.0375 0 1.9575 0.4 1.215 1.2C0.4725 2 0 3 0 4V76C0 77 0.405 78.0667 1.215 78.8C2.025 79.6 3.0375 80 4.05 80H63.45C64.4625 80 65.5425 79.6 66.285 78.8C67.095 78 67.5 77 67.5 76V22.6667L44.55 0H4.05Z" fill="currentColor"/>
<path opacity="0.4" d="M33.437 34.6492C25.4664 34.6492 19.0088 41.0304 19.0088 48.8993C19.0088 56.7681 25.4698 63.1494 33.437 63.1494C41.4042 63.1494 47.8687 56.7681 47.8687 48.8959H33.437V34.6492Z" fill="currentColor"/>
<path d="M35.6846 32.4263V46.6798H50.1128C50.1163 38.8075 43.6552 32.4263 35.6846 32.4263H35.6846Z" fill="currentColor"/>
<path d="M67.4998 22.6667H48.5998C47.5873 22.6667 46.5073 22.2667 45.7648 21.4667C44.9548 20.7333 44.5498 19.6667 44.5498 18.6667V0L67.4998 22.6667Z" fill="currentColor"/>
      </svg>
    );
  }
);

PptIcon.displayName = "PptIcon";

export default PptIcon;
