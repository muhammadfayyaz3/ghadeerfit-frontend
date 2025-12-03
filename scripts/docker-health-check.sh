#!/bin/bash

echo "🔍 Checking Docker Environment Health..."
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    exit 1
fi
echo "✅ Docker is installed: $(docker --version)"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    exit 1
fi
echo "✅ Docker Compose is installed: $(docker-compose --version)"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running"
    exit 1
fi
echo "✅ Docker daemon is running"

echo ""
echo "🐳 Checking Container Status..."
echo "--------------------------------"

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Containers are running:"
    docker-compose ps
    
    echo ""
    echo "🏥 Health Check Results:"
    echo "------------------------"
    
    # Check Frontend
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Frontend is responding"
    else
        echo "❌ Frontend is not responding"
    fi
    
    echo ""
    echo "📊 Container Resource Usage:"
    echo "----------------------------"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" $(docker-compose ps -q)
    
else
    echo "⚠️  No containers are running"
    echo "   Start them with: docker-compose up -d"
fi

echo ""
echo "🌐 Application URLs:"
echo "--------------------"
echo "   Frontend:  http://localhost:3000"
echo ""

