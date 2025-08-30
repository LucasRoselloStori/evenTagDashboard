# Docker Commands for EventTag Dashboard

## Production Build & Run

### Build the production image
```bash
docker build -t eventagdashboard:latest .
```

### Run the production container
```bash
docker run -d \
  --name eventagdashboard \
  -p 3000:3000 \
  --restart unless-stopped \
  eventagdashboard:latest
```

### Using Docker Compose (Production)
```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## Development

### Using Docker Compose (Development)
```bash
# Start development environment
docker-compose --profile dev up -d

# View logs
docker-compose --profile dev logs -f eventagdashboard-dev

# Stop development environment
docker-compose --profile dev down
```

### Build development image manually
```bash
docker build -f Dockerfile.dev -t eventagdashboard:dev .
```

### Run development container manually
```bash
docker run -d \
  --name eventagdashboard-dev \
  -p 3001:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.next \
  eventagdashboard:dev
```

## Useful Commands

### View running containers
```bash
docker ps
```

### View logs
```bash
# Production
docker logs eventagdashboard

# Development
docker logs eventagdashboard-dev
```

### Stop containers
```bash
# Production
docker stop eventagdashboard

# Development
docker stop eventagdashboard-dev
```

### Remove containers
```bash
# Production
docker rm eventagdashboard

# Development
docker rm eventagdashboard-dev
```

### Access container shell
```bash
# Production
docker exec -it eventagdashboard sh

# Development
docker exec -it eventagdashboard-dev sh
```

### Clean up (remove unused images, containers, networks)
```bash
docker system prune -a
```

## Environment Variables

You can set environment variables in a `.env.local` file or pass them directly:

```bash
docker run -d \
  --name eventagdashboard \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  eventagdashboard:latest
```

## Health Check

The production container includes a health check. Check status:

```bash
docker inspect --format='{{.State.Health.Status}}' eventagdashboard
```
