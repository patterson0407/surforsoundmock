import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Users, Bed, Bath, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data - in real app, this would come from API/Umbraco
const properties = [
  {
    id: "ocean-breeze-cottage",
    title: "Ocean Breeze Cottage",
    location: "Nags Head, NC",
    price: 450,
    rating: 4.9,
    reviews: 127,
    beds: 4,
    baths: 3,
    guests: 8,
    image: "/placeholder.svg?height=300&width=400",
    type: "Oceanfront",
  },
  {
    id: "soundside-sanctuary",
    title: "Soundside Sanctuary",
    location: "Duck, NC",
    price: 380,
    rating: 4.8,
    reviews: 89,
    beds: 3,
    baths: 2,
    guests: 6,
    image: "/placeholder.svg?height=300&width=400",
    type: "Soundside",
  },
  {
    id: "luxury-lighthouse-estate",
    title: "Luxury Lighthouse Estate",
    location: "Corolla, NC",
    price: 850,
    rating: 5.0,
    reviews: 45,
    beds: 6,
    baths: 5,
    guests: 12,
    image: "/placeholder.svg?height=300&width=400",
    type: "Luxury",
  },
  {
    id: "coastal-charm-villa",
    title: "Coastal Charm Villa",
    location: "Kill Devil Hills, NC",
    price: 320,
    rating: 4.7,
    reviews: 203,
    beds: 3,
    baths: 2,
    guests: 6,
    image: "/placeholder.svg?height=300&width=400",
    type: "Family Friendly",
  },
  {
    id: "beachfront-bliss",
    title: "Beachfront Bliss",
    location: "Kitty Hawk, NC",
    price: 520,
    rating: 4.9,
    reviews: 156,
    beds: 5,
    baths: 4,
    guests: 10,
    image: "/placeholder.svg?height=300&width=400",
    type: "Beachfront",
  },
  {
    id: "sound-view-retreat",
    title: "Sound View Retreat",
    location: "Manteo, NC",
    price: 280,
    rating: 4.6,
    reviews: 78,
    beds: 2,
    baths: 2,
    guests: 4,
    image: "/placeholder.svg?height=300&width=400",
    type: "Soundside",
  },
]

export function PropertyGrid() {
  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">{properties.length} properties found</p>
        <select className="border rounded-md px-3 py-2 text-sm">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating: High to Low</option>
          <option>Most Recent</option>
        </select>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-coastal-aqua text-coastal-navy">{property.type}</Badge>
              <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div>
                  <h3 className="font-semibold text-coastal-navy mb-1">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{property.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">({property.reviews} reviews)</span>
                </div>

                {/* Property Details */}
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {property.guests}
                  </div>
                  <div className="flex items-center">
                    <Bed className="h-3 w-3 mr-1" />
                    {property.beds}
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-3 w-3 mr-1" />
                    {property.baths}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-lg font-bold text-coastal-navy">${property.price}</span>
                    <span className="text-muted-foreground text-sm"> / night</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/property/${property.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
