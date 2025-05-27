"use client"

import { Shield, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"

const trustSignals = [
  {
    icon: <Shield className="h-8 w-8 text-coastal-aqua" />,
    title: "Verified Properties",
    description: "Every property is personally inspected and verified",
  },
  {
    icon: <Users className="h-8 w-8 text-coastal-aqua" />,
    title: "10,000+ Happy Guests",
    description: "Join thousands of satisfied vacation rental guests",
  },
  {
    icon: <Clock className="h-8 w-8 text-coastal-aqua" />,
    title: "Instant Booking",
    description: "Book instantly with immediate confirmation",
  },
]

export function TrustSignals() {
  return (
    <section className="py-16 bg-white border-b">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {trustSignals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {signal.icon}
              </div>
              <h3 className="font-semibold text-coastal-navy mb-2">{signal.title}</h3>
              <p className="text-sm text-muted-foreground">{signal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
