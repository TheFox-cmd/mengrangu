import { galleryImagesByFolder } from './imageLoader'

export interface GallerySection {
  slug: string
  title: string
  description: string
  color: string
  images: string[]
}

export const gallerySections: GallerySection[] = [
  {
    slug: 'quick-draws',
    title: 'Quick Draws',
    description: 'Warm-up sketches, gesture drawings, and timed studies.',
    color: '#A8B8A0',
    images: galleryImagesByFolder['quickdraw'] ?? [],
  },
]
