import { cn } from "@/lib/utils";
import React from "react";

export interface FolderOpenIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const FolderOpenIcon = React.forwardRef<SVGSVGElement, FolderOpenIconProps>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2.7 3.26251C1.89229 3.26251 1.2375 3.9173 1.2375 4.72501V13.275C1.2375 13.5888 1.33692 13.8806 1.50558 14.1191C1.65684 14.4748 2.00767 14.7375 2.43855 14.7375H13.7658C14.3838 14.7375 14.9352 14.349 15.143 13.7669L16.7502 9.26689C17.0904 8.31445 16.3843 7.3125 15.3729 7.3125H14.9625V6.52501C14.9625 5.7173 14.3077 5.06251 13.5 5.06251H7.22256L6.37127 3.87359C6.09665 3.49004 5.65388 3.26251 5.18216 3.26251H2.7ZM14.3962 8.4375C14.3974 8.43751 14.3987 8.43751 14.4 8.43751C14.4013 8.43751 14.4026 8.43751 14.4038 8.4375H15.3729C15.6063 8.4375 15.7692 8.66872 15.6907 8.88851L14.0836 13.3885C14.0356 13.5228 13.9084 13.6125 13.7658 13.6125H2.59819L4.15309 9.25878C4.32899 8.76627 4.79551 8.4375 5.31849 8.4375H14.3962ZM13.8375 7.3125V6.52501C13.8375 6.33862 13.6864 6.18751 13.5 6.18751H7.06483C6.80097 6.18751 6.5533 6.06024 6.39969 5.8457L5.45657 4.52853C5.39319 4.44002 5.29102 4.38751 5.18216 4.38751H2.7C2.51361 4.38751 2.3625 4.53862 2.3625 4.72501V10.9276L3.09363 8.88041C3.42943 7.94015 4.32007 7.3125 5.31849 7.3125H13.8375Z"
        fill="currentColor"/>
      </svg>
    );
  }
);

FolderOpenIcon.displayName = "FolderOpenIcon";

export default FolderOpenIcon;
