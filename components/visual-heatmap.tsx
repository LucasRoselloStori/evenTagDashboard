"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HeatmapZone {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  density: number
  capacity: number
  current: number
}

export function VisualHeatmap() {
  const [zones, setZones] = useState<HeatmapZone[]>([
    {
      id: "1",
      name: "Main Entrance",
      x: 10,
      y: 10,
      width: 80,
      height: 30,
      density: 85,
      capacity: 200,
      current: 170,
    },
    {
      id: "2",
      name: "Web3 & Blockchain",
      x: 100,
      y: 50,
      width: 120,
      height: 80,
      density: 92,
      capacity: 150,
      current: 138,
    },
    { id: "3", name: "AI & ML Hub", x: 240, y: 50, width: 100, height: 80, density: 88, capacity: 120, current: 106 },
    {
      id: "4",
      name: "Developer Experience",
      x: 360,
      y: 50,
      width: 110,
      height: 80,
      density: 76,
      capacity: 100,
      current: 76,
    },
    {
      id: "5",
      name: "Startup Showcase",
      x: 100,
      y: 150,
      width: 140,
      height: 60,
      density: 68,
      capacity: 80,
      current: 54,
    },
    {
      id: "6",
      name: "Networking Lounge",
      x: 260,
      y: 150,
      width: 120,
      height: 60,
      density: 95,
      capacity: 100,
      current: 95,
    },
    { id: "7", name: "Food Court", x: 400, y: 150, width: 80, height: 60, density: 82, capacity: 60, current: 49 },
    {
      id: "8",
      name: "Main Auditorium",
      x: 150,
      y: 230,
      width: 180,
      height: 100,
      density: 45,
      capacity: 300,
      current: 135,
    },
  ])

  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  // Function to get unified color based on capacity percentage (SVG colors)
  const getHeatColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return "#f87171" // Red (danger)
    if (percentage >= 75) return "#fb7185" // Light red (danger)  
    if (percentage >= 60) return "#facc15" // Yellow (warning)
    if (percentage >= 40) return "#fde047" // Light yellow (warning)
    return "#4ade80" // Green (good)
  }

  const getHeatOpacity = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return 0.85
    if (percentage >= 75) return 0.75
    if (percentage >= 60) return 0.65
    if (percentage >= 40) return 0.60
    return 0.50
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setZones((prev) =>
        prev.map((zone) => ({
          ...zone,
          density: Math.max(10, Math.min(100, zone.density + (Math.random() - 0.5) * 10)),
          current: Math.max(5, Math.min(zone.capacity, zone.current + Math.floor((Math.random() - 0.5) * 20))),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full border-orange-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Heatmap
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#4ade80" }}></div>
              <span>Good (&lt;40%)</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#facc15" }}></div>
              <span>Warning (40-75%)</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: "#f87171" }}></div>
              <span>Danger (75%+)</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            {/* Plano del recinto */}
            <svg viewBox="0 0 500 350" className="w-full h-72 border border-border rounded-lg bg-muted/20">
              {/* Estructura del edificio */}
              <rect x="0" y="0" width="500" height="350" fill="transparent" stroke="#e5e7eb" strokeWidth="2" />

              {/* Zones with heat map */}
              {zones.map((zone) => (
                <g key={zone.id}>
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.width}
                    height={zone.height}
                    fill={getHeatColor(zone.current, zone.capacity)}
                    fillOpacity={getHeatOpacity(zone.current, zone.capacity)}
                    stroke="none"
                    className="cursor-pointer transition-all duration-300 hover:opacity-90"
                    onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                  />
                  <text
                    x={zone.x + zone.width / 2}
                    y={zone.y + zone.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1f2937"
                    className="text-xs font-semibold pointer-events-none"
                    style={{ fontSize: "11px" }}
                  >
                    {zone.name}
                  </text>
                  <text
                    x={zone.x + zone.width / 2}
                    y={zone.y + zone.height / 2 + 12}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#374151"
                    className="text-xs font-bold pointer-events-none"
                    style={{ fontSize: "10px" }}
                  >
                    {zone.current}/{zone.capacity}
                  </text>
                </g>
              ))}
            </svg>

            {/* Selected zone information */}
            {selectedZone && (
              <div className="absolute top-4 right-4 bg-background border border-border rounded-lg p-3 shadow-lg min-w-48">
                {(() => {
                  const zone = zones.find((z) => z.id === selectedZone)
                  if (!zone) return null
                  return (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{zone.name}</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Occupancy:</span>
                          <Badge
                            variant={(zone.current / zone.capacity) * 100 >= 90 ? "destructive" : (zone.current / zone.capacity) * 100 >= 75 ? "secondary" : "default"}
                          >
                            {((zone.current / zone.capacity) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>People:</span>
                          <span className="font-medium">
                            {zone.current}/{zone.capacity}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span
                            className={
                              (zone.current / zone.capacity) * 100 >= 90
                                ? "text-red-400"
                                : (zone.current / zone.capacity) * 100 >= 75
                                  ? "text-orange-400"
                                  : "text-green-400"
                            }
                          >
                            {(zone.current / zone.capacity) * 100 >= 90 ? "Critical" : (zone.current / zone.capacity) * 100 >= 75 ? "High" : "Normal"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Quick statistics */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center flex-shrink-0">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-red-500">{zones.filter((z) => (z.current / z.capacity) * 100 >= 90).length}</div>
            <div className="text-xs text-muted-foreground">Danger Zones</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-yellow-500">
              {zones.filter((z) => (z.current / z.capacity) * 100 >= 75 && (z.current / z.capacity) * 100 < 90).length}
            </div>
            <div className="text-xs text-muted-foreground">Warning Zones</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-500">{zones.filter((z) => (z.current / z.capacity) * 100 < 75).length}</div>
            <div className="text-xs text-muted-foreground">Good Zones</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
