import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, Star, Trophy } from "lucide-react"

const loyaltyData = {
  currentPoints: 1250,
  nextTierPoints: 2000,
  tier: "Silver",
  nextTier: "Gold",
  benefits: [
    "10% discount on all bookings",
    "Priority customer support",
    "Early access to new properties",
    "Birthday bonus points",
  ],
  recentEarnings: [
    { date: "2024-06-15", points: 315, reason: "Booking completed" },
    { date: "2024-06-01", points: 50, reason: "Birthday bonus" },
    { date: "2024-05-20", points: 266, reason: "Booking completed" },
  ],
}

export function LoyaltyProgram() {
  const progressPercentage = (loyaltyData.currentPoints / loyaltyData.nextTierPoints) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-coastal-aqua" />
          <span>Loyalty Program</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="text-center">
          <Badge className="mb-2 bg-coastal-aqua text-coastal-navy">{loyaltyData.tier} Member</Badge>
          <div className="text-2xl font-bold text-coastal-navy mb-1">{loyaltyData.currentPoints} Points</div>
          <div className="text-sm text-muted-foreground">${loyaltyData.currentPoints / 10} value</div>
        </div>

        {/* Progress to Next Tier */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to {loyaltyData.nextTier}</span>
            <span>{loyaltyData.nextTierPoints - loyaltyData.currentPoints} points needed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Benefits */}
        <div>
          <h4 className="font-semibold text-coastal-navy mb-3">Your Benefits</h4>
          <div className="space-y-2">
            {loyaltyData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-sm">
                <Star className="h-3 w-3 text-coastal-aqua mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Earnings */}
        <div>
          <h4 className="font-semibold text-coastal-navy mb-3">Recent Earnings</h4>
          <div className="space-y-2">
            {loyaltyData.recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">+{earning.points} points</div>
                  <div className="text-muted-foreground text-xs">{earning.reason}</div>
                </div>
                <div className="text-muted-foreground text-xs">{new Date(earning.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy">
          <Gift className="h-4 w-4 mr-2" />
          Redeem Points
        </Button>
      </CardContent>
    </Card>
  )
}
