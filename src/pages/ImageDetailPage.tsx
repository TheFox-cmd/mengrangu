import { useCallback, useEffect, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import { gallerySections } from '../data/gallery'
import { guestProjects, projects, publicProjects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './ImageDetailPage.css'

export default function ImageDetailPage() {
    const { type, slug, index } = useParams<{ type?: string; slug?: string; index?: string }>()
    const navigate = useNavigate()
    const idx = Number(index)
    const isHomeFlow = type === undefined && slug === undefined
    const guestUnlocked = sessionStorage.getItem('guests-auth') === 'true'

    const homeImageSet = useMemo(() => {
        const visibleProjects = guestUnlocked ? [...publicProjects, ...guestProjects] : publicProjects
        return visibleProjects
            .map((project) => ({
                src: project.images[0],
                sourceTitle: project.title,
                sourceColor: project.color,
            }))
            .filter((entry): entry is { src: string; sourceTitle: string; sourceColor: string } => !!entry.src)
    }, [guestUnlocked])

    const { images, sectionTitle, sectionColor, isGuestOnly } = useMemo(() => {
        let images: string[] = []
        let sectionTitle = ''
        let basePath = ''
        let sectionColor = '#E8E0D8'
        let isGuestOnly = false
        let backLabel = ''

        if (isHomeFlow) {
            images = homeImageSet.map((entry) => entry.src)
            sectionTitle = 'Home'
            basePath = '/home'
            sectionColor = homeImageSet[idx]?.sourceColor ?? '#E8E0D8'
            backLabel = 'Home'
        } else if (type === 'projects') {
            const project = projects.find((p) => p.slug === slug)
            if (project) {
                images = project.images
                sectionTitle = project.title
                basePath = `/projects/${slug}`
                sectionColor = project.color
                isGuestOnly = !!project.guestOnly
                backLabel = project.title
            }
        } else if (type === 'gallery') {
            const section = gallerySections.find((s) => s.slug === slug)
            if (section) {
                images = section.images
                sectionTitle = section.title
                basePath = `/gallery/${slug}`
                sectionColor = section.color
                backLabel = section.title
            }
        }

        return { images, sectionTitle, basePath, sectionColor, isGuestOnly, backLabel }
    }, [isHomeFlow, homeImageSet, idx, type, slug])

    usePageTitle(sectionTitle || 'Image')

    const hasPrev = idx > 0
    const hasNext = idx < images.length - 1

    const goTo = useCallback((i: number) => {
        if (isHomeFlow) {
            navigate(`/image/home/${i}`, { replace: true })
            return
        }

        navigate(`/image/${type}/${slug}/${i}`, { replace: true })
    }, [navigate, isHomeFlow, type, slug])

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
        const baseName = decoded.replace(/\.[^.]+$/, '')
        const withoutBuildHash = baseName.replace(/-[A-Za-z0-9_]{6,}$/, '')
        return withoutBuildHash.replace(/[-_]/g, ' ').trim()
    })()

    const getImageName = (i: number) => {
        const src = images[i] ?? ''
        const decoded = decodeURIComponent(src.split('/').pop() ?? '')
        const baseName = decoded.replace(/\.[^.]+$/, '')
        const withoutBuildHash = baseName.replace(/-[A-Za-z0-9_]{6,}$/, '')
        return withoutBuildHash.replace(/[-_]/g, ' ').trim()
    }

    return (
        <div className="image-detail-page">
            <BackButton />

            <div className="image-detail-content">
                <div className="image-detail-header-title">
                    <div className="image-detail-header-text">
                        <img src={logoImg} alt="" className="image-detail-header-logo" />
                        <span className="image-detail-header-lg">Art</span>
                        <span className="image-detail-header-sm">of</span>
                        <span className="image-detail-header-lg">Mengran</span>
                    </div>
                </div>

                <div className="image-detail-viewer" style={{ backgroundColor: sectionColor }}>
                    <div className="image-detail-center">
                        <img
                            src={images[idx]}
                            alt={`${isHomeFlow ? (homeImageSet[idx]?.sourceTitle ?? 'Home') : sectionTitle} ${idx + 1}`}
                            className="image-detail-img"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                        />
                    </div>
                </div>

                <div className="image-detail-info">
                    <p className="image-detail-caption">{imageName}</p>
                    <p className="image-detail-counter">{idx + 1} / {images.length}</p>
                </div>

                <nav className="image-detail-nav">
                    {hasPrev ? (
                        <button className="image-detail-nav-link image-detail-nav-prev" onClick={() => goTo(idx - 1)}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            <span>{getImageName(idx - 1)}</span>
                        </button>
                    ) : <span />}
                    {hasNext ? (
                        <button className="image-detail-nav-link image-detail-nav-next" onClick={() => goTo(idx + 1)}>
                            <span>{getImageName(idx + 1)}</span>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    ) : <span />}
                </nav>

                <Footer />
            </div>
        </div>
    )
}
