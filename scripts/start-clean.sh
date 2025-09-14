#!/bin/bash

echo "🔄 Cleaning up old processes..."
lsof -ti :5173 :5174 :3000 :8080 | xargs kill -9 2>/dev/null || true

echo "🧹 Clearing Vite cache..."
rm -rf node_modules/.vite

if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

echo "🚀 Starting Vite dev server..."
npm run dev
status=$?

if [ $status -ne 0 ]; then
  echo "⚠️ Dev server failed. Refreshing dependencies..."
  rm -rf node_modules package-lock.json
  npm install
  echo "🔁 Retrying Vite dev server..."
  npm run dev
fi