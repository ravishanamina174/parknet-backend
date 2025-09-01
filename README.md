# ParkNet Backend

A Node.js backend API for the ParkNet project, built with Express.js, TypeScript, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm run install-deps
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

That's it! The backend will start on `http://localhost:3001`

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run dev-clean` | Kill existing processes and start dev server |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run start` | Start production server |
| `npm run install-deps` | Install backend dependencies |
| `npm run clean` | Clean build artifacts |
| `npm run kill-port` | Kill any processes using port 3001 |

## 🔗 API Endpoints

- **Health Check:** `GET /health`
- **Feedbacks:** `GET|POST|PUT|DELETE /api/feedbacks`

## 📁 Project Structure

```
parknet-backend/
├── backend/                 # Main backend application
│   ├── src/                # TypeScript source code
│   ├── dist/               # Compiled JavaScript
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── package.json            # Root package (this file)
└── README.md              # This file
```

## 🌐 Environment Variables

The backend uses the following environment variables (configured in `backend/.env`):

- `PORT=3001` - Server port
- `MONGODB_URL` - MongoDB connection string
- `NODE_ENV=development` - Environment mode
- `CLERK_SECRET_KEY` - Clerk authentication secret
- `CLERK_PUBLISHABLE_KEY` - Clerk authentication public key

## 🎯 Development

The backend includes:
- ✅ Express.js server with TypeScript
- ✅ MongoDB integration with Mongoose
- ✅ Complete CRUD API for feedbacks
- ✅ Security middleware (Helmet, CORS, Rate limiting)
- ✅ Request logging and error handling
- ✅ Input validation and sanitization

## 📝 API Documentation

For detailed API documentation, see `backend/README.md`

## 🆘 Support

For support and questions, please contact the development team.
