import { NextResponse } from "next/server"
import { tripAdvisorApi, OUTER_BANKS_LOCATION_IDS } from "@/lib/tripadvisor-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locationId = searchParams.get("locationId") || OUTER_BANKS_LOCATION_IDS.outerBanks
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10)

  try {
    const attractions = await tripAdvisorApi.getAttractions(locationId, limit)
    return NextResponse.json({ success: true, data: attractions })
  } catch (error) {
    console.error("Error in attractions API route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch attractions" }, { status: 500 })
  }
}
