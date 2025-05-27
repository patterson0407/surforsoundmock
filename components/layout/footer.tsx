import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-coastal-navy text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/surf-or-sound-logo.svg"
                alt="Surf or Sound Realty"
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-coastal-sand text-sm">
              Your premier destination for coastal vacation rentals. Experience the perfect blend of luxury and coastal
              charm.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-coastal-sand hover:text-coastal-aqua transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-coastal-sand hover:text-coastal-aqua transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-coastal-sand hover:text-coastal-aqua transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Properties</h3>
            <ul className="space-y-2 text-coastal-sand text-sm">
              <li>
                <Link href="/properties?type=oceanfront" className="hover:text-coastal-aqua transition-colors">
                  Oceanfront Rentals
                </Link>
              </li>
              <li>
                <Link href="/properties?type=soundside" className="hover:text-coastal-aqua transition-colors">
                  Soundside Homes
                </Link>
              </li>
              <li>
                <Link href="/properties?type=luxury" className="hover:text-coastal-aqua transition-colors">
                  Luxury Estates
                </Link>
              </li>
              <li>
                <Link href="/properties?type=family" className="hover:text-coastal-aqua transition-colors">
                  Family Friendly
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-coastal-sand text-sm">
              <li>
                <Link href="/help" className="hover:text-coastal-aqua transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-coastal-aqua transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-coastal-aqua transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-coastal-aqua transition-colors">
                  Safety Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-coastal-sand text-sm">
              <li>
                <Link href="/about" className="hover:text-coastal-aqua transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-coastal-aqua transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-coastal-aqua transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-coastal-aqua transition-colors">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-coastal-navy-light mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-coastal-sand text-sm">
            © {new Date().getFullYear()} Surf or Sound Realty. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-coastal-sand hover:text-coastal-aqua text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-coastal-sand hover:text-coastal-aqua text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
