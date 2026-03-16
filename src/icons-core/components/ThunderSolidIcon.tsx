import { cn } from "@/lib/utils";
import React from "react";

export interface ThunderSolidIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ThunderSolidIcon = React.forwardRef<SVGSVGElement, ThunderSolidIconProps>(
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
        <path d="M14.1637 20.9966H8.12624C7.33799 20.9966 6.79424 20.2076 7.07474 19.4715L13.074 3.7245C13.1552 3.51146 13.2991 3.3281 13.4868 3.19872C13.6745 3.06933 13.8971 3.00003 14.1251 3H24.2486C25.0474 3 25.5919 3.80925 25.2904 4.54913L21.7972 13.1231H28.3732C29.3404 13.1231 29.8564 14.2631 29.2185 14.9899L13.0957 33.3611C12.312 34.2544 10.8589 33.4804 11.163 32.3317L14.1637 20.9966Z" />
      </svg>
    );
  }
);

ThunderSolidIcon.displayName = "ThunderSolidIcon";

export default ThunderSolidIcon;
