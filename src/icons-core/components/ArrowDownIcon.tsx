import { cn } from "@/lib/utils";
import React from "react";

export interface ArrowDownIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ArrowDownIcon = React.forwardRef<SVGSVGElement, ArrowDownIconProps>(
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
        <path d="M18.0056 21.7502L5.74997 9.50012L3.3761 11.8763L18.0067 26.5001L32.6238 11.8762L30.2489 9.50117L18.0056 21.7502Z" />
      </svg>
    );
  }
);

ArrowDownIcon.displayName = "ArrowDownIcon";

export default ArrowDownIcon;
