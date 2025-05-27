import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, MapPin, Heart, Star, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
  {
    name: "Dale Petty",
    role: "Owner",
    image: "/public/dale petty.jpg",
  },
  {
    name: "Morgan Veyna",
    role: "VP of Operations",
    image: "/public/morgan-960x600.jpg",
  },
  {
    name: "Wendy Hoekwater",
    role: "VP of Marketing and Reservations",
    image: "/public/wendyhoekwater-960x600.jpg",
  },
]

const milestones = [
  { year: "1978", event: "Founded Surf or Sound Realty" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Our Story</Badge>
            <h1 className="text-5xl font-bold mb-6">
              Where Coastal Dreams
              <span className="block text-coastal-aqua">Come to Life</span>
            </h1>
            <p className="text-xl text-coastal-sand leading-relaxed">
              For nearly a fifty years, we've been helping families create unforgettable memories along the pristine shores
              of the Outer Banks. Our passion for coastal living drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-coastal-navy mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
               At Surf or Sound Realty, our mission is to provide exceptional vacation experiences and maximize homeowner success by managing every Hatteras Island home with care, integrity, and a personal touch. We are committed to delivering unparalleled service to our guests and partners, nurturing our local community, and preserving the island lifestyle we proudly call home.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-coastal-aqua mb-2">600+</div>
                  <div className="text-sm text-muted-foreground">Premium Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-coastal-aqua mb-2">100K+</div>
                  <div className="text-sm text-muted-foreground">Happy Guests</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/public/hatteras-village-office_0503_462x366.jpg"
                alt="Coastal sunset view"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coastal-navy mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide every decision we make and every service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-coastal-aqua" />
                </div>
                <h3 className="text-xl font-semibold text-coastal-navy mb-4">Integrity & Trust</h3>
                <p className="text-muted-foreground">
                  We build lasting relationships with homeowners, guests, and our team through honesty, transparency, and respect.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-coastal-aqua" />
                </div>
                <h3 className="text-xl font-semibold text-coastal-navy mb-4">Excellence in Service</h3>
                <p className="text-muted-foreground">
                  We are committed to delivering exceptional experiences through personalized attention, high standards, and continuous improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-coastal-aqua" />
                </div>
                <h3 className="text-xl font-semibold text-coastal-navy mb-4">Community Commitment</h3>
                <p className="text-muted-foreground">
                  As proud locals, we actively support and give back to the Hatteras Island community through partnerships, sponsorships, and service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-coastal-aqua" />
                </div>
                <h3 className="text-xl font-semibold text-coastal-navy mb-4">Homeowner Partnership</h3>
                <p className="text-muted-foreground">
                  We treat each home as if it were our own, working alongside owners to protect and grow their investment with care and dedication.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-coastal-aqua" />
                </div>
                <h3 className="text-xl font-semibold text-coastal-navy mb-4">Guest Experience First</h3>
                <p className="text-muted-foreground">
                  Every stay should feel like home; comfortable, memorable, and enriched by top-tier amenities and thoughtful service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-coastal-aqua/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-coastal-aqua" />
                </div>
                <h3 className="text-xl font-semibold text-coastal-navy mb-4">Innovation & Growth</h3>
                <p className="text-muted-foreground">
                 We embrace change, implement strategic solutions, and lead with creativity to grow our business and stay ahead of industry trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coastal-navy mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate people behind your perfect coastal getaway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-6"
                  />
                  <h3 className="text-xl font-semibold text-coastal-navy mb-2">{member.name}</h3>
                  <p className="text-coastal-aqua font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-coastal-navy mb-6">Ready to Experience the Difference?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of families who have made Surf or Sound their trusted partner for coastal adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
