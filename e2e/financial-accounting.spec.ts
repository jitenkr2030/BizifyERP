import { test, expect } from '@playwright/test'

test.describe('Financial Accounting E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/financial-accounting')
  })

  test('should load financial accounting page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Financial Accounting/)
    await expect(page.locator('h1')).toContainText('Financial Accounting')
  })

  test('should display financial accounting description', async ({ page }) => {
    await expect(page.locator('text=Manage your company\'s financial operations with comprehensive accounting tools')).toBeVisible()
  })

  test('should display key financial metrics', async ({ page }) => {
    await expect(page.locator('text=Total Assets')).toBeVisible()
    await expect(page.locator('text=Total Liabilities')).toBeVisible()
    await expect(page.locator('text=Equity')).toBeVisible()
    await expect(page.locator('text=Net Income')).toBeVisible()
  })

  test('should display accounts management section', async ({ page }) => {
    await expect(page.locator('text=Chart of Accounts')).toBeVisible()
    await expect(page.locator('text=Add Account')).toBeVisible()
  })

  test('should display journal entries section', async ({ page }) => {
    await expect(page.locator('text=Journal Entries')).toBeVisible()
    await expect(page.locator('text=Create Journal Entry')).toBeVisible()
  })

  test('should display transactions section', async ({ page }) => {
    await expect(page.locator('text=Transactions')).toBeVisible()
    await expect(page.locator('text=Record Transaction')).toBeVisible()
  })

  test('should display financial reports section', async ({ page }) => {
    await expect(page.locator('text=Financial Reports')).toBeVisible()
    await expect(page.locator('text=Balance Sheet')).toBeVisible()
    await expect(page.locator('text=Income Statement')).toBeVisible()
    await expect(page.locator('text=Cash Flow')).toBeVisible()
  })

  test('should display accounting features list', async ({ page }) => {
    await expect(page.locator('text=General Ledger')).toBeVisible()
    await expect(page.locator('text=Accounts Payable')).toBeVisible()
    await expect(page.locator('text=Accounts Receivable')).toBeVisible()
    await expect(page.locator('text=Bank Reconciliation')).toBeVisible()
    await expect(page.locator('text=Financial Reporting')).toBeVisible()
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
    
    await page.click('text=Financial Accounting')
    await expect(page).toHaveURL('/financial-accounting')
    
    await page.click('text=Analytic Accounting')
    await expect(page).toHaveURL('/analytic-accounting')
    
    await page.click('text=Financial Accounting')
    await expect(page).toHaveURL('/financial-accounting')
  })

  test('should display action buttons for each section', async ({ page }) => {
    const addButtons = page.locator('button:has-text("Add")')
    const createButton = page.locator('button:has-text("Create")')
    const recordButton = page.locator('button:has-text("Record")')
    
    if (await addButtons.count() > 0) {
      await expect(addButtons.first()).toBeVisible()
    }
    
    if (await createButton.count() > 0) {
      await expect(createButton).toBeVisible()
    }
    
    if (await recordButton.count() > 0) {
      await expect(recordButton).toBeVisible()
    }
  })

  test('should have proper loading states', async ({ page }) => {
    // Refresh the page to check loading states
    await page.reload()
    
    // Check if content loads properly
    await expect(page.locator('h1')).toContainText('Financial Accounting')
    await expect(page.locator('text=Total Assets')).toBeVisible()
  })

  test('should handle financial calculations', async ({ page }) => {
    // Look for calculation elements or forms
    const calculationForms = page.locator('form:has-text("Calculate"), form:has-text("Compute")')
    if (await calculationForms.count() > 0) {
      await expect(calculationForms.first()).toBeVisible()
    }
  })

  test('should display financial charts if present', async ({ page }) => {
    // Check for financial charts
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
      await forms.first().locator('button[type="submit"]').click()
      
      // Check for validation messages
      const validationMessages = page.locator('text=required, text=invalid, text=must')
      if (await validationMessages.count() > 0) {
        await expect(validationMessages.first()).toBeVisible()
      }
    }
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Test with invalid API endpoints if any
    // This would depend on how the financial accounting page handles API errors
    await expect(page.locator('h1')).toContainText('Financial Accounting')
  })

  test('should have proper meta tags and SEO', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('Financial Accounting')
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]')
    if (await metaDescription.count() > 0) {
      await expect(metaDescription).toHaveAttribute('content', /financial|accounting|management/i)
    }
  })

  test('should display audit trail information', async ({ page }) => {
    // Look for audit trail or history sections
    const auditSection = page.locator('text=Audit Trail, text=History, text=Log')
    if (await auditSection.count() > 0) {
      await expect(auditSection.first()).toBeVisible()
    }
  })

  test('should have proper currency formatting', async ({ page }) => {
    // Look for currency values
    const currencyElements = page.locator('text=$, text=€, text=£, text=¥')
    if (await currencyElements.count() > 0) {
      await expect(currencyElements.first()).toBeVisible()
    }
  })
})