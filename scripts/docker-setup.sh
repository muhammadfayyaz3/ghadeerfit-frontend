#!/bin/bash

set -e

echo "🚀 Docker Setup for Frontend"
echo "============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Docker installation
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi
echo -e "${GREEN}✅ Docker installed${NC}"

# Check Docker Compose installation
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    echo "Please install Docker Compose from: https://docs.docker.com/compose/install/"
    exit 1
fi
echo -e "${GREEN}✅ Docker Compose installed${NC}"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker daemon is not running${NC}"
    echo "Please start Docker Desktop or Docker daemon"
    exit 1
fi
echo -e "${GREEN}✅ Docker daemon running${NC}"

echo ""
echo "📦 Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Wait for Frontend to be ready
echo "Waiting for Frontend..."
until curl -s http://localhost:3000 > /dev/null 2>&1; do
    echo -n "."
    sleep 2
done
echo ""
echo -e "${GREEN}✅ Frontend is ready${NC}"

echo ""
echo -e "${GREEN}✨ Setup completed successfully!${NC}"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend:  http://localhost:3000"
echo ""
echo "📝 Useful commands:"
echo "   View logs:          docker-compose logs -f"
echo "   Stop services:      docker-compose down"
echo "   Restart:            docker-compose restart"
echo ""

