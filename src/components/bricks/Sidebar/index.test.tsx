import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Sidebar } from './index'
import { LayoutDashboard, Settings, HelpCircle } from 'lucide-react'
import '@testing-library/jest-dom/vitest'

// Mock window.matchMedia
const mockMatchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

// Mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024,
})

describe('Sidebar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.matchMedia = mockMatchMedia
  })

  const defaultProps = {
    header: {
      title: 'Test Header',
      description: 'Test Description'
    },
    mainNavItems: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings
      }
    ],
    bottomNavItems: [
      {
        title: 'Help',
        href: '/help',
        icon: HelpCircle
      }
    ],
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      initials: 'JD',
      avatarColor: '#006E6E'
    }
  }

  it('should render with required props', () => {
    render(<Sidebar {...defaultProps} />)
    
    // Check header content
    expect(screen.getByText(defaultProps.header.title)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.header.description)).toBeInTheDocument()
    
    // Check navigation items
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Help')).toBeInTheDocument()
    
    // Check user section
    expect(screen.getByText(defaultProps.user.name)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.user.email)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.user.initials)).toBeInTheDocument()
  })

  it('should handle open state correctly', () => {
    const onOpenChange = vi.fn()
    render(
      <Sidebar {...defaultProps} isOpen={false} onOpenChange={onOpenChange} />
    )

    // Should open on mouse enter when closed
    const sidebarWrapper = screen.getByTestId('sidebar-wrapper')
    act(() => {
      fireEvent.mouseEnter(sidebarWrapper)
    })
    expect(onOpenChange).toHaveBeenCalledWith(true)

    // Should close on mouse leave after delay when opened by hover
    act(() => {
      fireEvent.mouseLeave(sidebarWrapper)
      vi.advanceTimersByTime(300)
    })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should maintain open state when isOpen prop is true', () => {
    const onOpenChange = vi.fn()
    const { container } = render(
      <Sidebar {...defaultProps} isOpen={true} onOpenChange={onOpenChange} />
    )
    
    const sidebar = container.querySelector('[style*="width: 275px"]')
    expect(sidebar).toBeInTheDocument()

    // Should not close on mouse leave when isOpen is true
    act(() => {
      fireEvent.mouseLeave(container.firstChild as Element)
      vi.runAllTimers()
    })
    expect(onOpenChange).not.toHaveBeenCalledWith(false)
  })

  it('should show/hide content based on open state', () => {
    const { rerender } = render(
      <Sidebar {...defaultProps} isOpen={true} />
    )
    
    // When open
    expect(screen.getByText(defaultProps.header.description)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.user.email)).toBeInTheDocument()

    // When closed
    rerender(<Sidebar {...defaultProps} isOpen={false} />)
    expect(screen.queryByText(defaultProps.header.description)).not.toBeInTheDocument()
    expect(screen.queryByText(defaultProps.user.email)).not.toBeInTheDocument()
  })

  it('should render user avatar with correct color', () => {
    render(<Sidebar {...defaultProps} />)
    
    const avatar = screen.getByText(defaultProps.user.initials).parentElement
    expect(avatar?.className).toContain(defaultProps.user.avatarColor?.substring(1))
  })

  it('should render with default values when optional props are not provided', () => {
    const minimalProps = {
      header: defaultProps.header,
      user: defaultProps.user
    }
    
    render(<Sidebar {...minimalProps} />)
    
    // Should render with empty nav items
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })
})
