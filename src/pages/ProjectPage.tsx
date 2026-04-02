import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { projects, publicProjects } from '../data/projects'
import useMasonryColumns from '../hooks/useMasonryColumns'
import usePageTitle from '../hooks/usePageTitle'
import './ProjectPage.css'

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
    usePageTitle(project?.title ?? 'Project')

    const galleryColumns = useMasonryColumns(
        (project?.images ?? []).map((src, index) => ({ src, index })),
    )

    const projectIndex = publicProjects.findIndex((p) => p.slug === slug)
    const prevProject = projectIndex > 0 ? publicProjects[projectIndex - 1] : null
    const nextProject = projectIndex < publicProjects.length - 1 ? publicProjects[projectIndex + 1] : null

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

            <nav className="project-nav">
                {prevProject ? (
                    <Link to={`/projects/${prevProject.slug}`} className="project-nav-link project-nav-prev">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        <span>{prevProject.title}</span>
                    </Link>
                ) : <span />}
                {nextProject ? (
                    <Link to={`/projects/${nextProject.slug}`} className="project-nav-link project-nav-next">
                        <span>{nextProject.title}</span>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </Link>
                ) : <span />}
            </nav>

            <Footer />
            <BackToTop />
        </div>
    )
}
