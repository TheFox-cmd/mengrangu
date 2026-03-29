import { Link } from 'react-router-dom'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import { publicProjects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './HomePage.css'

export default function HomePage() {
    usePageTitle('Home')

    const homeImages = publicProjects.flatMap((project) =>
        project.images.map((src, index) => ({
            src,
            index,
            projectSlug: project.slug,
            projectTitle: project.title,
        })),
    )

    return (
        <div className="home-page">
            <section className="home-gallery-section">
                <div className="home-masonry-gallery">
                    {homeImages.map((image) => (
                        <Link
                            to={`/image/projects/${image.projectSlug}/${image.index}`}
                            className="home-masonry-item"
                            key={`${image.projectSlug}-${image.index}`}
                        >
                            <img
                                src={image.src}
                                alt={`${image.projectTitle} ${image.index + 1}`}
                                loading="eager"
                                fetchPriority="high"
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
