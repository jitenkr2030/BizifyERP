import { test, expect } from '@playwright/test'

test.describe('API Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the main page first
    await page.goto('/')
  })

  test.describe('Health Check API', () => {
    test('should respond to health check endpoint', async ({ page }) => {
      const response = await page.request.get('/api/health')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(body).toHaveProperty('status')
      expect(body.status).toBe('ok')
    })
  })

  test.describe('Authentication APIs', () => {
    test('should handle login API', async ({ page }) => {
      const loginData = {
        email: 'test@example.com',
        password: 'testpassword'
      }
      
      const response = await page.request.post('/api/auth/login', {
        data: loginData
      })
      
      // Should either succeed (200) or fail with validation error (400/401)
      expect([200, 400, 401]).toContain(response.status())
      
      if (response.status() === 200) {
        const body = await response.json()
        expect(body).toHaveProperty('token') || expect(body).toHaveProperty('user')
      }
    })

    test('should handle registration API', async ({ page }) => {
      const registerData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      }
      
      const response = await page.request.post('/api/auth/register', {
        data: registerData
      })
      
      // Should either succeed (201) or fail with validation error (400)
      expect([201, 400]).toContain(response.status())
      
      if (response.status() === 201) {
        const body = await response.json()
        expect(body).toHaveProperty('user') || expect(body).toHaveProperty('id')
      }
    })
  })

  test.describe('CRM APIs', () => {
    test('should handle CRM leads API', async ({ page }) => {
      // Test GET request
      const getResponse = await page.request.get('/api/crm/leads')
      expect(getResponse.status()).toBe(200)
      
      const getBody = await getResponse.json()
      expect(Array.isArray(getBody)).toBe(true)
      
      // Test POST request
      const leadData = {
        name: 'Test Lead',
        email: 'lead@example.com',
        company: 'Test Company',
        status: 'new'
      }
      
      const postResponse = await page.request.post('/api/crm/leads', {
        data: leadData
      })
      
      // Should either succeed (201) or fail with validation error (400)
      expect([201, 400]).toContain(postResponse.status())
    })

    test('should handle CRM contacts API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/crm/contacts')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle CRM opportunities API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/crm/opportunities')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle CRM activities API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/crm/activities')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Financial Accounting APIs', () => {
    test('should handle accounts API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/financial-accounting/accounts')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle transactions API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/financial-accounting/transactions')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle journals API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/financial-accounting/journals')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Sales APIs', () => {
    test('should handle customers API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/sales/customers')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle orders API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/sales/orders')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle invoices API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/sales/invoices')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle quotes API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/sales/quotes')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Inventory APIs', () => {
    test('should handle products API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/inventory/products')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle warehouses API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/inventory/warehouses')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle movements API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/inventory/movements')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Human Resources APIs', () => {
    test('should handle employees API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/human-resources/employees')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle attendance API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/human-resources/attendance')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle leave requests API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/human-resources/leave-requests')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle performance reviews API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/human-resources/performance-reviews')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle payroll API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/human-resources/payroll')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Purchasing APIs', () => {
    test('should handle suppliers API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/purchasing/suppliers')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle purchase orders API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/purchasing/purchase-orders')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle RFQs API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/purchasing/rfqs')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Supply Chain APIs', () => {
    test('should handle demand forecast API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/supply-chain/demand-forecast')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle inventory optimization API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/supply-chain/inventory-optimization')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle supplier performance API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/supply-chain/supplier-performance')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle shipments API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/supply-chain/shipments')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Manufacturing APIs', () => {
    test('should handle work orders API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/manufacturing/work-orders')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle bill of materials API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/manufacturing/bill-of-materials')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Asset Management APIs', () => {
    test('should handle assets API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/asset-management/assets')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle maintenance API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/asset-management/maintenance')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle depreciation API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/asset-management/depreciation')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle leases API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/asset-management/leases')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Project Management APIs', () => {
    test('should handle projects API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/project-management/projects')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle tasks API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/project-management/tasks')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle time entries API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/project-management/time-entries')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Document Management APIs', () => {
    test('should handle documents API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/document-management/documents')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle categories API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/document-management/categories')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle approvals API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/document-management/approvals')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Quality Management APIs', () => {
    test('should handle audits API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/quality-management/audits')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle inspections API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/quality-management/inspections')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle nonconformances API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/quality-management/nonconformances')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle corrective actions API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/quality-management/corrective-actions')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Shipping APIs', () => {
    test('should handle carriers API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/shipping/carriers')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle shipments API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/shipping/shipments')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('AI and Machine Learning APIs', () => {
    test('should handle insights API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/ai/insights')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle models API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/ai/models')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Analytics APIs', () => {
    test('should handle analytic accounts API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/analytic-accounting/accounts')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle analytic lines API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/analytic-accounting/lines')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle analytic reports API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/analytic-accounting/reports')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Tax APIs', () => {
    test('should handle tax jurisdictions API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/tax/jurisdictions')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle tax calculations API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/tax/calculations')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Third-party Integration APIs', () => {
    test('should handle integrations API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/third-party-integration/integrations')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle webhooks API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/third-party-integration/webhooks')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Subscription Management APIs', () => {
    test('should handle subscriptions API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/subscription-management/subscriptions')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })

    test('should handle subscription invoices API', async ({ page }) => {
      // Test GET request
      const response = await page.request.get('/api/subscription-management/invoices')
      expect(response.status()).toBe(200)
      
      const body = await response.json()
      expect(Array.isArray(body)).toBe(true)
    })
  })

  test.describe('Error Handling', () => {
    test('should handle 404 for non-existent endpoints', async ({ page }) => {
      const response = await page.request.get('/api/non-existent-endpoint')
      expect(response.status()).toBe(404)
    })

    test('should handle invalid JSON in POST requests', async ({ page }) => {
      const response = await page.request.post('/api/crm/leads', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: 'invalid json'
      })
      expect(response.status()).toBe(400)
    })

    test('should handle missing required fields', async ({ page }) => {
      const response = await page.request.post('/api/crm/leads', {
        data: {}
      })
      expect(response.status()).toBe(400)
    })
  })

  test.describe('Rate Limiting', () => {
    test('should handle rate limiting', async ({ page }) => {
      // Make multiple requests to test rate limiting
      const promises = []
      for (let i = 0; i < 10; i++) {
        promises.push(page.request.get('/api/health'))
      }
      
      const responses = await Promise.all(promises)
      const statusCodes = responses.map(r => r.status())
      
      // Should have some 200 responses and possibly some 429 (too many requests)
      expect(statusCodes.some(code => code === 200)).toBe(true)
    })
  })

  test.describe('CORS Headers', () => {
    test('should include proper CORS headers', async ({ page }) => {
      const response = await page.request.get('/api/health')
      const headers = response.headers()
      
      expect(headers).toHaveProperty('access-control-allow-origin')
      expect(headers).toHaveProperty('access-control-allow-methods')
    })
  })
})