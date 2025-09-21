import { getProductsByCategory } from '@/lib/cosmic'
import { Product } from '@/types'
import ProductGrid from '@/components/ProductGrid'

interface RelatedProductsProps {
  currentProduct: Product
  categoryId: string
}

export default async function RelatedProducts({ 
  currentProduct, 
  categoryId 
}: RelatedProductsProps) {
  if (!categoryId) return null

  try {
    const categoryProducts = await getProductsByCategory(categoryId)
    
    // Filter out current product and limit to 4 related products
    const relatedProducts = categoryProducts
      .filter(product => product.id !== currentProduct.id)
      .slice(0, 4)

    if (relatedProducts.length === 0) return null

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Produits similaires
        </h2>
        <ProductGrid products={relatedProducts} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching related products:', error)
    return null
  }
}