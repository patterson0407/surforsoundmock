"use client"

import { TripAdvisorApiWidget } from "@/components/integrations/tripadvisor-api-widget"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function LocalAttractionsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-coastal-navy/10 text-coastal-navy border-coastal-navy/20">Local Attractions</Badge>
          <h2 className="text-4xl font-bold text-coastal-navy mb-6">Explore the Outer Banks</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover world-class attractions, historic landmarks, and natural wonders just minutes from your vacation
            rental. All recommendations powered by TripAdvisor's trusted travel community.
          </p>
        </motion.div>

        {/* Attractions */}
        <div className="mb-16">
          <TripAdvisorApiWidget
            type="attractions"
            title="Must-Visit Attractions"
            description="From historic lighthouses to wild horse tours, discover the top-rated attractions that make the Outer Banks special"
            maxResults={6}
            showReviews={true}
          />
        </div>

        {/* Restaurants */}
        <div>
          <TripAdvisorApiWidget
            type="restaurants"
            title="Best Local Dining"
            description="Fresh seafood, waterfront dining, and local favorites - find the perfect restaurant for your coastal dining experience"
            maxResults={6}
            showReviews={true}
          />
        </div>
      </div>
    </section>
  )
}
