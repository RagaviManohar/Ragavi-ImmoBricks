import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TitleWithSubText } from './index'
import '@testing-library/jest-dom/vitest'

describe('TitleWithSubText', () => {
  const defaultProps = {
    title: 'Test Title',
    subText: 'Test Subtext'
  }

  it('renders with required props', () => {
    render(<TitleWithSubText {...defaultProps} />)
    
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.subText)).toBeInTheDocument()
  })

  it('applies default classes to title and subtext', () => {
    render(<TitleWithSubText {...defaultProps} />)
    
    const titleElement = screen.getByText(defaultProps.title)
    const subtextElement = screen.getByText(defaultProps.subText)

    expect(titleElement).toHaveClass('text-sm', 'font-medium', 'leading-tight', 'break-words', 'text-neutral-950')
    expect(subtextElement).toHaveClass('text-xs', 'pt-1', 'leading-tight', 'break-words', 'text-neutral-600')
  })

  it('applies custom className to title when provided', () => {
    const customTitleClass = 'custom-title-class'
    render(
      <TitleWithSubText 
        {...defaultProps} 
        titleClassName={customTitleClass}
      />
    )
    
    const titleElement = screen.getByText(defaultProps.title)
    expect(titleElement).toHaveClass(customTitleClass)
  })

  it('applies custom className to subtext when provided', () => {
    const customSubTextClass = 'custom-subtext-class'
    render(
      <TitleWithSubText 
        {...defaultProps} 
        subTextClassName={customSubTextClass}
      />
    )
    
    const subtextElement = screen.getByText(defaultProps.subText)
    expect(subtextElement).toHaveClass(customSubTextClass)
  })

  it('renders long text content correctly', () => {
    const longProps = {
      title: 'This is a very long title that should still be displayed properly and wrap if needed',
      subText: 'This is a very long subtext that should also be displayed properly and wrap when necessary'
    }
    
    render(<TitleWithSubText {...longProps} />)
    
    expect(screen.getByText(longProps.title)).toBeInTheDocument()
    expect(screen.getByText(longProps.subText)).toBeInTheDocument()
  })
})
