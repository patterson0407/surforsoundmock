"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const monthlyData = [
  { month: "Jan", revenue: 8500, bookings: 12 },
  { month: "Feb", revenue: 9200, bookings: 14 },
  { month: "Mar", revenue: 11800, bookings: 18 },
  { month: "Apr", revenue: 13200, bookings: 22 },
  { month: "May", revenue: 15600, bookings: 28 },
  { month: "Jun", revenue: 18900, bookings: 32 },
  { month: "Jul", revenue: 22400, bookings: 38 },
  { month: "Aug", revenue: 21200, bookings: 35 },
  { month: "Sep", revenue: 16800, bookings: 26 },
  { month: "Oct", revenue: 14200, bookings: 21 },
  { month: "Nov", revenue: 11600, bookings: 17 },
  { month: "Dec", revenue: 12450, bookings: 18 },
]

export function EarningsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Revenue Chart */}
          <div>
            <h4 className="text-sm font-medium mb-4">Monthly Revenue</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Revenue"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line type="monotone" dataKey="revenue" stroke="#00cccc" strokeWidth={2} dot={{ fill: "#00cccc" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bookings Chart */}
          <div>
            <h4 className="text-sm font-medium mb-4">Monthly Bookings</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [value, "Bookings"]} labelFormatter={(label) => `Month: ${label}`} />
                <Bar dataKey="bookings" fill="#003366" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
