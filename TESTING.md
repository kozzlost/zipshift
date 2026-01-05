# ZipShift Testing Guide

Complete guide for testing all components of the ZipShift application (frontend, backend, mobile, and CI/CD).

## Prerequisites

Before testing, ensure you have:
- Node.js 16+ installed
- - npm or yarn package manager
  - - MongoDB running locally or MongoDB Atlas connection string
    - - Git installed
      - - A code editor (VS Code recommended)
       
        - ## Quick Start - Local Development
       
        - ### 1. Setup Environment
       
        - ```bash
          # Clone the repository
          git clone https://github.com/kozzlost/zipshift.git
          cd zipshift

          # Copy environment template
          cp .env.example .env.local

          # Update .env.local with your values:
          # - MONGODB_URI=mongodb://localhost:27017/zipshift
          # - JWT_SECRET=your_test_secret_key
          # - NODE_ENV=development
          ```

          ### 2. Install Dependencies

          ```bash
          npm install
          ```

          ### 3. Start Local Services

          ```bash
          # Terminal 1: Start Backend Server
          npm run dev:backend

          # Terminal 2: Start Frontend Development Server
          npm run dev:frontend

          # Terminal 3: Start MongoDB (if local)
          mongod
          ```

          The application will be available at:
          - Frontend: http://localhost:3000
          - - Backend API: http://localhost:3001
            - - API Health Check: http://localhost:3001/health
             
              - ## Frontend Testing
             
              - ### Manual Testing
             
              - 1. **Load the Application**
                2.    - Open http://localhost:3000 in your browser
                      -    - Check browser console for any errors (F12 → Console)
                           -    - Verify all elements load properly
                            
                                - 2. **Test Form Validation** (form-validation.js)
                                  3.    ```
                                           - Navigate to contact/form section
                                           - Leave email field empty and try to submit → Should show error
                                           - Enter invalid email (e.g., "test") → Should show validation error
                                           - Enter valid email → Should clear error
                                           - Check console for validation logs
                                           ```

                                        3. **Test Animations** (animations.js)
                                        4.    ```
                                                 - Scroll down page → Elements should animate in
                                                 - Click buttons → Should see smooth transitions
                                                 - Hover over interactive elements → Should see hover effects
                                                 - Check scroll-to-top button appears on scroll
                                                 ```

                                              4. **Test Analytics** (analytics.js)
                                              5.    ```
                                                       - Open Developer Tools → Network tab
                                                       - Perform actions (scroll, click, form submit)
                                                       - Look for GA4 and Mixpanel API calls
                                                       - Check Google Analytics real-time dashboard
                                                       ```

                                                    ### Automated Frontend Tests

                                                ```bash
                                                # Run Jest tests
                                                npm run test

                                                # Run tests with coverage
                                                npm test -- --coverage

                                                # Run specific test file
                                                npm test -- form-validation.test.js

                                                # Watch mode for development
                                                npm test -- --watch
                                                ```

                                                ### Linting & Code Quality

                                          ```bash
                                          # Run ESLint
                                          npm run lint

                                          # Fix linting issues automatically
                                          npm run lint:fix

                                          # Format code with Prettier
                                          npm run format

                                          # Check code style
                                          npm run lint:check
                                          ```

                                          ## Backend Testing

                                    ### 1. Health Check

                                  ```bash
                                  # Test if backend is running
                                  curl http://localhost:3001/health

                                  # Expected response:
                                  # {"status":"API is running","timestamp":"2024-01-05T..."}
                                  ```

                                  ### 2. API Testing with cURL

                                  ```bash
                                  # Test CORS
                                  curl -X GET http://localhost:3001/health \
                                    -H "Origin: http://localhost:3000" \
                                    -H "Access-Control-Request-Method: GET" \
                                    -v

                                  # Test error handling
                                  curl -X POST http://localhost:3001/api/invalid-endpoint \
                                    -H "Content-Type: application/json"

                                  # Expected: 404 error response
                                  ```

                                  ### 3. Backend Unit Tests

                                  ```bash
                                  # Run all backend tests
                                  npm run test:backend

                                  # Run specific test suite
                                  npm run test:backend -- auth.test.js

                                  # Run with coverage
                                  npm run test:backend -- --coverage

                                  # Watch mode
                                  npm run test:backend -- --watch
                                  ```

                                  ### 4. Postman Collection Testing

                                  1. Import `postman-collection.json` into Postman
                                  2. 2. Set environment variables in Postman:
                                     3.    - `api_url`: http://localhost:3001
                                           -    - `token`: (from login response)
                                                - 3. Run collections:
                                                  4.    - Auth Collection (login, register, logout)
                                                        -    - Jobs Collection (list, create, update, delete)
                                                             -    - Users Collection (profile, update, delete)
                                                              
                                                                  - ### 5. Database Testing
                                                              
                                                                  - ```bash
                                                                    # Connect to MongoDB
                                                                    mongo mongodb://localhost:27017/zipshift

                                                                    # View collections
                                                                    show collections

                                                                    # Query users
                                                                    db.users.find()

                                                                    # Check database size
                                                                    db.stats()

                                                                    # Clear test data
                                                                    db.users.deleteMany({})
                                                                    ```

                                                                    ## Mobile App Testing (React Native)

                                                                    ### Setup React Native Environment

                                                                    ```bash
                                                                    # Install Expo CLI
                                                                    npm install -g expo-cli

                                                                    # Install dependencies
                                                                    cd mobile
                                                                    npm install

                                                                    # Start Expo development server
                                                                    expo start
                                                                    ```

                                                                    ### iOS Testing

                                                                    ```bash
                                                                    # Build for iOS simulator
                                                                    expo build:ios --type simulator

                                                                    # Or run directly on simulator
                                                                    npm run ios
                                                                    ```

                                                                    ### Android Testing

                                                                    ```bash
                                                                    # Run on Android emulator
                                                                    npm run android

                                                                    # Or build APK for testing
                                                                    expo build:android --type apk
                                                                    ```

                                                                    ### Test Navigation

                                                                    - Verify all screens load: Login → Home → Jobs → Profile → Settings
                                                                    - - Test bottom tab navigation
                                                                      - - Test drawer menu
                                                                        - - Test back button functionality
                                                                          - - Verify animations work on mobile
                                                                           
                                                                            - ## Integration Testing
                                                                           
                                                                            - ### End-to-End Tests (E2E)
                                                                           
                                                                            - ```bash
                                                                              # Run Cypress E2E tests
                                                                              npm run test:e2e

                                                                              # Run specific E2E test
                                                                              npm run test:e2e -- --spec="cypress/e2e/auth.cy.js"

                                                                              # Open Cypress Test Runner
                                                                              npm run test:e2e:open
                                                                              ```

                                                                              ### E2E Test Scenarios

                                                                              1. **User Signup Flow**
                                                                              2.    - Navigate to signup
                                                                                    -    - Fill form with valid data
                                                                                         -    - Submit and verify redirect
                                                                                              -    - Check user in database
                                                                                               
                                                                                                   - 2. **Job Listing Flow**
                                                                                                     3.    - Login with test account
                                                                                                           -    - View job listings
                                                                                                                -    - Filter by location
                                                                                                                     -    - Click job details
                                                                                                                          -    - Apply for job
                                                                                                                           
                                                                                                                               - 3. **Payment Flow**
                                                                                                                                 4.    - Add payment method
                                                                                                                                       -    - Create job posting
                                                                                                                                            -    - Complete payment
                                                                                                                                                 -    - Verify transaction in Stripe dashboard
                                                                                                                                                  
                                                                                                                                                      - ## Performance Testing
                                                                                                                                                  
                                                                                                                                                      - ### Lighthouse Audit
                                                                                                                                                  
                                                                                                                                                      - ```bash
                                                                                                                                                        # Run Lighthouse from Chrome DevTools
                                                                                                                                                        1. Open DevTools (F12)
                                                                                                                                                        2. Go to Lighthouse tab
                                                                                                                                                        3. Click "Generate report"
                                                                                                                                                        4. Check scores for:
                                                                                                                                                           - Performance
                                                                                                                                                           - Accessibility
                                                                                                                                                           - Best Practices
                                                                                                                                                           - SEO
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### Load Testing
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Install Apache Bench
                                                                                                                                                        brew install httpd  # macOS
                                                                                                                                                        apt install apache2-utils  # Linux

                                                                                                                                                        # Test API endpoints
                                                                                                                                                        ab -n 1000 -c 100 http://localhost:3001/health

                                                                                                                                                        # Test with custom payload
                                                                                                                                                        ab -n 100 -c 10 -p payload.json \
                                                                                                                                                          -T application/json \
                                                                                                                                                          http://localhost:3001/api/endpoint
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### Bundle Size Analysis
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Analyze bundle size
                                                                                                                                                        npm run build
                                                                                                                                                        npm run analyze:bundle

                                                                                                                                                        # Check JavaScript bundle
                                                                                                                                                        npm run analyze:js
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ## CI/CD Pipeline Testing
                                                                                                                                                        
                                                                                                                                                        ### 1. Test GitHub Actions Locally
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Install act (run GitHub Actions locally)
                                                                                                                                                        brew install act

                                                                                                                                                        # Run CI pipeline
                                                                                                                                                        act push

                                                                                                                                                        # Run deployment workflow
                                                                                                                                                        act workflow_run
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### 2. Verify Workflows
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Check workflow syntax
                                                                                                                                                        npm run ci:validate

                                                                                                                                                        # View workflow logs
                                                                                                                                                        gh run list --repo kozzlost/zipshift
                                                                                                                                                        gh run view <run-id>
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### 3. Manual Deployment Testing
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Build Docker image
                                                                                                                                                        docker build -t zipshift:latest .

                                                                                                                                                        # Test Docker image
                                                                                                                                                        docker run -p 3001:3001 zipshift:latest

                                                                                                                                                        # Push to registry
                                                                                                                                                        docker tag zipshift:latest ghcr.io/kozzlost/zipshift:latest
                                                                                                                                                        docker push ghcr.io/kozzlost/zipshift:latest
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ## Security Testing
                                                                                                                                                        
                                                                                                                                                        ### OWASP Security Checks
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Run npm audit
                                                                                                                                                        npm audit

                                                                                                                                                        # Fix vulnerabilities
                                                                                                                                                        npm audit fix

                                                                                                                                                        # Check with Snyk
                                                                                                                                                        npm run security:check
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### API Security
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Test HTTPS enforcement
                                                                                                                                                        curl -I https://api.zipshift.app

                                                                                                                                                        # Test CORS headers
                                                                                                                                                        curl -H "Origin: https://unauthorized.com" \
                                                                                                                                                          -H "Access-Control-Request-Method: POST" \
                                                                                                                                                          https://api.zipshift.app/api/endpoint

                                                                                                                                                        # Test authentication
                                                                                                                                                        curl -X POST https://api.zipshift.app/api/protected \
                                                                                                                                                          -H "Authorization: Bearer invalid_token"
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ## Debugging
                                                                                                                                                        
                                                                                                                                                        ### Browser DevTools
                                                                                                                                                        
                                                                                                                                                        ```javascript
                                                                                                                                                        // In browser console:

                                                                                                                                                        // Check form validation
                                                                                                                                                        window.formValidator?.validate({email: 'test'})

                                                                                                                                                        // Check analytics
                                                                                                                                                        window.analytics?.trackEvent('test_event')

                                                                                                                                                        // Check animations
                                                                                                                                                        window.pageAnimations?.observeElements()
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### Node.js Debugging
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Start with debugger
                                                                                                                                                        node --inspect server.js

                                                                                                                                                        # Or in VSCode, add to .vscode/launch.json:
                                                                                                                                                        {
                                                                                                                                                          "version": "0.2.0",
                                                                                                                                                          "configurations": [
                                                                                                                                                            {
                                                                                                                                                              "type": "node",
                                                                                                                                                              "request": "launch",
                                                                                                                                                              "program": "${workspaceFolder}/server.js"
                                                                                                                                                            }
                                                                                                                                                          ]
                                                                                                                                                        }
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### MongoDB Debugging
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        # Enable MongoDB logs
                                                                                                                                                        db.setLogLevel(1)

                                                                                                                                                        # View slow queries
                                                                                                                                                        db.system.profile.find().pretty()
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ## Test Coverage Reports
                                                                                                                                                        
                                                                                                                                                        ### Generate Coverage Report
                                                                                                                                                        
                                                                                                                                                        ```bash
                                                                                                                                                        npm test -- --coverage --watchAll=false

                                                                                                                                                        # View HTML report
                                                                                                                                                        open coverage/lcov-report/index.html
                                                                                                                                                        ```
                                                                                                                                                        
                                                                                                                                                        ### Coverage Thresholds
                                                                                                                                                        
                                                                                                                                                        Target coverage:
                                                                                                                                                        - Statements: 80%
                                                                                                                                                        - - Branches: 75%
                                                                                                                                                          - - Functions: 80%
                                                                                                                                                            - - Lines: 80%
                                                                                                                                                             
                                                                                                                                                              - ## Testing Checklist
                                                                                                                                                             
                                                                                                                                                              - - [ ] Frontend loads without errors
                                                                                                                                                                - [ ] - [ ] All forms validate correctly
                                                                                                                                                                - [ ] - [ ] Animations play smoothly
                                                                                                                                                                - [ ] - [ ] Analytics events track correctly
                                                                                                                                                                - [ ] - [ ] Backend API responds to requests
                                                                                                                                                                - [ ] - [ ] Database operations work
                                                                                                                                                                - [ ] - [ ] Authentication flows work
                                                                                                                                                                - [ ] - [ ] Mobile app navigates properly
                                                                                                                                                                - [ ] - [ ] CI/CD pipeline triggers on push
                                                                                                                                                                - [ ] - [ ] Deployment completes successfully
                                                                                                                                                                - [ ] - [ ] Health check passes
                                                                                                                                                                - [ ] - [ ] Performance meets targets
                                                                                                                                                                - [ ] - [ ] Security audit passes
                                                                                                                                                                - [ ] - [ ] Bundle size is acceptable
                                                                                                                                                               
                                                                                                                                                                - [ ] ## Common Issues & Solutions
                                                                                                                                                               
                                                                                                                                                                - [ ] ### MongoDB Connection Failed
                                                                                                                                                                - [ ] ```bash
                                                                                                                                                                - [ ] # Check if MongoDB is running
                                                                                                                                                                - [ ] mongosh
                                                                                                                                                               
                                                                                                                                                                - [ ] # Or connect to MongoDB Atlas
                                                                                                                                                                - [ ] MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
                                                                                                                                                                - [ ] ```
                                                                                                                                                               
                                                                                                                                                                - [ ] ### Port Already in Use
                                                                                                                                                                - [ ] ```bash
                                                                                                                                                                - [ ] # Find process on port 3001
                                                                                                                                                                - [ ] lsof -i :3001
                                                                                                                                                               
                                                                                                                                                                - [ ] # Kill process
                                                                                                                                                                - [ ] kill -9 <PID>
                                                                                                                                                                ```

                                                                                                                                                                ### Module Not Found
                                                                                                                                                                ```bash
                                                                                                                                                                # Clear node_modules and reinstall
                                                                                                                                                                rm -rf node_modules package-lock.json
                                                                                                                                                                npm install
                                                                                                                                                                ```
                                                                                                                                                                
                                                                                                                                                                ### CORS Errors
                                                                                                                                                                ```
                                                                                                                                                                # Check .env CORS_ORIGIN matches frontend URL
                                                                                                                                                                CORS_ORIGIN=http://localhost:3000
                                                                                                                                                                ```
                                                                                                                                                                
                                                                                                                                                                ## Additional Resources
                                                                                                                                                                
                                                                                                                                                                - [Jest Testing Framework](https://jestjs.io/)
                                                                                                                                                                - - [Cypress E2E Testing](https://www.cypress.io/)
                                                                                                                                                                  - - [React Native Documentation](https://reactnative.dev/)
                                                                                                                                                                    - - [GitHub Actions Documentation](https://docs.github.com/en/actions)
                                                                                                                                                                      - - [MongoDB Manual](https://docs.mongodb.com/manual/)
                                                                                                                                                                        - - [Express.js Guide](https://expressjs.com/)
                                                                                                                                                                         
                                                                                                                                                                          - ## Support
                                                                                                                                                                         
                                                                                                                                                                          - For issues during testing, please:
                                                                                                                                                                          - 1. Check the logs in `logs/` directory
                                                                                                                                                                            2. 2. Review error messages in browser console
                                                                                                                                                                               3. 3. Check GitHub Issues: https://github.com/kozzlost/zipshift/issues
                                                                                                                                                                                  4. 4. Create a new issue with test environment details
