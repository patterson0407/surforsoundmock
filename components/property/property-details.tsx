import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Bed, Bath } from "lucide-react"

interface PropertyDetailsProps {
  property: {
    title: string
    location: string
    rating: number
    reviews: number
    beds: number
    baths: number
    guests: number
    description: string
    type: string
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Property Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl text-coastal-navy mb-2">
                {property.type} in {property.location}
              </CardTitle>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {property.guests} guests
                </div>
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {property.beds} bedrooms
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {property.baths} bathrooms
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-muted-foreground">({property.reviews} reviews)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{property.description}</p>
        </CardContent>
      </Card>

      {/* Host Information */}
      <Card>
        <CardHeader>
          <CardTitle>Hosted by Sarah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-coastal-aqua rounded-full flex items-center justify-center text-coastal-navy font-semibold">
              S
            </div>
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Superhost · 5 years hosting</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Response rate: 100%</Badge>
              <Badge variant="secondary">Response time: within an hour</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
