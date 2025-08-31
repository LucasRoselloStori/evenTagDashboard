"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useMounted } from "@/hooks/use-mounted"

interface ZoneInfo {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  current: number
  capacity: number
  trend: "up" | "down" | "stable"
}

export function VisualHeatmap() {
  const mounted = useMounted()
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [animationFrame, setAnimationFrame] = useState(0)

  const zones: ZoneInfo[] = [
    { id: "entrance", name: "Main Entrance", x: 55, y: 45, width: 35, height: 20, current: 180, capacity: 200, trend: "up" },
    { id: "blockchain", name: "Web3 Stage", x: 105, y: 30, width: 40, height: 30, current: 145, capacity: 150, trend: "stable" },
    { id: "ai", name: "AI Demo Zone", x: 165, y: 40, width: 32, height: 25, current: 98, capacity: 120, trend: "up" },
    { id: "dev", name: "Dev Experience", x: 215, y: 25, width: 42, height: 35, current: 32, capacity: 100, trend: "down" },
    { id: "startup", name: "Startup Showcase", x: 45, y: 85, width: 50, height: 28, current: 85, capacity: 100, trend: "up" },
    { id: "networking", name: "Networking Hub", x: 115, y: 90, width: 35, height: 38, current: 92, capacity: 95, trend: "stable" },
    { id: "food", name: "Food Court", x: 170, y: 80, width: 45, height: 25, current: 28, capacity: 70, trend: "down" },
    { id: "workshop", name: "Workshop Area", x: 235, y: 85, width: 32, height: 40, current: 18, capacity: 60, trend: "up" },
    { id: "auditorium", name: "Main Auditorium", x: 85, y: 145, width: 70, height: 38, current: 120, capacity: 350, trend: "stable" },
    { id: "expo", name: "Expo Hall", x: 175, y: 135, width: 60, height: 45, current: 165, capacity: 200, trend: "up" },
    { id: "sponsors", name: "Sponsor Booths", x: 60, y: 125, width: 18, height: 15, current: 12, capacity: 40, trend: "stable" },

    { id: "coffee", name: "Coffee Bar", x: 90, y: 70, width: 20, height: 15, current: 15, capacity: 50, trend: "stable" },
    { id: "registration", name: "Registration", x: 255, y: 140, width: 25, height: 28, current: 5, capacity: 30, trend: "down" },
  ]

  // Subtle animation for minimal movement - only on client
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1)
    }, 3000) // Much slower, every 3 seconds

    return () => clearInterval(interval)
  }, [mounted])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <span className="text-red-500 text-lg">↗</span>
      case "down":
        return <span className="text-green-500 text-lg">↘</span>
      default:
        return <span className="text-yellow-500 text-lg">→</span>
    }
  }

  const getOccupancyLevel = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 95) return { label: "CRÍTICO", color: "bg-red-500", text: "text-white" }
    if (percentage >= 85) return { label: "ALTO", color: "bg-orange-500", text: "text-white" }
    if (percentage >= 70) return { label: "MEDIO", color: "bg-yellow-500", text: "text-black" }
    if (percentage >= 50) return { label: "NORMAL", color: "bg-blue-500", text: "text-white" }
    return { label: "BAJO", color: "bg-green-500", text: "text-white" }
  }

  if (!mounted) {
    return (
      <Card className="w-full border-orange-200 shadow-xl overflow-hidden">
        <CardHeader className="pb-4 pt-6 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3 text-gray-800">
              Live Heatmap - Event Zones
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-orange-200 shadow-xl overflow-hidden">
      <CardHeader className="pb-4 pt-6 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-3 text-gray-800">
            <div className="relative">
              <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            DevConnect Argentina 2025 - Venue Heatmap
          </CardTitle>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-green-400"></div>
              <span className="text-gray-700 font-semibold">Low (0-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"></div>
              <span className="text-gray-700 font-semibold">Medium (50-75%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500"></div>
              <span className="text-gray-700 font-semibold">High (75%+)</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="relative w-full h-[600px] rounded-xl border-2 border-gray-300 overflow-hidden mb-8"
          style={{
            backgroundImage: "url('/plano2.jpeg')",
            backgroundSize: '140%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}>

          {/* Semi-transparent overlay for better visibility of zones */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Floor plan details */}
          <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 rounded text-xs font-semibold text-gray-800 shadow-sm">
            PLANTA BAJA - DevConnect Argentina 2025
          </div>
          <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 rounded text-xs font-semibold text-gray-800 shadow-sm">
            🧭 North
          </div>

          {/* Heatmap Canvas */}
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 350 220"
              className="w-full h-full"
            >
              {/* Enhanced Definitions for better heatmap effect */}
              <defs>
                <radialGradient id="heatLow" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#16a34a" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#15803d" stopOpacity="0.6" />
                  <stop offset="85%" stopColor="#166534" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#14532d" stopOpacity="0.4" />
                </radialGradient>
                <radialGradient id="heatMedium" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                  <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#eab308" stopOpacity="0.7" />
                  <stop offset="75%" stopColor="#d97706" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.5" />
                </radialGradient>
                <radialGradient id="heatHigh" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#eab308" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#d97706" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.7" />
                </radialGradient>
                <radialGradient id="heatCritical" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="1" />
                  <stop offset="15%" stopColor="#991b1b" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#b91c1c" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#dc2626" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.7" />
                </radialGradient>
                <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                </filter>
                <filter id="heatBlur" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                </filter>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Zone Boundaries and Heat Blobs */}
              {zones.map((zone) => {
                const percentage = (zone.current / zone.capacity) * 100
                const centerX = zone.x + zone.width / 2
                const centerY = zone.y + zone.height / 2
                const intensity = percentage / 100

                const getHeatGradient = () => {
                  if (percentage >= 90) return "url(#heatCritical)"
                  if (percentage >= 75) return "url(#heatHigh)"
                  if (percentage >= 50) return "url(#heatMedium)"
                  return "url(#heatLow)"
                }

                // Generate unique organic blob shapes for each zone
                const blobSize = Math.max(6, intensity * 18)
                const time = animationFrame * 0.01 // Much slower movement
                const pulseScale = 0.95 + 0.1 * Math.sin(animationFrame * 0.02) // Minimal pulse

                // Create truly unique shapes for each zone
                let mainBlob = ""

                switch (zone.id) {
                  case "entrance": // Wide oval for entrance
                    mainBlob = `
                      <ellipse cx="${centerX}" cy="${centerY}" 
                               rx="${blobSize * 1.5}" ry="${blobSize * 0.8}" 
                               transform="rotate(15 ${centerX} ${centerY})" />
                    `
                    break
                  case "blockchain": // Tech-like angular shape
                    mainBlob = `
                      <polygon points="${centerX - blobSize},${centerY - blobSize * 0.6} 
                                       ${centerX + blobSize * 1.2},${centerY - blobSize * 0.4} 
                                       ${centerX + blobSize * 0.8},${centerY + blobSize * 1.1} 
                                       ${centerX - blobSize * 0.7},${centerY + blobSize * 0.9}" />
                    `
                    break
                  case "ai": // Brain-like curved shape
                    mainBlob = `M${centerX - blobSize * 0.8},${centerY} 
                      C${centerX - blobSize * 1.3},${centerY - blobSize * 1.2} 
                      ${centerX + blobSize * 0.5},${centerY - blobSize * 1.4} 
                      ${centerX + blobSize * 1.1},${centerY - blobSize * 0.2} 
                      C${centerX + blobSize * 1.4},${centerY + blobSize * 0.8} 
                      ${centerX + blobSize * 0.2},${centerY + blobSize * 1.3} 
                      ${centerX - blobSize * 0.4},${centerY + blobSize} 
                      C${centerX - blobSize * 1.2},${centerY + blobSize * 0.3} 
                      ${centerX - blobSize * 1.1},${centerY - blobSize * 0.3} 
                      ${centerX - blobSize * 0.8},${centerY} Z`
                    break
                  case "food": // Circular for food court
                    mainBlob = `
                      <circle cx="${centerX}" cy="${centerY}" r="${blobSize}" />
                    `
                    break
                  case "auditorium": // Large rectangle for auditorium
                    mainBlob = `
                      <rect x="${centerX - blobSize * 1.2}" y="${centerY - blobSize * 0.7}" 
                            width="${blobSize * 2.4}" height="${blobSize * 1.4}" 
                            rx="${blobSize * 0.3}" />
                    `
                    break
                  default: // Organic blob for others
                    const seed = zone.id.charCodeAt(0) + zone.id.charCodeAt(zone.id.length - 1)
                    const variation = seed % 100 / 100
                    mainBlob = `M${centerX - blobSize * (0.8 + variation * 0.4)},${centerY} 
                      C${centerX - blobSize * (1.1 + variation * 0.3)},${centerY - blobSize * (0.7 + variation * 0.5)} 
                      ${centerX + blobSize * (0.3 + variation * 0.4)},${centerY - blobSize * (1.0 + variation * 0.3)} 
                      ${centerX + blobSize * (0.9 + variation * 0.4)},${centerY - blobSize * (0.1 + variation * 0.3)} 
                      C${centerX + blobSize * (1.2 + variation * 0.3)},${centerY + blobSize * (0.6 + variation * 0.4)} 
                      ${centerX + blobSize * (0.4 + variation * 0.3)},${centerY + blobSize * (1.1 + variation * 0.2)} 
                      ${centerX - blobSize * (0.2 + variation * 0.3)},${centerY + blobSize * (0.9 + variation * 0.3)} 
                      C${centerX - blobSize * (1.0 + variation * 0.2)},${centerY + blobSize * (0.4 + variation * 0.3)} 
                      ${centerX - blobSize * (1.1 + variation * 0.2)},${centerY - blobSize * (0.2 + variation * 0.3)} 
                      ${centerX - blobSize * (0.8 + variation * 0.4)},${centerY} Z`
                }

                // Static secondary blobs (fixed positions based on zone ID)
                const secondaryBlobs = [
                  {
                    x: centerX + blobSize * (0.5 + (zone.id.charCodeAt(1) % 3) * 0.1),
                    y: centerY - blobSize * (0.4 + (zone.id.charCodeAt(2) % 3) * 0.1),
                    size: blobSize * (0.5 + (zone.id.charCodeAt(0) % 3) * 0.05),
                    rotation: (zone.id.charCodeAt(0) % 360)
                  },
                  {
                    x: centerX - blobSize * (0.6 + (zone.id.charCodeAt(3) % 3) * 0.05),
                    y: centerY + blobSize * (0.6 + (zone.id.charCodeAt(4) % 3) * 0.1),
                    size: blobSize * (0.4 + (zone.id.charCodeAt(1) % 3) * 0.05),
                    rotation: (zone.id.charCodeAt(1) % 360)
                  }
                ]

                return (
                  <g key={zone.id}>






                    {/* Zone Label - positioned above zone */}
                    <text
                      x={centerX}
                      y={zone.y - 5}
                      textAnchor="middle"
                      fill="white"
                      className="font-bold pointer-events-none"
                      style={{
                        fontSize: "5px",
                        fontWeight: "600",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                      }}
                    >
                      {zone.name}
                    </text>

                    {/* Thermal Heat Circle - radial gradient from red center to green edges */}
                    <circle
                      cx={centerX}
                      cy={centerY - 1}
                      r={Math.max(12, Math.min(25, 12 + (percentage / 100) * 15))}
                      fill={getHeatGradient()}
                      filter="url(#heatBlur)"
                      className="transition-all duration-1000"
                    />

                    {/* Percentage - center of zone, adaptive size, clickable */}
                    <text
                      x={centerX}
                      y={centerY - 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      className="font-bold cursor-pointer hover:fill-yellow-200 transition-colors duration-200"
                      style={{
                        fontSize: `${Math.max(8, Math.min(16, zone.width * 0.5))}px`,
                        fontWeight: "800",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                      }}
                      onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                    >
                      {Math.round(percentage)}%
                    </text>


                  </g>
                )
              })}
            </svg>
          </div>

          {/* Selected Zone Details */}
          {selectedZone && (
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur border-2 border-orange-200 rounded-xl p-6 shadow-2xl min-w-72 z-10">
              {(() => {
                const zone = zones.find(z => z.id === selectedZone)
                if (!zone) return null
                const level = getOccupancyLevel(zone.current, zone.capacity)
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg text-gray-800">{zone.name}</h4>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(zone.trend)}
                        <span className="text-sm text-gray-500 font-medium">trend</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base text-gray-600 font-medium">Status:</span>
                        <Badge className={`${level.color} ${level.text} text-sm px-3 py-1 font-bold`}>
                          {level.label}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-base text-gray-600 font-medium">Occupancy:</span>
                        <span className="font-bold text-2xl text-gray-800">
                          {Math.round((zone.current / zone.capacity) * 100)}%
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-base text-gray-600 font-medium">People:</span>
                        <span className="font-bold text-lg text-gray-700">
                          {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()}
                        </span>
                      </div>

                      {/* Capacity Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(zone.current / zone.capacity) * 100}%`,
                            background: (zone.current / zone.capacity) * 100 >= 90 ?
                              'linear-gradient(90deg, #ef4444, #dc2626)' :
                              (zone.current / zone.capacity) * 100 >= 70 ?
                                'linear-gradient(90deg, #f97316, #ea580c)' :
                                'linear-gradient(90deg, #22c55e, #16a34a)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>

        {/* Live Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200">
            <div className="text-3xl font-black text-red-600">
              {zones.filter(z => (z.current / z.capacity) * 100 >= 90).length}
            </div>
            <div className="text-sm text-red-600 font-bold mt-1">CRITICAL</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
            <div className="text-3xl font-black text-orange-600">
              {zones.filter(z => (z.current / z.capacity) * 100 >= 75 && (z.current / z.capacity) * 100 < 90).length}
            </div>
            <div className="text-sm text-orange-600 font-bold mt-1">HIGH</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
            <div className="text-3xl font-black text-yellow-600">
              {zones.filter(z => (z.current / z.capacity) * 100 >= 50 && (z.current / z.capacity) * 100 < 75).length}
            </div>
            <div className="text-sm text-yellow-600 font-bold mt-1">MEDIUM</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
            <div className="text-3xl font-black text-green-600">
              {zones.filter(z => (z.current / z.capacity) * 100 < 50).length}
            </div>
            <div className="text-sm text-green-600 font-bold mt-1">LOW</div>
          </div>
        </div>

        {/* Real-time indicator */}
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live data • DevConnect Argentina 2025 • Updates every 200ms</span>
        </div>
      </CardContent>
    </Card>
  )
}