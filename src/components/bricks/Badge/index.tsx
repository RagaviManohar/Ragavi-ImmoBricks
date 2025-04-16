import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type BricksBadgeVariant = React.ComponentProps<typeof Badge>["variant"]  |"success" | "danger";

type BricksBadgeProps = Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  variant?: BricksBadgeVariant;
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
        return "bg-success text-success-foreground";
      case "danger":
        return "bg-danger text-danger-foreground";
      default:
        return "";
    }
  };
  
  const isCustomVariant = variant === "success" || variant === "danger";
  
  return (
    <Badge
      className={cn(
        "rounded-full border-transparent font-small",
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
