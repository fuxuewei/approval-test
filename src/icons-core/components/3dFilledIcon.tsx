import { cn } from "@/lib/utils";
import React from "react";

export interface 3dFilledIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const 3dFilledIcon = React.forwardRef<SVGSVGElement, 3dFilledIconProps>(
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
        <path fill="currentColor" d="M4.05 0C3.037 0 1.957.4 1.215 1.2.472 2 0 3 0 4v72c0 1 .405 2.067 1.215 2.8.81.8 1.822 1.2 2.835 1.2h59.4c1.012 0 2.092-.4 2.835-1.2.81-.8 1.215-1.8 1.215-2.8V22.667L44.55 0H4.05z"/>
  <path fill="currentColor" fill-opacity=".5" d="M67.5 22.667H48.6c-1.013 0-2.093-.4-2.835-1.2-.81-.734-1.215-1.8-1.215-2.8V0L67.5 22.667z"/>
  <path fill="currentColor" d="M33.596 46.344L20 38.516v15.656L33.596 62V46.344z"/>
  <path fill="currentColor" d="M33.596 46.344l13.596-7.828v15.656L33.596 62V46.344z"/>
  <path fill="currentColor" d="M33.592 46.365L20 38.516 33.592 31.1l13.6 7.416-13.6 7.85z"/>
      </svg>
    );
  }
);

3dFilledIcon.displayName = "3dFilledIcon";

export default 3dFilledIcon;
