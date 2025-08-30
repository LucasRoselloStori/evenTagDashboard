"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MapPin, Clock, Users, ChevronDown, ChevronRight } from "lucide-react"

export function ZoneDistribution() {
  const [isLegendOpen, setIsLegendOpen] = useState(false)

  // Function to get color based on capacity percentage
  const getCapacityColor = (percentage: number) => {
    if (percentage >= 18) return "bg-red-400" // Critical capacity (danger)
    if (percentage >= 15) return "bg-red-300" // High capacity (danger)
    if (percentage >= 12) return "bg-yellow-400" // Medium-high capacity (warning)
    if (percentage >= 8) return "bg-yellow-300" // Medium capacity (warning)
    return "bg-green-400" // Low capacity (good)
  }

  // Function to get indicator dot color
  const getIndicatorColor = (percentage: number) => {
    if (percentage >= 18) return "bg-red-500"
    if (percentage >= 15) return "bg-red-400"
    if (percentage >= 12) return "bg-yellow-500"
    if (percentage >= 8) return "bg-yellow-400"
    return "bg-green-500"
  }

  const zones = [
    {
      name: "Web3 & Blockchain Pavilion",
      current: 342,
      percentage: 18,
      capacity: 380,
      avgTime: "22m",
      trend: "up",
    },
    {
      name: "Main Auditorium",
      current: 289,
      percentage: 15,
      capacity: 320,
      avgTime: "45m",
      trend: "stable",
    },
    {
      name: "Networking Zone",
      current: 267,
      percentage: 14,
      capacity: 300,
      avgTime: "15m",
      trend: "up",
    },
    {
      name: "Developer Experience Hub",
      current: 234,
      percentage: 12,
      capacity: 280,
      avgTime: "18m",
      trend: "down",
    },
    {
      name: "Startup Showcase",
      current: 198,
      percentage: 10,
      capacity: 250,
      avgTime: "25m",
      trend: "up",
    },
    {
      name: "Sponsors Area",
      current: 156,
      percentage: 6,
      capacity: 200,
      avgTime: "12m",
      trend: "stable",
    },
    {
      name: "Food Court & Rest Area",
      current: 187,
      percentage: 9,
      capacity: 220,
      avgTime: "8m",
      trend: "stable",
    },
    {
      name: "Workshops & Training",
      current: 250,
      percentage: 13,
      capacity: 260,
      avgTime: "35m",
      trend: "up",
    },
  ]

  return (
    <Card className="h-full border-indigo-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-indigo-600" />
          Zone Distribution
        </CardTitle>
        <CardDescription>People per area and average dwell time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Collapsible Color Legend */}
          <Collapsible open={isLegendOpen} onOpenChange={setIsLegendOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors">
              {isLegendOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              Capacity levels
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 text-xs border rounded-lg p-3 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-slate-600">Good (&lt;8%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-300" />
                  <span className="text-slate-600">Warning (8-12%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-slate-600">High Warning (12-15%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-300" />
                  <span className="text-slate-600">Danger (15-18%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-slate-600">Critical (18%+)</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {zones.map((zone, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getIndicatorColor(zone.percentage)}`} />
                  <span className="font-medium text-sm">{zone.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{zone.avgTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="font-semibold">{zone.current}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {zone.current}/{zone.capacity}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${getCapacityColor(zone.percentage)} transition-all duration-500 ease-out`}
                    style={{ width: `${Math.min(zone.percentage * 5, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{zone.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
