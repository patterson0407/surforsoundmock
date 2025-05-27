import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Legal</Badge>
            <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-coastal-sand leading-relaxed">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  By accessing and using Surf or Sound Realty's website and services, you accept and agree to be bound
                  by the terms and provision of this agreement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking and Reservations</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <ul>
                  <li>All bookings are subject to availability and confirmation</li>
                  <li>Full payment is required at the time of booking</li>
                  <li>Check-in time is 4:00 PM, check-out time is 10:00 AM</li>
                  <li>Maximum occupancy limits must be strictly observed</li>
                  <li>Guests must be at least 25 years old to make a reservation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <ul>
                  <li>
                    <strong>14+ days before check-in:</strong> Full refund
                  </li>
                  <li>
                    <strong>7-13 days before check-in:</strong> 50% refund
                  </li>
                  <li>
                    <strong>Less than 7 days:</strong> No refund
                  </li>
                  <li>Cancellations due to weather or emergencies will be reviewed case-by-case</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Rules</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <ul>
                  <li>No smoking inside any property</li>
                  <li>No parties or events without prior approval</li>
                  <li>Quiet hours are from 10:00 PM to 8:00 AM</li>
                  <li>Pets are only allowed in designated pet-friendly properties</li>
                  <li>Guests are responsible for any damages beyond normal wear and tear</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liability and Insurance</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Guests acknowledge that they use the property at their own risk. Surf or Sound Realty is not liable
                  for:
                </p>
                <ul>
                  <li>Personal injury or property damage</li>
                  <li>Loss or theft of personal belongings</li>
                  <li>Weather-related issues or natural disasters</li>
                  <li>Utility outages or service interruptions</li>
                </ul>
                <p>We strongly recommend purchasing travel insurance.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>For questions about these terms, please contact us:</p>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Email:</strong> legal@surforsound.com
                  </p>
                  <p>
                    <strong>Phone:</strong> (252) 555-0123
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Ocean Drive, Nags Head, NC 27959
                  </p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
