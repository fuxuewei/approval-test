import { cn } from "@/lib/utils";
import React from "react";

export interface MusicIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const MusicIcon = React.forwardRef<SVGSVGElement, MusicIconProps>(
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
        <path d="M4.05 0C3.0375 0 1.9575 0.4 1.215 1.2C0.4725 2 0 3 0 4V76C0 77 0.405 78.0667 1.215 78.8C2.025 79.6 3.0375 80 4.05 80H63.45C64.4625 80 65.5425 79.6 66.285 78.8C67.095 78 67.5 77 67.5 76V22.6667L44.55 0H4.05Z" fill="currentColor"/>
<path d="M67.4998 22.6667H48.5998C47.5873 22.6667 46.5073 22.2667 45.7648 21.4667C44.9548 20.7333 44.5498 19.6667 44.5498 18.6667V0L67.4998 22.6667Z" fill="currentColor"/>
<path d="M45.7652 28.1202L30.0512 32.4402C28.1477 32.9202 26.6087 34.7202 26.6087 36.4402V51.3202C26.6087 51.3202 25.4747 50.6402 22.9232 50.9602C19.1972 51.4402 16.2002 54.0002 16.2002 56.6802C16.2002 59.3602 19.2377 61.0402 22.9232 60.5602C26.6492 60.0802 29.3627 57.6002 29.3627 54.9202V42.2002C29.3627 41.0002 30.9422 40.4802 30.9422 40.4802L44.8337 36.5602C44.8337 36.5602 46.3727 36.0802 46.3727 37.3602V47.6002C46.3727 47.6002 44.9552 46.8802 42.4037 47.1602C38.6777 47.5602 35.6402 50.0802 35.6402 52.7602C35.6402 55.4402 38.6777 57.1602 42.4037 56.7602C46.1297 56.3602 49.1672 53.8402 49.1672 51.1602V30.3602C49.2077 28.6402 47.6687 27.6402 45.7652 28.1202Z" fill="currentColor"/>
      </svg>
    );
  }
);

MusicIcon.displayName = "MusicIcon";

export default MusicIcon;
