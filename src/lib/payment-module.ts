export interface PaymentSettings {
  bankTransferInstructions: string;
  cryptoWalletAddress: string;
  customNotes: string;
  paymentMethods: string[];
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  entityName: string;
  amount: number;
  method: 'bank-transfer' | 'crypto' | 'other';
  receivedAt: string;
  status: 'pending' | 'paid' | 'cancelled';
  notes?: string;
  reference?: string;
}

export interface Invoice {
  id: string;
  entityName: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  dueDate?: string;
  paidAt?: string;
  paymentMethod?: string;
  reference?: string;
}

export class PaymentModule {
  private static instance: PaymentModule;
  private settings: PaymentSettings;
  private payments: PaymentRecord[];
  private invoices: Invoice[];

  private constructor() {
    this.settings = {
      bankTransferInstructions: "Bank: [Your Bank] | Account: [Account Number] | Routing: [Routing Number]",
      cryptoWalletAddress: "[Your Crypto Wallet Address]",
      customNotes: "Please include your UNA entity name in the payment reference",
      paymentMethods: ['bank-transfer', 'crypto']
    };
    
    this.payments = [];
    this.invoices = [];
    
    this.loadFromStorage();
  }

  static getInstance(): PaymentModule {
    if (!PaymentModule.instance) {
      PaymentModule.instance = new PaymentModule();
    }
    return PaymentModule.instance;
  }

  // Settings Management
  getSettings(): PaymentSettings {
    return { ...this.settings };
  }

  updateSettings(newSettings: Partial<PaymentSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    this.saveToStorage();
  }

  // Payment Records Management
  getPaymentRecords(): PaymentRecord[] {
    return [...this.payments];
  }

  addPaymentRecord(payment: Omit<PaymentRecord, 'id' | 'receivedAt'>): PaymentRecord {
    const newPayment: PaymentRecord = {
      ...payment,
      id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      receivedAt: new Date().toISOString()
    };
    
    this.payments.push(newPayment);
    this.saveToStorage();
    return newPayment;
  }

  updatePaymentRecord(id: string, updates: Partial<PaymentRecord>): PaymentRecord | null {
    const index = this.payments.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.payments[index] = { ...this.payments[index], ...updates };
    this.saveToStorage();
    return this.payments[index];
  }

  // Invoice Management
  getInvoices(): Invoice[] {
    return [...this.invoices];
  }

  createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'status'>): Invoice {
    const newInvoice: Invoice = {
      ...invoice,
      id: `invoice_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    this.invoices.push(newInvoice);
    this.saveToStorage();
    return newInvoice;
  }

  markInvoiceAsPaid(invoiceId: string, paymentMethod: string, reference?: string): Invoice | null {
    const invoice = this.invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;
    
    invoice.status = 'paid';
    invoice.paidAt = new Date().toISOString();
    invoice.paymentMethod = paymentMethod;
    invoice.reference = reference;
    
    this.saveToStorage();
    return invoice;
  }

  // Export Functions
  exportPaymentsCSV(): string {
    const headers = ['ID', 'Invoice ID', 'Entity Name', 'Amount', 'Method', 'Received At', 'Status', 'Notes', 'Reference'];
    const rows = this.payments.map(p => [
      p.id,
      p.invoiceId,
      p.entityName,
      p.amount.toFixed(2),
      p.method,
      new Date(p.receivedAt).toLocaleDateString(),
      p.status,
      p.notes || '',
      p.reference || ''
    ]);
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  exportInvoicesCSV(): string {
    const headers = ['ID', 'Entity Name', 'Amount', 'Description', 'Status', 'Created At', 'Due Date', 'Paid At', 'Payment Method', 'Reference'];
    const rows = this.invoices.map(i => [
      i.id,
      i.entityName,
      i.amount.toFixed(2),
      i.description,
      i.status,
      new Date(i.createdAt).toLocaleDateString(),
      i.dueDate ? new Date(i.dueDate).toLocaleDateString() : '',
      i.paidAt ? new Date(i.paidAt).toLocaleDateString() : '',
      i.paymentMethod || '',
      i.reference || ''
    ]);
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  // Analytics
  getPaymentAnalytics() {
    const totalPayments = this.payments.filter(p => p.status === 'paid').length;
    const totalRevenue = this.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    const pendingInvoices = this.invoices.filter(i => i.status === 'pending').length;
    const pendingAmount = this.invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
    
    return {
      totalPayments,
      totalRevenue,
      pendingInvoices,
      pendingAmount,
      paymentMethods: this.payments.reduce((acc, p) => {
        acc[p.method] = (acc[p.method] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  // Storage
  private loadFromStorage(): void {
    try {
      const storedSettings = localStorage.getItem('payment-settings');
      if (storedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(storedSettings) };
      }
      
      const storedPayments = localStorage.getItem('payment-records');
      if (storedPayments) {
        this.payments = JSON.parse(storedPayments);
      }
      
      const storedInvoices = localStorage.getItem('payment-invoices');
      if (storedInvoices) {
        this.invoices = JSON.parse(storedInvoices);
      }
    } catch (error) {
      console.error('Error loading payment data from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('payment-settings', JSON.stringify(this.settings));
      localStorage.setItem('payment-records', JSON.stringify(this.payments));
      localStorage.setItem('payment-invoices', JSON.stringify(this.invoices));
    } catch (error) {
      console.error('Error saving payment data to storage:', error);
    }
  }
}

// Default payment settings
export const defaultPaymentSettings: PaymentSettings = {
  bankTransferInstructions: "Bank: [Your Bank] | Account: [Account Number] | Routing: [Routing Number]",
  cryptoWalletAddress: "[Your Crypto Wallet Address]",
  customNotes: "Please include your UNA entity name in the payment reference",
  paymentMethods: ['bank-transfer', 'crypto']
};
