import { useEffect } from 'react'

const BASE_TITLE = 'TastyBunny — Concept Art & Illustration'

export default function usePageTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} — TastyBunny` : BASE_TITLE
        return () => { document.title = BASE_TITLE }
    }, [title])
}
