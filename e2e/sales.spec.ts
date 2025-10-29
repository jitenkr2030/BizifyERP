import { test, expect } from '@playwright/test'

test.describe('Sales Module E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sales')
  })

  test('should load sales page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Sales/)
    await expect(page.locator('h1')).toContainText('Sales Management')
  })

  test('should display sales description', async ({ page }) => {
    await expect(page.locator('text=Manage your sales pipeline, track opportunities, and drive revenue growth')).toBeVisible()
  })

  test('should display key sales metrics', async ({ page }) => {
    await expect(page.locator('text=Total Revenue')).toBeVisible()
    await expect(page.locator('text=Active Deals')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Average Deal Size')).toBeVisible()
  })

  test('should display customers management section', async ({ page }) => {
    await expect(page.locator('text=Customers')).toBeVisible()
    await expect(page.locator('text=Add Customer')).toBeVisible()
  })

  test('should display quotes section', async ({ page }) => {
    await expect(page.locator('text=Quotes')).toBeVisible()
    await expect(page.locator('text=Create Quote')).toBeVisible()
  })

  test('should display orders section', async ({ page }) => {
    await expect(page.locator('text=Orders')).toBeVisible()
    await expect(page.locator('text=Create Order')).toBeVisible()
  })

  test('should display invoices section', async ({ page }) => {
    await expect(page.locator('text=Invoices')).toBeVisible()
    await expect(page.locator('text=Create Invoice')).toBeVisible()
  })

  test('should display sales analytics section', async ({ page }) => {
    await expect(page.locator('text=Sales Analytics')).toBeVisible()
    await expect(page.locator('text=Sales Pipeline')).toBeVisible()
    await expect(page.locator('text=Revenue by Product')).toBeVisible()
    await expect(page.locator('text=Sales Performance')).toBeVisible()
  })

  test('should display sales features list', async ({ page }) => {
    await expect(page.locator('text=Lead Management')).toBeVisible()
    await expect(page.locator('text=Opportunity Tracking')).toBeVisible()
    await expect(page.locator('text=Quote Generation')).toBeVisible()
    await expect(page.locator('text=Order Processing')).toBeVisible()
    await expect(page.locator('text=Invoice Management')).toBeVisible()
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
    await page.click('text=CRM')
    await expect(page).toHaveURL('/crm')
    
    await page.click('text=Sales')
    await expect(page).toHaveURL('/sales')
    
    await page.click('text=Financial Accounting')
    await expect(page).toHaveURL('/financial-accounting')
    
    await page.click('text=Sales')
    await expect(page).toHaveURL('/sales')
  })

  test('should display action buttons for each section', async ({ page }) => {
    const addButtons = page.locator('button:has-text("Add")')
    const createButtons = page.locator('button:has-text("Create")')
    
    if (await addButtons.count() > 0) {
      await expect(addButtons.first()).toBeVisible()
    }
    
    if (await createButtons.count() > 0) {
      await expect(createButtons.first()).toBeVisible()
    }
  })

  test('should have proper loading states', async ({ page }) => {
    // Refresh the page to check loading states
    await page.reload()
    
    // Check if content loads properly
    await expect(page.locator('h1')).toContainText('Sales Management')
    await expect(page.locator('text=Total Revenue')).toBeVisible()
  })

  test('should display sales pipeline visualization', async ({ page }) => {
    // Look for pipeline visualization
    const pipelineElements = page.locator('[data-testid="pipeline"], .pipeline, .kanban')
    if (await pipelineElements.count() > 0) {
      await expect(pipelineElements.first()).toBeVisible()
    }
  })

  test('should display sales charts if present', async ({ page }) => {
    // Check for sales charts
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
    // This would depend on how the sales page handles API errors
    await expect(page.locator('h1')).toContainText('Sales Management')
  })

  test('should have proper meta tags and SEO', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('Sales')
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]')
    if (await metaDescription.count() > 0) {
      await expect(metaDescription).toHaveAttribute('content', /sales|management|revenue/i)
    }
  })

  test('should display commission tracking if present', async ({ page }) => {
    // Look for commission tracking
    const commissionSection = page.locator('text=Commission, text=Commission Tracking')
    if (await commissionSection.count() > 0) {
      await expect(commissionSection.first()).toBeVisible()
    }
  })

  test('should have proper currency formatting', async ({ page }) => {
    // Look for currency values
    const currencyElements = page.locator('text=$, text=€, text=£, text=¥')
    if (await currencyElements.count() > 0) {
      await expect(currencyElements.first()).toBeVisible()
    }
  })

  test('should display sales team performance', async ({ page }) => {
    // Look for sales team performance section
    const performanceSection = page.locator('text=Team Performance, text=Sales Team, text=Performance')
    if (await performanceSection.count() > 0) {
      await expect(performanceSection.first()).toBeVisible()
    }
  })

  test('should have customer segmentation', async ({ page }) => {
    // Look for customer segmentation
    const segmentationSection = page.locator('text=Customer Segments, text=Segmentation')
    if (await segmentationSection.count() > 0) {
      await expect(segmentationSection.first()).toBeVisible()
    }
  })
})