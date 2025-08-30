"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, TrendingUp, Clock, Users, AlertTriangle, CheckCircle, MessageSquare, CheckCheck } from "lucide-react"

interface KeyInsightsProps {
  onAnalyzeInsight?: (insight: string) => void
  onExpandAndAnalyze?: (insight: string) => void
}

export function KeyInsights({ onAnalyzeInsight, onExpandAndAnalyze }: KeyInsightsProps) {
  const insights = [
    {
      type: "highlight",
      icon: TrendingUp,
      title: "Featured Trend",
      description: "AI pavilion retains visitors 3x longer than average (18m vs 6m)",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Capacity Alert",
      description: "AI pavilion at 95% capacity. Consider flow management",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      type: "insight",
      icon: Users,
      title: "Movement Pattern",
      description: "67% of visitors go from AI pavilion to main auditorium",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Goal Achieved",
      description: "Networking zone exceeded interaction target (+23%)",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Queue Alert",
      description: "Registration queue exceeding 10 minutes - immediate attention required",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <Card className="h-full border-purple-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-600" />
          AI Key Insights
        </CardTitle>
        <CardDescription>AI-powered analysis of attendee behavior patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg ${insight.bgColor} border border-border/50`}>
              <div className="flex items-start gap-3">
                <insight.icon className={`h-5 w-5 ${insight.color} mt-0.5 flex-shrink-0`} />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {insight.type === "alert" ? "Urgent" : insight.type === "success" ? "Positive" : "Analysis"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
                <div className="flex flex-col gap-2 ml-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 px-2"
                    onClick={() => onExpandAndAnalyze?.(
                      `Analyze this insight: ${insight.title} - ${insight.description}`
                    )}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Analyze
                  </Button>
                  {insight.type === "alert" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2"
                      onClick={() => onExpandAndAnalyze?.(
                        `How can we resolve this alert: ${insight.description}?`
                      )}
                    >
                      <CheckCheck className="h-3 w-3 mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
