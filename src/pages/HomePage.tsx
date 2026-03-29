import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { guestProjects, publicProjects } from '../data/projects'
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

    const homeImages = visibleProjects.flatMap((project) =>
        project.images.map((src, index) => ({
            src,
            index,
            projectSlug: project.slug,
            projectTitle: project.title,
        })),
    )

    return (
        <div className="home-page">
            <BackButton />
            <section className="home-gallery-section">
                <div className="home-masonry-gallery">
                    {homeImages.map((image, listIndex) => (
                        <Link
                            to={`/image/home/${listIndex}`}
                            className="home-masonry-item"
                            key={`${image.projectSlug}-${image.index}`}
                        >
                            <img
                                src={image.src}
                                alt={`${image.projectTitle} ${image.index + 1}`}
                                loading={listIndex < 3 ? 'eager' : 'lazy'}
                                fetchPriority={listIndex < 3 ? 'high' : 'low'}
                                decoding="async"
                            />
                            <div className="home-masonry-meta">
                                <span>{image.projectTitle}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
            <BackToTop />
        </div>
    )
}
