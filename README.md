# LendX Project Setup Guide

LendX is a lending/borrowing platform built on the XRP Ledger. This document provides instructions for setting up and testing the project.

## Prerequisites

- Node.js and npm should be installed on your machine.

## Frontend Setup

1. Clone the repository:
   `git clone <repository_url>`

2. Navigate into the lendx directory:
   `cd lendx`

3. Install dependencies:
   `npm install`

4. Run the development server:
   `npm run dev`

The frontend will now be accessible at `http://localhost:3000`.

## Backend Setup

1. Navigate to the `backend` directory:
   `cd backend`

2. Install backend dependencies:
   `npm install`

3. Run the backend server using nodemon:
   `nodemon index.js`

## Testing

With both the frontend and backend servers running, you can now test the LendX project.

- Open your web browser and go to `http://localhost:3000` to access the frontend.
- Interact with the frontend to test lending and borrowing functionalities.
- The backend server is already running and handling API requests from the frontend.

Remember to stop both the frontend and backend servers when you're done testing.

## Important Notes

- This guide assumes you have the necessary environment and dependencies set up.
- Make sure to replace `<repository_url>` with the actual URL of your project's repository.
- The default frontend port is `3000`, so make sure it's not in use.
- For production use, additional configurations and security measures are necessary.
- The remove button don't work cause of issues with gem wallet (EscrowCancel)
- Some features are missed, the lending model don't work completly currently but it is planned to be **implemented soon**!

**Happy testing of LendX!**
