#!/bin/bash

# Deploy script for EventTag Dashboard Hackathon
echo "🚀 Deploying EventTag Dashboard for Hackathon..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "Docker is running"

# Stop any existing containers
print_warning "Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build production image
print_status "Building production image..."
docker-compose build --no-cache

# Start production containers
print_status "Starting production containers..."
docker-compose up -d

# Wait a bit for containers to start
sleep 5

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    print_status "Deployment successful!"
    echo ""
    echo "🌐 Application is running at:"
    echo "   Local: http://localhost:3000"
    echo "   Network: http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo "📊 View logs with: docker-compose logs -f"
    echo "🛑 Stop with: docker-compose down"
else
    print_error "Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi
