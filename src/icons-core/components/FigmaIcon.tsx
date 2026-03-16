import { cn } from "@/lib/utils";
import React from "react";

export interface FigmaIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FigmaIcon = React.forwardRef<SVGSVGElement, FigmaIconProps>(
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
        <path d="M4.04998 0C3.03749 0 1.95749 0.4 1.21499 1.2C0.472498 2 0 3 0 4V76C0 77 0.404998 78.0667 1.21499 78.8C2.02499 79.6 3.03749 80 4.04998 80H63.4497C64.4622 80 65.5422 79.6 66.2847 78.8C67.0947 78 67.4997 77 67.4997 76V22.6667L44.5498 0H4.04998Z" fill="currentColor"/>
<path d="M4.04998 0C3.03749 0 1.95749 0.4 1.21499 1.2C0.472498 2 0 3 0 4V76C0 77 0.404998 78.0667 1.21499 78.8C2.02499 79.6 3.03749 80 4.04998 80H63.4497C64.4622 80 65.5422 79.6 66.2847 78.8C67.0947 78 67.4997 77 67.4997 76V22.6667L44.5498 0H4.04998Z" fill="currentColor" fill-opacity="0.8" style="mix-blend-mode:screen"/>
<path d="M67.4996 22.6667H48.5997C47.5872 22.6667 46.5072 22.2667 45.7647 21.4667C44.9547 20.7333 44.5497 19.6667 44.5497 18.6667V0L67.4996 22.6667Z" fill="currentColor" fill-opacity="0.5"/>
<path d="M27.75 63.7263C30.924 63.7263 33.5 61.1538 33.5 57.9841V52.2419H27.75C24.576 52.2419 22 54.8144 22 57.9841C22 61.1538 24.576 63.7263 27.75 63.7263Z" fill="currentColor"/>
<path d="M22 46.5003C22 43.3306 24.576 40.7581 27.75 40.7581H33.5V52.2424H27.75C24.576 52.2424 22 49.6699 22 46.5003Z" fill="currentColor"/>
<path d="M22.0002 35.0159C22.0002 31.8462 24.5762 29.2737 27.7502 29.2737H33.5002V40.7581H27.7502C24.5762 40.7581 22.0002 38.1856 22.0002 35.0159Z" fill="currentColor"/>
<path d="M33.5002 29.2737H39.2502C42.4242 29.2737 45.0002 31.8462 45.0002 35.0159C45.0002 38.1856 42.4242 40.7581 39.2502 40.7581H33.5002V29.2737Z" fill="currentColor"/>
<path d="M45.0002 46.5003C45.0002 49.6699 42.4242 52.2424 39.2502 52.2424C36.0762 52.2424 33.5002 49.6699 33.5002 46.5003C33.5002 43.3306 36.0762 40.7581 39.2502 40.7581C42.4242 40.7581 45.0002 43.3306 45.0002 46.5003Z" fill="currentColor"/>
<defs>
<linearGradient id="paint0_linear_1662_2153" x1="33.7498" y1="0" x2="33.7498" y2="80" gradientUnits="userSpaceOnUse">
<stop stop-color="#2B2B2B"/>
<stop offset="1" stop-color="#171616"/>
</linearGradient>
<radialGradient id="paint1_radial_1662_2153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(33.7498) rotate(90) scale(36.2199 39.7936)">
<stop stop-color="#292929"/>
<stop offset="1" stop-color="#2B2B2B" stop-opacity="0"/>
</radialGradient>
</defs>
      </svg>
    );
  }
);

FigmaIcon.displayName = "FigmaIcon";

export default FigmaIcon;
