import { cn } from "@/lib/utils";
import React from "react";

export interface JsdOutlinedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const JsdOutlinedIcon = React.forwardRef<SVGSVGElement, JsdOutlinedIconProps>(
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
        <path fill="currentColor" fill-rule="evenodd" d="M38.933 20.978l8.323 15.35c.278.518.278 1.14 0 1.659l-5.271 9.722c-.318.57-.925.934-1.599.934H28.614a1.825 1.825 0 01-1.599-.934l-5.271-9.722a1.758 1.758 0 010-1.66l8.323-15.349a1.212 1.212 0 011.625-.48c.212.104.384.273.49.48l2.311 4.265 2.326-4.265c.304-.57 1.03-.79 1.612-.48.211.104.383.273.502.48zM37.88 31.485l-1.704 3.137.7 1.284c.212.389.317.816.317 1.244h.014v.052c-.027 1.452-1.23 2.606-2.709 2.606-1.493 0-2.695-1.18-2.695-2.645v-.013c0-.169.013-.337.053-.518v-.04c.066-.272.158-.518.29-.738v-.013l2.352-4.33v.013l1.705-3.137 1.136-2.114a.754.754 0 01.25-.246c.291-.142.661-.039.807.246l5.68 10.462c.146.26.146.57 0 .83l-4.16 7.661a.91.91 0 01-.794.467h-9.248a.91.91 0 01-.793-.467l-4.162-7.661a.844.844 0 010-.83l5.682-10.462a.613.613 0 01.237-.246.625.625 0 01.82.246l1.136 2.114-3.33 6.131c-.158.299-.29.597-.383.908l-.013.039-.053.142a5.472 5.472 0 00-.224 1.556c0 3.085 2.563 5.6 5.707 5.6 3.158 0 5.708-2.515 5.708-5.6a5.403 5.403 0 00-.74-2.761l-1.586-2.917z" clip-rule="evenodd"/>
      </svg>
    );
  }
);

JsdOutlinedIcon.displayName = "JsdOutlinedIcon";

export default JsdOutlinedIcon;
