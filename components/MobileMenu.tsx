'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User } from 'lucide-react'
import { Category } from '@/types'

interface MobileMenuProps {
  categories: Category[]
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu} />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex items-center py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    Accueil
                  </Link>
                </li>
                
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      onClick={closeMenu}
                      className="flex items-center py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                    >
                      {category.metadata?.nom || category.title}
                    </Link>
                  </li>
                ))}
                
                <li>
                  <Link
                    href="/blog"
                    onClick={closeMenu}
                    className="flex items-center py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </li>
                
                <li className="pt-4 border-t border-gray-200">
                  <Link
                    href="/compte"
                    onClick={closeMenu}
                    className="flex items-center py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Mon compte
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}