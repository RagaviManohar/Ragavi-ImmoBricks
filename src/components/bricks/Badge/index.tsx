import * as React from "react";
import { Badge  as ShadcnBadge } from "@/components/shadcn/ui/badge";
import { cn } from "@/components/shadcn/lib/utils";

export type BadgeVariant = React.ComponentProps<typeof ShadcnBadge>["variant"]  |"success" | "danger";

type BadgeProps = Omit<React.ComponentProps<typeof ShadcnBadge>, "variant"> & {
  variant?: BadgeVariant;
};

export function Badge({
  className,
  children,
  variant,
  ...props
}: BadgeProps) {
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
    <ShadcnBadge
      className={cn(
        "rounded-full border-transparent px-2 py-0.5 text-xs font-medium",
        getVariantClasses(),
        className
      )}
      // Pass variant only if it's a standard Shadcn variant
      variant={isCustomVariant ? undefined : variant as React.ComponentProps<typeof ShadcnBadge>["variant"]}
      {...props}
    >
      {children}
    </ShadcnBadge>
  );
}
