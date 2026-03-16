import { cn } from "@/lib/utils";
import React from "react";

export interface PauseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PauseIcon = React.forwardRef<SVGSVGElement, PauseIconProps>(
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
        <path d="M10 5H13.0769V30.8462H10V5ZM25.6923 5H23.2308C23.0615 5 22.9231 5.13846 22.9231 5.30769V30.5385C22.9231 30.7077 23.0615 30.8462 23.2308 30.8462H25.6923C25.8615 30.8462 26 30.7077 26 30.5385V5.30769C26 5.13846 25.8615 5 25.6923 5Z" />
      </svg>
    );
  }
);

PauseIcon.displayName = "PauseIcon";

export default PauseIcon;
