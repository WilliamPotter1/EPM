require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration for local development
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173', // Vite default
    'http://localhost:8080', // Vue CLI default
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug endpoint to show available routes
app.get('/api/routes', (req, res) => {
  res.json({
    availableRoutes: [
      'GET /api/health',
      'GET /api',
      'GET /api/test',
      'GET /api/routes',
      'POST /api/debug-post',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ],
    timestamp: new Date().toISOString()
  });
});

// Simple POST test endpoint (no validation, no database)
app.post('/api/debug-post', (req, res) => {
  console.log('Debug POST received:', req.body);
  res.json({
    message: 'Debug POST endpoint working',
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

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
    console.log('Starting app initialization...');
    
    // Check environment variables first
    if (!checkEnvironment()) {
      throw new Error('Missing required environment variables');
    }
    
    console.log('Environment variables OK, importing modules...');
    
    // Dynamically import modules
    try {
      connectDB = require('../src/config/database');
      console.log('Database module imported successfully');
    } catch (error) {
      console.error('Failed to import database module:', error);
      throw error;
    }
    
    try {
      authRoutes = require('../src/routes/auth');
      console.log('Auth routes module imported successfully');
    } catch (error) {
      console.error('Failed to import auth routes module:', error);
      throw error;
    }
    
    try {
      errorHandler = require('../src/middleware/errorHandler');
      console.log('Error handler module imported successfully');
    } catch (error) {
      console.error('Failed to import error handler module:', error);
      throw error;
    }
    
    // Connect to database
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');
    
    // Add routes after successful database connection
    console.log('Adding auth routes...');
    app.use('/api/auth', authRoutes);
    console.log('Auth routes added successfully');
    
    // Add error handling middleware
    console.log('Adding error handler...');
    app.use(errorHandler);
    console.log('Error handler added successfully');
    
    isInitialized = true;
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    throw error;
  }
};

// Middleware to initialize app on first request
app.use(async (req, res, next) => {
  // Skip initialization for health, root, test, routes, and debug endpoints
  if (req.path === '/api/health' || req.path === '/api' || req.path === '/api/test' || req.path === '/api/routes' || req.path === '/api/debug-post') {
    return next();
  }
  
  try {
    console.log(`Initializing app for request: ${req.method} ${req.path}`);
    await initializeApp();
    next();
  } catch (error) {
    console.error('Initialization error:', error);
    res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Database connection failed',
      details: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    requestedPath: req.path,
    method: req.method,
    availableRoutes: [
      'GET /api/health',
      'GET /api',
      'GET /api/test',
      'GET /api/routes',
      'POST /api/debug-post',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ]
  });
});

// Export the Express app for Vercel serverless function
module.exports = app; 