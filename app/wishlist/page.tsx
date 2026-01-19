import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WishlistView } from '@/components/wishlist-view'

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
          <WishlistView />
        </div>
      </main>
      <Footer />
    </div>
  )
}
