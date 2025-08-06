# Backend API for Vercel Deployment

This is a Node.js/Express backend API optimized for deployment on Vercel's serverless platform.

## Features

- Express.js server with security middleware
- MongoDB integration with Mongoose
- JWT authentication
- Rate limiting
- CORS support
- Input validation with Joi
- Error handling middleware

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

3. Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Vercel Deployment

### Prerequisites

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Make sure you have a Vercel account and are logged in:
```bash
vercel login
```

### Deployment Steps

1. Deploy to Vercel:
```bash
vercel
```

2. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: `production`

3. Redeploy with environment variables:
```bash
vercel --prod
```

### API Endpoints

- `GET /api` - Root endpoint with API info
- `GET /api/health` - Health check endpoint
- `POST /api/auth/register` - User registration

### Architecture Changes for Vercel

The backend has been modified to work as a serverless function:

1. **Entry Point**: `api/index.js` serves as the main serverless function
2. **Database Connection**: Optimized for serverless with connection pooling
3. **Routing**: All routes are prefixed with `/api`
4. **Configuration**: `vercel.json` handles routing and build configuration

### Environment Variables

Make sure to set these in your Vercel project settings:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to `production` for Vercel

### Testing the Deployment

After deployment, test your endpoints:

```bash
# Health check
curl https://your-vercel-app.vercel.app/api/health

# Root endpoint
curl https://your-vercel-app.vercel.app/api
```

## Project Structure

```
backend/
├── api/
│   └── index.js          # Serverless function entry point
├── src/
│   ├── config/
│   │   └── database.js   # Database connection
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   └── User.js
│   └── routes/
│       └── auth.js
├── package.json
├── vercel.json           # Vercel configuration
└── README.md
```

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure your MongoDB URI is correct and accessible
2. **Environment Variables**: Double-check all environment variables are set in Vercel
3. **CORS Issues**: The API includes CORS middleware, but you may need to configure it for your frontend domain

### Local vs Production

- Local development uses `api/server.js` (traditional Express server)
- Production deployment uses `api/index.js` (serverless function)
- Database connection is optimized for serverless environments

## License

MIT 