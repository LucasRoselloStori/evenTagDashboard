"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Users, AlertTriangle } from "lucide-react"

export function HeatmapZones() {
  // Data from heatmap zones - calculate density as percentage of capacity
  const zoneData = [
    { name: "Web3 Stage", current: 145, capacity: 150 },
    { name: "Networking Hub", current: 92, capacity: 95 },
    { name: "Main Entrance", current: 180, capacity: 200 },
    { name: "Startup Showcase", current: 85, capacity: 100 },
    { name: "Expo Hall", current: 165, capacity: 200 },
    { name: "AI Demo Zone", current: 98, capacity: 120 },
    { name: "Food Court", current: 28, capacity: 70 },
    { name: "Main Auditorium", current: 120, capacity: 350 },
  ]

  const hotZones = zoneData
    .map(zone => {
      const density = Math.round((zone.current / zone.capacity) * 100)
      let level, color, textColor, alert = false

      if (density >= 90) {
        level = "Critical"
        color = "bg-red-500"
        textColor = "text-red-600"
        alert = true
      } else if (density >= 75) {
        level = "Very High"
        color = "bg-orange-500"
        textColor = "text-orange-600"
        alert = false
      } else if (density >= 60) {
        level = "High"
        color = "bg-yellow-500"
        textColor = "text-yellow-600"
        alert = false
      } else if (density >= 40) {
        level = "Medium"
        color = "bg-blue-500"
        textColor = "text-blue-600"
        alert = false
      } else {
        level = "Low"
        color = "bg-green-500"
        textColor = "text-green-600"
        alert = false
      }

      return {
        name: zone.name,
        density,
        level,
        color,
        textColor,
        people: zone.current,
        capacity: zone.capacity,
        alert
      }
    })
    .sort((a, b) => b.density - a.density) // Sort by density, highest first

  return (
    <Card className="h-full border-amber-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="h-5 w-5 text-amber-600" />
          Hot Zones
        </CardTitle>
        <CardDescription>People density per area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hotZones.map((zone, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{zone.name}</span>
                  {zone.alert && <AlertTriangle className="h-4 w-4 text-chart-3" />}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-semibold">{zone.people}</span>
                  <span className="text-xs text-muted-foreground">/{zone.capacity}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${zone.color} transition-all duration-500`}
                    style={{ width: `${zone.density}%` }}
                  />
                </div>
                <span className="text-xs font-medium w-8 text-right">{zone.density}%</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="outline" className={`text-xs ${zone.textColor}`}>
                  {zone.level}
                </Badge>
                {zone.alert && (
                  <Badge variant="destructive" className="text-xs">
                    Near Capacity
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
