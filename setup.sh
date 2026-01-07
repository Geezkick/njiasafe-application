#!/bin/bash

echo "🚀 Setting up NJIASAFE Premium Web Application..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm detected"
echo "📦 Installing dependencies..."

cd "$(dirname "$0")"
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "To start the application:"
    echo "  npm start"
    echo ""
    echo "Application will be available at: http://localhost:3000"
    echo ""
    echo "Features included:"
    echo "  ✅ V2V Network with real-time communication"
    echo "  ✅ Smart Map with premium layers"
    echo "  ✅ Government & Insurance data sharing"
    echo "  ✅ Free & Premium subscription plans"
    echo "  ✅ Complete authentication system"
    echo "  ✅ All requested features implemented"
    echo "  ✅ Premium dark blue/orange/purple theme"
    echo "  ✅ Developed by Brian Nyarienya"
else
    echo "❌ Failed to install dependencies. Please check your setup."
    exit 1
fi
