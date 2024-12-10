Personal Finance Management

- Structure breakdown:

/personal-finance-management
├── /main
│ ├── page.js (Main Dashboard - Post-login entry point)
│ ├── /Profile
│ ├── page.js (Handles both CreateProfile and EditProfile functionality)
│ ├── /Savings
│ ├── page.js (Savings screen)
│ ├── /Income
│ ├── page.js (Income screen)
│ ├── /Expenses
│ ├── page.js (Expenses screen)
│ ├── /Investments
│ ├── page.js (Investments screen)
│
├── /\_utils
│ ├── auth-context.js (Manages authentication and user state)
│ ├── firebase.js (Firebase setup and configuration)
│
├── page.js (Login Page - Handles Google Sign-In)
├── layout.js (Wraps all pages with Auth Context)
