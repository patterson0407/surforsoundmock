"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, DollarSign, Users, Waves, LampIcon as Lighthouse, Camera } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const mapLocations = [
  {
    id: "corolla",
    name: "Corolla",
    coordinates: { x: 30, y: 15 },
    properties: 18,
    avgPrice: 650,
    rating: 4.9,
    description: "Home to wild horses and luxury estates",
    image: "/corolla-wild-horses-beach.png",
    highlights: ["Wild Horse Tours", "Currituck Beach Lighthouse", "Luxury Estates"],
    icon: <Camera className="h-4 w-4" />,
  },
  {
    id: "duck",
    name: "Duck",
    coordinates: { x: 35, y: 35 },
    properties: 22,
    avgPrice: 380,
    rating: 4.9,
    description: "Charming town with soundside charm",
    image: "/north-carolina-duck-boardwalk.png",
    highlights: ["Duck Boardwalk", "Soundside Dining", "Family Beaches"],
    icon: <Waves className="h-4 w-4" />,
  },
  {
    id: "kitty-hawk",
    name: "Kitty Hawk",
    coordinates: { x: 45, y: 55 },
    properties: 35,
    avgPrice: 320,
    rating: 4.7,
    description: "Birthplace of flight with family-friendly beaches",
    image: "/kitty-hawk-memorial.png",
    highlights: ["Wright Brothers Memorial", "Family Beaches", "Fishing Pier"],
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "nags-head",
    name: "Nags Head",
    coordinates: { x: 50, y: 70 },
    properties: 28,
    avgPrice: 450,
    rating: 4.8,
    description: "Famous for its fishing pier and beautiful beaches",
    image: "/nags-head-pier-beach.png",
    highlights: ["Jockey's Ridge State Park", "Nags Head Pier", "Beach Access"],
    icon: <Lighthouse className="h-4 w-4" />,
  },
  {
    id: "cape-hatteras",
    name: "Cape Hatteras",
    coordinates: { x: 60, y: 85 },
    properties: 15,
    avgPrice: 520,
    rating: 4.8,
    description: "Iconic lighthouse and pristine beaches",
    image: "/cape-hatteras-lighthouse.png",
    highlights: ["Cape Hatteras Lighthouse", "National Seashore", "Surfing"],
    icon: <Lighthouse className="h-4 w-4" />,
  },
]

export function RealisticInteractiveMap() {
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
            From the wild horses of Corolla to the historic charm of Cape Hatteras, explore our premium properties
            across the most beautiful coastal destinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Realistic Outer Banks Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-[500px] overflow-hidden border-2 border-coastal-aqua/20">
              {/* Realistic Outer Banks Coastline SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                <defs>
                  {/* Ocean Pattern */}
                  <pattern id="ocean" patternUnits="userSpaceOnUse" width="8" height="8">
                    <rect width="8" height="8" fill="#0ea5e9" opacity="0.1" />
                    <circle cx="2" cy="2" r="0.5" fill="#0ea5e9" opacity="0.3" />
                    <circle cx="6" cy="6" r="0.5" fill="#0ea5e9" opacity="0.3" />
                  </pattern>

                  {/* Sound Pattern */}
                  <pattern id="sound" patternUnits="userSpaceOnUse" width="6" height="6">
                    <rect width="6" height="6" fill="#00cccc" opacity="0.15" />
                    <path d="M0,3 Q3,1 6,3 Q3,5 0,3" fill="#00cccc" opacity="0.2" />
                  </pattern>

                  {/* Beach Pattern */}
                  <pattern id="beach" patternUnits="userSpaceOnUse" width="4" height="4">
                    <rect width="4" height="4" fill="#fbbf24" opacity="0.2" />
                    <circle cx="1" cy="1" r="0.3" fill="#fbbf24" opacity="0.4" />
                    <circle cx="3" cy="3" r="0.3" fill="#fbbf24" opacity="0.4" />
                  </pattern>
                </defs>

                {/* Atlantic Ocean */}
                <rect x="0" y="0" width="100" height="100" fill="url(#ocean)" />

                {/* Outer Banks Barrier Islands - Realistic Shape */}
                <path
                  d="M25,10 Q30,8 35,12 Q40,10 45,15 Q50,12 55,18 Q60,15 65,20 Q70,18 75,25 Q80,22 85,30 Q88,35 90,45 Q92,55 88,65 Q85,75 80,82 Q75,88 70,90 Q65,85 60,88 Q55,82 50,85 Q45,78 40,82 Q35,75 30,78 Q25,70 22,60 Q20,50 22,40 Q24,30 25,20 Z"
                  fill="url(#beach)"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.8"
                />

                {/* Pamlico Sound */}
                <path
                  d="M22,60 Q25,70 30,78 Q35,75 40,82 Q45,78 50,85 Q55,82 60,88 Q65,85 70,90 Q75,88 80,82 Q85,75 88,65 Q90,55 85,45 Q80,35 75,30 Q70,25 65,28 Q60,32 55,35 Q50,38 45,42 Q40,45 35,48 Q30,52 25,55 Q22,58 22,60 Z"
                  fill="url(#sound)"
                  stroke="#00cccc"
                  strokeWidth="0.5"
                  opacity="0.6"
                />

                {/* Beach Line */}
                <path
                  d="M25,10 Q30,8 35,12 Q40,10 45,15 Q50,12 55,18 Q60,15 65,20 Q70,18 75,25 Q80,22 85,30"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                />

                {/* Highway 12 */}
                <path
                  d="M28,15 Q33,13 38,17 Q43,15 48,20 Q53,17 58,23 Q63,20 68,25 Q73,23 78,30"
                  stroke="#6b7280"
                  strokeWidth="0.8"
                  fill="none"
                  strokeDasharray="2,1"
                  opacity="0.6"
                />

                {/* Bridges */}
                <line x1="22" y1="60" x2="28" y2="55" stroke="#8b5cf6" strokeWidth="1" opacity="0.7" />
                <line x1="35" y1="48" x2="38" y2="42" stroke="#8b5cf6" strokeWidth="1" opacity="0.7" />
              </svg>

              {/* Location Pins with Enhanced Design */}
              {mapLocations.map((location) => (
                <button
                  key={location.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 ${
                    selectedLocation === location.id || hoveredLocation === location.id
                      ? "scale-125"
                      : "scale-100 hover:scale-110"
                  }`}
                  style={{
                    left: `${location.coordinates.x}%`,
                    top: `${location.coordinates.y}%`,
                  }}
                  onClick={() => setSelectedLocation(location.id)}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className="relative group">
                    {/* Pin Shadow */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black/20 rounded-full blur-sm" />

                    {/* Main Pin */}
                    <div
                      className={`relative w-8 h-8 rounded-full border-3 border-white shadow-lg transition-all duration-300 ${
                        selectedLocation === location.id ? "bg-coastal-aqua" : "bg-coastal-navy hover:bg-coastal-aqua"
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        {location.icon}
                      </div>
                    </div>

                    {/* Location Label */}
                    <div
                      className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                        hoveredLocation === location.id || selectedLocation === location.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <div className="bg-white px-3 py-1 rounded-lg shadow-lg border text-sm font-medium text-coastal-navy">
                        {location.name}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-white border-l border-t rotate-45" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {/* Animated Ripples for Selected Location */}
              {selectedLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
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
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-xs shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-200 rounded border"></div>
                    <span>Atlantic Ocean</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-200 rounded border"></div>
                    <span>Barrier Islands</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-cyan-200 rounded border"></div>
                    <span>Pamlico Sound</span>
                  </div>
                </div>
              </div>

              {/* Compass */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-coastal-navy font-bold text-sm">N</div>
                <div className="absolute top-1 w-0.5 h-4 bg-coastal-navy"></div>
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

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-coastal-navy mb-3">Top Attractions</h4>
                    <div className="space-y-2">
                      {selectedLocationData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 text-coastal-aqua" />
                          {highlight}
                        </div>
                      ))}
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
                  Click on any location pin on the map to explore properties and learn more about each destination.
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
                  {location.icon}
                  <span className="ml-2">{location.name}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
