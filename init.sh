#!/bin/bash

# DKFDS Vue3 Initialization Script
# This script sets up the development environment for the DKFDS Vue3 component library

echo "🚀 Initializing DKFDS Vue3 Development Environment..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Check Node version
if [ -f .nvmrc ]; then
    REQUIRED_NODE=$(cat .nvmrc)
    CURRENT_NODE=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    
    if [ "$CURRENT_NODE" -lt "$REQUIRED_NODE" ]; then
        echo "⚠️  Node.js version $REQUIRED_NODE or higher is required (current: v$CURRENT_NODE)"
        echo "   Please update your Node.js version or use nvm"
        exit 1
    fi
fi

echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "🔨 Building all packages..."
pnpm run build

echo ""
echo "✅ Initialization complete!"
echo ""
echo "Available commands:"
echo "  pnpm dev          - Start the demo development server"
echo "  pnpm build        - Build all packages"
echo "  pnpm build:core   - Build the core package only"
echo "  pnpm build:extra  - Build the extra package only"
echo "  pnpm build:utils  - Build the utils package only"
echo "  pnpm build:demo   - Build the demo app"
echo "  pnpm preview      - Preview the built demo app"
echo "  pnpm lint         - Run ESLint"
echo "  pnpm format       - Format code with Prettier and ESLint"
echo "  pnpm type-check   - Run TypeScript type checking"
echo ""
echo "To start developing, run: pnpm dev"