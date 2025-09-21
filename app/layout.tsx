import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getSiteParameters } from '@/lib/cosmic'

export async function generateMetadata(): Promise<Metadata> {
  const siteParams = await getSiteParameters()
  
  return {
    title: siteParams?.metadata?.nom_site || 'TechStore',
    description: siteParams?.metadata?.description || 'Votre boutique en ligne de référence pour les dernières innovations technologiques.',
    keywords: 'e-commerce, technologie, smartphones, ordinateurs, accessoires',
    authors: [{ name: 'TechStore' }],
    creator: 'TechStore',
    publisher: 'TechStore',
    openGraph: {
      title: siteParams?.metadata?.nom_site || 'TechStore',
      description: siteParams?.metadata?.description || 'Votre boutique en ligne de référence pour les dernières innovations technologiques.',
      type: 'website',
      locale: 'fr_FR',
      images: siteParams?.metadata?.logo_principal ? [
        {
          url: `${siteParams.metadata.logo_principal.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: siteParams?.metadata?.nom_site || 'TechStore',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteParams?.metadata?.nom_site || 'TechStore',
      description: siteParams?.metadata?.description || 'Votre boutique en ligne de référence pour les dernières innovations technologiques.',
      images: siteParams?.metadata?.logo_principal ? [
        `${siteParams.metadata.logo_principal.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      ] : [],
    },
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="fr" className="h-full">
      <head>
        <script src="/dashboard-console-capture.js"></script>
        {/* Console capture script for dashboard debugging */}
      </head>
      <body className="h-full flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}