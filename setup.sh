#!/bin/bash

echo "🚀 Frontend Setup Script"
echo "========================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Creating .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5001/api" > .env.local
    echo "✅ Frontend .env.local created"
else
    echo "✅ Frontend .env.local already exists"
fi

echo ""
echo "✨ Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env.local with your backend API URL if needed"
echo "2. Run 'npm run dev' to start the development server"
echo ""
echo "🌐 The frontend will be available at:"
echo "   http://localhost:3000"
echo ""

