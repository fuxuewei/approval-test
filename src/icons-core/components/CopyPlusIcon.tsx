import { cn } from "@/lib/utils";
import React from "react";

export interface CopyPlusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const CopyPlusIcon = React.forwardRef<SVGSVGElement, CopyPlusIconProps>(
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
        <path d="M21.4 27.4154V18C21.4 17.2778 21.9855 16.6923 22.7077 16.6923C23.4299 16.6923 24.0154 17.2778 24.0154 18V27.4154C24.0154 28.1376 23.4299 28.7231 22.7077 28.7231C21.9855 28.7231 21.4 28.1376 21.4 27.4154Z" fill="currentColor"/>
<path d="M27.4154 21.4C28.1376 21.4 28.7231 21.9855 28.7231 22.7077C28.7231 23.4299 28.1376 24.0154 27.4154 24.0154H18C17.2778 24.0154 16.6923 23.4299 16.6923 22.7077C16.6923 21.9855 17.2778 21.4 18 21.4H27.4154Z" fill="currentColor"/>
<path d="M32.3846 14.8615C32.3846 13.8504 31.565 13.0308 30.5538 13.0308H14.8615C13.8504 13.0308 13.0308 13.8504 13.0308 14.8615V30.5538C13.0308 31.565 13.8504 32.3846 14.8615 32.3846H30.5538C31.565 32.3846 32.3846 31.565 32.3846 30.5538V14.8615ZM35 30.5538C35 33.0094 33.0094 35 30.5538 35H14.8615C12.406 35 10.4154 33.0094 10.4154 30.5538V14.8615C10.4154 12.406 12.406 10.4154 14.8615 10.4154H30.5538C33.0094 10.4154 35 12.406 35 14.8615V30.5538Z" fill="currentColor"/>
<path d="M22.9692 5.44615C22.9692 4.44222 22.1424 3.61538 21.1385 3.61538H5.44615C4.44222 3.61538 3.61538 4.44222 3.61538 5.44615V21.1385C3.61538 22.1424 4.44222 22.9692 5.44615 22.9692C6.16837 22.9692 6.75385 23.5547 6.75385 24.2769C6.75385 24.9991 6.16837 25.5846 5.44615 25.5846C2.99778 25.5846 1 23.5868 1 21.1385V5.44615C1 2.99778 2.99778 1 5.44615 1H21.1385C23.5868 1 25.5846 2.99778 25.5846 5.44615C25.5846 6.16837 24.9991 6.75385 24.2769 6.75385C23.5547 6.75385 22.9692 6.16837 22.9692 5.44615Z" fill="currentColor"/>
      </svg>
    );
  }
);

CopyPlusIcon.displayName = "CopyPlusIcon";

export default CopyPlusIcon;
