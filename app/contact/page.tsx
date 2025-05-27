import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Get in Touch</Badge>
            <h1 className="text-5xl font-bold mb-6">
              Contact Our
              <span className="block text-coastal-aqua">Coastal Experts</span>
            </h1>
            <p className="text-xl text-coastal-sand leading-relaxed">
              Have questions about your next coastal getaway? Our friendly team is here to help you find the perfect
              vacation rental.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-coastal-navy">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your ideal coastal vacation..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy font-semibold">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-coastal-navy mb-6">Get in Touch</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Whether you're planning your first visit to the Outer Banks or you're a returning guest, our team is
                  ready to help make your coastal vacation unforgettable.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-coastal-aqua/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-coastal-aqua" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-navy mb-1">Phone</h3>
                        <p className="text-muted-foreground">1-800-237-1138</p>
                        <p className="text-sm text-muted-foreground">Open Daily 8:30am to 5pm</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-coastal-aqua/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-coastal-aqua" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-navy mb-1">Email</h3>
                        <p className="text-muted-foreground">info@surforsound.com</p>
                        <p className="text-sm text-muted-foreground">We respond within 2 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-coastal-aqua/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-coastal-aqua" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-navy mb-1"> Salvo Office</h3>
                        <p className="text-muted-foreground">26204 Rampart St.</p>
                        <p className="text-muted-foreground">Salvo, NC 27972</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-coastal-aqua/10 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-coastal-aqua" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-navy mb-1">Office Hours</h3>
                        <p className="text-muted-foreground">Daily: 8:30am - 5pm</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
