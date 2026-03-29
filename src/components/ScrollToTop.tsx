import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
    const { pathname } = useLocation()

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

        const isImageDetailRoute = pathname.startsWith('/image/')
        document.documentElement.style.overflow = isImageDetailRoute ? 'hidden' : ''
        document.body.style.overflow = isImageDetailRoute ? 'hidden' : ''
    }, [pathname])

    return null
}