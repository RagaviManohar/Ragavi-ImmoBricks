import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Table, BricksColumnDef } from "@/components/bricks/Table";
import { BricksBadge } from "@/components/bricks/Badge";
import { TableRowText } from "@/components/bricks/TableRowText";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";

export type Lead = {
  id: string;
  name: string;
  location: string;
  stage: "New" | "Processing" | "Expired";
  market: string;
  marketSubtext?: string;
  units: number;
  added: string;
};

const defaultData: Lead[] = [
  {
    id: "4170",
    name: "Hafecity Komplex",
    location: "Hamburg",
    stage: "New",
    market: "Germany",
    marketSubtext: "subtext?",
    units: 120,
    added: "Jul 26, 2025",
  },
  {
    id: "4171",
    name: "Hafecity Komplex",
    location: "Hamburg",
    stage: "Expired",
    market: "Germany",
    marketSubtext: "subtext?",
    units: 120,
    added: "Jul 26, 2025",
  },
  {
    id: "4172",
    name: "Hafecity Komplex",
    location: "Hamburg", 
    stage: "New",
    market: "Germany",
    marketSubtext: "subtext?",
    units: 120,
    added: "Jul 26, 2025",
  },
  {
    id: "4173",
    name: "Hafecity Komplex",
    location: "Hamburg",
    stage: "New",
    market: "Germany",
    marketSubtext: "subtext?",
    units: 120,
    added: "Jul 26, 2025",
  },
  {
    id: "4174",
    name: "Hafecity Komplex",
    location: "Hamburg",
    stage: "New",
    market: "Germany",
    marketSubtext: "subtext?",
    units: 120,
    added: "Jul 26, 2025",
  },
];

// Base columns without actions
const baseColumns: BricksColumnDef<Lead>[] = [
  {
    id: "name",
    header: "Lead name",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <TableRowText subText={row.original.location} text={row.original.name} />
    ),
  },
  {
    id: "leadId",
    header: "Lead ID",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <TableRowText text={`#${row.original.id}`} />
    ),
  },
  {
    id: "stage",
    header: "Stage",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => {
      const stage = row.original.stage;
      let variant: "success" | "danger" | undefined;
      
      switch (stage) {
        case "New":
          variant = "success";
          break;
        case "Expired":
          variant = "danger";
          break;
        default:
          variant = "success";
      }
      
      return (
        <BricksBadge variant={variant}>
          {stage}
        </BricksBadge>
      );
    },
  },
  {
    id: "market",
    header: "Markets",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <TableRowText subText={row.original.marketSubtext} text={row.original.market} />
    ),
  },
  {
    id: "units",
    header: "Units",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <TableRowText text={String(row.original.units)} />
    ),
  },
  {
    id: "added",
    header: "Added",
    enableSorting: false,
    cell: ({ row }: { row: Row<Lead> }) => (
      <TableRowText text={row.original.added} />
    ),
  },
];

const meta: Meta<typeof Table> = {
  title: "Bricks/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Table<Lead>>;

export const Default: Story = {
  render: () => (
    <Table<Lead>
      data={defaultData} 
      columns={baseColumns}
      onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)}
    />
  ),
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        story: 'Basic table with clickable rows. Click on a row to see details in the actions panel.'
      }
    }
  }
};

// Actions column definition
const actionsColumn: BricksColumnDef<Lead> = {
  id: "actions",
  header: "Actions",
  cell: ({ row }: { row: Row<Lead> }) => {
    const lead = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => action("View lead")(lead)}>
            View lead
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => action("View lead details")(lead)}>
            View lead details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

// Columns with actions added
const columnsWithActions: BricksColumnDef<Lead>[] = [
  ...baseColumns,
  actionsColumn
];

export const WithActions: Story = {
  render: () => (
    <Table<Lead>
      data={defaultData} 
      columns={columnsWithActions}
      onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)}
    />
  ),
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        story: 'Table with an additional actions column that provides a dropdown menu. Both rows and dropdown actions are clickable.'
      }
    }
  }
};

// Empty data array for the empty state story
const emptyData: Lead[] = [];

export const EmptyState: Story = {
  render: () => (
    <Table<Lead>
      data={emptyData}
      columns={baseColumns}
      onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with no data, showing the empty state message "No results."'
      }
    }
  }
}; 