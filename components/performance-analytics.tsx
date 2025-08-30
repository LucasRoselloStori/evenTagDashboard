"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react"

interface PerformanceMetric {
    id: string
    name: string
    value: number
    target: number
    unit: string
    trend: "up" | "down" | "stable"
    change: number
}

export function PerformanceAnalytics() {
    const [metrics, setMetrics] = useState<PerformanceMetric[]>([
        {
            id: "1",
            name: "Registration Rate",
            value: 87,
            target: 90,
            unit: "%",
            trend: "up",
            change: 5.2
        },
        {
            id: "2",
            name: "Engagement Score",
            value: 92,
            target: 85,
            unit: "/100",
            trend: "up",
            change: 8.1
        },
        {
            id: "3",
            name: "Dwell Time",
            value: 134,
            target: 120,
            unit: "min",
            trend: "up",
            change: 12.3
        },
        {
            id: "4",
            name: "Flow Efficiency",
            value: 78,
            target: 80,
            unit: "%",
            trend: "down",
            change: -2.1
        },
        {
            id: "5",
            name: "Satisfaction",
            value: 4.7,
            target: 4.5,
            unit: "/5.0",
            trend: "up",
            change: 4.4
        }
    ])

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up":
                return <TrendingUp className="h-3 w-3 text-green-600" />
            case "down":
                return <TrendingDown className="h-3 w-3 text-red-600" />
            default:
                return <Activity className="h-3 w-3 text-gray-600" />
        }
    }

    const getProgressColor = (value: number, target: number) => {
        const percentage = (value / target) * 100
        if (percentage >= 100) return "bg-green-500"
        if (percentage >= 80) return "bg-yellow-500"
        return "bg-red-500"
    }

    const getBadgeVariant = (value: number, target: number) => {
        return value >= target ? "default" : "destructive"
    }

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => prev.map(metric => ({
                ...metric,
                value: Math.max(0, metric.value + (Math.random() - 0.5) * 2),
                change: metric.change + (Math.random() - 0.5) * 0.5
            })))
        }, 15000) // Update every 15 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <Card className="h-full border-green-200 shadow-lg">
            <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    Performance Analytics
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 h-full overflow-y-auto">
                {metrics.map((metric) => (
                    <div key={metric.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-gray-900">{metric.name}</span>
                                {getTrendIcon(metric.trend)}
                            </div>
                            <Badge variant={getBadgeVariant(metric.value, metric.target)} className="text-xs">
                                {metric.value.toFixed(metric.unit === "/5.0" ? 1 : 0)}{metric.unit}
                            </Badge>
                        </div>

                        <div className="space-y-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(metric.value, metric.target)}`}
                                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                                ></div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                                <span>Target: {metric.target}{metric.unit}</span>
                                <div className="flex items-center gap-1">
                                    <span className={`${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                                    </span>
                                    <span className="text-gray-400">vs last hour</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {Math.round(metrics.reduce((acc, m) => acc + (m.value / m.target), 0) / metrics.length * 100)}%
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Overall Performance</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
