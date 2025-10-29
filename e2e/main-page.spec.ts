import { test, expect } from '@playwright/test'

test.describe('Main Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the main page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/BizifyERP/)
    await expect(page.locator('h1')).toContainText('BizifyERP')
  })

  test('should display all ERP module categories', async ({ page }) => {
    await expect(page.locator('text=Financial Management')).toBeVisible()
    await expect(page.locator('text=Operations')).toBeVisible()
    await expect(page.locator('text=Human Resources')).toBeVisible()
    await expect(page.locator('text=Advanced Features')).toBeVisible()
  })

  test('should display key features section', async ({ page }) => {
    await expect(page.locator('text=Key Features')).toBeVisible()
    await expect(page.locator('text=Real-time Analytics')).toBeVisible()
    await expect(page.locator('text=AI-Powered Insights')).toBeVisible()
    await expect(page.locator('text=Cloud-Native Architecture')).toBeVisible()
    await expect(page.locator('text=Multi-Tenant SaaS')).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    // Test navigation to CRM page
    await page.click('text=CRM')
    await expect(page).toHaveURL('/crm')
    await expect(page.locator('h1')).toContainText('Customer Relationship Management')

    // Navigate back to main page
    await page.goto('/')
    
    // Test navigation to Analytics Dashboard
    await page.click('text=Analytics Dashboard')
    await expect(page).toHaveURL('/analytics-dashboard')
    await expect(page.locator('h1')).toContainText('Analytics Dashboard')
  })

  test('should display call to action section', async ({ page }) => {
    await expect(page.locator('text=Ready to Transform Your Business?')).toBeVisible()
    await expect(page.locator('text=Get Started Today')).toBeVisible()
    await expect(page.locator('text=Schedule a Demo')).toBeVisible()
  })

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('nav')).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('nav')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('nav')).toBeVisible()
  })

  test('should display footer with copyright information', async ({ page }) => {
    await expect(page.locator('text=© 2024 BizifyERP')).toBeVisible()
  })

  test('should have working mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Click mobile menu button
    await page.click('button[aria-label="Toggle menu"]')
    
    // Check if navigation items are visible
    await expect(page.locator('text=Financial Accounting')).toBeVisible()
    await expect(page.locator('text=Operations')).toBeVisible()
    await expect(page.locator('text=Human Resources')).toBeVisible()
  })

  test('should load all module cards properly', async ({ page }) => {
    // Check if module cards are visible
    const moduleCards = page.locator('.card')
    await expect(moduleCards).toHaveCount({ min: 12 })
    
    // Check specific modules
    await expect(page.locator('text=Financial Accounting')).toBeVisible()
    await expect(page.locator('text=Analytic Accounting')).toBeVisible()
    await expect(page.locator('text=Sales')).toBeVisible()
    await expect(page.locator('text=Purchasing')).toBeVisible()
    await expect(page.locator('text=Inventory')).toBeVisible()
    await expect(page.locator('text=Supply Chain')).toBeVisible()
  })

  test('should have proper meta tags and SEO', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('BizifyERP')
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /Enterprise Resource Planning/)
  })

  test('should handle 404 errors gracefully', async ({ page }) => {
    await page.goto('/non-existent-page')
    await expect(page.locator('h1')).toContainText('404')
    await expect(page.locator('text=Page not found')).toBeVisible()
  })
})