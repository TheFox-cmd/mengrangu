import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        const applyRouteScrollLock = () => {
            const isImageDetailRoute = pathname.startsWith('/image/')
            const isAboutRoute = pathname === '/about'
            const shouldLockViewport = isImageDetailRoute || isAboutRoute

            document.documentElement.style.overflow = shouldLockViewport ? 'hidden' : ''
            document.body.style.overflow = shouldLockViewport ? 'hidden' : ''
            document.body.style.touchAction = shouldLockViewport ? 'none' : ''
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        applyRouteScrollLock()

        // Re-apply lock state when restoring from browser history cache.
        const handleHistoryRestore = () => {
            applyRouteScrollLock()
        }

        window.addEventListener('pageshow', handleHistoryRestore)

        return () => {
            window.removeEventListener('pageshow', handleHistoryRestore)
        }
    }, [pathname])

    return null
}