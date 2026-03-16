import { cn } from "@/lib/utils";
import React from "react";

export interface TableIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const TableIcon = React.forwardRef<SVGSVGElement, TableIconProps>(
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
<path fill-rule="evenodd" clip-rule="evenodd" d="M50.6025 34.1594V34.1333H17.7803V36.8347H17.7899V42.1445H17.7803V44.8459H17.7899V53.0081H17.7827V55.7095H17.7899V63.8718H17.7843V66.5732H17.7899V66.5765H20.5251V66.5732H28.7677V66.5766H31.5029V66.5732H36.917V66.5766H39.6522V66.5732H47.8768V66.5765H50.612V34.1594H50.6025ZM47.8768 63.8718V55.7095H39.6522V63.8718H47.8768ZM36.917 63.8718V55.7095H31.5029V63.8718H36.917ZM28.7677 63.8718V55.7095H20.5251V63.8718H28.7677ZM20.5251 53.0081H28.7677V44.8459H20.5251V53.0081ZM20.5251 42.1445H47.8768V36.8347H20.5251V42.1445ZM47.8768 44.8459H39.6522V53.0081H47.8768V44.8459ZM36.917 53.0081V44.8459H31.5029V53.0081H36.917Z" fill="currentColor"/>
<path d="M67.9997 22.6667H49.0998C48.0873 22.6667 47.0073 22.2667 46.2648 21.4667C45.4548 20.7333 45.0498 19.6667 45.0498 18.6667V0L67.9997 22.6667Z" fill="currentColor"/>
      </svg>
    );
  }
);

TableIcon.displayName = "TableIcon";

export default TableIcon;
