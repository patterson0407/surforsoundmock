"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

declare global {
  interface Window {
    google: typeof google
  }
}

interface Location {
  name: string
  address: string
  display: string
  coordinates: { lat: number; lng: number }
  region?: string
}

interface WeatherLocationMapProps {
  locations: Location[]
  selectedLocation: string
  onLocationSelect: (location: string) => void
  focusRegion?: string
}

export function WeatherLocationMap({
  locations,
  selectedLocation,
  onLocationSelect,
  focusRegion = "hatteras",
}: WeatherLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const markersRef = useRef<google.maps.Marker[]>([])
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    // Function to initialize the map
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return
      console.log("Initializing Google Maps...")

      try {
        // Set initial center based on focus region
        let initialCenter = { lat: 35.9246, lng: -75.6258 } // Default: central Outer Banks
        let initialZoom = 9

        // If focusing on Hatteras Island, center there
        if (focusRegion === "hatteras") {
          initialCenter = { lat: 35.4, lng: -75.5 } // Center of Hatteras Island
          initialZoom = 10
        }

        // Create map instance
        const mapOptions = {
          center: initialCenter,
          zoom: initialZoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#00cccc" }, { lightness: 17 }],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f2" }, { lightness: 20 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#ffffff" }, { lightness: 17 }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 18 }],
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 16 }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f2" }, { lightness: 21 }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#dedede" }, { lightness: 21 }],
            },
          ],
        }

        const map = new google.maps.Map(mapRef.current, mapOptions)
        mapInstanceRef.current = map

        // Add markers for each location
        const bounds = new google.maps.LatLngBounds()

        // Filter locations if focusing on a specific region
        const locationsToShow =
          focusRegion === "hatteras"
            ? locations.filter((loc) =>
                ["Rodanthe", "Waves", "Salvo", "Avon", "Buxton", "Frisco", "Hatteras Village"].some((village) =>
                  loc.display.includes(village),
                ),
              )
            : locations

        // If we're focusing on Hatteras but still want to show all locations
        // just use all locations instead of the filtered ones
        const markersToShow = locations

        markersToShow.forEach((location) => {
          // Determine if this is a Hatteras village
          const isHatterasVillage = ["Rodanthe", "Waves", "Salvo", "Avon", "Buxton", "Frisco", "Hatteras Village"].some(
            (village) => location.display.includes(village),
          )

          // Create marker with special styling for Hatteras villages
          const marker = new google.maps.Marker({
            position: location.coordinates,
            map: map,
            title: location.display,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: location.address === selectedLocation ? 12 : isHatterasVillage ? 10 : 8,
              fillColor: location.address === selectedLocation ? "#003366" : isHatterasVillage ? "#ff6600" : "#00cccc",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
            animation: location.address === selectedLocation ? google.maps.Animation.BOUNCE : null,
          })

          // Add click listener
          marker.addListener("click", () => {
            onLocationSelect(location.address)
          })

          markersRef.current.push(marker)

          // Only include Hatteras villages in bounds if focusing on Hatteras
          if (focusRegion === "hatteras") {
            if (isHatterasVillage) {
              bounds.extend(location.coordinates)
            }
          } else {
            bounds.extend(location.coordinates)
          }
        })

        // Fit map to bounds if we have locations
        if (markersRef.current.length > 0) {
          map.fitBounds(bounds)

          // Add a slight zoom out to show context
          google.maps.event.addListenerOnce(map, "bounds_changed", () => {
            map.setZoom(map.getZoom() - 0.5)
          })
        }

        // Listen for idle event to know when map is fully loaded
        google.maps.event.addListenerOnce(map, "idle", () => {
          console.log("Map fully loaded and idle")
          setIsLoading(false)
        })

        // Also set a timeout as a fallback
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        console.error("Error initializing map:", error)
        setIsLoading(false)
      }
    }

    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        console.log("Google Maps already loaded")
        initializeMap()
        return
      }

      console.log("Loading Google Maps API...")
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log("Google Maps API loaded")
        initializeMap()
      }
      document.head.appendChild(script)
    }

    loadGoogleMaps()

    return () => {
      // Clean up markers
      if (markersRef.current.length > 0) {
        markersRef.current.forEach((marker) => marker.setMap(null))
        markersRef.current = []
      }
    }
  }, [focusRegion])

  // Update markers when selected location changes
  useEffect(() => {
    if (markersRef.current.length > 0 && window.google) {
      markersRef.current.forEach((marker, index) => {
        const location = locations[index]

        // Determine if this is a Hatteras village
        const isHatterasVillage = ["Rodanthe", "Waves", "Salvo", "Avon", "Buxton", "Frisco", "Hatteras Village"].some(
          (village) => location.display.includes(village),
        )

        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: location.address === selectedLocation ? 12 : isHatterasVillage ? 10 : 8,
          fillColor: location.address === selectedLocation ? "#003366" : isHatterasVillage ? "#ff6600" : "#00cccc",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        })

        marker.setAnimation(location.address === selectedLocation ? google.maps.Animation.BOUNCE : null)
      })
    }
  }, [selectedLocation, locations])

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-inner">
      <div ref={mapRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-coastal-aqua" />
            <span className="text-sm text-muted-foreground">Loading map...</span>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-2 right-2 bg-white rounded-md shadow-md p-2 z-10 text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-coastal-aqua mr-1"></div>
          <span>Outer Banks</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
          <span>Hatteras Villages</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-coastal-navy mr-1"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  )
}
