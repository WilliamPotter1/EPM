require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (no database dependency)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint (no database dependency)
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Backend API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Check if required environment variables are set
const checkEnvironment = () => {
  const required = ['MONGODB_URI'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return false;
  }
  return true;
};

// Lazy load database and routes only when needed
let isInitialized = false;
let connectDB, authRoutes, errorHandler;

const initializeApp = async () => {
  if (isInitialized) return;
  
  try {
    // Check environment variables first
    if (!checkEnvironment()) {
      throw new Error('Missing required environment variables');
    }
    
    // Dynamically import modules
    connectDB = require('../src/config/database');
    authRoutes = require('../src/routes/auth');
    errorHandler = require('../src/middleware/errorHandler');
    
    // Connect to database
    await connectDB();
    
    // Add routes after successful database connection
    app.use('/api/auth', authRoutes);
    
    // Add error handling middleware
    app.use(errorHandler);
    
    isInitialized = true;
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    throw error;
  }
};

// Middleware to initialize app on first request
app.use(async (req, res, next) => {
  // Skip initialization for health and root endpoints
  if (req.path === '/api/health' || req.path === '/api') {
    return next();
  }
  
  try {
    await initializeApp();
    next();
  } catch (error) {
    console.error('Initialization error:', error);
    res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Database connection failed'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export the Express app for Vercel serverless function
module.exports = app; 