import { cn } from "@/lib/utils";
import React from "react";

export interface TypeCode2IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const TypeCode2Icon = React.forwardRef<SVGSVGElement, TypeCode2IconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7111 6L22.1861 6.61346L16.2889 30L13.8139 29.3865L19.7111 6ZM11.8864 12.7668L6.60798 18L11.8864 23.2332L10.0824 25.0217L3 18L10.0824 10.9783L11.8864 12.7668ZM25.9176 10.9783L33 18L25.9176 25.0217L24.1136 23.2332L29.392 18L24.1136 12.7668L25.9176 10.9783Z" fill="currentColor"/>
      </svg>
    );
  }
);

TypeCode2Icon.displayName = "TypeCode2Icon";

export default TypeCode2Icon;
