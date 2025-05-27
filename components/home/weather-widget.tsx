"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Wind, Droplets, Eye, Thermometer, MapPin, RefreshCw, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { WeatherService } from "@/lib/weather-service"
import { WeatherLocationMap } from "./weather-location-map"

interface WeatherData {
  current: {
    location: string
    coordinates: { lat: number; lng: number }
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    visibility: number
    uvIndex: number
    icon: string
    description: string
  }
  forecast: Array<{
    day: string
    date: string
    high: number
    low: number
    condition: string
    icon: string
    description: string
  }>
}

interface Location {
  name: string
  address: string
  display: string
  coordinates: { lat: number; lng: number }
  region?: string
}

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState("Avon, NC") // Default to Avon (central Hatteras)
  const [activeRegion, setActiveRegion] = useState<string>("hatteras")
  const [debugInfo, setDebugInfo] = useState<string>("")

  const locations: Location[] = [
    // Northern Outer Banks
    {
      name: "Corolla",
      address: "Corolla, NC",
      display: "Corolla, NC",
      coordinates: { lat: 36.3773, lng: -75.8305 },
      region: "northern",
    },
    {
      name: "Duck",
      address: "Duck, NC",
      display: "Duck, NC",
      coordinates: { lat: 36.169, lng: -75.7549 },
      region: "northern",
    },
    {
      name: "Southern Shores",
      address: "Southern Shores, NC",
      display: "Southern Shores, NC",
      coordinates: { lat: 36.1213, lng: -75.7346 },
      region: "northern",
    },
    {
      name: "Kitty Hawk",
      address: "Kitty Hawk, NC",
      display: "Kitty Hawk, NC",
      coordinates: { lat: 36.0646, lng: -75.7057 },
      region: "northern",
    },
    {
      name: "Kill Devil Hills",
      address: "Kill Devil Hills, NC",
      display: "Kill Devil Hills, NC",
      coordinates: { lat: 36.0307, lng: -75.676 },
      region: "northern",
    },
    {
      name: "Nags Head",
      address: "Nags Head, NC",
      display: "Nags Head, NC",
      coordinates: { lat: 35.9575, lng: -75.624 },
      region: "northern",
    },

    // Roanoke Island
    {
      name: "Manteo",
      address: "Manteo, NC",
      display: "Manteo, NC",
      coordinates: { lat: 35.9082, lng: -75.6757 },
      region: "roanoke",
    },
    {
      name: "Wanchese",
      address: "Wanchese, NC",
      display: "Wanchese, NC",
      coordinates: { lat: 35.847, lng: -75.6518 },
      region: "roanoke",
    },

    // Hatteras Island - The 7 Villages
    {
      name: "Rodanthe",
      address: "Rodanthe, NC",
      display: "Rodanthe, NC",
      coordinates: { lat: 35.5952, lng: -75.4658 },
      region: "hatteras",
    },
    {
      name: "Waves",
      address: "Waves, NC",
      display: "Waves, NC",
      coordinates: { lat: 35.5669, lng: -75.4669 },
      region: "hatteras",
    },
    {
      name: "Salvo",
      address: "Salvo, NC",
      display: "Salvo, NC",
      coordinates: { lat: 35.5472, lng: -75.4669 },
      region: "hatteras",
    },
    {
      name: "Avon",
      address: "Avon, NC",
      display: "Avon, NC",
      coordinates: { lat: 35.3549, lng: -75.5032 },
      region: "hatteras",
    },
    {
      name: "Buxton",
      address: "Buxton, NC",
      display: "Buxton, NC",
      coordinates: { lat: 35.2715, lng: -75.5352 },
      region: "hatteras",
    },
    {
      name: "Frisco",
      address: "Frisco, NC",
      display: "Frisco, NC",
      coordinates: { lat: 35.2271, lng: -75.6199 },
      region: "hatteras",
    },
    {
      name: "Hatteras Village",
      address: "Hatteras, NC",
      display: "Hatteras Village, NC",
      coordinates: { lat: 35.2085, lng: -75.6913 },
      region: "hatteras",
    },

    // Ocracoke Island
    {
      name: "Ocracoke",
      address: "Ocracoke, NC",
      display: "Ocracoke, NC",
      coordinates: { lat: 35.1146, lng: -75.981 },
      region: "ocracoke",
    },
  ]

  const fetchWeatherForLocation = async (address: string = selectedLocation) => {
    setLoading(true)
    setDebugInfo("Fetching weather data...")

    try {
      const weatherService = new WeatherService()
      setDebugInfo(`API Available: ${weatherService.isApiAvailable()}`)

      // Find the location coordinates
      const locationData = locations.find((loc) => loc.address === address)
      let data

      if (locationData && locationData.coordinates) {
        // Use coordinates directly if available
        data = await weatherService.getWeatherDataByCoordinates(
          locationData.coordinates.lat,
          locationData.coordinates.lng,
          locationData.display,
        )
      } else {
        // Fall back to address lookup
        data = await weatherService.getWeatherData(address)
      }

      // Ensure location is properly set
      if (!data.current.location || data.current.location === address) {
        const selectedLocationData = locations.find((loc) => loc.address === address)
        data.current.location = selectedLocationData?.display || address
      }

      setWeatherData(data)
      setDebugInfo("Weather data loaded successfully")
    } catch (error) {
      console.warn("Weather service error:", error)
      setDebugInfo(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherForLocation()
  }, [])

  if (loading && !weatherData) {
    return (
      <section className="py-20 bg-gradient-to-br from-coastal-navy/5 to-coastal-aqua/10">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Get Hatteras villages
  const hatterasVillages = locations.filter((loc) => loc.region === "hatteras")

  return (
    <section className="py-20 bg-gradient-to-br from-coastal-navy/5 to-coastal-aqua/10">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
            <MapPin className="w-4 h-4 mr-2" />
            Hatteras Island Weather
          </Badge>
          <h2 className="text-4xl font-bold text-coastal-navy mb-6">The 7 Villages of Hatteras Island</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the unique weather patterns of Hatteras Island's seven historic villages, from Rodanthe in the north
            to Hatteras Village in the south.
          </p>
        </motion.div>

        {/* Hatteras Villages Quick Select */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 border border-orange-200">
            <h3 className="text-lg font-medium text-coastal-navy mb-4">Hatteras Island Villages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {hatterasVillages.map((village) => (
                <Button
                  key={village.name}
                  variant={selectedLocation === village.address ? "default" : "outline"}
                  className={
                    selectedLocation === village.address
                      ? "bg-orange-500 hover:bg-orange-600 border-orange-600"
                      : "border-orange-200 text-orange-700 hover:bg-orange-50"
                  }
                  onClick={() => {
                    setSelectedLocation(village.address)
                    fetchWeatherForLocation(village.address)
                  }}
                >
                  {village.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Location Selector Card */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-coastal-navy">Hatteras Island Map</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => fetchWeatherForLocation()} disabled={loading}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Interactive Map */}
                <WeatherLocationMap
                  locations={locations}
                  selectedLocation={selectedLocation}
                  onLocationSelect={(location) => {
                    setSelectedLocation(location)
                    fetchWeatherForLocation(location)
                  }}
                  focusRegion="hatteras"
                />

                {/* Hatteras Island Info */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-orange-700">Hatteras Island Weather Note</h4>
                      <p className="text-sm text-muted-foreground">
                        Hatteras Island weather can differ significantly from the northern Outer Banks. The island's
                        position further into the Atlantic creates unique microclimates in each village. Weather can
                        change rapidly, especially during storm seasons.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Selector with Hatteras Focus */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-coastal-navy">Choose Location:</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value)
                      fetchWeatherForLocation(e.target.value)
                    }}
                    className="w-full p-3 border border-coastal-aqua/20 rounded-md bg-white focus:ring-2 focus:ring-coastal-aqua/20 focus:border-coastal-aqua"
                  >
                    <optgroup label="🌊 Hatteras Island Villages">
                      <option value="Rodanthe, NC">Rodanthe - Nights in Rodanthe</option>
                      <option value="Waves, NC">Waves - Windsurfing Paradise</option>
                      <option value="Salvo, NC">Salvo - Quiet Village</option>
                      <option value="Avon, NC">Avon - Central Hatteras</option>
                      <option value="Buxton, NC">Buxton - Cape Hatteras Lighthouse</option>
                      <option value="Frisco, NC">Frisco - Native American Museum</option>
                      <option value="Hatteras, NC">Hatteras Village - Ferry Terminal</option>
                    </optgroup>
                    <optgroup label="🏖️ Northern Outer Banks">
                      <option value="Corolla, NC">Corolla - Wild Horse Territory</option>
                      <option value="Duck, NC">Duck - Upscale Beach Community</option>
                      <option value="Southern Shores, NC">Southern Shores - Residential</option>
                      <option value="Kitty Hawk, NC">Kitty Hawk - Aviation History</option>
                      <option value="Kill Devil Hills, NC">Kill Devil Hills - Wright Brothers</option>
                      <option value="Nags Head, NC">Nags Head - Main Beach Town</option>
                    </optgroup>
                    <optgroup label="🏝️ Roanoke Island">
                      <option value="Manteo, NC">Manteo - Historic Waterfront</option>
                      <option value="Wanchese, NC">Wanchese - Fishing Village</option>
                    </optgroup>
                    <optgroup label="⛵ Ocracoke Island">
                      <option value="Ocracoke, NC">Ocracoke - Remote Island Paradise</option>
                    </optgroup>
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Weather Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
            {weatherData && (
              <Card className="h-full bg-gradient-to-br from-orange-100 to-coastal-navy/10 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-coastal-navy">Current Conditions</span>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">
                        {weatherData.current.condition === "Clear" || weatherData.current.condition === "Sunny"
                          ? "☀️"
                          : weatherData.current.condition.includes("Cloud")
                            ? "☁️"
                            : weatherData.current.condition === "Rain"
                              ? "🌧️"
                              : "⛅"}
                      </span>
                    </div>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{weatherData.current.location}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-coastal-navy mb-2">{weatherData.current.temperature}°F</div>
                    <div className="text-lg text-muted-foreground capitalize">{weatherData.current.description}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-orange-500" />
                      <div>
                        <div className="text-sm font-medium">{weatherData.current.humidity}%</div>
                        <div className="text-xs text-muted-foreground">Humidity</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-orange-500" />
                      <div>
                        <div className="text-sm font-medium">{weatherData.current.windSpeed} mph</div>
                        <div className="text-xs text-muted-foreground">Wind</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-orange-500" />
                      <div>
                        <div className="text-sm font-medium">{weatherData.current.visibility} mi</div>
                        <div className="text-xs text-muted-foreground">Visibility</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <div>
                        <div className="text-sm font-medium">UV {weatherData.current.uvIndex}</div>
                        <div className="text-xs text-muted-foreground">UV Index</div>
                      </div>
                    </div>
                  </div>

                  {/* Hatteras-specific info */}
                  {[
                    "Rodanthe, NC",
                    "Waves, NC",
                    "Salvo, NC",
                    "Avon, NC",
                    "Buxton, NC",
                    "Frisco, NC",
                    "Hatteras, NC",
                  ].includes(selectedLocation) && (
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-sm">
                      <h4 className="font-medium text-orange-700 mb-1">Hatteras Island Tip</h4>
                      <p className="text-muted-foreground">
                        {selectedLocation === "Rodanthe, NC" &&
                          "Rodanthe is known for strong northeast winds, making it popular for kiteboarding."}
                        {selectedLocation === "Waves, NC" &&
                          "Waves has some of the best windsurfing conditions on the East Coast due to its exposure to prevailing winds."}
                        {selectedLocation === "Salvo, NC" &&
                          "Salvo often has calmer waters on its soundside beaches, perfect for families with small children."}
                        {selectedLocation === "Avon, NC" &&
                          "Avon is centrally located on Hatteras Island with more moderate weather than the northern villages."}
                        {selectedLocation === "Buxton, NC" &&
                          "Buxton is home to Cape Hatteras Lighthouse and has unique weather patterns due to the cape's position."}
                        {selectedLocation === "Frisco, NC" &&
                          "Frisco has some of the widest beaches on Hatteras Island and is less crowded than other villages."}
                        {selectedLocation === "Hatteras, NC" &&
                          "Hatteras Village is at the southern tip of the island and often experiences different weather than the northern villages."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* 5-Day Forecast and Hatteras Weather Patterns */}
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 5-Day Forecast */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-coastal-navy">5-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4">
                    {weatherData.forecast.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
                      >
                        <div className="font-medium text-coastal-navy mb-2">{day.day}</div>
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl">
                            {day.condition === "Clear" || day.condition === "Sunny"
                              ? "☀️"
                              : day.condition.includes("Cloud")
                                ? "☁️"
                                : day.condition === "Rain"
                                  ? "🌧️"
                                  : "⛅"}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-coastal-navy">{day.high}°</div>
                        <div className="text-xs text-muted-foreground">{day.low}°</div>
                        <div className="text-xs text-muted-foreground capitalize mt-1">{day.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Hatteras Weather Patterns */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-coastal-navy">Hatteras Island Weather</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="unique">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="unique">Unique Features</TabsTrigger>
                      <TabsTrigger value="seasons">Seasonal Patterns</TabsTrigger>
                      <TabsTrigger value="activities">Best Activities</TabsTrigger>
                    </TabsList>

                    <TabsContent value="unique" className="space-y-4 pt-4">
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                        <h4 className="font-medium text-orange-700 mb-2">Microclimate Paradise</h4>
                        <p className="text-sm text-muted-foreground">
                          Hatteras Island's unique geography creates distinct microclimates across its seven villages.
                          The island's position, jutting far into the Atlantic, means it often experiences different
                          weather than the mainland or even the northern Outer Banks. The island is surrounded by water
                          on three sides, with the Pamlico Sound to the west and the Atlantic Ocean to the east and
                          south.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">The Point</h4>
                          <p className="text-sm text-muted-foreground">
                            Cape Hatteras (near Buxton) is where the Gulf Stream and the Labrador Current meet, creating
                            unique weather patterns and making it a prime fishing location. This geographic feature
                            influences weather across the entire island.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Wind Patterns</h4>
                          <p className="text-sm text-muted-foreground">
                            The northern villages (Rodanthe, Waves, Salvo) often experience stronger northeast winds,
                            while the southern villages (Buxton, Frisco, Hatteras) are more protected. This makes the
                            northern villages popular for wind sports.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="seasons" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Summer (June-August)</h4>
                          <p className="text-sm text-muted-foreground">
                            Temperatures range from 75-90°F with high humidity. Ocean breezes provide natural cooling.
                            Water temperatures reach 75-80°F. Afternoon thunderstorms are common but typically brief.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Fall (September-November)</h4>
                          <p className="text-sm text-muted-foreground">
                            The most pleasant season with temperatures 65-80°F and lower humidity. Hurricane season
                            peaks in September. Fall fishing is excellent with many migratory species passing through.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Winter (December-February)</h4>
                          <p className="text-sm text-muted-foreground">
                            Mild compared to mainland with temperatures 40-60°F. Nor'easters can bring strong winds and
                            higher tides. Many businesses close or operate limited hours.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Spring (March-May)</h4>
                          <p className="text-sm text-muted-foreground">
                            Gradually warming to 60-75°F. Spring brings steady winds, making it ideal for kite flying
                            and wind sports. Water temperatures slowly rise to 65-70°F by late May.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="activities" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Fishing</h4>
                          <p className="text-sm text-muted-foreground">
                            Best in fall and spring. The Point near Buxton is legendary for surf fishing. Hatteras
                            Village offers world-class offshore charter fishing.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Wind Sports</h4>
                          <p className="text-sm text-muted-foreground">
                            Waves and Rodanthe are premier kiteboarding and windsurfing destinations. Best conditions
                            are typically in spring and fall with steady winds.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                          <h4 className="font-medium text-orange-700 mb-2">Surfing</h4>
                          <p className="text-sm text-muted-foreground">
                            Buxton has the famous S-Curves and Lighthouse breaks. Best surfing is often during fall
                            hurricane swells (from a safe distance) and winter nor'easters.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Weather Tips */}
        {weatherData && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-coastal-navy">Hatteras Island Weather Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="beach">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="beach">Beach Day</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="fishing">Fishing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="beach" className="pt-4">
                    <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                      <p className="text-muted-foreground mb-4">
                        {weatherData.current.temperature > 75
                          ? "Perfect beach weather! Hatteras beaches have less development and more open space than northern beaches."
                          : "Cooler beach day. Hatteras beaches are known for excellent shelling, especially after storms."}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Beach Access</h4>
                          <p className="text-sm text-muted-foreground">
                            Hatteras has numerous public beach access points. 4x4 vehicles can drive on beaches with
                            proper permits from the National Park Service.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Safety</h4>
                          <p className="text-sm text-muted-foreground">
                            Hatteras beaches have stronger currents than northern beaches. Always check for rip current
                            warnings and swim near lifeguards when available.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Wildlife</h4>
                          <p className="text-sm text-muted-foreground">
                            Watch for nesting areas marked for sea turtles and shorebirds. Keep beaches clean and fill
                            in any holes dug in the sand.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="activities" className="pt-4">
                    <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                      <p className="text-muted-foreground mb-4">
                        {weatherData.current.condition.toLowerCase().includes("rain")
                          ? "Rainy day on Hatteras? Visit the Graveyard of the Atlantic Museum in Hatteras Village or the Cape Hatteras Lighthouse in Buxton."
                          : "Perfect day to explore! Consider visiting the Cape Hatteras Lighthouse or taking the ferry from Hatteras Village to Ocracoke."}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Lighthouse</h4>
                          <p className="text-sm text-muted-foreground">
                            The Cape Hatteras Lighthouse in Buxton is America's tallest brick lighthouse. Climb 257
                            steps for panoramic views (seasonal).
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Watersports</h4>
                          <p className="text-sm text-muted-foreground">
                            Waves and Rodanthe are premier kiteboarding destinations. Canadian Hole near Buxton is
                            famous for windsurfing on the sound side.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Nature</h4>
                          <p className="text-sm text-muted-foreground">
                            Explore Buxton Woods Maritime Forest or Pea Island National Wildlife Refuge for hiking and
                            birdwatching.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="fishing" className="pt-4">
                    <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                      <p className="text-muted-foreground mb-4">
                        {weatherData.current.windSpeed > 15
                          ? "High winds today. Consider sound-side fishing or check with local charters about conditions."
                          : "Good conditions for fishing. Hatteras is known as the 'Blue Marlin Capital of the World'!"}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Surf Fishing</h4>
                          <p className="text-sm text-muted-foreground">
                            Cape Point in Buxton is legendary for surf fishing. A North Carolina Coastal Recreational
                            Fishing License is required.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Charter Fishing</h4>
                          <p className="text-sm text-muted-foreground">
                            Hatteras Village has a large charter fleet for offshore fishing. Book in advance during peak
                            season.
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-orange-700 mb-2">Sound Fishing</h4>
                          <p className="text-sm text-muted-foreground">
                            The Pamlico Sound offers calmer waters and good fishing for flounder, trout, and drum. Great
                            for kayak fishing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}
