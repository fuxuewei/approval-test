import { cn } from "@/lib/utils";
import React from "react";

export interface PublishIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PublishIcon = React.forwardRef<SVGSVGElement, PublishIconProps>(
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
        <path d="M1.76921 13.1556C0.0307741 13.713 1.78249 15.3585 1.78249 15.3585L7.64806 20.2554L25.9216 9.43986C25.9216 9.43986 13.58 18.9416 9.81116 21.8876L22.5376 31.5088C24.5547 32.8358 25.0723 31.7742 25.0723 31.7742L25.9614 29.6774L34.9323 4.71555C35.2641 3.85297 34.3218 2.85768 33.3 3.01692L1.76921 13.1556ZM14.7611 27.7665L9.89078 24.1304L9.87751 31.1637L14.7611 27.7665Z" />
      </svg>
    );
  }
);

PublishIcon.displayName = "PublishIcon";

export default PublishIcon;
