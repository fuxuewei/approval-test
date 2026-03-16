import { cn } from "@/lib/utils";
import React from "react";

export interface SquareCheckBigIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const SquareCheckBigIcon = React.forwardRef<SVGSVGElement, SquareCheckBigIconProps>(
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
        <path d="M3 28.5V7.5C3 6.30653 3.47445 5.16227 4.31836 4.31836C5.16227 3.47445 6.30653 3 7.5 3H26.0156C26.8441 3 27.5156 3.67157 27.5156 4.5C27.5156 5.32843 26.8441 6 26.0156 6H7.5C7.10217 6 6.72076 6.15815 6.43945 6.43945C6.15815 6.72076 6 7.10217 6 7.5V28.5C6 28.8978 6.15815 29.2792 6.43945 29.5605C6.72076 29.8419 7.10218 30 7.5 30H28.5C28.8978 30 29.2792 29.8419 29.5605 29.5605C29.8419 29.2792 30 28.8978 30 28.5V15.9844C30 15.1559 30.6716 14.4844 31.5 14.4844C32.3284 14.4844 33 15.1559 33 15.9844V28.5C33 29.6935 32.5256 30.8377 31.6816 31.6816C30.8377 32.5256 29.6935 33 28.5 33H7.5C6.30653 33 5.16227 32.5256 4.31836 31.6816C3.47445 30.8377 3 29.6935 3 28.5Z"/>
<path d="M31.9395 4.93945C32.5252 4.35367 33.4748 4.35367 34.0605 4.93945C34.6463 5.52524 34.6463 6.47476 34.0605 7.06055L19.0605 22.0605C18.4748 22.6463 17.5252 22.6463 16.9395 22.0605L12.4395 17.5605C11.8537 16.9748 11.8537 16.0252 12.4395 15.4395C13.0252 14.8537 13.9748 14.8537 14.5605 15.4395L18 18.8789L31.9395 4.93945Z" />
      </svg>
    );
  }
);

SquareCheckBigIcon.displayName = "SquareCheckBigIcon";

export default SquareCheckBigIcon;
