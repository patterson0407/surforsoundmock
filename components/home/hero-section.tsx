"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ChevronDown, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { WeatherService } from "@/lib/weather-service"

const heroSlides = [
  {
    image: "/public/vacation-planning-hero-sunrise-ocean-1920x470.jpg",
    title: "Oceanfront Paradise",
    subtitle: "Wake up to endless ocean views",
    location: "Nags Head, NC",
  },
  {
    image: "/public/surforsoundrealty_aboutus_header.jpg",
    title: "Soundside Serenity",
    subtitle: "Peaceful waters and stunning sunsets",
    location: "Duck, NC",
  },
  {
    image: "/public/surf-or-sound-realty-1049-sea-la-vie-exterior-4.jpg",
    title: "Luxury Coastal Living",
    subtitle: "Premium amenities meet coastal charm",
    location: "Corolla, NC",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentWeather, setCurrentWeather] = useState<{ temperature: number; description: string } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherService = new WeatherService()
        const data = await weatherService.getWeatherData()
        setCurrentWeather({
          temperature: data.current.temperature,
          description: data.current.description,
        })
      } catch (error) {
        console.warn("Failed to fetch weather for hero, continuing without weather widget:", error)
        // Don't set weather data if there's an error - the component will just not show the weather widget
      }
    }

    fetchWeather()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroSlides[currentSlide].image || "/placeholder.svg"}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coastal-navy/60 via-coastal-navy/40 to-coastal-navy/60" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Weather Widget - Only show if weather data is available */}
      {currentWeather && (
        <div className="absolute top-20 right-10 z-20 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white"
          >
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-coastal-aqua" />
              <span className="text-sm">{heroSlides[currentSlide].location}</span>
            </div>
            <div className="text-2xl font-bold">{currentWeather.temperature}°F</div>
            <div className="text-xs opacity-80 capitalize">{currentWeather.description}</div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-coastal-aqua/20 backdrop-blur-sm rounded-full px-6 py-2 text-coastal-aqua font-medium"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <motion.span
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block"
              >
                {heroSlides[currentSlide].title.split(" ")[0]}
              </motion.span>
              <motion.span
                key={`title2-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-coastal-aqua"
              >
                {heroSlides[currentSlide].title.split(" ").slice(1).join(" ")}
              </motion.span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-coastal-sand max-w-3xl mx-auto leading-relaxed"
          >
            Discover luxury vacation rentals where the surf meets the sound. Premium properties with breathtaking views,
            modern amenities, and unforgettable experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              className="bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy font-semibold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-coastal-aqua/25 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/properties">
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-coastal-navy px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Virtual Tour
            </Button>
          </motion.div>

          {/* Enhanced Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-coastal-aqua group-hover:scale-110 transition-transform duration-300">
                150+
              </div>
              <div className="text-sm text-coastal-sand">Premium Properties</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-coastal-aqua group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-sm text-coastal-sand">Guest Satisfaction</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-coastal-aqua group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-sm text-coastal-sand">Concierge Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-coastal-aqua scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-xs mb-2 opacity-75">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </motion.div>
    </section>
  )
}
