interface GoogleMapsConfig {
  center: { lat: number; lng: number }
  zoom: number
  mapTypeId: string
}

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

export class GoogleMapsService {
  private apiKey: string
  private map: google.maps.Map | null = null
  private markers: google.maps.Marker[] = []
  private infoWindows: google.maps.InfoWindow[] = []

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  }

  async loadGoogleMaps(): Promise<void> {
    if (typeof window !== "undefined" && !window.google) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places,geometry`
        script.async = true
        script.defer = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error("Failed to load Google Maps"))
        document.head.appendChild(script)
      })
    }
  }

  async initializeMap(container: HTMLElement, config: GoogleMapsConfig): Promise<google.maps.Map> {
    await this.loadGoogleMaps()

    if (!window.google) {
      throw new Error("Google Maps failed to load")
    }

    this.map = new google.maps.Map(container, {
      center: config.center,
      zoom: config.zoom,
      mapTypeId: config.mapTypeId as google.maps.MapTypeId,
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
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
    })

    return this.map
  }

  createCustomMarker(location: MapLocation, onClick?: (location: MapLocation) => void): google.maps.Marker {
    if (!this.map) throw new Error("Map not initialized")

    // Create custom marker icon based on type
    const getMarkerIcon = (type: string) => {
      const baseIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        strokeColor: "#003366",
        strokeWeight: 3,
        fillOpacity: 1,
      }

      switch (type) {
        case "town":
          return { ...baseIcon, fillColor: "#00cccc" }
        case "attraction":
          return { ...baseIcon, fillColor: "#ff6b6b" }
        case "restaurant":
          return { ...baseIcon, fillColor: "#4ecdc4" }
        default:
          return { ...baseIcon, fillColor: "#00cccc" }
      }
    }

    const marker = new google.maps.Marker({
      position: location.position,
      map: this.map,
      title: location.name,
      icon: getMarkerIcon(location.type),
      animation: google.maps.Animation.DROP,
    })

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
      content: this.createInfoWindowContent(location),
    })

    // Add click listener
    marker.addListener("click", () => {
      // Close all other info windows
      this.infoWindows.forEach((iw) => iw.close())

      // Open this info window
      infoWindow.open(this.map, marker)

      // Call custom onClick if provided
      if (onClick) {
        onClick(location)
      }
    })

    // Add hover effects
    marker.addListener("mouseover", () => {
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => marker.setAnimation(null), 750)
    })

    this.markers.push(marker)
    this.infoWindows.push(infoWindow)

    return marker
  }

  private createInfoWindowContent(location: MapLocation): string {
    return `
      <div style="max-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #003366; font-size: 18px; font-weight: 600;">
          ${location.name}
        </h3>
        <p style="margin: 0 0 12px 0; color: #666; font-size: 14px; line-height: 1.4;">
          ${location.description}
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 12px;">
          <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: #003366;">${location.properties}</div>
            <div style="font-size: 12px; color: #666;">Properties</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: #003366;">$${location.avgPrice}</div>
            <div style="font-size: 12px; color: #666;">Avg/night</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: bold; color: #003366;">${location.rating}</div>
            <div style="font-size: 12px; color: #666;">Rating</div>
          </div>
        </div>
        <div style="margin-bottom: 12px;">
          <strong style="color: #003366; font-size: 14px;">Top Attractions:</strong>
          <ul style="margin: 4px 0 0 0; padding-left: 16px; font-size: 13px; color: #666;">
            ${location.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
          </ul>
        </div>
        <button 
          onclick="window.open('/properties?location=${encodeURIComponent(location.name)}', '_self')"
          style="
            width: 100%; 
            padding: 8px 16px; 
            background: #00cccc; 
            color: #003366; 
            border: none; 
            border-radius: 6px; 
            font-weight: 600; 
            cursor: pointer;
            font-size: 14px;
          "
        >
          View Properties
        </button>
      </div>
    `
  }

  async searchNearbyPlaces(center: { lat: number; lng: number }, type: string, radius = 25000) {
    if (!this.map) throw new Error("Map not initialized")

    const service = new google.maps.places.PlacesService(this.map)

    return new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location: center,
        radius: radius,
        type: type as any,
      }

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results)
        } else {
          reject(new Error(`Places search failed: ${status}`))
        }
      })
    })
  }

  addPlacesMarkers(places: google.maps.places.PlaceResult[], type: "attraction" | "restaurant") {
    places.forEach((place) => {
      if (place.geometry?.location) {
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          title: place.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: type === "attraction" ? "#ff6b6b" : "#4ecdc4",
            strokeWeight: 2,
            fillColor: type === "attraction" ? "#ff6b6b" : "#4ecdc4",
            fillOpacity: 0.8,
          },
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="max-width: 250px;">
              <h4 style="margin: 0 0 8px 0; color: #003366;">${place.name}</h4>
              ${place.rating ? `<div style="margin-bottom: 8px;">⭐ ${place.rating} (${place.user_ratings_total || 0} reviews)</div>` : ""}
              ${place.vicinity ? `<div style="color: #666; font-size: 13px; margin-bottom: 8px;">📍 ${place.vicinity}</div>` : ""}
              <button 
                onclick="window.open('https://www.google.com/maps/place/?q=place_id:${place.place_id}', '_blank')"
                style="
                  padding: 6px 12px; 
                  background: #00cccc; 
                  color: #003366; 
                  border: none; 
                  border-radius: 4px; 
                  font-size: 12px;
                  cursor: pointer;
                "
              >
                View on Google Maps
              </button>
            </div>
          `,
        })

        marker.addListener("click", () => {
          this.infoWindows.forEach((iw) => iw.close())
          infoWindow.open(this.map, marker)
        })

        this.markers.push(marker)
        this.infoWindows.push(infoWindow)
      }
    })
  }

  clearMarkers() {
    this.markers.forEach((marker) => marker.setMap(null))
    this.markers = []
    this.infoWindows = []
  }

  fitBounds(locations: MapLocation[]) {
    if (!this.map || locations.length === 0) return

    const bounds = new google.maps.LatLngBounds()
    locations.forEach((location) => {
      bounds.extend(location.position)
    })
    this.map.fitBounds(bounds)
  }

  isApiAvailable(): boolean {
    return !!this.apiKey
  }

  // Get fallback locations if API is not available
  getFallbackLocations(): MapLocation[] {
    return [
      {
        id: "corolla",
        name: "Corolla",
        position: { lat: 36.3762, lng: -75.8269 },
        properties: 18,
        avgPrice: 650,
        rating: 4.9,
        description: "Home to wild horses and luxury estates",
        highlights: ["Wild Horse Tours", "Currituck Beach Lighthouse", "Luxury Estates"],
        type: "town",
      },
      {
        id: "duck",
        name: "Duck",
        position: { lat: 36.1626, lng: -75.7463 },
        properties: 22,
        avgPrice: 380,
        rating: 4.9,
        description: "Charming town with soundside charm",
        highlights: ["Duck Boardwalk", "Soundside Dining", "Family Beaches"],
        type: "town",
      },
      {
        id: "kitty-hawk",
        name: "Kitty Hawk",
        position: { lat: 36.0162, lng: -75.6699 },
        properties: 35,
        avgPrice: 320,
        rating: 4.7,
        description: "Birthplace of flight with family-friendly beaches",
        highlights: ["Wright Brothers Memorial", "Family Beaches", "Fishing Pier"],
        type: "town",
      },
      {
        id: "nags-head",
        name: "Nags Head",
        position: { lat: 35.9582, lng: -75.6201 },
        properties: 28,
        avgPrice: 450,
        rating: 4.8,
        description: "Famous for its fishing pier and beautiful beaches",
        highlights: ["Jockey's Ridge State Park", "Nags Head Pier", "Beach Access"],
        type: "town",
      },
      {
        id: "cape-hatteras",
        name: "Cape Hatteras",
        position: { lat: 35.2518, lng: -75.5277 },
        properties: 15,
        avgPrice: 520,
        rating: 4.8,
        description: "Iconic lighthouse and pristine beaches",
        highlights: ["Cape Hatteras Lighthouse", "National Seashore", "Surfing"],
        type: "town",
      },
    ]
  }
}
