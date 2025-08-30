"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Users, AlertTriangle } from "lucide-react"

export function HeatmapZones() {
  const hotZones = [
    {
      name: "AI Pavilion",
      density: 95,
      level: "Very High",
      color: "bg-chart-3",
      textColor: "text-chart-3",
      people: 342,
      alert: true,
    },
    {
      name: "Main Auditorium",
      density: 87,
      level: "High",
      color: "bg-chart-2",
      textColor: "text-chart-2",
      people: 289,
      alert: false,
    },
    {
      name: "Networking Zone",
      density: 76,
      level: "High",
      color: "bg-chart-2",
      textColor: "text-chart-2",
      people: 267,
      alert: false,
    },
    {
      name: "Blockchain Stand",
      density: 64,
      level: "Medium",
      color: "bg-chart-1",
      textColor: "text-chart-1",
      people: 234,
      alert: false,
    },
    {
      name: "Startup Area",
      density: 52,
      level: "Medium",
      color: "bg-chart-1",
      textColor: "text-chart-1",
      people: 198,
      alert: false,
    },
  ]

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
                    Capacidad máxima
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
