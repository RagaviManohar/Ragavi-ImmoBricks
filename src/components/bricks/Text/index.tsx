import * as React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  subText?: string;
  size?: "xs" | "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "black" | "gray";
  subTextSize?: "xs" | "sm" | "md" | "lg";
  subTextWeight?: "normal" | "medium" | "semibold" | "bold";
  subTextColor?: "black" | "gray" ;
}

export function Text({
  text,
  subText,
  size = "sm",
  weight = "normal",
  color = "black",
  subTextSize = "xs",
  subTextWeight = "normal",
  subTextColor = "gray",
  className,
  ...props
}: TextProps) {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    black: "text-neutral-950",
    gray: "text-neutral-600",
  };

  return (
    <div className="flex flex-col" {...props}>
      <div
        className={cn(
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          className
        )}
      >
        {text}
      </div>
      
      {subText && (
        <div
          className={cn(
            sizeClasses[subTextSize],
            weightClasses[subTextWeight],
            colorClasses[subTextColor]
          )}
        >
          {subText}
        </div>
      )}
    </div>
  );
}
