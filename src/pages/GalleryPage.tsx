import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { gallerySections } from '../data/gallery'
import usePageTitle from '../hooks/usePageTitle'
import './GalleryPage.css'

function LazyImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const img = imgRef.current
        if (!img) return
        if (img.complete) {
            img.classList.add('loaded')
            return
        }
        const onLoad = () => img.classList.add('loaded')
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
                    <div className="gallery-section" key={section.slug} id={section.slug}>
                        {!slug && <h2 className="gallery-section-title">{section.title}</h2>}
                        <p className="gallery-section-desc">{section.description}</p>
                        <div className="detail-gallery">
                            {section.images.map((src, i) => (
                                <Link to={`/image/gallery/${section.slug}/${i}`} className="detail-gallery-item" key={i}>
                                    <LazyImage src={src} alt={`${section.title} ${i + 1}`} eager={i === 0} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            )}

            <Footer />
            <BackToTop />
        </div>
    )
}
