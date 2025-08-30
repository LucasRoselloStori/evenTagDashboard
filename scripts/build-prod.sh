#!/bin/bash

# Production build script
echo "🏗️  Building EventTag Dashboard for Production..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build the application
echo "🔨 Building application..."
if pnpm build; then
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo ""
    echo "📊 Build statistics:"
    ls -la .next/static/ 2>/dev/null || echo "No static files found"
    echo ""
    echo "🚀 Ready for deployment!"
    echo "   • Docker: docker-compose up -d"
    echo "   • Local: pnpm start"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi
