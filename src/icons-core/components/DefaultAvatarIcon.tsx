import { cn } from "@/lib/utils";
import React from "react";

export interface DefaultAvatarIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const DefaultAvatarIcon = React.forwardRef<SVGSVGElement, DefaultAvatarIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <g clip-path="url(#clip0_16645_7163)">
<path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="currentColor"/>
<ellipse cx="15.9998" cy="28.1591" rx="12.16" ry="7.04" fill="currentColor"/>
<ellipse cx="15.9997" cy="13.5998" rx="5.76" ry="5.76" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_16645_7163">
<path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="currentColor"/>
</clipPath>
</defs>
      </svg>
    );
  }
);

DefaultAvatarIcon.displayName = "DefaultAvatarIcon";

export default DefaultAvatarIcon;
