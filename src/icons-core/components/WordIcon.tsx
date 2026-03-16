import { cn } from "@/lib/utils";
import React from "react";

export interface WordIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const WordIcon = React.forwardRef<SVGSVGElement, WordIconProps>(
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
<path d="M17.2803 37.5469H21.8654L26.4506 54.5988H26.5072L31.5452 37.5469H35.9606L41.0552 54.5988L45.6969 37.5469H50.1123L43.3194 59.5187H38.7343L33.6963 42.6345H33.6397L28.545 59.4628H23.9599L17.2803 37.5469Z" fill="currentColor"/>
<path d="M67.4998 22.6667H48.5998C47.5873 22.6667 46.5073 22.2667 45.7648 21.4667C44.9548 20.7333 44.5498 19.6667 44.5498 18.6667V0L67.4998 22.6667Z" fill="currentColor"/>
      </svg>
    );
  }
);

WordIcon.displayName = "WordIcon";

export default WordIcon;
