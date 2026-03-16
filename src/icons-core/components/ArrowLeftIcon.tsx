import { cn } from "@/lib/utils";
import React from "react";

export interface ArrowLeftIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ArrowLeftIcon = React.forwardRef<SVGSVGElement, ArrowLeftIconProps>(
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
        <path d="M14.25 18.0057L26.5 5.7501L24.1239 3.37622L9.5 18.0068L24.124 32.624L26.499 30.249L14.25 18.0057Z" />
      </svg>
    );
  }
);

ArrowLeftIcon.displayName = "ArrowLeftIcon";

export default ArrowLeftIcon;
