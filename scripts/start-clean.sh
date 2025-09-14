#!/bin/bash

echo "🔄 Cleaning up old processes..."
lsof -ti :5173 :5174 :3000 :8080 | xargs kill -9 2>/dev/null || true

echo "🧹 Clearing Vite cache..."
rm -rf una-platform/node_modules/.vite

if [ ! -d "una-platform/node_modules" ]; then
  echo "📦 Installing dependencies in una-platform..."
  cd una-platform && npm install && cd ..
fi

echo "🚀 Starting Vite dev server..."
cd una-platform && npm run dev
status=$?

if [ $status -ne 0 ]; then
  echo "⚠️ Dev server failed. Refreshing dependencies..."
  rm -rf node_modules package-lock.json
  npm install
  echo "🔁 Retrying Vite dev server..."
  npm run dev
fi
