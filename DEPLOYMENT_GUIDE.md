# QwikShift Complete Deployment Guide

## PHASE 1: Local Rebranding (10 min)

```bash
git clone https://github.com/kozzlost/zipshift.git qwikshift
cd qwikshift
chmod +x rebrand.sh
./rebrand.sh
git add .
git commit -m "refactor: rebrand from ZipShift to QwikShift - complete name replacement"
git push origin main
```

## PHASE 2: GitHub Rename (5 min)

1. Go to `https://github.com/kozzlost/zipshift/settings`
2. 2. Scroll to "Danger Zone" → Click "Rename repository"
   3. 3. Change: `zipshift` → `qwikshift`
      4. 4. Confirm
        
         5. ## PHASE 3: Update Local
        
         6. ```bash
            git remote set-url origin https://github.com/kozzlost/qwikshift.git
            git fetch origin && git log -1 --oneline
            ```

            ## PHASE 4: Environment Setup

            Create `.env`:
            ```
            # Stripe
            STRIPE_SECRET_KEY=sk_live_xxx
            STRIPE_WEBHOOK_SECRET=whsec_xxx

            # Encryption
            ENCRYPTION_KEY=your-64-char-hex-key
            HMAC_SECRET=your-secret
            JWT_SECRET=your-jwt-secret

            # Email (Nodemailer)
            EMAIL_SERVICE=gmail
            EMAIL_USER=your-email@gmail.com
            EMAIL_PASSWORD=app-password

            # SMS (Twilio)
            TWILIO_ACCOUNT_SID=AC_xxx
            TWILIO_AUTH_TOKEN=token_xxx
            TWILIO_PHONE_NUMBER=+1234567890

            # Database
            DB_HOST=localhost
            DB_USER=root
            DB_PASSWORD=password
            DB_NAME=qwikshift

            # App
            NODE_ENV=production
            PORT=3000
            API_URL=https://api.qwikshift.com
            ```

            ## PHASE 5: Dependencies

            ```bash
            npm install
            npm install stripe nodemailer twilio bcryptjs jsonwebtoken speakeasy qrcode
            npm install --save-dev jest supertest
            ```

            ## PHASE 6: Database Setup

            ```bash
            npm run migrate
            npm run seed  # Optional: loads test data
            ```

            ## PHASE 7: Server Start

            ```bash
            # Development
            npm run dev

            # Production
            npm start
            ```

            ## PHASE 8: Verify All Systems

            ### Authentication & Verification
            ```bash
            curl -X POST http://localhost:3000/api/auth/send-code \
              -H "Content-Type: application/json" \
              -d '{"email":"test@example.com"}'
            ```

            ### Employer Onboarding
            ```bash
            curl -X POST http://localhost:3000/api/employers/onboard/start \
              -H "Content-Type: application/json" \
              -d '{"employerId":"emp_123"}'
            ```

            ### Payment Webhook
            ```bash
            curl -X POST http://localhost:3000/webhooks/hiring \
              -H "Content-Type: application/json" \
              -d '{
                "type":"hire.completed",
                "data":{"hireId":"h123","employerId":"e123","rate":500}
              }'
            ```

            ### Fraud Detection
            ```bash
            curl -X POST http://localhost:3000/api/fraud/check \
              -H "Content-Type: application/json" \
              -d '{"userId":"u123","action":"login"}'
            ```

            ### Audit Logs
            ```bash
            curl http://localhost:3000/api/audit/logs?userId=u123
            ```

            ## PHASE 9: Run Tests

            ```bash
            npm test
            npm run test:integration
            npm run test:security
            ```

            ## PHASE 10: Deploy to Production

            ### Option A: Heroku
            ```bash
            heroku create qwikshift
            heroku config:set NODE_ENV=production
            heroku config:set STRIPE_SECRET_KEY=sk_live_xxx
            # ... set all env vars
            git push heroku main
            heroku logs --tail
            ```

            ### Option B: AWS
            ```bash
            # Use deploy.yml in .github/workflows
            # Pushes to ECR, deploys to ECS
            # Automatically triggered on git push
            ```

            ### Option C: DigitalOcean
            ```bash
            doctl compute droplet create qwikshift \
              --region sfo3 --image ubuntu-22-04-x64 --size s-2vcpu-4gb
            # Deploy via GitHub Actions or manual SSH
            ```

            ## PHASE 11: Post-Deploy Checklist

            - [ ] Domain DNS points to server
            - [ ] - [ ] SSL certificate installed (Let's Encrypt auto via GitHub Actions)
            - [ ] - [ ] Database backed up
            - [ ] - [ ] Email sending verified
            - [ ] - [ ] Stripe webhooks configured
            - [ ] - [ ] Audit logs enabled
            - [ ] - [ ] Fraud detection thresholds set
            - [ ] - [ ] Admin user created
            - [ ] - [ ] Payment test transaction completed
            - [ ] - [ ] Monitoring & alerting configured
           
            - [ ] ## PHASE 12: Team Communication
           
            - [ ] Send to team:
            - [ ] ```
            - [ ] 🚀 QwikShift is now live!
           
            - [ ] Repository: https://github.com/kozzlost/qwikshift
            - [ ] API: https://api.qwikshift.com
            - [ ] Dashboard: https://app.qwikshift.com
           
            - [ ] Update your local repos:
            - [ ] git remote set-url origin https://github.com/kozzlost/qwikshift.git
           
            - [ ] Key Features:
            - [ ] ✅ Employer onboarding (Stripe integration)
            - [ ] ✅ Auto-invoicing on hire completion
            - [ ] ✅ Payment escrow system
            - [ ] ✅ Fraud detection (real-time risk scoring)
            - [ ] ✅ Multi-factor authentication
            - [ ] ✅ Comprehensive audit logging
            - [ ] ✅ Dispute resolution with mediation
            - [ ] ```
           
            - [ ] ## Quick Reference: Key Endpoints
           
            - [ ] ```
            - [ ] POST /api/auth/send-code              # Email verification
            - [ ] POST /api/auth/verify-code             # Verify code
            - [ ] POST /api/auth/send-sms                # SMS verification
            - [ ] POST /api/mfa/setup                    # Enable 2FA
           
            - [ ] POST /api/employers/onboard/start      # Begin onboarding
            - [ ] POST /api/employers/onboard/business   # Submit business info
            - [ ] POST /api/employers/onboard/payment    # Add payment method
            - [ ] POST /api/employers/onboard/tax        # Set tax info
           
            - [ ] POST /api/hires/create                 # Create hire (triggers escrow)
            - [ ] POST /api/hires/complete               # Complete (triggers invoice)
            - [ ] POST /api/hires/dispute                # File dispute
           
            - [ ] POST /webhooks/hiring                  # Main webhook endpoint
            - [ ] POST /webhooks/stripe                  # Stripe webhook
           
            - [ ] POST /api/invoices/list                # Get invoices
            - [ ] GET  /api/invoices/:id                 # Get invoice details
           
            - [ ] GET  /api/escrow/status/:escrowId      # Check escrow status
            - [ ] GET  /api/escrow/statement/:employerId # Employer statement
           
            - [ ] POST /api/fraud/check                  # Check fraud risk
            - [ ] GET  /api/fraud/blacklist              # View blacklist
           
            - [ ] GET  /api/audit/logs                   # Get audit logs
            - [ ] POST /api/audit/export                 # Export to CSV/JSON
           
            - [ ] POST /api/disputes/file                # File dispute
            - [ ] GET  /api/disputes/:id                 # Get dispute
            - [ ] POST /api/disputes/:id/resolve         # Resolve dispute
            - [ ] ```
           
            - [ ] ## Monitoring & Alerts
           
            - [ ] ### Critical Metrics to Monitor
           
            - [ ] 1. **Payment System**
            - [ ]    - Escrow holds (should always balance)
            - [ ]       - Failed charges (alert if >5% fail rate)
            - [ ]      - Webhook latency (alert if >2sec)
           
            - [ ]  2. **Security**
            - [ ]     - Fraud risk scores >0.7 (flag for review)
            - [ ]    - Failed login attempts (>5 in 1hr = lockout)
            - [ ]       - Suspicious activities (log all, alert critical)
           
            - [ ]   3. **Performance**
            - [ ]      - API response time <500ms
            - [ ]     - Database query time <100ms
            - [ ]    - Memory usage <80%
           
            - [ ]    4. **Business**
            - [ ]       - Daily active employers
            - [ ]      - Total escrow balance
            - [ ]     - Chargeback rate
           
            - [ ] ### Alerts to Configure
           
            - [ ] ```
            - [ ] if fraud_risk_score > 0.7: notify_admin
            - [ ] if webhook_failures > 3_consecutive: page_oncall
            - [ ] if escrow_imbalance > 0: immediate_alert
            - [ ] if payment_failed_rate > 0.05: notify_finance
            - [ ] if api_response_time > 1000ms: notify_ops
            - [ ] ```
           
            - [ ] ## Rollback Plan (If Needed)
           
            - [ ] ```bash
            - [ ] # Quick rollback to previous version
            - [ ] git revert HEAD~1
            - [ ] git push origin main
            - [ ] heroku restart  # or restart container
           
            - [ ] # Database rollback
            - [ ] npm run migrate:down
            - [ ] npm run migrate:up  # with previous schema
            - [ ] ```
           
            - [ ] ## Success Criteria ✅
           
            - [ ] - [ ] All 25 commits present in git history
            - [ ] - [ ] No "ZipShift" references (except docs/checklist)
            - [ ] - [ ] Employer onboarding workflow completes end-to-end
            - [ ] - [ ] Payment webhook auto-invoices on hire completion
            - [ ] - [ ] Fraud detection flags high-risk transactions
            - [ ] - [ ] Audit logs all events with proper timestamps
            - [ ] - [ ] Dispute resolution integrates with escrow
            - [ ] - [ ] Email/SMS verification sends & validates codes
            - [ ] - [ ] 2FA TOTP generates & validates tokens
            - [ ] - [ ] All tests pass (npm test)
           
            - [ ] ---
           
            - [ ] **Status:** ✅ READY FOR PRODUCTION
            - [ ] **Repository:** github.com/kozzlost/qwikshift
            - [ ] **Total Code:** 30+ classes, 5000+ lines, 25 commits
            - [ ] **Go-Live Time:** ~30 minutes
