import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyDetails } from "@/components/property/property-details"
import { PropertyAmenities } from "@/components/property/property-amenities"
import { BookingCard } from "@/components/property/booking-card"
import { PropertyReviews } from "@/components/property/property-reviews"
import { SimilarProperties } from "@/components/property/similar-properties"
import { notFound } from "next/navigation"

// Mock data - in real app, this would come from Umbraco CMS
const getProperty = async (slug: string) => {
  const properties = {
    "ocean-breeze-cottage": {
      id: "ocean-breeze-cottage",
      title: "Ocean Breeze Cottage",
      location: "Nags Head, NC",
      price: 450,
      rating: 4.9,
      reviews: 127,
      beds: 4,
      baths: 3,
      guests: 8,
      description:
        "Experience the ultimate coastal getaway at Ocean Breeze Cottage, a stunning oceanfront property that perfectly captures the essence of beach living. This beautifully appointed 4-bedroom, 3-bathroom home offers breathtaking panoramic ocean views and direct beach access.",
      images: [
        "/public/01-surf-or-sound-realty-1082-sea-monkey-main.jpg"
      ],
      amenities: [
        "Ocean View",
        "Private Beach Access",
        "Hot Tub",
        "Wifi",
        "Parking",
        "Full Kitchen",
        "Washer/Dryer",
        "Deck",
        "Grill",
        "Beach Chairs",
      ],
      type: "Oceanfront",
    },
  }

  return properties[slug as keyof typeof properties] || null
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const property = await getProperty(params.slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="container py-8">
      {/* Property Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-coastal-navy mb-2">{property.title}</h1>
        <p className="text-muted-foreground">{property.location}</p>
      </div>

      {/* Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Property Info */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyDetails property={property} />
          <PropertyAmenities amenities={property.amenities} />
          <PropertyReviews propertyId={property.id} rating={property.rating} reviewCount={property.reviews} />
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <BookingCard property={property} />
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="mt-16">
        <SimilarProperties currentPropertyId={property.id} />
      </div>
    </div>
  )
}
