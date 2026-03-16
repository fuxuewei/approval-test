import { cn } from "@/lib/utils";
import React from "react";

export interface WordOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const WordOutlinedIcon = React.forwardRef<SVGSVGElement, WordOutlinedIconProps>(
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
        <path fill="currentColor" fill-rule="evenodd" d="M17.68 21.377l23.747-3.37a.792.792 0 01.903.784V49.21a.792.792 0 01-.9.783l-23.748-3.281a.793.793 0 01-.682-.784V22.16c0-.393.29-.727.68-.783zm11.996 11.22h.163l2.815 9.843h2.917l3.948-14.872h-3.217l-2.298 10.483h-.165l-2.763-10.483h-2.629l-2.71 10.483h-.163l-2.321-10.483h-3.235l3.937 14.872h2.936l2.783-9.842h.002zm14.764-9.154h5.428a.905.905 0 01.904.904v19.3a.905.905 0 01-.904.905H44.44V23.443z" clip-rule="evenodd"/>
      </svg>
    );
  }
);

WordOutlinedIcon.displayName = "WordOutlinedIcon";

export default WordOutlinedIcon;
