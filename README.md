# ZipShift - Find Event Staff in 24 Hours ⚡

## Overview

ZipShift is a **location-based job matching platform** that revolutionizes event staffing. Connect event organizers with vetted, qualified local workers in just 24 hours instead of weeks, while saving 40-60% on traditional staffing agency fees.

### The Problem We Solve
- **Slow**: Traditional staffing takes 2-3 weeks
- - **Expensive**: Agencies charge 20-30% fees
  - - **Unreliable**: Open positions on event day, no-shows
   
    - ### Our Solution
    - - ✅ Post event jobs in minutes
      - - ✅ Get qualified applications within 24 hours
        - - ✅ Save 40-60% with only 10% commission
          - - ✅ Rated, vetted workers with reviews
            - - ✅ Simple in-app payments
             
              - ---

              ## Project Structure

              ```
              zipshift/
              ├── index.html              # Main landing page
              ├── README.md               # This file
              ├── package.json            # Project dependencies
              ├── styles/
              │   └── main.css            # Separated CSS stylesheet
              ├── js/
              │   ├── form-validation.js  # Form validation logic
              │   ├── animations.js       # Interactive animations
              │   └── analytics.js        # Analytics tracking
              ├── api/
              │   ├── auth/
              │   │   ├── login.js
              │   │   ├── register.js
              │   │   └── oauth.js
              │   ├── jobs/
              │   │   ├── create.js
              │   │   ├── search.js
              │   │   └── apply.js
              │   ├── users/
              │   │   ├── profile.js
              │   │   ├── ratings.js
              │   │   └── preferences.js
              │   └── payments/
              │       ├── stripe.js
              │       └── payouts.js
              ├── mobile/
              │   ├── ios/                # React Native iOS app
              │   ├── android/            # React Native Android app
              │   └── shared/             # Shared mobile code
              ├── .github/
              │   └── workflows/
              │       ├── ci.yml          # CI/CD pipeline
              │       └── deploy.yml      # Deployment pipeline
              └── .env.example            # Environment variables template
              ```

              ---

              ## Quick Start

              ### Prerequisites
              - Node.js 16+
              - - npm or yarn
                - - Git
                 
                  - ### Installation
                 
                  - ```bash
                    # Clone the repository
                    git clone https://github.com/kozzlost/zipshift.git
                    cd zipshift

                    # Install dependencies
                    npm install

                    # Start development server
                    npm run dev

                    # Open http://localhost:3000 in your browser
                    ```

                    ### Environment Setup

                    ```bash
                    # Copy environment template
                    cp .env.example .env

                    # Add your API keys:
                    # STRIPE_PUBLIC_KEY=pk_test_...
                    # STRIPE_SECRET_KEY=sk_test_...
                    # GOOGLE_MAPS_API_KEY=...
                    # SENDGRID_API_KEY=...
                    # JWT_SECRET=your_secret_key
                    ```

                    ---

                    ## Features

                    ### For Employers
                    - **Quick Job Posting**: Create job listings in minutes with location-based matching
                    - - **Worker Profiles**: View ratings, reviews, and work history
                      - - **Real-Time Communication**: In-app messaging with applicants
                        - - **Payment Processing**: Secure payments through Stripe
                          - - **Analytics Dashboard**: Track hiring metrics and ROI
                            - - **Bulk Discounts**: Special pricing for high-volume hiring
                             
                              - ### For Workers
                              - - **Job Discovery**: Location-based job feed with smart matching
                                - - **Quick Applications**: Apply to jobs with one tap
                                  - - **Secure Payments**: Direct deposits to your account
                                    - - **Rating System**: Build your professional reputation
                                      - - **Schedule Flexibility**: Choose gigs that fit your schedule
                                        - - **Support**: 24/7 customer support
                                         
                                          - ---

                                          ## Pricing

                                          | Plan | Price | Best For | Commission |
                                          |------|-------|----------|-----------|
                                          | **Basic** | Free | Freelancers & Small Teams | 10% per placement |
                                          | **Pro** | $200/month | Event Companies & Agencies | 10% + Features |
                                          | **Enterprise** | Custom | Large Organizations | Negotiable |

                                          ---

                                          ## Tech Stack

                                          ### Frontend
                                          - **HTML5** - Semantic markup
                                          - - **CSS3** - Responsive design with Grid/Flexbox
                                            - - **Vanilla JavaScript** - Form validation, animations
                                              - - **Future**: React.js for dynamic UI
                                               
                                                - ### Backend
                                                - - **Node.js + Express** - REST API server
                                                  - - **MongoDB** - Document database
                                                    - - **JWT** - Authentication & authorization
                                                      - - **Stripe API** - Payment processing
                                                        - - **Google Maps API** - Location matching
                                                          - - **SendGrid** - Email notifications
                                                           
                                                            - ### Mobile
                                                            - - **React Native** - iOS & Android apps
                                                              - - **Expo** - Development & deployment platform
                                                                - - **Redux** - State management
                                                                  - - **Firebase** - Cloud messaging & analytics
                                                                   
                                                                    - ### DevOps
                                                                    - - **Docker** - Containerization
                                                                      - - **GitHub Actions** - CI/CD pipeline
                                                                        - - **Netlify/Vercel** - Frontend deployment
                                                                          - - **Heroku/AWS** - Backend deployment
                                                                            - - **MongoDB Atlas** - Cloud database
                                                                             
                                                                              - ---

                                                                              ## Getting Started Guide

                                                                              ### Step 1: Set Up Development Environment

                                                                              ```bash
                                                                              # Install Node.js (https://nodejs.org/)
                                                                              # Install Git (https://git-scm.com/)

                                                                              # Clone repo and install dependencies
                                                                              git clone https://github.com/kozzlost/zipshift.git
                                                                              cd zipshift
                                                                              npm install
                                                                              ```

                                                                              ### Step 2: Configure Environment Variables

                                                                              Create `.env` file in root directory:

                                                                              ```env
                                                                              # Server
                                                                              PORT=5000
                                                                              NODE_ENV=development

                                                                              # Database
                                                                              MONGODB_URI=mongodb://localhost:27017/zipshift

                                                                              # Authentication
                                                                              JWT_SECRET=your_jwt_secret_key_here
                                                                              JWT_EXPIRE=7d

                                                                              # Stripe Payments
                                                                              STRIPE_PUBLIC_KEY=pk_test_xxx
                                                                              STRIPE_SECRET_KEY=sk_test_xxx

                                                                              # Google Maps
                                                                              GOOGLE_MAPS_API_KEY=your_api_key

                                                                              # Email
                                                                              SENDGRID_API_KEY=your_api_key

                                                                              # Location Matching Radius (in miles)
                                                                              LOCATION_RADIUS=25
                                                                              ```

                                                                              ### Step 3: Start Development Servers

                                                                              ```bash
                                                                              # Terminal 1 - Frontend (Port 3000)
                                                                              npm run dev:frontend

                                                                              # Terminal 2 - Backend (Port 5000)
                                                                              npm run dev:backend

                                                                              # Terminal 3 - Mobile (Expo)
                                                                              npm run dev:mobile
                                                                              ```

                                                                              ### Step 4: Test the Application

                                                                              ```bash
                                                                              # Run tests
                                                                              npm test

                                                                              # Run linting
                                                                              npm run lint

                                                                              # Build for production
                                                                              npm run build
                                                                              ```

                                                                              ---

                                                                              ## API Documentation

                                                                              ### Authentication Endpoints

                                                                              ```
                                                                              POST /api/auth/register       # Create new account
                                                                              POST /api/auth/login          # User login
                                                                              POST /api/auth/logout         # User logout
                                                                              POST /api/auth/refresh        # Refresh JWT token
                                                                              POST /api/auth/google         # Google OAuth login
                                                                              POST /api/auth/forgot-password # Password reset
                                                                              ```

                                                                              ### Job Endpoints

                                                                              ```
                                                                              GET  /api/jobs                # Get all jobs (with filters)
                                                                              GET  /api/jobs/:id            # Get job details
                                                                              POST /api/jobs                # Create new job (auth required)
                                                                              PUT  /api/jobs/:id            # Update job (auth required)
                                                                              DELETE /api/jobs/:id          # Delete job (auth required)
                                                                              GET  /api/jobs/search         # Search jobs by location/type
                                                                              ```

                                                                              ### Applications Endpoints

                                                                              ```
                                                                              GET  /api/applications        # Get user's applications
                                                                              POST /api/jobs/:id/apply      # Apply to job
                                                                              PUT  /api/applications/:id    # Update application status
                                                                              GET  /api/jobs/:id/applicants # Get job applicants (employer only)
                                                                              ```

                                                                              ### User Profile Endpoints

                                                                              ```
                                                                              GET  /api/users/:id           # Get user profile
                                                                              PUT  /api/users/:id           # Update profile
                                                                              GET  /api/users/:id/ratings   # Get user ratings
                                                                              POST /api/users/:id/ratings   # Leave rating for user
                                                                              GET  /api/users/:id/history   # Get work history
                                                                              ```

                                                                              ### Payment Endpoints

                                                                              ```
                                                                              POST /api/payments/charge     # Process payment
                                                                              GET  /api/payments/history    # Payment history
                                                                              POST /api/payments/payout     # Request payout
                                                                              GET  /api/payments/balance    # Account balance
                                                                              ```

                                                                              ---

                                                                              ## Form Validation

                                                                              The application includes robust client-side validation:

                                                                              ```javascript
                                                                              // Validates:
                                                                              - Email format
                                                                              - Phone number format
                                                                              - Password strength (min 8 chars, uppercase, number, special char)
                                                                              - Required fields
                                                                              - Form submission with error handling
                                                                              - Real-time validation feedback
                                                                              ```

                                                                              ---

                                                                              ## Analytics Tracking

                                                                              Integrated with Google Analytics 4 and Mixpanel:

                                                                              ```javascript
                                                                              // Tracks:
                                                                              - Page views and user sessions
                                                                              - Form submissions and conversions
                                                                              - Job posting and application flows
                                                                              - User engagement metrics
                                                                              - Conversion funnel analysis
                                                                              ```

                                                                              ---

                                                                              ## Mobile App Roadmap

                                                                              ### Phase 1 (MVP)
                                                                              - [x] Job discovery and search
                                                                              - [ ] - [x] Job applications
                                                                              - [ ] - [x] User profiles
                                                                              - [ ] - [x] In-app messaging
                                                                              - [ ] - [x] Payment processing
                                                                             
                                                                              - [ ] ### Phase 2
                                                                              - [ ] - [ ] Push notifications
                                                                              - [ ] - [ ] Offline mode
                                                                              - [ ] - [ ] Advanced filtering
                                                                              - [ ] - [ ] Saved jobs/favorites
                                                                              - [ ] - [ ] Referral program
                                                                             
                                                                              - [ ] ### Phase 3
                                                                              - [ ] - [ ] Video profiles
                                                                              - [ ] - [ ] Video interviews
                                                                              - [ ] - [ ] AI matching algorithm
                                                                              - [ ] - [ ] Advanced analytics
                                                                              - [ ] - [ ] Integration with calendar
                                                                             
                                                                              - [ ] ---
                                                                             
                                                                              - [ ] ## CI/CD Pipeline
                                                                             
                                                                              - [ ] ### GitHub Actions Workflows
                                                                             
                                                                              - [ ] **Continuous Integration** (`ci.yml`):
                                                                              - [ ] - Run tests on every push
                                                                              - [ ] - Lint code for style issues
                                                                              - [ ] - Build production bundle
                                                                              - [ ] - Check code coverage
                                                                             
                                                                              - [ ] **Continuous Deployment** (`deploy.yml`):
                                                                              - [ ] - Deploy frontend to Netlify on main branch
                                                                              - [ ] - Deploy backend to Heroku on main branch
                                                                              - [ ] - Database migrations
                                                                              - [ ] - Notify team on deployment
                                                                             
                                                                              - [ ] ### Manual Deployment
                                                                             
                                                                              - [ ] ```bash
                                                                              - [ ] # Frontend (Netlify)
                                                                              - [ ] npm run build
                                                                              - [ ] netlify deploy --prod
                                                                             
                                                                              - [ ] # Backend (Heroku)
                                                                              - [ ] git push heroku main
                                                                             
                                                                              - [ ] # Mobile (App Store/Google Play)
                                                                              - [ ] npm run build:ios
                                                                              - [ ] npm run build:android
                                                                              - [ ] ```
                                                                             
                                                                              - [ ] ---
                                                                             
                                                                              - [ ] ## Development Guidelines
                                                                             
                                                                              - [ ] ### Code Style
                                                                              - [ ] - Use ES6+ syntax
                                                                              - [ ] - Follow Airbnb style guide
                                                                              - [ ] - Use meaningful variable names
                                                                              - [ ] - Add JSDoc comments for functions
                                                                             
                                                                              - [ ] ### Git Workflow
                                                                              - [ ] ```bash
                                                                              - [ ] git checkout -b feature/feature-name
                                                                              - [ ] git add .
                                                                              - [ ] git commit -m "feat: add new feature"
                                                                              - [ ] git push origin feature/feature-name
                                                                              - [ ] # Create Pull Request
                                                                              - [ ] ```
                                                                             
                                                                              - [ ] ### Testing Requirements
                                                                              - [ ] - Minimum 80% code coverage
                                                                              - [ ] - All new features must have tests
                                                                              - [ ] - Run `npm test` before committing
                                                                             
                                                                              - [ ] ---
                                                                             
                                                                              - [ ] ## Contributing
                                                                             
                                                                              - [ ] We welcome contributions! Please follow these steps:
                                                                             
                                                                              - [ ] 1. **Fork** the repository
                                                                              - [ ] 2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
                                                                              - [ ] 3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
                                                                              - [ ] 4. **Push** to the branch (`git push origin feature/amazing-feature`)
                                                                              - [ ] 5. **Open** a Pull Request
                                                                             
                                                                              - [ ] Please ensure:
                                                                              - [ ] - Code follows style guidelines
                                                                              - [ ] - Tests pass and coverage maintained
                                                                              - [ ] - README updated if needed
                                                                              - [ ] - Commit messages follow conventional commits
                                                                             
                                                                              - [ ] ---
                                                                             
                                                                              - [ ] ## Troubleshooting
                                                                             
                                                                              - [ ] ### MongoDB Connection Issues
                                                                              - [ ] ```bash
                                                                              - [ ] # Start MongoDB locally
                                                                              - [ ] mongod
                                                                             
                                                                              - [ ] # Or use MongoDB Atlas (cloud)
                                                                              - [ ] # Update MONGODB_URI in .env
                                                                              - [ ] ```
                                                                             
                                                                              - [ ] ### Port Already in Use
                                                                              - [ ] ```bash
                                                                              - [ ] # Find process using port 3000
                                                                              - [ ] lsof -i :3000
                                                                             
                                                                              - [ ] # Kill process
                                                                              - [ ] kill -9 <PID>
                                                                              ```

                                                                              ### Stripe Test Mode
                                                                              ```bash
                                                                              # Use test cards:
                                                                              4242 4242 4242 4242 (Visa - Success)
                                                                              5555 5555 5555 4444 (Mastercard - Success)
                                                                              4000 0000 0000 0002 (Visa - Declined)
                                                                              ```

                                                                              ---

                                                                              ## Performance Optimization

                                                                              - **Lazy Loading**: Job listings load on scroll
                                                                              - - **Image Optimization**: WebP format with fallbacks
                                                                                - - **Caching**: Browser and server-side caching
                                                                                  - - **CDN**: Serve static assets from CDN
                                                                                    - - **Database Indexing**: Optimize query performance
                                                                                     
                                                                                      - ---

                                                                                      ## Security

                                                                                      - **HTTPS**: All connections encrypted
                                                                                      - - **JWT**: Secure token-based authentication
                                                                                        - - **Password Hashing**: Bcrypt with salt rounds
                                                                                          - - **Rate Limiting**: Prevent brute force attacks
                                                                                            - - **Input Validation**: Sanitize all user inputs
                                                                                              - - **CORS**: Configured for security
                                                                                                - - **Environment Variables**: Sensitive data protected
                                                                                                 
                                                                                                  - ---

                                                                                                  ## Deployment

                                                                                                  ### Hosting Options
                                                                                                  - **Frontend**: Netlify, Vercel, GitHub Pages
                                                                                                  - - **Backend**: Heroku, AWS EC2, DigitalOcean, Google Cloud
                                                                                                    - - **Database**: MongoDB Atlas, AWS RDS
                                                                                                      - - **CDN**: Cloudflare, AWS CloudFront
                                                                                                       
                                                                                                        - ### Production Checklist
                                                                                                        - - [ ] Environment variables configured
                                                                                                          - [ ] - [ ] Database backups enabled
                                                                                                          - [ ] - [ ] SSL certificate installed
                                                                                                          - [ ] - [ ] Error logging enabled (Sentry)
                                                                                                          - [ ] - [ ] Performance monitoring active (New Relic)
                                                                                                          - [ ] - [ ] Security headers configured
                                                                                                          - [ ] - [ ] Rate limiting enabled
                                                                                                          - [ ] - [ ] Analytics configured
                                                                                                         
                                                                                                          - [ ] ---
                                                                                                         
                                                                                                          - [ ] ## Roadmap
                                                                                                         
                                                                                                          - [ ] ### Q1 2026
                                                                                                          - [ ] - [ ] Mobile app MVP launch (iOS & Android)
                                                                                                          - [ ] - [ ] Payment processing integration
                                                                                                          - [ ] - [ ] Advanced job filtering
                                                                                                          - [ ] - [ ] User ratings system
                                                                                                         
                                                                                                          - [ ] ### Q2 2026
                                                                                                          - [ ] - [ ] AI-powered job matching
                                                                                                          - [ ] - [ ] Push notifications
                                                                                                          - [ ] - [ ] Video profiles
                                                                                                          - [ ] - [ ] Referral program launch
                                                                                                         
                                                                                                          - [ ] ### Q3 2026
                                                                                                          - [ ] - [ ] Enterprise API
                                                                                                          - [ ] - [ ] Custom integrations
                                                                                                          - [ ] - [ ] Advanced analytics dashboard
                                                                                                          - [ ] - [ ] Calendar integration
                                                                                                         
                                                                                                          - [ ] ### Q4 2026
                                                                                                          - [ ] - [ ] International expansion
                                                                                                          - [ ] - [ ] Multi-currency support
                                                                                                          - [ ] - [ ] Video interview feature
                                                                                                          - [ ] - [ ] AI interview analysis
                                                                                                         
                                                                                                          - [ ] ---
                                                                                                         
                                                                                                          - [ ] ## License
                                                                                                         
                                                                                                          - [ ] This project is licensed under the MIT License - see the LICENSE file for details.
                                                                                                         
                                                                                                          - [ ] ---
                                                                                                         
                                                                                                          - [ ] ## Support
                                                                                                         
                                                                                                          - [ ] - **Email**: hello@zipshift.app
                                                                                                          - [ ] - **Documentation**: https://docs.zipshift.app
                                                                                                          - [ ] - **Issues**: https://github.com/kozzlost/zipshift/issues
                                                                                                          - [ ] - **Discussions**: https://github.com/kozzlost/zipshift/discussions
                                                                                                         
                                                                                                          - [ ] ---
                                                                                                         
                                                                                                          - [ ] ## Team
                                                                                                         
                                                                                                          - [ ] - **Creator**: kozzlost
                                                                                                          - [ ] - **Contributors**: Open to community contributions!
                                                                                                         
                                                                                                          - [ ] ---
                                                                                                         
                                                                                                          - [ ] ## Acknowledgments
                                                                                                         
                                                                                                          - [ ] - Inspired by the gig economy revolution
                                                                                                          - [ ] - Built with modern web technologies
                                                                                                          - [ ] - Designed for the future of event staffing
                                                                                                         
                                                                                                          - [ ] ---
                                                                                                         
                                                                                                          - [ ] **Last Updated**: January 5, 2026
                                                                                                          - [ ] **Status**: Alpha - Early Development
