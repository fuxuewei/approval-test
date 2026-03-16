import { cn } from "@/lib/utils";
import React from "react";

export interface ImageOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ImageOutlinedIcon = React.forwardRef<SVGSVGElement, ImageOutlinedIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path fill="currentColor" fill-rule="evenodd" d="M30.002 43.999L40.73 33.27a1.713 1.713 0 012.48.059L50 40.8V48H18.003l6.788-6.788a1.714 1.714 0 012.422 0l2.789 2.787zm-6.668-13.332a5.334 5.334 0 110-10.667 5.334 5.334 0 010 10.668z" clip-rule="evenodd"/>
      </svg>
    );
  }
);

ImageOutlinedIcon.displayName = "ImageOutlinedIcon";

export default ImageOutlinedIcon;
