import { cn } from "@/lib/utils";
import React from "react";

export interface 3dOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const 3dOutlinedIcon = React.forwardRef<SVGSVGElement, 3dOutlinedIconProps>(
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
        <path fill="currentColor" d="M33.596 34.344L20 26.516v15.656L33.596 50V34.344z"/>
  <path fill="currentColor" d="M33.596 34.344l13.596-7.828v15.656L33.596 50V34.344z"/>
  <path fill="currentColor" d="M33.592 34.365L20 26.516 33.592 19.1l13.6 7.416-13.6 7.85z"/>
      </svg>
    );
  }
);

3dOutlinedIcon.displayName = "3dOutlinedIcon";

export default 3dOutlinedIcon;
