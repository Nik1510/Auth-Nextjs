Here’s a concise README you can drop into the repo. It covers setup, environment, auth flows, and clearly states that password reset emails are sent via Mailtrap for now (not real inbox delivery yet).

# Authentication Starter (Next.js + Mongoose)

A full‑stack authentication starter built with Next.js App Router, MongoDB/Mongoose, and secure email workflows using Nodemailer. Features signup, login, email verification, password reset, and session handling.

## Tech Stack

- Next.js 15, React 19, TypeScript
- MongoDB with Mongoose
- Bcrypt for password hashing
- JSON Web Tokens for sessions/verification
- Nodemailer with Mailtrap (sandbox)
- Axios for client requests
- Tailwind CSS 4 for styling
- React Hot Toast for notifications
- Lucide React for icons

## Features

- Email/password signup and login
- Secure password hashing with bcrypt
- Email verification flow
- Forgot password + reset flow with expiring tokens
- API routes with proper error handling
- Client components with clean UX and toasts

## Important Notice (Email Delivery)

- Password reset and verification emails are currently sent to the Mailtrap sandbox inbox, not to personal inboxes. This is intentional for safe testing in development environments.
- Direct email delivery to real inboxes is not enabled yet; SMTP for production will be integrated soon. Stay tuned.

## Getting Started

1) Clone and install
- Clone the repository and install dependencies:
  - npm install

2) Environment variables
- Create .env.local in the project root and fill the following:
  - MONGODB_URI=your_mongodb_connection_string
  - JWT_SECRET=your_strong_random_secret
  - DOMAIN=http://localhost:3000
  - MAILTRAP_HOST=sandbox.smtp.mailtrap.io
  - MAILTRAP_PORT=2525
  - MAILTRAP_USER=your_mailtrap_user
  - MAILTRAP_PASS=your_mailtrap_pass

Notes:
- DOMAIN is used in email links for verification and password reset pages.
- MAILTRAP_* credentials are from the Mailtrap sandbox inbox.

3) Run the app
- Development:
  - npm run dev
- The app runs at:
  - http://localhost:3000

## Scripts

- dev: Start Next.js in development mode
- build: Build the production bundle
- start: Start the production server
- lint: Lint the project

## API Overview

- POST /api/users/register
  - Create account; hashes password and sends verification email link.

- POST /api/users/login
  - Verify credentials; issues session/JWT as configured.

- GET /api/users/me
  - Return the current user session data.

- POST /api/users/verify-email
  - Validate verification token and mark the account as verified.

- POST /api/users/forgot-password
  - Accepts email; generates a reset token and sends a Mailtrap email with a reset link.

- POST /api/users/update-password
  - Accepts token and newPassword; validates token expiry and updates password.

## Email Workflows

- Transport: Nodemailer configured to Mailtrap sandbox.
- Tokens:
  - Email verification and password reset use expiring tokens stored on the user record.
  - Password updates invalidate reset tokens after success.

Current limitation:
- Emails are not sent to real inboxes; they go to Mailtrap’s testing inbox for development. Production SMTP integration is planned and will be added soon.

## Security Notes

- Passwords are hashed with bcrypt.
- Reset tokens expire after one hour by default.
- Generic responses for forgot-password endpoints minimize account enumeration risk.
- Use HTTPS and secure cookies in production deployments.
- Rotate JWT secrets and keep environment variables out of version control.

## UI/UX Notes

- Tailwind CSS 4 for styling with accessible focus states.
- React Hot Toast for success/error feedback.
- Clean forms for signup, login, forgot password, and reset password.

## Development Tips

- Ensure MongoDB is reachable before running.
- If emails don’t appear, confirm Mailtrap credentials and that the transporter uses MAILTRAP_HOST/PORT/USER/PASS.
- Update DOMAIN to the deployed URL when hosting.
- Keep token handling consistent: if storing hashed tokens, compare with bcrypt on validation.

## Roadmap

- Production SMTP integration for real email delivery
- Rate limiting and brute-force protection
- Optional MFA and social login providers
- Role-based access control



[1](https://next-auth.js.org/getting-started/example)
[2](https://www.reddit.com/r/reactjs/comments/1aicm51/nextjs_next_auth_initial_template/)
[3](https://nextjs.org/docs/app/guides/authentication)
[4](https://next-auth.js.org/v3/getting-started/example)
[5](https://nextjs.org/docs/pages/guides/authentication)
[6](https://stackblitz.com/edit/github-8esmcp)
[7](https://fossies.org/linux/next.js/examples/with-magic/README.md)
[8](https://stackblitz.com/github/mui/toolpad/tree/master/examples/core/auth-nextjs-themed)
[9](https://docs.readme.com/ent/docs/getting-started-with-custom-authentication)
