"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu, User, Heart, Calendar, Phone } from "lucide-react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-coastal-navy/20 bg-coastal-navy/95 backdrop-blur supports-[backdrop-filter]:bg-coastal-navy/90 text-white">
      {/* Phone Number Bar */}
      <div className="bg-coastal-aqua text-coastal-navy py-1">
        <div className="container flex justify-end items-center">
          <a href="tel:1-800-237-1138" className="flex items-center text-sm font-medium">
            <Phone className="h-3 w-3 mr-1" />
            1-800-237-1138
          </a>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/surf-or-sound-logo.svg"
            alt="Surf or Sound Realty"
            width={120}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/properties" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Rentals
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/partner" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Partner
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a href="https://surforsoundsales.com" target="_blank" rel="noopener noreferrer">
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Real Estate Sales
                </NavigationMenuLink>
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input
              placeholder="Search destinations, properties..."
              className="pl-10 pr-4 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-coastal-aqua"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10 hover:text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-white/10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="bg-coastal-aqua text-coastal-navy">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/renter" className="text-coastal-navy">
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/owner" className="text-coastal-navy">
                  <User className="mr-2 h-4 w-4" />
                  Owner Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="text-coastal-navy">
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-coastal-navy">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 hover:text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <nav className="flex flex-col space-y-4">
                <Link href="/properties" className="text-lg font-medium text-coastal-navy hover:text-coastal-aqua">
                  Rentals
                </Link>
                <Link href="/about" className="text-lg font-medium text-coastal-navy hover:text-coastal-aqua">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium text-coastal-navy hover:text-coastal-aqua">
                  Contact
                </Link>
                <Link href="/partner" className="text-lg font-medium text-coastal-navy hover:text-coastal-aqua">
                  Partner
                </Link>
                <a
                  href="https://surforsoundsales.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-coastal-navy hover:text-coastal-aqua"
                >
                  Real Estate Sales
                </a>
                <div className="pt-4 border-t border-gray-200">
                  <a href="tel:1-800-237-1138" className="flex items-center text-coastal-navy">
                    <Phone className="h-4 w-4 mr-2" />
                    1-800-237-1138
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden border-t border-white/20 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input
              placeholder="Search destinations, properties..."
              className="pl-10 pr-4 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-coastal-aqua"
            />
          </div>
        </div>
      )}
    </header>
  )
}
