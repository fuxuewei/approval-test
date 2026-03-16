import { cn } from "@/lib/utils";
import React from "react";

export interface FontOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FontOutlinedIcon = React.forwardRef<SVGSVGElement, FontOutlinedIconProps>(
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
        <path fill="currentColor" d="M27.646 43.103V21.091c-4.168 0-6.74 3.124-7.67 9.35l-1.707-.61.71-10.831h23.033l.576 10.713-1.574.751c-1.33-6.131-3.99-9.232-7.958-9.35v22.154c-.289 2.819.953 4.228 3.702 4.228V49H23.944v-1.504c2.749.188 3.99-1.268 3.702-4.393z"/>
  <path fill="currentColor" d="M41.612 45.405V31.968c-2.549 0-4.1 1.903-4.7 5.708l-1.041-.376.443-6.624h14.078l.354 6.53-.953.47c-.82-3.735-2.439-5.638-4.855-5.708v13.531c-.177 1.715.576 2.585 2.261 2.585V49h-7.848v-.916c1.685.093 2.439-.776 2.261-2.679z" opacity=".6"/>
      </svg>
    );
  }
);

FontOutlinedIcon.displayName = "FontOutlinedIcon";

export default FontOutlinedIcon;
