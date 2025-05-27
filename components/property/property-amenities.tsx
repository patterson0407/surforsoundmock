import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Wifi,
  Car,
  Waves,
  Coffee,
  Tv,
  Wind,
  Utensils,
  WashingMachineIcon as Washing,
  Flame,
  Gamepad2,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  "Ocean View": <Waves className="h-5 w-5" />,
  "Sound View": <Waves className="h-5 w-5" />,
  "Full Kitchen": <Utensils className="h-5 w-5" />,
  "Coffee Maker": <Coffee className="h-5 w-5" />,
  TV: <Tv className="h-5 w-5" />,
  "Hot Tub": <Wind className="h-5 w-5" />,
  "Washer/Dryer": <Washing className="h-5 w-5" />,
  Fireplace: <Flame className="h-5 w-5" />,
  "Game Room": <Gamepad2 className="h-5 w-5" />,
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What this place offers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-3">
              <div className="text-coastal-aqua">
                {amenityIcons[amenity] || <div className="w-5 h-5 bg-coastal-aqua rounded-full" />}
              </div>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
