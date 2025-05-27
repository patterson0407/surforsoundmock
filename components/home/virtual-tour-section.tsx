"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Clock, Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const virtualTours = [
  {
    id: "ocean-breeze-360",
    title: "Ocean Breeze Cottage - 360° Tour",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "3:45",
    views: "2.1k",
    rating: 4.9,
    type: "360° Virtual Tour",
    description: "Experience every room with our immersive virtual reality tour",
  },
  {
    id: "luxury-estate-drone",
    title: "Luxury Estate - Drone Footage",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "2:30",
    views: "1.8k",
    rating: 5.0,
    type: "Drone Tour",
    description: "Stunning aerial views of our premium oceanfront estate",
  },
  {
    id: "soundside-walkthrough",
    title: "Soundside Sanctuary - Walkthrough",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "4:12",
    views: "3.2k",
    rating: 4.8,
    type: "Video Walkthrough",
    description: "Take a guided tour through this peaceful soundside retreat",
  },
]

export function VirtualTourSection() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-coastal-navy/5 to-coastal-aqua/5">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-coastal-aqua/10 text-coastal-navy border-coastal-aqua/20">Virtual Tours</Badge>
          <h2 className="text-4xl font-bold text-coastal-navy mb-6">Explore Before You Book</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take immersive virtual tours of our properties from the comfort of your home. See every detail before making
            your reservation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {virtualTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <Image
                    src={tour.thumbnail || "/placeholder.svg"}
                    alt={tour.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="lg"
                      className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-coastal-navy rounded-full"
                      onClick={() => setSelectedTour(tour.id)}
                    >
                      <Play className="mr-2 h-6 w-6" />
                      Play Tour
                    </Button>
                  </div>

                  {/* Tour Type Badge */}
                  <Badge className="absolute top-4 left-4 bg-coastal-aqua text-coastal-navy">{tour.type}</Badge>

                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {tour.duration}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-semibold text-coastal-navy mb-2 group-hover:text-coastal-aqua transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{tour.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {tour.views} views
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {tour.rating}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-coastal-aqua text-coastal-aqua hover:bg-coastal-aqua hover:text-white"
          >
            View All Virtual Tours
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
