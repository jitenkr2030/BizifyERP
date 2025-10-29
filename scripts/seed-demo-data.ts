import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding demo data...')

  // Create demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo-company',
      domain: 'demo-company.com',
      plan: 'pro',
      status: 'active',
      maxUsers: 50,
      maxStorage: 10240,
      features: JSON.stringify(['all']),
      trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  // Create demo company
  const company = await prisma.company.upsert({
    where: { id: 'demo-company-id' },
    update: {},
    create: {
      id: 'demo-company-id',
      name: 'Demo Company Inc.',
      taxId: '123456789',
      address: '123 Business St, Suite 100, Business City, BC 12345',
      phone: '+1-555-0123',
      email: 'info@demo-company.com',
      website: 'https://demo-company.com',
      tenantId: tenant.id,
    },
  })

  // Create demo users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@demo-company.com' },
    update: {},
    create: {
      email: 'admin@demo-company.com',
      name: 'Admin User',
      role: 'admin',
      tenantId: tenant.id,
      subscriptionTier: 'pro',
      subscriptionStatus: 'active',
      isTenantAdmin: true,
    },
  })

  const salesUser = await prisma.user.upsert({
    where: { email: 'sales@demo-company.com' },
    update: {},
    create: {
      email: 'sales@demo-company.com',
      name: 'Sales Manager',
      role: 'user',
      tenantId: tenant.id,
      subscriptionTier: 'pro',
      subscriptionStatus: 'active',
    },
  })

  // Create demo customers
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { code: 'CUST001' },
      update: {},
      create: {
        code: 'CUST001',
        name: 'Tech Corp',
        email: 'contact@techcorp.com',
        phone: '+1-555-0101',
        address: '456 Tech Ave, Silicon Valley, CA 94000',
        taxId: '987654321',
        companyId: company.id,
        tenantId: tenant.id,
      },
    }),
    prisma.customer.upsert({
      where: { code: 'CUST002' },
      update: {},
      create: {
        code: 'CUST002',
        name: 'Startup IO',
        email: 'hello@startup.io',
        phone: '+1-555-0202',
        address: '789 Innovation Blvd, Startup City, SC 95000',
        companyId: company.id,
        tenantId: tenant.id,
      },
    }),
    prisma.customer.upsert({
      where: { code: 'CUST003' },
      update: {},
      create: {
        code: 'CUST003',
        name: 'Manufacturing Co',
        email: 'info@manufacturing.com',
        phone: '+1-555-0303',
        address: '321 Factory Rd, Industrial City, IC 96000',
        companyId: company.id,
        tenantId: tenant.id,
      },
    }),
  ])

  // Create demo products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { code: 'PROD001' },
      update: {},
      create: {
        code: 'PROD001',
        name: 'Enterprise Software License',
        description: 'Comprehensive enterprise software solution',
        category: 'Software',
        unit: 'license',
        purchasePrice: 1000,
        salePrice: 2500,
        taxRate: 0.1,
        tenantId: tenant.id,
      },
    }),
    prisma.product.upsert({
      where: { code: 'PROD002' },
      update: {},
      create: {
        code: 'PROD002',
        name: 'Cloud Migration Service',
        description: 'Professional cloud migration and setup',
        category: 'Services',
        unit: 'project',
        purchasePrice: 5000,
        salePrice: 15000,
        taxRate: 0.1,
        tenantId: tenant.id,
      },
    }),
    prisma.product.upsert({
      where: { code: 'PROD003' },
      update: {},
      create: {
        code: 'PROD003',
        name: 'Technical Support Package',
        description: '24/7 technical support and maintenance',
        category: 'Services',
        unit: 'year',
        purchasePrice: 200,
        salePrice: 500,
        taxRate: 0.1,
        tenantId: tenant.id,
      },
    }),
  ])

  // Create demo warehouses
  const warehouses = await Promise.all([
    prisma.warehouse.upsert({
      where: { code: 'WH001' },
      update: {},
      create: {
        code: 'WH001',
        name: 'Main Warehouse',
        address: '123 Storage St, Warehouse City, WC 97000',
        companyId: company.id,
        tenantId: tenant.id,
      },
    }),
    prisma.warehouse.upsert({
      where: { code: 'WH002' },
      update: {},
      create: {
        code: 'WH002',
        name: 'Secondary Warehouse',
        address: '456 Backup Ave, Storage City, SC 98000',
        companyId: company.id,
        tenantId: tenant.id,
      },
    }),
  ])

  // Create demo CRM leads
  const leads = await Promise.all([
    prisma.lead.upsert({
      where: { id: 'lead1' },
      update: {},
      create: {
        id: 'lead1',
        name: 'John Smith',
        email: 'john.smith@company.com',
        phone: '+1-555-0123',
        company: 'Tech Corp',
        source: 'website',
        status: 'qualified',
        priority: 'high',
        estimatedValue: 50000,
        assignedTo: salesUser.id,
        notes: 'Interested in our enterprise solution',
      },
    }),
    prisma.lead.upsert({
      where: { id: 'lead2' },
      update: {},
      create: {
        id: 'lead2',
        name: 'Sarah Williams',
        email: 'sarah.w@startup.io',
        phone: '+1-555-0456',
        company: 'Startup IO',
        source: 'referral',
        status: 'contacted',
        priority: 'medium',
        estimatedValue: 25000,
        assignedTo: salesUser.id,
        notes: 'Follow up scheduled for next week',
      },
    }),
    prisma.lead.upsert({
      where: { id: 'lead3' },
      update: {},
      create: {
        id: 'lead3',
        name: 'Mike Johnson',
        email: 'mike.j@manufacturing.com',
        phone: '+1-555-0789',
        company: 'Manufacturing Co',
        source: 'advertisement',
        status: 'new',
        priority: 'low',
        estimatedValue: 15000,
        notes: 'Initial inquiry received',
      },
    }),
  ])

  // Create demo CRM opportunities
  const opportunities = await Promise.all([
    prisma.opportunity.upsert({
      where: { id: 'opp1' },
      update: {},
      create: {
        id: 'opp1',
        name: 'Enterprise Software License',
        leadId: leads[0].id,
        customerId: customers[0].id,
        amount: 50000,
        probability: 75,
        expectedCloseDate: new Date('2024-02-15'),
        stage: 'proposal',
        notes: 'Proposal sent, awaiting feedback',
        assignedTo: salesUser.id,
      },
    }),
    prisma.opportunity.upsert({
      where: { id: 'opp2' },
      update: {},
      create: {
        id: 'opp2',
        name: 'Cloud Migration Project',
        customerId: customers[1].id,
        amount: 75000,
        probability: 50,
        expectedCloseDate: new Date('2024-03-01'),
        stage: 'qualification',
        notes: 'Technical assessment in progress',
        assignedTo: salesUser.id,
      },
    }),
  ])

  // Create demo CRM contacts
  const contacts = await Promise.all([
    prisma.contact.upsert({
      where: { id: 'contact1' },
      update: {},
      create: {
        id: 'contact1',
        firstName: 'Emily',
        lastName: 'Brown',
        email: 'emily.brown@techcorp.com',
        phone: '+1-555-1111',
        position: 'IT Director',
        customerId: customers[0].id,
      },
    }),
    prisma.contact.upsert({
      where: { id: 'contact2' },
      update: {},
      create: {
        id: 'contact2',
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@startup.io',
        phone: '+1-555-2222',
        position: 'CEO',
        leadId: leads[1].id,
      },
    }),
  ])

  // Create demo CRM activities
  const activities = await Promise.all([
    prisma.activity.upsert({
      where: { id: 'activity1' },
      update: {},
      create: {
        id: 'activity1',
        type: 'call',
        subject: 'Follow up call with John Smith',
        description: 'Discussed enterprise solution requirements',
        dueDate: new Date('2024-01-16T15:00:00'),
        completed: true,
        leadId: leads[0].id,
        assignedTo: salesUser.id,
      },
    }),
    prisma.activity.upsert({
      where: { id: 'activity2' },
      update: {},
      create: {
        id: 'activity2',
        type: 'email',
        subject: 'Send proposal to Sarah Williams',
        description: 'Prepare and send detailed proposal',
        dueDate: new Date('2024-01-17T12:00:00'),
        completed: false,
        leadId: leads[1].id,
        assignedTo: salesUser.id,
      },
    }),
    prisma.activity.upsert({
      where: { id: 'activity3' },
      update: {},
      create: {
        id: 'activity3',
        type: 'meeting',
        subject: 'Technical review with Emily Brown',
        description: 'Review technical requirements for cloud migration',
        dueDate: new Date('2024-01-18T10:00:00'),
        completed: false,
        contactId: contacts[0].id,
        assignedTo: salesUser.id,
      },
    }),
  ])

  // Create demo sales orders
  const salesOrders = await Promise.all([
    prisma.salesOrder.upsert({
      where: { number: 'SO001' },
      update: {},
      create: {
        number: 'SO001',
        customerId: customers[0].id,
        date: new Date('2024-01-10'),
        status: 'delivered',
        subtotal: 22500,
        tax: 2250,
        total: 24750,
        notes: 'Enterprise software license order',
        createdById: salesUser.id,
      },
    }),
    prisma.salesOrder.upsert({
      where: { number: 'SO002' },
      update: {},
      create: {
        number: 'SO002',
        customerId: customers[1].id,
        date: new Date('2024-01-15'),
        status: 'processing',
        subtotal: 45000,
        tax: 4500,
        total: 49500,
        notes: 'Cloud migration project',
        createdById: salesUser.id,
      },
    }),
  ])

  // Create demo invoices
  const invoices = await Promise.all([
    prisma.invoice.upsert({
      where: { number: 'INV001' },
      update: {},
      create: {
        number: 'INV001',
        customerId: customers[0].id,
        salesOrderId: salesOrders[0].id,
        date: new Date('2024-01-10'),
        dueDate: new Date('2024-02-10'),
        status: 'paid',
        subtotal: 22500,
        tax: 2250,
        total: 24750,
        paidAmount: 24750,
        notes: 'Enterprise software license invoice',
      },
    }),
    prisma.invoice.upsert({
      where: { number: 'INV002' },
      update: {},
      create: {
        number: 'INV002',
        customerId: customers[1].id,
        salesOrderId: salesOrders[1].id,
        date: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        status: 'sent',
        subtotal: 45000,
        tax: 4500,
        total: 49500,
        paidAmount: 0,
        notes: 'Cloud migration project invoice',
      },
    }),
  ])

  // Create demo payments
  await Promise.all([
    prisma.payment.upsert({
      where: { reference: 'PAY001' },
      update: {},
      create: {
        reference: 'PAY001',
        invoiceId: invoices[0].id,
        date: new Date('2024-01-20'),
        amount: 24750,
        method: 'bank',
        status: 'completed',
        notes: 'Payment received via bank transfer',
      },
    }),
  ])

  // Create demo chart of accounts
  const chartOfAccounts = await Promise.all([
    prisma.chartOfAccounts.upsert({
      where: { code: '1000' },
      update: {},
      create: {
        code: '1000',
        name: 'Assets',
        type: 'asset',
        tenantId: tenant.id,
      },
    }),
    prisma.chartOfAccounts.upsert({
      where: { code: '2000' },
      update: {},
      create: {
        code: '2000',
        name: 'Liabilities',
        type: 'liability',
        tenantId: tenant.id,
      },
    }),
    prisma.chartOfAccounts.upsert({
      where: { code: '3000' },
      update: {},
      create: {
        code: '3000',
        name: 'Equity',
        type: 'equity',
        tenantId: tenant.id,
      },
    }),
    prisma.chartOfAccounts.upsert({
      where: { code: '4000' },
      update: {},
      create: {
        code: '4000',
        name: 'Revenue',
        type: 'revenue',
        tenantId: tenant.id,
      },
    }),
    prisma.chartOfAccounts.upsert({
      where: { code: '5000' },
      update: {},
      create: {
        code: '5000',
        name: 'Expenses',
        type: 'expense',
        tenantId: tenant.id,
      },
    }),
  ])

  // Create child accounts after parents are created
  const cashAccount = await prisma.chartOfAccounts.upsert({
    where: { code: '1100' },
    update: {},
    create: {
      code: '1100',
      name: 'Cash',
      type: 'asset',
      parentId: chartOfAccounts[0].id, // Assets account
      tenantId: tenant.id,
    },
  })

  // Create demo journals
  const journals = await Promise.all([
    prisma.journal.upsert({
      where: { code: 'SALES' },
      update: {},
      create: {
        code: 'SALES',
        name: 'Sales Journal',
        type: 'sales',
        tenantId: tenant.id,
      },
    }),
    prisma.journal.upsert({
      where: { code: 'PURCHASE' },
      update: {},
      create: {
        code: 'PURCHASE',
        name: 'Purchase Journal',
        type: 'purchase',
        tenantId: tenant.id,
      },
    }),
    prisma.journal.upsert({
      where: { code: 'GENERAL' },
      update: {},
      create: {
        code: 'GENERAL',
        name: 'General Journal',
        type: 'general',
        tenantId: tenant.id,
      },
    }),
  ])

  // Create demo transactions
  const transactions = await Promise.all([
    prisma.transaction.upsert({
      where: { reference: 'TRX001' },
      update: {},
      create: {
        reference: 'TRX001',
        date: new Date('2024-01-10'),
        description: 'Software license sale',
        journalId: journals[0].id,
        status: 'posted',
        totalDebit: 24750,
        totalCredit: 24750,
        tenantId: tenant.id,
      },
    }),
    prisma.transaction.upsert({
      where: { reference: 'TRX002' },
      update: {},
      create: {
        reference: 'TRX002',
        date: new Date('2024-01-15'),
        description: 'Cloud migration project sale',
        journalId: journals[0].id,
        status: 'posted',
        totalDebit: 49500,
        totalCredit: 49500,
        tenantId: tenant.id,
      },
    }),
  ])

  // Create demo account transactions
  await Promise.all([
    prisma.accountTransaction.upsert({
      where: { id: 'acctrx1' },
      update: {},
      create: {
        id: 'acctrx1',
        accountId: chartOfAccounts[3].id, // Revenue
        transactionId: transactions[0].id,
        description: 'Software license revenue',
        credit: 22500,
      },
    }),
    prisma.accountTransaction.upsert({
      where: { id: 'acctrx2' },
      update: {},
      create: {
        id: 'acctrx2',
        accountId: cashAccount.id, // Cash
        transactionId: transactions[0].id,
        description: 'Cash received',
        debit: 24750,
      },
    }),
    prisma.accountTransaction.upsert({
      where: { id: 'acctrx3' },
      update: {},
      create: {
        id: 'acctrx3',
        accountId: chartOfAccounts[4].id, // Expenses
        transactionId: transactions[0].id,
        description: 'Tax expense',
        debit: 2250,
      },
    }),
  ])

  // Create demo stock movements
  await Promise.all([
    prisma.stockMovement.upsert({
      where: { id: 'stock1' },
      update: {},
      create: {
        id: 'stock1',
        productId: products[0].id,
        warehouseId: warehouses[0].id,
        type: 'in',
        quantity: 100,
        reference: 'Initial stock',
        date: new Date('2024-01-01'),
        notes: 'Initial inventory setup',
      },
    }),
    prisma.stockMovement.upsert({
      where: { id: 'stock2' },
      update: {},
      create: {
        id: 'stock2',
        productId: products[1].id,
        warehouseId: warehouses[0].id,
        type: 'in',
        quantity: 10,
        reference: 'Initial stock',
        date: new Date('2024-01-01'),
        notes: 'Initial inventory setup',
      },
    }),
  ])

  // Create demo suppliers
  const suppliers = await Promise.all([
    prisma.supplier.upsert({
      where: { code: 'SUP001' },
      update: {},
      create: {
        id: 'supplier1',
        code: 'SUP001',
        name: 'Tech Supply Co',
        email: 'sales@techsupply.com',
        phone: '+1-555-1001',
        address: '123 Supplier St, Supply City, SC 91000',
        taxId: 'SUP123456',
        companyId: company.id,
      },
    }),
    prisma.supplier.upsert({
      where: { code: 'SUP002' },
      update: {},
      create: {
        id: 'supplier2',
        code: 'SUP002',
        name: 'Global Hardware Inc',
        email: 'info@globalhardware.com',
        phone: '+1-555-1002',
        address: '456 Hardware Ave, Hardware City, HC 92000',
        taxId: 'SUP789012',
        companyId: company.id,
      },
    }),
    prisma.supplier.upsert({
      where: { code: 'SUP003' },
      update: {},
      create: {
        id: 'supplier3',
        code: 'SUP003',
        name: 'Software Solutions Ltd',
        email: 'contact@softwaresolutions.com',
        phone: '+1-555-1003',
        address: '789 Software Blvd, Tech City, TC 93000',
        taxId: 'SUP345678',
        companyId: company.id,
      },
    }),
  ])

  // Create demo RFQs
  const rfqs = await Promise.all([
    prisma.requestForQuotation.upsert({
      where: { id: 'rfq1' },
      update: {},
      create: {
        id: 'rfq1',
        number: 'RFQ001',
        supplierId: suppliers[0].id,
        date: new Date('2024-01-05'),
        expiryDate: new Date('2024-01-20'),
        status: 'sent',
        notes: 'Request for server hardware',
      },
    }),
    prisma.requestForQuotation.upsert({
      where: { id: 'rfq2' },
      update: {},
      create: {
        id: 'rfq2',
        number: 'RFQ002',
        supplierId: suppliers[1].id,
        date: new Date('2024-01-08'),
        expiryDate: new Date('2024-01-25'),
        status: 'answered',
        notes: 'Request for networking equipment',
      },
    }),
  ])

  // Create demo RFQ items
  await Promise.all([
    prisma.rFQItem.upsert({
      where: { id: 'rfqitem1' },
      update: {},
      create: {
        id: 'rfqitem1',
        rfqId: rfqs[0].id,
        description: 'Dell PowerEdge Server',
        quantity: 2,
      },
    }),
    prisma.rFQItem.upsert({
      where: { id: 'rfqitem2' },
      update: {},
      create: {
        id: 'rfqitem2',
        rfqId: rfqs[1].id,
        description: 'Cisco Switch 24-port',
        quantity: 5,
      },
    }),
  ])

  // Create demo purchase orders
  const purchaseOrders = await Promise.all([
    prisma.purchaseOrder.upsert({
      where: { number: 'PO001' },
      update: {},
      create: {
        number: 'PO001',
        supplierId: suppliers[0].id,
        date: new Date('2024-01-10'),
        status: 'confirmed',
        subtotal: 10000,
        tax: 1000,
        total: 11000,
        notes: 'Server hardware purchase',
        createdById: adminUser.id,
      },
    }),
    prisma.purchaseOrder.upsert({
      where: { number: 'PO002' },
      update: {},
      create: {
        number: 'PO002',
        supplierId: suppliers[1].id,
        date: new Date('2024-01-15'),
        status: 'delivered',
        subtotal: 4000,
        tax: 400,
        total: 4400,
        notes: 'Networking equipment',
        createdById: adminUser.id,
      },
    }),
  ])

  // Create demo purchase order items
  await Promise.all([
    prisma.purchaseOrderItem.upsert({
      where: { id: 'poitem1' },
      update: {},
      create: {
        id: 'poitem1',
        purchaseOrderId: purchaseOrders[0].id,
        description: 'Dell PowerEdge Server',
        quantity: 2,
        unitPrice: 5000,
        subtotal: 10000,
        taxRate: 0.1,
        tax: 1000,
        total: 11000,
      },
    }),
    prisma.purchaseOrderItem.upsert({
      where: { id: 'poitem2' },
      update: {},
      create: {
        id: 'poitem2',
        purchaseOrderId: purchaseOrders[1].id,
        description: 'Cisco Switch 24-port',
        quantity: 5,
        unitPrice: 800,
        subtotal: 4000,
        taxRate: 0.1,
        tax: 400,
        total: 4400,
      },
    }),
  ])

  // Create demo projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'project1' },
      update: {},
      create: {
        id: 'project1',
        name: 'ERP System Implementation',
        description: 'Complete ERP system implementation for Tech Corp',
        customerId: customers[0].id,
        status: 'active',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-30'),
        budget: 100000,
        managerId: adminUser.id,
      },
    }),
    prisma.project.upsert({
      where: { id: 'project2' },
      update: {},
      create: {
        id: 'project2',
        name: 'Cloud Migration Project',
        description: 'Migrate infrastructure to cloud for Startup IO',
        customerId: customers[1].id,
        status: 'planning',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-08-31'),
        budget: 150000,
        managerId: salesUser.id,
      },
    }),
    prisma.project.upsert({
      where: { id: 'project3' },
      update: {},
      create: {
        id: 'project3',
        name: 'Website Redesign',
        description: 'Complete website redesign for Manufacturing Co',
        customerId: customers[2].id,
        status: 'completed',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2024-01-15'),
        budget: 25000,
        managerId: adminUser.id,
      },
    }),
  ])

  // Create demo tasks
  const tasks = await Promise.all([
    prisma.task.upsert({
      where: { id: 'task1' },
      update: {},
      create: {
        id: 'task1',
        name: 'Requirements Analysis',
        description: 'Gather and analyze system requirements',
        projectId: projects[0].id,
        status: 'done',
        priority: 'high',
        endDate: new Date('2024-01-15'),
        assigneeId: adminUser.id,
      },
    }),
    prisma.task.upsert({
      where: { id: 'task2' },
      update: {},
      create: {
        id: 'task2',
        name: 'System Design',
        description: 'Create system architecture and design documents',
        projectId: projects[0].id,
        status: 'in_progress',
        priority: 'high',
        endDate: new Date('2024-02-01'),
        assigneeId: salesUser.id,
      },
    }),
    prisma.task.upsert({
      where: { id: 'task3' },
      update: {},
      create: {
        id: 'task3',
        name: 'Infrastructure Assessment',
        description: 'Assess current infrastructure for cloud migration',
        projectId: projects[1].id,
        status: 'todo',
        priority: 'medium',
        endDate: new Date('2024-02-15'),
        assigneeId: adminUser.id,
      },
    }),
    prisma.task.upsert({
      where: { id: 'task4' },
      update: {},
      create: {
        id: 'task4',
        name: 'UI/UX Design',
        description: 'Create user interface and experience designs',
        projectId: projects[2].id,
        status: 'done',
        priority: 'medium',
        endDate: new Date('2023-11-30'),
        assigneeId: salesUser.id,
      },
    }),
  ])

  // Create demo time entries
  await Promise.all([
    prisma.timeEntry.upsert({
      where: { id: 'time1' },
      update: {},
      create: {
        id: 'time1',
        projectId: projects[0].id,
        taskId: tasks[0].id,
        userId: adminUser.id,
        date: new Date('2024-01-10'),
        hours: 8,
        description: 'Requirements gathering meetings',
        billable: true,
        rate: 100,
      },
    }),
    prisma.timeEntry.upsert({
      where: { id: 'time2' },
      update: {},
      create: {
        id: 'time2',
        projectId: projects[0].id,
        taskId: tasks[0].id,
        userId: adminUser.id,
        date: new Date('2024-01-11'),
        hours: 6,
        description: 'Requirements documentation',
        billable: true,
        rate: 100,
      },
    }),
    prisma.timeEntry.upsert({
      where: { id: 'time3' },
      update: {},
      create: {
        id: 'time3',
        projectId: projects[0].id,
        taskId: tasks[1].id,
        userId: salesUser.id,
        date: new Date('2024-01-15'),
        hours: 4,
        description: 'System architecture design',
        billable: true,
        rate: 80,
      },
    }),
    prisma.timeEntry.upsert({
      where: { id: 'time4' },
      update: {},
      create: {
        id: 'time4',
        projectId: projects[2].id,
        taskId: tasks[3].id,
        userId: salesUser.id,
        date: new Date('2023-11-15'),
        hours: 7,
        description: 'UI design mockups',
        billable: true,
        rate: 80,
      },
    }),
  ])

  // Create demo subscriptions
  const subscriptions = await Promise.all([
    prisma.subscription.upsert({
      where: { id: 'subscription1' },
      update: {},
      create: {
        id: 'subscription1',
        customerId: customers[0].id,
        name: 'Enterprise Software License',
        description: 'Annual enterprise software license',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        frequency: 'yearly',
        amount: 30000,
        status: 'active',
        createdById: adminUser.id,
      },
    }),
    prisma.subscription.upsert({
      where: { id: 'subscription2' },
      update: {},
      create: {
        id: 'subscription2',
        customerId: customers[1].id,
        name: 'Technical Support Package',
        description: '24/7 technical support and maintenance',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2025-01-15'),
        frequency: 'yearly',
        amount: 6000,
        status: 'active',
        createdById: salesUser.id,
      },
    }),
    prisma.subscription.upsert({
      where: { id: 'subscription3' },
      update: {},
      create: {
        id: 'subscription3',
        customerId: customers[2].id,
        name: 'Cloud Hosting Services',
        description: 'Monthly cloud hosting and infrastructure',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-08-01'),
        frequency: 'monthly',
        amount: 500,
        status: 'active',
        createdById: adminUser.id,
      },
    }),
  ])

  // Create demo subscription invoices
  await Promise.all([
    prisma.subscriptionInvoice.upsert({
      where: { id: 'subinv1' },
      update: {},
      create: {
        id: 'subinv1',
        subscriptionId: subscriptions[0].id,
        invoiceId: invoices[0].id,
        date: new Date('2024-01-01'),
        dueDate: new Date('2024-01-31'),
        amount: 30000,
        status: 'paid',
      },
    }),
    prisma.subscriptionInvoice.upsert({
      where: { id: 'subinv2' },
      update: {},
      create: {
        id: 'subinv2',
        subscriptionId: subscriptions[1].id,
        invoiceId: invoices[1].id,
        date: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        amount: 6000,
        status: 'sent',
      },
    }),
  ])

  // Create demo employees
  const employees = await Promise.all([
    prisma.employee.upsert({
      where: { code: 'EMP001' },
      update: {},
      create: {
        id: 'employee1',
        code: 'EMP001',
        userId: adminUser.id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@demo-company.com',
        phone: '+1-555-0001',
        position: 'Software Engineer',
        department: 'Engineering',
        hireDate: new Date('2023-01-15'),
        salary: 85000,
        status: 'active',
      },
    }),
    prisma.employee.upsert({
      where: { code: 'EMP002' },
      update: {},
      create: {
        id: 'employee2',
        code: 'EMP002',
        userId: salesUser.id,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@demo-company.com',
        phone: '+1-555-0002',
        position: 'Sales Manager',
        department: 'Sales',
        hireDate: new Date('2022-06-01'),
        salary: 75000,
        status: 'active',
      },
    }),
    prisma.employee.upsert({
      where: { code: 'EMP003' },
      update: {},
      create: {
        id: 'employee3',
        code: 'EMP003',
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@demo-company.com',
        phone: '+1-555-0003',
        position: 'HR Manager',
        department: 'Human Resources',
        hireDate: new Date('2021-03-10'),
        salary: 70000,
        status: 'active',
      },
    }),
  ])

  // Create demo attendance records
  await Promise.all([
    prisma.attendance.upsert({
      where: { id: 'att1' },
      update: {},
      create: {
        id: 'att1',
        employeeId: employees[0].id,
        date: new Date('2024-01-15'),
        clockIn: new Date('2024-01-15T09:00:00'),
        clockOut: new Date('2024-01-15T17:30:00'),
        totalHours: 8.5,
        status: 'approved',
      },
    }),
    prisma.attendance.upsert({
      where: { id: 'att2' },
      update: {},
      create: {
        id: 'att2',
        employeeId: employees[1].id,
        date: new Date('2024-01-15'),
        clockIn: new Date('2024-01-15T08:45:00'),
        clockOut: new Date('2024-01-15T17:15:00'),
        totalHours: 8.5,
        status: 'approved',
      },
    }),
    prisma.attendance.upsert({
      where: { id: 'att3' },
      update: {},
      create: {
        id: 'att3',
        employeeId: employees[2].id,
        date: new Date('2024-01-15'),
        clockIn: new Date('2024-01-15T09:15:00'),
        clockOut: new Date('2024-01-15T17:45:00'),
        totalHours: 8.5,
        status: 'approved',
      },
    }),
  ])

  // Create demo payroll records
  const payrollRecords = await Promise.all([
    prisma.payrollRecord.upsert({
      where: { id: 'payroll1' },
      update: {},
      create: {
        id: 'payroll1',
        employeeId: employees[0].id,
        period: '2024-01',
        grossSalary: 7083.33,
        deductions: 1583.33,
        netSalary: 5500.00,
        status: 'paid',
        payDate: new Date('2024-01-31'),
      },
    }),
    prisma.payrollRecord.upsert({
      where: { id: 'payroll2' },
      update: {},
      create: {
        id: 'payroll2',
        employeeId: employees[1].id,
        period: '2024-01',
        grossSalary: 6250.00,
        deductions: 1400.00,
        netSalary: 4850.00,
        status: 'paid',
        payDate: new Date('2024-01-31'),
      },
    }),
  ])

  // Create demo payroll items
  await Promise.all([
    prisma.payrollItem.upsert({
      where: { id: 'payitem1' },
      update: {},
      create: {
        id: 'payitem1',
        payrollRecordId: payrollRecords[0].id,
        type: 'salary',
        description: 'Base Salary',
        amount: 7083.33,
      },
    }),
    prisma.payrollItem.upsert({
      where: { id: 'payitem2' },
      update: {},
      create: {
        id: 'payitem2',
        payrollRecordId: payrollRecords[0].id,
        type: 'tax',
        description: 'Income Tax',
        amount: -1083.33,
      },
    }),
    prisma.payrollItem.upsert({
      where: { id: 'payitem3' },
      update: {},
      create: {
        id: 'payitem3',
        payrollRecordId: payrollRecords[0].id,
        type: 'deduction',
        description: 'Health Insurance',
        amount: -300.00,
      },
    }),
    prisma.payrollItem.upsert({
      where: { id: 'payitem4' },
      update: {},
      create: {
        id: 'payitem4',
        payrollRecordId: payrollRecords[0].id,
        type: 'deduction',
        description: '401k Contribution',
        amount: -200.00,
      },
    }),
  ])

  // Create demo assets
  const assets = await Promise.all([
    prisma.asset.upsert({
      where: { code: 'AST001' },
      update: {},
      create: {
        id: 'asset1',
        code: 'AST001',
        name: 'Dell PowerEdge Server',
        description: 'Main production server',
        category: 'it_equipment',
        purchaseDate: new Date('2023-01-15'),
        purchasePrice: 10000,
        currentValue: 7500,
        location: 'Server Room',
        department: 'IT',
        status: 'active',
      },
    }),
    prisma.asset.upsert({
      where: { code: 'AST002' },
      update: {},
      create: {
        id: 'asset2',
        code: 'AST002',
        name: 'Company Vehicle',
        description: 'Toyota Camry for sales visits',
        category: 'vehicle',
        purchaseDate: new Date('2022-06-01'),
        purchasePrice: 25000,
        currentValue: 18750,
        location: 'Company Garage',
        department: 'Sales',
        status: 'active',
      },
    }),
    prisma.asset.upsert({
      where: { code: 'AST003' },
      update: {},
      create: {
        id: 'asset3',
        code: 'AST003',
        name: 'Office Furniture Set',
        description: 'Executive desk and chair',
        category: 'furniture',
        purchaseDate: new Date('2021-03-10'),
        purchasePrice: 3000,
        currentValue: 1500,
        location: 'Office 101',
        department: 'HR',
        status: 'active',
      },
    }),
  ])

  // Create demo depreciation records
  await Promise.all([
    prisma.depreciationRecord.upsert({
      where: { id: 'dep1' },
      update: {},
      create: {
        id: 'dep1',
        assetId: assets[0].id,
        date: new Date('2023-12-31'),
        amount: 2000,
        accumulatedValue: 2500,
        bookValue: 7500,
        method: 'straight_line',
      },
    }),
    prisma.depreciationRecord.upsert({
      where: { id: 'dep2' },
      update: {},
      create: {
        id: 'dep2',
        assetId: assets[1].id,
        date: new Date('2023-12-31'),
        amount: 6250,
        accumulatedValue: 6250,
        bookValue: 18750,
        method: 'straight_line',
      },
    }),
  ])

  // Create demo maintenance records
  await Promise.all([
    prisma.maintenanceRecord.upsert({
      where: { id: 'maint1' },
      update: {},
      create: {
        id: 'maint1',
        assetId: assets[0].id,
        maintenanceType: 'preventive',
        description: 'Quarterly server maintenance',
        cost: 500,
        performedBy: 'IT Support Team',
        performedDate: new Date('2024-01-10'),
        status: 'completed',
        nextMaintenanceDate: new Date('2024-04-10'),
      },
    }),
    prisma.maintenanceRecord.upsert({
      where: { id: 'maint2' },
      update: {},
      create: {
        id: 'maint2',
        assetId: assets[1].id,
        maintenanceType: 'preventive',
        description: 'Oil change and tire rotation',
        cost: 150,
        performedBy: 'Auto Service Center',
        performedDate: new Date('2024-01-05'),
        status: 'completed',
        nextMaintenanceDate: new Date('2024-04-05'),
      },
    }),
  ])

  // Create demo quality inspections
  const qualityInspections = await Promise.all([
    prisma.qualityInspection.upsert({
      where: { reference: 'QI001' },
      update: {},
      create: {
        id: 'qi1',
        reference: 'QI001',
        inspectionType: 'incoming',
        productId: products[0].id,
        date: new Date('2024-01-10'),
        status: 'passed',
        notes: 'All quality checks passed',
      },
    }),
    prisma.qualityInspection.upsert({
      where: { reference: 'QI002' },
      update: {},
      create: {
        id: 'qi2',
        reference: 'QI002',
        inspectionType: 'in_process',
        productId: products[1].id,
        date: new Date('2024-01-12'),
        status: 'failed',
        notes: 'Minor defects found, requires rework',
      },
    }),
  ])

  // Create demo inspection items
  await Promise.all([
    prisma.inspectionItem.upsert({
      where: { id: 'ii1' },
      update: {},
      create: {
        id: 'ii1',
        inspectionId: qualityInspections[0].id,
        parameter: 'Software License Validation',
        result: 'pass',
        status: 'pass',
        notes: 'License keys are valid and active',
      },
    }),
    prisma.inspectionItem.upsert({
      where: { id: 'ii2' },
      update: {},
      create: {
        id: 'ii2',
        inspectionId: qualityInspections[0].id,
        parameter: 'Documentation Completeness',
        result: 'pass',
        status: 'pass',
        notes: 'All documentation provided',
      },
    }),
    prisma.inspectionItem.upsert({
      where: { id: 'ii3' },
      update: {},
      create: {
        id: 'ii3',
        inspectionId: qualityInspections[1].id,
        parameter: 'Service Level Agreement',
        result: 'fail',
        status: 'fail',
        notes: 'Response time not meeting SLA requirements',
      },
    }),
  ])

  // Create demo non-conformances
  const nonConformances = await Promise.all([
    prisma.nonConformance.upsert({
      where: { reference: 'NC001' },
      update: {},
      create: {
        id: 'nc1',
        reference: 'NC001',
        description: 'Cloud migration service response time exceeds SLA',
        severity: 'medium',
        type: 'process',
        detectedDate: new Date('2024-01-12'),
        status: 'open',
      },
    }),
    prisma.nonConformance.upsert({
      where: { reference: 'NC002' },
      update: {},
      create: {
        id: 'nc2',
        reference: 'NC002',
        description: 'Technical support package missing user manual',
        severity: 'high',
        type: 'documentation',
        detectedDate: new Date('2024-01-15'),
        status: 'in_progress',
      },
    }),
  ])

  // Create demo corrective actions
  await Promise.all([
    prisma.correctiveAction.upsert({
      where: { id: 'ca1' },
      update: {},
      create: {
        id: 'ca1',
        nonConformanceId: nonConformances[0].id,
        description: 'Optimize cloud infrastructure for faster response',
        dueDate: new Date('2024-01-25'),
        status: 'in_progress',
      },
    }),
    prisma.correctiveAction.upsert({
      where: { id: 'ca2' },
      update: {},
      create: {
        id: 'ca2',
        nonConformanceId: nonConformances[1].id,
        description: 'Create and distribute user manual',
        dueDate: new Date('2024-01-30'),
        status: 'pending',
      },
    }),
  ])

  // Create demo document categories
  const documentCategories = await Promise.all([
    prisma.documentCategory.upsert({
      where: { id: 'cat1' },
      update: {},
      create: {
        id: 'cat1',
        name: 'Contracts',
        description: 'Legal contracts and agreements',
      },
    }),
    prisma.documentCategory.upsert({
      where: { id: 'cat2' },
      update: {},
      create: {
        id: 'cat2',
        name: 'Policies',
        description: 'Company policies and procedures',
      },
    }),
    prisma.documentCategory.upsert({
      where: { id: 'cat3' },
      update: {},
      create: {
        id: 'cat3',
        name: 'Technical',
        description: 'Technical documentation and specifications',
      },
    }),
  ])

  // Create demo documents
  const documents = await Promise.all([
    prisma.document.upsert({
      where: { id: 'doc1' },
      update: {},
      create: {
        id: 'doc1',
        title: 'Master Service Agreement',
        description: 'MSA with Tech Corp',
        categoryId: documentCategories[0].id,
        fileName: 'msa_tech_corp.pdf',
        filePath: '/documents/msa_tech_corp.pdf',
        fileSize: 2048576,
        mimeType: 'application/pdf',
        version: 1,
        status: 'approved',
      },
    }),
    prisma.document.upsert({
      where: { id: 'doc2' },
      update: {},
      create: {
        id: 'doc2',
        title: 'Employee Handbook',
        description: 'Company employee handbook and policies',
        categoryId: documentCategories[1].id,
        fileName: 'employee_handbook.pdf',
        filePath: '/documents/employee_handbook.pdf',
        fileSize: 1048576,
        mimeType: 'application/pdf',
        version: 1,
        status: 'approved',
      },
    }),
    prisma.document.upsert({
      where: { id: 'doc3' },
      update: {},
      create: {
        id: 'doc3',
        title: 'System Architecture',
        description: 'ERP system architecture documentation',
        categoryId: documentCategories[2].id,
        fileName: 'system_architecture.docx',
        filePath: '/documents/system_architecture.docx',
        fileSize: 512000,
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        version: 1,
        status: 'draft',
      },
    }),
  ])

  // Create demo document versions
  await Promise.all([
    prisma.documentVersion.upsert({
      where: { id: 'ver1' },
      update: {},
      create: {
        id: 'ver1',
        documentId: documents[0].id,
        version: 1,
        fileName: 'msa_tech_corp_v1.pdf',
        filePath: '/documents/msa_tech_corp_v1.pdf',
        fileSize: 2048576,
        mimeType: 'application/pdf',
        changeLog: 'Initial version',
      },
    }),
    prisma.documentVersion.upsert({
      where: { id: 'ver2' },
      update: {},
      create: {
        id: 'ver2',
        documentId: documents[1].id,
        version: 1,
        fileName: 'employee_handbook_v1.pdf',
        filePath: '/documents/employee_handbook_v1.pdf',
        fileSize: 1048576,
        mimeType: 'application/pdf',
        changeLog: 'Initial version',
      },
    }),
  ])

  // Create demo document approval workflows
  await Promise.all([
    prisma.documentApprovalWorkflow.upsert({
      where: { id: 'workflow1' },
      update: {},
      create: {
        id: 'workflow1',
        documentId: documents[2].id,
        status: 'pending',
        sequence: 1,
        dueDate: new Date('2024-01-25'),
      },
    }),
  ])

  // Create demo KPIs
  const kpis = await Promise.all([
    prisma.kPI.upsert({
      where: { id: 'kpi1' },
      update: {},
      create: {
        id: 'kpi1',
        name: 'Monthly Revenue',
        description: 'Total monthly revenue',
        targetValue: 100000,
        currentValue: 74250,
        unit: 'USD',
        category: 'financial',
        frequency: 'monthly',
        createdById: adminUser.id,
      },
    }),
    prisma.kPI.upsert({
      where: { id: 'kpi2' },
      update: {},
      create: {
        id: 'kpi2',
        name: 'Customer Satisfaction',
        description: 'Average customer satisfaction score',
        targetValue: 90,
        currentValue: 85,
        unit: '%',
        category: 'customer',
        frequency: 'monthly',
        createdById: salesUser.id,
      },
    }),
    prisma.kPI.upsert({
      where: { id: 'kpi3' },
      update: {},
      create: {
        id: 'kpi3',
        name: 'Project Completion Rate',
        description: 'Percentage of projects completed on time',
        targetValue: 95,
        currentValue: 88,
        unit: '%',
        category: 'operational',
        frequency: 'monthly',
        createdById: adminUser.id,
      },
    }),
  ])

  // Create demo dashboards
  const dashboards = await Promise.all([
    prisma.dashboard.upsert({
      where: { id: 'dash1' },
      update: {},
      create: {
        id: 'dash1',
        name: 'Executive Dashboard',
        description: 'High-level business metrics and KPIs',
        layout: JSON.stringify({ grid: '12x12', widgets: [] }),
        isPublic: true,
        createdById: adminUser.id,
      },
    }),
    prisma.dashboard.upsert({
      where: { id: 'dash2' },
      update: {},
      create: {
        id: 'dash2',
        name: 'Sales Dashboard',
        description: 'Sales performance and pipeline metrics',
        layout: JSON.stringify({ grid: '12x12', widgets: [] }),
        isPublic: false,
        createdById: salesUser.id,
      },
    }),
  ])

  // Create demo dashboard widgets
  await Promise.all([
    prisma.dashboardWidget.upsert({
      where: { id: 'widget1' },
      update: {},
      create: {
        id: 'widget1',
        dashboardId: dashboards[0].id,
        title: 'Revenue Trend',
        type: 'chart',
        position: 1,
        config: JSON.stringify({ chartType: 'line', period: '6months' }),
      },
    }),
    prisma.dashboardWidget.upsert({
      where: { id: 'widget2' },
      update: {},
      create: {
        id: 'widget2',
        dashboardId: dashboards[0].id,
        title: 'KPI Summary',
        type: 'kpi',
        position: 2,
        config: JSON.stringify({ kpiIds: ['kpi1', 'kpi2', 'kpi3'] }),
      },
    }),
    prisma.dashboardWidget.upsert({
      where: { id: 'widget3' },
      update: {},
      create: {
        id: 'widget3',
        dashboardId: dashboards[1].id,
        title: 'Sales Pipeline',
        type: 'chart',
        position: 1,
        config: JSON.stringify({ chartType: 'funnel', period: 'current' }),
      },
    }),
  ])

  // Create demo reports
  const reports = await Promise.all([
    prisma.report.upsert({
      where: { id: 'report1' },
      update: {},
      create: {
        id: 'report1',
        name: 'Monthly Financial Report',
        description: 'Comprehensive monthly financial analysis',
        type: 'standard',
        category: 'financial',
        dataSource: 'single_module',
        createdById: adminUser.id,
      },
    }),
    prisma.report.upsert({
      where: { id: 'report2' },
      update: {},
      create: {
        id: 'report2',
        name: 'Sales Performance Report',
        description: 'Quarterly sales performance analysis',
        type: 'standard',
        category: 'sales',
        dataSource: 'single_module',
        createdById: salesUser.id,
      },
    }),
    prisma.report.upsert({
      where: { id: 'report3' },
      update: {},
      create: {
        id: 'report3',
        name: 'Project Status Report',
        description: 'Weekly project status updates',
        type: 'standard',
        category: 'operational',
        dataSource: 'single_module',
        createdById: adminUser.id,
      },
    }),
  ])

  // Create demo AI agents
  const aiAgents = await Promise.all([
    prisma.aIAgent.upsert({
      where: { id: 'aiagent1' },
      update: {},
      create: {
        id: 'aiagent1',
        name: 'Sales Assistant',
        type: 'assistant',
        model: 'gpt-4',
        config: JSON.stringify({ temperature: 0.7, maxTokens: 1000 }),
        isActive: true,
      },
    }),
    prisma.aIAgent.upsert({
      where: { id: 'aiagent2' },
      update: {},
      create: {
        id: 'aiagent2',
        name: 'Financial Analyst',
        type: 'analyzer',
        model: 'gpt-4',
        config: JSON.stringify({ temperature: 0.3, maxTokens: 2000 }),
        isActive: true,
      },
    }),
  ])

  // Create demo AI conversations
  await Promise.all([
    prisma.aIConversation.upsert({
      where: { id: 'conv1' },
      update: {},
      create: {
        id: 'conv1',
        agentId: aiAgents[0].id,
        userId: adminUser.id,
        sessionId: 'session1',
        messages: JSON.stringify([
          { role: 'user', content: 'What is the sales forecast for Q1?' },
          { role: 'assistant', content: 'Based on current trends, Q1 sales are projected to increase by 15%.' }
        ]),
        status: 'closed',
      },
    }),
  ])

  // Create demo AI insights
  await Promise.all([
    prisma.aIInsight.upsert({
      where: { id: 'insight1' },
      update: {},
      create: {
        id: 'insight1',
        type: 'customer_behavior',
        title: 'Customer Churn Prediction',
        description: 'AI identified customers at risk of churning',
        confidence: 0.85,
        data: JSON.stringify({ atRiskCustomers: 12, riskFactors: ['low_engagement', 'support_tickets'] }),
        recommendations: JSON.stringify(['Reach out personally', 'Offer discount', 'Schedule review meeting']),
        status: 'reviewed',
      },
    }),
  ])

  // Create demo contracts
  const contracts = await Promise.all([
    prisma.contract.upsert({
      where: { id: 'contract1' },
      update: {},
      create: {
        id: 'contract1',
        title: 'Enterprise Software License Agreement',
        type: 'License',
        status: 'Active',
        value: 100000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        renewalDate: new Date('2024-12-01'),
        description: 'Master agreement for enterprise software licensing',
        riskLevel: 'Medium',
        compliance: 'Compliant',
        createdBy: adminUser.id,
      },
    }),
    prisma.contract.upsert({
      where: { id: 'contract2' },
      update: {},
      create: {
        id: 'contract2',
        title: 'Cloud Services Agreement',
        type: 'SLA',
        status: 'Active',
        value: 50000,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2025-01-15'),
        renewalDate: new Date('2024-12-15'),
        description: 'Annual cloud hosting and maintenance services',
        riskLevel: 'Low',
        compliance: 'Compliant',
        createdBy: salesUser.id,
      },
    }),
  ])

  // Create demo contract templates
  const contractTemplates = await Promise.all([
    prisma.contractTemplate.upsert({
      where: { id: 'template1' },
      update: {},
      create: {
        id: 'template1',
        name: 'Standard Software License Agreement',
        category: 'Technology',
        description: 'Template for software licensing contracts',
        version: '1.0',
        status: 'Active',
        requiredFields: JSON.stringify(['title', 'type', 'value', 'startDate', 'endDate']),
        content: 'Standard terms and conditions for software licensing...',
        createdBy: adminUser.id,
      },
    }),
  ])

  // Create demo contract approval workflows
  await Promise.all([
    prisma.contractApprovalWorkflow.upsert({
      where: { id: 'workflow1' },
      update: {},
      create: {
        id: 'workflow1',
        name: 'Standard Contract Approval',
        contractId: contracts[0].id,
        stages: JSON.stringify(['Legal Review', 'Management Approval', 'Final Sign-off']),
        currentStage: 'Management Approval',
        totalStages: 3,
        progress: 66.7,
        status: 'In Progress',
        assignedTo: adminUser.id,
      },
    }),
  ])

  // Create demo contract renewals
  await Promise.all([
    prisma.contractRenewal.upsert({
      where: { id: 'renewal1' },
      update: {},
      create: {
        id: 'renewal1',
        contractId: contracts[0].id,
        value: 120000,
        renewalDate: new Date('2024-12-01'),
        daysLeft: 45,
        status: 'On Track',
        autoRenew: false,
        renewalTerms: JSON.stringify({ duration: '2 years', priceIncrease: 20 }),
        assignedTo: adminUser.id,
        notes: 'Customer interested in renewal with expanded scope',
      },
    }),
  ])

  // Create demo GRC risks
  const grcRisks = await Promise.all([
    prisma.gRCRisk.upsert({
      where: { id: 'risk1' },
      update: {},
      create: {
        id: 'risk1',
        title: 'Data Security Breach',
        description: 'Risk of unauthorized access to customer data',
        category: 'Compliance',
        riskLevel: 'High',
        status: 'Open',
        probability: 7,
        impact: 9,
        ownerId: adminUser.id,
        dueDate: new Date('2024-03-01'),
        mitigationStrategy: 'Implement multi-factor authentication and encryption',
      },
    }),
    prisma.gRCRisk.upsert({
      where: { id: 'risk2' },
      update: {},
      create: {
        id: 'risk2',
        title: 'Regulatory Compliance',
        description: 'Risk of non-compliance with new data protection regulations',
        category: 'Compliance',
        riskLevel: 'Medium',
        status: 'Monitoring',
        probability: 5,
        impact: 7,
        ownerId: adminUser.id,
        dueDate: new Date('2024-06-01'),
        mitigationStrategy: 'Regular compliance audits and policy updates',
      },
    }),
  ])

  // Create demo GRC risk mitigations
  await Promise.all([
    prisma.gRCRiskMitigation.upsert({
      where: { id: 'mitigation1' },
      update: {},
      create: {
        id: 'mitigation1',
        riskId: grcRisks[0].id,
        title: 'Implement Multi-Factor Authentication',
        description: 'Add MFA to all critical systems and applications',
        assignedTo: adminUser.id,
        dueDate: new Date('2024-03-01'),
        status: 'In Progress',
        effectiveness: 'High',
        cost: 15000,
      },
    }),
  ])

  // Create demo GRC policies
  const grcPolicies = await Promise.all([
    prisma.gRCPolicy.upsert({
      where: { id: 'policy1' },
      update: {},
      create: {
        id: 'policy1',
        title: 'Data Protection Policy',
        category: 'Security',
        description: 'Company policy on data protection and privacy',
        content: 'Comprehensive data protection and privacy policy covering all aspects of data handling...',
        version: '1.0',
        status: 'Active',
        ownerId: adminUser.id,
        distributionScope: 'All Employees',
        reviewFrequency: 'annual',
        lastReviewed: new Date('2024-01-01'),
        nextReview: new Date('2025-01-01'),
        approvedAt: new Date('2023-12-15'),
        approvedBy: adminUser.id,
      },
    }),
  ])

  // Create demo GRC audits
  const grcAudits = await Promise.all([
    prisma.gRCAudit.upsert({
      where: { id: 'audit1' },
      update: {},
      create: {
        id: 'audit1',
        title: 'Q1 Security Audit',
        type: 'Internal',
        scope: 'Information Security Management System',
        description: 'Quarterly security systems and procedures audit',
        leadAuditorId: adminUser.id,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-30'),
        status: 'In Progress',
        budget: 25000,
        actualCost: 15000,
        findings: 2,
        recommendations: 5,
      },
    }),
  ])

  // Create demo R&D projects
  const rdProjects = await Promise.all([
    prisma.rDProject.upsert({
      where: { id: 'rdproject1' },
      update: {},
      create: {
        id: 'rdproject1',
        name: 'AI-Powered Analytics Engine',
        description: 'Development of advanced AI analytics capabilities',
        category: 'artificial-intelligence',
        status: 'active',
        priority: 'high',
        budget: 500000,
        spent: 125000,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        teamSize: 5,
        progress: 25,
        roi: 3.5,
        objectives: JSON.stringify(['Develop ML algorithms', 'Create real-time processing', 'Build predictive models']),
        deliverables: JSON.stringify(['Analytics engine', 'API documentation', 'Training materials']),
        createdById: adminUser.id,
      },
    }),
    prisma.rDProject.upsert({
      where: { id: 'rdproject2' },
      update: {},
      create: {
        id: 'rdproject2',
        name: 'Blockchain Integration',
        description: 'Research and development of blockchain-based supply chain tracking',
        category: 'blockchain',
        status: 'planning',
        priority: 'medium',
        budget: 300000,
        spent: 0,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2025-02-28'),
        teamSize: 3,
        progress: 0,
        roi: 2.8,
        objectives: JSON.stringify(['Research blockchain tech', 'Develop prototype', 'Test with partners']),
        deliverables: JSON.stringify(['Blockchain prototype', 'Integration guide', 'Performance report']),
        createdById: adminUser.id,
      },
    }),
  ])

  // Create demo R&D teams
  const rdTeams = await Promise.all([
    prisma.rDTeam.upsert({
      where: { id: 'rdteam1' },
      update: {},
      create: {
        id: 'rdteam1',
        name: 'AI Research Team',
        description: 'Team focused on artificial intelligence research',
        leadId: adminUser.id,
        specializations: JSON.stringify(['machine-learning', 'natural-language-processing', 'computer-vision']),
        budget: 200000,
        isActive: true,
      },
    }),
  ])

  // Create demo R&D team members
  await Promise.all([
    prisma.rDTeamMember.upsert({
      where: { id: 'rdmember1' },
      update: {},
      create: {
        id: 'rdmember1',
        teamId: rdTeams[0].id,
        userId: adminUser.id,
        projectId: rdProjects[0].id,
        role: 'lead',
        allocation: 100,
        startDate: new Date('2024-01-01'),
        skills: JSON.stringify(['machine-learning', 'python', 'data-science']),
        responsibilities: JSON.stringify(['Project leadership', 'Technical architecture', 'Team coordination']),
        performanceRating: 4.5,
      },
    }),
  ])

  // Create demo R&D intellectual property
  await Promise.all([
    prisma.rDIntellectualProperty.upsert({
      where: { id: 'ip1' },
      update: {},
      create: {
        id: 'ip1',
        title: 'Predictive Analytics Algorithm',
        type: 'patent',
        status: 'pending',
        filingDate: new Date('2024-01-15'),
        description: 'Proprietary algorithm for business predictions',
        inventors: JSON.stringify(['Dr. John Smith', 'Jane Doe']),
        projectId: rdProjects[0].id,
        value: 500000,
        jurisdiction: 'United States',
        category: 'Software Algorithm',
        legalStatus: 'Under Review',
      },
    }),
  ])

  // Create demo R&D innovations
  await Promise.all([
    prisma.rDInnovation.upsert({
      where: { id: 'innovation1' },
      update: {},
      create: {
        id: 'innovation1',
        name: 'Real-time Data Processing',
        description: 'Breakthrough in real-time data processing technology',
        stage: 'prototype',
        category: 'technology',
        potentialValue: 1000000,
        probability: 75,
        timeline: '6 months',
        investmentNeeded: 250000,
        teamMembers: JSON.stringify(['John Smith', 'Jane Doe', 'Mike Johnson']),
        dependencies: JSON.stringify(['AI model training', 'Infrastructure setup']),
        risks: JSON.stringify(['Technical complexity', 'Market acceptance']),
        opportunities: JSON.stringify(['New market entry', 'Competitive advantage']),
        status: 'active',
        priority: 'high',
      },
    }),
  ])

  console.log('✅ Demo data seeded successfully!')
  console.log('📊 Summary:')
  console.log(`   - Tenant: ${tenant.name}`)
  console.log(`   - Company: ${company.name}`)
  console.log(`   - Users: 2`)
  console.log(`   - Customers: ${customers.length}`)
  console.log(`   - Products: ${products.length}`)
  console.log(`   - Suppliers: ${suppliers.length}`)
  console.log(`   - Projects: ${projects.length}`)
  console.log(`   - Tasks: ${tasks.length}`)
  console.log(`   - Time Entries: 4`)
  console.log(`   - Subscriptions: ${subscriptions.length}`)
  console.log(`   - Employees: ${employees.length}`)
  console.log(`   - Attendance Records: 3`)
  console.log(`   - Payroll Records: ${payrollRecords.length}`)
  console.log(`   - Assets: ${assets.length}`)
  console.log(`   - Maintenance Records: 2`)
  console.log(`   - Quality Inspections: ${qualityInspections.length}`)
  console.log(`   - Non-Conformances: ${nonConformances.length}`)
  console.log(`   - Corrective Actions: 2`)
  console.log(`   - Documents: ${documents.length}`)
  console.log(`   - Document Categories: ${documentCategories.length}`)
  console.log(`   - KPIs: ${kpis.length}`)
  console.log(`   - Dashboards: ${dashboards.length}`)
  console.log(`   - Reports: ${reports.length}`)
  console.log(`   - AI Agents: ${aiAgents.length}`)
  console.log(`   - Contracts: ${contracts.length}`)
  console.log(`   - GRC Risks: ${grcRisks.length}`)
  console.log(`   - GRC Policies: ${grcPolicies.length}`)
  console.log(`   - GRC Audits: ${grcAudits.length}`)
  console.log(`   - R&D Projects: ${rdProjects.length}`)
  console.log(`   - R&D Teams: ${rdTeams.length}`)
  console.log(`   - Leads: ${leads.length}`)
  console.log(`   - Opportunities: ${opportunities.length}`)
  console.log(`   - Contacts: ${contacts.length}`)
  console.log(`   - Activities: ${activities.length}`)
  console.log(`   - Sales Orders: ${salesOrders.length}`)
  console.log(`   - Purchase Orders: ${purchaseOrders.length}`)
  console.log(`   - RFQs: ${rfqs.length}`)
  console.log(`   - Invoices: ${invoices.length}`)
  console.log(`   - Chart of Accounts: ${chartOfAccounts.length}`)
  console.log(`   - Transactions: ${transactions.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding demo data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })