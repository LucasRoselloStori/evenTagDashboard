"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

export function AttendanceMetrics() {
  const totalRegistered = 2847
  const currentActive = 1923
  const peakAttendance = 2156
  const averageSessionTime = "2h 34m"

  // Timeline data for attendance evolution
  const [timelineData, setTimelineData] = useState([
    { time: "08:00", attendees: 125, label: "8 AM" },
    { time: "09:00", attendees: 452, label: "9 AM" },
    { time: "10:00", attendees: 789, label: "10 AM" },
    { time: "11:00", attendees: 1234, label: "11 AM" },
    { time: "12:00", attendees: 1456, label: "12 PM" },
    { time: "13:00", attendees: 1789, label: "1 PM" },
    { time: "14:00", attendees: 2156, label: "2 PM" },
    { time: "15:00", attendees: 2089, label: "3 PM" },
    { time: "16:00", attendees: 1923, label: "4 PM" },
    { time: "17:00", attendees: 1845, label: "5 PM" },
    { time: "18:00", attendees: 1678, label: "6 PM" },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTimelineData(prev => {
        const newData = [...prev]
        const lastEntry = newData[newData.length - 1]
        const currentHour = new Date().getHours()
        const currentMinutes = new Date().getMinutes()

        // Update current hour data with slight variations
        if (newData.length > 0) {
          const variation = Math.floor(Math.random() * 50) - 25 // ±25 people
          newData[newData.length - 1] = {
            ...lastEntry,
            attendees: Math.max(100, lastEntry.attendees + variation)
          }
        }

        return newData
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full border-purple-200 shadow-lg flex flex-col">
      <CardHeader className="pb-4 pt-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          Total Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6 flex-grow">
        {/* Registration and Peak Data */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Registered</span>
            <span className="font-bold text-lg text-slate-800 bg-slate-100 px-2 py-1 rounded" suppressHydrationWarning>
              {totalRegistered.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 font-medium">Peak maximum</span>
            <span className="font-bold text-lg text-orange-700 bg-orange-100 px-2 py-1 rounded" suppressHydrationWarning>
              {peakAttendance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Active Now Section */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Active Now</span>
            <TrendingUp className="h-3 w-3 text-green-500 ml-auto" />
          </div>

          <div className="text-center">
            <div className="text-3xl font-black text-white bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg inline-block" suppressHydrationWarning>
              {currentActive.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 font-medium mt-2">people in venue</div>
          </div>

          <Badge className="w-full justify-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300" suppressHydrationWarning>
            {Math.round((currentActive / totalRegistered) * 100)}% of total
          </Badge>

          {/* Timeline Chart */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-600 font-medium">Today's Timeline</span>
            </div>
            <div className="h-32 w-full bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200" suppressHydrationWarning>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    hide={true}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-green-200 rounded shadow-lg">
                            <p className="text-xs font-semibold text-gray-700">{label}</p>
                            <p className="text-xs text-green-600">
                              {payload[0].value?.toLocaleString()} attendees
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendees"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Timeline Stats */}
            <div className="flex justify-between mt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span suppressHydrationWarning>Peak: {peakAttendance.toLocaleString()} (2 PM)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span suppressHydrationWarning>Trend: +5.2%</span>
              </div>
            </div>
          </div>
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
