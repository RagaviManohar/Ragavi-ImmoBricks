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

const defaultColumns: BricksColumnDef<Lead>[] = [
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
  {
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lead.id)}
            >
              Copy lead ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View lead</DropdownMenuItem>
            <DropdownMenuItem>View lead details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
      columns={defaultColumns} 
      onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)} 
    />
  ),
  parameters: {
    actions: { argTypesRegex: "^on.*" }
  }
}; 