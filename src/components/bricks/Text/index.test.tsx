import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Text } from '@/components/bricks/Text';

// Mock the cn utility function
vi.mock('@/lib/utils', () => ({
  cn: (...inputs: (string | boolean | undefined)[]) => inputs.filter(Boolean).join(' '),
}));

describe('Text', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<Text text="Main Text" />);
    
    const mainText = screen.getByText('Main Text');
    expect(mainText).toBeDefined();
    // No subtext should be present
    expect(screen.queryByText('Subtext')).toBeNull();
  });

  test('renders with subtext', () => {
    render(<Text text="Main Text" subText="Subtext" />);
    
    const mainText = screen.getByText('Main Text');
    const subText = screen.getByText('Subtext');
    expect(mainText).toBeDefined();
    expect(subText).toBeDefined();
  });

  test('applies correct size classes for main text', () => {
    const { rerender } = render(<Text text="Size XS" size="xs" />);
    let mainText = screen.getByText('Size XS');
    expect(mainText.className).toContain('text-xs');
    
    rerender(<Text text="Size SM" size="sm" />);
    mainText = screen.getByText('Size SM');
    expect(mainText.className).toContain('text-sm');
    
    rerender(<Text text="Size MD" size="md" />);
    mainText = screen.getByText('Size MD');
    expect(mainText.className).toContain('text-base');
    
    rerender(<Text text="Size LG" size="lg" />);
    mainText = screen.getByText('Size LG');
    expect(mainText.className).toContain('text-lg');
  });

  test('applies correct weight classes for main text', () => {
    const { rerender } = render(<Text text="Normal Weight" weight="normal" />);
    let mainText = screen.getByText('Normal Weight');
    expect(mainText.className).toContain('font-normal');
    
    rerender(<Text text="Medium Weight" weight="medium" />);
    mainText = screen.getByText('Medium Weight');
    expect(mainText.className).toContain('font-medium');
    
    rerender(<Text text="Semibold Weight" weight="semibold" />);
    mainText = screen.getByText('Semibold Weight');
    expect(mainText.className).toContain('font-semibold');
    
    rerender(<Text text="Bold Weight" weight="bold" />);
    mainText = screen.getByText('Bold Weight');
    expect(mainText.className).toContain('font-bold');
  });

  test('applies correct color classes for main text', () => {
    const { rerender } = render(<Text text="Black Text" color="black" />);
    let mainText = screen.getByText('Black Text');
    expect(mainText.className).toContain('text-neutral-950');
    
    rerender(<Text text="Gray Text" color="gray" />);
    mainText = screen.getByText('Gray Text');
    expect(mainText.className).toContain('text-neutral-600');
  });

  test('applies correct size classes for subtext', () => {
    const { rerender } = render(<Text text="Main" subText="Size XS" subTextSize="xs" />);
    let subText = screen.getByText('Size XS');
    expect(subText.className).toContain('text-xs');
    
    rerender(<Text text="Main" subText="Size SM" subTextSize="sm" />);
    subText = screen.getByText('Size SM');
    expect(subText.className).toContain('text-sm');
    
    rerender(<Text text="Main" subText="Size MD" subTextSize="md" />);
    subText = screen.getByText('Size MD');
    expect(subText.className).toContain('text-base');
    
    rerender(<Text text="Main" subText="Size LG" subTextSize="lg" />);
    subText = screen.getByText('Size LG');
    expect(subText.className).toContain('text-lg');
  });

  test('applies correct weight classes for subtext', () => {
    const { rerender } = render(<Text text="Main" subText="Normal Weight" subTextWeight="normal" />);
    let subText = screen.getByText('Normal Weight');
    expect(subText.className).toContain('font-normal');
    
    rerender(<Text text="Main" subText="Medium Weight" subTextWeight="medium" />);
    subText = screen.getByText('Medium Weight');
    expect(subText.className).toContain('font-medium');
    
    rerender(<Text text="Main" subText="Semibold Weight" subTextWeight="semibold" />);
    subText = screen.getByText('Semibold Weight');
    expect(subText.className).toContain('font-semibold');
    
    rerender(<Text text="Main" subText="Bold Weight" subTextWeight="bold" />);
    subText = screen.getByText('Bold Weight');
    expect(subText.className).toContain('font-bold');
  });

  test('applies correct color classes for subtext', () => {
    const { rerender } = render(<Text text="Main" subText="Black Text" subTextColor="black" />);
    let subText = screen.getByText('Black Text');
    expect(subText.className).toContain('text-neutral-950');
    
    rerender(<Text text="Main" subText="Gray Text" subTextColor="gray" />);
    subText = screen.getByText('Gray Text');
    expect(subText.className).toContain('text-neutral-600');
  });

  test('applies custom className to main text', () => {
    render(<Text text="Main Text" className="custom-class" />);
    const mainText = screen.getByText('Main Text');
    expect(mainText.className).toContain('custom-class');
  });

  test('passes additional props to container div', () => {
    render(<Text text="Main Text" data-testid="test-container" />);
    const container = screen.getByTestId('test-container');
    expect(container).toBeDefined();
    expect(container.className).toContain('flex flex-col');
  });

  test('outer container has flex flex-col class', () => {
    render(<Text text="Main Text" />);
    const mainText = screen.getByText('Main Text');
    const container = mainText.parentElement;
    expect(container?.className).toContain('flex flex-col');
  });

  test('combines all classnames correctly for main text', () => {
    render(<Text 
      text="Styled Text" 
      size="lg" 
      weight="bold" 
      color="black" 
      className="custom-class" 
    />);
    
    const mainText = screen.getByText('Styled Text');
    
    expect(mainText.className).toContain('text-lg');
    expect(mainText.className).toContain('font-bold');
    expect(mainText.className).toContain('text-neutral-950');
    expect(mainText.className).toContain('custom-class');
  });

  test('combines all classnames correctly for subtext', () => {
    render(<Text 
      text="Main" 
      subText="Styled Subtext" 
      subTextSize="md" 
      subTextWeight="semibold" 
      subTextColor="black" 
    />);
    
    const subText = screen.getByText('Styled Subtext');
    
    expect(subText.className).toContain('text-base');
    expect(subText.className).toContain('font-semibold');
    expect(subText.className).toContain('text-neutral-950');
  });
}); 