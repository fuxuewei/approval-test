import { cn } from "@/lib/utils";
import React from "react";

export interface CalendarIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const CalendarIcon = React.forwardRef<SVGSVGElement, CalendarIconProps>(
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
        <path d="M32.7863 4.82631H26.0363V2.25489C26.0363 2.0781 25.8917 1.93346 25.7149 1.93346H23.4649C23.2881 1.93346 23.1435 2.0781 23.1435 2.25489V4.82631H12.8578V2.25489C12.8578 2.0781 12.7131 1.93346 12.5363 1.93346H10.2863C10.1095 1.93346 9.9649 2.0781 9.9649 2.25489V4.82631H3.2149C2.50374 4.82631 1.92918 5.40087 1.92918 6.11203V32.7906C1.92918 33.5018 2.50374 34.0763 3.2149 34.0763H32.7863C33.4975 34.0763 34.072 33.5018 34.072 32.7906V6.11203C34.072 5.40087 33.4975 4.82631 32.7863 4.82631ZM31.1792 31.1835H4.82204V15.9156H31.1792V31.1835ZM4.82204 13.1835V7.71917H9.9649V9.64774C9.9649 9.82453 10.1095 9.96917 10.2863 9.96917H12.5363C12.7131 9.96917 12.8578 9.82453 12.8578 9.64774V7.71917H23.1435V9.64774C23.1435 9.82453 23.2881 9.96917 23.4649 9.96917H25.7149C25.8917 9.96917 26.0363 9.82453 26.0363 9.64774V7.71917H31.1792V13.1835H4.82204Z" />
      </svg>
    );
  }
);

CalendarIcon.displayName = "CalendarIcon";

export default CalendarIcon;
