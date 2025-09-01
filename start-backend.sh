#!/bin/bash

# ParkNet Backend Startup Script
echo "🚀 Starting ParkNet Backend..."
echo "📁 Working directory: $(pwd)"

# Kill any existing processes on port 3001
echo "🔧 Checking for existing processes on port 3001..."
if lsof -i:3001 > /dev/null 2>&1; then
    echo "⚠️  Port 3001 is in use. Killing existing processes..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true
    pkill -f nodemon 2>/dev/null || true
    sleep 2
    echo "✅ Port 3001 is now free"
fi

echo "🔧 Installing dependencies if needed..."

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

echo "🌟 Starting development server..."
echo "🔗 Backend will be available at: http://localhost:3001"
echo "📊 Health check: http://localhost:3001/health"
echo "📝 API docs: http://localhost:3001/api/feedbacks"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=================================="

# Start the backend
cd backend && npm run dev
