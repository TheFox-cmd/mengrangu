import { useCallback, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { gallerySections } from '../data/gallery'
import { projects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './ImageDetailPage.css'

export default function ImageDetailPage() {
    const { type, slug, index } = useParams<{ type: string; slug: string; index: string }>()
    const navigate = useNavigate()
    const idx = Number(index)

    let images: string[] = []
    let sectionTitle = ''
    let basePath = ''
    let sectionColor = '#E8E0D8'
    let isGuestOnly = false

    if (type === 'projects') {
        const project = projects.find((p) => p.slug === slug)
        if (project) {
            images = project.images
            sectionTitle = project.title
            basePath = `/projects/${slug}`
            sectionColor = project.color
            isGuestOnly = !!project.guestOnly
        }
    } else if (type === 'gallery') {
        const section = gallerySections.find((s) => s.slug === slug)
        if (section) {
            images = section.images
            sectionTitle = section.title
            basePath = `/gallery/${slug}`
            sectionColor = section.color
        }
    }

    usePageTitle(sectionTitle || 'Image')

    const hasPrev = idx > 0
    const hasNext = idx < images.length - 1

    const goTo = useCallback(
        (i: number) => navigate(`/image/${type}/${slug}/${i}`, { replace: true }),
        [navigate, type, slug],
    )

    useEffect(() => {
        const preload = (src?: string) => {
            if (!src) return
            const img = new Image()
            img.decoding = 'async'
            img.src = src
        }

        preload(images[idx + 1])
        preload(images[idx - 1])
    }, [images, idx])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && hasPrev) goTo(idx - 1)
            if (e.key === 'ArrowRight' && hasNext) goTo(idx + 1)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [idx, hasPrev, hasNext, goTo])

    if (isGuestOnly && sessionStorage.getItem('guests-auth') !== 'true') {
        return <Navigate to="/guests" replace />
    }

    if (!images.length || idx < 0 || idx >= images.length) {
        return (
            <div className="image-detail-page">
                <BackButton />
                <div className="image-detail-empty">
                    <p>Image not found.</p>
                </div>
            </div>
        )
    }

    const imageName = (() => {
        const src = images[idx] ?? ''
        const decoded = decodeURIComponent(src.split('/').pop() ?? '')
        return decoded.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
    })()

    return (
        <div className="image-detail-page">
            <BackButton />

            <div className="image-detail-content">
                <div className="image-detail-viewer" style={{ backgroundColor: sectionColor }}>
                    {hasPrev && (
                        <button className="image-nav image-nav--prev" onClick={() => goTo(idx - 1)} aria-label="Previous image">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                    )}

                    <div className="image-detail-center">
                        <img
                            src={images[idx]}
                            alt={`${sectionTitle} ${idx + 1}`}
                            className="image-detail-img"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                        />
                        <p className="image-detail-caption">{imageName}</p>
                    </div>

                    {hasNext && (
                        <button className="image-nav image-nav--next" onClick={() => goTo(idx + 1)} aria-label="Next image">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    )}

                    <div className="image-nav-mobile-row" aria-hidden="true">
                        <button
                            className="image-nav-mobile"
                            onClick={() => hasPrev && goTo(idx - 1)}
                            aria-label="Previous image"
                            disabled={!hasPrev}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            className="image-nav-mobile"
                            onClick={() => hasNext && goTo(idx + 1)}
                            aria-label="Next image"
                            disabled={!hasNext}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="image-detail-meta">
                    <p className="image-detail-counter">{idx + 1} / {images.length}</p>
                    <Link to={basePath} className="image-detail-back-link">
                        ← Back to {sectionTitle}
                    </Link>
                </div>
            </div>
        </div>
    )
}
