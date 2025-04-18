import type { Meta, StoryObj } from '@storybook/react';
import { PaginationGroup } from '@/components/bricks/PaginationGroup';
import { useState } from 'react';

// Wrapper component to handle state within stories
const PaginationGroupWithState = ({
  initialPage = 1,
  totalPages = 10,
  showItemsPerPage = true,
  initialItemsPerPage = 10,
  itemsPerPageOptions = [10, 20, 50]
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  
  return (
    <PaginationGroup
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={showItemsPerPage ? setItemsPerPage : undefined}
      itemsPerPageOptions={itemsPerPageOptions}
    />
  );
};

const meta = {
  title: 'Bricks/PaginationGroup',
  component: PaginationGroupWithState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialPage: {
      control: { type: 'number' },
      description: 'Initial page number',
    },
    totalPages: {
      control: { type: 'number' },
      description: 'Total number of pages',
    },
    showItemsPerPage: {
      control: { type: 'boolean' },
      description: 'Whether to show items per page dropdown',
    },
    initialItemsPerPage: {
      control: { type: 'number' },
      description: 'Initial items per page',
    },
    itemsPerPageOptions: {
      control: { type: 'object' },
      description: 'Options for items per page',
    },
  },
} satisfies Meta<typeof PaginationGroupWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default pagination example
export const Default: Story = {
  args: {
    initialPage: 1,
    totalPages: 10,
    showItemsPerPage: true,
    initialItemsPerPage: 10,
  },
};

// Middle of pagination
export const MiddlePage: Story = {
  args: {
    initialPage: 5,
    totalPages: 10,
    showItemsPerPage: true,
    initialItemsPerPage: 10,
  },
};

// Last page
export const LastPage: Story = {
  args: {
    initialPage: 10,
    totalPages: 10,
    showItemsPerPage: true,
    initialItemsPerPage: 10,
  },
};

// Many pages (showing truncation with ellipsis)
export const ManyPages: Story = {
  args: {
    initialPage: 10,
    totalPages: 50,
    showItemsPerPage: true,
    initialItemsPerPage: 10,
  },
};

// Few pages (no ellipsis needed)
export const FewPages: Story = {
  args: {
    initialPage: 2,
    totalPages: 3,
    showItemsPerPage: true,
    initialItemsPerPage: 10,
  },
};

// Without items per page dropdown
export const WithoutItemsPerPage: Story = {
  args: {
    initialPage: 2,
    totalPages: 10,
    showItemsPerPage: false,
  },
};

// Custom items per page options
export const CustomItemsPerPageOptions: Story = {
  args: {
    initialPage: 2,
    totalPages: 10,
    showItemsPerPage: true,
    initialItemsPerPage: 10,
    itemsPerPageOptions: [5, 10, 25, 100],
  },
}; 