# Backend API with MongoDB

A Node.js/Express backend API with MongoDB integration, featuring simple user registration with username and password.

## Features

- **MongoDB Integration**: Mongoose ODM for database operations
- **User Registration**: Simple registration with username and password
- **Input Validation**: Joi schema validation for request data
- **Security**: Helmet, CORS, rate limiting, and error handling
- **Environment Configuration**: Environment variables for configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure environment variables in `.env`:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### User Registration
- `POST /api/auth/register` - Register a new user

### Health Check
- `GET /health` - Server health status

## API Usage Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id_here",
    "username": "john_doe"
  }
}
```

## Project Structure

```
src/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── authController.js    # Registration logic
├── middleware/
│   ├── validation.js       # Input validation
│   └── errorHandler.js     # Error handling
├── models/
│   └── User.js             # User model
├── routes/
│   └── auth.js             # Registration routes
└── server.js               # Main server file
```

## Security Features

- **Input Validation**: Request data validation with Joi
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers

## Testing

Run tests with:
```bash
npm test
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/your_database | 