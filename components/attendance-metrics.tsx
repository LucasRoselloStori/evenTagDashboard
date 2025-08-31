"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, Clock, TrendingUp, Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

export function AttendanceMetrics() {
  const totalRegistered = 2847
  const currentActive = 1923
  const peakAttendance = 2156
  const averageSessionTime = "2h 34m"

  // Social sharing state
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Social sharing functions
  const generateShareText = () => {
    const percentage = Math.round((currentActive / totalRegistered) * 100)
    return `🔥 ¡${currentActive.toLocaleString()} personas activas ahora en nuestro evento! Eso es el ${percentage}% de todos los registrados. ¡Únete a la experiencia! #EventDashboard #TechEvent`
  }

  const generateShareUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  const shareToTwitter = () => {
    const text = generateShareText()
    const url = generateShareUrl()
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  const shareToFacebook = () => {
    const url = generateShareUrl()
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'noopener,noreferrer')
  }

  const shareToLinkedIn = () => {
    const text = generateShareText()
    const url = generateShareUrl()
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const copyToClipboard = async () => {
    const text = `${generateShareText()}\n\n${generateShareUrl()}`
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="h-6 w-6 p-0 hover:bg-green-100"
            >
              <Share2 className="h-3 w-3 text-green-600" />
            </Button>
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

          {/* Social Sharing Options */}
          {showShareOptions && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-3">
              <div className="text-xs font-semibold text-green-700 mb-2">Compartir en redes sociales:</div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareToTwitter}
                  className="flex items-center gap-2 text-xs hover:bg-blue-50 border-blue-200"
                >
                  <Twitter className="h-3 w-3 text-blue-500" />
                  Twitter
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareToFacebook}
                  className="flex items-center gap-2 text-xs hover:bg-blue-50 border-blue-200"
                >
                  <Facebook className="h-3 w-3 text-blue-600" />
                  Facebook
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareToLinkedIn}
                  className="flex items-center gap-2 text-xs hover:bg-blue-50 border-blue-200"
                >
                  <Linkedin className="h-3 w-3 text-blue-700" />
                  LinkedIn
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-xs hover:bg-gray-50 border-gray-200"
                >
                  {copySuccess ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-gray-500" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>

              <div className="text-xs text-green-600 bg-white p-2 rounded border border-green-100">
                📱 {generateShareText().substring(0, 100)}...
              </div>
            </div>
          )}

          {/* Timeline Chart */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-600 font-medium">Today's Timeline</span>
            </div>
            <div className="h-20 w-full bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2 border border-green-200" suppressHydrationWarning>
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
                <span suppressHydrationWarning>Average Time: {averageSessionTime} stay at event</span>
              </div>
            </div>
            <div className="flex justify-end mt-1 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span suppressHydrationWarning>Trend: +5.2%</span>
              </div>
            </div>
          </div>
        </div>


      </CardContent>
    </Card>
  )
}
