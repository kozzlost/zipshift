/**
 * Invoicing System - QwikShift
 * @module payment/invoicing
 */

const crypto = require('crypto');

class InvoiceBuilder {
    constructor() { this.invoices = new Map(); }

  createInvoice(data) {
        const id = data.invoiceId || crypto.randomUUID();
        const inv = {
                id, number: `QS-${Date.now()}-${Math.random().toString(36).substr(2,5)}`,
                employerId: data.employerId, workerId: data.workerId, hireId: data.hireId,
                issueDate: new Date(), dueDate: data.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                amount: data.amount, lineItems: data.lineItems || [],
                status: 'draft', terms: data.terms || 'Net 30', notes: data.notes || '',
                paid: false, paidDate: null, chargeId: null
        };
        this.invoices.set(id, inv);
        return inv;
  }

  addLineItem(invId, desc, amt) {
        const inv = this.invoices.get(invId);
        if (inv) {
                inv.lineItems.push({ desc, amt, id: crypto.randomUUID() });
                inv.amount = inv.lineItems.reduce((s, l) => s + l.amt, 0);
        }
        return inv;
  }

  finalize(invId) {
        const inv = this.invoices.get(invId);
        if (inv) inv.status = 'sent';
        return inv;
  }

  getInvoice(invId) { return this.invoices.get(invId); }
    getByHire(hireId) { return Array.from(this.invoices.values()).find(i => i.hireId === hireId); }
}

class PaymentTerms {
    constructor() { this.terms = new Map(); }

  setTerms(invId, data) {
        const term = {
                invId, dueDate: data.dueDate, lateFeePercent: data.lateFeePercent || 0.05,
                discountPercent: data.earlyPayDiscount || 0, reminderDays: [7, 14, 21]
        };
        this.terms.set(invId, term);
        return term;
  }

  calcLate(invId) {
        const t = this.terms.get(invId);
        const inv = null; // get from InvoiceBuilder
      if (!t || !inv) return 0;
        const days = (new Date() - t.dueDate) / (1000 * 60 * 60 * 24);
        return days > 0 ? inv.amount * t.lateFeePercent : 0;
  }

  getTerms(invId) { return this.terms.get(invId); }
}

class InvoiceTracking {
    constructor() { this.statuses = new Map(); }

  trackStatus(invId) {
        const status = {
                invId, sent: new Date(), viewed: null, reminder1: null, reminder2: null, reminder3: null,
                paid: null, overdue: false, lateFee: 0
        };
        this.statuses.set(invId, status);
        return status;
  }

  markViewed(invId) {
        const s = this.statuses.get(invId);
        if (s && !s.viewed) s.viewed = new Date();
        return s;
  }

  markPaid(invId, chargeId, amt) {
        const s = this.statuses.get(invId);
        if (s) { s.paid = new Date(); s.chargeId = chargeId; s.amountPaid = amt; }
        return s;
  }

  markOverdue(invId) {
        const s = this.statuses.get(invId);
        if (s) s.overdue = true;
        return s;
  }

  getStatus(invId) { return this.statuses.get(invId); }
}

class InvoiceReporting {
    constructor(builder, tracking) {
          this.builder = builder;
          this.tracking = tracking;
    }

  getEmployerStatement(employerId) {
        const invs = Array.from(this.builder.invoices.values()).filter(i => i.employerId === employerId);
        const total = invs.reduce((s, i) => s + i.amount, 0);
        const paid = invs.filter(i => i.paid).reduce((s, i) => s + i.amount, 0);
        const outstanding = total - paid;
        const overdue = invs.filter(i => {
                const s = this.tracking.getStatus(i.id);
                return s?.overdue;
        }).length;
        return { employerId, invoiceCount: invs.length, totalInvoiced: total, totalPaid: paid, outstanding, overdue };
  }

  getInvoiceHistory(employerId) {
        return Array.from(this.builder.invoices.values())
          .filter(i => i.employerId === employerId)
          .map(i => ({ ...i, tracking: this.tracking.getStatus(i.id) }))
          .sort((a, b) => b.issueDate - a.issueDate);
  }

  getDueInvoices() {
        return Array.from(this.builder.invoices.values())
          .filter(i => !i.paid && new Date(i.dueDate) <= new Date())
          .map(i => ({ ...i, tracking: this.tracking.getStatus(i.id) }));
  }
}

module.exports = { InvoiceBuilder, PaymentTerms, InvoiceTracking, InvoiceReporting };
