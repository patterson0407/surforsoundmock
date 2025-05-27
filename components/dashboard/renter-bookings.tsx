import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, MessageSquare } from "lucide-react"
import Image from "next/image"

const upcomingBookings = [
  {
    id: "booking-1",
    property: "Ocean Breeze Cottage",
    location: "Nags Head, NC",
    checkIn: "2024-07-15",
    checkOut: "2024-07-22",
    guests: 6,
    total: 3150,
    status: "confirmed",
    image: "/public/01-surf-or-sound-realty-1082-sea-monkey-main.jpg",
  },
  {
    id: "booking-2",
    property: "Soundside Sanctuary",
    location: "Duck, NC",
    checkIn: "2024-08-10",
    checkOut: "2024-08-17",
    guests: 4,
    total: 2660,
    status: "confirmed",
    image: "/public/surf-or-sound-realty-812-lucilles-board-shack-exterior-3.jpg",
  },
]

export function RenterBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-4">
                <Image
                  src={booking.image || "/placeholder.svg"}
                  alt={booking.property}
                  width={120}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-coastal-navy">{booking.property}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.location}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{booking.guests} guests</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-coastal-navy">Total: ${booking.total.toLocaleString()}</div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message Host
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
