import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Custom sort icon component
const SortIcon = ({ direction }: { direction: string | false }) => {
  return (
    <div className="ml-2 flex-shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 17 25"
        fill="none"
      >
        <path
          d="M16.6667 8.33333L8.33333 0L0 8.33333H16.6667Z"
          fill="var(--table-header-text)"
          opacity={!direction || direction === "asc" ? "1" : "0.4"}
        />
        <path
          d="M16.6667 16.6667L8.33333 25L0 16.6667H16.6667Z"
          fill="var(--table-header-text)"
          opacity={!direction || direction === "desc" ? "1" : "0.4"}
        />
      </svg>
    </div>
  );
};

// More specific column definition type
export type BricksColumnDef<TData> = ColumnDef<TData> & {
  id: string;
  header: string;
  // We're making these optional to accommodate action columns and others without accessors
  accessorKey?: keyof TData | string;
  cell?: (props: { row: Row<TData> }) => React.ReactNode;
  enableSorting?: boolean;
};

interface TableProps<TData> {
  data: TData[];
  columns: BricksColumnDef<TData>[];
  showCheckboxes?: boolean;
  onRowsSelected?: (selectedRowIds: string[]) => void;
}

export function Table<TData>({
  data,
  columns,
  showCheckboxes = true,
  onRowsSelected
}: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Report selected row IDs when row selection changes
  React.useEffect(() => {
    if (onRowsSelected) {
      const selectedIds = Object.keys(rowSelection).map(
        (idx) => (data[parseInt(idx)] as unknown as { id: string }).id
      );
      onRowsSelected(selectedIds);
    }
  }, [rowSelection, data, onRowsSelected]);

  // Log sorting state changes for debugging
  React.useEffect(() => {
    console.log("Current sorting state:", sorting);
  }, [sorting]);

  // Process column definitions to ensure enableSorting is explicitly set
  const processedColumns = React.useMemo(() => {
    return columns.map(col => {
      // If enableSorting is true, make sure it's explicitly set
      if (col.enableSorting) {
        return { ...col, enableSorting: true };
      }
      return col;
    });
  }, [columns]);

  const handleSortingChange = React.useCallback((updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
    console.log("Sort change triggered");
    setSorting(updaterOrValue);
  }, []);

  const table = useReactTable({
    data,
    columns: processedColumns,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableSorting: true,
  });

  // Function to render checkboxes
  const renderCheckbox = (row?: Row<TData>) => {
    if (!showCheckboxes) return null;

    if (row) {
      // Row checkbox
      return (
        <Checkbox
          className="table-checkbox"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    } else {
      // Header checkbox
      return (
        <Checkbox
          className="table-checkbox"
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
    <div className="w-full">
      <div className="rounded-md border">
        <TableUI>
          <TableHeader className="bg-[var(--table-header-bg)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-[var(--table-divider)] hover:bg-transparent">
                {showCheckboxes && (
                  <TableHead key="checkbox-header" className="w-12 px-3 py-2 h-auto">
                    {renderCheckbox()}
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => {
                  // Check if this column has explicit enableSorting property
                  const columnDef = header.column.columnDef as BricksColumnDef<TData>;

                  // Also use TanStack's built-in API
                  const canSort = header.column.getCanSort();
                  
                  // Show sort controls if either condition is true
                  const showSortControls = columnDef.enableSorting || canSort;

                  // Current sort direction
                  const sortDirection = header.column.getIsSorted();
                  
                  return (
                    <TableHead 
                      key={header.id} 
                      className="p-0 h-auto"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`
                            px-3 py-2 font-inter text-[14px] font-normal text-[var(--table-header-text)] leading-[1.428] tracking-[-0.6%]
                            ${showSortControls ? "cursor-pointer select-none flex items-center" : "flex"}
                          `}
                          onClick={showSortControls 
                            ? () => {
                                console.log(`Sorting clicked for column: ${header.id}`);
                                header.column.toggleSorting();
                              }
                            : undefined
                          }
                        >
                          <span className="flex-grow">{flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}</span>
                          {showSortControls && (
                            <span 
                              onClick={(e) => {
                                if (showSortControls) {
                                  e.stopPropagation();
                                  console.log(`Icon clicked for column: ${header.id}`);
                                  header.column.toggleSorting();
                                }
                              }}
                              className="ml-2 flex-shrink-0"
                            >
                              <SortIcon direction={sortDirection} />
                            </span>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-transparent"
                  >
                    {showCheckboxes && (
                      <TableCell key="checkbox-cell" className="w-12 px-3 py-2">
                        {renderCheckbox(row)}
                      </TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} className="px-3 py-3 h-16">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {rowIndex < table.getRowModel().rows.length - 1 && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell 
                        colSpan={columns.length + (showCheckboxes ? 1 : 0)} 
                        className="p-0 h-[1px]"
                      >
                        <div className="h-[1px] w-full bg-[var(--table-divider)]"></div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showCheckboxes ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableUI>
      </div>
    </div>
  );
}
