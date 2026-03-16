import { cn } from "@/lib/utils";
import React from "react";

export interface WitchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const WitchIcon = React.forwardRef<SVGSVGElement, WitchIconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.05868 13.7539C2.47946 13.1747 2.47946 12.2356 3.05868 11.6564L12.8126 1.90253C13.2368 1.47834 13.8747 1.35146 14.4289 1.58102C14.9831 1.81059 15.3445 2.3514 15.3445 2.95128L15.3445 33.0493C15.3445 33.8684 14.6805 34.5324 13.8613 34.5324C13.0422 34.5324 12.3782 33.8684 12.3782 33.0493L12.3782 6.53196L5.15619 13.7539C4.57698 14.3331 3.63789 14.3331 3.05868 13.7539Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.9414 22.2466C33.5206 22.8258 33.5206 23.7649 32.9414 24.3441L23.1875 34.098C22.7633 34.5222 22.1254 34.6491 21.5712 34.4195C21.0169 34.19 20.6556 33.6491 20.6556 33.0493L20.6556 2.95128C20.6556 2.13215 21.3196 1.46812 22.1387 1.46812C22.9579 1.46812 23.6219 2.13215 23.6219 2.95128L23.6219 29.4686L30.8439 22.2466C31.4231 21.6674 32.3622 21.6674 32.9414 22.2466Z" />
      </svg>
    );
  }
);

WitchIcon.displayName = "WitchIcon";

export default WitchIcon;
