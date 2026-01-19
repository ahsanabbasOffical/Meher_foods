import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-[60vh] bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Premium Spices & Foods
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Discover authentic flavors from Meher Foods. Quality spices and ingredients for your culinary journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
