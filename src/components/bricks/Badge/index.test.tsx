import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/components/ui/badge', () => ({
  Badge: ({ className, children, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) => (
    <div 
      data-testid="mocked-badge" 
      data-variant={variant} 
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
}));

vi.mock('@/lib/utils', () => ({
  cn: (...inputs: (string | boolean | undefined)[]) => inputs.filter(Boolean).join(' '),
}));

// Import after mocks
import { BricksBadge } from './index';

describe('BricksBadge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<BricksBadge>Default</BricksBadge>);
    
    const badge = screen.getByTestId('mocked-badge');
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe('Default');
    expect(badge.className).toContain('rounded-full border-transparent font-small');
    expect(badge.getAttribute('data-variant')).toBeNull();
  });

  test('renders with success variant', () => {
    render(<BricksBadge variant="success">Success</BricksBadge>);
    
    const badge = screen.getByTestId('mocked-badge');
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe('Success');
    expect(badge.className).toContain('bg-success text-success-foreground');
    expect(badge.getAttribute('data-variant')).toBeNull(); // Custom variant not passed through
  });

  test('renders with danger variant', () => {
    render(<BricksBadge variant="danger">Danger</BricksBadge>);
    
    const badge = screen.getByTestId('mocked-badge');
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe('Danger');
    expect(badge.className).toContain('bg-danger text-danger-foreground');
    expect(badge.getAttribute('data-variant')).toBeNull(); // Custom variant not passed through
  });

  test('renders with standard Badge variant', () => {
    render(<BricksBadge variant="secondary">Secondary</BricksBadge>);
    
    const badge = screen.getByTestId('mocked-badge');
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe('Secondary');
    expect(badge.getAttribute('data-variant')).toBe('secondary');
  });

  test('renders with custom className', () => {
    render(<BricksBadge className="custom-class">With Custom Class</BricksBadge>);
    
    const badge = screen.getByTestId('mocked-badge');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('custom-class');
  });

  test('passes additional props to Badge component', () => {
    render(
      <BricksBadge data-testprop="test-value">
        With Additional Props
      </BricksBadge>
    );
    
    const badge = screen.getByTestId('mocked-badge');
    expect(badge).toBeDefined();
    expect(badge.getAttribute('data-testprop')).toBe('test-value');
  });
}); 