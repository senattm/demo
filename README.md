# Premium Fashion E-Commerce Platform

A luxury fashion e-commerce website with a sophisticated design and modern architecture.

## 🚀 Tech Stack

### Frontend

- **React** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (Animations)
- **Zustand** (State Management)
- **React Router** (Navigation)

### Backend

- **Node.js**
- **Express**
- **TypeScript**
- **Layered Architecture** (Controller → Service → Repository)
- **PostgreSQL** (Future - Currently using Mock Data)

## 📁 Project Structure

```
├── client/          # React frontend application
├── server/          # Express backend API
└── package.json     # Root package configuration
```

## 🎨 Design Philosophy

- **Premium & Minimalist** aesthetic
- **Black, White, Gold** color palette
- **Playfair Display** for headers
- **Inter** for body text
- Smooth animations with Framer Motion

## 🛠️ Installation

```bash
# Install all dependencies (root, client, server)
npm run install:all
```

## 🏃 Running the Project

```bash
# Run both client and server concurrently
npm run dev

# Or run individually
npm run dev:client  # Frontend on http://localhost:5173
npm run dev:server  # Backend on http://localhost:3000
```

## 📦 Features

- **Responsive Design** - Mobile-first approach
- **Hero Section** - Full-screen with video/image support
- **Product Catalog** - Grid layout with filters
- **Shopping Cart** - Persistent state management
- **AI Stylist** - Chatbot for personalized recommendations (Prepared)
- **Repository Pattern** - Easy database swapping

## 🔮 Future Enhancements

- PostgreSQL integration
- AI-powered product recommendations
- User authentication & profiles
- Order management system
- Payment gateway integration
- Admin dashboard
