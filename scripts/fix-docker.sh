#!/bin/bash

echo "🔧 Fixing Docker and EventTag Dashboard..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Kill any processes on port 3000
print_warning "Cleaning up port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Step 2: Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_warning "Docker is not running. Attempting to start..."
    
    # Try to start Docker Desktop
    if command -v open &> /dev/null; then
        print_warning "Starting Docker Desktop..."
        open -a Docker 2>/dev/null || print_error "Could not start Docker Desktop automatically"
        
        print_warning "Waiting for Docker to start..."
        for i in {1..30}; do
            if docker info > /dev/null 2>&1; then
                print_status "Docker is now running!"
                break
            fi
            echo -n "."
            sleep 2
        done
        echo ""
        
        if ! docker info > /dev/null 2>&1; then
            print_error "Docker failed to start automatically"
            print_warning "Please start Docker Desktop manually and run this script again"
            exit 1
        fi
    else
        print_error "Please start Docker Desktop manually and run this script again"
        exit 1
    fi
else
    print_status "Docker is running"
fi

# Step 3: Clean up any existing containers
print_warning "Cleaning up existing containers..."
docker-compose down 2>/dev/null || true

# Step 4: Build and start production containers
print_status "Building and starting production containers..."
if docker-compose up -d --build; then
    print_status "Deployment successful!"
    echo ""
    echo "🌐 Application is running at:"
    echo "   Local: http://localhost:3000"
    echo "   Network: http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'your-ip'):3000"
    echo ""
    echo "📊 View logs with: docker-compose logs -f"
    echo "🛑 Stop with: docker-compose down"
else
    print_error "Docker deployment failed"
    print_warning "Falling back to development mode..."
    
    # Fallback to development
    cd "$(dirname "$0")/.."
    pnpm install --silent
    echo "🚀 Starting development server..."
    pnpm dev
fi
