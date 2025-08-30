# 🚀 EventTag Dashboard - Hackathon Deployment Guide

## ⚡ Quick Start (1 minute setup)

```bash
# 1. Clone and enter directory
git clone <your-repo> evenTagDashboard
cd evenTagDashboard

# 2. Quick development start
pnpm hackathon:dev
```

**That's it! 🎉** Visit `http://localhost:3000`

---

## 🐳 Docker Deployment (Production Ready)

### Super Quick Deploy
```bash
pnpm hackathon:deploy
```

### Manual Steps
```bash
# Build and run production
pnpm docker:prod

# View logs
pnpm docker:logs

# Stop when done
pnpm docker:stop
```

---

## 📋 Available Commands

### 🏃‍♂️ Development
- `pnpm hackathon:dev` - Quick dev start (kills port conflicts)
- `pnpm dev` - Standard Next.js dev
- `pnpm docker:dev` - Dev with Docker + hot reload

### 🏗️ Production
- `pnpm hackathon:deploy` - Full production deployment
- `pnpm hackathon:build` - Build with stats
- `pnpm docker:prod` - Production Docker
- `pnpm start` - Production server (after build)

### 🛠️ Utilities
- `pnpm docker:logs` - View container logs
- `pnpm docker:stop` - Stop all containers
- `pnpm clean` - Reset everything
- `pnpm analyze` - Bundle analyzer

---

## 🌐 Access Points

- **Development**: `http://localhost:3000`
- **Docker Dev**: `http://localhost:3001`
- **Production**: `http://localhost:3000`
- **Network**: `http://[your-ip]:3000`

---

## 🔧 Troubleshooting

### Port Conflicts
```bash
# Kill all node processes
pkill -f node

# Or specific port
lsof -ti:3000 | xargs kill -9
```

### Docker Issues
```bash
# Reset Docker state
docker-compose down
docker system prune -f
pnpm hackathon:deploy
```

### Clean Slate
```bash
pnpm clean
pnpm hackathon:dev
```

---

## 📱 Demo Tips

1. **Quick Demo Start**: `pnpm hackathon:dev`
2. **Show Network Access**: Use your IP for audience access
3. **Docker Demo**: `pnpm docker:prod` (shows containerization)
4. **Production Build**: `pnpm hackathon:build` (shows optimization)

---

## 🎯 Hackathon Features

- ✅ **Instant Setup** - One command deployment
- ✅ **Docker Ready** - Containerized production
- ✅ **Hot Reload** - Development optimized
- ✅ **Network Access** - Demo on multiple devices
- ✅ **Health Checks** - Production monitoring
- ✅ **Optimized Build** - Fast loading
- ✅ **TypeScript** - Type safety
- ✅ **Modern UI** - Beautiful dashboard
- ✅ **Responsive** - Mobile friendly

---

## 🏆 Deployment Strategy

### For Judges/Demo
1. `pnpm hackathon:dev` - Local development
2. Show features and functionality
3. `pnpm hackathon:deploy` - Production deployment
4. Demonstrate scalability and Docker

### For Production/Real Use
1. `pnpm hackathon:build` - Optimized build
2. `pnpm docker:prod` - Production containers
3. Configure reverse proxy if needed
4. Monitor with `pnpm docker:logs`

---

**Built with ❤️ for the hackathon! 🏆**
