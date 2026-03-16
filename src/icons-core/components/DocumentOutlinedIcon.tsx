import { cn } from "@/lib/utils";
import React from "react";

export interface DocumentOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const DocumentOutlinedIcon = React.forwardRef<SVGSVGElement, DocumentOutlinedIconProps>(
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
        <path fill="currentColor" fill-rule="evenodd" d="M18.269 22h32.477v4.74H18.27V22zm0 9.482h32.477v4.74H18.27v-4.74zm19.486 9.481H18.27v4.74h19.486v-4.74z" clip-rule="evenodd"/>
      </svg>
    );
  }
);

DocumentOutlinedIcon.displayName = "DocumentOutlinedIcon";

export default DocumentOutlinedIcon;
