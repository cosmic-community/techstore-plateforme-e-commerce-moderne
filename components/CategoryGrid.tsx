import Link from 'next/link'
import { Category } from '@/types'

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune catégorie disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const categoryName = category.metadata?.nom || category.title
        const categoryDescription = category.metadata?.description
        const categoryImage = category.metadata?.image_banniere

        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Category Image */}
            <div className="aspect-video relative overflow-hidden">
              {categoryImage ? (
                <img
                  src={`${categoryImage.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                  alt={categoryName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {categoryName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
            </div>

            {/* Category Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {categoryName}
              </h3>
              
              {categoryDescription && (
                <p className="text-gray-600 line-clamp-2">
                  {categoryDescription}
                </p>
              )}
              
              <div className="mt-4 flex items-center text-primary-600 font-medium">
                <span>Voir les produits</span>
                <svg 
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}