import * as React from "react";
import { cn } from "@/lib/utils";

interface TableRowTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  subText?: string;
}

export function TableRowText({
  text,
  subText,
  className,
  ...props
}: TableRowTextProps) {
  return (
    <div className="flex flex-col" {...props}>
      <div className={cn("text-[var(--table-row-title)] text-[14px] font-small", className)}>
        {text}
      </div>
      {subText && (
        <div className="text-[var(--table-row-subtitle)] text-[12px] font-normal">
          {subText}
        </div>
      )}
    </div>
  );
} 