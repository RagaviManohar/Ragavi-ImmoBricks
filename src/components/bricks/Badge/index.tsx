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
        return "bg-green-200 text-green-950";
      case "danger":
        return "bg-red-200 text-red-950";
      default:
        return "";
    }
  };
  
  const isCustomVariant = variant === "success" || variant === "danger";
  
  return (
    <Badge
      className={cn(
        "rounded-full border-transparent px-2 py-0.5 text-xs font-medium",
        getVariantClasses(),
        className
      )}
      // Pass variant only if it's a standard Shadcn variant
      variant={isCustomVariant ? undefined : variant as React.ComponentProps<typeof Badge>["variant"]}
      {...props}
    >
      {children}
    </Badge>
  );
}

export { BricksBadge };
