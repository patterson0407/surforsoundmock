"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([100, 1000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const propertyTypes = ["Oceanfront", "Soundside", "Luxury", "Family Friendly", "Pet Friendly", "Beachfront"]

  const amenities = [
    "Private Pool",
    "Hot Tub",
    "Ocean View",
    "Sound View",
    "Wifi",
    "Parking",
    "Game Room",
    "Elevator",
    "Fireplace",
    "Grill",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range (per night)</Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={2000} min={50} step={50} className="mb-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>

        <Separator />

        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Property Type</Label>
          <div className="space-y-3">
            {propertyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTypes([...selectedTypes, type])
                    } else {
                      setSelectedTypes(selectedTypes.filter((t) => t !== type))
                    }
                  }}
                />
                <Label htmlFor={type} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Amenities */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Amenities</Label>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAmenities([...selectedAmenities, amenity])
                    } else {
                      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
                    }
                  }}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setPriceRange([100, 1000])
            setSelectedTypes([])
            setSelectedAmenities([])
          }}
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
