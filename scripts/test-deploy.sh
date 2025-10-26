#!/bin/bash

echo "🧪 Testing deployment locally..."

# Check if .env exists
if [ ! -f .env ]; then
  echo "❌ .env file not found!"
  echo "📝 Copy .env.example to .env and fill in your values"
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🗄️ Running migrations..."
npx prisma migrate deploy

# Seed database
echo "🌱 Seeding database..."
npm run prisma:seed

# Build application
echo "🏗️ Building application..."
npm run build

# Start application
echo "🚀 Starting application..."
npm run start

echo "✅ Application running at http://localhost:3000"
