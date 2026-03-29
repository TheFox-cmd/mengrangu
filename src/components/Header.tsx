import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gallerySections } from '../data/gallery'
import { guestProjects, publicProjects } from '../data/projects'
import './Header.css'

const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
]

export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const [openDropdown, setOpenDropdown] = useState<{ name: string | null; pathname: string }>({
        name: null,
        pathname: location.pathname,
    })
    const [hidden, setHidden] = useState(false)
    const [guestUnlocked, setGuestUnlocked] = useState(() => sessionStorage.getItem('guests-auth') === 'true')
    const projectsRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)
    const guestsRef = useRef<HTMLDivElement>(null)

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
                galleryRef.current && !galleryRef.current.contains(target) &&
                guestsRef.current && !guestsRef.current.contains(target)
            ) {
                setOpenDropdown({ name: null, pathname: location.pathname })
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [location.pathname])

    useEffect(() => {
        const syncGuestAccess = () => {
            setGuestUnlocked(sessionStorage.getItem('guests-auth') === 'true')
        }

        syncGuestAccess()
        window.addEventListener('storage', syncGuestAccess)
        window.addEventListener('guest-auth-changed', syncGuestAccess as EventListener)

        return () => {
            window.removeEventListener('storage', syncGuestAccess)
            window.removeEventListener('guest-auth-changed', syncGuestAccess as EventListener)
        }
    }, [])

    const visibleDropdown = openDropdown.pathname === location.pathname ? openDropdown.name : null

    const toggle = (name: string) =>
        setOpenDropdown((prev) => ({
            name: prev.pathname === location.pathname && prev.name === name ? null : name,
            pathname: location.pathname,
        }))

    return (
        <header className={`header${hidden ? ' header--hidden' : ''}`}>
            <nav className="header-nav">
                <Link
                    to={navLinks[0].path}
                    className={`nav-link${location.pathname === navLinks[0].path ? ' active' : ''}`}
                >
                    {navLinks[0].label}
                </Link>

                <div className="header-dropdown-wrap" ref={projectsRef}>
                    <button
                        className="nav-link dropdown-toggle"
                        onClick={() => toggle('projects')}
                        aria-expanded={visibleDropdown === 'projects'}
                    >
                        Projects
                        <svg className={`toggle-arrow${visibleDropdown === 'projects' ? ' open' : ''}`} viewBox="0 0 12 8" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 1 6 6 11 1" />
                        </svg>
                    </button>
                    {visibleDropdown === 'projects' && (
                        <ul className="header-dropdown">
                            {publicProjects.map((p) => (
                                <li key={p.id}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            navigate(`/projects/${p.slug}`)
                                            setOpenDropdown({ name: null, pathname: location.pathname })
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
                        aria-expanded={visibleDropdown === 'gallery'}
                    >
                        Gallery
                        <svg className={`toggle-arrow${visibleDropdown === 'gallery' ? ' open' : ''}`} viewBox="0 0 12 8" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 1 6 6 11 1" />
                        </svg>
                    </button>
                    {visibleDropdown === 'gallery' && (
                        <ul className="header-dropdown">
                            {gallerySections.map((s) => (
                                <li key={s.slug}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            navigate(`/gallery/${s.slug}`)
                                            setOpenDropdown({ name: null, pathname: location.pathname })
                                        }}
                                    >
                                        {s.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="header-dropdown-wrap" ref={guestsRef}>
                    {guestUnlocked ? (
                        <>
                            <button
                                className="nav-link dropdown-toggle"
                                onClick={() => toggle('guests')}
                                aria-expanded={visibleDropdown === 'guests'}
                            >
                                Guests
                                <svg className={`toggle-arrow${visibleDropdown === 'guests' ? ' open' : ''}`} viewBox="0 0 12 8" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="1 1 6 6 11 1" />
                                </svg>
                            </button>
                            {visibleDropdown === 'guests' && (
                                <ul className="header-dropdown">
                                    {guestProjects.map((project) => (
                                        <li key={project.id}>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    navigate(`/projects/${project.slug}`)
                                                    setOpenDropdown({ name: null, pathname: location.pathname })
                                                }}
                                            >
                                                {project.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ) : (
                        <Link
                            to="/guests"
                            className={`nav-link${location.pathname === '/guests' ? ' active' : ''}`}
                        >
                            Guests
                        </Link>
                    )}
                </div>

                {navLinks.slice(1).map((item) => (
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
