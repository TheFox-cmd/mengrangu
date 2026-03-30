import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { gallerySections } from '../data/gallery'
import useMasonryColumns from '../hooks/useMasonryColumns'
import usePageTitle from '../hooks/usePageTitle'
import './GalleryPage.css'

function LazyImage({
    src,
    alt,
    eager = false,
}: {
    src: string
    alt: string
    eager?: boolean
}) {
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const img = imgRef.current
        if (!img) return
        if (img.complete) {
            img.classList.add('loaded')
            return
        }
        const onLoad = () => {
            img.classList.add('loaded')
        }
        img.addEventListener('load', onLoad)
        return () => img.removeEventListener('load', onLoad)
    }, [])

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'low'}
            decoding="async"
            className="fade-img"
        />
    )
}

function GallerySectionGrid({ section, slug }: { section: typeof gallerySections[number]; slug?: string }) {
    const isRealImage = (src: string) => !src.includes('placehold.co')
    const images = section.images.filter(isRealImage)
    const galleryColumns = useMasonryColumns(
        images.map((src, index) => ({ src, index })),
    )

    return (
        <div className="gallery-section" key={section.slug} id={section.slug}>
            {!slug && <h2 className="gallery-section-title">{section.title}</h2>}
            <p className="gallery-section-desc">{section.description}</p>
            {images.length > 0 ? (
                <div className="detail-gallery">
                    {galleryColumns.map((column, columnIndex) => (
                        <div className="detail-gallery-column" key={columnIndex}>
                            {column.map(({ src, index }) => (
                                <Link to={`/image/gallery/${section.slug}/${index}`} className="detail-gallery-item" key={index}>
                                    <LazyImage src={src} alt={`${section.title} ${index + 1}`} eager={index === 0} />
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="gallery-empty">
                    <p>No images yet.</p>
                </div>
            )}
        </div>
    )
}

export default function GalleryPage() {
    const { slug } = useParams<{ slug: string }>()

    const sections = slug
        ? gallerySections.filter((s) => s.slug === slug)
        : gallerySections

    usePageTitle(slug ? sections[0]?.title ?? 'Gallery' : 'Gallery')

    return (
        <div className="gallery-page">
            <BackButton />
            <div className="gallery-page-header">
                <h1>{slug ? sections[0]?.title ?? 'Gallery' : 'Gallery'}</h1>
                {!slug && <p className="gallery-page-subtitle">Personal work, sketches, and explorations</p>}
            </div>

            {sections.length === 0 ? (
                <div className="gallery-empty">
                    <p>Section not found.</p>
                </div>
            ) : (
                sections.map((section) => (
                    <GallerySectionGrid key={section.slug} section={section} slug={slug} />
                ))
            )}

            <Footer />
            <BackToTop />
        </div>
    )
}
