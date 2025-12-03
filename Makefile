.PHONY: help dev dev-build prod prod-build stop clean logs

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start development environment
	docker-compose up

dev-build: ## Build and start development environment
	docker-compose up --build

dev-detached: ## Start development environment in detached mode
	docker-compose up -d

prod: ## Start production environment
	docker-compose -f docker-compose.prod.yml up

prod-build: ## Build and start production environment
	docker-compose -f docker-compose.prod.yml up --build

prod-detached: ## Start production environment in detached mode
	docker-compose -f docker-compose.prod.yml up -d

stop: ## Stop all containers
	docker-compose down
	docker-compose -f docker-compose.prod.yml down

stop-volumes: ## Stop all containers and remove volumes
	docker-compose down -v
	docker-compose -f docker-compose.prod.yml down -v

clean: ## Remove all containers, volumes, and images
	docker-compose down -v --rmi all
	docker-compose -f docker-compose.prod.yml down -v --rmi all

logs: ## Show logs from all containers
	docker-compose logs -f

logs-frontend: ## Show frontend logs
	docker-compose logs -f frontend

shell-frontend: ## Open shell in frontend container
	docker-compose exec frontend sh

restart: ## Restart all services
	docker-compose restart

restart-frontend: ## Restart frontend service
	docker-compose restart frontend

ps: ## Show running containers
	docker-compose ps

build: ## Build all images
	docker-compose build

build-frontend: ## Build frontend image only
	docker-compose build frontend

