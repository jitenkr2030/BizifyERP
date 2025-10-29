import { render, screen } from '@testing-library/react'
import Home from './page'

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

jest.mock('lucide-react', () => ({
  Building2: () => <div data-testid="building2-icon" />,
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />,
  Package: () => <div data-testid="package-icon" />,
  Wallet: () => <div data-testid="wallet-icon" />,
  Users: () => <div data-testid="users-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  Wrench: () => <div data-testid="wrench-icon" />,
  Truck: () => <div data-testid="truck-icon" />,
  Briefcase: () => <div data-testid="briefcase-icon" />,
  RefreshCw: () => <div data-testid="refresh-cw-icon" />,
  Network: () => <div data-testid="network-icon" />,
  UserCheck: () => <div data-testid="user-check-icon" />,
  Box: () => <div data-testid="box-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  Star: () => <div data-testid="star-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Rocket: () => <div data-testid="rocket-icon" />,
  Crown: () => <div data-testid="crown-icon" />,
  File: () => <div data-testid="file-icon" />,
  BookOpen: () => <div data-testid="book-open-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  Brain: () => <div data-testid="brain-icon" />,
  Share2: () => <div data-testid="share2-icon" />,
  FlaskConical: () => <div data-testid="flask-conical-icon" />,
}))

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />)
    expect(screen.getByText('BizifyERP')).toBeInTheDocument()
    expect(screen.getByText('All you need to run your business - A comprehensive ERP system with fully integrated modules')).toBeInTheDocument()
  })

  it('should render the stats overview', () => {
    render(<Home />)
    expect(screen.getByText('Active Modules')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Happy Customers')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('Uptime')).toBeInTheDocument()
    expect(screen.getByText('99.9%')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
  })

  it('should render pricing section', () => {
    render(<Home />)
    expect(screen.getByText('Choose Your Plan')).toBeInTheDocument()
    expect(screen.getByText('Start with our free plan and scale as your business grows')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Basic')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('should render call to action buttons', () => {
    render(<Home />)
    expect(screen.getAllByText('Start Free Trial')[0]).toBeInTheDocument()
    expect(screen.getByText('Schedule Demo')).toBeInTheDocument()
    expect(screen.getByText('No credit card required • 14-day free trial • Cancel anytime')).toBeInTheDocument()
  })

  it('should render pricing plan features', () => {
    render(<Home />)
    
    // Check Free plan features
    expect(screen.getByText('Up to 5 users')).toBeInTheDocument()
    expect(screen.getByText('1GB storage')).toBeInTheDocument()
    expect(screen.getByText('6 core modules')).toBeInTheDocument()
    
    // Check Basic plan features
    expect(screen.getByText('Up to 20 users')).toBeInTheDocument()
    expect(screen.getByText('10GB storage')).toBeInTheDocument()
    expect(screen.getByText('11 modules')).toBeInTheDocument()
    
    // Check Pro plan features
    expect(screen.getByText('Up to 100 users')).toBeInTheDocument()
    expect(screen.getByText('100GB storage')).toBeInTheDocument()
    expect(screen.getByText('25 modules')).toBeInTheDocument()
    
    // Check Enterprise plan features
    expect(screen.getByText('Unlimited users')).toBeInTheDocument()
    expect(screen.getByText('Unlimited storage')).toBeInTheDocument()
    expect(screen.getByText('All modules')).toBeInTheDocument()
  })

  it('should display most popular badge', () => {
    render(<Home />)
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('should render pricing plan CTAs', () => {
    render(<Home />)
    expect(screen.getAllByText('Get Started')).toHaveLength(1)
    expect(screen.getAllByText('Start Free Trial')).toHaveLength(4)
    expect(screen.getAllByText('Contact Sales')).toHaveLength(2)
  })
})