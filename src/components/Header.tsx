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
    const [mobileMenu, setMobileMenu] = useState<{ open: boolean; pathname: string }>({
        open: false,
        pathname: location.pathname,
    })
    const [mobileExpanded, setMobileExpanded] = useState({
        projects: false,
        gallery: false,
        guests: false,
    })
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
    const mobileMenuOpen = mobileMenu.pathname === location.pathname && mobileMenu.open

    useEffect(() => {
        if (!mobileMenuOpen) {
            document.body.style.overflow = ''
            return
        }

        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    const toggle = (name: string) =>
        setOpenDropdown((prev) => ({
            name: prev.pathname === location.pathname && prev.name === name ? null : name,
            pathname: location.pathname,
        }))

    const toggleMobileMenu = () => {
        setMobileMenu((prev) => ({
            open: !(prev.pathname === location.pathname && prev.open),
            pathname: location.pathname,
        }))
    }

    const closeMobileMenu = () => {
        setMobileMenu({ open: false, pathname: location.pathname })
    }

    const toggleMobileSection = (section: 'projects' | 'gallery' | 'guests') => {
        setMobileExpanded((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const onNavigate = (to: string) => {
        navigate(to)
        setOpenDropdown({ name: null, pathname: location.pathname })
        closeMobileMenu()
    }

    return (
        <header className={`header${hidden ? ' header--hidden' : ''}`}>
            <button
                className="mobile-menu-toggle"
                onClick={(e) => {
                    e.stopPropagation()
                    toggleMobileMenu()
                }}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
            >
                <span />
                <span />
                <span />
            </button>

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
                                            onNavigate(`/projects/${p.slug}`)
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
                                            onNavigate(`/gallery/${s.slug}`)
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
                                                    onNavigate(`/projects/${project.slug}`)
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

            {mobileMenuOpen && (
                <>
                    <button className="mobile-menu-backdrop" aria-label="Close navigation" onClick={closeMobileMenu} />
                    <aside
                        className="mobile-menu-panel"
                        aria-label="Mobile navigation"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <div className="mobile-menu-section">
                            <button className="mobile-menu-link mobile-menu-page-link" onClick={() => onNavigate('/home')}>
                                <span className="mobile-menu-icon" aria-hidden="true">&#8962;</span>
                                <span>Home</span>
                            </button>
                            <button className="mobile-menu-link mobile-menu-page-link" onClick={() => onNavigate('/about')}>
                                <span className="mobile-menu-icon" aria-hidden="true">i</span>
                                <span>About</span>
                            </button>
                            {!guestUnlocked && (
                                <button className="mobile-menu-link mobile-menu-page-link" onClick={() => onNavigate('/guests')}>
                                    <span className="mobile-menu-icon" aria-hidden="true">*</span>
                                    <span>Guests</span>
                                </button>
                            )}
                        </div>

                        <div className="mobile-menu-section">
                            <button className="mobile-menu-accordion" onClick={() => toggleMobileSection('projects')}>
                                <span className="mobile-menu-accordion-label">
                                    <span className="mobile-menu-icon" aria-hidden="true">#</span>
                                    <span>Projects</span>
                                </span>
                                <span className={`mobile-menu-chevron${mobileExpanded.projects ? ' open' : ''}`} aria-hidden="true">v</span>
                            </button>
                            {mobileExpanded.projects && (
                                <div className="mobile-menu-sublist">
                                    {publicProjects.map((project) => (
                                        <button
                                            key={project.id}
                                            className="mobile-menu-link"
                                            onClick={() => onNavigate(`/projects/${project.slug}`)}
                                        >
                                            {project.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mobile-menu-section">
                            <button className="mobile-menu-accordion" onClick={() => toggleMobileSection('gallery')}>
                                <span className="mobile-menu-accordion-label">
                                    <span className="mobile-menu-icon" aria-hidden="true">[]</span>
                                    <span>Gallery</span>
                                </span>
                                <span className={`mobile-menu-chevron${mobileExpanded.gallery ? ' open' : ''}`} aria-hidden="true">v</span>
                            </button>
                            {mobileExpanded.gallery && (
                                <div className="mobile-menu-sublist">
                                    {gallerySections.map((section) => (
                                        <button
                                            key={section.slug}
                                            className="mobile-menu-link"
                                            onClick={() => onNavigate(`/gallery/${section.slug}`)}
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {guestUnlocked && (
                            <div className="mobile-menu-section">
                                <button className="mobile-menu-accordion" onClick={() => toggleMobileSection('guests')}>
                                    <span className="mobile-menu-accordion-label">
                                        <span className="mobile-menu-icon" aria-hidden="true">*</span>
                                        <span>Guests</span>
                                    </span>
                                    <span className={`mobile-menu-chevron${mobileExpanded.guests ? ' open' : ''}`} aria-hidden="true">v</span>
                                </button>
                                {mobileExpanded.guests && (
                                    <div className="mobile-menu-sublist">
                                        {guestProjects.map((project) => (
                                            <button
                                                key={project.id}
                                                className="mobile-menu-link"
                                                onClick={() => onNavigate(`/projects/${project.slug}`)}
                                            >
                                                {project.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </aside>
                </>
            )}
        </header>
    )
}
