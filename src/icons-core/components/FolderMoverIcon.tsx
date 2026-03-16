import { cn } from "@/lib/utils";
import React from "react";

export interface FolderMoverIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FolderMoverIcon = React.forwardRef<SVGSVGElement, FolderMoverIconProps>(
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
        <path d="M32.72 9.456H18.36L13.668 4.968C13.6083 4.91212 13.5298 4.88071 13.448 4.88H3.27998C2.57198 4.88 1.99998 5.452 1.99998 6.16V29.84C1.99998 30.548 2.57198 31.12 3.27998 31.12H32.72C33.428 31.12 34 30.548 34 29.84V10.736C34 10.028 33.428 9.456 32.72 9.456ZM31.12 28.24H4.87998V7.76H12.42L17.204 12.336H31.12V28.24Z" fill="currentColor" />
<path d="M26.248 20.4786L20.197 14.0227L18.173 15.9595L21.0637 19.0435H11.0305V21.8602H20.9385L18.2036 24.6237L20.1747 26.6154L26.248 20.4786Z" fill="currentColor"/>
      </svg>
    );
  }
);

FolderMoverIcon.displayName = "FolderMoverIcon";

export default FolderMoverIcon;
