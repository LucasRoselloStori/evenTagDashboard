"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Users } from "lucide-react"

export function MovementFlows() {
  const flows = [
    {
      from: "Main Entrance",
      to: "AI Pavilion",
      count: 156,
      percentage: 23,
      trend: "up",
    },
    {
      from: "AI Pavilion",
      to: "Main Auditorium",
      count: 134,
      percentage: 20,
      trend: "up",
    },
    {
      from: "Main Auditorium",
      to: "Networking Zone",
      count: 98,
      percentage: 15,
      trend: "stable",
    },
    {
      from: "Networking Zone",
      to: "Food Court",
      count: 87,
      percentage: 13,
      trend: "up",
    },
    {
      from: "Blockchain Stand",
      to: "Startup Area",
      count: 76,
      percentage: 11,
      trend: "down",
    },
    {
      from: "Food Court",
      to: "AI Pavilion",
      count: 65,
      percentage: 10,
      trend: "stable",
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
