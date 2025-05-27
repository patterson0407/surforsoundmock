import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, CreditCard } from "lucide-react"

const paymentHistory = [
  {
    id: "payment-1",
    property: "Ocean Breeze Cottage",
    date: "2024-06-15",
    amount: 3150,
    status: "completed",
    method: "Visa ****4532",
    bookingId: "OBC-2024-001",
  },
  {
    id: "payment-2",
    property: "Soundside Sanctuary",
    date: "2024-05-20",
    amount: 2660,
    status: "completed",
    method: "Mastercard ****8901",
    bookingId: "SS-2024-002",
  },
  {
    id: "payment-3",
    property: "Coastal Charm Villa",
    date: "2024-04-10",
    amount: 1920,
    status: "completed",
    method: "Visa ****4532",
    bookingId: "CCV-2024-003",
  },
]

export function PaymentHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-coastal-navy">{payment.property}</h4>
                  <div className="text-sm text-muted-foreground">Booking ID: {payment.bookingId}</div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {payment.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <div className="text-muted-foreground">Date</div>
                  <div>{new Date(payment.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Amount</div>
                  <div className="font-semibold">${payment.amount.toLocaleString()}</div>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{payment.method}</span>
                </div>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Receipt
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
