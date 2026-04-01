import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './BackButton.css'

let internalNavCount = 0

export default function BackButton() {
    const navigate = useNavigate()
    const location = useLocation()
    const [canGoBack, setCanGoBack] = useState(internalNavCount > 0)

    useEffect(() => {
        internalNavCount++
        setCanGoBack(internalNavCount > 1)
    }, [location])

    if (!canGoBack) return null

    return (
        <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back</span>
        </button>
    )
}
