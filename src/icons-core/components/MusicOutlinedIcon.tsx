import { cn } from "@/lib/utils";
import React from "react";

export interface MusicOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const MusicOutlinedIcon = React.forwardRef<SVGSVGElement, MusicOutlinedIconProps>(
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
        <path fill="currentColor" d="M45.8 18.118l-14.776 4.235c-1.79.47-3.237 2.235-3.237 3.921v14.588s-1.066-.667-3.465-.353c-3.504.47-6.322 2.98-6.322 5.607 0 2.627 2.856 4.275 6.322 3.804 3.503-.47 6.055-2.902 6.055-5.53V31.922c0-1.176 1.485-1.686 1.485-1.686l13.062-3.843s1.448-.47 1.448.784v10.039s-1.333-.706-3.733-.432c-3.503.393-6.36 2.863-6.36 5.49 0 2.628 2.857 4.314 6.36 3.922 3.504-.392 6.36-2.863 6.36-5.49V20.314c.038-1.686-1.409-2.667-3.199-2.196z"/>
      </svg>
    );
  }
);

MusicOutlinedIcon.displayName = "MusicOutlinedIcon";

export default MusicOutlinedIcon;
