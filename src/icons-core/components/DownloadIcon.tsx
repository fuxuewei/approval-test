import { cn } from "@/lib/utils";
import React from "react";

export interface DownloadIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const DownloadIcon = React.forwardRef<SVGSVGElement, DownloadIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path d="M17.9132 23.9793C17.9433 24.0177 17.9817 24.0487 18.0255 24.0701C18.0694 24.0915 18.1175 24.1026 18.1663 24.1026C18.2151 24.1026 18.2632 24.0915 18.3071 24.0701C18.351 24.0487 18.3894 24.0177 18.4194 23.9793L22.9194 18.286C23.0842 18.077 22.9355 17.7677 22.6663 17.7677H19.6891V4.17122C19.6891 3.99444 19.5444 3.84979 19.3677 3.84979H16.9569C16.7802 3.84979 16.6355 3.99444 16.6355 4.17122V17.7636H13.6663C13.3971 17.7636 13.2485 18.073 13.4132 18.2819L17.9132 23.9793ZM32.8717 22.573H30.461C30.2842 22.573 30.1395 22.7177 30.1395 22.8944V29.0819H6.1931V22.8944C6.1931 22.7177 6.04846 22.573 5.87167 22.573H3.46095C3.28417 22.573 3.13953 22.7177 3.13953 22.8944V30.8498C3.13953 31.561 3.71408 32.1355 4.42524 32.1355H31.9074C32.6185 32.1355 33.1931 31.561 33.1931 30.8498V22.8944C33.1931 22.7177 33.0485 22.573 32.8717 22.573Z"/>
      </svg>
    );
  }
);

DownloadIcon.displayName = "DownloadIcon";

export default DownloadIcon;
