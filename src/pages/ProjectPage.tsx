import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './ProjectPage.css'

function LazyImage({ src, alt }: { src: string; alt: string }) {
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

    return <img ref={imgRef} src={src} alt={alt} loading="lazy" className="fade-img" />
}

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>()
    const project = projects.find((p) => p.slug === slug)
    usePageTitle(project?.title ?? 'Project')

    if (!project) {
        return (
            <div className="project-page">
                <div className="project-detail-header">
                    <p>Project not found.</p>
                </div>
            </div>
        )
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
                    <div className="masonry-gallery">
                        {project.images.map((src, i) => (
                            <Link to={`/image/projects/${project.slug}/${i}`} className="masonry-item" key={i}>
                                <LazyImage src={src} alt={`${project.title} work ${i + 1}`} />
                            </Link>
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
