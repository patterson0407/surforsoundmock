import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Home, Building, DollarSign, Calendar, Users } from "lucide-react"

export default function PartnerPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-coastal-navy mb-6 text-center">Partner With Us</h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Join the Surf or Sound Realty family and maximize your property's potential
        </p>

        <Tabs defaultValue="property-owners" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="property-owners">Property Owners</TabsTrigger>
            <TabsTrigger value="business-partners">Business Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="property-owners">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-coastal-aqua" />
                    Maximize Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our dynamic pricing strategy and marketing expertise ensure your property earns its maximum
                    potential throughout the year.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-coastal-aqua" />
                    Flexible Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Choose from full-service management or à la carte services tailored to your specific needs and
                    preferences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-coastal-aqua" />
                    Local Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our team has deep roots in the Outer Banks community with unmatched knowledge of the local vacation
                    rental market.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-coastal-aqua" />
                    Property Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We treat your property like our own with meticulous maintenance, cleaning, and regular inspections.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>List Your Property</CardTitle>
                <CardDescription>Fill out the form below to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="First Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Last Name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Email" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Phone" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="property-address">Property Address</Label>
                    <Input id="property-address" placeholder="Property Address" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="property-details">Property Details</Label>
                    <Textarea
                      id="property-details"
                      placeholder="Tell us about your property (bedrooms, bathrooms, amenities, etc.)"
                      rows={4}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-coastal-navy hover:bg-coastal-navy/90">Submit</Button>
              </CardFooter>
            </Card>

            <div className="bg-coastal-aqua/10 p-6 rounded-lg border border-coastal-aqua/20">
              <h3 className="text-xl font-semibold text-coastal-navy mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-coastal-aqua" />
                Owner Testimonials
              </h3>
              <div className="space-y-4">
                <blockquote className="italic border-l-4 border-coastal-aqua pl-4 py-2">
                  "Since partnering with Surf or Sound Realty, our occupancy rate has increased by 35% and we've
                  received nothing but positive feedback from guests."
                  <footer className="text-sm font-medium mt-1">— Sarah T., Avon Property Owner</footer>
                </blockquote>
                <blockquote className="italic border-l-4 border-coastal-aqua pl-4 py-2">
                  "The team treats our home like their own. Their attention to detail and responsiveness gives us peace
                  of mind even though we're hundreds of miles away."
                  <footer className="text-sm font-medium mt-1">— Michael R., Hatteras Village Property Owner</footer>
                </blockquote>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="business-partners">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-coastal-aqua" />
                    Local Businesses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Partner with us to offer exclusive deals and services to our guests, increasing your visibility to
                    thousands of visitors each year.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-coastal-aqua" />
                    Service Providers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Join our trusted network of service providers for cleaning, maintenance, landscaping, and other
                    essential property services.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Business Partnership Inquiry</CardTitle>
                <CardDescription>Tell us about your business and partnership ideas</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input id="business-name" placeholder="Business Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Contact Name</Label>
                      <Input id="contact-name" placeholder="Contact Name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-email">Email</Label>
                    <Input id="business-email" type="email" placeholder="Email" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Phone</Label>
                    <Input id="business-phone" placeholder="Phone" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-website">Website</Label>
                    <Input id="business-website" placeholder="Website" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partnership-details">Partnership Details</Label>
                    <Textarea
                      id="partnership-details"
                      placeholder="Describe your business and how you'd like to partner with us"
                      rows={4}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-coastal-navy hover:bg-coastal-navy/90">Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
