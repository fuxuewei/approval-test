import { cn } from "@/lib/utils";
import React from "react";

export interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const SearchIcon = React.forwardRef<SVGSVGElement, SearchIconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3608 1C8.5302 1 1.37158 8.15862 1.37158 16.9892C1.37158 25.8198 8.5302 32.9785 17.3608 32.9785C21.0818 32.9785 24.5059 31.7074 27.2226 29.5758L32.2534 34.5936C32.7978 35.1365 33.6791 35.1353 34.222 34.591C34.7649 34.0467 34.7638 33.1654 34.2194 32.6225L29.257 27.6729C31.8017 24.8412 33.35 21.096 33.35 16.9892C33.35 8.15862 26.1914 1 17.3608 1ZM4.15555 16.9892C4.15555 9.69617 10.0677 3.78397 17.3608 3.78397C24.6539 3.78397 30.5661 9.69617 30.5661 16.9892C30.5661 24.2823 24.6539 30.1945 17.3608 30.1945C10.0677 30.1945 4.15555 24.2823 4.15555 16.9892Z" />
      </svg>
    );
  }
);

SearchIcon.displayName = "SearchIcon";

export default SearchIcon;
