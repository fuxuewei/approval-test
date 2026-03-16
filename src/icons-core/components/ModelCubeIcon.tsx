import { cn } from "@/lib/utils";
import React from "react";

export interface ModelCubeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ModelCubeIcon = React.forwardRef<SVGSVGElement, ModelCubeIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path d="M35.8437 35.6816L5.24146 17.9316V53.4316L35.8437 71.1816V35.6816Z" fill="currentColor"/>
<path d="M35.844 35.6816L66.4463 17.9316V53.4316L35.844 71.1816V35.6816Z" fill="currentColor"/>
<path d="M35.8346 35.7298L5.24146 17.9316L35.8346 1.11586L66.446 17.9316L35.8346 35.7298Z" fill="currentColor"/>
      </svg>
    );
  }
);

ModelCubeIcon.displayName = "ModelCubeIcon";

export default ModelCubeIcon;
