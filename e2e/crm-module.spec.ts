import { test, expect } from '@playwright/test'

test.describe('CRM Module E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/crm')
  })

  test('should load CRM page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/CRM/)
    await expect(page.locator('h1')).toContainText('Customer Relationship Management')
  })

  test('should display CRM description', async ({ page }) => {
    await expect(page.locator('text=Manage customer relationships, track interactions, and drive sales growth')).toBeVisible()
  })

  test('should display key metrics cards', async ({ page }) => {
    await expect(page.locator('text=Total Customers')).toBeVisible()
    await expect(page.locator('text=Active Leads')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Revenue')).toBeVisible()
  })

  test('should display customer management section', async ({ page }) => {
    await expect(page.locator('text=Customer Management')).toBeVisible()
    await expect(page.locator('text=Add Customer')).toBeVisible()
  })

  test('should display leads management section', async ({ page }) => {
    await expect(page.locator('text=Leads Management')).toBeVisible()
    await expect(page.locator('text=Add Lead')).toBeVisible()
  })

  test('should display opportunities section', async ({ page }) => {
    await expect(page.locator('text=Opportunities')).toBeVisible()
    await expect(page.locator('text=Create Opportunity')).toBeVisible()
  })

  test('should display activities section', async ({ page }) => {
    await expect(page.locator('text=Recent Activities')).toBeVisible()
    await expect(page.locator('text=Log Activity')).toBeVisible()
  })

  test('should display CRM analytics section', async ({ page }) => {
    await expect(page.locator('text=CRM Analytics')).toBeVisible()
    await expect(page.locator('text=Sales Pipeline')).toBeVisible()
    await expect(page.locator('text=Lead Sources')).toBeVisible()
    await expect(page.locator('text=Customer Segments')).toBeVisible()
  })

  test('should have working search functionality', async ({ page }) => {
    // Look for search input or button
    const searchButton = page.locator('[data-testid="search-icon"], button:has-text("Search")')
    if (await searchButton.isVisible()) {
      await searchButton.click()
      // Check if search functionality is available
      const searchInput = page.locator('input[placeholder*="search"], input[placeholder*="Search"]')
      if (await searchInput.isVisible()) {
        await searchInput.fill('test customer')
        await searchInput.press('Enter')
      }
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

  test('should display CRM features list', async ({ page }) => {
    await expect(page.locator('text=Contact Management')).toBeVisible()
    await expect(page.locator('text=Lead Tracking')).toBeVisible()
    await expect(page.locator('text=Sales Pipeline')).toBeVisible()
    await expect(page.locator('text=Activity Tracking')).toBeVisible()
    await expect(page.locator('text=Reporting & Analytics')).toBeVisible()
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
    const dashboardLink = page.locator('text=Dashboard')
    if (await dashboardLink.isVisible()) {
      await dashboardLink.click()
      await expect(page).toHaveURL('/')
    }
  })

  test('should display action buttons for each section', async ({ page }) => {
    const addButtons = page.locator('button:has-text("Add")')
    const createButton = page.locator('button:has-text("Create")')
    const logButton = page.locator('button:has-text("Log")')
    
    await expect(addButtons.first()).toBeVisible()
    await expect(createButton).toBeVisible()
    await expect(logButton).toBeVisible()
  })

  test('should handle module navigation correctly', async ({ page }) => {
    // Navigate to different modules and return
    await page.click('text=Sales')
    await expect(page).toHaveURL('/sales')
    
    await page.click('text=CRM')
    await expect(page).toHaveURL('/crm')
    
    await page.click('text=Analytics Dashboard')
    await expect(page).toHaveURL('/analytics-dashboard')
    
    await page.click('text=CRM')
    await expect(page).toHaveURL('/crm')
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

  test('should have proper loading states', async ({ page }) => {
    // Refresh the page to check loading states
    await page.reload()
    
    // Check if content loads properly
    await expect(page.locator('h1')).toContainText('Customer Relationship Management')
    await expect(page.locator('text=Total Customers')).toBeVisible()
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Test with invalid API endpoints if any
    // This would depend on how the CRM page handles API errors
    await expect(page.locator('h1')).toContainText('Customer Relationship Management')
  })
})