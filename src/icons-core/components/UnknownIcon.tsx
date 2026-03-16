import { cn } from "@/lib/utils";
import React from "react";

export interface UnknownIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const UnknownIcon = React.forwardRef<SVGSVGElement, UnknownIconProps>(
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
        <path d="M4.54998 0C3.53749 0 2.45749 0.4 1.71499 1.2C0.972498 2 0.5 3 0.5 4V76C0.5 77 0.904998 78.0667 1.71499 78.8C2.52499 79.6 3.53749 80 4.54998 80H63.9497C64.9622 80 66.0422 79.6 66.7847 78.8C67.5947 78 67.9997 77 67.9997 76V22.6667L45.0498 0H4.54998Z" fill="currentColor"/>
<path d="M16.0518 40.9602H22.9637V47.7869H16.0518V40.9602Z" fill="currentColor"/>
<path opacity="0.7" d="M30.4512 40.9602H37.3631V47.7869H30.4512V40.9602Z" fill="currentColor"/>
<path opacity="0.45" d="M44.8521 40.9602H51.764V47.7869H44.8521V40.9602Z" fill="currentColor"/>
<path d="M67.9997 22.6667H49.0998C48.0873 22.6667 47.0073 22.2667 46.2648 21.4667C45.4548 20.7333 45.0498 19.6667 45.0498 18.6667V0L67.9997 22.6667Z" fill="currentColor"/>
      </svg>
    );
  }
);

UnknownIcon.displayName = "UnknownIcon";

export default UnknownIcon;
