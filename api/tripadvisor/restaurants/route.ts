import { NextResponse } from "next/server"
import { tripAdvisorApi, OUTER_BANKS_LOCATION_IDS } from "@/lib/tripadvisor-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locationId = searchParams.get("locationId") || OUTER_BANKS_LOCATION_IDS.outerBanks
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

  try {
    const restaurants = await tripAdvisorApi.getRestaurants(locationId, limit)
    return NextResponse.json({ success: true, data: restaurants })
  } catch (error) {
    console.error("Error in restaurants API route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch restaurants" }, { status: 500 })
  }
}
