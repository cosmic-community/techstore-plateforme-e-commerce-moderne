import Link from 'next/link'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { getSiteParameters, getCategories } from '@/lib/cosmic'
import MobileMenu from '@/components/MobileMenu'

export default async function Header() {
  const [siteParams, categories] = await Promise.all([
    getSiteParameters(),
    getCategories()
  ])

  const siteName = siteParams?.metadata?.nom_site || 'TechStore'
  const logo = siteParams?.metadata?.logo_principal

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                {logo ? (
                  <img
                    src={`${logo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                    alt={siteName}
                    width="40"
                    height="40"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                )}
                <span className="text-xl font-bold text-gray-900">{siteName}</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Accueil
              </Link>
              {categories?.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {category.metadata?.nom || category.title}
                </Link>
              ))}
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Blog
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <button className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200">
                <Search className="h-6 w-6" />
              </button>

              {/* Cart */}
              <Link
                href="/panier"
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* User Account */}
              <Link
                href="/compte"
                className="hidden sm:flex p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <User className="h-6 w-6" />
              </Link>

              {/* Mobile Menu Button */}
              <MobileMenu categories={categories || []} />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}