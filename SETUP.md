# 🚀 Setup Guide - Premium Fashion E-Commerce

This guide will help you set up and run your premium fashion e-commerce platform.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## 🛠️ Installation Steps

### 1. Install Dependencies

From the root directory, install all dependencies for both client and server:

```bash
npm run install:all
```

Or install individually:

```bash
# Root dependencies
npm install

# Client dependencies
cd client
npm install

# Server dependencies
cd ../server
npm install
```

### 2. Environment Configuration

#### Server Environment (Optional for now)

The server works out of the box with default settings. If you want to customize:

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=3000
NODE_ENV=development
```

#### Client Environment (Optional)

The client is configured to proxy API requests to `localhost:3000`. If needed:

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## 🏃 Running the Application

### Option 1: Run Everything (Recommended)

From the root directory:

```bash
npm run dev
```

This starts both the client and server concurrently:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

### Option 2: Run Individually

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

## 🎯 Testing the Application

### 1. Health Check

Verify the backend is running:

```bash
curl http://localhost:3000/health
```

### 2. Test API Endpoints

**Get all products:**

```bash
curl http://localhost:3000/api/products
```

**Get featured products:**

```bash
curl http://localhost:3000/api/products/featured
```

**Get product by ID:**

```bash
curl http://localhost:3000/api/products/1
```

**Test AI Stylist (Chatbot):**

```bash
curl -X POST http://localhost:3000/api/chat/recommend \
  -H "Content-Type: application/json" \
  -d '{"message": "I need a suit for a wedding"}'
```

### 3. Browse the Frontend

Open your browser and navigate to:

- **Home**: http://localhost:5173
- **Shop**: http://localhost:5173/shop
- **Cart**: http://localhost:5173/cart

## 🏗️ Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # API client & endpoints
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand state management
│   │   ├── types/         # TypeScript type definitions
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── server/                # Express Backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # API routes
│   │   ├── types/         # TypeScript types
│   │   ├── data/          # Mock data
│   │   └── server.ts      # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── package.json           # Root package (scripts)
```

## 🎨 Key Features

### ✅ Frontend

- **Premium Design**: Black/White/Gold color scheme with Playfair Display & Inter fonts
- **Smooth Animations**: Framer Motion for luxury feel
- **Responsive**: Mobile-first design
- **State Management**: Zustand for cart & user state
- **Routing**: React Router with multiple pages
- **AI Chatbot**: Floating "Ask Stylist" button (bottom-right)

### ✅ Backend

- **Layered Architecture**: Controller → Service → Repository
- **Repository Pattern**: Easy to swap InMemory → PostgreSQL
- **TypeScript**: Fully typed
- **RESTful API**: Clean endpoint structure
- **Mock Data**: High-quality fashion products

## 🔧 Development Tips

### Building for Production

**Client:**

```bash
cd client
npm run build
# Output in client/dist/
```

**Server:**

```bash
cd server
npm run build
# Output in server/dist/
```

### Linting

**Client:**

```bash
cd client
npm run lint
```

## 🔮 Next Steps

1. **Database Integration**

   - Implement `PostgresProductRepository`
   - Swap the repository in `server/src/server.ts`

2. **Authentication**

   - Add JWT-based auth
   - Implement user registration/login

3. **AI Chatbot**

   - Integrate OpenAI/Claude API
   - Update `server/src/services/ChatService.ts`

4. **Payment Gateway**

   - Add Stripe integration
   - Implement checkout flow

5. **Admin Dashboard**
   - Product management
   - Order management

## 📝 Troubleshooting

### Port Already in Use

**Backend (Port 3000):**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**Frontend (Port 5173):**

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### TypeScript Errors

```bash
# Clear and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

## 🎓 Architecture Notes

### Repository Pattern Benefits

The repository pattern allows you to swap data sources without changing business logic:

```typescript
// Current: In-Memory
const productRepository = new InMemoryProductRepository();

// Future: PostgreSQL (no service changes needed!)
const productRepository = new PostgresProductRepository(dbConnection);
```

### State Management

- **Cart**: Persistent in localStorage via Zustand
- **User**: Persistent in localStorage
- **Chat**: Session-based (non-persistent)

## 📚 Technologies Used

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand
- **Backend**: Node.js, Express, TypeScript
- **Dev Tools**: nodemon, ts-node, ESLint

## 🆘 Support

If you encounter issues:

1. Check console for errors (F12 in browser)
2. Verify all dependencies are installed
3. Ensure both servers are running
4. Check that ports 3000 and 5173 are available

---

**Happy Coding! 🎉**
