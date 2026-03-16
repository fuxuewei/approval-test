import { cn } from "@/lib/utils";
import React from "react";

export interface XdIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const XdIcon = React.forwardRef<SVGSVGElement, XdIconProps>(
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
        <path fill="currentColor" d="M4.05 0C3.038 0 1.958.4 1.215 1.2.472 2 0 3 0 4v72c0 1 .405 2.067 1.215 2.8.81.8 1.823 1.2 2.835 1.2h59.4c1.013 0 2.093-.4 2.835-1.2.81-.8 1.215-1.8 1.215-2.8V22.667L44.55 0H4.05z"/>
  <path fill="currentColor" fill-opacity=".5" d="M67.5 22.667H48.6c-1.013 0-2.093-.4-2.835-1.2-.81-.734-1.215-1.8-1.215-2.8V0L67.5 22.667z"/>
  <path fill="currentColor" d="M19.662 39.622l5.502 8.205 5.47-8.205h4.63L27.402 50.81l7.615 10.878h-4.63l-5.223-7.894-5.252 7.894h-4.662l7.615-10.878L15 39.62h4.662zM42.88 62c-4.782 0-7.74-3.986-7.74-8.454 0-5.066 3.412-8.423 7.273-8.423 3.272 0 4.963 2.207 5.502 3.14V39h4.165v17.903c0 .435.61 1.223.963 1.243v3.543c-.725.145-1.316.218-1.772.218-3.007 0-2.735-3.046-2.735-3.046A6.51 6.51 0 0142.88 62zm1.088-3.543c2.613 0 3.802-2.342 3.947-2.735v-3.886c-.166-.455-1.658-3.17-4.196-3.17-2.836 0-4.258 2.814-4.258 4.973 0 2.374 1.745 4.818 4.507 4.818z"/>
  <path fill="currentColor" d="M33.848 39.622v2.016l1.417-2.016h-1.417zM33.848 61.689h1.168l-1.168-1.67v1.67z"/>
      </svg>
    );
  }
);

XdIcon.displayName = "XdIcon";

export default XdIcon;
