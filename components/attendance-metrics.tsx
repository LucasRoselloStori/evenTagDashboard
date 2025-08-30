"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Clock } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"

export function AttendanceMetrics() {
  const mounted = useMounted()
  const totalRegistered = 2847
  const currentActive = 1923
  const peakAttendance = 2156
  const averageSessionTime = "2h 34m"

  return (
    <Card className="h-full border-purple-200 shadow-lg">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Total Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Registration and Peak Data */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Registered</span>
            <span className="font-bold text-lg text-slate-800 bg-slate-100 px-2 py-1 rounded">
              {mounted ? totalRegistered.toLocaleString() : "2,847"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Peak maximum</span>
            <span className="font-bold text-lg text-orange-700 bg-orange-100 px-2 py-1 rounded">
              {mounted ? peakAttendance.toLocaleString() : "2,156"}
            </span>
          </div>
        </div>

        {/* Active Now Section */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Active Now</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg inline-block">
              {mounted ? currentActive.toLocaleString() : "1,923"}
            </div>
            <div className="text-sm text-slate-600 font-medium mt-2">people in venue</div>
          </div>
          <Badge className="w-full justify-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
            {mounted ? Math.round((currentActive / totalRegistered) * 100) : 68}% of total
          </Badge>
        </div>

        {/* Average Time Section */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Average Time</span>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 rounded-lg shadow-lg inline-block">
              {averageSessionTime}
            </div>
            <div className="text-sm text-slate-600 font-medium mt-2">stay at event</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
