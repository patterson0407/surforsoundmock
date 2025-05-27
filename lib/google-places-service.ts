interface PlacePhoto {
  photo_reference: string
  height: number
  width: number
}

interface PlaceResult {
  place_id: string
  name: string
  rating?: number
  user_ratings_total?: number
  price_level?: number
  photos?: PlacePhoto[]
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
}

interface PlaceDetails extends PlaceResult {
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
}

export class GooglePlacesService {
  private apiKey: string
  private baseUrl = "https://maps.googleapis.com/maps/api/place"

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    console.log("Google Places Service initialized:")
    console.log("API Key available:", !!this.apiKey)
    console.log("API Key length:", this.apiKey.length)
  }

  async searchAttractions(location = "Outer Banks, NC", radius = 50000): Promise<PlaceResult[]> {
    if (!this.apiKey) {
      console.log("No Google Places API key provided, using fallback data")
      return this.getFallbackAttractions()
    }

    try {
      console.log("Fetching attractions for:", location)

      // First get coordinates for the location
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${this.apiKey}`,
        { signal: AbortSignal.timeout(10000) },
      )

      if (!geocodeResponse.ok) {
        console.error("Geocoding failed with status:", geocodeResponse.status)
        throw new Error(`Geocoding failed: ${geocodeResponse.status}`)
      }

      const geocodeData = await geocodeResponse.json()
      console.log("Geocoding response:", geocodeData)

      if (!geocodeData.results?.[0]) {
        throw new Error("Location not found")
      }

      const { lat, lng } = geocodeData.results[0].geometry.location
      console.log(`Using coordinates: ${lat}, ${lng}`)

      // Search for attractions using nearby search
      const attractionTypes = ["tourist_attraction", "museum", "park", "amusement_park", "aquarium"]
      let allResults: PlaceResult[] = []

      for (const type of attractionTypes) {
        try {
          const searchUrl = `${this.baseUrl}/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${this.apiKey}`
          console.log(`Searching for ${type}:`, searchUrl.replace(this.apiKey, "API_KEY_HIDDEN"))

          const searchResponse = await fetch(searchUrl, { signal: AbortSignal.timeout(10000) })

          console.log(`${type} search response status:`, searchResponse.status)

          if (searchResponse.ok) {
            const searchData = await searchResponse.json()
            console.log(`Found ${searchData.results?.length || 0} ${type} results`)

            if (searchData.results) {
              allResults = [...allResults, ...searchData.results]
            }
          } else {
            const errorText = await searchResponse.text()
            console.error(`${type} search failed:`, errorText)
          }
        } catch (error) {
          console.warn(`Error fetching ${type}:`, error)
        }
      }

      // Remove duplicates based on place_id
      const uniqueResults = allResults.filter(
        (place, index, self) => index === self.findIndex((p) => p.place_id === place.place_id),
      )

      console.log(`Total unique attractions found: ${uniqueResults.length}`)

      // Filter for quality results and limit to top 12
      const qualityResults = uniqueResults
        .filter((place) => place.rating && place.rating >= 3.5)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12)

      console.log(`Returning ${qualityResults.length} quality attractions`)

      return qualityResults.length > 0 ? qualityResults : this.getFallbackAttractions()
    } catch (error) {
      console.error("Error fetching attractions from Google Places:", error)
      return this.getFallbackAttractions()
    }
  }

  async searchRestaurants(location = "Outer Banks, NC", radius = 50000): Promise<PlaceResult[]> {
    if (!this.apiKey) {
      console.log("No Google Places API key provided, using fallback data")
      return this.getFallbackRestaurants()
    }

    try {
      console.log("Fetching restaurants for:", location)

      // First get coordinates for the location
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${this.apiKey}`,
        { signal: AbortSignal.timeout(10000) },
      )

      if (!geocodeResponse.ok) {
        throw new Error(`Geocoding failed: ${geocodeResponse.status}`)
      }

      const geocodeData = await geocodeResponse.json()

      if (!geocodeData.results?.[0]) {
        throw new Error("Location not found")
      }

      const { lat, lng } = geocodeData.results[0].geometry.location
      console.log(`Using coordinates for restaurants: ${lat}, ${lng}`)

      // Search for restaurants and food establishments
      const foodTypes = ["restaurant", "meal_takeaway", "bar", "cafe"]
      let allResults: PlaceResult[] = []

      for (const type of foodTypes) {
        try {
          const searchUrl = `${this.baseUrl}/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${this.apiKey}`
          console.log(`Searching for ${type}:`, searchUrl.replace(this.apiKey, "API_KEY_HIDDEN"))

          const searchResponse = await fetch(searchUrl, { signal: AbortSignal.timeout(10000) })

          console.log(`${type} search response status:`, searchResponse.status)

          if (searchResponse.ok) {
            const searchData = await searchResponse.json()
            console.log(`Found ${searchData.results?.length || 0} ${type} results`)

            if (searchData.results) {
              allResults = [...allResults, ...searchData.results]
            }
          } else {
            const errorText = await searchResponse.text()
            console.error(`${type} search failed:`, errorText)
          }
        } catch (error) {
          console.warn(`Error fetching ${type}:`, error)
        }
      }

      // Remove duplicates based on place_id
      const uniqueResults = allResults.filter(
        (place, index, self) => index === self.findIndex((p) => p.place_id === place.place_id),
      )

      console.log(`Total unique restaurants found: ${uniqueResults.length}`)

      // Filter for quality results and limit to top 12
      const qualityResults = uniqueResults
        .filter((place) => place.rating && place.rating >= 3.0)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12)

      console.log(`Returning ${qualityResults.length} quality restaurants`)

      return qualityResults.length > 0 ? qualityResults : this.getFallbackRestaurants()
    } catch (error) {
      console.error("Error fetching restaurants from Google Places:", error)
      return this.getFallbackRestaurants()
    }
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
    if (!this.apiKey) {
      return null
    }

    try {
      const fields = [
        "name",
        "rating",
        "user_ratings_total",
        "photos",
        "formatted_address",
        "website",
        "formatted_phone_number",
        "reviews",
        "editorial_summary",
        "opening_hours",
        "price_level",
        "types",
        "geometry",
      ].join(",")

      const detailsUrl = `${this.baseUrl}/details/json?place_id=${placeId}&fields=${fields}&key=${this.apiKey}`
      console.log("Fetching place details:", detailsUrl.replace(this.apiKey, "API_KEY_HIDDEN"))

      const response = await fetch(detailsUrl, { signal: AbortSignal.timeout(8000) })

      if (!response.ok) {
        throw new Error("Place details request failed")
      }

      const data = await response.json()
      console.log("Place details received for:", placeId)
      return data.result
    } catch (error) {
      console.warn("Error fetching place details:", error)
      return null
    }
  }

  getPhotoUrl(photoReference: string, maxWidth = 400): string {
    if (!this.apiKey) {
      return "/placeholder.svg?height=300&width=400"
    }
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`
  }

  private getFallbackAttractions(): PlaceResult[] {
    return [
      {
        place_id: "fallback-1",
        name: "Cape Hatteras Lighthouse",
        rating: 4.7,
        user_ratings_total: 2100,
        vicinity: "Buxton, NC",
        types: ["tourist_attraction", "point_of_interest"],
        geometry: { location: { lat: 35.2518, lng: -75.5277 } },
        photos: [{ photo_reference: "fallback", height: 300, width: 400 }],
      },
      {
        place_id: "fallback-2",
        name: "Wright Brothers National Memorial",
        rating: 4.8,
        user_ratings_total: 1250,
        vicinity: "Kill Devil Hills, NC",
        types: ["tourist_attraction", "museum"],
        geometry: { location: { lat: 36.0162, lng: -75.6699 } },
        photos: [{ photo_reference: "fallback", height: 300, width: 400 }],
      },
      {
        place_id: "fallback-3",
        name: "Jockey's Ridge State Park",
        rating: 4.9,
        user_ratings_total: 890,
        vicinity: "Nags Head, NC",
        types: ["tourist_attraction", "park"],
        geometry: { location: { lat: 35.9582, lng: -75.6201 } },
        photos: [{ photo_reference: "fallback", height: 300, width: 400 }],
      },
      {
        place_id: "fallback-4",
        name: "Corolla Wild Horse Fund",
        rating: 4.9,
        user_ratings_total: 650,
        vicinity: "Corolla, NC",
        types: ["tourist_attraction", "point_of_interest"],
        geometry: { location: { lat: 36.3762, lng: -75.8269 } },
        photos: [{ photo_reference: "fallback", height: 300, width: 400 }],
      },
    ]
  }

  private getFallbackRestaurants(): PlaceResult[] {
    return [
      {
        place_id: "restaurant-1",
        name: "The Blue Point",
        rating: 4.6,
        user_ratings_total: 890,
        price_level: 3,
        vicinity: "Duck, NC",
        types: ["restaurant", "food"],
        geometry: { location: { lat: 36.1626, lng: -75.7463 } },
        photos: [{ photo_reference: "fallback", height: 300, width: 400 }],
      },
      {
        place_id: "restaurant-2",
        name: "Owen's Restaurant",
        rating: 4.5,
        user_ratings_total: 1200,
        price_level: 2,
        vicinity: "Nags Head, NC",
        types: ["restaurant", "food"],
        geometry: { location: { lat: 35.9582, lng: -75.6201 } },
        photos: [{ photo_reference: "fallback", height: 300, width: 400 }],
      },
      {
        place_id: "restaurant-3",
        name: "Awful Arthur's Oyster Bar",
        rating: 4.4,
        user_ratings_total: 750,
        price_level: 2,
        vicinity: "Kill Devil Hills, NC",
        types: ["restaurant", "bar"],
        geometry: { location: { lat: 36.0162, lng: -75.6699 } },
        photos: [{ photo_reference: "fallback", height: 300, width: 400 }],
      },
    ]
  }

  isApiAvailable(): boolean {
    return !!this.apiKey
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959 // Radius of the Earth in miles
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in miles
    return Math.round(distance * 10) / 10 // Round to 1 decimal place
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}
