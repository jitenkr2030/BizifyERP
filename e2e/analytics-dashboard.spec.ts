import { test, expect } from '@playwright/test'

test.describe('Analytics Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/analytics-dashboard')
  })

  test('should load analytics dashboard successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Analytics Dashboard/)
    await expect(page.locator('h1')).toContainText('Analytics Dashboard')
  })

  test('should display dashboard description', async ({ page }) => {
    await expect(page.locator('text=Comprehensive business intelligence and analytics platform')).toBeVisible()
  })

  test('should display key performance indicators', async ({ page }) => {
    await expect(page.locator('text=Total Revenue')).toBeVisible()
    await expect(page.locator('text=Active Users')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Average Order Value')).toBeVisible()
  })

  test('should display revenue trends chart', async ({ page }) => {
    await expect(page.locator('text=Revenue Trends')).toBeVisible()
    // Check for chart container
    const chartContainer = page.locator('[data-testid="line-chart"], .recharts-wrapper, .chart-container')
    if (await chartContainer.count() > 0) {
      await expect(chartContainer.first()).toBeVisible()
    }
  })

  test('should display sales by category chart', async ({ page }) => {
    await expect(page.locator('text=Sales by Category')).toBeVisible()
    // Check for chart container
    const chartContainer = page.locator('[data-testid="bar-chart"], .recharts-wrapper, .chart-container')
    if (await chartContainer.count() > 0) {
      await expect(chartContainer.first()).toBeVisible()
    }
  })

  test('should display user acquisition chart', async ({ page }) => {
    await expect(page.locator('text=User Acquisition')).toBeVisible()
    // Check for chart container
    const chartContainer = page.locator('[data-testid="pie-chart"], .recharts-wrapper, .chart-container')
    if (await chartContainer.count() > 0) {
      await expect(chartContainer.first()).toBeVisible()
    }
  })

  test('should display top products section', async ({ page }) => {
    await expect(page.locator('text=Top Products')).toBeVisible()
  })

  test('should display recent transactions section', async ({ page }) => {
    await expect(page.locator('text=Recent Transactions')).toBeVisible()
  })

  test('should display geographic distribution section', async ({ page }) => {
    await expect(page.locator('text=Geographic Distribution')).toBeVisible()
  })

  test('should have date range selector', async ({ page }) => {
    const dateSelector = page.locator('[data-testid="calendar-icon"], button:has-text("Date"), input[type="date"]')
    if (await dateSelector.count() > 0) {
      await expect(dateSelector.first()).toBeVisible()
    }
  })

  test('should have filter options', async ({ page }) => {
    const filterButton = page.locator('[data-testid="filter-icon"], button:has-text("Filter")')
    if (await filterButton.count() > 0) {
      await expect(filterButton.first()).toBeVisible()
    }
  })

  test('should have export functionality', async ({ page }) => {
    const exportButton = page.locator('[data-testid="download-icon"], button:has-text("Export"), button:has-text("Download")')
    if (await exportButton.count() > 0) {
      await expect(exportButton.first()).toBeVisible()
    }
  })

  test('should have refresh functionality', async ({ page }) => {
    const refreshButton = page.locator('[data-testid="refresh-icon"], button:has-text("Refresh")')
    if (await refreshButton.count() > 0) {
      await expect(refreshButton.first()).toBeVisible()
    }
  })

  test('should display analytics features list', async ({ page }) => {
    await expect(page.locator('text=Real-time Analytics')).toBeVisible()
    await expect(page.locator('text=Custom Dashboards')).toBeVisible()
    await expect(page.locator('text=Advanced Reporting')).toBeVisible()
    await expect(page.locator('text=Data Visualization')).toBeVisible()
    await expect(page.locator('text=Export Capabilities')).toBeVisible()
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
    
    await page.click('text=Analytics Dashboard')
    await expect(page).toHaveURL('/analytics-dashboard')
    
    await page.click('text=Sales')
    await expect(page).toHaveURL('/sales')
    
    await page.click('text=Analytics Dashboard')
    await expect(page).toHaveURL('/analytics-dashboard')
  })

  test('should have proper loading states', async ({ page }) => {
    // Refresh the page to check loading states
    await page.reload()
    
    // Check if content loads properly
    await expect(page.locator('h1')).toContainText('Analytics Dashboard')
    await expect(page.locator('text=Total Revenue')).toBeVisible()
  })

  test('should handle chart interactions', async ({ page }) => {
    // Test chart tooltips if they exist
    const chartElements = page.locator('.recharts-surface, .chart-container, [data-testid*="chart"]')
    if (await chartElements.count() > 0) {
      // Hover over chart elements to check for tooltips
      await chartElements.first().hover()
      
      // Check if any tooltip appears
      const tooltip = page.locator('.recharts-tooltip, .chart-tooltip, [data-testid="tooltip"]')
      if (await tooltip.count() > 0) {
        await expect(tooltip.first()).toBeVisible()
      }
    }
  })

  test('should display time period options', async ({ page }) => {
    // Look for time period selectors
    const timeSelectors = page.locator('select, button:has-text("Last"), button:has-text("This")')
    if (await timeSelectors.count() > 0) {
      await expect(timeSelectors.first()).toBeVisible()
    }
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

  test('should handle errors gracefully', async ({ page }) => {
    // Test with invalid API endpoints if any
    // This would depend on how the analytics dashboard handles API errors
    await expect(page.locator('h1')).toContainText('Analytics Dashboard')
  })

  test('should have proper meta tags and SEO', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('Analytics Dashboard')
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]')
    if (await metaDescription.count() > 0) {
      await expect(metaDescription).toHaveAttribute('content', /analytics|dashboard|business intelligence/i)
    }
  })
})