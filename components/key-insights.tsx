"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bot, TrendingUp, Clock, Users, AlertTriangle, CheckCircle, MessageSquare, CheckCheck, UserPlus, Headphones } from "lucide-react"
import { useState } from "react"

interface KeyInsightsProps {
  onAnalyzeInsight?: (insight: string) => void
  onExpandAndAnalyze?: (insight: string) => void
}

export function KeyInsights({ onAnalyzeInsight, onExpandAndAnalyze }: KeyInsightsProps) {
  const [assignments, setAssignments] = useState<{[key: number]: string}>({})
  const [isContactOpen, setIsContactOpen] = useState(false)
  
  const teamMembers = [
    "Ana García (Security)",
    "Carlos López (Operations)", 
    "María Fernández (Guest Services)",
    "Diego Rodríguez (Technical)",
    "Sofia Martínez (Logistics)",
    "Unassigned"
  ]

  const insights = [
    {
      id: 0,
      type: "highlight",
      icon: TrendingUp,
      title: "Featured Trend",
      description: "AI pavilion retains visitors 3x longer than average (18m vs 6m)",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      canAssign: false,
    },
    {
      id: 1,
      type: "alert",
      icon: AlertTriangle,
      title: "Capacity Alert",
      description: "AI pavilion at 95% capacity. Consider flow management",
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
      canAssign: true,
    },
    {
      id: 2,
      type: "insight",
      icon: Users,
      title: "Movement Pattern",
      description: "67% of visitors go from AI pavilion to main auditorium",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      canAssign: false,
    },
    {
      id: 3,
      type: "success",
      icon: CheckCircle,
      title: "Goal Achieved",
      description: "Networking zone exceeded interaction target (+23%)",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
      canAssign: false,
    },
    {
      id: 4,
      type: "alert",
      icon: AlertTriangle,
      title: "Queue Alert",
      description: "Registration queue exceeding 10 minutes - immediate attention required",
      color: "text-red-600",
      bgColor: "bg-red-50",
      canAssign: true,
    },
  ]

  const handleAssignment = (insightId: number, assignee: string) => {
    setAssignments(prev => ({
      ...prev,
      [insightId]: assignee
    }))
  }

  return (
    <Card className="h-full border-purple-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-600" />
              AI Key Insights
            </CardTitle>
            <CardDescription>AI-powered analysis of attendee behavior patterns</CardDescription>
          </div>
          
          {/* Contact Support Button */}
          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                <Headphones className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-blue-600" />
                  Contact Support
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Emergency Contacts</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Security:</span>
                      <span className="font-mono">+54 11 1234-5678</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operations:</span>
                      <span className="font-mono">+54 11 1234-5679</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Technical:</span>
                      <span className="font-mono">+54 11 1234-5680</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Radio Channels</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Main Control:</span>
                      <span className="font-mono">Channel 1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security:</span>
                      <span className="font-mono">Channel 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operations:</span>
                      <span className="font-mono">Channel 3</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    For immediate assistance, use radio Channel 1 or call the emergency number.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className={`p-4 rounded-lg ${insight.bgColor} border border-border/50`}>
              <div className="flex items-start gap-3">
                <insight.icon className={`h-5 w-5 ${insight.color} mt-0.5 flex-shrink-0`} />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {insight.type === "alert" ? "Urgent" : insight.type === "success" ? "Positive" : "Analysis"}
                    </Badge>
                    {assignments[insight.id] && assignments[insight.id] !== "Unassigned" && (
                      <Badge variant="secondary" className="text-xs">
                        Assigned: {assignments[insight.id].split(" ")[0]}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                  
                  {/* Assignment Section */}
                  {insight.canAssign && (
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-3 w-3 text-muted-foreground" />
                        <Select
                          value={assignments[insight.id] || "Unassigned"}
                          onValueChange={(value) => handleAssignment(insight.id, value)}
                        >
                          <SelectTrigger className="h-7 text-xs w-auto min-w-32">
                            <SelectValue placeholder="Assign to..." />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.map((member) => (
                              <SelectItem key={member} value={member} className="text-xs">
                                {member}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
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
