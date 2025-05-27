import { PropertyFilters } from "@/components/properties/property-filters"
import { PropertyGrid } from "@/components/properties/property-grid"
import { Suspense } from "react"

export default function PropertiesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-coastal-navy mb-4">Vacation Rentals</h1>
        <p className="text-muted-foreground">
          Discover your perfect coastal getaway from our collection of premium properties
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilters />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading properties...</div>}>
            <PropertyGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
