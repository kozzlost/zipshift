# QwikShift - Find Event Staff in 24 Hours ⚡

## Overview

QwikShift is a **location-based job matching platform** that revolutionizes event staffing. Connect event organizers with vetted, qualified local workers in just 24 hours instead of weeks, while saving 40-60% on traditional staffing agency fees.

## The Problem We Solve

- **Slow**: Traditional staffing takes 2-3 weeks
- - **Expensive**: Agencies charge 20-30% fees
  - - **Unreliable**: Open positions on event day, no-shows
   
    - ## Our Solution
   
    - - ✅ Post event jobs in minutes
      - - ✅ Get qualified applications within 24 hours
        - - ✅ Save 40-60% with only 10% commission
          - - ✅ Rated, vetted workers with reviews
            - - ✅ Simple in-app payments
             
              - ---

              ## Project Structure

              ```
              qwikshift/
              ├── .github/workflows/        # CI/CD pipelines
              ├── js/                       # Frontend modules
              │   ├── form-validation.js   # Client-side validation
              │   ├── animations.js        # UI animations
              │   └── analytics.js         # GA4 + Mixpanel tracking
              ├── payment/                 # Payment & billing
              │   ├── employer-onboarding.js
              │   ├── payment-escrow.js
              │   └── invoicing.js
              ├── security/                # Security modules
              │   ├── identity-verification.js
              │   ├── fraud-detection.js
              │   ├── audit-logging.js
              │   ├── encryption.js
              │   └── dispute-resolution.js
              ├── webhooks/                # Event handlers
              │   └── hiring-webhook.js
              ├── styles/                  # CSS
              │   └── main.css
              ├── mobile/                  # React Native
              │   └── AppNavigation.js
              ├── index.html              # Main frontend
              ├── server.js               # Express backend
              ├── package.json
              ├── .env.example
              ├── rebrand.sh
              ├── README.md
              ├── TESTING.md
              ├── SECURITY_IMPLEMENTATION.md
              ├── REBRANDING_CHECKLIST.md
              └── DEPLOYMENT_GUIDE.md
              ```

              ## Key Features

              ### For Event Organizers (Employers)
              - Post jobs in <5 minutes
              - - Real-time applications
                - - Vetted worker profiles with reviews
                  - - Escrow-protected payments
                    - - Built-in dispute resolution
                      - - Auto-invoicing (10% commission)
                       
                        - ### For Workers
                        - - Browse nearby event jobs
                          - - Instant earnings
                            - - Ratings & reviews
                              - - Multi-factor authentication
                                - - Fraud protection
                                  - - Payment within 24 hours
                                   
                                    - ### Security & Compliance
                                    - - Identity verification (email, SMS, 2FA)
                                      - - Real-time fraud detection
                                        - - Comprehensive audit logging
                                          - - AES-256-GCM encryption
                                            - - Bcrypt password hashing
                                              - - Payment escrow system
                                                - - Dispute mediation
                                                 
                                                  - ## Tech Stack
                                                 
                                                  - ### Frontend
                                                  - - HTML5 / CSS3 (responsive, animated)
                                                    - - Vanilla JavaScript (modular, validated)
                                                      - - Google Analytics 4
                                                        - - Mixpanel events
                                                         
                                                          - ### Backend
                                                          - - Node.js / Express
                                                            - - Stripe payment processing
                                                              - - Nodemailer (email verification)
                                                                - - Twilio (SMS verification)
                                                                  - - Speakeasy (TOTP 2FA)
                                                                   
                                                                    - ### Mobile
                                                                    - - React Native
                                                                      - - Native navigation
                                                                        - - Push notifications (ready)
                                                                         
                                                                          - ### Security
                                                                          - - AES-256-GCM encryption
                                                                            - - Bcryptjs (12-round hashing)
                                                                              - - JWT tokens
                                                                                - - HMAC signatures
                                                                                  - - Speakeasy TOTP
                                                                                   
                                                                                    - ### DevOps
                                                                                    - - GitHub Actions (CI/CD)
                                                                                      - - Docker containerization
                                                                                        - - Heroku / AWS / DigitalOcean ready
                                                                                          - - Automated testing
                                                                                           
                                                                                            - ## Getting Started
                                                                                           
                                                                                            - ### Prerequisites
                                                                                            - ```bash
                                                                                              node >= 16
                                                                                              npm >= 8
                                                                                              stripe account
                                                                                              twilio account (SMS)
                                                                                              gmail account (email verification)
                                                                                              ```

                                                                                              ### Installation
                                                                                              ```bash
                                                                                              git clone https://github.com/kozzlost/qwikshift.git
                                                                                              cd qwikshift
                                                                                              npm install
                                                                                              cp .env.example .env
                                                                                              # Edit .env with your API keys
                                                                                              npm run migrate
                                                                                              npm run dev
                                                                                              ```

                                                                                              ### Environment Variables
                                                                                              ```
                                                                                              STRIPE_SECRET_KEY=sk_live_...
                                                                                              STRIPE_WEBHOOK_SECRET=whsec_...
                                                                                              EMAIL_USER=your@email.com
                                                                                              EMAIL_PASSWORD=app-password
                                                                                              TWILIO_ACCOUNT_SID=AC_...
                                                                                              TWILIO_AUTH_TOKEN=...
                                                                                              TWILIO_PHONE_NUMBER=+1...
                                                                                              ENCRYPTION_KEY=your-64-char-key
                                                                                              JWT_SECRET=your-secret
                                                                                              ```

                                                                                              ## API Endpoints

                                                                                              ### Authentication
                                                                                              ```
                                                                                              POST /api/auth/send-code             # Email verification
                                                                                              POST /api/auth/verify-code            # Verify code
                                                                                              POST /api/mfa/setup                   # Enable 2FA
                                                                                              ```

                                                                                              ### Employer Onboarding
                                                                                              ```
                                                                                              POST /api/employers/onboard/start
                                                                                              POST /api/employers/onboard/business
                                                                                              POST /api/employers/onboard/payment
                                                                                              POST /api/employers/onboard/tax
                                                                                              ```

                                                                                              ### Jobs & Hiring
                                                                                              ```
                                                                                              POST /api/hires/create                # Create hire (escrow)
                                                                                              POST /api/hires/complete              # Complete job (invoice)
                                                                                              POST /api/hires/dispute               # File dispute
                                                                                              ```

                                                                                              ### Payment & Invoices
                                                                                              ```
                                                                                              GET  /api/invoices/list
                                                                                              GET  /api/invoices/:id
                                                                                              GET  /api/escrow/status/:escrowId
                                                                                              GET  /api/escrow/statement/:employerId
                                                                                              ```

                                                                                              ### Security & Monitoring
                                                                                              ```
                                                                                              POST /api/fraud/check                 # Fraud risk score
                                                                                              GET  /api/audit/logs                  # View logs
                                                                                              POST /api/disputes/file               # File dispute
                                                                                              GET  /api/disputes/:id                # Get dispute
                                                                                              ```

                                                                                              ## Testing

                                                                                              ```bash
                                                                                              # Run all tests
                                                                                              npm test

                                                                                              # Coverage report
                                                                                              npm run test:coverage

                                                                                              # Integration tests
                                                                                              npm run test:integration

                                                                                              # Security tests
                                                                                              npm run test:security
                                                                                              ```

                                                                                              See [TESTING.md](TESTING.md) for detailed testing guide.

                                                                                              ## Security

                                                                                              QwikShift implements enterprise-grade security:

                                                                                              - **Identity Verification**: Email, SMS, TOTP 2FA
                                                                                              - - **Fraud Detection**: Real-time risk scoring (0-1 scale)
                                                                                                - - **Encryption**: AES-256-GCM at rest & in transit
                                                                                                  - - **Audit Logging**: All actions logged with timestamps
                                                                                                    - - **Dispute Resolution**: Mediation + chargeback handling
                                                                                                      - - **Payment Escrow**: Funds held until job completion
                                                                                                       
                                                                                                        - See [SECURITY_IMPLEMENTATION.md](SECURITY_IMPLEMENTATION.md) for full details.
                                                                                                       
                                                                                                        - ## Deployment
                                                                                                       
                                                                                                        - ### Quick Deploy (30 minutes)
                                                                                                       
                                                                                                        - 1. **Rebranding** (already done)
                                                                                                          2. 2. **Setup .env** with API keys
                                                                                                             3. 3. **Install dependencies**: `npm install`
                                                                                                                4. 4. **Run migrations**: `npm run migrate`
                                                                                                                   5. 5. **Deploy**: `git push heroku main` (or AWS/DigitalOcean)
                                                                                                                     
                                                                                                                      6. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions.
                                                                                                                     
                                                                                                                      7. ## Pricing
                                                                                                                     
                                                                                                                      8. - **Employers**: 10% commission per hire
                                                                                                                         - - **Workers**: 100% of agreed rate
                                                                                                                           - - **Stripe fees**: 2.9% + $0.30 per transaction
                                                                                                                            
                                                                                                                             - ## Roadmap
                                                                                                                            
                                                                                                                             - - [x] Core platform (hiring, payments, escrow)
                                                                                                                               - [ ] - [x] Security (fraud detection, encryption, audit logging)
                                                                                                                               - [ ] - [x] Mobile app (React Native)
                                                                                                                               - [ ] - [x] Automated invoicing & payments
                                                                                                                               - [ ] - [ ] Real-time chat
                                                                                                                               - [ ] - [ ] Video verification for workers
                                                                                                                               - [ ] - [ ] Advanced scheduling
                                                                                                                               - [ ] - [ ] International expansion
                                                                                                                              
                                                                                                                               - [ ] ## Contributing
                                                                                                                              
                                                                                                                               - [ ] 1. Fork the repo
                                                                                                                               - [ ] 2. Create feature branch: `git checkout -b feat/amazing-feature`
                                                                                                                               - [ ] 3. Commit changes: `git commit -m 'feat: add amazing feature'`
                                                                                                                               - [ ] 4. Push: `git push origin feat/amazing-feature`
                                                                                                                               - [ ] 5. Open Pull Request
                                                                                                                              
                                                                                                                               - [ ] See [TESTING.md](TESTING.md) for test requirements.
                                                                                                                              
                                                                                                                               - [ ] ## License
                                                                                                                              
                                                                                                                               - [ ] MIT License - see LICENSE file for details
                                                                                                                              
                                                                                                                               - [ ] ## Support
                                                                                                                              
                                                                                                                               - [ ] - Email: support@qwikshift.com
                                                                                                                               - [ ] - Issues: github.com/kozzlost/qwikshift/issues
                                                                                                                               - [ ] - Docs: DEPLOYMENT_GUIDE.md
                                                                                                                              
                                                                                                                               - [ ] ## Status
                                                                                                                              
                                                                                                                               - [ ] ✅ Production Ready | 26 Commits | 30+ Classes | 5000+ Lines Code
