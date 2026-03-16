import { cn } from "@/lib/utils";
import React from "react";

export interface SketchOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const SketchOutlinedIcon = React.forwardRef<SVGSVGElement, SketchOutlinedIconProps>(
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
        <path fill="currentColor" d="M50.5 29.759L33.75 49 17 29.76"/>
  <path fill="currentColor" d="M43.214 20.035l7.286 9.71h-6.784L33.75 49l-9.966-19.255H17l7.286-9.71"/>
  <path fill="currentColor" d="M33.75 19l9.425 1 .501 9.759H23.824l.5-9.758"/>
  <path fill="currentColor" d="M33.75 19l9.926 10.759H23.824"/>
      </svg>
    );
  }
);

SketchOutlinedIcon.displayName = "SketchOutlinedIcon";

export default SketchOutlinedIcon;
