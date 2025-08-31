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
    if (percentage >= 90) return "bg-red-500" // Critical capacity (danger)
    if (percentage >= 75) return "bg-orange-500" // High capacity (danger)
    if (percentage >= 60) return "bg-yellow-500" // Medium-high capacity (warning)
    if (percentage >= 40) return "bg-blue-500" // Medium capacity (normal)
    return "bg-green-500" // Low capacity (good)
  }

  // Function to get indicator dot color
  const getIndicatorColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-600"
    if (percentage >= 75) return "bg-orange-600"
    if (percentage >= 60) return "bg-yellow-600"
    if (percentage >= 40) return "bg-blue-600"
    return "bg-green-600"
  }

  const zonesData = [
    {
      name: "Main Entrance",
      current: 180,
      capacity: 200,
      avgTime: "3m",
      trend: "up",
    },
    {
      name: "Web3 Stage",
      current: 145,
      capacity: 150,
      avgTime: "22m",
      trend: "stable",
    },
    {
      name: "AI Demo Zone",
      current: 98,
      capacity: 120,
      avgTime: "15m",
      trend: "up",
    },
    {
      name: "Dev Experience",
      current: 32,
      capacity: 100,
      avgTime: "18m",
      trend: "down",
    },
    {
      name: "Startup Showcase",
      current: 85,
      capacity: 100,
      avgTime: "25m",
      trend: "up",
    },
    {
      name: "Networking Hub",
      current: 92,
      capacity: 95,
      avgTime: "15m",
      trend: "stable",
    },
    {
      name: "Food Court",
      current: 28,
      capacity: 70,
      avgTime: "8m",
      trend: "down",
    },
    {
      name: "Workshop Area",
      current: 18,
      capacity: 60,
      avgTime: "35m",
      trend: "up",
    },
    {
      name: "Main Auditorium",
      current: 120,
      capacity: 350,
      avgTime: "45m",
      trend: "stable",
    },
    {
      name: "Expo Hall",
      current: 165,
      capacity: 200,
      avgTime: "20m",
      trend: "up",
    },
    {
      name: "Sponsor Booths",
      current: 12,
      capacity: 40,
      avgTime: "12m",
      trend: "stable",
    },
    {
      name: "Coffee Bar",
      current: 15,
      capacity: 50,
      avgTime: "5m",
      trend: "stable",
    },
    {
      name: "Registration",
      current: 5,
      capacity: 30,
      avgTime: "2m",
      trend: "down",
    },
  ]

  // Calculate percentages and sort by percentage (highest to lowest)
  const zones = zonesData
    .map(zone => ({
      ...zone,
      percentage: Math.round((zone.current / zone.capacity) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage)

  return (
    <Card className="h-[500px] flex flex-col border-indigo-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-indigo-50 to-purple-50 flex-shrink-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-indigo-600" />
          Zone Distribution
        </CardTitle>
        <CardDescription>People per area and average dwell time</CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1">
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
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-600">Low (&lt;40%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-600">Normal (40-59%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-slate-600">Medium (60-74%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-slate-600">High (75-89%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-slate-600">Critical (90%+)</span>
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
                    style={{ width: `${Math.min(zone.percentage, 100)}%` }}
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
