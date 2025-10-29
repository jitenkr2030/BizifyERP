import { render, screen } from '@testing-library/react'
import AnalyticsDashboard from './page'

// Mock all the components that are used in the page
jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <h3 data-testid="card-title">{children}</h3>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div data-testid="card-content">{children}</div>,
  CardDescription: ({ children }: { children: React.ReactNode }) => <p data-testid="card-description">{children}</p>,
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}))

jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs">{children}</div>,
  TabsContent: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs-content">{children}</div>,
  TabsList: ({ children }: { children: React.ReactNode }) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children }: { children: React.ReactNode }) => <button data-testid="tabs-trigger">{children}</button>,
}))

jest.mock('@/components/ui/select', () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div data-testid="select">{children}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children }: { children: React.ReactNode }) => <div data-testid="select-item">{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="select-trigger">{children}</div>,
  SelectValue: ({ children }: { children: React.ReactNode }) => <div data-testid="select-value">{children}</div>,
}))

jest.mock('@/components/ui/progress', () => ({
  Progress: ({ value }: { value: number }) => <div data-testid="progress" style={{ width: `${value}%` }}>{value}%</div>,
}))

jest.mock('@/components/ui/table', () => ({
  Table: ({ children }: { children: React.ReactNode }) => <table data-testid="table">{children}</table>,
  TableHeader: ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>,
  TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
  TableHead: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
  TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
}))

jest.mock('recharts', () => ({
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div data-testid="pie-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  Bar: () => <div data-testid="bar" />,
  Pie: () => <div data-testid="pie" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
}))

jest.mock('lucide-react', () => ({
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  DollarSign: () => <div data-testid="dollar-icon" />,
  Users: () => <div data-testid="users-icon" />,
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  PieChart: () => <div data-testid="pie-chart-icon" />,
  Download: () => <div data-testid="download-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
}))

describe('AnalyticsDashboard', () => {
  it('should render the analytics dashboard heading', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Advanced Analytics Dashboard')).toBeInTheDocument()
  })

  it('should render dashboard description', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Comprehensive business intelligence and insights across all ERP modules')).toBeInTheDocument()
  })

  it('should render key performance indicators', () => {
    render(<AnalyticsDashboard />)
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('Active Users')).toBeInTheDocument()
    expect(screen.getByText('Total Orders')).toBeInTheDocument()
    expect(screen.getByText('System Health')).toBeInTheDocument()
  })

  it('should render revenue trends section', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument()
  })

  it('should render user growth section', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('User Growth')).toBeInTheDocument()
  })

  it('should render order volume section', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Order Volume')).toBeInTheDocument()
  })

  it('should render compliance overview section', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Compliance Overview')).toBeInTheDocument()
  })

  it('should have period selector', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Last 7 days')).toBeInTheDocument()
    expect(screen.getByText('Last 30 days')).toBeInTheDocument()
    expect(screen.getByText('Last 90 days')).toBeInTheDocument()
    expect(screen.getByText('Last year')).toBeInTheDocument()
  })

  it('should have refresh functionality', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Refresh')).toBeInTheDocument()
  })

  it('should render module performance tabs', () => {
    render(<AnalyticsDashboard />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Module Performance')).toBeInTheDocument()
    expect(screen.getByText('AI Insights')).toBeInTheDocument()
    expect(screen.getByText('Predictive Analytics')).toBeInTheDocument()
    expect(screen.getByText('Reports')).toBeInTheDocument()
  })

  it('should render proper icons for each section', () => {
    render(<AnalyticsDashboard />)
    
    expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument()
    expect(screen.getByTestId('dollar-icon')).toBeInTheDocument()
    expect(screen.getByTestId('users-icon')).toBeInTheDocument()
    expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart-icon')).toBeInTheDocument()
  })

  it('should have responsive layout', () => {
    render(<AnalyticsDashboard />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('should display navigation tabs', () => {
    render(<AnalyticsDashboard />)
    
    const tabs = screen.getAllByTestId('tabs-trigger')
    expect(tabs.length).toBe(5)
  })

  it('should render progress indicators', () => {
    render(<AnalyticsDashboard />)
    
    expect(screen.getByText('Progress to target:')).toBeInTheDocument()
    expect(screen.getByText('Retention Rate:')).toBeInTheDocument()
    expect(screen.getByText('Fulfillment Rate:')).toBeInTheDocument()
    expect(screen.getByText('Compliance Score:')).toBeInTheDocument()
  })

  it('should have proper data formatting', () => {
    render(<AnalyticsDashboard />)
    
    expect(screen.getByText(/Total Revenue:/)).toBeInTheDocument()
    expect(screen.getByText(/Active Users:/)).toBeInTheDocument()
    expect(screen.getByText(/Total Orders:/)).toBeInTheDocument()
    expect(screen.getByText(/System Health:/)).toBeInTheDocument()
  })
})