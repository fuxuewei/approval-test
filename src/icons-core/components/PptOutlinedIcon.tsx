import { cn } from "@/lib/utils";
import React from "react";

export interface PptOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PptOutlinedIcon = React.forwardRef<SVGSVGElement, PptOutlinedIconProps>(
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
        <path fill="currentColor" d="M32.844 20.287c-8.2 0-14.844 6.565-14.844 14.66 0 8.096 6.647 14.661 14.844 14.661S47.69 43.043 47.69 34.944H32.844V20.287z" opacity=".4"/>
  <path fill="currentColor" d="M35.156 18v14.664H50C50.004 24.565 43.356 18 35.156 18z"/>
      </svg>
    );
  }
);

PptOutlinedIcon.displayName = "PptOutlinedIcon";

export default PptOutlinedIcon;
