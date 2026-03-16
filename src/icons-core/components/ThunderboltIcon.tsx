import { cn } from "@/lib/utils";
import React from "react";

export interface ThunderboltIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ThunderboltIcon = React.forwardRef<SVGSVGElement, ThunderboltIconProps>(
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
        <path d="M31.8296 12.0885H22.5314L30.8926 1.54748C31.0657 1.32427 30.9095 1 30.6267 1H14.4403C14.3221 1 14.2082 1.06317 14.1491 1.16845L3.21321 20.0143C3.08236 20.2375 3.24275 20.5196 3.50444 20.5196H10.8654L7.09204 35.5794C7.01185 35.9079 7.4086 36.1395 7.6534 35.9037L32.0618 12.6654C32.2813 12.4591 32.1335 12.0885 31.8296 12.0885ZM12.0007 27.8053L14.5458 17.6559H7.90242L15.9049 3.86793H25.3846L16.5929 14.9564H25.4986L12.0007 27.8053Z" fill="currentColor" />
      </svg>
    );
  }
);

ThunderboltIcon.displayName = "ThunderboltIcon";

export default ThunderboltIcon;
