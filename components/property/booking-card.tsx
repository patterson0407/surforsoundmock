"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Users } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

interface BookingCardProps {
  property: {
    id: string
    title: string
    price: number
    rating: number
    reviews: number
  }
}

export function BookingCard({ property }: BookingCardProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState("2")
  const [isLoading, setIsLoading] = useState(false)

  const handleBooking = async () => {
    setIsLoading(true)

    // In real app, this would call your .NET API to create Stripe checkout session
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property.id,
          checkIn: dateRange?.from,
          checkOut: dateRange?.to,
          guests: Number.parseInt(guests),
          pricePerNight: property.price,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateTotal = () => {
    if (!dateRange?.from || !dateRange?.to) return 0

    const nights = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))

    const subtotal = nights * property.price
    const cleaningFee = 150
    const serviceFee = Math.round(subtotal * 0.12)

    return {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      total: subtotal + cleaningFee + serviceFee,
    }
  }

  const totals = calculateTotal()

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold text-coastal-navy">${property.price}</span>
          <span className="text-sm text-muted-foreground">per night</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Check-in / Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd")
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guest Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5 Guests</SelectItem>
              <SelectItem value="6">6 Guests</SelectItem>
              <SelectItem value="7">7 Guests</SelectItem>
              <SelectItem value="8">8 Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Breakdown */}
        {totals.nights > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span>
                ${property.price} x {totals.nights} nights
              </span>
              <span>${totals.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cleaning fee</span>
              <span>${totals.cleaningFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>${totals.serviceFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${totals.total}</span>
            </div>
          </div>
        )}

        {/* Book Button */}
        <Button
          className="w-full bg-coastal-aqua hover:bg-coastal-aqua/90 text-coastal-navy font-semibold"
          onClick={handleBooking}
          disabled={!dateRange?.from || !dateRange?.to || isLoading}
        >
          {isLoading ? "Processing..." : "Reserve Now"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">You won't be charged yet</p>
      </CardContent>
    </Card>
  )
}
