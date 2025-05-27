import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Phone, AlertTriangle, Heart, Users, Home } from "lucide-react"

export default function SafetyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Safety First</Badge>
            <h1 className="text-5xl font-bold mb-6">Safety Information</h1>
            <p className="text-xl text-coastal-sand leading-relaxed">
              Your safety and security are our top priorities. Learn about our safety measures and guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coastal-navy mb-4">Our Safety Commitment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest safety standards across all our properties to ensure your peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="font-semibold text-coastal-navy mb-4">Property Verification</h3>
                <p className="text-muted-foreground">
                  All properties undergo thorough safety inspections and regular maintenance checks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="font-semibold text-coastal-navy mb-4">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our emergency support team is available around the clock for any urgent situations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 text-coastal-aqua mx-auto mb-4" />
                <h3 className="font-semibold text-coastal-navy mb-4">Guest Protection</h3>
                <p className="text-muted-foreground">
                  Comprehensive safety protocols and emergency procedures are in place at every property.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Home className="h-6 w-6 text-coastal-aqua" />
                  <span>Property Safety Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Standard Safety Equipment</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Smoke detectors in all rooms</li>
                      <li>• Carbon monoxide detectors</li>
                      <li>• Fire extinguishers</li>
                      <li>• First aid kits</li>
                      <li>• Emergency flashlights</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Security Features</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Secure keyless entry systems</li>
                      <li>• Well-lit exterior areas</li>
                      <li>• Secure parking areas</li>
                      <li>• Privacy fencing where applicable</li>
                      <li>• 24/7 emergency contact information</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-coastal-aqua" />
                  <span>Beach and Water Safety</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Ocean Safety Guidelines</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Always swim with a buddy</li>
                      <li>• Check daily beach conditions and flag warnings</li>
                      <li>• Be aware of rip currents and how to escape them</li>
                      <li>• Use sunscreen and stay hydrated</li>
                      <li>• Supervise children at all times near water</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Weather Awareness</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Monitor weather forecasts daily</li>
                      <li>• Seek shelter during thunderstorms</li>
                      <li>• Follow evacuation orders if issued</li>
                      <li>• Keep emergency supplies on hand</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-coastal-aqua" />
                  <span>Emergency Procedures</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Emergency Contacts</h4>
                    <div className="space-y-1 text-red-700">
                      <p>
                        <strong>Emergency Services:</strong> 911
                      </p>
                      <p>
                        <strong>Surf or Sound 24/7 Emergency:</strong> (252) 555-0911
                      </p>
                      <p>
                        <strong>Poison Control:</strong> 1-800-222-1222
                      </p>
                      <p>
                        <strong>Coast Guard:</strong> Channel 16 VHF Radio
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">In Case of Emergency</h4>
                    <ol className="space-y-2 text-muted-foreground">
                      <li>1. Ensure immediate safety of all guests</li>
                      <li>2. Call 911 for medical emergencies or immediate danger</li>
                      <li>3. Contact our 24/7 emergency line</li>
                      <li>4. Follow evacuation procedures if necessary</li>
                      <li>5. Provide clear location information to responders</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Travel Insurance Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We strongly recommend purchasing travel insurance to protect your vacation investment. Travel
                  insurance can cover:
                </p>
                <ul className="space-y-1 text-muted-foreground mb-4">
                  <li>• Trip cancellation or interruption</li>
                  <li>• Medical emergencies</li>
                  <li>• Weather-related issues</li>
                  <li>• Lost or delayed luggage</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Contact your insurance provider or visit travel insurance comparison websites to find coverage that
                  meets your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
