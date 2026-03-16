import { cn } from "@/lib/utils";
import React from "react";

export interface DoubleCheckIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const DoubleCheckIcon = React.forwardRef<SVGSVGElement, DoubleCheckIconProps>(
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
        <path d="M25.8808 8.38076C26.3884 7.87308 27.211 7.87308 27.7187 8.38076C28.2263 8.88844 28.2263 9.71097 27.7187 10.2187L11.2187 26.7187C10.711 27.2263 9.88844 27.2263 9.38076 26.7187L1.88076 19.2187C1.37308 18.711 1.37308 17.8884 1.88076 17.3808C2.38844 16.8731 3.21097 16.8731 3.71865 17.3808L10.2997 23.9618L25.8808 8.38076Z" />
<path d="M31.8808 14.3808C32.3884 13.8731 33.211 13.8731 33.7187 14.3808C34.2263 14.8884 34.2263 15.711 33.7187 16.2187L22.4687 27.4687C21.961 27.9763 21.1384 27.9763 20.6308 27.4687L18.3808 25.2187C17.8731 24.711 17.8731 23.8884 18.3808 23.3808C18.8884 22.8731 19.711 22.8731 20.2187 23.3808L21.5497 24.7118L31.8808 14.3808Z" />
      </svg>
    );
  }
);

DoubleCheckIcon.displayName = "DoubleCheckIcon";

export default DoubleCheckIcon;
