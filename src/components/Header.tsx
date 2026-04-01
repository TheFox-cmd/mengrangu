import { useEffect, useRef, useState } from 'react'
import { HiFolder } from 'react-icons/hi'
import {
    HiBars3,
    HiChevronDown,
    HiHome,
    HiInformationCircle,
    HiMoon,
    HiPhoto,
    HiSun,
    HiUsers,
    HiXMark,
} from 'react-icons/hi2'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.png'
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
    const [mobileMenu, setMobileMenu] = useState<{ open: boolean; pathname: string }>({
        open: false,
        pathname: location.pathname,
    })
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const stored = localStorage.getItem('theme')
        if (stored === 'light' || stored === 'dark') return stored
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })
    const [mobileExpanded, setMobileExpanded] = useState({
        projects: false,
        gallery: false,
    })
    const projectsRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node
            if (
                projectsRef.current && !projectsRef.current.contains(target) &&
                galleryRef.current && !galleryRef.current.contains(target)
            ) {
                setOpenDropdown({ name: null, pathname: location.pathname })
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [location.pathname])

    const visibleDropdown = openDropdown.pathname === location.pathname ? openDropdown.name : null
    const mobileMenuOpen = mobileMenu.pathname === location.pathname && mobileMenu.open

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

    const toggleMobileSection = (section: 'projects' | 'gallery') => {
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
        <>
            <button
                className="theme-toggle"
                type="button"
                onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
                {theme === 'dark' ? <HiSun /> : <HiMoon />}
            </button>

            {location.pathname !== '/about' && (
                <div className="header-title">
                    <div className="header-title-text">
                        <img src={logoImg} alt="" className="header-title-logo" />
                        <span className="header-title-lg">Art</span>
                        <span className="header-title-sm">of</span>
                        <span className="header-title-lg">Mengran</span>
                    </div>
                </div>
            )}


            <header className={`header${mobileMenuOpen ? ' header--menu-open' : ''}`}>
                <button
                    className="mobile-menu-toggle"
                    onClick={(e) => {
                        e.stopPropagation()
                        toggleMobileMenu()
                    }}
                    aria-label="Toggle navigation menu"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <HiXMark /> : <HiBars3 />}
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
                            <HiChevronDown className={`toggle-arrow${visibleDropdown === 'projects' ? ' open' : ''}`} />
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
                            <HiChevronDown className={`toggle-arrow${visibleDropdown === 'gallery' ? ' open' : ''}`} />
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

                    <Link
                        to={guestProjects.length === 1 ? `/projects/${guestProjects[0].slug}` : '/guests'}
                        className={`nav-link${location.pathname === '/guests' || (guestProjects.length === 1 && location.pathname === `/projects/${guestProjects[0]?.slug}`) ? ' active' : ''}`}
                    >
                        Guests
                    </Link>

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
                                    <HiHome className="mobile-menu-icon" aria-hidden="true" />
                                    <span>Home</span>
                                </button>
                                <button className="mobile-menu-link mobile-menu-page-link" onClick={() => onNavigate('/about')}>
                                    <HiInformationCircle className="mobile-menu-icon" aria-hidden="true" />
                                    <span>About</span>
                                </button>
                                <button className="mobile-menu-link mobile-menu-page-link" onClick={() => onNavigate(guestProjects.length === 1 ? `/projects/${guestProjects[0].slug}` : '/guests')}>
                                    <HiUsers className="mobile-menu-icon" aria-hidden="true" />
                                    <span>Guests</span>
                                </button>
                            </div>

                            <div className="mobile-menu-section">
                                <button className="mobile-menu-accordion" onClick={() => toggleMobileSection('projects')}>
                                    <span className="mobile-menu-accordion-label">
                                        <HiFolder className="mobile-menu-icon" aria-hidden="true" />
                                        <span>Projects</span>
                                    </span>
                                    <HiChevronDown className={`mobile-menu-chevron${mobileExpanded.projects ? ' open' : ''}`} aria-hidden="true" />
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
                                        <HiPhoto className="mobile-menu-icon" aria-hidden="true" />
                                        <span>Gallery</span>
                                    </span>
                                    <HiChevronDown className={`mobile-menu-chevron${mobileExpanded.gallery ? ' open' : ''}`} aria-hidden="true" />
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

                        </aside>
                    </>
                )}
            </header>
        </>
    )
}
