import { cn } from "@/lib/utils";
import React from "react";

export interface MoreIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const MoreIcon = React.forwardRef<SVGSVGElement, MoreIconProps>(
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
        <path d="M9.25 18.125C9.25 19.875 7.875 21.25 6.125 21.25C4.375 21.25 3 19.875 3 18.125C3 16.375 4.375 15 6.125 15C7.875 15 9.25 16.375 9.25 18.125ZM18 15C16.25 15 14.875 16.375 14.875 18.125C14.875 19.875 16.25 21.25 18 21.25C19.75 21.25 21.125 19.875 21.125 18.125C21.125 16.375 19.75 15 18 15ZM29.875 15C28.125 15 26.75 16.375 26.75 18.125C26.75 19.875 28.125 21.25 29.875 21.25C31.625 21.25 33 19.875 33 18.125C33 16.375 31.625 15 29.875 15Z" />
      </svg>
    );
  }
);

MoreIcon.displayName = "MoreIcon";

export default MoreIcon;
