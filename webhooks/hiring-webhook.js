/**
 * Hiring Event Webhooks - QwikShift
 * @module webhooks/hiring-webhook
 */

const crypto = require('crypto');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class HiringWebhook {
    constructor(escrowMgr, invoiceGen, auditLogger) {
          this.escrowMgr = escrowMgr;
          this.invoiceGen = invoiceGen;
          this.auditLogger = auditLogger;
          this.handlers = new Map();
    }

  registerHandler(eventType, fn) { this.handlers.set(eventType, fn); }

  async handleHireCreated(hireData) {
        try {
                const escrow = this.escrowMgr.createEscrow(hireData.hireId, {
                          rate: hireData.rate, commissionRate: hireData.employerCommission, holdType: 'hire'
                });
                await this.escrowMgr.holdFunds(escrow.id);
                await this.auditLogger.log({
                          eventType: 'HIRE_ESCROW_CREATED', userId: hireData.employerId, resourceId: hireData.hireId,
                          metadata: { escrowId: escrow.id, amount: escrow.employerTotal }
                });
                return escrow;
        } catch (e) { console.error('Hire created webhook error:', e); throw e; }
  }

  async handleHireCompleted(hireId, hireData) {
        try {
                const escrow = this.escrowMgr.getByHire(hireId);
                if (!escrow) throw new Error('No escrow found');
                this.escrowMgr.markJobComplete(escrow.id);

          const invoice = await this.invoiceGen.createInvoice({
                    invoiceId: crypto.randomUUID(), employerId: hireData.employerId, workerId: hireData.workerId,
                    hireId, amount: escrow.employerTotal, lineItems: [
                      { desc: 'Event Staff Services', amt: escrow.workerRate },
                      { desc: `Platform Fee (${(escrow.commissionRate * 100).toFixed(0)}%)`, amt: escrow.platformFee }
                              ], dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          });

          await this.chargeEmployer(hireData.employerId, escrow.employerTotal, invoice.invoiceId);

          const released = await this.escrowMgr.releaseFunds(escrow.id);
                await this.auditLogger.log({
                          eventType: 'HIRE_COMPLETED_INVOICE', userId: hireData.employerId, resourceId: hireId,
                          metadata: { escrowId: escrow.id, invoiceId: invoice.invoiceId, chargeId: invoice.chargeId }
                });

          return { invoice, released };
        } catch (e) { console.error('Hire completed webhook error:', e); throw e; }
  }

  async handleDisputeFiled(disputeId, disputeData) {
        try {
                const escrow = this.escrowMgr.getByHire(disputeData.hireId);
                if (escrow && escrow.status === 'held') {
                          this.escrowMgr.disputeEscrow(escrow.id, disputeId);
                          await this.auditLogger.log({
                                      eventType: 'ESCROW_DISPUTED', userId: disputeData.userId, resourceId: disputeId,
                                      metadata: { escrowId: escrow.id }
                          });
                }
                return escrow;
        } catch (e) { console.error('Dispute filed webhook error:', e); throw e; }
  }

  async handleDisputeResolved(disputeId, resolutionData) {
        try {
                const escrow = this.escrowMgr.escrows.values().find(e => e.linkedDisputeId === disputeId);
                if (!escrow) return null;

          if (resolutionData.type === 'full_refund') {
                    return this.escrowMgr.refundEscrow(escrow.id, 'Dispute - Full Refund');
          } else if (resolutionData.type === 'partial_refund') {
                    await this.chargeEmployer(resolutionData.employerId, resolutionData.amountToCharge, null);
                    return this.escrowMgr.releaseFunds(escrow.id);
          } else {
                    return this.escrowMgr.releaseFunds(escrow.id);
          }
        } catch (e) { console.error('Dispute resolved webhook error:', e); throw e; }
  }

  async chargeEmployer(employerId, amount, invoiceId) {
        try {
                const charge = await stripe.charges.create({
                          amount: Math.round(amount * 100), currency: 'usd', customer: employerId,
                          description: `QwikShift Invoice ${invoiceId || 'N/A'}`, metadata: { invoiceId }
                });
                return charge;
        } catch (e) { console.error('Charge failed:', e); throw new Error('Payment failed'); }
  }

  async emit(eventType, data) {
        const handler = this.handlers.get(eventType);
        if (!handler) throw new Error(`No handler for ${eventType}`);
        return handler.call(this, data);
  }
}

class WebhookRouter {
    constructor(webhook) { this.webhook = webhook; }

  async route(event) {
        switch (event.type) {
          case 'hire.created': return this.webhook.handleHireCreated(event.data);
          case 'hire.completed': return this.webhook.handleHireCompleted(event.data.hireId, event.data);
          case 'dispute.filed': return this.webhook.handleDisputeFiled(event.data.disputeId, event.data);
          case 'dispute.resolved': return this.webhook.handleDisputeResolved(event.data.disputeId, event.data);
          default: throw new Error(`Unknown event: ${event.type}`);
        }
  }

  async handleStripeWebhook(sig, body) {
        const secret = process.env.STRIPE_WEBHOOK_SECRET;
        const evt = stripe.webhooks.constructEvent(body, sig, secret);
        if (evt.type === 'charge.succeeded') return { processed: true, chargeId: evt.data.object.id };
        if (evt.type === 'charge.failed') return { processed: false, error: evt.data.object.failure_message };
        return { processed: false };
  }
}

module.exports = { HiringWebhook, WebhookRouter };
