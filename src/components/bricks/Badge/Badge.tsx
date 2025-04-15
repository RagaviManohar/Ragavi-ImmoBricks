import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CustomVariant = "success" | "danger";
type BricksBadgeProps = Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  variant?: React.ComponentProps<typeof Badge>["variant"] | CustomVariant;
};

function BricksBadge({
  className,
  children,
  variant,
  ...props
}: BricksBadgeProps) {
  // Use Tailwind's utility classes that reference theme variables
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "border-transparent bg-success text-black";
      case "danger":
        return "border-transparent bg-danger text-black";
      default:
        return "";
    }
  };
  
  const isCustomVariant = variant === "success" || variant === "danger";
  
  return (
    <Badge
      className={cn(
        "rounded-full",
        getVariantClasses(),
        className
      )}
      // Only pass variant to Badge if it's not a custom variant
      variant={isCustomVariant ? undefined : variant as React.ComponentProps<typeof Badge>["variant"]}
      {...props}
    >
      {children}
    </Badge>
  );
}

export { BricksBadge };
