import * as React from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/components/shadcn/lib/utils";
import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/shadcn/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

// Navigation button component to reduce repetition
interface NavigationButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  isDisabled: boolean;
  disabled: boolean;
  className: string;
}

const NavigationButton = ({
  icon,
  onClick,
  ariaLabel,
  isDisabled,
  disabled,
  className,
}: NavigationButtonProps) => {
  // Combined disabled state
  const isButtonDisabled = disabled || isDisabled;

  return (
    <PaginationItem>
      <PaginationLink
        className={className}
        onClick={() => !disabled && onClick()}
        aria-label={ariaLabel}
        aria-disabled={isButtonDisabled}
        tabIndex={isButtonDisabled ? -1 : undefined}
        style={{
          opacity: isButtonDisabled ? 0.5 : 1,
          pointerEvents: isButtonDisabled ? "none" : "auto",
        }}
      >
        {icon}
      </PaginationLink>
    </PaginationItem>
  );
};

// Generate array of page numbers to display
export const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pageNumbers = [];

  // Always show first page
  pageNumbers.push(1);

  // Calculate start and end of visible pages
  let startPage = Math.max(2, currentPage - 2);
  let endPage = Math.min(totalPages - 1, currentPage + 2);

  // Adjust to show 5 page numbers if possible
  if (endPage - startPage < 4) {
    if (startPage === 2) {
      endPage = Math.min(totalPages - 1, startPage + 4);
    } else if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - 4);
    }
  }

  // Add ellipsis after first page if needed
  if (startPage > 2) {
    pageNumbers.push("ellipsis-start");
  }

  // Add middle pages
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis before last page if needed
  if (endPage < totalPages - 1) {
    pageNumbers.push("ellipsis-end");
  }

  // Always show last page if more than one page
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  // Common button style classes
  const buttonClasses =
    "flex items-center justify-center p-1.5 rounded-lg bg-neutral-0 border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50";
  const navigationButtonClasses = `${buttonClasses} border-none ${
    !disabled ? "cursor-pointer" : ""
  }`;

  return (
    <BasePagination className="mx-0 flex items-center justify-center">
      <PaginationContent className="flex flex-row items-center gap-2">
        {/* First page button */}
        <NavigationButton
          icon={<ChevronsLeft size={16} />}
          onClick={() => onPageChange(1)}
          ariaLabel="Go to first page"
          isDisabled={currentPage === 1}
          disabled={disabled}
          className={navigationButtonClasses}
        />

        {/* Previous page button */}
        <NavigationButton
          icon={<ChevronLeft size={16} />}
          onClick={() => onPageChange(currentPage - 1)}
          ariaLabel="Go to previous page"
          isDisabled={currentPage === 1}
          disabled={disabled}
          className={navigationButtonClasses}
        />

        {/* Page numbers */}
        {getPageNumbers(currentPage, totalPages).map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="flex items-center justify-center w-[32px] h-[32px] p-1.5 text-[14px] font-medium text-neutral-600" />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === page}
                className={cn(
                  "flex items-center justify-center w-[32px] h-[32px] p-1.5 rounded-lg text-[14px] font-medium text-neutral-600 border",
                  currentPage === page
                    ? "bg-neutral-50 border-neutral-200"
                    : "bg-neutral-0 border-neutral-200 hover:bg-neutral-50",
                  disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                )}
                onClick={() => !disabled && onPageChange(Number(page))}
                aria-label={`Go to page ${page}`}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}
                style={disabled ? { pointerEvents: "none" } : {}}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next page button */}
        <NavigationButton
          icon={<ChevronRight size={16} />}
          onClick={() => onPageChange(currentPage + 1)}
          ariaLabel="Go to next page"
          isDisabled={currentPage === totalPages}
          disabled={disabled}
          className={navigationButtonClasses}
        />

        {/* Last page button */}
        <NavigationButton
          icon={<ChevronsRight size={16} />}
          onClick={() => onPageChange(totalPages)}
          ariaLabel="Go to last page"
          isDisabled={currentPage === totalPages}
          disabled={disabled}
          className={navigationButtonClasses}
        />
      </PaginationContent>
    </BasePagination>
  );
}
