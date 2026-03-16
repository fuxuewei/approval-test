import { cn } from "@/lib/utils";
import React from "react";

export interface GridIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const GridIcon = React.forwardRef<SVGSVGElement, GridIconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.03846 5.53846V14.9231H14.8077V5.53846H6.03846ZM5.80769 3C4.53319 3 3.5 4.03319 3.5 5.30769V15.1538C3.5 16.4284 4.53319 17.4615 5.80769 17.4615H15.0385C16.313 17.4615 17.3462 16.4284 17.3462 15.1538V5.30769C17.3462 4.03319 16.313 3 15.0385 3H5.80769Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.03846 22.0385V31.4231H14.8077V22.0385H6.03846ZM5.80769 19.5C4.53319 19.5 3.5 20.5332 3.5 21.8077V31.6538C3.5 32.9284 4.53319 33.9615 5.80769 33.9615H15.0385C16.313 33.9615 17.3462 32.9284 17.3462 31.6538V21.8077C17.3462 20.5332 16.313 19.5 15.0385 19.5H5.80769Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0385 5.53846V14.9231H30.8077V5.53846H22.0385ZM21.8077 3C20.5332 3 19.5 4.03319 19.5 5.30769V15.1538C19.5 16.4284 20.5332 17.4615 21.8077 17.4615H31.0385C32.313 17.4615 33.3462 16.4284 33.3462 15.1538V5.30769C33.3462 4.03319 32.313 3 31.0385 3H21.8077Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0385 22.0385V31.4231H30.8077V22.0385H22.0385ZM21.8077 19.5C20.5332 19.5 19.5 20.5332 19.5 21.8077V31.6538C19.5 32.9284 20.5332 33.9615 21.8077 33.9615H31.0385C32.313 33.9615 33.3462 32.9284 33.3462 31.6538V21.8077C33.3462 20.5332 32.313 19.5 31.0385 19.5H21.8077Z" />
      </svg>
    );
  }
);

GridIcon.displayName = "GridIcon";

export default GridIcon;
