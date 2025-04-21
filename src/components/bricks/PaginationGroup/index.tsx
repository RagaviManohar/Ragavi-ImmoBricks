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
    <div
      className={cn(
        "w-full flex items-center justify-between gap-10",
        className
      )}
    >
      {/* Left side - Page indicator */}
      <Text
        text={`Page ${currentPage} of ${totalPages}`}
        size="sm"
        weight="normal"
        color="gray"
        className="whitespace-nowrap"
      />
      {/* Center - Pagination controls with flex-grow */}
      <div className="flex-grow">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

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
