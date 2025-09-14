#!/bin/bash

# UNA Platform Development Server Script
# This script ensures clean port management

echo "🔍 Checking for existing servers..."

# Check common dev ports
PORTS=(5173 5174 3000 8080)
RUNNING_PORTS=()

for port in "${PORTS[@]}"; do
    if lsof -i :$port >/dev/null 2>&1; then
        echo "⚠️  Port $port is in use"
        RUNNING_PORTS+=($port)
    fi
done

if [ ${#RUNNING_PORTS[@]} -gt 0 ]; then
    echo ""
    echo "🧹 Cleaning up existing servers..."
    
    for port in "${RUNNING_PORTS[@]}"; do
        echo "   Killing processes on port $port"
        lsof -ti :$port | xargs kill -9 2>/dev/null || true
    done
    
    echo "✅ Cleanup complete"
    echo ""
fi

echo "🚀 Starting development server..."
npm run dev


