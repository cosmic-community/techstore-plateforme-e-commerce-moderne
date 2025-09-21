// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getProductsByCategory } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Catégorie introuvable',
    }
  }

  const categoryName = category.metadata?.nom || category.title
  const categoryDescription = category.metadata?.description

  return {
    title: `${categoryName} - TechStore`,
    description: categoryDescription || `Découvrez notre sélection de produits ${categoryName.toLowerCase()}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug)
  ])

  if (!category) {
    notFound()
  }

  const categoryName = category.metadata?.nom || category.title
  const categoryDescription = category.metadata?.description
  const categoryImage = category.metadata?.image_banniere

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <section className="relative bg-gray-900 text-white">
        {categoryImage && (
          <>
            <div className="absolute inset-0">
              <img
                src={`${categoryImage.imgix_url}?w=1920&h=400&fit=crop&auto=format,compress`}
                alt={categoryName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60" />
            </div>
          </>
        )}
        
        <div className="relative container-padding section-spacing">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryName}
            </h1>
            {categoryDescription && (
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                {categoryDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container-padding section-spacing">
        <div className="max-w-7xl mx-auto">
          {products && products.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Produits ({products.length})
                </h2>
                
                {/* Future: Add sorting/filtering controls here */}
                <div className="text-sm text-gray-500">
                  Trier par prix, popularité, etc.
                </div>
              </div>
              
              <ProductGrid products={products} />
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Aucun produit disponible
                </h3>
                <p className="text-gray-600 mb-8">
                  Cette catégorie ne contient pas encore de produits. Revenez bientôt pour découvrir nos nouveautés !
                </p>
                <a
                  href="/"
                  className="btn-primary"
                >
                  Retour à l'accueil
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}