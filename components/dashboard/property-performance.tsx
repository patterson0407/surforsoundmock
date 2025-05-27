import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye } from "lucide-react"

const propertyPerformance = [
  {
    id: "ocean-breeze-cottage",
    name: "Ocean Breeze Cottage",
    occupancy: 87,
    revenue: 12450,
    views: 2340,
    bookings: 18,
    trend: "up",
    change: 15,
  },
  {
    id: "soundside-sanctuary",
    name: "Soundside Sanctuary",
    occupancy: 92,
    revenue: 8960,
    views: 1890,
    bookings: 22,
    trend: "up",
    change: 8,
  },
  {
    id: "luxury-lighthouse-estate",
    name: "Luxury Lighthouse Estate",
    occupancy: 78,
    revenue: 18750,
    views: 3120,
    bookings: 12,
    trend: "down",
    change: -5,
  },
]

export function PropertyPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {propertyPerformance.map((property) => (
            <div key={property.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-coastal-navy">{property.name}</h4>
                <Badge variant={property.trend === "up" ? "default" : "destructive"} className="text-xs">
                  {property.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {property.change > 0 ? "+" : ""}
                  {property.change}%
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Occupancy</div>
                  <div className="font-semibold">{property.occupancy}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Revenue</div>
                  <div className="font-semibold">${property.revenue.toLocaleString()}</div>
                </div>
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{property.views}</span>
                </div>
                <div>
                  <div className="text-muted-foreground">Bookings</div>
                  <div className="font-semibold">{property.bookings}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
