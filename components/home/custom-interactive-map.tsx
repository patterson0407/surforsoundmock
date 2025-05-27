"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, DollarSign, Users } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const mapLocations = [
  {
    id: "nags-head",
    name: "Nags Head",
    coordinates: { x: 45, y: 60 },
    properties: 28,
    avgPrice: 450,
    rating: 4.8,
    description: "Famous for its fishing pier and beautiful beaches",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "duck",
    name: "Duck",
    coordinates: { x: 35, y: 40 },
    properties: 22,
    avgPrice: 380,
    rating: 4.9,
    description: "Charming town with soundside charm",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "corolla",
    name: "Corolla",
    coordinates: { x: 25, y: 25 },
    properties: 18,
    avgPrice: 650,
    rating: 4.9,
    description: "Home to wild horses and luxury estates",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "kitty-hawk",
    name: "Kitty Hawk",
    coordinates: { x: 55, y: 70 },
    properties: 35,
    avgPrice: 320,
    rating: 4.7,
    description: "Birthplace of flight with family-friendly beaches",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function CustomInteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  const selectedLocationData = mapLocations.find((loc) => loc.id === selectedLocation)

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-coastal-navy/10 text-coastal-navy border-coastal-navy/20">Explore Locations</Badge>
          <h2 className="text-4xl font-bold text-coastal-navy mb-6">Discover the Outer Banks</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From the wild horses of Corolla to the historic charm of Nags Head, explore our premium properties across
            the most beautiful coastal destinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Custom Interactive Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="relative bg-gradient-to-br from-coastal-aqua/10 to-coastal-navy/10 rounded-2xl p-8 h-96 overflow-hidden">
              {/* Enhanced Map Background with SVG */}
              <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 opacity-50">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Water areas */}
                  <defs>
                    <pattern id="water" patternUnits="userSpaceOnUse" width="4" height="4">
                      <rect width="4" height="4" fill="rgba(0, 204, 204, 0.1)" />
                      <path d="M0,2 Q2,0 4,2 Q2,4 0,2" fill="rgba(0, 204, 204, 0.2)" />
                    </pattern>
                  </defs>

                  {/* Ocean */}
                  <rect x="0" y="0" width="100" height="100" fill="url(#water)" />

                  {/* Coastline */}
                  <path
                    d="M15,20 Q25,15 35,20 Q45,18 55,22 Q65,20 75,25 Q85,23 95,28 L95,85 Q85,80 75,82 Q65,78 55,80 Q45,75 35,78 Q25,73 15,75 Z"
                    fill="rgba(245, 222, 179, 0.8)"
                    stroke="rgba(0, 204, 204, 0.6)"
                    strokeWidth="1"
                  />

                  {/* Sound side */}
                  <path
                    d="M15,75 Q25,73 35,78 Q45,75 55,80 Q65,78 75,82 Q85,80 95,85 L95,95 L15,95 Z"
                    fill="rgba(0, 204, 204, 0.3)"
                  />

                  {/* Beach details */}
                  <path
                    d="M20,25 Q30,22 40,25 Q50,23 60,27 Q70,25 80,30"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Location Pins */}
              {mapLocations.map((location) => (
                <button
                  key={location.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    selectedLocation === location.id || hoveredLocation === location.id
                      ? "scale-125 z-20"
                      : "scale-100 z-10"
                  }`}
                  style={{
                    left: `${location.coordinates.x}%`,
                    top: `${location.coordinates.y}%`,
                  }}
                  onClick={() => setSelectedLocation(location.id)}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div
                    className={`relative ${
                      selectedLocation === location.id
                        ? "text-coastal-aqua"
                        : "text-coastal-navy hover:text-coastal-aqua"
                    }`}
                  >
                    <div className="relative">
                      <MapPin className="h-8 w-8 drop-shadow-lg" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow-lg border">
                        {location.name}
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              {/* Animated Ripples for Selected Location */}
              {selectedLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${mapLocations.find((l) => l.id === selectedLocation)?.coordinates.x}%`,
                    top: `${mapLocations.find((l) => l.id === selectedLocation)?.coordinates.y}%`,
                  }}
                >
                  <div className="w-16 h-16 border-2 border-coastal-aqua rounded-full animate-ping opacity-30" />
                  <div
                    className="absolute inset-0 w-16 h-16 border-2 border-coastal-aqua rounded-full animate-ping opacity-20"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              )}

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-coastal-aqua/30 rounded"></div>
                    <span>Ocean</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                    <span>Beach</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-coastal-aqua/50 rounded"></div>
                    <span>Sound</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
            {selectedLocationData ? (
              <Card className="overflow-hidden shadow-xl">
                <div className="relative h-48">
                  <Image
                    src={selectedLocationData.image || "/placeholder.svg"}
                    alt={selectedLocationData.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{selectedLocationData.name}</h3>
                    <p className="text-sm opacity-90">{selectedLocationData.description}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-coastal-aqua" />
                      </div>
                      <div className="text-2xl font-bold text-coastal-navy">{selectedLocationData.properties}</div>
                      <div className="text-sm text-muted-foreground">Properties</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="h-5 w-5 text-coastal-aqua" />
                      </div>
                      <div className="text-2xl font-bold text-coastal-navy">${selectedLocationData.avgPrice}</div>
                      <div className="text-sm text-muted-foreground">Avg/night</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Star className="h-5 w-5 text-coastal-aqua" />
                      </div>
                      <div className="text-2xl font-bold text-coastal-navy">{selectedLocationData.rating}</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  <Button className="w-full bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy">
                    View Properties in {selectedLocationData.name}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-8 text-center border-dashed border-2 border-coastal-aqua/30">
                <MapPin className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-coastal-navy mb-2">Select a Location</h3>
                <p className="text-muted-foreground">
                  Click on any pin on the map to explore properties and learn more about each destination.
                </p>
              </Card>
            )}

            {/* Quick Location Grid */}
            <div className="grid grid-cols-2 gap-3">
              {mapLocations.map((location) => (
                <Button
                  key={location.id}
                  variant={selectedLocation === location.id ? "default" : "outline"}
                  className={`justify-start ${
                    selectedLocation === location.id
                      ? "bg-coastal-aqua text-coastal-navy"
                      : "border-coastal-aqua/30 text-coastal-navy hover:bg-coastal-aqua/10"
                  }`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {location.name}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
