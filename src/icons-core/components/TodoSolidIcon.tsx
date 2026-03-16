import { cn } from "@/lib/utils";
import React from "react";

export interface TodoSolidIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const TodoSolidIcon = React.forwardRef<SVGSVGElement, TodoSolidIconProps>(
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
        <path d="M13.25 6.79747H23.75V3H13.25V6.79747ZM11 4.89873H6.5C6.10218 4.89873 5.72064 5.05877 5.43934 5.34364C5.15804 5.6285 5 6.01486 5 6.41772V31.481C5 31.8839 5.15804 32.2702 5.43934 32.5551C5.72064 32.84 6.10218 33 6.5 33H30.5C30.8978 33 31.2794 32.84 31.5607 32.5551C31.842 32.2702 32 31.8839 32 31.481V6.41772C32 6.01486 31.842 5.6285 31.5607 5.34364C31.2794 5.05877 30.8978 4.89873 30.5 4.89873H26V7.93671C26 8.13814 25.921 8.33132 25.7803 8.47375C25.6397 8.61618 25.4489 8.6962 25.25 8.6962H11.75C11.5511 8.6962 11.3603 8.61618 11.2197 8.47375C11.079 8.33132 11 8.13814 11 7.93671V4.89873ZM26.621 16.2911L17.3105 25.7195C17.0292 26.0043 16.6477 26.1642 16.25 26.1642C15.8523 26.1642 15.4708 26.0043 15.1895 25.7195L10.379 20.8481L12.5 18.7003L16.25 22.4977L24.5 14.1433L26.621 16.2911Z" />
      </svg>
    );
  }
);

TodoSolidIcon.displayName = "TodoSolidIcon";

export default TodoSolidIcon;
