import { cn } from "@/lib/utils";
import React from "react";

export interface JsdIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const JsdIcon = React.forwardRef<SVGSVGElement, JsdIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 68 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path fill="currentColor" d="M4.05 0C3.038 0 1.958.4 1.215 1.2.472 2 0 3 0 4v72c0 1 .405 2.067 1.215 2.8.81.8 1.823 1.2 2.835 1.2h59.4c1.013 0 2.093-.4 2.835-1.2.81-.8 1.215-1.8 1.215-2.8V22.667L44.55 0H4.05z"/>
  <path fill="currentColor" fill-opacity=".5" d="M67.5 22.667H48.6c-1.013 0-2.093-.4-2.835-1.2-.81-.734-1.215-1.8-1.215-2.8V0L67.5 22.667z"/>
  <path fill="currentColor" fill-rule="evenodd" d="M38.739 29.52l9.837 18.14a2.078 2.078 0 010 1.96l-6.23 11.491a2.156 2.156 0 01-1.89 1.103H26.544a2.156 2.156 0 01-1.89-1.103l-6.23-11.49a2.078 2.078 0 010-1.961l9.837-18.14a1.433 1.433 0 011.921-.567c.25.123.453.322.578.567l2.732 5.04 2.748-5.04a1.41 1.41 0 011.905-.567c.25.123.453.322.594.567zm-1.244 12.417l-2.014 3.707.827 1.517c.25.46.375.965.375 1.47h.016v.062c-.032 1.716-1.452 3.08-3.201 3.08-1.765 0-3.185-1.395-3.185-3.126v-.015c0-.2.015-.398.062-.613v-.046c.078-.322.187-.613.343-.873v-.016l2.78-5.117v.016l2.014-3.708 1.343-2.497a.889.889 0 01.297-.291c.343-.169.78-.046.952.29l6.714 12.365a.997.997 0 010 .98L39.9 58.177a1.075 1.075 0 01-.937.551h-10.93c-.39 0-.75-.214-.937-.551l-4.919-9.055a.997.997 0 010-.98l6.715-12.364a.724.724 0 01.28-.291.738.738 0 01.969.29l1.343 2.498-3.935 7.247a5.82 5.82 0 00-.453 1.072l-.016.046-.062.169a6.465 6.465 0 00-.266 1.838c0 3.647 3.03 6.619 6.746 6.619 3.732 0 6.745-2.972 6.745-6.619a6.386 6.386 0 00-.874-3.263l-1.874-3.447z" clip-rule="evenodd"/>
      </svg>
    );
  }
);

JsdIcon.displayName = "JsdIcon";

export default JsdIcon;
