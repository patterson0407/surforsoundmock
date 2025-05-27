import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coastal-navy to-coastal-navy/90">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-coastal-aqua/20 text-coastal-aqua border-coastal-aqua/30">Legal</Badge>
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-coastal-sand leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul>
                  <li>Create an account or make a reservation</li>
                  <li>Contact us for customer support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p>This may include your name, email address, phone number, payment information, and preferences.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process your reservations and payments</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send you booking confirmations and important updates</li>
                  <li>Improve our services and website functionality</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following circumstances:
                </p>
                <ul>
                  <li>With property owners to facilitate your booking</li>
                  <li>With service providers who help us operate our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul>
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing through Stripe</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>You have the right to:</p>
                <ul>
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
                <p>To exercise these rights, please contact us at privacy@surforsound.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="mt-4 space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@surforsound.com
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
