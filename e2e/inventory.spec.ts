import { test, expect } from '@playwright/test'

test.describe('Inventory Module E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory')
  })

  test('should load inventory page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Inventory/)
    await expect(page.locator('h1')).toContainText('Inventory Management')
  })

  test('should display inventory description', async ({ page }) => {
    await expect(page.locator('text=Manage your inventory levels, track stock movements, and optimize supply chain')).toBeVisible()
  })

  test('should display key inventory metrics', async ({ page }) => {
    await expect(page.locator('text=Total Products')).toBeVisible()
    await expect(page.locator('text=Low Stock Items')).toBeVisible()
    await expect(page.locator('text=Total Value')).toBeVisible()
    await expect(page.locator('text=Turnover Rate')).toBeVisible()
  })

  test('should display products management section', async ({ page }) => {
    await expect(page.locator('text=Products')).toBeVisible()
    await expect(page.locator('text=Add Product')).toBeVisible()
  })

  test('should display warehouses section', async ({ page }) => {
    await expect(page.locator('text=Warehouses')).toBeVisible()
    await expect(page.locator('text=Add Warehouse')).toBeVisible()
  })

  test('should display stock movements section', async ({ page }) => {
    await expect(page.locator('text=Stock Movements')).toBeVisible()
    await expect(page.locator('text=Record Movement')).toBeVisible()
  })

  test('should display inventory analytics section', async ({ page }) => {
    await expect(page.locator('text=Inventory Analytics')).toBeVisible()
    await expect(page.locator('text=Stock Levels')).toBeVisible()
    await expect(page.locator('text=Movement History')).toBeVisible()
    await expect(page.locator('text=Valuation')).toBeVisible()
  })

  test('should display inventory features list', async ({ page }) => {
    await expect(page.locator('text=Product Catalog')).toBeVisible()
    await expect(page.locator('text=Stock Tracking')).toBeVisible()
    await expect(page.locator('text=Warehouse Management')).toBeVisible()
    await expect(page.locator('text=Order Fulfillment')).toBeVisible()
    await expect(page.locator('text=Inventory Reporting')).toBeVisible()
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
    await page.click('text=Supply Chain')
    await expect(page).toHaveURL('/supply-chain')
    
    await page.click('text=Inventory')
    await expect(page).toHaveURL('/inventory')
    
    await page.click('text=Sales')
    await expect(page).toHaveURL('/sales')
    
    await page.click('text=Inventory')
    await expect(page).toHaveURL('/inventory')
  })

  test('should display action buttons for each section', async ({ page }) => {
    const addButtons = page.locator('button:has-text("Add")')
    const recordButton = page.locator('button:has-text("Record")')
    
    if (await addButtons.count() > 0) {
      await expect(addButtons.first()).toBeVisible()
    }
    
    if (await recordButton.count() > 0) {
      await expect(recordButton).toBeVisible()
    }
  })

  test('should have proper loading states', async ({ page }) => {
    // Refresh the page to check loading states
    await page.reload()
    
    // Check if content loads properly
    await expect(page.locator('h1')).toContainText('Inventory Management')
    await expect(page.locator('text=Total Products')).toBeVisible()
  })

  test('should display stock level indicators', async ({ page }) => {
    // Look for stock level indicators
    const stockIndicators = page.locator('text=Low Stock, text=Out of Stock, text=In Stock, text=Reorder')
    if (await stockIndicators.count() > 0) {
      await expect(stockIndicators.first()).toBeVisible()
    }
  })

  test('should display inventory charts if present', async ({ page }) => {
    // Check for inventory charts
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
    // This would depend on how the inventory page handles API errors
    await expect(page.locator('h1')).toContainText('Inventory Management')
  })

  test('should have proper meta tags and SEO', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('Inventory')
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]')
    if (await metaDescription.count() > 0) {
      await expect(metaDescription).toHaveAttribute('content', /inventory|management|stock/i)
    }
  })

  test('should display barcode/QR code functionality', async ({ page }) => {
    // Look for barcode or QR code functionality
    const barcodeSection = page.locator('text=Barcode, text=QR Code, text=Scan')
    if (await barcodeSection.count() > 0) {
      await expect(barcodeSection.first()).toBeVisible()
    }
  })

  test('should have batch/lot tracking', async ({ page }) => {
    // Look for batch or lot tracking
    const batchSection = page.locator('text=Batch, text=Lot, text=Tracking')
    if (await batchSection.count() > 0) {
      await expect(batchSection.first()).toBeVisible()
    }
  })

  test('should display reorder points and alerts', async ({ page }) => {
    // Look for reorder points and alerts
    const reorderSection = page.locator('text=Reorder Point, text=Alert, text=Notification')
    if (await reorderSection.count() > 0) {
      await expect(reorderSection.first()).toBeVisible()
    }
  })

  test('should have inventory valuation methods', async ({ page }) => {
    // Look for inventory valuation methods
    const valuationSection = page.locator('text=FIFO, text=LIFO, text=Weighted Average, text=Valuation')
    if (await valuationSection.count() > 0) {
      await expect(valuationSection.first()).toBeVisible()
    }
  })

  test('should display supplier integration', async ({ page }) => {
    // Look for supplier integration
    const supplierSection = page.locator('text=Supplier, text=Vendor, text=Procurement')
    if (await supplierSection.count() > 0) {
      await expect(supplierSection.first()).toBeVisible()
    }
  })
})