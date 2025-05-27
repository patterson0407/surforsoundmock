"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

interface ApiTestResult {
  name: string
  status: "success" | "error" | "testing" | "idle"
  message: string
  details?: any
}

export function ApiDebugPanel() {
  const [results, setResults] = useState<ApiTestResult[]>([
    { name: "Google Maps API", status: "idle", message: "Not tested" },
    { name: "OpenWeather API", status: "idle", message: "Not tested" },
    { name: "Google Places API", status: "idle", message: "Not tested" },
  ])

  const updateResult = (name: string, status: ApiTestResult["status"], message: string, details?: any) => {
    setResults((prev) =>
      prev.map((result) => (result.name === name ? { ...result, status, message, details } : result)),
    )
  }

  const testGoogleMapsApi = async () => {
    updateResult("Google Maps API", "testing", "Testing...")

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

      if (!apiKey) {
        updateResult("Google Maps API", "error", "API key not found in environment variables")
        return
      }

      // Test geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=Nags+Head,+NC&key=${apiKey}`,
      )

      const data = await response.json()

      if (response.ok && data.status === "OK") {
        updateResult("Google Maps API", "success", `✅ Working! Found ${data.results.length} results`, {
          status: data.status,
          results: data.results.length,
          location: data.results[0]?.formatted_address,
        })
      } else {
        updateResult("Google Maps API", "error", `❌ Error: ${data.error_message || data.status}`, data)
      }
    } catch (error) {
      updateResult("Google Maps API", "error", `❌ Network error: ${error}`)
    }
  }

  const testOpenWeatherApi = async () => {
    updateResult("OpenWeather API", "testing", "Testing...")

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

      if (!apiKey) {
        updateResult("OpenWeather API", "error", "API key not found in environment variables")
        return
      }

      // Test current weather API
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=35.9582&lon=-75.6201&appid=${apiKey}&units=imperial&exclude=minutely,hourly,alerts`,
      )

      if (response.ok) {
        const data = await response.json()
        updateResult("OpenWeather API", "success", `✅ Working! Current temp: ${Math.round(data.current.temp)}°F`, {
          temperature: data.current.temp,
          condition: data.current.weather[0].main,
          location: "Nags Head, NC",
        })
      } else {
        const errorData = await response.text()
        updateResult("OpenWeather API", "error", `❌ HTTP ${response.status}: ${errorData}`, {
          status: response.status,
          error: errorData,
        })
      }
    } catch (error) {
      updateResult("OpenWeather API", "error", `❌ Network error: ${error}`)
    }
  }

  const testGooglePlacesApi = async () => {
    updateResult("Google Places API", "testing", "Testing...")

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

      if (!apiKey) {
        updateResult("Google Places API", "error", "API key not found in environment variables")
        return
      }

      // Test places search
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+Outer+Banks+NC&key=${apiKey}`,
      )

      const data = await response.json()

      if (response.ok && data.status === "OK") {
        updateResult("Google Places API", "success", `✅ Working! Found ${data.results.length} places`, {
          status: data.status,
          results: data.results.length,
          firstPlace: data.results[0]?.name,
        })
      } else {
        updateResult("Google Places API", "error", `❌ Error: ${data.error_message || data.status}`, data)
      }
    } catch (error) {
      updateResult("Google Places API", "error", `❌ Network error: ${error}`)
    }
  }

  const testAllApis = async () => {
    await testGoogleMapsApi()
    await testOpenWeatherApi()
    await testGooglePlacesApi()
  }

  const getStatusIcon = (status: ApiTestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "testing":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: ApiTestResult["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "testing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>API Integration Debug Panel</span>
          <Button onClick={testAllApis} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Test All APIs
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Environment Variables Check */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium mb-2">Environment Variables</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span>Google Maps API Key:</span>
                <Badge variant={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "default" : "destructive"}>
                  {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "✅ Set" : "❌ Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>OpenWeather API Key:</span>
                <Badge variant={process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ? "default" : "destructive"}>
                  {process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ? "✅ Set" : "❌ Missing"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <h4 className="font-medium mb-2">API Key Lengths</h4>
            <div className="space-y-1 text-sm">
              <div>Google Maps: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.length || 0} chars</div>
              <div>OpenWeather: {process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY?.length || 0} chars</div>
            </div>
          </div>

          <div className="p-3 border rounded-lg">
            <h4 className="font-medium mb-2">Expected Lengths</h4>
            <div className="space-y-1 text-sm">
              <div>Google Maps: ~39 chars</div>
              <div>OpenWeather: ~32 chars</div>
            </div>
          </div>
        </div>

        {/* API Test Results */}
        <div className="space-y-3">
          {results.map((result) => (
            <div key={result.name} className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(result.status)}
                  <span className="font-medium">{result.name}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (result.name === "Google Maps API") testGoogleMapsApi()
                    if (result.name === "OpenWeather API") testOpenWeatherApi()
                    if (result.name === "Google Places API") testGooglePlacesApi()
                  }}
                  disabled={result.status === "testing"}
                >
                  Test
                </Button>
              </div>
              <div className="text-sm">{result.message}</div>
              {result.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs opacity-70">Show Details</summary>
                  <pre className="mt-1 text-xs bg-black/10 p-2 rounded overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        {/* Common Issues */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium mb-2">Common Issues & Solutions:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • <strong>401 Unauthorized:</strong> Invalid API key or key not activated
            </li>
            <li>
              • <strong>403 Forbidden:</strong> API not enabled or billing not set up
            </li>
            <li>
              • <strong>429 Too Many Requests:</strong> Rate limit exceeded
            </li>
            <li>
              • <strong>CORS Error:</strong> API key restrictions or domain not allowed
            </li>
            <li>
              • <strong>Network Error:</strong> Check internet connection or firewall
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
