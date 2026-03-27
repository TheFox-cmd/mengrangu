export interface GallerySection {
  slug: string
  title: string
  description: string
  color: string
  images: string[]
}

export const gallerySections: GallerySection[] = [
  {
    slug: 'photography',
    title: 'Photography',
    description: 'Personal photos — landscapes, urban explorations, and candid moments.',
    color: '#B8A898',
    images: [
      'https://placehold.co/600x400/B8A898/fff?text=Photo+1',
      'https://placehold.co/600x750/A89888/fff?text=Photo+2',
      'https://placehold.co/600x500/C8B8A8/fff?text=Photo+3',
      'https://placehold.co/600x650/988878/fff?text=Photo+4',
      'https://placehold.co/600x420/B8A898/fff?text=Photo+5',
      'https://placehold.co/600x580/A89888/fff?text=Photo+6',
      'https://placehold.co/600x700/C8B8A8/fff?text=Photo+7',
      'https://placehold.co/600x380/988878/fff?text=Photo+8',
      'https://placehold.co/600x530/B8A898/fff?text=Photo+9',
      'https://placehold.co/600x620/A89888/fff?text=Photo+10',
      'https://placehold.co/600x460/C8B8A8/fff?text=Photo+11',
      'https://placehold.co/600x720/988878/fff?text=Photo+12',
    ],
  },
  {
    slug: 'quick-draws',
    title: 'Quick Draws',
    description: 'Warm-up sketches, gesture drawings, and timed studies.',
    color: '#A8B8A0',
    images: [
      'https://placehold.co/600x500/A8B8A0/fff?text=Sketch+1',
      'https://placehold.co/600x700/98A890/fff?text=Sketch+2',
      'https://placehold.co/600x400/B8C8B0/fff?text=Sketch+3',
      'https://placehold.co/600x600/889880/fff?text=Sketch+4',
      'https://placehold.co/600x450/A8B8A0/fff?text=Sketch+5',
      'https://placehold.co/600x550/98A890/fff?text=Sketch+6',
      'https://placehold.co/600x680/B8C8B0/fff?text=Sketch+7',
      'https://placehold.co/600x420/889880/fff?text=Sketch+8',
      'https://placehold.co/600x580/A8B8A0/fff?text=Sketch+9',
      'https://placehold.co/600x350/98A890/fff?text=Sketch+10',
    ],
  },
  {
    slug: 'studies',
    title: 'Studies',
    description: 'Color studies, anatomy practice, and material explorations.',
    color: '#9EAEBE',
    images: [
      'https://placehold.co/600x600/9EAEBE/fff?text=Study+1',
      'https://placehold.co/600x450/8E9EAE/fff?text=Study+2',
      'https://placehold.co/600x750/AEBECE/fff?text=Study+3',
      'https://placehold.co/600x500/7E8E9E/fff?text=Study+4',
      'https://placehold.co/600x680/9EAEBE/fff?text=Study+5',
      'https://placehold.co/600x400/8E9EAE/fff?text=Study+6',
      'https://placehold.co/600x570/AEBECE/fff?text=Study+7',
      'https://placehold.co/600x720/7E8E9E/fff?text=Study+8',
    ],
  },
  {
    slug: 'fan-art',
    title: 'Fan Art',
    description: 'Tributes and reimaginations of beloved characters and worlds.',
    color: '#C0A8B0',
    images: [
      'https://placehold.co/600x700/C0A8B0/fff?text=Fan+1',
      'https://placehold.co/600x500/B098A0/fff?text=Fan+2',
      'https://placehold.co/600x400/D0B8C0/fff?text=Fan+3',
      'https://placehold.co/600x650/A08890/fff?text=Fan+4',
      'https://placehold.co/600x480/C0A8B0/fff?text=Fan+5',
      'https://placehold.co/600x580/B098A0/fff?text=Fan+6',
      'https://placehold.co/600x350/D0B8C0/fff?text=Fan+7',
      'https://placehold.co/600x620/A08890/fff?text=Fan+8',
      'https://placehold.co/600x530/C0A8B0/fff?text=Fan+9',
    ],
  },
]
