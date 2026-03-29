import { useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { guestProjects } from '../data/projects'
import usePageTitle from '../hooks/usePageTitle'
import './GuestsPage.css'

const SESSION_KEY = 'guests-auth'
const GUEST_PASSWORD = 'tastybunny2026'

export default function GuestsPage() {
    usePageTitle('Guests')
    const [authenticated, setAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === 'true',
    )
    const [selectedSlug, setSelectedSlug] = useState(guestProjects[0]?.slug ?? '')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const selectedProject = guestProjects.find((project) => project.slug === selectedSlug) ?? guestProjects[0]

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password === GUEST_PASSWORD) {
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
                        <label className="guests-project-picker">
                            <span>Project</span>
                            <select value={selectedProject.slug} onChange={(e) => setSelectedSlug(e.target.value)}>
                                {guestProjects.map((project) => (
                                    <option key={project.id} value={project.slug}>
                                        {project.title}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="guests-project-detail">
                            <h2>{selectedProject.title}</h2>
                            <p className="guests-project-brief">{selectedProject.brief}</p>
                            <p className="guests-project-description">{selectedProject.description}</p>

                            <div className="detail-gallery">
                                {selectedProject.images.map((src, index) => (
                                    <Link
                                        key={`${selectedProject.slug}-${index}`}
                                        to={`/image/projects/${selectedProject.slug}/${index}`}
                                        className="detail-gallery-item"
                                    >
                                        <img
                                            src={src}
                                            alt={`${selectedProject.title} ${index + 1}`}
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                            fetchPriority={index === 0 ? 'high' : 'low'}
                                            decoding="async"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}
