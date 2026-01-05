/**
 * Identity Verification Module for QwikShift
 * Implements multi-factor authentication, KYC verification, and identity validation
 * @module security/identity-verification
 */

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

/**
 * Generates a secure verification code
 * @param {number} length - Length of code to generate
 * @returns {string} Alphanumeric verification code
 */
function generateVerificationCode(length = 6) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
          const randomIndex = crypto.randomInt(0, charset.length);
          code += charset[randomIndex];
    }
    return code;
}

/**
 * Email Verification System
 * Sends verification codes via email
 */
class EmailVerification {
    constructor(transporter = null) {
          this.transporter = transporter || nodemailer.createTransporter({
                  service: process.env.EMAIL_SERVICE || 'gmail',
                  auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASSWORD,
                  },
          });
          this.verificationCodes = new Map();
          this.codeExpiry = 15 * 60 * 1000;
    }

  /**
     * Send verification code via email
     * @param {string} email - User email address
     * @returns {Promise}
     */
  async sendVerificationCode(email) {
        try {
                if (!this.isValidEmail(email)) {
                          throw new Error('Invalid email format');
                }

          const code = generateVerificationCode();
                const expiryTime = Date.now() + this.codeExpiry;

          this.verificationCodes.set(email, {
                    code,
                    expiryTime,
                    attempts: 0,
          });

          await this.transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'QwikShift Email Verification',
                    html: `
                              <h2>Email Verification</h2>
                                        <p>Your verification code is: <strong>${code}</strong></p>
                                                  <p>This code will expire in 15 minutes.</p>
                                                            <p>If you did not request this, please ignore this email.</p>
                                                                    `,
          });

          return { success: true, code };
        } catch (error) {
                console.error('Email verification error:', error);
                throw error;
        }
  }

  /**
     * Verify email with code
     * @param {string} email - User email
     * @param {string} code - Verification code
     * @returns {boolean} Verification success
     */
  verifyEmailCode(email, code) {
        const verification = this.verificationCodes.get(email);

      if (!verification) {
              return false;
      }

      if (Date.now() > verification.expiryTime) {
              this.verificationCodes.delete(email);
              return false;
      }

      if (verification.attempts >= 5) {
              this.verificationCodes.delete(email);
              return false;
      }

      verification.attempts++;

      if (verification.code === code) {
              this.verificationCodes.delete(email);
              return true;
      }

      return false;
  }

  /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Valid email
     */
  isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
  }
}

/**
 * SMS Verification System
 * Sends verification codes via SMS using Twilio
 */
class SMSVerification {
    constructor() {
          this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
          this.verificationCodes = new Map();
          this.codeExpiry = 10 * 60 * 1000;
    }

  /**
     * Send verification code via SMS
     * @param {string} phoneNumber - User phone number
     * @returns {Promise}
     */
  async sendVerificationCode(phoneNumber) {
        try {
                if (!this.isValidPhoneNumber(phoneNumber)) {
                          throw new Error('Invalid phone number format');
                }

          const code = generateVerificationCode();
                const expiryTime = Date.now() + this.codeExpiry;

          this.verificationCodes.set(phoneNumber, {
                    code,
                    expiryTime,
                    attempts: 0,
          });

          await this.client.messages.create({
                    body: `Your QwikShift verification code is: ${code}. Valid for 10 minutes.`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phoneNumber,
          });

          return { success: true, code };
        } catch (error) {
                console.error('SMS verification error:', error);
                throw error;
        }
  }

  /**
     * Verify SMS code
     * @param {string} phoneNumber - User phone number
     * @param {string} code - Verification code
     * @returns {boolean} Verification success
     */
  verifySMSCode(phoneNumber, code) {
        const verification = this.verificationCodes.get(phoneNumber);

      if (!verification) {
              return false;
      }

      if (Date.now() > verification.expiryTime) {
              this.verificationCodes.delete(phoneNumber);
              return false;
      }

      if (verification.attempts >= 5) {
              this.verificationCodes.delete(phoneNumber);
              return false;
      }

      verification.attempts++;

      if (verification.code === code) {
              this.verificationCodes.delete(phoneNumber);
              return true;
      }

      return false;
  }

  /**
     * Validate phone number format
     * @param {string} phoneNumber - Phone to validate
     * @returns {boolean} Valid phone number
     */
  isValidPhoneNumber(phoneNumber) {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber);
  }
}

module.exports = {
    EmailVerification,
    SMSVerification,
    generateVerificationCode,
};
