"use client"

import { useState, useEffect, useRef } from "react"
import { MetricsHeader } from "./metrics-header"
import { AttendanceMetrics } from "./attendance-metrics"
import { ZoneDistribution } from "./zone-distribution"
import { MovementFlows } from "./movement-flows"
import { HeatmapZones } from "./heatmap-zones"
import { KeyInsights } from "./key-insights"
import { VisualHeatmap } from "./visual-heatmap"
import { MetricsChat, MetricsChatRef } from "./metrics-chat"
import { PerformanceAnalytics } from "./performance-analytics"


export function EventMetricsDashboard() {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isLive, setIsLive] = useState(true)
  const chatRef = useRef<MetricsChatRef>(null)

  const handleAnalyzeInsight = (insight: string) => {
    chatRef.current?.sendMessage(insight)
  }

  const handleExpandAndAnalyze = (insight: string) => {
    chatRef.current?.expandAndSendMessage(insight)
  }

  useEffect(() => {
    // Initialize with current date only on client side
    setLastUpdate(new Date())

    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <MetricsHeader lastUpdate={lastUpdate} isLive={isLive} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 animate-fade-in">
          {/* Total Attendance - more width, dynamic height */}
          <div className="lg:col-span-2 min-h-[450px] flex">
            <AttendanceMetrics />
          </div>

          {/* Metrics Chat - expanded width */}
          <div className="lg:col-span-3 min-h-[450px] flex">
            <MetricsChat ref={chatRef} />
          </div>
        </div>

        {/* Visual Heat Map - Full width row */}
        <div className="w-full animate-fade-in">
          <VisualHeatmap />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 animate-fade-in mb-6">
          {/* Zone Distribution - reduced width */}
          <div className="lg:col-span-2">
            <ZoneDistribution />
          </div>

          {/* AI Key Insights - moved up */}
          <div className="lg:col-span-3">
            <KeyInsights onAnalyzeInsight={handleAnalyzeInsight} onExpandAndAnalyze={handleExpandAndAnalyze} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 animate-fade-in">
          {/* Movement Flows */}
          <div className="lg:col-span-1">
            <MovementFlows />
          </div>

          {/* Hot Zones */}
          <div className="lg:col-span-1">
            <HeatmapZones />
          </div>
        </div>

        {/* Post-Event Analytics Section */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 Post-Event Analytics</h2>
            <p className="text-gray-600 text-sm">Métricas de análisis y rendimiento del evento</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 animate-fade-in">
            {/* Performance Analytics */}
            <div className="lg:col-span-1">
              <PerformanceAnalytics />
            </div>

            {/* Future post-event metrics can be added here */}
            <div className="lg:col-span-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📈</div>
                <h3 className="font-semibold mb-1">Upcoming Metrics</h3>
                <p className="text-sm">More post-event analytics coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


