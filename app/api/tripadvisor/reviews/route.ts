import { NextResponse } from "next/server"
import { tripAdvisorApi } from "@/lib/tripadvisor-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locationId = searchParams.get("locationId")
  const limit = Number.parseInt(searchParams.get("limit") || "5", 10)

  if (!locationId) {
    return NextResponse.json({ success: false, error: "Location ID is required" }, { status: 400 })
  }

  try {
    const reviews = await tripAdvisorApi.getReviews(locationId, limit)
    return NextResponse.json({ success: true, data: reviews })
  } catch (error) {
    console.error("Error in reviews API route:", error)
    // Return sample reviews instead of an error
    const sampleReviews = tripAdvisorApi.getSampleReviews(locationId, limit)
    return NextResponse.json({
      success: true,
      data: sampleReviews,
      note: "Using sample reviews due to API authorization issue",
    })
  }
}
