import { cn } from "@/lib/utils";
import React from "react";

export interface SketchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const SketchIcon = React.forwardRef<SVGSVGElement, SketchIconProps>(
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
        <path fill="currentColor" d="M4.05 0C3.038 0 1.958.4 1.215 1.2.472 2 0 3 0 4v72c0 1 .405 2.067 1.215 2.8.81.8 1.823 1.2 2.835 1.2h59.4c1.013 0 2.093-.4 2.835-1.2.81-.8 1.215-1.8 1.215-2.8V22.667L44.55 0H4.05z"/>
  <path fill="currentColor" fill-opacity=".5" d="M67.5 22.667H48.6c-1.013 0-2.093-.4-2.835-1.2-.81-.734-1.215-1.8-1.215-2.8V0L67.5 22.667z"/>
  <path fill="currentColor" d="M55 42.78L33.894 67.011 12.788 42.78"/>
  <path fill="currentColor" fill-opacity=".5" d="M45.819 30.533L55 42.763h-8.548l-12.558 24.25-12.558-24.25h-8.548l9.18-12.23"/>
  <path fill="currentColor" fill-opacity=".4" d="M33.894 29.23l11.877 1.26.63 12.29H21.386l.631-12.29"/>
  <path fill="currentColor" d="M33.894 29.23L46.4 42.78H21.386"/>
      </svg>
    );
  }
);

SketchIcon.displayName = "SketchIcon";

export default SketchIcon;
