import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

interface PaginationWrapperProps {
  initialPage?: number;
  totalPages?: number;
  disabled?: boolean;
  onPageChange?: (page: number) => void;
}

// Wrapper component to handle state within stories
const PaginationWithState = ({
  initialPage = 1,
  totalPages = 10,
  disabled = false,
  onPageChange,
}: PaginationWrapperProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Call the action function for Storybook tracking
    onPageChange?.(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      disabled={disabled}
      onPageChange={handlePageChange}
    />
  );
};

const meta = {
  title: "Bricks/PaginationGroup/Pagination",
  component: PaginationWithState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialPage: {
      control: { type: "number" },
      description: "Initial page number",
    },
    totalPages: {
      control: { type: "number" },
      description: "Total number of pages",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the pagination is disabled",
    },
    onPageChange: {
      action: "pageChanged",
      description: "Callback when page changes",
    },
  },
} satisfies Meta<typeof PaginationWithState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default pagination example
export const Default: Story = {
  args: {
    initialPage: 1,
    totalPages: 10,
  },
};

// Middle of pagination
export const MiddlePage: Story = {
  args: {
    initialPage: 5,
    totalPages: 10,
  },
};

// Last page
export const LastPage: Story = {
  args: {
    initialPage: 10,
    totalPages: 10,
  },
};

// Many pages (showing truncation with ellipsis)
export const ManyPages: Story = {
  args: {
    initialPage: 10,
    totalPages: 50,
  },
};

// Few pages (no ellipsis needed)
export const FewPages: Story = {
  args: {
    initialPage: 2,
    totalPages: 3,
  },
};

// Single page
export const SinglePage: Story = {
  args: {
    initialPage: 1,
    totalPages: 1,
  },
};

// Disabled pagination
export const Disabled: Story = {
  args: {
    initialPage: 5,
    totalPages: 10,
    disabled: true,
  },
};
