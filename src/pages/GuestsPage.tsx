import { useState } from 'react'
import BackButton from '../components/BackButton'
import usePageTitle from '../hooks/usePageTitle'
import './GuestsPage.css'

const SESSION_KEY = 'guests-auth'
const GUEST_PASSWORD = 'tastybunny2026'

export default function GuestsPage() {
    usePageTitle('Guests')
    const [authenticated, setAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === 'true',
    )
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password === GUEST_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, 'true')
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
                <p className="guests-page-subtitle">Welcome! This is a private space.</p>
            </div>
            <div className="guests-content">
                <p>Content coming soon.</p>
            </div>
        </div>
    )
}
