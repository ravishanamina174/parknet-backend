import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import feedbackRoutes from './routes/feedbackRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3001;

// Connect to MongoDB
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:8080', 
      'http://127.0.0.1:8080',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://parknet-smarter-cities.vercel.app', // Production frontend URL
      // Add your Vercel deployment URL here
      'https://parknet-backend.onrender.com' // Your backend URL (if deployed)
    ];
    
    // Allow any subdomain of vercel.app for development
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(limiter); // Rate limiting
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'ParkNet Backend is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV']
  });
});

// API routes
app.use('/api/feedbacks', feedbackRoutes);

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Global error handler:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  });
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env['NODE_ENV'] === 'development' ? error.message : undefined
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ParkNet Backend server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env['NODE_ENV']}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API docs: http://localhost:${PORT}/api/feedbacks`);
});

export default app;
