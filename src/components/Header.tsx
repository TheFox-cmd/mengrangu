import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gallerySections } from '../data/gallery'
import { projects } from '../data/projects'
import './Header.css'

const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Guests', path: '/guests' },
]

export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [hidden, setHidden] = useState(false)
    const projectsRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onScroll = () => {
            setHidden(window.scrollY > 80)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node
            if (
                projectsRef.current && !projectsRef.current.contains(target) &&
                galleryRef.current && !galleryRef.current.contains(target)
            ) {
                setOpenDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggle = (name: string) =>
        setOpenDropdown((prev) => (prev === name ? null : name))

    return (
        <header className={`header${hidden ? ' header--hidden' : ''}`}>
            <nav className="header-nav">
                <div className="header-dropdown-wrap" ref={projectsRef}>
                    <button
                        className="nav-link dropdown-toggle"
                        onClick={() => toggle('projects')}
                        aria-expanded={openDropdown === 'projects'}
                    >
                        Projects
                        <svg className={`toggle-arrow${openDropdown === 'projects' ? ' open' : ''}`} viewBox="0 0 12 8" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 1 6 6 11 1" />
                        </svg>
                    </button>
                    {openDropdown === 'projects' && (
                        <ul className="header-dropdown">
                            {projects.map((p) => (
                                <li key={p.id}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            navigate(`/projects/${p.slug}`)
                                            setOpenDropdown(null)
                                        }}
                                    >
                                        {p.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="header-dropdown-wrap" ref={galleryRef}>
                    <button
                        className="nav-link dropdown-toggle"
                        onClick={() => toggle('gallery')}
                        aria-expanded={openDropdown === 'gallery'}
                    >
                        Gallery
                        <svg className={`toggle-arrow${openDropdown === 'gallery' ? ' open' : ''}`} viewBox="0 0 12 8" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 1 6 6 11 1" />
                        </svg>
                    </button>
                    {openDropdown === 'gallery' && (
                        <ul className="header-dropdown">
                            {gallerySections.map((s) => (
                                <li key={s.slug}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            navigate(`/gallery/${s.slug}`)
                                            setOpenDropdown(null)
                                        }}
                                    >
                                        {s.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {navLinks.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    )
}
