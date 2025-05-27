"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, Gift, Calendar, MapPin, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const benefits = [
    {
      icon: <Gift className="h-5 w-5 text-coastal-aqua" />,
      title: "Exclusive Deals",
      description: "Get access to member-only discounts and early booking opportunities",
    },
    {
      icon: <Calendar className="h-5 w-5 text-coastal-aqua" />,
      title: "Seasonal Updates",
      description: "Stay informed about local events, festivals, and seasonal activities",
    },
    {
      icon: <MapPin className="h-5 w-5 text-coastal-aqua" />,
      title: "New Properties",
      description: "Be the first to know about new luxury properties and amenities",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Stay Connected</Badge>
            <h2 className="text-4xl font-bold mb-6">
              Never Miss a Perfect
              <span className="block text-coastal-aqua">Coastal Getaway</span>
            </h2>
            <p className="text-xl text-coastal-sand mb-8 leading-relaxed">
              Join our exclusive community and get insider access to the best deals, new properties, and local insights
              for your next Outer Banks adventure.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-coastal-sand text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Mail className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h3>
                  <p className="text-coastal-sand">Get exclusive deals and insider tips delivered to your inbox</p>
                </div>

                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-coastal-aqua"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy font-semibold py-3"
                    >
                      Subscribe Now
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-coastal-aqua mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Welcome Aboard!</h3>
                    <p className="text-coastal-sand">You'll receive your first exclusive deal within 24 hours.</p>
                  </motion.div>
                )}

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-coastal-aqua">15%</div>
                      <div className="text-xs text-coastal-sand">Welcome Discount</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-coastal-aqua">5K+</div>
                      <div className="text-xs text-coastal-sand">Subscribers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-coastal-aqua">Weekly</div>
                      <div className="text-xs text-coastal-sand">Updates</div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-coastal-sand/70 text-center mt-4">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
