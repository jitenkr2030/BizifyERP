import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

describe('Card Components', () => {
  describe('Card', () => {
    it('should render card with content', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      )
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(
        <Card data-testid="test-card" className="custom-card">
          <div>Card content</div>
        </Card>
      )
      const card = screen.getByTestId('test-card')
      expect(card).toHaveClass('custom-card')
    })
  })

  describe('CardHeader', () => {
    it('should render card header with content', () => {
      render(
        <Card>
          <CardHeader>
            <div>Header content</div>
          </CardHeader>
        </Card>
      )
      expect(screen.getByText('Header content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(
        <Card>
          <CardHeader data-testid="test-header" className="custom-header">
            <div>Header content</div>
          </CardHeader>
        </Card>
      )
      const header = screen.getByTestId('test-header')
      expect(header).toHaveClass('custom-header')
    })
  })

  describe('CardTitle', () => {
    it('should render card title with content', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      )
      const title = screen.getByText('Card Title')
      expect(title).toBeInTheDocument()
      expect(title.tagName).toBe('DIV')
    })

    it('should apply custom className', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle data-testid="test-title" className="custom-title">Card Title</CardTitle>
          </CardHeader>
        </Card>
      )
      const title = screen.getByTestId('test-title')
      expect(title).toHaveClass('custom-title')
    })
  })

  describe('CardDescription', () => {
    it('should render card description with content', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      )
      const description = screen.getByText('Card Description')
      expect(description).toBeInTheDocument()
      expect(description.tagName).toBe('DIV')
    })

    it('should apply custom className', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription data-testid="test-description" className="custom-description">Card Description</CardDescription>
          </CardHeader>
        </Card>
      )
      const description = screen.getByTestId('test-description')
      expect(description).toHaveClass('custom-description')
    })
  })

  describe('CardContent', () => {
    it('should render card content with content', () => {
      render(
        <Card>
          <CardContent>
            <div>Content</div>
          </CardContent>
        </Card>
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(
        <Card>
          <CardContent data-testid="test-content" className="custom-content">
            <div>Content</div>
          </CardContent>
        </Card>
      )
      const content = screen.getByTestId('test-content')
      expect(content).toHaveClass('custom-content')
    })
  })

  describe('CardFooter', () => {
    it('should render card footer with content', () => {
      render(
        <Card>
          <CardFooter>
            <div>Footer content</div>
          </CardFooter>
        </Card>
      )
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(
        <Card>
          <CardFooter data-testid="test-footer" className="custom-footer">
            <div>Footer content</div>
          </CardFooter>
        </Card>
      )
      const footer = screen.getByTestId('test-footer')
      expect(footer).toHaveClass('custom-footer')
    })
  })

  it('should render complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div>Main Content</div>
        </CardContent>
        <CardFooter>
          <div>Footer Content</div>
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Main Content')).toBeInTheDocument()
    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })
})