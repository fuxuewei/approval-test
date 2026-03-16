import { cn } from "@/lib/utils";
import React from "react";

export interface RenameIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const RenameIcon = React.forwardRef<SVGSVGElement, RenameIconProps>(
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
        <path d="M28 28.842V7.15796L30.825 5.18435H33V2.62122H30.5L29.725 2.8519L26.75 4.92803L23.7 2.82627L23 2.62122H20.5V5.18435H22.625L25.5 7.15796V28.842L22.675 30.8157H20.5V33.3788H23L23.775 33.1481L26.75 31.072L29.8 33.1737L30.5 33.3788H33V30.8157H30.875L28 28.842Z" fill="currentColor"/>
<path d="M0.5 24.4078V11.5922L1.75 10.3106H23V12.8737H3V23.1263H23V25.6894H1.75L0.5 24.4078Z" fill="currentColor"/>
<path d="M30.5 10.3106H34.25L35.5 11.5922V24.4078L34.25 25.6894H30.5V23.1263H33V12.8737H30.5V10.3106Z" fill="currentColor"/>
<path d="M5.5 16.7184V19.2816L6.75 20.5631H16.75L18 19.2816V16.7184L16.75 15.4369H6.75L5.5 16.7184Z" fill="currentColor"/>
      </svg>
    );
  }
);

RenameIcon.displayName = "RenameIcon";

export default RenameIcon;
