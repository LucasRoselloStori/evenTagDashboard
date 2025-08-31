"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Users } from "lucide-react"

export function MovementFlows() {
  const flows = [
    {
      from: "Main Entrance",
      to: "Web3 Stage",
      count: 89,
      percentage: 22,
      trend: "up",
    },
    {
      from: "Web3 Stage",
      to: "AI Demo Zone",
      count: 76,
      percentage: 19,
      trend: "up",
    },
    {
      from: "AI Demo Zone",
      to: "Main Auditorium",
      count: 64,
      percentage: 16,
      trend: "stable",
    },
    {
      from: "Main Auditorium",
      to: "Expo Hall",
      count: 58,
      percentage: 14,
      trend: "up",
    },
    {
      from: "Networking Hub",
      to: "Food Court",
      count: 45,
      percentage: 11,
      trend: "stable",
    },
    {
      from: "Expo Hall",
      to: "Startup Showcase",
      count: 38,
      percentage: 9,
      trend: "up",
    },
    {
      from: "Food Court",
      to: "Coffee Bar",
      count: 32,
      percentage: 8,
      trend: "stable",
    },
    {
      from: "Dev Experience",
      to: "Workshop Area",
      count: 18,
      percentage: 4,
      trend: "down",
    },
  ]

  return (
    <Card className="h-full border-cyan-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-cyan-50 to-blue-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyan-600" />
          Movement Flows
        </CardTitle>
        <CardDescription>Most common routes between zones in the last 30 minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flows.map((flow, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-xs">{flow.from}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-xs">{flow.to}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="font-semibold text-sm">{flow.count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {flow.percentage}%
                  </Badge>
                  <div
                    className={`w-2 h-2 rounded-full ${flow.trend === "up" ? "bg-chart-1" : flow.trend === "down" ? "bg-chart-3" : "bg-chart-2"
                      }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
