/**
 * Audit Logging Module for QwikShift
 * Implements comprehensive audit trails for all critical operations
 * @module security/audit-logging
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Audit Logger
 * Maintains detailed logs of all user actions and system events
 */
class AuditLogger {
    constructor(logsDirectory = './logs/audit') {
          this.logsDirectory = logsDirectory;
          this.auditLogs = [];
          this.severityLevels = {
                  INFO: 'INFO',
                  WARNING: 'WARNING',
                  ERROR: 'ERROR',
                  CRITICAL: 'CRITICAL',
          };
          this.eventTypes = {
                  USER_LOGIN: 'USER_LOGIN',
                  USER_LOGOUT: 'USER_LOGOUT',
                  USER_CREATED: 'USER_CREATED',
                  USER_DELETED: 'USER_DELETED',
                  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
                  EMAIL_VERIFIED: 'EMAIL_VERIFIED',
                  PHONE_VERIFIED: 'PHONE_VERIFIED',
                  2FA_ENABLED: '2FA_ENABLED',
                  2FA_DISABLED: '2FA_DISABLED',
                  PROFILE_UPDATED: 'PROFILE_UPDATED',
                  PAYMENT_PROCESSED: 'PAYMENT_PROCESSED',
                  PAYMENT_FAILED: 'PAYMENT_FAILED',
                  DISPUTE_FILED: 'DISPUTE_FILED',
                  DISPUTE_RESOLVED: 'DISPUTE_RESOLVED',
                  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
                  DATA_ACCESSED: 'DATA_ACCESSED',
                  DATA_MODIFIED: 'DATA_MODIFIED',
                  DATA_DELETED: 'DATA_DELETED',
                  PERMISSION_CHANGED: 'PERMISSION_CHANGED',
                  API_REQUEST: 'API_REQUEST',
                  API_ERROR: 'API_ERROR',
          };
    }

  /**
     * Log an event
     * @param {object} logEntry - Log entry details
     * @returns {Promise<void>}
     */
  async log(logEntry) {
        const entry = {
                timestamp: new Date().toISOString(),
                id: this.generateLogId(),
                severity: logEntry.severity || this.severityLevels.INFO,
                eventType: logEntry.eventType,
                userId: logEntry.userId,
                action: logEntry.action,
                resource: logEntry.resource,
                resourceId: logEntry.resourceId,
                changes: logEntry.changes,
                status: logEntry.status,
                ipAddress: logEntry.ipAddress,
                userAgent: logEntry.userAgent,
                metadata: logEntry.metadata || {},
        };

      this.auditLogs.push(entry);

      try {
              await this.persistLog(entry);
      } catch (error) {
              console.error('Error persisting audit log:', error);
      }
  }

  /**
     * Generate unique log ID
     * @returns {string} Log identifier
     */
  generateLogId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
     * Persist log entry to disk
     * @param {object} entry - Log entry to persist
     * @returns {Promise<void>}
     */
  async persistLog(entry) {
        try {
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');

          const dayDirectory = path.join(this.logsDirectory, `${year}-${month}-${day}`);
                const filePath = path.join(dayDirectory, `${entry.eventType}.log`);

          await fs.mkdir(dayDirectory, { recursive: true });
                const logLine = JSON.stringify(entry) + '\n';
                await fs.appendFile(filePath, logLine, 'utf-8');
        } catch (error) {
                console.error('Failed to persist audit log:', error);
                throw error;
        }
  }

  /**
     * Log user login
     * @param {object} details - Login details
     * @returns {Promise<void>}
     */
  async logLogin(details) {
        await this.log({
                eventType: this.eventTypes.USER_LOGIN,
                severity: this.severityLevels.INFO,
                userId: details.userId,
                action: 'login',
                resource: 'authentication',
                ipAddress: details.ipAddress,
                userAgent: details.userAgent,
                status: 'success',
                metadata: {
                          method: details.method,
                          mfaUsed: details.mfaUsed,
                },
        });
  }

  /**
     * Log payment transaction
     * @param {object} details - Payment details
     * @returns {Promise<void>}
     */
  async logPayment(details) {
        const eventType = details.status === 'success' 
        ? this.eventTypes.PAYMENT_PROCESSED 
                : this.eventTypes.PAYMENT_FAILED;

      await this.log({
              eventType,
              severity: details.status === 'success' ? this.severityLevels.INFO : this.severityLevels.WARNING,
              userId: details.userId,
              action: 'payment',
              resource: 'transaction',
              resourceId: details.transactionId,
              status: details.status,
              metadata: {
                        amount: details.amount,
                        currency: details.currency,
                        paymentMethod: details.paymentMethod,
                        error: details.error,
              },
      });
  }

  /**
     * Log suspicious activity
     * @param {object} details - Suspicious activity details
     * @returns {Promise<void>}
     */
  async logSuspiciousActivity(details) {
        await this.log({
                eventType: this.eventTypes.SUSPICIOUS_ACTIVITY,
                severity: this.severityLevels.WARNING,
                userId: details.userId,
                action: details.action,
                resource: details.resource,
                ipAddress: details.ipAddress,
                status: 'flagged',
                metadata: {
                          riskScore: details.riskScore,
                          reason: details.reason,
                          detectionMethod: details.detectionMethod,
                },
        });
  }

  /**
     * Log data access
     * @param {object} details - Data access details
     * @returns {Promise<void>}
     */
  async logDataAccess(details) {
        await this.log({
                eventType: this.eventTypes.DATA_ACCESSED,
                severity: this.severityLevels.INFO,
                userId: details.userId,
                action: 'data_access',
                resource: details.resource,
                resourceId: details.resourceId,
                metadata: {
                          dataType: details.dataType,
                          accessLevel: details.accessLevel,
                },
        });
  }

  /**
     * Log data modification
     * @param {object} details - Data modification details
     * @returns {Promise<void>}
     */
  async logDataModification(details) {
        await this.log({
                eventType: this.eventTypes.DATA_MODIFIED,
                severity: this.severityLevels.WARNING,
                userId: details.userId,
                action: details.action,
                resource: details.resource,
                resourceId: details.resourceId,
                changes: details.changes,
                metadata: {
                          dataType: details.dataType,
                          oldValue: details.oldValue,
                          newValue: details.newValue,
                },
        });
  }

  /**
     * Query audit logs
     * @param {object} filters - Filter criteria
     * @returns {Array} Filtered audit logs
     */
  queryLogs(filters = {}) {
        return this.auditLogs.filter(log => {
                if (filters.userId && log.userId !== filters.userId) return false;
                if (filters.eventType && log.eventType !== filters.eventType) return false;
                if (filters.severity && log.severity !== filters.severity) return false;
                if (filters.startDate && new Date(log.timestamp) < filters.startDate) return false;
                if (filters.endDate && new Date(log.timestamp) > filters.endDate) return false;
                if (filters.ipAddress && log.ipAddress !== filters.ipAddress) return false;
                return true;
        });
  }

  /**
     * Get logs for specific user
     * @param {string} userId - User identifier
     * @returns {Array} User's audit logs
     */
  getUserLogs(userId) {
        return this.queryLogs({ userId });
  }

  /**
     * Get critical events
     * @param {number} limit - Maximum number of events
     * @returns {Array} Critical events
     */
  getCriticalEvents(limit = 100) {
        return this.auditLogs
          .filter(log => log.severity === this.severityLevels.CRITICAL)
          .slice(-limit);
  }

  /**
     * Export logs to file
     * @param {string} format - Export format (json, csv)
     * @returns {Promise<string>} Export data
     */
  async exportLogs(format = 'json') {
        if (format === 'json') {
                return JSON.stringify(this.auditLogs, null, 2);
        } else if (format === 'csv') {
                return this.auditLogsToCSV(this.auditLogs);
        }
        throw new Error('Unsupported export format');
  }

  /**
     * Convert logs to CSV format
     * @param {Array} logs - Log entries
     * @returns {string} CSV formatted logs
     */
  auditLogsToCSV(logs) {
        const headers = [
                'timestamp',
                'id',
                'severity',
                'eventType',
                'userId',
                'action',
                'resource',
                'ipAddress',
                'status',
              ];

      const csvContent = [
              headers.join(','),
              ...logs.map(log =>
                        headers.map(header => {
                                    const value = log[header] || '';
                                    return typeof value === 'string' ? `"${value}"` : value;
                        }).join(',')
                                ),
            ].join('\n');

      return csvContent;
  }

  /**
     * Clear old logs
     * @param {number} daysToKeep - Days of logs to retain
     * @returns {void}
     */
  purgeOldLogs(daysToKeep = 90) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      this.auditLogs = this.auditLogs.filter(
              log => new Date(log.timestamp) > cutoffDate
            );
  }
}

module.exports = {
    AuditLogger,
};
