import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Charlotte, NC",
    rating: 5,
    text: "Absolutely perfect vacation! The Ocean Breeze Cottage exceeded all our expectations. The views were stunning and the amenities were top-notch.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mike Chen",
    location: "Raleigh, NC",
    rating: 5,
    text: "Our family had an amazing time at the Soundside Sanctuary. The kids loved the kayaks and the peaceful setting was exactly what we needed.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    location: "Atlanta, GA",
    rating: 5,
    text: "The booking process was seamless and the property was even better than the photos. We'll definitely be back next summer!",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-coastal-navy mb-4">What Our Guests Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read reviews from families who have created unforgettable memories at our coastal properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>

                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-coastal-navy">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
