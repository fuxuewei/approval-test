import { cn } from "@/lib/utils";
import React from "react";

export interface XdOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const XdOutlinedIcon = React.forwardRef<SVGSVGElement, XdOutlinedIconProps>(
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
        <path fill="currentColor" d="M21.054 24.54l4.784 7.136 4.757-7.136h4.027l-6.838 9.73 6.621 9.46h-4.027l-4.54-6.865-4.568 6.865h-4.054l6.622-9.46L17 24.54h4.054zM41.243 44c-4.158 0-6.73-3.466-6.73-7.351 0-4.406 2.967-7.325 6.325-7.325 2.844 0 4.315 1.92 4.783 2.73V24h3.622v15.568c0 .378.531 1.063.838 1.08v3.082c-.631.126-1.145.189-1.54.189-2.616 0-2.38-2.649-2.38-2.649A5.66 5.66 0 0141.244 44zm.946-3.081c2.273 0 3.306-2.036 3.432-2.378v-3.379c-.144-.396-1.441-2.757-3.648-2.757-2.466 0-3.703 2.447-3.703 4.325 0 2.064 1.518 4.189 3.92 4.189z"/>
  <path fill="currentColor" d="M33.39 24.54v1.754l1.232-1.754h-1.233zM33.39 43.73h1.015l-1.016-1.452v1.452z"/>
      </svg>
    );
  }
);

XdOutlinedIcon.displayName = "XdOutlinedIcon";

export default XdOutlinedIcon;
