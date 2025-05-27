import { Card, CardContent } from "@/components/ui/card"
import { Users, Home, Award } from "lucide-react"

const stats = [
  {
    icon: <Home className="h-8 w-8 text-coastal-aqua" />,
    value: "600+",
    label: "Premium Properties",
    description: "Carefully curated vacation rentals",
  },
  {
    icon: <Users className="h-8 w-8 text-coastal-aqua" />,
    value: "100,000+",
    label: "Happy Guests",
    description: "Satisfied customers since 1978",
  },
  {
    icon: <Award className="h-8 w-8 text-coastal-aqua" />,
    value: "46+",
    label: "Years of Excellence",
    description: "Trusted since 1978",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-coastal-navy">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Nearly 5 Decades of Excellence</h2>
          <p className="text-coastal-sand max-w-2xl mx-auto">
            Since 1978, we've been the trusted choice for Outer Banks vacations, serving over 100,000 guests with our
            extensive collection of premium properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-coastal-aqua mb-2">{stat.label}</div>
                <p className="text-coastal-sand text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
