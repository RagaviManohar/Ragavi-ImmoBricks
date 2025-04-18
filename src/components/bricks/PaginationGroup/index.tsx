import * as React from "react";
import { cn } from "@/components/shadcn/lib/utils";
import { Text } from "@/components/bricks/Text";
import { Pagination } from "@/components/bricks/PaginationGroup/Pagination";
import { ItemsPerPageSelector } from "@/components/bricks/PaginationGroup/ItemsPerPageSelector";

interface PaginationGroupProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (value: number) => void;
  className?: string;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
}

export function PaginationGroup({
  currentPage,
  totalPages,
  onPageChange,
  onItemsPerPageChange,
  className,
  itemsPerPage = 10,
  itemsPerPageOptions = [10, 20, 50],
}: PaginationGroupProps) {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {/* Left side - Page indicator */}
      <div className="flex items-center py-1.5">
        <Text 
          text={`Page ${currentPage} of ${totalPages}`}
          size="sm"
          weight="normal"
          color="gray"
        />
      </div>

      {/* Center - Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {/* Right side - Items per page dropdown */}
      {onItemsPerPageChange && (
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
}
