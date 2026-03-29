import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './ProjectPage.css'

function getColumnCount(width: number) {
    if (width <= 600) return 1
    if (width <= 1024) return 2
    return 3
}

function distributeIntoColumns<T>(items: T[], columnCount: number) {
    return Array.from({ length: columnCount }, (_, columnIndex) =>
        items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex),
    )
}

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

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>()
    const project = projects.find((p) => p.slug === slug)
    const [columnCount, setColumnCount] = useState(() => getColumnCount(window.innerWidth))
    usePageTitle(project?.title ?? 'Project')

    useEffect(() => {
        const handleResize = () => {
            setColumnCount(getColumnCount(window.innerWidth))
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!project) {
        return (
            <div className="project-page">
                <div className="project-detail-header">
                    <p>Project not found.</p>
                </div>
            </div>
        )
    }

    if (project.guestOnly && sessionStorage.getItem('guests-auth') !== 'true') {
        return <Navigate to="/guests" replace />
    }

    const galleryColumns = distributeIntoColumns(
        project.images.map((src, index) => ({ src, index })),
        columnCount,
    )

    return (
        <div className="project-page">
            <BackButton />
            <div className="project-hero" style={{ backgroundColor: project.color }}>
                <h1 className="project-detail-title">{project.title}</h1>
                <p className="project-detail-brief">{project.brief}</p>
            </div>

            <div className="project-body">
                <p className="project-description">{project.description}</p>

                {project.images.length > 0 ? (
                    <div className="detail-gallery">
                        {galleryColumns.map((column, columnIndex) => (
                            <div className="detail-gallery-column" key={columnIndex}>
                                {column.map(({ src, index }) => (
                                    <Link to={`/image/projects/${project.slug}/${index}`} className="detail-gallery-item" key={index}>
                                        <LazyImage
                                            src={src}
                                            alt={`${project.title} work ${index + 1}`}
                                            eager={index === 0}
                                        />
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="project-gallery-placeholder">
                        <p>Gallery coming soon</p>
                    </div>
                )}
            </div>

            <Footer />
            <BackToTop />
        </div>
    )
}
