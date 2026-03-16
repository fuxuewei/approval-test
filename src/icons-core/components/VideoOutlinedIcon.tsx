import { cn } from "@/lib/utils";
import React from "react";

export interface VideoOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const VideoOutlinedIcon = React.forwardRef<SVGSVGElement, VideoOutlinedIconProps>(
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
        <path fill="currentColor" fill-rule="evenodd" d="M18.002 25.704c0-.941.76-1.704 1.704-1.704h16.59c.941 0 1.704.76 1.704 1.704v16.59A1.704 1.704 0 0136.296 44H19.704A1.702 1.702 0 0118 42.294V25.703l.002.002zM48.32 41.876l-6.319-3.058v-9.634l6.319-3.062c.761-.368 1.68.134 1.68.914v13.927c0 .78-.919 1.282-1.68.913z" clip-rule="evenodd"/>
      </svg>
    );
  }
);

VideoOutlinedIcon.displayName = "VideoOutlinedIcon";

export default VideoOutlinedIcon;
