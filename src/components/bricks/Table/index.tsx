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
    <div className="relative w-full overflow-auto max-h-[600px]">
      <ShadcnTable className="w-full">
        <ShadcnTableHeader className="sticky top-0 z-10 bg-neutral-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <ShadcnTableRow
              key={headerGroup.id}
              className="hover:bg-transparent border-none"
            >
              {showCheckboxes && (
                <ShadcnTableHead
                  key="checkbox-header"
                  className="w-12 align-middle p-0"
                >
                  <ShadcnTableCell
                    key="checkbox-cell"
                    className="w-12 h-16 align-middle px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center items-center h-full">
                      {renderCheckbox()}
                    </div>
                  </ShadcnTableCell>
                </ShadcnTableHead>
              )}
              {headerGroup.headers.map((header, index) => {
                const isFirstDataColumn = index === 0;
                return (
                  <ShadcnTableHead
                    key={header.id}
                    className={cn(
                      "h-16 align-middle p-0",
                      isFirstDataColumn && showCheckboxes ? "w-[300px]" : ""
                    )}
                  >
                    <ShadcnTableCell
                      className={cn(
                        "h-full flex items-center px-3 py-2 text-neutral-600 text-sm font-normal",
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="truncate">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        
                        {/* SORT */}
                        {header.column.getIsSorted() ? (
                          <span className="flex-shrink-0 flex items-center text-neutral-600">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        ) : header.column.getCanSort() ? (
                          <span className="flex-shrink-0 flex items-center text-neutral-600">
                            <ChevronsUpDownIcon className="h-4 w-4" />
                          </span>
                        ) : null}
                      </span>
                    </ShadcnTableCell>
                  </ShadcnTableHead>
                );
              })}
            </ShadcnTableRow>
          ))}
        </ShadcnTableHeader>

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
                        className="w-12 h-16 align-middle px-3 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-center items-center h-full">
                          {renderCheckbox(row)}
                        </div>
                      </ShadcnTableCell>
                    )}
                    {row.getVisibleCells().map((cell) => {
                      const isActionCell = cell.column.id === "actions";
                      const isStageCell = cell.column.id === "stage";
                      const isFirstDataCell = cell.column.id === columns[0].id;

                      let cellClassName = "h-16 align-middle";

                      if (isStageCell) {
                        cellClassName = cn(cellClassName, "p-3");
                      } else {
                        cellClassName = cn(cellClassName, "pl-3 pr-5 py-3");
                      }

                      if (isFirstDataCell && showCheckboxes) {
                        cellClassName = cn(cellClassName, "w-[300px]");
                      }

                      return (
                        <ShadcnTableCell
                          key={cell.id}
                          className={cellClassName}
                          onClick={
                            isActionCell
                              ? (e) => e.stopPropagation()
                              : undefined
                          }
                        >
                          <div
                            className={cn(
                              isStageCell
                                ? "flex justify-center items-center h-full"
                                : ""
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
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
      </ShadcnTable>
    </div>
  );
}
