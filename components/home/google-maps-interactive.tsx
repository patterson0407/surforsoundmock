"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Star, DollarSign, Users, AlertCircle, Layers, Navigation } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { GoogleMapsService } from "@/lib/google-maps-service"

interface MapLocation {
  id: string
  name: string
  position: { lat: number; lng: number }
  properties: number
  avgPrice: number
  rating: number
  description: string
  highlights: string[]
  type: "town" | "attraction" | "restaurant"
}

export function GoogleMapsInteractive() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapsServiceRef = useRef<GoogleMapsService | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [showAttractions, setShowAttractions] = useState(false)
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [locations, setLocations] = useState<MapLocation[]>([])

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return

      try {
        const mapsService = new GoogleMapsService()
        mapsServiceRef.current = mapsService

        if (!mapsService.isApiAvailable()) {
          console.log("No Google Maps API key, using fallback")
          setIsUsingFallback(true)
          setLocations(mapsService.getFallbackLocations())
          setLoading(false)
          return
        }

        // Initialize the map
        await mapsService.initializeMap(mapRef.current, {
          center: { lat: 35.9582, lng: -75.6201 }, // Nags Head center
          zoom: 10,
          mapTypeId: "terrain",
        })

        // Get locations and add markers
        const outerBanksLocations = mapsService.getFallbackLocations()
        setLocations(outerBanksLocations)

        // Add location markers
        outerBanksLocations.forEach((location) => {
          mapsService.createCustomMarker(location, (clickedLocation) => {
            setSelectedLocation(clickedLocation)
          })
        })

        // Fit map to show all locations
        mapsService.fitBounds(outerBanksLocations)

        setMapLoaded(true)
        setLoading(false)
      } catch (error) {
        console.error("Error initializing map:", error)
        setIsUsingFallback(true)

        // Use fallback locations
        const fallbackService = new GoogleMapsService()
        setLocations(fallbackService.getFallbackLocations())
        setLoading(false)
      }
    }

    initializeMap()
  }, [])

  const toggleAttractions = async (show: boolean) => {
    setShowAttractions(show)

    if (!mapsServiceRef.current || !mapLoaded) return

    if (show) {
      try {
        // Search for attractions near Nags Head
        const attractions = await mapsServiceRef.current.searchNearbyPlaces(
          { lat: 35.9582, lng: -75.6201 },
          "tourist_attraction",
        )
        mapsServiceRef.current.addPlacesMarkers(attractions.slice(0, 10), "attraction")
      } catch (error) {
        console.warn("Error loading attractions:", error)
      }
    } else {
      // Clear and re-add only location markers
      mapsServiceRef.current.clearMarkers()
      locations.forEach((location) => {
        mapsServiceRef.current?.createCustomMarker(location, (clickedLocation) => {
          setSelectedLocation(clickedLocation)
        })
      })
      if (showRestaurants) {
        toggleRestaurants(true) // Re-add restaurants if they were shown
      }
    }
  }

  const toggleRestaurants = async (show: boolean) => {
    setShowRestaurants(show)

    if (!mapsServiceRef.current || !mapLoaded) return

    if (show) {
      try {
        // Search for restaurants near Nags Head
        const restaurants = await mapsServiceRef.current.searchNearbyPlaces(
          { lat: 35.9582, lng: -75.6201 },
          "restaurant",
        )
        mapsServiceRef.current.addPlacesMarkers(restaurants.slice(0, 10), "restaurant")
      } catch (error) {
        console.warn("Error loading restaurants:", error)
      }
    } else {
      // Clear and re-add only location markers
      mapsServiceRef.current.clearMarkers()
      locations.forEach((location) => {
        mapsServiceRef.current?.createCustomMarker(location, (clickedLocation) => {
          setSelectedLocation(clickedLocation)
        })
      })
      if (showAttractions) {
        toggleAttractions(true) // Re-add attractions if they were shown
      }
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-coastal-navy/10 text-coastal-navy border-coastal-navy/20">Interactive Map</Badge>
          <h2 className="text-4xl font-bold text-coastal-navy mb-6">Explore the Outer Banks</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our vacation rental locations and nearby attractions with our interactive Google Maps integration.
            Click on any location to learn more about properties and local highlights.
          </p>

          {isUsingFallback && (
            <div className="mt-4 inline-flex items-center space-x-2 text-sm text-muted-foreground bg-yellow-50 px-3 py-1 rounded-full">
              <AlertCircle className="h-4 w-4" />
              <span>Interactive map requires Google Maps API</span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-coastal-aqua" />
                    <span>Outer Banks Map</span>
                  </CardTitle>

                  {mapLoaded && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="attractions" checked={showAttractions} onCheckedChange={toggleAttractions} />
                        <Label htmlFor="attractions" className="text-sm">
                          Attractions
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="restaurants" checked={showRestaurants} onCheckedChange={toggleRestaurants} />
                        <Label htmlFor="restaurants" className="text-sm">
                          Restaurants
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {!isUsingFallback ? (
                  <div ref={mapRef} className="w-full h-96 bg-gray-100" style={{ minHeight: "400px" }} />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-coastal-aqua mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-coastal-navy mb-2">Interactive Map Unavailable</h3>
                      <p className="text-muted-foreground">
                        Google Maps API key required for interactive map features.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map Legend */}
            {mapLoaded && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-coastal-aqua rounded-full"></div>
                        <span className="text-sm">Vacation Rental Locations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span className="text-sm">Attractions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                        <span className="text-sm">Restaurants</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Layers className="h-3 w-3 mr-1" />
                      Google Maps
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Location Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
            {selectedLocation ? (
              <Card className="overflow-hidden shadow-xl">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder_image.png?height=200&width=300&text=${encodeURIComponent(selectedLocation.name)}`}
                    alt={selectedLocation.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{selectedLocation.name}</h3>
                    <p className="text-sm opacity-90">{selectedLocation.description}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-coastal-aqua" />
                      </div>
                      <div className="text-2xl font-bold text-coastal-navy">{selectedLocation.properties}</div>
                      <div className="text-sm text-muted-foreground">Properties</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="h-5 w-5 text-coastal-aqua" />
                      </div>
                      <div className="text-2xl font-bold text-coastal-navy">${selectedLocation.avgPrice}</div>
                      <div className="text-sm text-muted-foreground">Avg/night</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="h-5 w-5 text-coastal-aqua" />
                      </div>
                      <div className="text-2xl font-bold text-coastal-navy">{selectedLocation.rating}</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-coastal-navy mb-3">Top Attractions</h4>
                    <div className="space-y-2">
                      {selectedLocation.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <Navigation className="h-4 w-4 mr-2 text-coastal-aqua" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy">
                    View Properties in {selectedLocation.name}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-8 text-center border-dashed border-2 border-coastal-aqua/30">
                <MapPin className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-coastal-navy mb-2">Select a Location</h3>
                <p className="text-muted-foreground">
                  Click on any location marker on the map to explore properties and learn more about each destination.
                </p>
              </Card>
            )}

            {/* Quick Location List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Our Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {locations.map((location) => (
                  <Button
                    key={location.id}
                    variant={selectedLocation?.id === location.id ? "default" : "outline"}
                    className={`w-full justify-start ${
                      selectedLocation?.id === location.id
                        ? "bg-coastal-aqua text-coastal-navy"
                        : "border-coastal-aqua/30 text-coastal-navy hover:bg-coastal-aqua/10"
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs opacity-70">{location.properties} properties</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
