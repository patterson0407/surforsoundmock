import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Phone, Mail, MessageCircle, Calendar, Home } from "lucide-react"

const faqCategories = [
  {
    title: "Booking & Reservations",
    icon: <Calendar className="h-6 w-6" />,
    questions: [
      {
        q: "How do I make a reservation?",
        a: "You can book directly through our website by selecting your dates, number of guests, and clicking 'Reserve Now'. You'll be guided through our secure checkout process.",
      },
      {
        q: "Can I modify or cancel my booking?",
        a: "Yes, you can modify or cancel your booking up to 14 days before check-in for a full refund. Please contact our support team for assistance.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, and bank transfers. Payment is processed securely through Stripe.",
      },
    ],
  },
  {
    title: "Property Information",
    icon: <Home className="h-6 w-6" />,
    questions: [
      {
        q: "Are pets allowed in the properties?",
        a: "Some of our properties are pet-friendly. Look for the 'Pet Friendly' badge on property listings or filter by pet-friendly amenities.",
      },
      {
        q: "What amenities are included?",
        a: "Each property listing includes a detailed amenities section. Common amenities include WiFi, parking, full kitchens, and beach access.",
      },
      {
        q: "Is parking included?",
        a: "Most properties include free parking. Check the specific property listing for parking details and any restrictions.",
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Help Center</Badge>
            <h1 className="text-5xl font-bold mb-6">How Can We Help You?</h1>
            <p className="text-xl text-coastal-sand leading-relaxed mb-8">
              Find answers to common questions or get in touch with our support team.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for help articles..."
                  className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="font-semibold text-coastal-navy mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">(252) 555-0123</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="font-semibold text-coastal-navy mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">help@surforsound.com</p>
                <p className="text-sm text-muted-foreground">Response within 2 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="font-semibold text-coastal-navy mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-4">Chat with our team</p>
                <Button className="bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy">Start Chat</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coastal-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to the most common questions about our vacation rentals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="text-coastal-aqua">{category.icon}</div>
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-medium text-coastal-navy mb-2">{faq.q}</h4>
                      <p className="text-muted-foreground text-sm">{faq.a}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
