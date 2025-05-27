import { HeroSection } from "@/components/home/hero-section"
import { SearchSection } from "@/components/home/search-section"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { TrustSignals } from "@/components/home/trust-signals"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { StatsSection } from "@/components/home/stats-section"
import { LocalAttractionsSection } from "@/components/home/local-attractions-section"
import { WeatherWidget } from "@/components/home/weather-widget"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SearchSection />
      <FeaturedProperties />
      <LocalAttractionsSection />
      <WeatherWidget />
      <TestimonialsSection />
      <TrustSignals />
      <StatsSection />
      <NewsletterSection />
    </main>
  )
}
