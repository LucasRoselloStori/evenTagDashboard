#!/bin/bash

# Quick start script for hackathon demos
echo "⚡ EventTag Dashboard - Quick Start"

# Make sure we're in the right directory
cd "$(dirname "$0")/.."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Kill any process on port 3000
echo "🧹 Cleaning up port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start development server
echo "🚀 Starting development server..."
pnpm dev
