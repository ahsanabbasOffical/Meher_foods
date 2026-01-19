import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">About Meher Foods</h1>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Meher Foods has been a trusted name in premium spices and food products for over two decades.
                  Founded with a passion for quality and authenticity, we bring you the finest selection of spices,
                  herbs, and food products from around the world.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our commitment to excellence ensures that every product meets the highest standards of quality,
                  freshness, and purity. We source our ingredients directly from trusted farmers and suppliers,
                  maintaining traditional methods while embracing modern quality controls.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  To provide our customers with authentic, high-quality spices and food products that enhance
                  their culinary experiences. We believe that great food starts with great ingredients, and
                  we're dedicated to making those ingredients accessible to everyone.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our mission extends beyond just selling products – we aim to educate and inspire our customers
                  about the rich traditions and flavors of global cuisine.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Meher Foods?</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h3 className="font-semibold mb-2">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Carefully selected and tested for purity and potency
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick and reliable shipping to your doorstep
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💝</span>
                  </div>
                  <h3 className="font-semibold mb-2">Customer Satisfaction</h3>
                  <p className="text-sm text-muted-foreground">
                    Your happiness is our top priority
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
