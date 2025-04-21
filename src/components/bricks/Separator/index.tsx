"use client"

import React from 'react'
import { cn } from "@/components/shadcn/lib/utils"
import { Separator as UISeparator } from "@/components/shadcn/ui/separator"

export interface SeparatorProps {
  className?: string
  isHorizontal?: boolean
  color?: string
}

/**
 * A wrapper component for the UI Separator with customizable styling
 */
export function Separator({
  className,
  isHorizontal = true,
  color = "#E1E4EA",
}: SeparatorProps) {
  return (
    <UISeparator
      className={cn(className)}
      orientation={isHorizontal ? "horizontal" : "vertical"}
      style={{ backgroundColor: color }}
    />
  )
} 