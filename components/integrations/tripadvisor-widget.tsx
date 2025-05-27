"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface TripAdvisorWidgetProps {
  widgetType?: "attractions" | "restaurants" | "hotels" | "reviews"
  location?: string
  title?: string
  description?: string
  height?: number
  className?: string
}

export function TripAdvisorWidget({
  widgetType = "attractions",
  location = "outer-banks-north-carolina",
  title,
  description,
  height = 400,
  className = "",
}: TripAdvisorWidgetProps) {
  const getWidgetUrl = () => {
    const baseUrl = "https://www.tripadvisor.com/WidgetEmbed"

    switch (widgetType) {
      case "attractions":
        // Outer Banks specific attraction widget
        return `${baseUrl}-cdsattractionsproducts-2?locationId=49022&geoId=49022&partnerId=&mcid=42383&placementName=&campaignId=&apiKey=&theme=white&variant=wide&currency=USD&lang=en_US&size=300x250&display_version=2`
      case "restaurants":
        return `${baseUrl}-cdsrestaurantsproducts-2?locationId=49022&geoId=49022&partnerId=&mcid=42383`
      case "hotels":
        return `${baseUrl}-cdshotelsproducts-2?locationId=49022&geoId=49022&partnerId=&mcid=42383`
      case "reviews":
        return `${baseUrl}-cdsreviews-2?locationId=49022&geoId=49022&partnerId=&mcid=42383`
      default:
        return `${baseUrl}-cdsattractionsproducts-2?locationId=49022&geoId=49022&partnerId=&mcid=42383&theme=white&variant=wide`
    }
  }

  const getDefaultTitle = () => {
    switch (widgetType) {
      case "attractions":
        return "Top Attractions"
      case "restaurants":
        return "Best Restaurants"
      case "hotels":
        return "Recommended Hotels"
      case "reviews":
        return "Traveler Reviews"
      default:
        return "TripAdvisor Recommendations"
    }
  }

  const getDefaultDescription = () => {
    switch (widgetType) {
      case "attractions":
        return "Discover top-rated Outer Banks attractions including lighthouses, wild horses, and historic sites"
      case "restaurants":
        return "Find the best seafood restaurants and local dining in the Outer Banks"
      case "hotels":
        return "Explore highly-rated accommodations across the Outer Banks barrier islands"
      case "reviews":
        return "Read genuine reviews from travelers who have visited the Outer Banks, NC"
      default:
        return "Explore Outer Banks recommendations from the TripAdvisor community"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className={className}>
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-coastal-navy/5 to-coastal-aqua/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-coastal-aqua/10 rounded-lg flex items-center justify-center">
                {widgetType === "attractions" && <MapPin className="h-5 w-5 text-coastal-aqua" />}
                {widgetType === "restaurants" && <Star className="h-5 w-5 text-coastal-aqua" />}
                {widgetType === "hotels" && <ExternalLink className="h-5 w-5 text-coastal-aqua" />}
                {widgetType === "reviews" && <Star className="h-5 w-5 text-coastal-aqua" />}
              </div>
              <div>
                <CardTitle className="text-coastal-navy">{title || getDefaultTitle()}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{description || getDefaultDescription()}</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <ExternalLink className="h-3 w-3 mr-1" />
              TripAdvisor
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full relative">
            <iframe
              src={getWidgetUrl()}
              width="100%"
              height={height}
              frameBorder="0"
              scrolling="no"
              title={`TripAdvisor ${widgetType} Widget`}
              className="w-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />

            {/* Loading placeholder */}
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coastal-aqua mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading TripAdvisor content...</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
