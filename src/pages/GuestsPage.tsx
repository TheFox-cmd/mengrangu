import { sha256 } from 'js-sha256'
import { useEffect, useRef, useState } from 'react'
import { HiChevronDown, HiEye, HiEyeSlash } from 'react-icons/hi2'
import { Link, Navigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import { guestProjects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './GuestsPage.css'

const SESSION_KEY = 'guests-auth'
const KEY = import.meta.env.VITE_KEY ?? ''

function hmacSha256Array(key: string, message: string): number[] {
    const BLOCK_SIZE = 64
    const encoder = new TextEncoder()
    let keyBytes = Array.from(encoder.encode(key))
    if (keyBytes.length > BLOCK_SIZE) {
        keyBytes = sha256.array(new Uint8Array(keyBytes))
    }
    while (keyBytes.length < BLOCK_SIZE) {
        keyBytes.push(0)
    }
    const ipad = keyBytes.map((b) => b ^ 0x36)
    const opad = keyBytes.map((b) => b ^ 0x5c)
    const msgBytes = Array.from(encoder.encode(message))
    const innerHash = sha256.array(new Uint8Array([...ipad, ...msgBytes]))
    return sha256.array(new Uint8Array([...opad, ...innerHash]))
}

function generateDailyPassword(key: string): string {
    const dateStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date())
    const hashArray = hmacSha256Array(key, dateStr)
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
    const [showPassword, setShowPassword] = useState(false)
    const [pickerOpen, setPickerOpen] = useState(false)
    const pickerRef = useRef<HTMLDivElement>(null)
    const currentPassword = useRef(generateDailyPassword(KEY))

    const selectedProject = guestProjects.find((project) => project.slug === selectedSlug) ?? guestProjects[0]

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
        if (currentPassword.current && password === currentPassword.current) {
            sessionStorage.setItem(SESSION_KEY, 'true')
            window.dispatchEvent(new Event('guest-auth-changed'))
            setAuthenticated(true)
            setError(false)
        } else {
            setError(true)
        }
    }

    if (authenticated && guestProjects.length === 1) {
        return <Navigate to={`/projects/${guestProjects[0].slug}`} replace />
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
                        <div className="guests-gate-input-wrap">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError(false)
                                }}
                                placeholder="Enter password"
                                className={`guests-gate-input${error ? ' error' : ''}`}
                                autoFocus
                            />
                            <button
                                type="button"
                                className="guests-gate-eye"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <HiEyeSlash /> : <HiEye />}
                            </button>
                        </div>
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
