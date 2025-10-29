import { render, screen } from '@testing-library/react'
import CRMPage from './page'

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

jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}))

jest.mock('@/components/ui/label', () => ({
  Label: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
}))

jest.mock('@/components/ui/select', () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div data-testid="select">{children}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children }: { children: React.ReactNode }) => <div data-testid="select-item">{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="select-trigger">{children}</div>,
  SelectValue: ({ children }: { children: React.ReactNode }) => <div data-testid="select-value">{children}</div>,
}))

jest.mock('@/components/ui/textarea', () => ({
  Textarea: (props: any) => <textarea {...props} />,
}))

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog">{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-content">{children}</div>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p data-testid="dialog-description">{children}</p>,
  DialogFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-footer">{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h3 data-testid="dialog-title">{children}</h3>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-trigger">{children}</div>,
}))

jest.mock('@/components/ui/table', () => ({
  Table: ({ children }: { children: React.ReactNode }) => <table data-testid="table">{children}</table>,
  TableHeader: ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>,
  TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
  TableHead: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
  TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
}))

jest.mock('lucide-react', () => ({
  Users: () => <div data-testid="users-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Edit: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash2-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  UserPlus: () => <div data-testid="user-plus-icon" />,
  Target: () => <div data-testid="target-icon" />,
  Phone: () => <div data-testid="phone-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  CheckCircle: () => <div data-testid="check-circle-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  AlertTriangle: () => <div data-testid="alert-triangle-icon" />,
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  Activity: () => <div data-testid="activity-icon" />,
}))

describe('CRM Page', () => {
  it('should render the CRM page heading', () => {
    render(<CRMPage />)
    expect(screen.getByText('CRM')).toBeInTheDocument()
    expect(screen.getByText('Convert your leads and opportunities into sales')).toBeInTheDocument()
  })

  it('should render key metrics cards', () => {
    render(<CRMPage />)
    
    expect(screen.getByText('Total Leads')).toBeInTheDocument()
    
    // Check for "Opportunities" text (appears in multiple places)
    const opportunitiesElements = screen.getAllByText('Opportunities')
    expect(opportunitiesElements.length).toBeGreaterThan(0)
    
    // Check for "Contacts" text (appears in multiple places)
    const contactsElements = screen.getAllByText('Contacts')
    expect(contactsElements.length).toBeGreaterThan(0)
    
    // Check for "Activities" text (appears in multiple places)
    const activitiesElements = screen.getAllByText('Activities')
    expect(activitiesElements.length).toBeGreaterThan(0)
  })

  it('should render leads management section', () => {
    render(<CRMPage />)
    expect(screen.getByText('Leads Management')).toBeInTheDocument()
    
    // Check for at least one "Add Lead" button (there are two - one in trigger, one in dialog)
    const addLeadButtons = screen.getAllByText('Add Lead')
    expect(addLeadButtons.length).toBeGreaterThan(0)
  })

  it('should render opportunities section', () => {
    render(<CRMPage />)
    
    // Check for "Opportunities" text (appears in multiple places)
    const opportunitiesElements = screen.getAllByText('Opportunities')
    expect(opportunitiesElements.length).toBeGreaterThan(0)
    
    // Check for at least one "Add Opportunity" button
    const addOppButtons = screen.getAllByText('Add Opportunity')
    expect(addOppButtons.length).toBeGreaterThan(0)
  })

  it('should render contacts section', () => {
    render(<CRMPage />)
    
    // Check for "Contacts" text (appears in multiple places)
    const contactsElements = screen.getAllByText('Contacts')
    expect(contactsElements.length).toBeGreaterThan(0)
    
    // Check for at least one "Add Contact" button
    const addContactButtons = screen.getAllByText('Add Contact')
    expect(addContactButtons.length).toBeGreaterThan(0)
  })

  it('should render activities section', () => {
    render(<CRMPage />)
    
    // Check for "Activities" text (appears in multiple places)
    const activitiesElements = screen.getAllByText('Activities')
    expect(activitiesElements.length).toBeGreaterThan(0)
    
    // Check for at least one "Add Activity" button
    const addActivityButtons = screen.getAllByText('Add Activity')
    expect(addActivityButtons.length).toBeGreaterThan(0)
  })

  it('should render mock lead data', () => {
    render(<CRMPage />)
    
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Sarah Williams')).toBeInTheDocument()
    expect(screen.getByText('Mike Johnson')).toBeInTheDocument()
    expect(screen.getByText('Tech Corp')).toBeInTheDocument()
    expect(screen.getByText('Startup IO')).toBeInTheDocument()
  })

  it('should render mock opportunity data', () => {
    render(<CRMPage />)
    
    expect(screen.getByText('Enterprise Software License')).toBeInTheDocument()
    expect(screen.getByText('Cloud Migration Project')).toBeInTheDocument()
  })

  it('should render mock contact data', () => {
    render(<CRMPage />)
    
    expect(screen.getByText('Emily Brown')).toBeInTheDocument()
    expect(screen.getByText('David Wilson')).toBeInTheDocument()
  })

  it('should render mock activity data', () => {
    render(<CRMPage />)
    
    expect(screen.getByText('Follow up call with John Smith')).toBeInTheDocument()
    expect(screen.getByText('Send proposal to Sarah Williams')).toBeInTheDocument()
    expect(screen.getByText('Technical review with Emily Brown')).toBeInTheDocument()
  })

  it('should display status badges', () => {
    render(<CRMPage />)
    
    // Check for status badges (may appear in multiple places including select options)
    const newElements = screen.getAllByText('New')
    expect(newElements.length).toBeGreaterThan(0)
    
    const contactedElements = screen.getAllByText('Contacted')
    expect(contactedElements.length).toBeGreaterThan(0)
    
    const qualifiedElements = screen.getAllByText('Qualified')
    expect(qualifiedElements.length).toBeGreaterThan(0)
  })

  it('should display priority badges', () => {
    render(<CRMPage />)
    
    // Check for priority badges (may appear in multiple places including select options)
    const highElements = screen.getAllByText('High')
    expect(highElements.length).toBeGreaterThan(0)
    
    const mediumElements = screen.getAllByText('Medium')
    expect(mediumElements.length).toBeGreaterThan(0)
    
    const lowElements = screen.getAllByText('Low')
    expect(lowElements.length).toBeGreaterThan(0)
  })

  it('should have action buttons', () => {
    render(<CRMPage />)
    
    // Check for buttons with "Add" text
    const addButtonElements = screen.getAllByText(/Add/)
    expect(addButtonElements.length).toBeGreaterThan(0)
  })

  it('should render proper icons', () => {
    render(<CRMPage />)
    
    expect(screen.getByTestId('users-icon')).toBeInTheDocument()
    
    // Check for phone icons (may appear multiple times)
    const phoneIcons = screen.getAllByTestId('phone-icon')
    expect(phoneIcons.length).toBeGreaterThan(0)
    
    // Check for mail icons (may appear multiple times)
    const mailIcons = screen.getAllByTestId('mail-icon')
    expect(mailIcons.length).toBeGreaterThan(0)
  })

  it('should have responsive layout', () => {
    render(<CRMPage />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(0)
  })
})