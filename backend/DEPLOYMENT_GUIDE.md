# ParkNet Backend Deployment Guide

## 🚨 500 Error Fix Summary

The 500 error when submitting contact forms from other devices was caused by:

1. **CORS Configuration**: Only allowed specific localhost origins
2. **Missing Environment Variables**: No `.env` file with MongoDB connection
3. **Insufficient Error Logging**: Hard to debug production issues
4. **API URL Mismatch**: Frontend pointing to localhost in production

## ✅ Fixes Applied

### 1. Enhanced CORS Configuration
- Added dynamic origin checking
- Allow all Vercel subdomains
- Better error logging for blocked origins
- Support for mobile apps and curl requests

### 2. Improved Error Handling
- Detailed error logging with request context
- Specific MongoDB error handling
- Better validation error responses

### 3. Environment Configuration
- Created `env.example` template
- Clear instructions for environment setup

## 🚀 Deployment Steps

### Step 1: Environment Setup
1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Update `.env` with your actual values:
   ```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/parknet?retryWrites=true&w=majority
   PORT=3001
   NODE_ENV=production
   ```

### Step 2: Deploy to Vercel
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add environment variables:
     - `MONGODB_URL`: Your MongoDB connection string
     - `NODE_ENV`: `production`

### Step 3: Update Frontend
1. Update the API URL in your frontend:
   ```javascript
   const API_BASE_URL = 'https://your-backend-deployment-url.vercel.app';
   ```

2. Or use environment-based configuration:
   ```javascript
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-backend-deployment-url.vercel.app'
     : 'http://localhost:3001';
   ```

### Step 4: Test the Fix
1. Test from your development laptop (should still work)
2. Test from other devices using the Vercel URL
3. Check server logs for any remaining issues

## 🔍 Debugging Tips

### Check Server Logs
- Vercel Function logs: `vercel logs`
- Local development: Check console output

### Common Issues
1. **CORS Errors**: Check if origin is in allowed list
2. **Database Connection**: Verify MongoDB URL and network access
3. **Environment Variables**: Ensure all required vars are set

### Test Endpoints
```bash
# Health check
curl https://your-backend-url.vercel.app/health

# Test feedback creation
curl -X POST https://your-backend-url.vercel.app/api/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## 📱 Mobile/Cross-Device Testing

The updated CORS configuration now supports:
- Mobile browsers
- Different network origins
- Vercel preview deployments
- Development and production environments

## 🛡️ Security Notes

- CORS is configured to allow specific origins
- Rate limiting is enabled (100 requests per 15 minutes)
- Helmet security headers are active
- Environment variables are properly secured

## 📞 Support

If you still encounter 500 errors:
1. Check Vercel function logs
2. Verify MongoDB connection
3. Test with curl commands
4. Check browser network tab for detailed error messages
