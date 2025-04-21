import * as React from "react";
import { cn } from "@/components/shadcn/lib/utils";
import { Text } from "@/components/bricks/Text";
import {
  Select as ShadcnSelect,
  SelectContent as ShadcnSelectContent,
  SelectItem as ShadcnSelectItem,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
} from "@/components/shadcn/ui/select";

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onItemsPerPageChange: (value: number) => void;
}

export function ItemsPerPageSelector({
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageChange,
}: ItemsPerPageSelectorProps) {
  return (
    <ShadcnSelect
      value={itemsPerPage.toString()}
      onValueChange={(value: string) => onItemsPerPageChange(parseInt(value, 10))}
    >
      <ShadcnSelectTrigger className="h-[32px] w-full px-2.5 py-1.5 bg-neutral-0 border border-neutral-200 rounded-lg text-[14px] font-normal shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-neutral-200">
        <ShadcnSelectValue>
          <Text 
            text={`${itemsPerPage} / page`} 
            size="sm" 
            weight="normal" 
            color="gray" 
            className="truncate pr-1"
          />
        </ShadcnSelectValue>
      </ShadcnSelectTrigger>
      <ShadcnSelectContent className="bg-neutral-0 border border-neutral-200 rounded-lg shadow-md z-10">
        {itemsPerPageOptions.map((option) => (
          <ShadcnSelectItem
            key={option}
            value={option.toString()}
            className={cn(
              "px-3 py-1.5 hover:bg-neutral-50 cursor-pointer rounded-md pl-3 pr-2",
              itemsPerPage === option ? "bg-neutral-50" : ""
            )}
          >
            <Text 
              text={`${option} / page`} 
              size="sm" 
              weight="normal" 
              color="gray"
            />
          </ShadcnSelectItem>
        ))}
      </ShadcnSelectContent>
    </ShadcnSelect>
  );
}
