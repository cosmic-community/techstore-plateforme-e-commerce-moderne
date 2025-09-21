import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getSiteParameters, getCategories } from '@/lib/cosmic'

export default async function Footer() {
  const [siteParams, categories] = await Promise.all([
    getSiteParameters(),
    getCategories()
  ])

  const siteName = siteParams?.metadata?.nom_site || 'TechStore'
  const logo = siteParams?.metadata?.logo_principal
  const email = siteParams?.metadata?.email_contact
  const phone = siteParams?.metadata?.telephone
  const address = siteParams?.metadata?.adresse

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
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
                <span className="text-xl font-bold text-white">{siteName}</span>
              </div>
              
              <p className="text-gray-400 mb-6 max-w-md">
                {siteParams?.metadata?.description || 'Votre boutique en ligne de référence pour les dernières innovations technologiques.'}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary-400" />
                    <a 
                      href={`mailto:${email}`} 
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {email}
                    </a>
                  </div>
                )}
                
                {phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary-400" />
                    <a 
                      href={`tel:${phone}`} 
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {phone}
                    </a>
                  </div>
                )}
                
                {address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                    <span className="text-gray-300 whitespace-pre-line">{address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Catégories</h3>
              <ul className="space-y-2">
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {category.metadata?.nom || category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Liens utiles</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors duration-200">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/conditions-generales" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Conditions générales
                  </Link>
                </li>
                <li>
                  <Link href="/livraison" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Livraison
                  </Link>
                </li>
                <li>
                  <Link href="/retours" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Retours
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {siteName}. Tous droits réservés.
              </p>
              
              <div className="flex items-center space-x-6">
                <Link href="/mentions-legales" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Mentions légales
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Gestion des cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}