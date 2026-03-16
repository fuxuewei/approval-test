import { cn } from "@/lib/utils";
import React from "react";

export interface FolderCheckIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FolderCheckIcon = React.forwardRef<SVGSVGElement, FolderCheckIconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.36 9.576H32.72C33.428 9.576 34 10.148 34 10.856V29.96C34 30.668 33.428 31.24 32.72 31.24H3.28C2.572 31.24 2 30.668 2 29.96V6.28C2 5.572 2.572 5 3.28 5H13.448C13.5298 5.0007 13.6083 5.03211 13.668 5.088L18.36 9.576ZM4.88 28.36H31.12V12.456H17.204L12.42 7.88H4.88V28.36Z" />
<path d="M21.6832 16.2842C22.1618 15.7961 22.9376 15.7961 23.4162 16.2842C23.8949 16.7724 23.8949 17.5637 23.4162 18.0518L17.5334 24.052C17.0548 24.5401 16.279 24.5401 15.8004 24.052L12.859 21.0519C12.3803 20.5637 12.3803 19.7724 12.859 19.2843C13.3376 18.7961 14.1134 18.7961 14.592 19.2843L16.6669 21.4005L21.6832 16.2842Z" />
      </svg>
    );
  }
);

FolderCheckIcon.displayName = "FolderCheckIcon";

export default FolderCheckIcon;
