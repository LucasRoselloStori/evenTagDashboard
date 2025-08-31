# EvenTag Dashboard

> **Built with [v0](https://v0.dev)** - AI-powered event management dashboard for real-time analytics and heatmap visualization.

## 🚀 Overview

EvenTag Dashboard is a modern, real-time event management system that provides comprehensive analytics, interactive heatmaps, and AI-powered insights for event organizers. Built with Next.js 15, TypeScript, and TailwindCSS, it offers a beautiful and responsive interface for monitoring event metrics in real-time.

## ✨ Features

### 📊 Real-time Analytics
- **Live Attendance Tracking**: Real-time monitoring of current attendees vs registered
- **Timeline Visualization**: Interactive charts showing attendee evolution throughout the day
- **Peak Detection**: Automatic identification of peak attendance times
- **Social Media Integration**: Share live metrics across social platforms

### 🗺️ Interactive Heatmap
- **Thermal Visualization**: Realistic heatmap with red-yellow-green gradients
- **Zone-based Analytics**: Individual zone capacity and occupancy tracking
- **Clickable Zones**: Interactive zones with detailed information popups
- **Floor Plan Integration**: Background floor plan with precise zone mapping
- **Dynamic Scaling**: Adaptive sizing based on occupancy percentages

### 🤖 AI-Powered Insights
- **Smart Recommendations**: AI-generated insights for event optimization
- **Incident Management**: Assignable incidents with team member assignment
- **Predictive Analytics**: Trend analysis and capacity forecasting
- **Real-time Alerts**: Critical zone notifications and warnings

### 📈 Performance Metrics
- **Zone Distribution**: Visual representation of attendee distribution
- **Movement Flows**: Common routes and traffic patterns between zones
- **Hot Zones**: High-density area identification
- **Post-event Analytics**: Comprehensive event performance reports

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Built-in theme switching capability
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Accessibility**: WCAG compliant with proper contrast and navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v3
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Containerization**: Docker & Docker Compose

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Docker (optional, for containerized deployment)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd evenTagDashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

#### Development
```bash
# Build and run development container
pnpm docker:dev

# Or using Docker Compose
docker-compose -f docker-compose.dev.yml up
```

#### Production
```bash
# Build and run production container
pnpm docker:prod

# Or using Docker Compose
docker-compose up -d
```

## 🚀 Hackathon Quick Start

For hackathon participants, we've included special scripts for rapid deployment:

```bash
# Quick development start
./scripts/quick-start.sh

# Production build and deploy
./scripts/build-prod.sh

# Full deployment with Docker
./scripts/deploy.sh
```

## 📁 Project Structure

```
evenTagDashboard/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── attendance-metrics.tsx
│   ├── event-metrics-dashboard.tsx
│   ├── heatmap-zones.tsx
│   ├── key-insights.tsx
│   ├── metrics-chat.tsx
│   ├── metrics-header.tsx
│   ├── movement-flows.tsx
│   ├── performance-analytics.tsx
│   ├── visual-heatmap.tsx
│   └── zone-distribution.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   └── plano2.jpeg      # Floor plan image
├── scripts/              # Deployment scripts
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Multi-container setup
└── package.json          # Dependencies and scripts
```

## 🎯 Key Components

### Visual Heatmap (`visual-heatmap.tsx`)
- **SVG-based rendering** for crisp, scalable graphics
- **Dynamic gradients** with realistic thermal effects
- **Interactive zones** with click-to-detail functionality
- **Real-time updates** with smooth animations
- **Floor plan integration** with precise positioning

### Attendance Metrics (`attendance-metrics.tsx`)
- **Real-time counters** with live updates
- **Timeline charts** using Recharts
- **Social sharing** integration
- **Hydration-safe** rendering for SSR compatibility

### AI Key Insights (`key-insights.tsx`)
- **Smart recommendations** based on event data
- **Incident management** with team assignment
- **Scrollable interface** for multiple insights
- **Actionable alerts** with priority levels

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_EVENT_ID=your_event_id
```

### TailwindCSS Configuration
The project uses TailwindCSS v3 with custom configurations in `tailwind.config.js` and `postcss.config.mjs`.

### Docker Configuration
- **Development**: Uses `Dockerfile.dev` with hot reloading
- **Production**: Uses multi-stage `Dockerfile` with optimized build
- **Compose**: Includes both development and production services

## 📊 Data Structure

### Zone Configuration
```typescript
interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  current: number;
  capacity: number;
  avgTime: number;
  trend: string;
}
```

### Heatmap Gradients
- **Low (0-50%)**: Green gradients (`#22c55e` to `#14532d`)
- **Medium (50-75%)**: Yellow/Orange gradients (`#fbbf24` to `#b45309`)
- **High (75-90%)**: Orange/Red gradients (`#fbbf24` to `#b45309`)
- **Critical (90%+)**: Red gradients (`#7f1d1d` to `#f97316`)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Production
```bash
# Build production image
docker build -t eventag-dashboard .

# Run container
docker run -p 3000:3000 eventag-dashboard
```

### Traditional Hosting
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **v0.dev** for the initial project structure and AI-powered development
- **shadcn/ui** for the beautiful component library
- **Recharts** for the charting capabilities
- **TailwindCSS** for the utility-first styling approach

## 📞 Support

For support, email support@eventag.com or join our Slack channel.

---

**Built with ❤️ using v0.dev**