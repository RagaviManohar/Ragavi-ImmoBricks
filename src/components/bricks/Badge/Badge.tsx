import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const bricksBadgeVariants = cva("rounded-full", {
  variants: {
    variant: {
      // These are our custom variants
      success: "border-transparent bg-[#C2F5DA] text-[#0B4627]",
      danger: "border-transparent bg-[#FFC0C5] text-[#681219]",
    },
  },
})

// const extendedBadgeVariants = cva(
//   badgeVariants().split(" ")[0], // Get base classes
//   {
//     variants: {
//       variant: {
//         ...badgeVariants().variants?.variant, // Include original variants
//         success: "border-transparent bg-[#C2F5DA] text-[#0B4627]",
//         danger: "border-transparent bg-[#FFC0C5] text-[#681219]",
//       },
//     },
//     defaultVariants: badgeVariants().defaultVariants,
//   }
// )

type CustomVariant = "success" | "danger";
type BricksBadgeProps = Omit<React.ComponentProps<typeof Badge>, 'variant'> & {
  variant?: React.ComponentProps<typeof Badge>['variant'] | CustomVariant;
};

function BricksBadge({
  className,
  children,
  variant,
  ...props
}: BricksBadgeProps) {
  // Determine if we're using a custom bricks variant
  const isBricksVariant = variant === "success" || variant === "danger";
  
  return (
    <Badge
      className={cn(
        "rounded-full", 
        isBricksVariant && bricksBadgeVariants({ variant: variant as CustomVariant }),
        className
      )}
      // Only pass variant to Badge if it's not a bricks variant
      variant={isBricksVariant ? undefined : variant as React.ComponentProps<typeof Badge>['variant']}
      {...props}
    >
      {children}
    </Badge>
  )
}

export { BricksBadge }
