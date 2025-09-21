// app/produits/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, Heart, Share2 } from 'lucide-react'
import { getProduct, getProducts } from '@/lib/cosmic'
import ProductGallery from '@/components/ProductGallery'
import RelatedProducts from '@/components/RelatedProducts'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Produit introuvable',
    }
  }

  const productName = product.metadata?.nom || product.title
  const productDescription = product.metadata?.description_courte
  const productImage = product.metadata?.image_principale

  return {
    title: `${productName} - TechStore`,
    description: productDescription || `Découvrez ${productName} sur TechStore`,
    openGraph: productImage ? {
      images: [
        {
          url: `${productImage.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: productName,
        }
      ],
    } : {},
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const productName = product.metadata?.nom || product.title
  const productDescription = product.metadata?.description_courte
  const productDetailedDescription = product.metadata?.description_detaillee
  const productPrice = product.metadata?.prix
  const productPriceBarre = product.metadata?.prix_barre
  const productStock = product.metadata?.stock
  const productImage = product.metadata?.image_principale
  const productGallery = product.metadata?.galerie
  const category = product.metadata?.categorie
  const isPopular = product.metadata?.populaire
  const isNew = product.metadata?.nouveau
  const isOnSale = product.metadata?.en_promotion

  const isOutOfStock = productStock === 0
  const isLowStock = productStock && productStock < 10

  // Prepare images for gallery
  const galleryImages = []
  if (productImage) {
    galleryImages.push(productImage)
  }
  if (productGallery && Array.isArray(productGallery)) {
    galleryImages.push(...productGallery)
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="container-padding py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Accueil</Link>
            <span>/</span>
            {category && (
              <>
                <Link 
                  href={`/categories/${category.slug}`}
                  className="hover:text-gray-700"
                >
                  {category.metadata?.nom || category.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900">{productName}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="container-padding section-spacing">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <ProductGallery images={galleryImages} productName={productName} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex space-x-2">
                {isNew && <span className="badge-primary">Nouveau</span>}
                {isOnSale && <span className="badge-warning">Promo</span>}
                {isPopular && <span className="badge-success">Populaire</span>}
              </div>

              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {productName}
              </h1>

              {/* Category */}
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  {category.metadata?.nom || category.title}
                </Link>
              )}

              {/* Short Description */}
              {productDescription && (
                <p className="text-lg text-gray-600">
                  {productDescription}
                </p>
              )}

              {/* Price */}
              <div className="flex items-center space-x-4">
                {productPrice && (
                  <span className="text-3xl font-bold text-gray-900">
                    {productPrice.toLocaleString('fr-FR')} €
                  </span>
                )}
                {productPriceBarre && productPriceBarre > (productPrice || 0) && (
                  <span className="text-xl text-gray-500 line-through">
                    {productPriceBarre.toLocaleString('fr-FR')} €
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {isOutOfStock ? (
                  <span className="badge-error">Rupture de stock</span>
                ) : isLowStock ? (
                  <span className="badge-warning">Plus que {productStock} en stock</span>
                ) : (
                  <span className="badge-success">En stock</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled={isOutOfStock}
                  className="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isOutOfStock ? 'Produit épuisé' : 'Ajouter au panier'}
                </button>
                
                <button className="btn-outline">
                  <Heart className="h-5 w-5 mr-2" />
                  Favoris
                </button>
                
                <button className="btn-outline">
                  <Share2 className="h-5 w-5 mr-2" />
                  Partager
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Livraison :</span> Gratuite à partir de 50€
                </div>
                <div>
                  <span className="font-medium">Retours :</span> 30 jours pour changer d'avis
                </div>
                <div>
                  <span className="font-medium">Garantie :</span> 2 ans constructeur
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      {productDetailedDescription && (
        <section className="container-padding bg-gray-50">
          <div className="max-w-4xl mx-auto section-spacing">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Description détaillée
            </h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: productDetailedDescription }}
            />
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="container-padding section-spacing">
        <div className="max-w-7xl mx-auto">
          <RelatedProducts 
            currentProduct={product} 
            categoryId={category?.id || ''} 
          />
        </div>
      </section>
    </div>
  )
}