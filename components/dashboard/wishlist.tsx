import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, MapPin } from "lucide-react"
import Image from "next/image"

const wishlistProperties = [
  {
    id: "luxury-lighthouse-estate",
    name: "Luxury Lighthouse Estate",
    location: "Corolla, NC",
    price: 850,
    rating: 5.0,
    image: "/public/surf-or-sound-realty-553-splash-mansion-main-image.jpg",
    type: "Luxury",
  },
  {
    id: "beachfront-bliss",
    name: "Beachfront Bliss",
    location: "Kitty Hawk, NC",
    price: 520,
    rating: 4.9,
    image: "/public/01-surf-or-sound-realty-1082-sea-monkey-main.jpg",
    type: "Beachfront",
  },
  {
    id: "sound-view-retreat",
    name: "Sound View Retreat",
    location: "Manteo, NC",
    price: 280,
    rating: 4.6,
    image: "/public/00-surf-or-sound-realty-1127-island-time-paradise-main-01.jpg",
    type: "Soundside",
  },
]

export function Wishlist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-coastal-aqua" />
          <span>Wishlist</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wishlistProperties.map((property) => (
            <div key={property.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  width={80}
                  height={60}
                  className="rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm text-coastal-navy truncate">{property.name}</h4>
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Heart className="h-4 w-4 fill-coastal-aqua text-coastal-aqua" />
                    </Button>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {property.type}
                      </Badge>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {property.rating}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-coastal-navy">${property.price}/night</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 border-coastal-aqua text-coastal-aqua hover:bg-coastal-aqua hover:text-white"
        >
          View All Saved Properties
        </Button>
      </CardContent>
    </Card>
  )
}
