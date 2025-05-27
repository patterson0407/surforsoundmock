"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import { motion } from "framer-motion"

export function SimpleMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Check if Google Maps API key exists
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error("Google Maps API key is missing")
      setMapError(true)
      return
    }

    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      script.onerror = () => {
        console.error("Failed to load Google Maps script")
        setMapError(true)
      }
      document.head.appendChild(script)
    }

    // Initialize map
    const initializeMap = () => {
      if (!mapRef.current) return

      try {
        // Center on Outer Banks (Nags Head)
        const center = { lat: 35.9575, lng: -75.624 }

        // Create map
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          scrollwheel: false,
          styles: [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#ffffff" }, { lightness: 17 }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#4e6d70" }],
            },
          ],
        })

        // Add markers for main locations
        const locations = [
          { name: "Corolla", lat: 36.3773, lng: -75.8311 },
          { name: "Duck", lat: 36.169, lng: -75.7549 },
          { name: "Kitty Hawk", lat: 36.0646, lng: -75.7057 },
          { name: "Nags Head", lat: 35.9575, lng: -75.624 },
          { name: "Rodanthe", lat: 35.5935, lng: -75.4667 },
          { name: "Buxton", lat: 35.2668, lng: -75.541 },
          { name: "Ocracoke", lat: 35.1146, lng: -75.981 },
        ]

        locations.forEach((location) => {
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map,
            title: location.name,
            animation: google.maps.Animation.DROP,
          })

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px; font-size: 16px; color: #2563eb;">${location.name}</h3>
              <p style="margin: 0; font-size: 14px;">Explore vacation rentals in ${location.name}, Outer Banks.</p>
              <a href="/properties?location=${location.name.toLowerCase()}" 
                 style="display: inline-block; margin-top: 8px; color: #2563eb; font-size: 14px; text-decoration: underline;">
                 View Properties
              </a>
            </div>`,
          })

          marker.addListener("click", () => {
            infoWindow.open(map, marker)
          })
        })

        setMapLoaded(true)
      } catch (error) {
        console.error("Error initializing map:", error)
        setMapError(true)
      }
    }

    // Check if Google Maps is already loaded
    if (typeof google !== "undefined" && typeof google.maps !== "undefined") {
      initializeMap()
    } else {
      loadGoogleMapsScript()
    }

    // Cleanup
    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge className="mb-4 bg-coastal-navy/10 text-coastal-navy border-coastal-navy/20">
            Explore the Outer Banks
          </Badge>
          <h2 className="text-4xl font-bold text-coastal-navy mb-6">Find Your Perfect Location</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our vacation rentals across the beautiful Outer Banks, from Corolla to Ocracoke. Click on the map
            markers to explore properties in each area.
          </p>
        </motion.div>

        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0">
            {mapError ? (
              <div className="flex flex-col items-center justify-center p-12 bg-gray-50 text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Map Currently Unavailable</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Our interactive map is temporarily unavailable. Please use our search filters to find properties by
                  location.
                </p>
                <Button className="bg-coastal-navy hover:bg-coastal-navy/90">
                  <Navigation className="mr-2 h-4 w-4" />
                  Browse Properties
                </Button>
              </div>
            ) : (
              <div className="relative">
                <div
                  ref={mapRef}
                  className="w-full h-[500px]"
                  aria-label="Map of Outer Banks vacation rental locations"
                />

                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-coastal-navy border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                      <p className="mt-4 text-muted-foreground">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
