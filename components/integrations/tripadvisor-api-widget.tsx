"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Utensils, ExternalLink, DollarSign, Calendar, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { OUTER_BANKS_LOCATION_IDS } from "@/lib/tripadvisor-service"
import type { TripAdvisorAttraction, TripAdvisorRestaurant, TripAdvisorReview } from "@/lib/tripadvisor-service"

interface TripAdvisorApiWidgetProps {
  type: "attractions" | "restaurants"
  title?: string
  description?: string
  locationId?: string
  maxResults?: number
  showReviews?: boolean
  className?: string
}

export function TripAdvisorApiWidget({
  type = "attractions",
  title,
  description,
  locationId = OUTER_BANKS_LOCATION_IDS.outerBanks,
  maxResults = 6,
  showReviews = true,
  className = "",
}: TripAdvisorApiWidgetProps) {
  const [data, setData] = useState<TripAdvisorAttraction[] | TripAdvisorRestaurant[]>([])
  const [reviews, setReviews] = useState<Record<string, TripAdvisorReview[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState(locationId)
  const [apiStatus, setApiStatus] = useState<string>("")

  const getDefaultTitle = () => {
    return type === "attractions" ? "Top Attractions" : "Best Restaurants"
  }

  const getDefaultDescription = () => {
    return type === "attractions"
      ? "Discover top-rated Outer Banks attractions including lighthouses, wild horses, and historic sites"
      : "Find the best seafood restaurants and local dining in the Outer Banks"
  }

  // Fetch data from our API routes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setApiStatus("Connecting to TripAdvisor...")

      try {
        const endpoint = type === "attractions" ? "attractions" : "restaurants"
        const response = await fetch(`/api/tripadvisor/${endpoint}?locationId=${selectedLocation}&limit=${maxResults}`)

        setApiStatus(`TripAdvisor API responded with status: ${response.status}`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()

        if (result.success && result.data) {
          setData(result.data)
          setApiStatus(`Successfully loaded ${result.data.length} ${type}`)
        } else {
          throw new Error(result.error || "Failed to fetch data")
        }
      } catch (err) {
        console.error(`Error fetching TripAdvisor ${type}:`, err)
        setError(`Unable to load ${type}. Using sample data.`)
        setApiStatus("Using sample data (API unavailable)")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, selectedLocation, maxResults])

  // Fetch reviews for each item if showReviews is true
  useEffect(() => {
    if (!showReviews || loading || data.length === 0) return

    const fetchReviews = async () => {
      const newReviews: Record<string, TripAdvisorReview[]> = {}
      setApiStatus("Fetching reviews for items...")

      for (const item of data) {
        try {
          const response = await fetch(`/api/tripadvisor/reviews?locationId=${item.location_id}&limit=3`)

          if (response.ok) {
            const result = await response.json()
            if (result.success && result.data) {
              newReviews[item.location_id] = result.data
              if (result.note) {
                console.log(`Note for ${item.name}: ${result.note}`)
                setApiStatus(result.note)
              }
            }
          } else {
            console.warn(`Failed to fetch reviews for ${item.name}: ${response.status}`)
            // Don't set an error, just continue with other items
          }
        } catch (err) {
          console.error(`Error fetching reviews for ${item.name}:`, err)
          // Don't set an error, just continue with other items
        }
      }

      setReviews(newReviews)
      if (Object.keys(newReviews).length > 0) {
        setApiStatus(`Successfully loaded reviews for ${Object.keys(newReviews).length} items`)
      } else {
        setApiStatus("Using sample reviews (API unavailable)")
      }
    }

    fetchReviews()
  }, [data, showReviews, loading])

  // Location options for the dropdown
  const locationOptions = [
    { label: "All Outer Banks", value: OUTER_BANKS_LOCATION_IDS.outerBanks },
    { label: "Nags Head", value: OUTER_BANKS_LOCATION_IDS.nagsHead },
    { label: "Kill Devil Hills", value: OUTER_BANKS_LOCATION_IDS.killDevilHills },
    { label: "Kitty Hawk", value: OUTER_BANKS_LOCATION_IDS.kittyHawk },
    { label: "Duck", value: OUTER_BANKS_LOCATION_IDS.duck },
    { label: "Corolla", value: OUTER_BANKS_LOCATION_IDS.corolla },
    { label: "Hatteras", value: OUTER_BANKS_LOCATION_IDS.hatteras },
    { label: "Ocracoke", value: OUTER_BANKS_LOCATION_IDS.ocracoke },
    { label: "Manteo", value: OUTER_BANKS_LOCATION_IDS.manteo },
    { label: "Rodanthe", value: OUTER_BANKS_LOCATION_IDS.rodanthe },
    { label: "Waves", value: OUTER_BANKS_LOCATION_IDS.waves },
    { label: "Salvo", value: OUTER_BANKS_LOCATION_IDS.salvo },
    { label: "Avon", value: OUTER_BANKS_LOCATION_IDS.avon },
    { label: "Buxton", value: OUTER_BANKS_LOCATION_IDS.buxton },
    { label: "Frisco", value: OUTER_BANKS_LOCATION_IDS.frisco },
  ]

  // Render stars for ratings
  const renderRating = (rating?: number) => {
    if (!rating) return null

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : i < rating
                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                  : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Render price level
  const renderPriceLevel = (priceLevel?: string) => {
    if (!priceLevel) return null

    return (
      <div className="flex items-center text-gray-600">
        <DollarSign className="h-4 w-4 mr-1" />
        <span>{priceLevel}</span>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className={className}>
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-coastal-navy/5 to-coastal-aqua/5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-coastal-aqua/10 rounded-lg flex items-center justify-center">
                {type === "attractions" ? (
                  <MapPin className="h-5 w-5 text-coastal-aqua" />
                ) : (
                  <Utensils className="h-5 w-5 text-coastal-aqua" />
                )}
              </div>
              <div>
                <CardTitle className="text-coastal-navy">{title || getDefaultTitle()}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{description || getDefaultDescription()}</p>
              </div>
            </div>

            <div className="flex items-center">
              <select
                className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-coastal-aqua"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <Badge className="ml-3 bg-green-100 text-green-800 border-green-200">
                <ExternalLink className="h-3 w-3 mr-1" />
                TripAdvisor
              </Badge>
            </div>
          </div>

          {/* API Status for debugging */}
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {apiStatus}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coastal-aqua mb-4"></div>
              <p className="text-muted-foreground">Loading {type}...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-amber-600 mb-4">{error}</p>
              <p className="text-sm text-gray-500 mb-4">
                Note: TripAdvisor API requires approval. Sample data is shown below.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setLoading(true)
                  setError(null)
                  // Re-fetch data
                  setTimeout(() => {
                    setLoading(false)
                  }, 1000)
                }}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => (
                <Card key={item.location_id} className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    {item.photo ? (
                      <img
                        src={item.photo.images.medium.url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No image available</p>
                      </div>
                    )}

                    {type === "restaurants" && (item as TripAdvisorRestaurant).price_level && (
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                        {(item as TripAdvisorRestaurant).price_level}
                      </div>
                    )}

                    {type === "attractions" && (item as TripAdvisorAttraction).category && (
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                        {(item as TripAdvisorAttraction).category.name}
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{item.name}</h3>

                    <div className="flex items-center justify-between mb-2">
                      {renderRating(item.rating)}
                      {item.num_reviews && (
                        <span className="text-xs text-gray-500">{item.num_reviews.toLocaleString()} reviews</span>
                      )}
                    </div>

                    <div className="flex items-start space-x-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">
                        {item.address_obj.street1}, {item.address_obj.city}, {item.address_obj.state}
                      </span>
                    </div>

                    {type === "restaurants" && (item as TripAdvisorRestaurant).cuisine && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(item as TripAdvisorRestaurant).cuisine.slice(0, 3).map((c, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {c.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {showReviews && reviews[item.location_id] && reviews[item.location_id].length > 0 && (
                      <div className="mt-2 mb-4">
                        <Tabs defaultValue="review0">
                          <TabsList className="w-full">
                            {reviews[item.location_id].map((_, i) => (
                              <TabsTrigger key={i} value={`review${i}`} className="text-xs">
                                Review {i + 1}
                              </TabsTrigger>
                            ))}
                          </TabsList>

                          {reviews[item.location_id].map((review, i) => (
                            <TabsContent key={i} value={`review${i}`} className="text-sm">
                              <div className="bg-gray-50 p-3 rounded-md">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, j) => (
                                      <Star
                                        key={j}
                                        className={`h-3 w-3 ${
                                          j < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(review.published_date).toLocaleDateString()}
                                  </div>
                                </div>
                                <p className="font-medium text-sm">{review.title}</p>
                                <p className="text-xs text-gray-600 line-clamp-3">{review.text}</p>
                                <p className="text-xs text-gray-500 mt-1">- {review.user.username}</p>
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    )}

                    <div className="mt-auto">
                      <a
                        href={item.web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coastal-navy hover:text-coastal-aqua text-sm font-medium flex items-center"
                      >
                        View on TripAdvisor
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
