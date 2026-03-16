import { cn } from "@/lib/utils";
import React from "react";

export interface LineChartIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const LineChartIcon = React.forwardRef<SVGSVGElement, LineChartIconProps>(
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
        <path d="M33.1065 29.2513H5.46367V4.17983C5.46367 4.00304 5.31903 3.8584 5.14225 3.8584H2.89224C2.71546 3.8584 2.57082 4.00304 2.57082 4.17983V31.8227C2.57082 31.9995 2.71546 32.1441 2.89224 32.1441H33.1065C33.2833 32.1441 33.428 31.9995 33.428 31.8227V29.5727C33.428 29.3959 33.2833 29.2513 33.1065 29.2513ZM9.71457 23.0517C9.83912 23.1763 10.04 23.1763 10.1686 23.0517L15.7253 17.5231L20.8521 22.6821C20.9766 22.8066 21.1815 22.8066 21.3061 22.6821L32.3713 11.6209C32.4958 11.4963 32.4958 11.2914 32.3713 11.1669L30.7802 9.57581C30.7198 9.51599 30.6382 9.48243 30.5532 9.48243C30.4682 9.48243 30.3866 9.51599 30.3262 9.57581L21.0851 18.8129L15.9664 13.662C15.9059 13.6022 15.8244 13.5686 15.7393 13.5686C15.6543 13.5686 15.5727 13.6022 15.5123 13.662L8.12751 21.0026C8.06769 21.063 8.03414 21.1446 8.03414 21.2296C8.03414 21.3146 8.06769 21.3962 8.12751 21.4566L9.71457 23.0517Z" fill="currentColor"/>
      </svg>
    );
  }
);

LineChartIcon.displayName = "LineChartIcon";

export default LineChartIcon;
