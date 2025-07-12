# ReWear – Community Clothing Exchange

## Overview

Develop ReWear, a web-based platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. The goal is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.

## Features

### User Authentication
- Email/password signup and login
- OTP Verification (Email)

### Landing Page
- Platform introduction
- Calls-to-action: “Start Swapping”, “Browse Items”, “List an Item”
- Featured items carousel

### User Dashboard
- Profile details and points balance
- Uploaded items overview
- Ongoing and completed swaps list

### Item Detail Page
- Image gallery and full item description
- Uploader info
- Options: “Swap Request” or “Redeem via Points”
- Item availability status

### Add New Item Page
- Upload images
- Enter title, description, category, type, size, condition, and tags
- Submit to list item

### Admin Role
- Moderate and approve/reject item listings
- Remove inappropriate or spam items
- Lightweight admin panel for oversight

## Technologies Used

### Frontend (Client)
- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For declarative routing in React applications.
- **React Hook Form**: For efficient and flexible form validation.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Toastify**: For displaying toast notifications.
- **CSS**: For styling and layout.

### Backend (Server)
- **Node.js**: JavaScript runtime environment.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcrypt**: For hashing passwords securely.
- **jsonwebtoken**: For implementing JSON Web Tokens for authentication.
- **cookie-parser**: Middleware to parse cookies attached to the client request.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: To load environment variables from a `.env` file.
- **nodemailer**: For sending emails (e.g., OTP, password reset).
- **cloudinary**: For image storage and management.

## Project Structure

```
ReWear/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     # Reusable React components
│   │   ├── layout/
│   │   ├── pages/          # Page-level React components
│   │   ├── styles/         # CSS files
│   │   ├── App.css
│   │   ├── App.jsx         # Main React application component and routing
│   │   └── main.jsx        # Entry point for the React application
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Node.js/Express application
│   ├── config.env          # Environment variables for the server
│   ├── controllers/        # Logic for handling API requests
│   ├── database/           # Database connection setup
│   ├── middlewares/        # Express middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── app.js              # Express application setup
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
├── setup.md                # Setup and installation instructions
├── gemini.md               # Notes for Gemini CLI agent
└── README.md               # Project documentation
```

## Getting Started

To set up and run this project, please refer to the [Setup and Installation Guide](SETUP.md).

## Usage

1.  **Access the Application**: Open your web browser and navigate to `http://localhost:5173`.
2.  **Register**: Sign up with your email and password.
3.  **Verify OTP**: After registration, you will be redirected to an OTP verification page. Enter the OTP received via email.
4.  **Login**: Once verified, you can log in using your registered email and password.
5.  **Explore**: Browse items, list your own, or initiate swaps.
