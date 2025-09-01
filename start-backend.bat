@echo off
echo 🚀 Starting ParkNet Backend...
echo 📁 Working directory: %CD%
echo 🔧 Installing dependencies if needed...

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

echo 🌟 Starting development server...
echo 🔗 Backend will be available at: http://localhost:3001
echo 📊 Health check: http://localhost:3001/health
echo 📝 API docs: http://localhost:3001/api/feedbacks
echo.
echo Press Ctrl+C to stop the server
echo ==================================

REM Start the backend
cd backend
npm run dev
