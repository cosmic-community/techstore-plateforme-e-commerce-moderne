import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const productName = product.metadata?.nom || product.title
  const productDescription = product.metadata?.description_courte
  const productPrice = product.metadata?.prix
  const productPriceBarre = product.metadata?.prix_barre
  const productImage = product.metadata?.image_principale
  const productStock = product.metadata?.stock
  const isPopular = product.metadata?.populaire
  const isNew = product.metadata?.nouveau
  const isOnSale = product.metadata?.en_promotion
  const categoryName = product.metadata?.categorie?.metadata?.nom || product.metadata?.categorie?.title

  const isOutOfStock = productStock === 0

  return (
    <div className="card group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden">
        <Link href={`/produits/${product.slug}`}>
          {productImage ? (
            <img
              src={`${productImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">
                {productName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </Link>

        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isNew && (
            <span className="badge-primary">
              Nouveau
            </span>
          )}
          {isOnSale && (
            <span className="badge-warning">
              Promo
            </span>
          )}
          {isPopular && (
            <span className="badge-success">
              Populaire
            </span>
          )}
        </div>

        {/* Stock Status */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Category */}
        {categoryName && (
          <p className="text-xs text-primary-600 font-medium mb-2 uppercase tracking-wide">
            {categoryName}
          </p>
        )}

        {/* Product Title */}
        <Link href={`/produits/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
            {productName}
          </h3>
        </Link>

        {/* Product Description */}
        {productDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {productDescription}
          </p>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {productPrice && (
              <span className="text-lg font-bold text-gray-900">
                {productPrice.toLocaleString('fr-FR')} €
              </span>
            )}
            {productPriceBarre && productPriceBarre > (productPrice || 0) && (
              <span className="text-sm text-gray-500 line-through">
                {productPriceBarre.toLocaleString('fr-FR')} €
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={isOutOfStock}
            className="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed p-2"
            title={isOutOfStock ? 'Produit épuisé' : 'Ajouter au panier'}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        {/* Stock Info */}
        {!isOutOfStock && productStock && productStock < 10 && (
          <p className="text-xs text-orange-600 mt-2">
            Plus que {productStock} en stock
          </p>
        )}
      </div>
    </div>
  )
}