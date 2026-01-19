import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { FeaturedProducts } from '@/components/featured-products'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <FeaturedProducts />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
