import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { guestProjects, publicProjects } from '../data/projects'
import useMasonryColumns from '../hooks/useMasonryColumns'
import usePageTitle from '../hooks/usePageTitle'
import './HomePage.css'

export default function HomePage() {
    usePageTitle('Home')

    const [guestUnlocked, setGuestUnlocked] = useState(() => sessionStorage.getItem('guests-auth') === 'true')

    useEffect(() => {
        const syncGuestAccess = () => {
            setGuestUnlocked(sessionStorage.getItem('guests-auth') === 'true')
        }

        window.addEventListener('storage', syncGuestAccess)
        window.addEventListener('guest-auth-changed', syncGuestAccess as EventListener)

        return () => {
            window.removeEventListener('storage', syncGuestAccess)
            window.removeEventListener('guest-auth-changed', syncGuestAccess as EventListener)
        }
    }, [])

    const visibleProjects = guestUnlocked ? [...publicProjects, ...guestProjects] : publicProjects

    const homeImages = visibleProjects
        .map((project) => ({
            src: project.images[0],
            to: `/projects/${project.slug}`,
            sourceKey: `project-${project.slug}`,
            sourceTitle: project.title,
        }))
        .filter((image): image is { src: string; to: string; sourceKey: string; sourceTitle: string } => !!image.src)

    const columns = useMasonryColumns(homeImages)

    return (
        <div className="home-page">
            <BackButton />
            <section className="home-gallery-section">
                <div className="home-masonry-gallery">
                    {columns.map((column, columnIndex) => (
                        <div className="home-masonry-column" key={columnIndex}>
                            {column.map((image) => (
                                <Link
                                    to={image.to}
                                    className="home-masonry-item"
                                    key={image.sourceKey}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.sourceTitle}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
            <BackToTop />
        </div>
    )
}
