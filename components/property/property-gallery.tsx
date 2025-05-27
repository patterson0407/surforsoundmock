"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="grid grid-cols-4 gap-2 h-96">
      {/* Main Image */}
      <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
        <Image src={images[0] || "/placeholder.svg"} alt={`${title} - Main view`} fill className="object-cover" />
      </div>

      {/* Thumbnail Images */}
      {images.slice(1, 5).map((image, index) => (
        <div key={index} className="relative rounded-lg overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={`${title} - View ${index + 2}`} fill className="object-cover" />
          {index === 3 && images.length > 5 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm">
                    <Grid3X3 className="mr-2 h-4 w-4" />+{images.length - 5} photos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="relative">
                    <Image
                      src={images[currentImage] || "/placeholder.svg"}
                      alt={`${title} - View ${currentImage + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                    />

                    {/* Navigation */}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImage + 1} / {images.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          currentImage === index ? "border-coastal-aqua" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
