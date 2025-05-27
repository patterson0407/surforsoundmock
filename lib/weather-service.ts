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

interface OpenWeatherResponse {
  current: {
    temp: number
    humidity: number
    wind_speed: number
    visibility: number
    uvi: number
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
  }
  daily: Array<{
    dt: number
    temp: {
      max: number
      min: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
  }>
}

interface GoogleGeocodingResponse {
  results: Array<{
    formatted_address: string
    geometry: {
      location: { lat: number; lng: number }
    }
  }>
}

export class WeatherService {
  private googleApiKey: string
  private weatherApiKey: string
  private baseUrl = "https://api.openweathermap.org/data/3.0/onecall"
  private geocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json"

  constructor() {
    this.googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    this.weatherApiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || ""

    console.log("Weather Service initialized:")
    console.log("Google API Key available:", !!this.googleApiKey)
    console.log("Weather API Key available:", !!this.weatherApiKey)
    console.log("Weather API Key length:", this.weatherApiKey.length)
  }

  async getLocationFromGoogle(
    address = "Nags Head, NC",
  ): Promise<{ lat: number; lng: number; formattedAddress: string }> {
    if (!this.googleApiKey) {
      console.log("No Google API key, using default coordinates")
      return { lat: 35.9582, lng: -75.6201, formattedAddress: "Nags Head, NC" }
    }

    try {
      const response = await fetch(
        `${this.geocodingUrl}?address=${encodeURIComponent(address)}&key=${this.googleApiKey}`,
        { signal: AbortSignal.timeout(8000) },
      )

      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`)
      }

      const data: GoogleGeocodingResponse = await response.json()

      if (data.results && data.results.length > 0) {
        const result = data.results[0]
        console.log(`Geocoded ${address} to:`, result.geometry.location)
        return {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          formattedAddress: result.formatted_address,
        }
      }
    } catch (error) {
      console.warn("Google Geocoding error:", error)
    }

    // Fallback coordinates for common Outer Banks locations
    const fallbackCoords: Record<string, { lat: number; lng: number }> = {
      "Corolla, NC": { lat: 36.3762, lng: -75.8269 },
      "Duck, NC": { lat: 36.1626, lng: -75.7463 },
      "Southern Shores, NC": { lat: 36.1162, lng: -75.7199 },
      "Kitty Hawk, NC": { lat: 36.0626, lng: -75.7016 },
      "Kill Devil Hills, NC": { lat: 36.0162, lng: -75.6699 },
      "Nags Head, NC": { lat: 35.9582, lng: -75.6201 },
      "Manteo, NC": { lat: 35.9087, lng: -75.6699 },
      "Wanchese, NC": { lat: 35.8418, lng: -75.6516 },
      "Rodanthe, NC": { lat: 35.5918, lng: -75.4682 },
      "Waves, NC": { lat: 35.5851, lng: -75.4607 },
      "Salvo, NC": { lat: 35.5451, lng: -75.4296 },
      "Avon, NC": { lat: 35.3518, lng: -75.5032 },
      "Buxton, NC": { lat: 35.2518, lng: -75.5277 },
      "Frisco, NC": { lat: 35.2368, lng: -75.6277 },
      "Hatteras Village, NC": { lat: 35.2087, lng: -75.6877 },
      "Ocracoke, NC": { lat: 35.1151, lng: -75.9877 },
    }

    const coords = fallbackCoords[address] || { lat: 35.9582, lng: -75.6201 }
    return { ...coords, formattedAddress: address }
  }

  async getWeatherData(address?: string): Promise<WeatherData> {
    // Get precise location using Google Maps API
    const location = await this.getLocationFromGoogle(address)
    return this.getWeatherDataByCoordinates(location.lat, location.lng, location.formattedAddress)
  }

  async getWeatherDataByCoordinates(lat: number, lng: number, locationName: string): Promise<WeatherData> {
    if (!this.weatherApiKey) {
      console.log("No weather API key found, using fallback data")
      return this.getRealisticWeatherData({ lat, lng, formattedAddress: locationName })
    }

    try {
      // Use the OneCall 3.0 API with the exact URL format provided
      const weatherUrl = `${this.baseUrl}?lat=${lat}&lon=${lng}&appid=${this.weatherApiKey}&units=imperial&exclude=minutely,hourly,alerts`
      console.log("Fetching weather from:", weatherUrl.replace(this.weatherApiKey, "API_KEY_HIDDEN"))

      const response = await fetch(weatherUrl, {
        signal: AbortSignal.timeout(10000),
        headers: {
          Accept: "application/json",
        },
      })

      console.log("Weather API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Weather API error response:", errorText)

        if (response.status === 401) {
          console.error("Weather API authentication failed - API key may be invalid or not activated")
        } else if (response.status === 403) {
          console.error("Weather API access forbidden - subscription may be required for OneCall 3.0")
        }

        throw new Error(`Weather API request failed with status: ${response.status}`)
      }

      const data: OpenWeatherResponse = await response.json()
      console.log("Weather API response received successfully")

      return {
        current: {
          location: locationName,
          coordinates: { lat, lng },
          temperature: Math.round(data.current.temp),
          condition: data.current.weather[0].main,
          humidity: data.current.humidity,
          windSpeed: Math.round(data.current.wind_speed),
          visibility: Math.round(data.current.visibility / 1609.34), // Convert meters to miles
          uvIndex: Math.round(data.current.uvi),
          icon: data.current.weather[0].icon,
          description: data.current.weather[0].description,
        },
        forecast: data.daily.slice(0, 5).map((day, index) => ({
          day: index === 0 ? "Today" : new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" }),
          date: new Date(day.dt * 1000).toLocaleDateString(),
          high: Math.round(day.temp.max),
          low: Math.round(day.temp.min),
          condition: day.weather[0].main,
          icon: day.weather[0].icon,
          description: day.weather[0].description,
        })),
      }
    } catch (error) {
      console.error("Error fetching real weather data:", error)
      return this.getRealisticWeatherData({ lat, lng, formattedAddress: locationName })
    }
  }

  private getRealisticWeatherData(location: { lat: number; lng: number; formattedAddress: string }): WeatherData {
    console.log("Using fallback weather data for:", location.formattedAddress)

    const now = new Date()
    const month = now.getMonth()

    // Seasonal temperature adjustments for Outer Banks based on real data
    let baseTemp = 75
    let condition = "Clear"
    let icon = "01d"

    if (month >= 11 || month <= 2) {
      baseTemp = 55
      condition = "Partly Cloudy"
      icon = "02d"
    } else if (month >= 3 && month <= 5) {
      baseTemp = 68
      condition = "Clear"
      icon = "01d"
    } else if (month >= 6 && month <= 8) {
      baseTemp = 82
      condition = "Sunny"
      icon = "01d"
    } else {
      baseTemp = 70
      condition = "Few Clouds"
      icon = "02d"
    }

    const tempVariation = Math.floor(Math.random() * 8) - 4
    const currentTemp = baseTemp + tempVariation

    return {
      current: {
        location: location.formattedAddress,
        coordinates: { lat: location.lat, lng: location.lng },
        temperature: currentTemp,
        condition: condition,
        humidity: 65 + Math.floor(Math.random() * 20),
        windSpeed: 8 + Math.floor(Math.random() * 10),
        visibility: 10,
        uvIndex: Math.max(1, Math.min(10, Math.floor(Math.random() * 8) + 2)),
        icon: icon,
        description: condition.toLowerCase(),
      },
      forecast: Array.from({ length: 5 }, (_, index) => {
        const futureDate = new Date(now.getTime() + index * 24 * 60 * 60 * 1000)
        const dayTemp = baseTemp + Math.floor(Math.random() * 10) - 5
        const conditions = ["Clear", "Few Clouds", "Scattered Clouds", "Partly Cloudy", "Sunny"]
        const icons = ["01d", "02d", "03d", "02d", "01d"]
        const randomCondition = Math.floor(Math.random() * conditions.length)

        return {
          day: index === 0 ? "Today" : futureDate.toLocaleDateString("en-US", { weekday: "long" }),
          date: futureDate.toLocaleDateString(),
          high: dayTemp + 5,
          low: dayTemp - 8,
          condition: conditions[randomCondition],
          icon: icons[randomCondition],
          description: conditions[randomCondition].toLowerCase(),
        }
      }),
    }
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  isApiAvailable(): boolean {
    return !!this.weatherApiKey && !!this.googleApiKey
  }
}
