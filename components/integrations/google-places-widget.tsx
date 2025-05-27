"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Clock,
  DollarSign,
  AlertCircle,
  Filter,
  Search,
  Navigation,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { GooglePlacesService } from "@/lib/google-places-service"

interface PlaceResult {
  place_id: string
  name: string
  rating?: number
  user_ratings_total?: number
  price_level?: number
  photos?: Array<{ photo_reference: string; height: number; width: number }>
  vicinity?: string
  formatted_address?: string
  types: string[]
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  opening_hours?: {
    open_now: boolean
  }
  website?: string
  formatted_phone_number?: string
  reviews?: Array<{
    author_name: string
    rating: number
    text: string
    time: number
    profile_photo_url: string
  }>
  editorial_summary?: {
    overview: string
  }
  distance?: number
}

interface GooglePlacesWidgetProps {
  type: "attractions" | "restaurants"
  title?: string
  description?: string
  maxResults?: number
  className?: string
  showFilters?: boolean
  showReviews?: boolean
  userLocation?: { lat: number; lng: number }
}

export function GooglePlacesWidget({
  type,
  title,
  description,
  maxResults = 6,
  className = "",
  showFilters = false,
  showReviews = false,
  userLocation = { lat: 35.9582, lng: -75.6201 }, // Default to Nags Head
}: GooglePlacesWidgetProps) {
  const [places, setPlaces] = useState<PlaceResult[]>([])
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceResult[]>([])
  const [loading, setLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesService = new GooglePlacesService()

        if (!placesService.isApiAvailable()) {
          setIsUsingFallback(true)
        }

        let results: PlaceResult[] = []

        if (type === "attractions") {
          results = await placesService.searchAttractions()
        } else {
          results = await placesService.searchRestaurants()
        }

        // Calculate distances
        const resultsWithDistance = results.map((place) => ({
          ...place,
          distance: placesService.calculateDistance(
            userLocation.lat,
            userLocation.lng,
            place.geometry.location.lat,
            place.geometry.location.lng,
          ),
        }))

        // Filter and limit results
        const filteredResults = resultsWithDistance
          .filter((place) => place.rating && place.rating >= 4.0) // Only show highly rated places
          .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating
          .slice(0, maxResults)

        setPlaces(filteredResults)
        setFilteredPlaces(filteredResults)
      } catch (error) {
        console.warn("Error fetching places:", error)
        setIsUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [type, userLocation.lat, userLocation.lng, maxResults])

  // Apply filters
  useEffect(() => {
    let filtered = [...places]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (place) =>
          place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.vicinity?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const minRating = Number.parseFloat(ratingFilter)
      filtered = filtered.filter((place) => place.rating && place.rating >= minRating)
    }

    // Price filter
    if (priceFilter !== "all") {
      const priceLevel = Number.parseInt(priceFilter)
      filtered = filtered.filter((place) => place.price_level === priceLevel)
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((place) => place.types.includes(typeFilter))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "distance":
          return (a.distance || 0) - (b.distance || 0)
        case "reviews":
          return (b.user_ratings_total || 0) - (a.user_ratings_total || 0)
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredPlaces(filtered)
  }, [places, searchTerm, ratingFilter, priceFilter, typeFilter, sortBy])

  const getDefaultTitle = () => {
    return type === "attractions" ? "Top Outer Banks Attractions" : "Best Local Restaurants"
  }

  const getDefaultDescription = () => {
    return type === "attractions"
      ? "Discover the most popular attractions and landmarks in the Outer Banks with real reviews and photos"
      : "Find the best dining experiences with fresh seafood and local favorites, complete with reviews and ratings"
  }

  const getPriceLevel = (level?: number) => {
    if (!level) return ""
    return "$".repeat(level)
  }

  const getPlaceImage = (place: PlaceResult) => {
    if (place.photos?.[0]) {
      const placesService = new GooglePlacesService()
      if (placesService.isApiAvailable()) {
        return placesService.getPhotoUrl(place.photos[0].photo_reference, 400)
      }
    }
    return "/placeholder.svg?height=250&width=350"
  }

  const getUniqueTypes = () => {
    const allTypes = places.flatMap((place) => place.types)
    const relevantTypes = allTypes.filter((type) => !["establishment", "point_of_interest", "food"].includes(type))
    return [...new Set(relevantTypes)].sort()
  }

  const toggleReviewExpansion = (placeId: string) => {
    setExpandedReviews((prev) => (prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]))
  }

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: maxResults }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className={className}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-coastal-navy">{title || getDefaultTitle()}</h2>
          {isUsingFallback && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-yellow-50 px-3 py-1 rounded-full">
              <AlertCircle className="h-4 w-4" />
              <span>Showing sample data</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-lg">{description || getDefaultDescription()}</p>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search places..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Min Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              {type === "restaurants" && (
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="1">$ Budget</SelectItem>
                    <SelectItem value="2">$$ Moderate</SelectItem>
                    <SelectItem value="3">$$$ Expensive</SelectItem>
                    <SelectItem value="4">$$$$ Very Expensive</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {getUniqueTypes().map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Closest</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredPlaces.length} of {places.length} places
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlaces.map((place, index) => (
          <motion.div
            key={place.place_id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
              <div className="relative">
                <Image
                  src={getPlaceImage(place) || "/placeholder.svg"}
                  alt={place.name}
                  width={350}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {place.opening_hours?.open_now !== undefined && (
                    <Badge
                      className={`${
                        place.opening_hours.open_now
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {place.opening_hours.open_now ? "Open" : "Closed"}
                    </Badge>
                  )}

                  {place.distance && (
                    <Badge className="bg-coastal-navy/80 text-white">
                      <Navigation className="h-3 w-3 mr-1" />
                      {place.distance} mi
                    </Badge>
                  )}
                </div>

                {place.price_level && (
                  <Badge className="absolute top-4 right-4 bg-coastal-aqua text-coastal-navy">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {getPriceLevel(place.price_level)}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-semibold text-coastal-navy mb-2 group-hover:text-coastal-aqua transition-colors">
                    {place.name}
                  </h3>

                  <div className="flex items-center space-x-2 mb-3">
                    {place.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{place.rating}</span>
                        {place.user_ratings_total && (
                          <span className="text-muted-foreground text-sm ml-1">({place.user_ratings_total})</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {place.vicinity || place.formatted_address}
                  </div>

                  {/* Editorial Summary */}
                  {place.editorial_summary?.overview && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {place.editorial_summary.overview}
                    </p>
                  )}

                  {/* Place Types */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {place.types
                      .filter((type) => !["establishment", "point_of_interest"].includes(type))
                      .slice(0, 2)
                      .map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs capitalize">
                          {type.replace(/_/g, " ")}
                        </Badge>
                      ))}
                  </div>

                  {/* Reviews Section */}
                  {showReviews && place.reviews && place.reviews.length > 0 && (
                    <div className="mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReviewExpansion(place.place_id)}
                        className="p-0 h-auto text-coastal-aqua hover:text-coastal-navy"
                      >
                        <User className="h-4 w-4 mr-1" />
                        {place.reviews.length} Reviews
                        {expandedReviews.includes(place.place_id) ? (
                          <ChevronUp className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </Button>

                      <AnimatePresence>
                        {expandedReviews.includes(place.place_id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 space-y-3 max-h-64 overflow-y-auto"
                          >
                            {place.reviews.slice(0, 3).map((review, reviewIndex) => (
                              <div key={reviewIndex} className="border-l-2 border-coastal-aqua/20 pl-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs font-medium">{review.author_name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(review.time * 1000).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{review.text}</p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {place.formatted_phone_number && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      {place.formatted_phone_number}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-coastal-aqua text-coastal-aqua hover:bg-coastal-aqua hover:text-white"
                      onClick={() => {
                        const url = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
                        window.open(url, "_blank")
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Directions
                    </Button>

                    {place.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-coastal-aqua text-coastal-aqua hover:bg-coastal-aqua hover:text-white"
                        onClick={() => window.open(place.website, "_blank")}
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPlaces.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No {type} found matching your criteria.</p>
          {showFilters && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setRatingFilter("all")
                setPriceFilter("all")
                setTypeFilter("all")
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </motion.div>
  )
}
