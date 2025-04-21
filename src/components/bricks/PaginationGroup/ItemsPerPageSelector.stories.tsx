import type { Meta, StoryObj } from "@storybook/react";
import { ItemsPerPageSelector } from "./ItemsPerPageSelector";
import { useState } from "react";

interface ItemsPerPageSelectorWrapperProps {
  initialItemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (value: number) => void;
}

// Wrapper component to handle state within stories
const ItemsPerPageSelectorWithState = ({
  initialItemsPerPage = 10,
  itemsPerPageOptions = [10, 20, 50],
  onItemsPerPageChange,
}: ItemsPerPageSelectorWrapperProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    // Call the action function for Storybook tracking
    onItemsPerPageChange?.(value);
  };

  return (
    <ItemsPerPageSelector
      itemsPerPage={itemsPerPage}
      itemsPerPageOptions={itemsPerPageOptions}
      onItemsPerPageChange={handleItemsPerPageChange}
    />
  );
};

const meta = {
  title: "Bricks/PaginationGroup/ItemsPerPageSelector",
  component: ItemsPerPageSelectorWithState,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    initialItemsPerPage: {
      control: { type: "number" },
      description: "Initial items per page",
    },
    itemsPerPageOptions: {
      control: { type: "object" },
      description: "Available options for items per page",
    },
    onItemsPerPageChange: {
      action: "itemsPerPageChanged",
      description: "Callback when items per page changes",
    },
  },
} satisfies Meta<typeof ItemsPerPageSelectorWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialItemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 50],
  },
};

export const CustomSelected: Story = {
  args: {
    initialItemsPerPage: 20,
    itemsPerPageOptions: [10, 20, 50],
  },
};

export const CustomOptions: Story = {
  args: {
    initialItemsPerPage: 25,
    itemsPerPageOptions: [5, 10, 25, 50, 100],
  },
};

export const ManyOptions: Story = {
  args: {
    initialItemsPerPage: 100,
    itemsPerPageOptions: [5, 10, 15, 20, 25, 30, 50, 100],
  },
};

export const FewOptions: Story = {
  args: {
    initialItemsPerPage: 5,
    itemsPerPageOptions: [5, 10],
  },
};
