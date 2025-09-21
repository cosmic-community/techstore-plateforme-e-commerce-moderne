import { 
  getActiveBanners, 
  getPopularProducts, 
  getCategories 
} from '@/lib/cosmic'
import HeroBanner from '@/components/HeroBanner'
import ProductGrid from '@/components/ProductGrid'
import CategoryGrid from '@/components/CategoryGrid'

export default async function HomePage() {
  const [banners, popularProducts, categories] = await Promise.all([
    getActiveBanners(),
    getPopularProducts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Banners */}
      {banners && banners.length > 0 && (
        <section className="mb-12">
          <HeroBanner banners={banners} />
        </section>
      )}

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="container-padding mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos Catégories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre sélection de produits organisés par catégories pour faciliter votre navigation
              </p>
            </div>
            <CategoryGrid categories={categories} />
          </div>
        </section>
      )}

      {/* Popular Products Section */}
      {popularProducts && popularProducts.length > 0 && (
        <section className="container-padding mb-16 bg-gray-50">
          <div className="max-w-7xl mx-auto section-spacing">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Produits Populaires
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez les produits les plus appréciés par nos clients
              </p>
            </div>
            <ProductGrid products={popularProducts} />
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary-600 rounded-2xl text-center py-16 px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Restez informé des dernières nouveautés
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour être le premier à découvrir nos nouveaux produits et nos offres exclusives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-300 focus:outline-none"
              />
              <button className="w-full sm:w-auto btn-primary bg-white text-primary-600 hover:bg-gray-50 px-8 py-3">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}