import type { Meta, StoryObj } from '@storybook/react';
import { 
  FileTextIcon, 
  GanttChartIcon, 
  ArrowLeftRightIcon, 
  WrenchIcon, 
  BuildingIcon, 
  ArrowUpDownIcon, 
  UserIcon, 
  SettingsIcon, 
  HeadphonesIcon 
} from 'lucide-react';

import { Sidebar } from './index';

const meta = {
  title: 'Bricks/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the sidebar is open or collapsed',
    },
    mainNavItems: {
      control: 'object',
      description: 'Array of navigation items for the main section',
    },
    bottomNavItems: {
      control: 'object',
      description: 'Array of navigation items for the bottom section',
    },
    user: {
      control: 'object',
      description: 'User information displayed in the footer',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items
const mainNavItems = [
  {
    title: 'PDF Extraction',
    icon: FileTextIcon,
    href: '/pdf-extraction',
    isActive: true,
  },
  {
    title: 'Deal Pipeline',
    icon: GanttChartIcon,
    href: '/deal-pipeline',
  },
  {
    title: 'Due Diligence',
    icon: ArrowLeftRightIcon,
    href: '/due-diligence',
  },
  {
    title: 'Property Management',
    icon: WrenchIcon,
    href: '/property-management',
  },
  {
    title: 'Asset Management',
    icon: BuildingIcon,
    href: '/asset-management',
  },
  {
    title: 'Comparables',
    icon: ArrowUpDownIcon,
    href: '/comparables',
  },
  {
    title: 'Seller Directory',
    icon: UserIcon,
    href: '/seller-directory',
  },
];

const bottomNavItems = [
  {
    title: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
  },
  {
    title: 'Support',
    icon: HeadphonesIcon,
    href: '/support',
  },
];

const user = {
  name: 'Richard Pessall',
  email: 'sureshraja.selvaganapathy@immo.capital',
  initials: 'RP',
  avatarColor: 'bg-[#006E6E]',
};

const header = {
  title: 'Immo',
  description: 'Proptech',
};

const logo = {
  altText: 'Immo Logo',
  path: '/icons/immo-logo-1.svg',
};

export const Open: Story = {
  args: {
    isOpen: true,
    header,
    mainNavItems,
    bottomNavItems,
    user,
  },
};

export const Collapsed: Story = {
  args: {
    isOpen: false,
    header,
    mainNavItems,
    bottomNavItems,
    user,
  },
}; 