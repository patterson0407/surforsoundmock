import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function CancellationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Booking Policy</Badge>
            <h1 className="text-5xl font-bold mb-6">Cancellation Policy</h1>
            <p className="text-xl text-coastal-sand leading-relaxed">
              Understand our flexible cancellation terms and refund process.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Standard Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-coastal-aqua" />
                  <span>Standard Cancellation Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                    <div className="font-medium mb-2">Full Refund</div>
                    <div className="text-sm text-muted-foreground">14+ days before check-in</div>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">50%</div>
                    <div className="font-medium mb-2">Partial Refund</div>
                    <div className="text-sm text-muted-foreground">7-13 days before check-in</div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-2">0%</div>
                    <div className="font-medium mb-2">No Refund</div>
                    <div className="text-sm text-muted-foreground">Less than 7 days before</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Circumstances */}
            <Card>
              <CardHeader>
                <CardTitle>Special Circumstances</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-coastal-aqua pl-4">
                  <h4 className="font-semibold text-coastal-navy mb-2">Weather-Related Cancellations</h4>
                  <p className="text-muted-foreground">
                    If a mandatory evacuation is ordered by local authorities due to severe weather, we will provide a
                    full refund or allow you to reschedule your stay.
                  </p>
                </div>
                <div className="border-l-4 border-coastal-aqua pl-4">
                  <h4 className="font-semibold text-coastal-navy mb-2">Medical Emergencies</h4>
                  <p className="text-muted-foreground">
                    Cancellations due to documented medical emergencies will be reviewed on a case-by-case basis.
                    Medical documentation may be required.
                  </p>
                </div>
                <div className="border-l-4 border-coastal-aqua pl-4">
                  <h4 className="font-semibold text-coastal-navy mb-2">Military Deployment</h4>
                  <p className="text-muted-foreground">
                    Active military personnel with sudden deployment orders may be eligible for special consideration
                    with proper documentation.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Refund Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <DollarSign className="h-6 w-6 text-coastal-aqua" />
                  <span>Refund Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-coastal-aqua text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Submit Cancellation Request</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact our support team or use your online dashboard to request cancellation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-coastal-aqua text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Review and Confirmation</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll review your request and send confirmation within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-coastal-aqua text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Refund Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Eligible refunds are processed within 5-7 business days to your original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardHeader>
                <CardTitle>Need to Cancel or Have Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-8 w-8 text-coastal-aqua" />
                    <div>
                      <h4 className="font-medium">Call Us</h4>
                      <p className="text-muted-foreground">(252) 555-0123</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-coastal-aqua" />
                    <div>
                      <h4 className="font-medium">Email Support</h4>
                      <p className="text-muted-foreground">cancellations@surforsound.com</p>
                      <p className="text-sm text-muted-foreground">Response within 2 hours</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Button className="bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy" asChild>
                    <Link href="/dashboard/renter">Manage My Bookings</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
