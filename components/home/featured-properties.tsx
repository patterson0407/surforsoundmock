import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Users, Bed, Bath } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data - in real app, this would come from Umbraco CMS
const featuredProperties = [
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
    amenities: ["Wifi", "Parking", "Ocean View", "Hot Tub"],
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
    amenities: ["Wifi", "Parking", "Sound View", "Kayaks"],
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
    amenities: ["Wifi", "Parking", "Private Pool", "Game Room"],
    type: "Luxury",
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-coastal-navy mb-4">Featured Properties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked vacation rentals that offer the perfect blend of luxury, comfort, and stunning coastal views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-coastal-aqua text-coastal-navy">{property.type}</Badge>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-semibold text-coastal-navy mb-2">{property.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{property.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({property.reviews} reviews)</span>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {property.guests} guests
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.beds} beds
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.baths} baths
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-coastal-navy">${property.price}</span>
                      <span className="text-muted-foreground"> / night</span>
                    </div>
                    <Button asChild>
                      <Link href={`/property/${property.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
