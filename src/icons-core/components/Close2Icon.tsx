import { cn } from "@/lib/utils";
import React from "react";

export interface Close2IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const Close2Icon = React.forwardRef<SVGSVGElement, Close2IconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.22106 3.99976L18 15.7787L29.7789 3.99976L32 6.22081L20.2211 17.9998L32 29.7787L29.7789 31.9998L18 20.2208L6.22106 31.9998L4 29.7787L15.7789 17.9998L4 6.22081L6.22106 3.99976Z" />
      </svg>
    );
  }
);

Close2Icon.displayName = "Close2Icon";

export default Close2Icon;
