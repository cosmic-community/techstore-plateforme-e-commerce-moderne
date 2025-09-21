'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Banner } from '@/types'

interface HeroBannerProps {
  banners: Banner[]
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        )
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [banners.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1)
  }

  if (!banners || banners.length === 0) {
    return null
  }

  const currentBanner = banners[currentIndex]

  return (
    <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Banner Image */}
      <div className="absolute inset-0">
        {currentBanner.metadata?.image_fond && (
          <img
            src={`${currentBanner.metadata.image_fond.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={currentBanner.metadata?.titre || currentBanner.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Banner Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white container-padding max-w-4xl">
          {currentBanner.metadata?.titre && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              {currentBanner.metadata.titre}
            </h1>
          )}
          
          {currentBanner.metadata?.sous_titre && (
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 animate-slide-up">
              {currentBanner.metadata.sous_titre}
            </p>
          )}
          
          {currentBanner.metadata?.texte_bouton && currentBanner.metadata?.lien_bouton && (
            <Link
              href={currentBanner.metadata.lien_bouton}
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 animate-slide-up"
            >
              {currentBanner.metadata.texte_bouton}
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Arrows (only show if multiple banners) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator (only show if multiple banners) */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}