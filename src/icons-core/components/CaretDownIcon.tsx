import { cn } from "@/lib/utils";
import React from "react";

export interface CaretDownIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const CaretDownIcon = React.forwardRef<SVGSVGElement, CaretDownIconProps>(
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
        <path d="M29.5458 10.5469H6.45518C5.7626 10.5469 5.37588 11.2781 5.80479 11.7773L17.3501 25.1648C17.6806 25.548 18.3169 25.548 18.6509 25.1648L30.1962 11.7773C30.6251 11.2781 30.2384 10.5469 29.5458 10.5469Z" fill="currentColor"/>
      </svg>
    );
  }
);

CaretDownIcon.displayName = "CaretDownIcon";

export default CaretDownIcon;
