// TripAdvisor Content API service
// Documentation: https://developer-tripadvisor.com/content-api/

// Note: You'll need to register for the TripAdvisor Content API at:
// https://developer-tripadvisor.com/content-api/request-api-access/

// API key should be stored as an environment variable
const TRIPADVISOR_API_KEY = process.env.TRIPADVISOR_API_KEY || ""
const TRIPADVISOR_API_URL = "https://api.content.tripadvisor.com/api/v1"

// Debug logging
if (typeof window === "undefined") {
  console.log("TripAdvisor API Key available:", !!TRIPADVISOR_API_KEY)
  console.log("TripAdvisor API Key length:", TRIPADVISOR_API_KEY.length)
}

// Location IDs for Outer Banks areas
export const OUTER_BANKS_LOCATION_IDS = {
  outerBanks: "49022", // Main Outer Banks region
  nagsHead: "58541", // Nags Head
  killDevilHills: "49256", // Kill Devil Hills
  kittyHawk: "49253", // Kitty Hawk
  duck: "49242", // Duck
  corolla: "49233", // Corolla
  hatteras: "49248", // Hatteras
  ocracoke: "49265", // Ocracoke
  manteo: "49260", // Manteo
  rodanthe: "49270", // Rodanthe
  buxton: "49229", // Buxton
  avon: "49223", // Avon
  waves: "1815223", // Waves
  salvo: "3476045", // Salvo
  frisco: "49245", // Frisco
}

// Types for TripAdvisor API responses
export interface TripAdvisorAttraction {
  location_id: string
  name: string
  description?: string
  web_url: string
  address_obj: {
    street1: string
    city: string
    state: string
    country: string
    postalcode: string
  }
  rating?: number
  num_reviews?: number
  photo?: {
    images: {
      small: { url: string }
      medium: { url: string }
      large: { url: string }
    }
  }
  category?: {
    name: string
  }
}

export interface TripAdvisorRestaurant {
  location_id: string
  name: string
  description?: string
  web_url: string
  address_obj: {
    street1: string
    city: string
    state: string
    country: string
    postalcode: string
  }
  rating?: number
  num_reviews?: number
  price_level?: string
  cuisine?: Array<{ name: string }>
  photo?: {
    images: {
      small: { url: string }
      medium: { url: string }
      large: { url: string }
    }
  }
}

export interface TripAdvisorReview {
  id: string
  title: string
  text: string
  rating: number
  published_date: string
  user: {
    username: string
  }
}

// Sample data for fallback when API is unavailable
const sampleAttractions: TripAdvisorAttraction[] = [
  {
    location_id: "1",
    name: "Cape Hatteras Lighthouse",
    description: "Historic lighthouse offering panoramic views of the Atlantic Ocean and Pamlico Sound.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "46379 Lighthouse Rd",
      city: "Buxton",
      state: "NC",
      country: "United States",
      postalcode: "27920",
    },
    rating: 4.8,
    num_reviews: 3245,
    photo: {
      images: {
        small: { url: "/cape-hatteras-lighthouse.png" },
        medium: { url: "/cape-hatteras-lighthouse.png" },
        large: { url: "/cape-hatteras-lighthouse.png" },
      },
    },
    category: {
      name: "Historic Site",
    },
  },
  {
    location_id: "2",
    name: "Wright Brothers National Memorial",
    description: "Historic site commemorating the first successful airplane flights.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "1000 N Croatan Hwy",
      city: "Kill Devil Hills",
      state: "NC",
      country: "United States",
      postalcode: "27948",
    },
    rating: 4.7,
    num_reviews: 4123,
    photo: {
      images: {
        small: { url: "/kitty-hawk-memorial.png" },
        medium: { url: "/kitty-hawk-memorial.png" },
        large: { url: "/kitty-hawk-memorial.png" },
      },
    },
    category: {
      name: "Historic Site",
    },
  },
  {
    location_id: "3",
    name: "Corolla Wild Horse Tours",
    description: "See the famous wild Spanish Mustangs roaming freely on the northern beaches.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "1210 Ocean Trail",
      city: "Corolla",
      state: "NC",
      country: "United States",
      postalcode: "27927",
    },
    rating: 4.9,
    num_reviews: 2876,
    photo: {
      images: {
        small: { url: "/corolla-wild-horses-beach.png" },
        medium: { url: "/corolla-wild-horses-beach.png" },
        large: { url: "/corolla-wild-horses-beach.png" },
      },
    },
    category: {
      name: "Nature & Wildlife Tour",
    },
  },
  {
    location_id: "4",
    name: "Jockey's Ridge State Park",
    description: "Home to the tallest natural sand dune system in the Eastern United States.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "300 W Carolista Dr",
      city: "Nags Head",
      state: "NC",
      country: "United States",
      postalcode: "27959",
    },
    rating: 4.8,
    num_reviews: 3567,
    photo: {
      images: {
        small: { url: "/nags-head-pier-beach.png" },
        medium: { url: "/nags-head-pier-beach.png" },
        large: { url: "/nags-head-pier-beach.png" },
      },
    },
    category: {
      name: "State Park",
    },
  },
  {
    location_id: "5",
    name: "Duck Boardwalk",
    description: "Scenic boardwalk along Currituck Sound with shops and restaurants.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "1200 Duck Rd",
      city: "Duck",
      state: "NC",
      country: "United States",
      postalcode: "27949",
    },
    rating: 4.6,
    num_reviews: 1987,
    photo: {
      images: {
        small: { url: "/north-carolina-duck-boardwalk.png" },
        medium: { url: "/north-carolina-duck-boardwalk.png" },
        large: { url: "/north-carolina-duck-boardwalk.png" },
      },
    },
    category: {
      name: "Scenic Walking Area",
    },
  },
  {
    location_id: "6",
    name: "Bodie Island Lighthouse",
    description: "Historic black-and-white striped lighthouse with museum and nature trails.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "8210 Bodie Island Lighthouse Rd",
      city: "Nags Head",
      state: "NC",
      country: "United States",
      postalcode: "27959",
    },
    rating: 4.7,
    num_reviews: 2345,
    photo: {
      images: {
        small: { url: "/solitary-lighthouse.png" },
        medium: { url: "/solitary-lighthouse.png" },
        large: { url: "/solitary-lighthouse.png" },
      },
    },
    category: {
      name: "Historic Site",
    },
  },
]

const sampleRestaurants: TripAdvisorRestaurant[] = [
  {
    location_id: "1",
    name: "Blue Moon Beach Grill",
    description: "Casual seafood restaurant with local favorites and craft beers.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "4104 S Virginia Dare Trail",
      city: "Nags Head",
      state: "NC",
      country: "United States",
      postalcode: "27959",
    },
    rating: 4.7,
    num_reviews: 2134,
    price_level: "$$",
    cuisine: [{ name: "Seafood" }, { name: "American" }],
    photo: {
      images: {
        small: { url: "/seafood-restaurant.png" },
        medium: { url: "/seafood-restaurant.png" },
        large: { url: "/seafood-restaurant.png" },
      },
    },
  },
  {
    location_id: "2",
    name: "Duck Duck Burgers",
    description: "Gourmet burgers and craft beers in a casual setting.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "1187 Duck Rd",
      city: "Duck",
      state: "NC",
      country: "United States",
      postalcode: "27949",
    },
    rating: 4.6,
    num_reviews: 1876,
    price_level: "$$",
    cuisine: [{ name: "American" }, { name: "Bar" }],
    photo: {
      images: {
        small: { url: "/burger-restaurant.png" },
        medium: { url: "/burger-restaurant.png" },
        large: { url: "/burger-restaurant.png" },
      },
    },
  },
  {
    location_id: "3",
    name: "Coastal Cravings",
    description: "Fresh seafood with waterfront dining and sunset views.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "3701 N Croatan Hwy",
      city: "Kitty Hawk",
      state: "NC",
      country: "United States",
      postalcode: "27949",
    },
    rating: 4.8,
    num_reviews: 2543,
    price_level: "$$$",
    cuisine: [{ name: "Seafood" }, { name: "American" }],
    photo: {
      images: {
        small: { url: "/waterfront-seafood.png" },
        medium: { url: "/waterfront-seafood.png" },
        large: { url: "/waterfront-seafood.png" },
      },
    },
  },
  {
    location_id: "4",
    name: "Hatteras Sol Waterside Grill",
    description: "Upscale dining with fresh local seafood and waterfront views.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "57878 NC-12",
      city: "Hatteras",
      state: "NC",
      country: "United States",
      postalcode: "27943",
    },
    rating: 4.7,
    num_reviews: 1987,
    price_level: "$$$",
    cuisine: [{ name: "Seafood" }, { name: "American" }],
    photo: {
      images: {
        small: { url: "/waterfront-restaurant.png" },
        medium: { url: "/waterfront-restaurant.png" },
        large: { url: "/waterfront-restaurant.png" },
      },
    },
  },
  {
    location_id: "5",
    name: "Corolla Cantina",
    description: "Mexican cuisine with fresh ingredients and outdoor seating.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "1129 Corolla Village Rd",
      city: "Corolla",
      state: "NC",
      country: "United States",
      postalcode: "27927",
    },
    rating: 4.5,
    num_reviews: 1654,
    price_level: "$$",
    cuisine: [{ name: "Mexican" }, { name: "Southwestern" }],
    photo: {
      images: {
        small: { url: "/vibrant-mexican-restaurant.png" },
        medium: { url: "/vibrant-mexican-restaurant.png" },
        large: { url: "/vibrant-mexican-restaurant.png" },
      },
    },
  },
  {
    location_id: "6",
    name: "Waves Market & Deli",
    description: "Local favorite for sandwiches and quick bites near the beach.",
    web_url: "https://www.tripadvisor.com",
    address_obj: {
      street1: "25210 NC-12",
      city: "Waves",
      state: "NC",
      country: "United States",
      postalcode: "27982",
    },
    rating: 4.6,
    num_reviews: 1243,
    price_level: "$",
    cuisine: [{ name: "Deli" }, { name: "American" }],
    photo: {
      images: {
        small: { url: "/deli-sandwich-shop.png" },
        medium: { url: "/deli-sandwich-shop.png" },
        large: { url: "/deli-sandwich-shop.png" },
      },
    },
  },
]

// TripAdvisor API service
export const tripAdvisorApi = {
  // Get attractions for a location
  async getAttractions(
    locationId: string = OUTER_BANKS_LOCATION_IDS.outerBanks,
    limit = 10,
  ): Promise<TripAdvisorAttraction[]> {
    if (!TRIPADVISOR_API_KEY) {
      console.warn("TripAdvisor API key not found. Using sample data.")
      return sampleAttractions
    }

    try {
      console.log(`Fetching TripAdvisor attractions for location: ${locationId}`)

      const response = await fetch(
        `${TRIPADVISOR_API_URL}/location/${locationId}/attractions?key=${TRIPADVISOR_API_KEY}&language=en&limit=${limit}`,
        {
          next: { revalidate: 86400 }, // Cache for 24 hours
          headers: {
            Accept: "application/json",
          },
        },
      )

      console.log(`TripAdvisor API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`TripAdvisor API error: ${response.status} ${response.statusText}`)
        console.error(`Error details: ${errorText}`)
        return sampleAttractions
      }

      const data = await response.json()
      console.log(`Found ${data.data?.length || 0} attractions from TripAdvisor`)
      return data.data || sampleAttractions
    } catch (error) {
      console.error("Error fetching TripAdvisor attractions:", error)
      return sampleAttractions
    }
  },

  // Get restaurants for a location
  async getRestaurants(
    locationId: string = OUTER_BANKS_LOCATION_IDS.outerBanks,
    limit = 10,
  ): Promise<TripAdvisorRestaurant[]> {
    if (!TRIPADVISOR_API_KEY) {
      console.warn("TripAdvisor API key not found. Using sample data.")
      return sampleRestaurants
    }

    try {
      console.log(`Fetching TripAdvisor restaurants for location: ${locationId}`)

      const response = await fetch(
        `${TRIPADVISOR_API_URL}/location/${locationId}/restaurants?key=${TRIPADVISOR_API_KEY}&language=en&limit=${limit}`,
        {
          next: { revalidate: 86400 }, // Cache for 24 hours
          headers: {
            Accept: "application/json",
          },
        },
      )

      console.log(`TripAdvisor API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`TripAdvisor API error: ${response.status} ${response.statusText}`)
        console.error(`Error details: ${errorText}`)
        return sampleRestaurants
      }

      const data = await response.json()
      console.log(`Found ${data.data?.length || 0} restaurants from TripAdvisor`)
      return data.data || sampleRestaurants
    } catch (error) {
      console.error("Error fetching TripAdvisor restaurants:", error)
      return sampleRestaurants
    }
  },

  // Get reviews for a location
  async getReviews(locationId: string, limit = 5): Promise<TripAdvisorReview[]> {
    if (!TRIPADVISOR_API_KEY) {
      console.warn("TripAdvisor API key not found. Using sample data.")
      return []
    }

    try {
      console.log(`Fetching TripAdvisor reviews for location: ${locationId}`)

      const response = await fetch(
        `${TRIPADVISOR_API_URL}/location/${locationId}/reviews?key=${TRIPADVISOR_API_KEY}&language=en&limit=${limit}`,
        {
          next: { revalidate: 86400 }, // Cache for 24 hours
          headers: {
            Accept: "application/json",
          },
        },
      )

      console.log(`TripAdvisor API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`TripAdvisor API error: ${response.status} ${response.statusText}`)
        console.error(`Error details: ${errorText}`)
        return []
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error fetching TripAdvisor reviews:", error)
      return []
    }
  },

  // Get location details
  async getLocationDetails(locationId: string): Promise<any> {
    if (!TRIPADVISOR_API_KEY) {
      console.warn("TripAdvisor API key not found. Using sample data.")
      return null
    }

    try {
      console.log(`Fetching TripAdvisor location details for: ${locationId}`)

      const response = await fetch(
        `${TRIPADVISOR_API_URL}/location/${locationId}/details?key=${TRIPADVISOR_API_KEY}&language=en`,
        {
          next: { revalidate: 86400 }, // Cache for 24 hours
          headers: {
            Accept: "application/json",
          },
        },
      )

      console.log(`TripAdvisor API response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`TripAdvisor API error: ${response.status} ${response.statusText}`)
        console.error(`Error details: ${errorText}`)
        return null
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching TripAdvisor location details:", error)
      return null
    }
  },

  // Get sample reviews when API is unavailable
  getSampleReviews(locationId: string, limit = 5): TripAdvisorReview[] {
    // Generate some realistic sample reviews
    const sampleReviews: TripAdvisorReview[] = [
      {
        id: `${locationId}-review-1`,
        title: "Amazing experience!",
        text: "We had a wonderful time here. The location is beautiful and the service was excellent. Would definitely recommend to anyone visiting the Outer Banks.",
        rating: 5,
        published_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          username: "BeachLover123",
        },
      },
      {
        id: `${locationId}-review-2`,
        title: "Great place, a few minor issues",
        text: "Overall we enjoyed our visit. The views were spectacular and most of the staff were friendly. There were a couple of small issues with cleanliness but nothing major.",
        rating: 4,
        published_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          username: "CoastalExplorer",
        },
      },
      {
        id: `${locationId}-review-3`,
        title: "Worth the visit",
        text: "Definitely worth checking out if you're in the area. Not the best I've seen but still very good. The prices were reasonable and the atmosphere was nice.",
        rating: 4,
        published_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          username: "TravelingFoodie",
        },
      },
      {
        id: `${locationId}-review-4`,
        title: "Exceeded expectations",
        text: "I wasn't expecting much but was pleasantly surprised. The location is stunning and everything was well maintained. Will definitely be back next time I'm in OBX.",
        rating: 5,
        published_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          username: "SunsetChaser",
        },
      },
      {
        id: `${locationId}-review-5`,
        title: "Decent but overpriced",
        text: "The experience was good but I felt it was a bit overpriced for what you get. The views are nice though and the staff were helpful when we had questions.",
        rating: 3,
        published_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          username: "BudgetTraveler",
        },
      },
    ]

    // Randomize the ratings slightly to make them more realistic
    return sampleReviews.slice(0, limit).map((review) => ({
      ...review,
      rating: Math.max(1, Math.min(5, review.rating + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
    }))
  },
}
