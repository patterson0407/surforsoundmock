import { GooglePlacesWidget } from "@/components/integrations/google-places-widget"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Camera, Utensils, Navigation } from "lucide-react"
import Link from "next/link"

export default function AttractionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">
              Local Attractions
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Discover the
              <span className="block text-coastal-aqua">Outer Banks</span>
            </h1>
            <p className="text-xl text-coastal-sand leading-relaxed">
              From historic landmarks to natural wonders, explore the best attractions and dining experiences the Outer
              Banks has to offer, complete with real Google reviews, photos, and distance from your location.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-coastal-aqua" />
              </div>
              <h3 className="font-semibold text-coastal-navy mb-2">Top Attractions</h3>
              <p className="text-sm text-muted-foreground">Must-visit landmarks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-coastal-aqua" />
              </div>
              <h3 className="font-semibold text-coastal-navy mb-2">Best Restaurants</h3>
              <p className="text-sm text-muted-foreground">Local dining favorites</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-coastal-aqua" />
              </div>
              <h3 className="font-semibold text-coastal-navy mb-2">Real Photos</h3>
              <p className="text-sm text-muted-foreground">Authentic Google images</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-coastal-aqua" />
              </div>
              <h3 className="font-semibold text-coastal-navy mb-2">Live Reviews</h3>
              <p className="text-sm text-muted-foreground">Real visitor feedback</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-coastal-aqua" />
              </div>
              <h3 className="font-semibold text-coastal-navy mb-2">Distance Info</h3>
              <p className="text-sm text-muted-foreground">Miles from your location</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Places Content */}
      <section className="py-16 bg-muted/30">
        <div className="container space-y-16">
          {/* Attractions with full filtering */}
          <GooglePlacesWidget
            type="attractions"
            title="Top Outer Banks Attractions"
            description="Discover the most popular attractions including Cape Hatteras Lighthouse, Wright Brothers Memorial, wild horse tours, and more. Filter by rating, distance, and category."
            maxResults={12}
            showFilters={true}
            showReviews={true}
          />

          {/* Restaurants with full filtering */}
          <GooglePlacesWidget
            type="restaurants"
            title="Best Outer Banks Restaurants"
            description="From fresh seafood to waterfront dining, find the perfect restaurant for your coastal dining experience. Filter by price, rating, and cuisine type."
            maxResults={12}
            showFilters={true}
            showReviews={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-coastal-navy mb-6">Ready to Experience the Outer Banks?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your perfect vacation rental and start exploring these amazing attractions and restaurants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy" asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
