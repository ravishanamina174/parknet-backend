# ParkNet Backend

A robust Node.js backend API for the ParkNet project, built with Express.js, TypeScript, and MongoDB.

## 🚀 Features

- **RESTful API** with proper HTTP status codes and error handling
- **MongoDB Integration** using Mongoose ODM
- **TypeScript** for type safety and better development experience
- **Security** with Helmet.js for security headers
- **Rate Limiting** to prevent abuse (100 requests per 15 minutes)
- **CORS** configured for frontend integration
- **Request Logging** with Morgan
- **Environment Configuration** with dotenv
- **Global Error Handling** with proper error responses
- **Input Validation** and sanitization

## 📋 Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

## 🛠️ Installation

1. **Clone the repository and navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   MONGODB_URL=your_mongodb_connection_string
   PORT=3001
   NODE_ENV=development
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic reloading.

### Production Mode
```bash
npm run build
npm start
```

## 📊 API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Feedback Management
- **POST** `/api/feedbacks` - Create new feedback
- **GET** `/api/feedbacks` - Get all feedbacks
- **GET** `/api/feedbacks/:id` - Get single feedback by ID
- **PUT** `/api/feedbacks/:id` - Update feedback by ID
- **DELETE** `/api/feedbacks/:id` - Delete feedback by ID

## 📝 API Documentation

### Create Feedback
```http
POST /api/feedbacks
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great parking service!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great parking service!",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Feedback created successfully"
}
```

### Get All Feedbacks
```http
GET /api/feedbacks
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Great parking service!",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Update Feedback
```http
PUT /api/feedbacks/:id
Content-Type: application/json

{
  "message": "Updated feedback message"
}
```

### Delete Feedback
```http
DELETE /api/feedbacks/:id
```

## 🗄️ Database Schema

### Feedback Collection
```typescript
interface IFeedback {
  name: string;        // Required, 2-100 characters
  email: string;       // Required, valid email format
  message: string;     // Required, 10-1000 characters
  createdAt: Date;     // Auto-generated timestamp
  updatedAt: Date;     // Auto-updated timestamp
}
```

## 🔧 Configuration

### CORS
- Configured for frontend running on `localhost:8080`
- Supports credentials

### Rate Limiting
- 100 requests per 15 minutes per IP address
- Configurable in `src/index.ts`

### Security
- Helmet.js for security headers
- Input validation and sanitization
- MongoDB injection protection

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   └── feedbackController.ts # CRUD operations
│   ├── models/
│   │   └── Feedback.ts          # Mongoose schema
│   ├── routes/
│   │   └── feedbackRoutes.ts    # API routes
│   └── index.ts                 # Main server file
├── .env                         # Environment variables
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## 🔍 Development

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove build artifacts

### TypeScript
- Strict mode enabled
- Source maps for debugging
- Declaration files generated

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URL` | MongoDB connection string | Required |
| `CLERK_SECRET_KEY` | Clerk authentication secret | Required |
| `CLERK_PUBLISHABLE_KEY` | Clerk authentication public key | Required |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
