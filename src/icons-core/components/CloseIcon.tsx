import { cn } from "@/lib/utils";
import React from "react";

export interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const CloseIcon = React.forwardRef<SVGSVGElement, CloseIconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.798 6L29.9998 8.20182L20.2018 17.9999L30 27.798L27.7981 29.9998L18 20.2017L8.20182 29.9998L6 27.798L15.7982 17.9999L6.00013 8.20182L8.20195 6L18 15.798L27.798 6Z" />
      </svg>
    );
  }
);

CloseIcon.displayName = "CloseIcon";

export default CloseIcon;
