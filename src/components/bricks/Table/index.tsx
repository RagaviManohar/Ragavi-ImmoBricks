import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
} from "lucide-react";
import { cn } from "@/components/shadcn/lib/utils";

import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableCell as ShadcnTableCell,
  TableHead as ShadcnTableHead,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
} from "@/components/shadcn/ui/table";

// More specific column definition type
export type BricksColumnDef<TData> = ColumnDef<TData> & {
  id: string;
  header: string;
  accessorKey: string; // required for sorting
  cell?: (props: { row: Row<TData> }) => React.ReactNode;
};

interface TableProps<TData> {
  data: TData[];
  columns: BricksColumnDef<TData>[];
  showCheckboxes?: boolean;
  onRowsSelected?: (selectedRowIds: string[]) => void;
  emptyMessage?: string;
}

export function Table<TData>({
  data,
  columns,
  showCheckboxes = true,
  onRowsSelected,
  emptyMessage = "No results.",
}: TableProps<TData>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Report selected row IDs when row selection changes
  React.useEffect(() => {
    if (onRowsSelected) {
      const selectedIds = Object.keys(rowSelection).map(
        (idx) => (data[parseInt(idx)] as unknown as { id: string }).id
      );
      onRowsSelected(selectedIds);
    }
  }, [rowSelection, data, onRowsSelected]);

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
  });

  // Function to render checkboxes
  const renderCheckbox = (row?: Row<TData>) => {
    if (!showCheckboxes) return null;

    if (row) {
      // Row checkbox
      return (
        <Checkbox
          className="table-checkbox cursor-pointer"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    } else {
      // Header checkbox
      return (
        <Checkbox
          className="table-checkbox cursor-pointer"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <ShadcnTable className="w-full overflow-hidden">
        {/* Fixed header table */}
        <div className="sticky top-0 z-30 w-full bg-neutral-50">
          <ShadcnTableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <ShadcnTableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-none"
              >
                {showCheckboxes && (
                  <ShadcnTableHead
                    key="checkbox-header"
                    className="px-3 py-2 align-middle bg-neutral-50"
                  >
                    {renderCheckbox()}
                  </ShadcnTableHead>
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <ShadcnTableHead
                      key={header.id}
                      className="p-0 h-auto align-middle bg-neutral-50"
                    >
                      <div
                        className={cn(
                          "px-3 py-2 text-neutral-600 text-sm font-normal flex items-center gap-1",
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getIsSorted() ? (
                          <span className="flex items-center text-neutral-600">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        ) : header.column.getCanSort() ? (
                          <span className="flex items-center text-neutral-600">
                            <ChevronsUpDownIcon className="h-4 w-4" />
                          </span>
                        ) : null}
                      </div>
                    </ShadcnTableHead>
                  );
                })}
              </ShadcnTableRow>
            ))}
          </ShadcnTableHeader>
        </div>

        {/* Scrollable body table */}
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <ShadcnTableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <ShadcnTableRow
                      data-state={row.getIsSelected() && "selected"}
                      className={cn("bg-neutral-0 border-none")}
                    >
                      {showCheckboxes && (
                        <ShadcnTableCell
                          key="checkbox-cell"
                          className="px-3 py-3 h-16 align-middle"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {renderCheckbox(row)}
                        </ShadcnTableCell>
                      )}
                      {row.getVisibleCells().map((cell) => {
                        const isActionCell = cell.column.id === "actions";

                        return (
                          <ShadcnTableCell
                            key={cell.id}
                            className="px-3 py-3 h-16 align-middle"
                            onClick={
                              isActionCell
                                ? (e) => e.stopPropagation()
                                : undefined
                            }
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </ShadcnTableCell>
                        );
                      })}
                    </ShadcnTableRow>

                    <ShadcnTableRow className="border-none">
                      <ShadcnTableCell
                        colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                        className="p-0 h-0"
                      >
                        <div className="h-[1.5px] bg-neutral-200 w-full"></div>
                      </ShadcnTableCell>
                    </ShadcnTableRow>
                  </React.Fragment>
                );
              })
            ) : (
              <ShadcnTableRow className="bg-neutral-0 rounded-b-lg border-none border-neutral-200 border-b-[1.5px]">
                <ShadcnTableCell
                  colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </ShadcnTableCell>
              </ShadcnTableRow>
            )}
          </ShadcnTableBody>
        </div>
      </ShadcnTable>
    </div>
  );
}
