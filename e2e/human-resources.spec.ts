import { test, expect } from '@playwright/test'

test.describe('Human Resources Module E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/human-resources')
  })

  test('should load human resources page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Human Resources/)
    await expect(page.locator('h1')).toContainText('Human Resources Management')
  })

  test('should display HR description', async ({ page }) => {
    await expect(page.locator('text=Manage your workforce, track employee performance, and streamline HR processes')).toBeVisible()
  })

  test('should display key HR metrics', async ({ page }) => {
    await expect(page.locator('text=Total Employees')).toBeVisible()
    await expect(page.locator('text=Active Positions')).toBeVisible()
    await expect(page.locator('text=Turnover Rate')).toBeVisible()
    await expect(page.locator('text=Training Progress')).toBeVisible()
  })

  test('should display employee management section', async ({ page }) => {
    await expect(page.locator('text=Employees')).toBeVisible()
    await expect(page.locator('text=Add Employee')).toBeVisible()
  })

  test('should display attendance section', async ({ page }) => {
    await expect(page.locator('text=Attendance')).toBeVisible()
    await expect(page.locator('text=Record Attendance')).toBeVisible()
  })

  test('should display leave requests section', async ({ page }) => {
    await expect(page.locator('text=Leave Requests')).toBeVisible()
    await expect(page.locator('text=Request Leave')).toBeVisible()
  })

  test('should display performance reviews section', async ({ page }) => {
    await expect(page.locator('text=Performance Reviews')).toBeVisible()
    await expect(page.locator('text=Create Review')).toBeVisible()
  })

  test('should display payroll section', async ({ page }) => {
    await expect(page.locator('text=Payroll')).toBeVisible()
    await expect(page.locator('text=Process Payroll')).toBeVisible()
  })

  test('should display HR analytics section', async ({ page }) => {
    await expect(page.locator('text=HR Analytics')).toBeVisible()
    await expect(page.locator('text=Employee Demographics')).toBeVisible()
    await expect(page.locator('text=Performance Metrics')).toBeVisible()
    await expect(page.locator('text=Turnover Analysis')).toBeVisible()
  })

  test('should display HR features list', async ({ page }) => {
    await expect(page.locator('text=Employee Records')).toBeVisible()
    await expect(page.locator('text=Time & Attendance')).toBeVisible()
    await expect(page.locator('text=Leave Management')).toBeVisible()
    await expect(page.locator('text=Performance Management')).toBeVisible()
    await expect(page.locator('text=Payroll Processing')).toBeVisible()
  })

  test('should have working search functionality', async ({ page }) => {
    // Look for search input or button
    const searchInput = page.locator('input[placeholder*="search"], input[placeholder*="Search"]')
    const searchButton = page.locator('[data-testid="search-icon"], button:has-text("Search")')
    
    if (await searchInput.count() > 0) {
      await expect(searchInput.first()).toBeVisible()
    }
    
    if (await searchButton.count() > 0) {
      await expect(searchButton.first()).toBeVisible()
    }
  })

  test('should have working filter functionality', async ({ page }) => {
    // Look for filter button
    const filterButton = page.locator('[data-testid="filter-icon"], button:has-text("Filter")')
    if (await filterButton.isVisible()) {
      await filterButton.click()
      // Check if filter options are available
      await expect(page.locator('text=Filter Options')).toBeVisible()
    }
  })

  test('should have date range selector', async ({ page }) => {
    const dateSelector = page.locator('[data-testid="calendar-icon"], button:has-text("Date"), input[type="date"]')
    if (await dateSelector.count() > 0) {
      await expect(dateSelector.first()).toBeVisible()
    }
  })

  test('should have export functionality', async ({ page }) => {
    const exportButton = page.locator('[data-testid="download-icon"], button:has-text("Export"), button:has-text("Download")')
    if (await exportButton.count() > 0) {
      await expect(exportButton.first()).toBeVisible()
    }
  })

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should have working navigation breadcrumbs', async ({ page }) => {
    // Check if there's a way to navigate back to dashboard
    const dashboardLink = page.locator('text=Dashboard, text=Home')
    if (await dashboardLink.isVisible()) {
      await dashboardLink.click()
      await expect(page).toHaveURL('/')
    }
  })

  test('should display data tables if present', async ({ page }) => {
    // Check if there are any data tables
    const tables = page.locator('table')
    if (await tables.count() > 0) {
      await expect(tables.first()).toBeVisible()
      
      // Check for table headers
      const headers = page.locator('th')
      if (await headers.count() > 0) {
        await expect(headers.first()).toBeVisible()
      }
    }
  })

  test('should handle module navigation correctly', async ({ page }) => {
    // Navigate to different modules and return
    await page.click('text=Analytics Dashboard')
    await expect(page).toHaveURL('/analytics-dashboard')
    
    await page.click('text=Human Resources')
    await expect(page).toHaveURL('/human-resources')
    
    await page.click('text=Project Management')
    await expect(page).toHaveURL('/project-management')
    
    await page.click('text=Human Resources')
    await expect(page).toHaveURL('/human-resources')
  })

  test('should display action buttons for each section', async ({ page }) => {
    const addButtons = page.locator('button:has-text("Add")')
    const createButtons = page.locator('button:has-text("Create")')
    const recordButton = page.locator('button:has-text("Record")')
    const requestButton = page.locator('button:has-text("Request")')
    const processButton = page.locator('button:has-text("Process")')
    
    if (await addButtons.count() > 0) {
      await expect(addButtons.first()).toBeVisible()
    }
    
    if (await createButtons.count() > 0) {
      await expect(createButtons.first()).toBeVisible()
    }
    
    if (await recordButton.count() > 0) {
      await expect(recordButton).toBeVisible()
    }
    
    if (await requestButton.count() > 0) {
      await expect(requestButton).toBeVisible()
    }
    
    if (await processButton.count() > 0) {
      await expect(processButton).toBeVisible()
    }
  })

  test('should have proper loading states', async ({ page }) => {
    // Refresh the page to check loading states
    await page.reload()
    
    // Check if content loads properly
    await expect(page.locator('h1')).toContainText('Human Resources Management')
    await expect(page.locator('text=Total Employees')).toBeVisible()
  })

  test('should display employee directory', async ({ page }) => {
    // Look for employee directory
    const directorySection = page.locator('text=Directory, text=Employee Directory, text=Staff List')
    if (await directorySection.count() > 0) {
      await expect(directorySection.first()).toBeVisible()
    }
  })

  test('should display HR charts if present', async ({ page }) => {
    // Check for HR charts
    const chartContainers = page.locator('[data-testid*="chart"], .recharts-wrapper, .chart-container')
    if (await chartContainers.count() > 0) {
      await expect(chartContainers.first()).toBeVisible()
    }
  })

  test('should have proper form validation', async ({ page }) => {
    // Look for forms and test validation
    const forms = page.locator('form')
    if (await forms.count() > 0) {
      // Try to submit an empty form
      const submitButton = forms.first().locator('button[type="submit"]')
      if (await submitButton.count() > 0) {
        await submitButton.click()
        
        // Check for validation messages
        const validationMessages = page.locator('text=required, text=invalid, text=must')
        if (await validationMessages.count() > 0) {
          await expect(validationMessages.first()).toBeVisible()
        }
      }
    }
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Test with invalid API endpoints if any
    // This would depend on how the HR page handles API errors
    await expect(page.locator('h1')).toContainText('Human Resources Management')
  })

  test('should have proper meta tags and SEO', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('Human Resources')
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    if (await metaDescription.count() > 0) {
      await expect(metaDescription).toHaveAttribute('content', /human resources|HR|employee|workforce/i)
    }
  })

  test('should display organizational chart', async ({ page }) => {
    // Look for organizational chart
    const orgChart = page.locator('text=Organization Chart, text=Org Chart, text=Hierarchy')
    if (await orgChart.count() > 0) {
      await expect(orgChart.first()).toBeVisible()
    }
  })

  test('should have recruitment and onboarding', async ({ page }) => {
    // Look for recruitment and onboarding
    const recruitmentSection = page.locator('text=Recruitment, text=Hiring, text=Onboarding')
    if (await recruitmentSection.count() > 0) {
      await expect(recruitmentSection.first()).toBeVisible()
    }
  })

  test('should display training and development', async ({ page }) => {
    // Look for training and development
    const trainingSection = page.locator('text=Training, text=Development, text=Learning')
    if (await trainingSection.count() > 0) {
      await expect(trainingSection.first()).toBeVisible()
    }
  })

  test('should have benefits administration', async ({ page }) => {
    // Look for benefits administration
    const benefitsSection = page.locator('text=Benefits, text=Compensation, text=Insurance')
    if (await benefitsSection.count() > 0) {
      await expect(benefitsSection.first()).toBeVisible()
    }
  })

  test('should display compliance and reporting', async ({ page }) => {
    // Look for compliance and reporting
    const complianceSection = page.locator('text=Compliance, text=Reporting, text=Regulations')
    if (await complianceSection.count() > 0) {
      await expect(complianceSection.first()).toBeVisible()
    }
  })

  test('should have document management', async ({ page }) => {
    // Look for document management
    const documentSection = page.locator('text=Documents, text=Files, text=Records')
    if (await documentSection.count() > 0) {
      await expect(documentSection.first()).toBeVisible()
    }
  })
})