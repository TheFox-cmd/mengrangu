import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function resetScrollStyles() {
    // Remove all inline overrides so the stylesheet rules in index.css
    // take effect cleanly (overflow-x: hidden; overflow-y: auto).
    document.documentElement.style.removeProperty('overflow')
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('touch-action')
}

function lockScrollStyles() {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
}

export default function ScrollToTop() {
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        const isLockedRoute =
            pathname.startsWith('/image/') || pathname === '/about'

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

        if (isLockedRoute) {
            lockScrollStyles()
        } else {
            resetScrollStyles()
        }

        const handlePageShow = () => {
            if (isLockedRoute) lockScrollStyles()
            else resetScrollStyles()
        }

        window.addEventListener('pageshow', handlePageShow)
        return () => {
            window.removeEventListener('pageshow', handlePageShow)
            // Always clean up inline overrides when leaving a route so
            // stylesheet rules are never shadowed.
            resetScrollStyles()
        }
    }, [pathname])

    return null
}