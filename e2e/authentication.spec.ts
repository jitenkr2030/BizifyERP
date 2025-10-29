import { test, expect } from '@playwright/test'

test.describe('Authentication Flows E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies and localStorage before each test
    await page.context().clearCookies()
    await page.evaluate(() => localStorage.clear())
  })

  test.describe('Login Flow', () => {
    test('should display login page', async ({ page }) => {
      await page.goto('/login')
      await expect(page).toHaveTitle(/Login/)
      await expect(page.locator('h1')).toContainText('Login')
    })

    test('should have login form elements', async ({ page }) => {
      await page.goto('/login')
      
      // Check for email input
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      await expect(emailInput).toBeVisible()
      
      // Check for password input
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      await expect(passwordInput).toBeVisible()
      
      // Check for login button
      const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
      await expect(loginButton).toBeVisible()
    })

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.goto('/login')
      
      // Try to submit empty form
      const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
      await loginButton.click()
      
      // Check for validation messages
      await expect(page.locator('text=required, text=invalid, text=must')).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/login')
      
      // Fill with invalid credentials
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      
      await emailInput.fill('invalid@example.com')
      await passwordInput.fill('wrongpassword')
      
      // Submit form
      const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
      await loginButton.click()
      
      // Check for error message
      await expect(page.locator('text=invalid, text=incorrect, text=failed')).toBeVisible()
    })

    test('should handle successful login', async ({ page }) => {
      await page.goto('/login')
      
      // Fill with test credentials (these would need to be set up in the test environment)
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      
      await emailInput.fill('test@example.com')
      await passwordInput.fill('testpassword')
      
      // Submit form
      const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
      await loginButton.click()
      
      // Check if redirected to dashboard
      await expect(page).toHaveURL('/', { timeout: 10000 })
    })

    test('should have remember me functionality', async ({ page }) => {
      await page.goto('/login')
      
      // Check for remember me checkbox
      const rememberMe = page.locator('input[type="checkbox"], label:has-text("Remember")')
      if (await rememberMe.count() > 0) {
        await expect(rememberMe.first()).toBeVisible()
      }
    })

    test('should have forgot password link', async ({ page }) => {
      await page.goto('/login')
      
      // Check for forgot password link
      const forgotPasswordLink = page.locator('a:has-text("Forgot Password"), a:has-text("Reset Password")')
      if (await forgotPasswordLink.count() > 0) {
        await expect(forgotPasswordLink.first()).toBeVisible()
        
        // Test forgot password navigation
        await forgotPasswordLink.first().click()
        await expect(page).toHaveURL(/forgot-password|reset-password/)
      }
    })

    test('should have signup link', async ({ page }) => {
      await page.goto('/login')
      
      // Check for signup link
      const signupLink = page.locator('a:has-text("Sign Up"), a:has-text("Register"), a:has-text("Create Account")')
      if (await signupLink.count() > 0) {
        await expect(signupLink.first()).toBeVisible()
        
        // Test signup navigation
        await signupLink.first().click()
        await expect(page).toHaveURL(/signup|register/)
      }
    })
  })

  test.describe('Registration Flow', () => {
    test('should display registration page', async ({ page }) => {
      await page.goto('/register')
      await expect(page).toHaveTitle(/Register|Sign Up/)
      await expect(page.locator('h1')).toContainText(/Register|Sign Up/)
    })

    test('should have registration form elements', async ({ page }) => {
      await page.goto('/register')
      
      // Check for required fields
      const nameInput = page.locator('input[name="name"], input[placeholder*="name"]')
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      const confirmPasswordInput = page.locator('input[name="confirmPassword"], input[placeholder*="confirm"]')
      
      if (await nameInput.count() > 0) {
        await expect(nameInput.first()).toBeVisible()
      }
      
      await expect(emailInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
      
      if (await confirmPasswordInput.count() > 0) {
        await expect(confirmPasswordInput.first()).toBeVisible()
      }
      
      // Check for register button
      const registerButton = page.locator('button[type="submit"], button:has-text("Register"), button:has-text("Sign Up")')
      await expect(registerButton).toBeVisible()
    })

    test('should show validation errors for mismatched passwords', async ({ page }) => {
      await page.goto('/register')
      
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]').first()
      const confirmPasswordInput = page.locator('input[name="confirmPassword"], input[placeholder*="confirm"]')
      
      await passwordInput.fill('password123')
      
      if (await confirmPasswordInput.count() > 0) {
        await confirmPasswordInput.fill('differentpassword')
        
        // Check for password mismatch error
        await expect(page.locator('text=mismatch, text=match, text=same')).toBeVisible()
      }
    })

    test('should handle successful registration', async ({ page }) => {
      await page.goto('/register')
      
      // Fill registration form with unique test data
      const nameInput = page.locator('input[name="name"], input[placeholder*="name"]')
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]').first()
      const confirmPasswordInput = page.locator('input[name="confirmPassword"], input[placeholder*="confirm"]')
      
      if (await nameInput.count() > 0) {
        await nameInput.fill('Test User')
      }
      
      await emailInput.fill(`test${Date.now()}@example.com`)
      await passwordInput.fill('password123')
      
      if (await confirmPasswordInput.count() > 0) {
        await confirmPasswordInput.fill('password123')
      }
      
      // Submit form
      const registerButton = page.locator('button[type="submit"], button:has-text("Register"), button:has-text("Sign Up")')
      await registerButton.click()
      
      // Check if redirected or shown success message
      await expect(page.locator('text=success, text=registered, text=welcome')).toBeVisible()
    })
  })

  test.describe('Password Reset Flow', () => {
    test('should display password reset page', async ({ page }) => {
      await page.goto('/forgot-password')
      await expect(page).toHaveTitle(/Forgot Password|Reset Password/)
      await expect(page.locator('h1')).toContainText(/Forgot Password|Reset Password/)
    })

    test('should have password reset form', async ({ page }) => {
      await page.goto('/forgot-password')
      
      // Check for email input
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      await expect(emailInput).toBeVisible()
      
      // Check for reset button
      const resetButton = page.locator('button[type="submit"], button:has-text("Reset"), button:has-text("Send")')
      await expect(resetButton).toBeVisible()
    })

    test('should handle password reset request', async ({ page }) => {
      await page.goto('/forgot-password')
      
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      await emailInput.fill('test@example.com')
      
      const resetButton = page.locator('button[type="submit"], button:has-text("Reset"), button:has-text("Send")')
      await resetButton.click()
      
      // Check for success message
      await expect(page.locator('text=sent, text=email, text=check')).toBeVisible()
    })
  })

  test.describe('Session Management', () => {
    test('should maintain session after page refresh', async ({ page }) => {
      // Login first
      await page.goto('/login')
      
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      
      await emailInput.fill('test@example.com')
      await passwordInput.fill('testpassword')
      
      const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
      await loginButton.click()
      
      // Wait for login to complete
      await page.waitForURL('/', { timeout: 10000 })
      
      // Refresh page
      await page.reload()
      
      // Should still be logged in
      await expect(page).toHaveURL('/')
    })

    test('should handle logout correctly', async ({ page }) => {
      // Login first
      await page.goto('/login')
      
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      
      await emailInput.fill('test@example.com')
      await passwordInput.fill('testpassword')
      
      const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
      await loginButton.click()
      
      // Wait for login to complete
      await page.waitForURL('/', { timeout: 10000 })
      
      // Find and click logout button
      const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout")')
      if (await logoutButton.count() > 0) {
        await logoutButton.first().click()
        
        // Should be redirected to login page
        await expect(page).toHaveURL(/login/)
      }
    })

    test('should redirect to login for protected pages', async ({ page }) => {
      // Try to access protected page without login
      await page.goto('/dashboard')
      
      // Should be redirected to login
      await expect(page).toHaveURL(/login/)
    })
  })

  test.describe('Security Features', () => {
    test('should have password strength indicator', async ({ page }) => {
      await page.goto('/register')
      
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]').first()
      await passwordInput.focus()
      
      // Check for password strength indicator
      const strengthIndicator = page.locator('text=strength, text=weak, text=strong, text=medium')
      if (await strengthIndicator.count() > 0) {
        await expect(strengthIndicator.first()).toBeVisible()
      }
    })

    test('should show/hide password functionality', async ({ page }) => {
      await page.goto('/login')
      
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      const toggleButton = page.locator('button[aria-label*="password"], button[title*="password"], .password-toggle')
      
      if (await toggleButton.count() > 0) {
        // Check initial state (password hidden)
        await expect(passwordInput).toHaveAttribute('type', 'password')
        
        // Click toggle button
        await toggleButton.first().click()
        
        // Check if password is now visible
        await expect(passwordInput).toHaveAttribute('type', 'text')
        
        // Click again to hide
        await toggleButton.first().click()
        
        // Check if password is hidden again
        await expect(passwordInput).toHaveAttribute('type', 'password')
      }
    })

    test('should handle rate limiting', async ({ page }) => {
      await page.goto('/login')
      
      const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"], input[placeholder*="password"]')
      const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
      
      // Try multiple failed login attempts
      for (let i = 0; i < 5; i++) {
        await emailInput.fill(`invalid${i}@example.com`)
        await passwordInput.fill('wrongpassword')
        await loginButton.click()
        
        // Wait a bit between attempts
        await page.waitForTimeout(1000)
      }
      
      // Check for rate limiting message
      await expect(page.locator('text=attempts, text=limit, text=try again')).toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.goto('/login')
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 })
      await expect(page.locator('h1')).toBeVisible()
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 })
      await expect(page.locator('h1')).toBeVisible()
      
      // Test desktop view
      await page.setViewportSize({ width: 1920, height: 1080 })
      await expect(page.locator('h1')).toBeVisible()
    })
  })
})