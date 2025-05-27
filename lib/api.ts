// API integration utilities for Umbraco CMS and .NET Core backend

const UMBRACO_API_BASE = process.env.NEXT_PUBLIC_UMBRACO_API_URL || "https://your-umbraco-api.azurewebsites.net"
const BACKEND_API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://your-backend-api.azurewebsites.net"

// Umbraco CMS API calls
export const umbracoApi = {
  // Get all properties from Umbraco
  async getProperties() {
    const response = await fetch(`${UMBRACO_API_BASE}/umbraco/delivery/api/v2/content?filter=contentType:property`)
    return response.json()
  },

  // Get single property by slug
  async getProperty(slug: string) {
    const response = await fetch(`${UMBRACO_API_BASE}/umbraco/delivery/api/v2/content/item/${slug}`)
    return response.json()
  },

  // Get homepage content
  async getHomepage() {
    const response = await fetch(`${UMBRACO_API_BASE}/umbraco/delivery/api/v2/content/item/home`)
    return response.json()
  },

  // Get testimonials
  async getTestimonials() {
    const response = await fetch(`${UMBRACO_API_BASE}/umbraco/delivery/api/v2/content?filter=contentType:testimonial`)
    return response.json()
  },
}

// Backend API calls
export const backendApi = {
  // Create Stripe checkout session
  async createCheckoutSession(bookingData: {
    propertyId: string
    checkIn: Date
    checkOut: Date
    guests: number
    pricePerNight: number
  }) {
    const response = await fetch(`${BACKEND_API_BASE}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
    return response.json()
  },

  // Get user bookings
  async getUserBookings(userId: string) {
    const response = await fetch(`${BACKEND_API_BASE}/api/bookings/user/${userId}`)
    return response.json()
  },

  // Create booking
  async createBooking(bookingData: any) {
    const response = await fetch(`${BACKEND_API_BASE}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
    return response.json()
  },

  // Get owner properties
  async getOwnerProperties(ownerId: string) {
    const response = await fetch(`${BACKEND_API_BASE}/api/properties/owner/${ownerId}`)
    return response.json()
  },
}

// SWR hooks for data fetching
export const swrKeys = {
  properties: "/properties",
  property: (slug: string) => `/property/${slug}`,
  userBookings: (userId: string) => `/bookings/user/${userId}`,
  ownerProperties: (ownerId: string) => `/properties/owner/${ownerId}`,
}
