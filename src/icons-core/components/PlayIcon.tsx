import { cn } from "@/lib/utils";
import React from "react";

export interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PlayIcon = React.forwardRef<SVGSVGElement, PlayIconProps>(
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0394 3.46792C10.4229 3.25284 10.8567 3.14381 11.2964 3.15205C11.736 3.16028 12.1655 3.28547 12.5406 3.51476L11.8367 4.66668L12.5406 3.51476L32.7874 15.8882C33.1491 16.1092 33.448 16.4196 33.6554 16.7894C33.8628 17.1592 33.9717 17.576 33.9717 18C33.9717 18.424 33.8628 18.8409 33.6554 19.2107C33.448 19.5805 33.1491 19.8908 32.7874 20.1119L12.5406 32.4853C12.1655 32.7146 11.736 32.8397 11.2964 32.848C10.8568 32.8562 10.4229 32.7472 10.0394 32.5321C9.65587 32.317 9.33659 32.0037 9.11438 31.6243C8.89216 31.2449 8.77502 30.8131 8.77502 30.3734V5.62661C8.77502 5.18692 8.89216 4.75516 9.11438 4.37576C9.3366 3.99635 9.65588 3.68299 10.0394 3.46792ZM11.475 6.02781V29.9722L31.0653 18L11.475 6.02781Z" />
      </svg>
    );
  }
);

PlayIcon.displayName = "PlayIcon";

export default PlayIcon;
