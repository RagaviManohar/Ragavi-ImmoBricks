import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Table, BricksColumnDef } from "@/components/bricks/Table";
import { BricksBadge } from "@/components/bricks/Badge";
import { Text } from "@/components/bricks/Text";
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
    name: "Riverside Complex",
    location: "Berlin",
    stage: "New",
    market: "Germany",
    marketSubtext: "Primary Market",
    units: 150,
    added: "Aug 1, 2024",
  },
  {
    id: "4171",
    name: "Ocean View Apartments",
    location: "Lisbon",
    stage: "Expired",
    market: "Portugal",
    marketSubtext: "Coastal Region",
    units: 85,
    added: "Sep 15, 2024",
  },
  {
    id: "4172",
    name: "Mountain Ridge Villas",
    location: "Zurich", 
    stage: "Processing",
    market: "Switzerland",
    marketSubtext: "Alpine Area",
    units: 60,
    added: "Oct 20, 2024",
  },
  {
    id: "4173",
    name: "Downtown Lofts",
    location: "Paris",
    stage: "New",
    market: "France",
    marketSubtext: "City Center",
    units: 210,
    added: "Nov 5, 2024",
  },
  {
    id: "4174",
    name: "Sunset Estates",
    location: "Madrid",
    stage: "New",
    market: "Spain",
    marketSubtext: "Suburban Zone",
    units: 110,
    added: "Dec 10, 2024",
  },
];

// Base columns without actions
const baseColumns: BricksColumnDef<Lead>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Lead name",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <Text text={row.original.name} weight="medium" subText={row.original.location} />
    ),
  },
  {
    id: "leadId",
    accessorKey: "id",
    header: "Lead ID",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <Text text={`#${row.original.id}`} />
    ),
  },
  {
    id: "stage",
    accessorKey: "stage",
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
    accessorKey: "market",
    header: "Markets",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <Text text={row.original.market} subText={row.original.marketSubtext} />
    ),
  },
  {
    id: "units",
    accessorKey: "units",
    header: "Units",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <Text text={String(row.original.units)} />
    ),
  },
  {
    id: "added",
    accessorKey: "added",
    header: "Added",
    enableSorting: false,
    cell: ({ row }: { row: Row<Lead> }) => (
      <Text text={row.original.added} />
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

// New story without checkboxes enabled
export const WithoutCheckboxes: Story = {
  render: () => (
    <Table<Lead>
      data={defaultData} 
      columns={baseColumns}
      showCheckboxes={false} // Disable checkboxes
      onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)}
    />
  ),
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        story: 'Table without checkboxes.'
      }
    }
  }
};

// Actions column definition
const actionsColumn: BricksColumnDef<Lead> = {
  id: "actions",
  accessorKey: "actions",
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
        story: 'Table with an additional actions column that provides a dropdown menu.'
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

// Create a large dataset for scroll demonstration
const largeDataset: Lead[] = [
  ...defaultData,
  ...defaultData.map(item => ({ ...item, id: `5${item.id.substring(1)}` })),
  ...defaultData.map(item => ({ ...item, id: `6${item.id.substring(1)}` })),
  ...defaultData.map(item => ({ ...item, id: `7${item.id.substring(1)}` })),
  ...defaultData.map(item => ({ ...item, id: `8${item.id.substring(1)}` })),
];

export const WithVerticalScroll: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '900px' }}>
      <Table<Lead>
        data={largeDataset}
        columns={baseColumns}
        onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with many records to demonstrate vertical scrolling behavior'
      }
    }
  }
};

// Create wider columns for horizontal scroll
const wideColumns: BricksColumnDef<Lead>[] = [
  ...baseColumns,
  {
    id: "description",
    accessorKey: "id", // Reusing ID just for demo
    header: "Very Long Description Column",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <Text text={`This is a very long description for ${row.original.name} property located in ${row.original.location} with ${row.original.units} units available.`} />
    ),
  },
  {
    id: "extraDetails",
    accessorKey: "id", // Reusing ID just for demo
    header: "Additional Property Details",
    enableSorting: true,
    cell: ({ row }: { row: Row<Lead> }) => (
      <Text text={`Extra information for property #${row.original.id} in the ${row.original.marketSubtext || 'Standard'} category`} />
    ),
  },
  actionsColumn
];

export const WithHorizontalAndVerticalScroll: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '700px' }}>
      <Table<Lead>
        data={largeDataset}
        columns={wideColumns}
        onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with many records and wide columns to demonstrate both horizontal and vertical scrolling'
      }
    }
  }
};

export const CustomEmptyMessage: Story = {
  render: () => (
    <Table<Lead>
      data={emptyData}
      columns={baseColumns}
      emptyMessage="No properties found. Try adjusting your filters."
      onRowsSelected={(selectedRowIds) => action("onRowsSelected")(selectedRowIds)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with custom empty state message'
      }
    }
  }
};
