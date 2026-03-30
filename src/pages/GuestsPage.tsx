import { useEffect, useRef, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import { guestProjects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './GuestsPage.css'

const SESSION_KEY = 'guests-auth'
const KEY = import.meta.env.VITE_KEY ?? ''

async function generateDailyPassword(key: string): Promise<string> {
    const today = new Date()
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const encoder = new TextEncoder()
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(key),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    )
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(dateStr))
    const hashArray = Array.from(new Uint8Array(signature))
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    return hashArray.slice(0, 8).map((b) => chars[b % chars.length]).join('')
}

export default function GuestsPage() {
    usePageTitle('Guests')
    const [authenticated, setAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === 'true',
    )
    const [selectedSlug, setSelectedSlug] = useState(guestProjects[0]?.slug ?? '')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [pickerOpen, setPickerOpen] = useState(false)
    const pickerRef = useRef<HTMLDivElement>(null)
    const [currentPassword, setCurrentPassword] = useState<string | null>(null)

    const selectedProject = guestProjects.find((project) => project.slug === selectedSlug) ?? guestProjects[0]

    useEffect(() => {
        let cancelled = false
        generateDailyPassword(KEY).then((pw) => {
            if (!cancelled) setCurrentPassword(pw)
        })
        return () => { cancelled = true }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (pickerRef.current && !pickerRef.current.contains(target)) {
                setPickerOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (currentPassword && password === currentPassword) {
            sessionStorage.setItem(SESSION_KEY, 'true')
            window.dispatchEvent(new Event('guest-auth-changed'))
            setAuthenticated(true)
            setError(false)
        } else {
            setError(true)
        }
    }

    if (!authenticated) {
        return (
            <div className="guests-gate">
                <BackButton />
                <div className="guests-gate-card">
                    <h1 className="guests-gate-title">Guest Access</h1>
                    <p className="guests-gate-subtitle">
                        This page is password-protected. Please enter the password to continue.
                    </p>
                    <form onSubmit={handleSubmit} className="guests-gate-form">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError(false)
                            }}
                            placeholder="Enter password"
                            className={`guests-gate-input${error ? ' error' : ''}`}
                            autoFocus
                        />
                        <button type="submit" className="guests-gate-btn">
                            Enter
                        </button>
                    </form>
                    {error && <p className="guests-gate-error">Incorrect password</p>}
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="guests-page">
            <BackButton />
            <div className="guests-page-header">
                <h1>Guests</h1>
                <p className="guests-page-subtitle">Unlocked work with a private project selector.</p>
            </div>
            <div className="guests-content">
                {selectedProject ? (
                    <>
                        <div className="guests-project-picker">
                            <div className="guests-project-dropdown" ref={pickerRef}>
                                <button
                                    type="button"
                                    className="nav-link dropdown-toggle guests-project-trigger"
                                    onClick={() => setPickerOpen((open) => !open)}
                                    aria-haspopup="listbox"
                                    aria-expanded={pickerOpen}
                                >
                                    <span>{selectedProject.title}</span>
                                    <HiChevronDown className={`toggle-arrow${pickerOpen ? ' open' : ''}`} />
                                </button>
                                {pickerOpen && (
                                    <ul className="header-dropdown guests-project-menu" role="listbox" aria-label="Guest projects">
                                        {guestProjects.map((project) => (
                                            <li key={project.id}>
                                                <button
                                                    type="button"
                                                    className="dropdown-item guests-project-option"
                                                    onClick={() => {
                                                        setSelectedSlug(project.slug)
                                                        setPickerOpen(false)
                                                    }}
                                                >
                                                    {project.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="guests-project-detail">
                            <Link
                                to={`/projects/${selectedProject.slug}`}
                                className="guests-featured-card"
                            >
                                <img
                                    src={selectedProject.images[0]}
                                    alt={selectedProject.title}
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                />
                                <div className="guests-featured-meta">
                                    <span>{selectedProject.title}</span>
                                </div>
                            </Link>
                        </div>
                    </>
                ) : null}
            </div>
            <Footer />
        </div>
    )
}
