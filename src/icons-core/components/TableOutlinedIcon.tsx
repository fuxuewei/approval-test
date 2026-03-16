import { cn } from "@/lib/utils";
import React from "react";

export interface TableOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const TableOutlinedIcon = React.forwardRef<SVGSVGElement, TableOutlinedIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path fill="currentColor" fill-rule="evenodd" d="M50.737 18.026V18H18.269v2.665h.01v5.237h-.01v2.664h.01v8.05h-.008v2.665h.007v8.051h-.005v2.665h.005V50h2.706v-.003h8.154V50h2.705v-.003H37.2V50h2.706v-.003h8.136V50h2.705V18.026h-.01zM48.04 47.332v-8.05h-8.136v8.05h8.136zm-10.842 0v-8.05h-5.356v8.05H37.2zm-8.061 0v-8.05h-8.154v8.05h8.154zm-8.154-10.715h8.154v-8.05h-8.154v8.05zm0-10.715H48.04v-5.238H20.984v5.238zm27.057 2.664h-8.136v8.05h8.136v-8.05zm-10.842 8.05v-8.05h-5.356v8.05H37.2z" clip-rule="evenodd"/>
      </svg>
    );
  }
);

TableOutlinedIcon.displayName = "TableOutlinedIcon";

export default TableOutlinedIcon;
