"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Activity, Calendar, MapPin, Zap } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"

interface MetricsHeaderProps {
  lastUpdate: Date | null
  isLive: boolean
}

export function MetricsHeader({ lastUpdate, isLive }: MetricsHeaderProps) {
  const mounted = useMounted()

  return (
    <div className="glass-effect rounded-xl p-6 border shadow-lg bg-white/80 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent text-balance">
                EvenTag - DevConnect Argentina 2025
              </h1>
            </div>
            <Badge
              variant={isLive ? "default" : "secondary"}
              className={`flex items-center gap-1 ${isLive ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse-slow shadow-lg" : ""}`}
            >
              <Activity className="h-3 w-3" />
              {isLive ? "LIVE" : "PAUSED"}
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full border border-blue-200">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">March 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-pink-100 to-orange-100 px-3 py-1 rounded-full border border-pink-200">
              <MapPin className="h-4 w-4 text-pink-600" />
              <span className="font-medium text-pink-800">La Rural - Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-2 rounded-lg border shadow-sm">
            <p className="text-slate-600 text-xs font-medium">Last update</p>
            <p className="font-bold text-slate-800">
              {mounted && lastUpdate ? lastUpdate.toLocaleTimeString("en-US") : "Loading..."}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300 shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
