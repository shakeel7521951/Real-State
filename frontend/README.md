# 🏠 Premier Real Estate

A modern, full-stack real estate application built with React and Node.js, featuring property listings, user authentication, and admin dashboard.

## ✨ Features

- **Property Listings** - Browse and search properties for sale/rent
- **User Authentication** - Secure login/signup with email verification
- **Admin Dashboard** - Manage properties and users
- **Contact System** - WhatsApp integration and email contact forms
- **Responsive Design** - Mobile-first, modern UI
- **Image Gallery** - Property photo carousel with thumbnails

## 🛠️ Tech Stack

**Frontend:**

- React 18 + Vite
- React Router DOM
- Tailwind CSS
- React Icons

**Backend:**

- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Nodemailer (Email)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- MongoDB
- Cloudinary account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Real-State
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   Create `.env` files in both root and backend directories:

   **Backend (.env):**

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

4. **Run the application**

   ```bash
   # Start backend server (from backend directory)
   npm start

   # Start frontend development server (from root directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5174`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
Real-State/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Route components
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   └── layouts/           # Layout components
├── backend/
│   ├── controllers/       # Route handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## 🔧 Available Scripts

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🌟 Key Features Detail

- **Dynamic Page Titles** - SEO-optimized titles for each page
- **Image Optimization** - Cloudinary integration for image management
- **Email Verification** - Secure user registration process
- **WhatsApp Integration** - Direct contact via WhatsApp
- **Protected Routes** - Role-based access control
- **Responsive Design** - Works on all devices

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ for modern real estate needs
