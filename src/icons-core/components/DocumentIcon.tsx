import { cn } from "@/lib/utils";
import React from "react";

export interface DocumentIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const DocumentIcon = React.forwardRef<SVGSVGElement, DocumentIconProps>(
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
        <path d="M4.54998 0C3.53749 0 2.45749 0.4 1.71499 1.2C0.972498 2 0.5 3 0.5 4V76C0.5 77 0.904998 78.0667 1.71499 78.8C2.52499 79.6 3.53749 80 4.54998 80H63.9497C64.9622 80 66.0422 79.6 66.7847 78.8C67.5947 78 67.9997 77 67.9997 76V22.6667L45.0498 0H4.54998Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5957 32.4263H47.1556V37.5463H12.5957V32.4263ZM12.5957 42.6663H47.1556V47.7863H12.5957V42.6663ZM33.3316 52.9063H12.5957V58.0263H33.3316V52.9063Z" fill="currentColor"/>
<path d="M67.9997 22.6667H49.0998C48.0873 22.6667 47.0073 22.2667 46.2648 21.4667C45.4548 20.7333 45.0498 19.6667 45.0498 18.6667V0L67.9997 22.6667Z" fill="currentColor"/>
      </svg>
    );
  }
);

DocumentIcon.displayName = "DocumentIcon";

export default DocumentIcon;
